import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function proxy(request) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value, options),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 1. Protection for all dashboard routes
  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single();

  const role = profile?.role;

  // 2. Industry Standard Access Mapping
  const adminOnly = ["/dashboard/users", "/dashboard/messages"];
  const staffAllowed = ["/dashboard/inventory", "/dashboard/publications"];

  const isRestrictedPath = adminOnly.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );
  const isStaffPath = staffAllowed.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  // Policy: Contributors cannot access Admin-only tools
  if (role === "contributor" && isRestrictedPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Policy: Standard users cannot access any staff tools
  if (role === "user" && (isStaffPath || isRestrictedPath)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}
