import { updateSession } from "@/lib/supabase/proxy";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function proxy(request) {
  // 1. Sync session (refreshes cookie if expired)
  const response = await updateSession(request);
  const supabase = await createClient();

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Not logged in?
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check Role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = profile?.role;

    // Kick out if not authorized for dashboard at all
    if (role !== "admin" && role !== "contributor") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Admin-Only Route Check
    const adminOnlyRoutes = [
      "/dashboard/users",
      "/dashboard/publications",
      "/dashboard/inventory",
      "/dashboard/messages",
    ];
    const isRestricted = adminOnlyRoutes.some((path) =>
      request.nextUrl.pathname.startsWith(path),
    );

    if (isRestricted && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)",
  ],
};
