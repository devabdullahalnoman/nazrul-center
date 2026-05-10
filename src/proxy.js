import { updateSession } from "@/lib/supabase/proxy";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function proxy(request) {
  // 1. Sync session (refreshes cookie if expired)
  const response = await updateSession(request);
  const supabase = await createClient();

  // Handle all dashboard routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // --- GUARD 1: Not logged in? ---
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Fetch Role from profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = profile?.role;

    // --- GUARD 2: Role Authorization ---
    // We now allow "user", "admin", and "contributor"
    const allowedRoles = ["admin", "contributor", "user"];

    if (!role || !allowedRoles.includes(role)) {
      // If they have no role or a role not in our list, bounce to homepage
      return NextResponse.redirect(new URL("/", request.url));
    }

    // --- GUARD 3: Admin-Only Route Protection ---
    const adminOnlyRoutes = [
      "/dashboard/users",
      "/dashboard/publications",
      "/dashboard/inventory",
      "/dashboard/messages",
    ];

    const isRestrictedPath = adminOnlyRoutes.some((path) =>
      request.nextUrl.pathname.startsWith(path),
    );

    // If it's an admin path and they aren't an admin,
    // send them back to their respective dashboard home
    if (isRestrictedPath && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return response;
}

// Config matcher stays the same to ensure this runs on the correct paths
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)",
  ],
};
