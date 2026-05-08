import { updateSession } from "@/lib/supabase/proxy";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function proxy(request) {
  // 1. Sync session (Critical for Next 16 cookie handling)
  const response = await updateSession(request);

  // 2. Protect Dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)",
  ],
};
