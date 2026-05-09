import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export const updateSession = async (request) => {
  // 1. Initialize the response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 2. Create the Supabase client with the NEW non-deprecated cookie pattern
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Sync cookies to the request (for current middleware/route execution)
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value, options),
          );

          // Update the response object to send headers back to the browser
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });

          // Sync cookies to the response
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  await supabase.auth.getUser();

  return response;
};
