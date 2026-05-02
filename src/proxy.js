import { updateSession } from "@/lib/supabase/proxy";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Next.js 16 Proxy Function
 * This acts as the "Gatekeeper" for your entire application.
 */
export async function proxy(request) {
  // 1. Sync and Refresh the Supabase Session
  // This ensures the browser cookies and server session are always in sync.
  const response = await updateSession(request);

  // 2. Protect the Dashboard Routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // If no user is found, redirect them to the login page
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      // Optional: Add a redirect parameter to bring them back after login
      loginUrl.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

/**
 * The Matcher is CRITICAL for Performance.
 * This prevents the proxy from running on every single image and CSS file,
 * which is likely what was causing your 50% CPU usage.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * 1. _next/static (static files)
     * 2. _next/image (image optimization files)
     * 3. favicon.ico, sitemap.xml, robots.txt
     * 4. Any file with an extension (e.g., logo.png, styles.css)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)",
  ],
};
