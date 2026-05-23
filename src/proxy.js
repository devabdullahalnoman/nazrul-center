// import { createServerClient } from "@supabase/ssr";
// import { NextResponse } from "next/server";

// export async function proxy(request) {
//   let response = NextResponse.next({
//     request: { headers: request.headers },
//   });

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll();
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value, options }) =>
//             request.cookies.set(name, value, options),
//           );
//           response = NextResponse.next({ request });
//           cookiesToSet.forEach(({ name, value, options }) =>
//             response.cookies.set(name, value, options),
//           );
//         },
//       },
//     },
//   );

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   // 1. Protection for all dashboard routes
//   if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   const { data: profile } = await supabase
//     .from("profiles")
//     .select("role")
//     .eq("id", user?.id)
//     .single();

//   const role = profile?.role;

//   // 2. Industry Standard Access Mapping
//   const adminOnly = ["/dashboard/users", "/dashboard/messages"];
//   const staffAllowed = ["/dashboard/inventory", "/dashboard/publications"];

//   const isRestrictedPath = adminOnly.some((path) =>
//     request.nextUrl.pathname.startsWith(path),
//   );
//   const isStaffPath = staffAllowed.some((path) =>
//     request.nextUrl.pathname.startsWith(path),
//   );

//   // Policy: Contributors cannot access Admin-only tools
//   if (role === "contributor" && isRestrictedPath) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // Policy: Standard users cannot access any staff tools
//   if (role === "user" && (isStaffPath || isRestrictedPath)) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   return response;
// }

// import { NextResponse } from "next/server";
// import { createServerClient } from "@supabase/ssr";

// export async function proxy(request) {
//   let response = NextResponse.next({ request });
//   const url = request.nextUrl.clone();

//   // 1. GLOBAL PRODUCTION RUNTIME SECURITY HEADERS INJECTION (Issue 18)
//   response.headers.set("X-Frame-Options", "DENY");
//   response.headers.set("X-Content-Type-Options", "nosniff");
//   response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
//   response.headers.set(
//     "Content-Security-Policy",
//     "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.sslcommerz.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co https://*.sslcommerz.com;",
//   );

//   // 2. INITIALIZE SECURE AUTHENTICATION CONTEXT (Issue 11, 30)
//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll();
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value, options }) => {
//             request.cookies.set(name, value, options);
//           });
//           response = NextResponse.next({ request });
//           cookiesToSet.forEach(({ name, value, options }) => {
//             response.cookies.set(name, value, options);
//           });
//         },
//       },
//     },
//   );

//   // Parse user context safely via authoritative server handshake
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   // 3. HARDENED ROUTE PROTECTION RULES (Issue 12, 19)
//   if (url.pathname.startsWith("/dashboard")) {
//     if (!user) {
//       const loginRedirectUrl = new URL("/login", request.url);
//       loginRedirectUrl.searchParams.set("redirect", url.pathname);
//       return NextResponse.redirect(loginRedirectUrl, 307);
//     }

//     // Server-Authoritative Database Profile Role Check
//     const { data: profile } = await supabase
//       .from("profiles")
//       .select("role")
//       .eq("id", user.id)
//       .single();

//     const userRole = profile?.role || "user";

//     // Enforce role restrictions
//     const managerPaths = ["/dashboard/inventory", "/dashboard/publications"];
//     const administrativePaths = ["/dashboard/users", "/dashboard/messages"];

//     const attemptsToAccessManagerZone = managerPaths.some((path) =>
//       url.pathname.startsWith(path),
//     );
//     const attemptsToAccessAdminZone = administrativePaths.some((path) =>
//       url.pathname.startsWith(path),
//     );

//     if (attemptsToAccessAdminZone && userRole !== "admin") {
//       return NextResponse.redirect(
//         new URL("/dashboard?error=unauthorized_privilege", request.url),
//         303,
//       );
//     }

//     if (
//       attemptsToAccessManagerZone &&
//       !["admin", "contributor", "staff"].includes(userRole)
//     ) {
//       return NextResponse.redirect(
//         new URL("/dashboard?error=access_restricted", request.url),
//         303,
//       );
//     }
//   }

//   return response;
// }

// // Configure matcher boundaries to optimize performance overhead
// export const config = {
//   matcher: ["/dashboard/:path*", "/api/checkout/:path*"],
// };

// import { NextResponse } from "next/server";
// import { createServerClient } from "@supabase/ssr";
// import arcjet, { tokenBucket, detectBot } from "@arcjet/next";

// // 1. INITIALIZE AN EDGE-OPTIMIZED SECURITY COMPONENT (Infrastructure Throttling / Bot Blockade)
// const aj = arcjet({
//   key: process.env.ARCJET_KEY,
//   characteristics: ["ip.src"],
//   rules: [
//     // Shield sensitive catalog assets from malicious automated web scrapers
//     detectBot({
//       mode: "LIVE",
//       allow: ["CATEGORY:SEARCH_ENGINE"], // Permitted standard indexing engines (e.g., Google, Bing)
//     }),
//     // Defend administrative routes and checkout handlers against automated spam/brute-force attacks
//     tokenBucket({
//       mode: "LIVE",
//       refillRate: 5, // Replenish 5 tokens every 10 seconds
//       interval: "10s",
//       capacity: 10, // Max burst threshold capacity
//     }),
//   ],
// });

// export async function proxy(request) {
//   const targetUrl = request.nextUrl.clone();

//   // 2. IMMUNITY BYPASS GUARD: Ensure public homepage API proxies do not experience authorization trap loops
//   if (
//     targetUrl.pathname.startsWith("/api/media/") ||
//     targetUrl.pathname.startsWith("/api/archive/")
//   ) {
//     return NextResponse.next();
//   }

//   // 3. ACTIVE RUNTIME INFRASTRUCTURE LAYER EVALUATION
//   if (
//     targetUrl.pathname.startsWith("/api/checkout") ||
//     targetUrl.pathname.startsWith("/dashboard")
//   ) {
//     try {
//       const decision = await aj.protect(request);
//       if (decision.isDenied()) {
//         if (decision.reason.isBot()) {
//           return NextResponse.json(
//             {
//               error: "Access Denied: Automated threat fingerprint identified.",
//             },
//             { status: 403 },
//           );
//         }
//         return NextResponse.json(
//           {
//             error:
//               "Too Many Requests: Rate limit exceeded. Please wait a moment.",
//           },
//           { status: 429 },
//         );
//       }
//     } catch (edgeError) {
//       // Graceful system degradation: Fail open if the infrastructure checker encounters cloud communication faults
//       console.error(
//         "⚠️ Arcjet protection execution safely bypassed via fallback channel:",
//         edgeError.message,
//       );
//     }
//   }

//   // Generate base stream response context
//   let response = NextResponse.next({ request });

//   // 4. INJECT STRUCTURAL PRODUCTION SECURITY RESPONSE HEADERS
//   response.headers.set("X-Frame-Options", "DENY");
//   response.headers.set("X-Content-Type-Options", "nosniff");
//   response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
//   response.headers.set(
//     "Content-Security-Policy",
//     "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.sslcommerz.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co https://*.sslcommerz.com;",
//   );

//   // 5. SECURE DUAL-TIER PLATFORM BOUNDARY CREDENTIAL CHECK
//   const supabaseUrl =
//     process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
//   const supabaseAnonKey =
//     process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

//   if (!supabaseUrl || !supabaseAnonKey) {
//     console.error(
//       "❌ CRITICAL INFRASTRUCTURE REJECTION: Supabase runtime parameters are completely missing from the Proxy Context Layer!",
//     );
//     return NextResponse.json(
//       {
//         error:
//           "Internal Server Configuration Defect: Secure routing tokens are unmapped.",
//       },
//       { status: 500 },
//     );
//   }

//   // Initialize edge token synchronization handler
//   const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
//     cookies: {
//       getAll() {
//         return request.cookies.getAll();
//       },
//       setAll(cookiesToSet) {
//         cookiesToSet.forEach(({ name, value, options }) => {
//           request.cookies.set(name, value, options);
//         });
//         response = NextResponse.next({ request });
//         cookiesToSet.forEach(({ name, value, options }) => {
//           response.cookies.set(name, value, options);
//         });
//       },
//     },
//   });

//   // Authoritatively extract validated identity context straight from the authentication server token
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   // 6. MULTI-TIER SERVER AUTHORIZATION POLICIES
//   if (targetUrl.pathname.startsWith("/dashboard")) {
//     if (!user) {
//       const authRedirectUrl = new URL("/login", request.url);
//       authRedirectUrl.searchParams.set("redirect", targetUrl.pathname);
//       return NextResponse.redirect(authRedirectUrl, 307);
//     }

//     // Access role mappings straight from the server database registry
//     const { data: profile } = await supabase
//       .from("profiles")
//       .select("role")
//       .eq("id", user.id)
//       .single();

//     const userRole = profile?.role || "user";

//     const pathsForStaff = ["/dashboard/inventory", "/dashboard/publications"];
//     const pathsForAdmin = ["/dashboard/users", "/dashboard/messages"];

//     const isAccessingStaffZone = pathsForStaff.some((path) =>
//       targetUrl.pathname.startsWith(path),
//     );
//     const isAccessingAdminZone = pathsForAdmin.some((path) =>
//       targetUrl.pathname.startsWith(path),
//     );

//     if (isAccessingAdminZone && userRole !== "admin") {
//       return NextResponse.redirect(
//         new URL("/dashboard?error=unauthorized_access", request.url),
//         303,
//       );
//     }

//     if (
//       isAccessingStaffZone &&
//       !["admin", "contributor", "staff"].includes(userRole)
//     ) {
//       return NextResponse.redirect(
//         new URL("/dashboard?error=access_restricted", request.url),
//         303,
//       );
//     }
//   }

//   return response;
// }

// // 7. PATH SCOPING MATRIX DEFINITION
// export const config = {
//   matcher: ["/dashboard/:path*", "/api/checkout/:path*"],
// };

// import { NextResponse } from "next/server";
// import { createServerClient } from "@supabase/ssr";
// import arcjet, { tokenBucket, detectBot } from "@arcjet/next";
// import { z } from "zod";

// // 1. Strict Environment Validation (Self-Contained)
// const envSchema = z.object({
//   ARCJET_KEY: z.string().min(5, "Arcjet key is missing"),
//   SUPABASE_URL: z.string().url("Supabase URL is missing or invalid"),
//   SUPABASE_ANON_KEY: z.string().min(10, "Supabase Anon Key is missing"),
// });

// const envParsed = envSchema.safeParse({
//   ARCJET_KEY: process.env.ARCJET_KEY,
//   SUPABASE_URL:
//     process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
//   SUPABASE_ANON_KEY:
//     process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
// });

// if (!envParsed.success) {
//   console.error(
//     "❌ CRITICAL BOOT ERROR: Invalid Environment Layout",
//     envParsed.error.format(),
//   );
// }

// // 2. Configure Rate Limiter
// const aj = arcjet({
//   key: process.env.ARCJET_KEY,
//   characteristics: ["ip.src"],
//   rules: [
//     detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE"] }),
//     tokenBucket({ mode: "LIVE", refillRate: 5, interval: "10s", capacity: 10 }),
//   ],
// });

// export async function proxy(request) {
//   const targetUrl = request.nextUrl.clone();

//   // Public asset bypass
//   if (
//     targetUrl.pathname.startsWith("/api/media/") ||
//     targetUrl.pathname.startsWith("/api/archive/")
//   ) {
//     return NextResponse.next();
//   }

//   // 3. Active Rate Throttling
//   if (
//     targetUrl.pathname.startsWith("/api/checkout") ||
//     targetUrl.pathname.startsWith("/dashboard")
//   ) {
//     try {
//       const decision = await aj.protect(request, { requested: 1 });
//       if (decision.isDenied()) {
//         if (decision.reason.isBot())
//           return NextResponse.json(
//             { error: "Access Denied: Bot detected." },
//             { status: 403 },
//           );
//         return NextResponse.json(
//           { error: "Too Many Requests" },
//           { status: 429 },
//         );
//       }
//     } catch (edgeError) {
//       console.warn(
//         "⚠️ Edge protection safely bypassed via fail-open:",
//         edgeError.message,
//       );
//     }
//   }

//   let response = NextResponse.next({ request });

//   // 4. Strict Content Security Policy (CSP) & Security Headers
//   response.headers.set("X-Frame-Options", "DENY");
//   response.headers.set("X-Content-Type-Options", "nosniff");
//   response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
//   response.headers.set(
//     "Content-Security-Policy",
//     "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.sslcommerz.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co https://*.sslcommerz.com; frame-src 'self' https://www.youtube.com https://youtube.com;",
//   );

//   // 5. SSR Authentication and Role-Based Access Control (RBAC)
//   const supabaseUrl =
//     process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
//   const supabaseAnonKey =
//     process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

//   if (supabaseUrl && supabaseAnonKey) {
//     const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
//       cookies: {
//         getAll: () => request.cookies.getAll(),
//         setAll: (cookiesToSet) => {
//           cookiesToSet.forEach(({ name, value, options }) =>
//             request.cookies.set(name, value, options),
//           );
//           response = NextResponse.next({ request });
//           cookiesToSet.forEach(({ name, value, options }) =>
//             response.cookies.set(name, value, options),
//           );
//         },
//       },
//     });

//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     // Centralized Route Protection
//     if (targetUrl.pathname.startsWith("/dashboard")) {
//       if (!user) {
//         return NextResponse.redirect(
//           new URL("/login?redirect=" + encodeURIComponent(targetUrl.pathname), request.url),
//           303,
//         );
//       }

//       // 🌟 CRITICAL FIX: Zero-Database-Query Role Checking
//       // Reads securely from the JWT token instead of executing a Postgres query on every navigation
//       const userRole = user.app_metadata?.role || user.user_metadata?.role || "user";

//       const isStaffZone = [
//         "/dashboard/inventory",
//         "/dashboard/publications",
//       ].some((p) => targetUrl.pathname.startsWith(p));
//       const isAdminZone = ["/dashboard/users", "/dashboard/messages"].some(
//         (p) => targetUrl.pathname.startsWith(p),
//       );

//       if (isAdminZone && userRole !== "admin") {
//         return NextResponse.redirect(
//           new URL("/dashboard?error=unauthorized", request.url),
//           303,
//         );
//       }

//       if (isStaffZone && !["admin", "contributor", "staff"].includes(userRole)) {
//         return NextResponse.redirect(
//           new URL("/dashboard?error=unauthorized", request.url),
//           303,
//         );
//       }
//     }
//   }

//   return response;
// }

// export default proxy;
// export const config = {
//   matcher: ["/dashboard/:path*", "/api/checkout/:path*"],
// };

// import { NextResponse } from "next/server";
// import { createServerClient } from "@supabase/ssr";
// import arcjet, { tokenBucket, detectBot } from "@arcjet/next";
// import { z } from "zod";

// // 1. Strict Environment Validation (Self-Contained)
// const envSchema = z.object({
//   ARCJET_KEY: z.string().min(5, "Arcjet key is missing"),
//   SUPABASE_URL: z.string().url("Supabase URL is missing or invalid"),
//   SUPABASE_ANON_KEY: z.string().min(10, "Supabase Anon Key is missing"),
// });

// const envParsed = envSchema.safeParse({
//   ARCJET_KEY: process.env.ARCJET_KEY,
//   SUPABASE_URL:
//     process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
//   SUPABASE_ANON_KEY:
//     process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
// });

// if (!envParsed.success) {
//   console.error(
//     "❌ CRITICAL BOOT ERROR: Invalid Environment Layout",
//     envParsed.error.format(),
//   );
// }

// // 2. Configure Arcjet Rate Limiter & Bot Protection
// const aj = arcjet({
//   key: process.env.ARCJET_KEY,
//   characteristics: ["ip.src"],
//   rules: [
//     detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE"] }),
//     // Limits rapid-fire checkout abuse and brute-force login attempts
//     tokenBucket({ mode: "LIVE", refillRate: 5, interval: "10s", capacity: 30 }),
//   ],
// });

// export async function proxy(request) {
//   const targetUrl = request.nextUrl.clone();

//   // Public asset bypass (skips processing overhead for static/media files)
//   if (
//     targetUrl.pathname.startsWith("/api/media/") ||
//     targetUrl.pathname.startsWith("/api/archive/") ||
//     targetUrl.pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico)$/)
//   ) {
//     return NextResponse.next();
//   }

//   // 3. Active Rate Throttling for sensitive endpoints
//   if (
//     targetUrl.pathname.startsWith("/api/checkout") ||
//     targetUrl.pathname.startsWith("/dashboard") ||
//     targetUrl.pathname.startsWith("/auth")
//   ) {
//     try {
//       const decision = await aj.protect(request, { requested: 1 });
//       if (decision.isDenied()) {
//         if (decision.reason.isBot()) {
//           return NextResponse.json(
//             { error: "Access Denied: Automated bot activity detected." },
//             { status: 403 },
//           );
//         }
//         return NextResponse.json(
//           { error: "Too Many Requests. Rate limit exceeded." },
//           { status: 429 },
//         );
//       }
//     } catch (edgeError) {
//       console.warn(
//         "⚠️ Edge protection safely bypassed via fail-open:",
//         edgeError.message,
//       );
//     }
//   }

//   let response = NextResponse.next({ request });

//   // 4. Dynamic Strict Content Security Policy (CSP) & Security Headers
//   // FIXED: Injects 'unsafe-eval' safely ONLY during local development mode for Fast Refresh/Turbopack map compilation
//   const isDev = process.env.NODE_ENV === "development";
//   const cspPolicy = `default-src 'self'; script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://*.sslcommerz.com https://*.supabase.co; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://*.supabase.co https://*.sslcommerz.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.sslcommerz.com; frame-src 'self' https://*.sslcommerz.com https://www.youtube.com; base-uri 'self'; form-action 'self' https://*.sslcommerz.com; frame-ancestors 'none';`;

//   response.headers.set("X-Frame-Options", "DENY");
//   response.headers.set("X-Content-Type-Options", "nosniff");
//   response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
//   response.headers.set("Content-Security-Policy", cspPolicy);

//   // 5. SSR Authentication and Zero-Database-Query RBAC
//   const supabaseUrl =
//     process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
//   const supabaseAnonKey =
//     process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

//   if (supabaseUrl && supabaseAnonKey) {
//     const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll();
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value, options }) => {
//             request.cookies.set(name, value, options);
//           });

//           response = NextResponse.next({ request });

//           cookiesToSet.forEach(({ name, value, options }) => {
//             let cookieString = `${name}=${value}; Path=${options.path || "/"}`;
//             if (options.maxAge) cookieString += `; Max-Age=${options.maxAge}`;
//             if (options.domain) cookieString += `; Domain=${options.domain}`;
//             if (options.secure) cookieString += `; Secure`;
//             if (options.httpOnly !== false) cookieString += `; HttpOnly`;
//             if (options.sameSite)
//               cookieString += `; SameSite=${options.sameSite}`;

//             response.headers.append("Set-Cookie", cookieString);
//           });
//         },
//       },
//     });

//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     // Centralized Route Protection
//     if (targetUrl.pathname.startsWith("/dashboard")) {
//       if (!user) {
//         return NextResponse.redirect(
//           new URL(
//             "/login?redirect=" + encodeURIComponent(targetUrl.pathname),
//             request.url,
//           ),
//           303,
//         );
//       }

//       // 🌟 Zero-Database-Query Role Checking
//       // Securely pulls permissions from the encrypted JWT metadata
//       const userRole =
//         user.app_metadata?.role || user.user_metadata?.role || "user";

//       const isStaffZone = [
//         "/dashboard/inventory",
//         "/dashboard/publications",
//       ].some((p) => targetUrl.pathname.startsWith(p));

//       const isAdminZone = ["/dashboard/users", "/dashboard/messages"].some(
//         (p) => targetUrl.pathname.startsWith(p),
//       );

//       if (isAdminZone && userRole !== "admin") {
//         return NextResponse.redirect(
//           new URL("/dashboard?error=unauthorized_admin", request.url),
//           303,
//         );
//       }

//       if (
//         isStaffZone &&
//         !["admin", "contributor", "staff"].includes(userRole)
//       ) {
//         return NextResponse.redirect(
//           new URL("/dashboard?error=unauthorized_staff", request.url),
//           303,
//         );
//       }
//     }
//   }

//   return response;
// }

// export default proxy;

// export const config = {
//   matcher: ["/dashboard/:path*", "/api/checkout/:path*", "/auth/:path*"],
// };

// import { NextResponse } from "next/server";
// import { createServerClient } from "@supabase/ssr";
// import arcjet, { tokenBucket, detectBot } from "@arcjet/next";
// import { logger } from "@/lib/logger";

// const aj = arcjet({
//   key: process.env.ARCJET_KEY,
//   characteristics: ["ip.src"],
//   rules: [
//     detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE"] }),
//     tokenBucket({ mode: "LIVE", refillRate: 5, interval: "10s", capacity: 20 }),
//   ],
// });

// export async function proxy(request) {
//   const currentUrl = request.nextUrl.clone();
//   const isDevelopmentEnvironment = process.env.NODE_ENV === "development";

//   // Build a multi-environment compliant Content Security Policy matrix dynamically
//   const compiledCspRule = isDevelopmentEnvironment
//     ? `default-src 'self' http://localhost:* ws://localhost:*;
//        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.sslcommerz.com https://*.supabase.co;
//        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
//        img-src 'self' data: blob: https://*.supabase.co https://*.sslcommerz.com;
//        font-src 'self' https://fonts.gstatic.com;
//        connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.sslcommerz.com ws://localhost:* http://localhost:* chrome-extension://* blob:;
//        frame-src 'self' https://*.sslcommerz.com https://www.youtube.com;
//        base-uri 'self';
//        form-action 'self' https://*.sslcommerz.com;
//        frame-ancestors 'self' http://localhost:*;`
//         .replace(/\s+/g, " ")
//         .trim()
//     : `default-src 'self';
//        script-src 'self' 'unsafe-inline' https://*.sslcommerz.com https://*.supabase.co;
//        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
//        img-src 'self' data: blob: https://*.supabase.co https://*.sslcommerz.com;
//        font-src 'self' https://fonts.gstatic.com;
//        connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.sslcommerz.com;
//        frame-src 'self' https://*.sslcommerz.com https://www.youtube.com;
//        base-uri 'self';
//        form-action 'self' https://*.sslcommerz.com;
//        frame-ancestors 'none';`
//         .replace(/\s+/g, " ")
//         .trim();

//   // 1. WEBHOOK REDIRECT FIX: Intercept the success page instantly.
//   if (currentUrl.pathname === "/checkout/success") {
//     logger.info(
//       "Success page route requested. Bypassing proxy constraints cleanly.",
//       {
//         path: currentUrl.pathname,
//         method: request.method,
//       },
//     );

//     const successResponse = NextResponse.next();
//     successResponse.headers.set("Content-Security-Policy", compiledCspRule);
//     return successResponse;
//   }

//   const clientIp = request.headers.get("x-forwarded-for") ?? "127.0.0.1";

//   // 2. PERFORMANCE OPTIMIZATION: Detect background prefetch requests instantly
//   const isPrefetch =
//     request.headers.get("x-nextjs-prefetch") ||
//     request.headers.get("purpose") === "prefetch";

//   let baseResponse = NextResponse.next();

//   // Attach uniform security headers across all typical routing operations
//   baseResponse.headers.set("Content-Security-Policy", compiledCspRule);
//   baseResponse.headers.set(
//     "X-Frame-Options",
//     isDevelopmentEnvironment ? "SAMEORIGIN" : "DENY",
//   );
//   baseResponse.headers.set("X-Content-Type-Options", "nosniff");
//   baseResponse.headers.set(
//     "Referrer-Policy",
//     "strict-origin-when-cross-origin",
//   );

//   if (!isDevelopmentEnvironment) {
//     baseResponse.headers.set(
//       "Strict-Transport-Security",
//       "max-age=63072000; includeSubDomains; preload",
//     );
//   }

//   baseResponse.headers.set(
//     "Permissions-Policy",
//     "geolocation=(), camera=(), microphone=(), payment=(self)",
//   );

//   if (isPrefetch) {
//     return baseResponse;
//   }

//   // Securely intercept and validate origin references
//   const originHeader = request.headers.get("origin");

//   if (originHeader && originHeader !== "null") {
//     try {
//       const validatedOrigin = new URL(originHeader).origin;
//       const canonicalAppOrigin = process.env.NEXT_PUBLIC_APP_URL
//         ? new URL(process.env.NEXT_PUBLIC_APP_URL).origin
//         : null;

//       if (canonicalAppOrigin && validatedOrigin !== canonicalAppOrigin) {
//         const isLocalNetworkRequest =
//           isDevelopmentEnvironment &&
//           (validatedOrigin.includes("localhost") ||
//             validatedOrigin.includes("127.0.0.1") ||
//             validatedOrigin.startsWith("http://192.168."));

//         if (!isLocalNetworkRequest) {
//           logger.warn("Cross-Origin Request Blocked", {
//             url: currentUrl.pathname,
//             origin: validatedOrigin,
//             ip: clientIp,
//           });
//           return new NextResponse("Cross-Origin Request Blocked", {
//             status: 403,
//           });
//         }
//       }
//     } catch (err) {
//       logger.error("Malformed Origin Header Entry Encountered", err, {
//         origin: originHeader,
//         ip: clientIp,
//       });
//       return new NextResponse("Malformed Origin Header Entry", { status: 400 });
//     }
//   } else if (originHeader === "null") {
//     logger.info("Permitted null origin pass-through (Webhook/Redirect)", {
//       path: currentUrl.pathname,
//       ip: clientIp,
//     });
//   }

//   // Apply targeted protection strategies only to interactive processing routes
//   if (
//     currentUrl.pathname.startsWith("/api/checkout") ||
//     currentUrl.pathname.startsWith("/dashboard") ||
//     currentUrl.pathname.startsWith("/auth")
//   ) {
//     try {
//       let decision;

//       if (isDevelopmentEnvironment) {
//         decision = await Promise.race([
//           aj.protect(request, { requested: 1 }),
//           new Promise((_, reject) =>
//             setTimeout(
//               () => reject(new Error("Local DNS/Network Timeout")),
//               3000,
//             ),
//           ),
//         ]);
//       } else {
//         decision = await aj.protect(request, { requested: 1 });
//       }

//       if (decision.isDenied()) {
//         const isBotTrigger = decision.reason.isBot();

//         logger.warn(
//           isBotTrigger
//             ? "Automated malicious bot traffic deflected"
//             : "Client API rate limit threshold reached",
//           {
//             context: "ARCJET_SECURITY_SHIELD",
//             path: currentUrl.pathname,
//             ip: clientIp,
//             reason: decision.reason,
//           },
//         );

//         return NextResponse.json(
//           {
//             error: isBotTrigger
//               ? "Automated access blocked"
//               : "Rate limit exceeded",
//           },
//           { status: isBotTrigger ? 403 : 429 },
//         );
//       }
//     } catch (edgeErr) {
//       logger.error(
//         "Arcjet connection layer bypassed via fail-open fallback route",
//         edgeErr,
//         { ip: clientIp, path: currentUrl.pathname },
//       );
//     }
//   }

//   // 4. SCOPED SERVER-SIDE PATH ACCESS AUTHORIZATION
//   if (currentUrl.pathname.startsWith("/dashboard")) {
//     const supabase = createServerClient(
//       process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//       {
//         cookies: {
//           getAll() {
//             return request.cookies.getAll();
//           },
//           setAll(cookiesToSet) {
//             cookiesToSet.forEach(({ name, value, options }) => {
//               request.cookies.set(name, value, options);
//               baseResponse.cookies.set(name, value, options);
//             });
//           },
//         },
//       },
//     );

//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) {
//       logger.info("Unauthenticated session redirecting to login gateway", {
//         targetPath: currentUrl.pathname,
//       });
//       return NextResponse.redirect(
//         new URL(
//           `/login?redirect=${encodeURIComponent(currentUrl.pathname)}`,
//           request.url,
//         ),
//         303,
//       );
//     }

//     const assignedUserRole =
//       user.app_metadata?.role || user.user_metadata?.role || "user";
//     const attemptsAccessToStaffPages = [
//       "/dashboard/inventory",
//       "/dashboard/publications",
//     ].some((p) => currentUrl.pathname.startsWith(p));
//     const attemptsAccessToAdminPages = [
//       "/dashboard/users",
//       "/dashboard/messages",
//     ].some((p) => currentUrl.pathname.startsWith(p));

//     if (attemptsAccessToAdminPages && assignedUserRole !== "admin") {
//       logger.warn(
//         "Privileged access unauthorized violation: Rejecting non-admin request",
//         { userId: user.id, role: assignedUserRole, path: currentUrl.pathname },
//       );
//       return NextResponse.redirect(
//         new URL("/dashboard?error=unauthorized_admin", request.url),
//         303,
//       );
//     }
//     if (
//       attemptsAccessToStaffPages &&
//       !["admin", "contributor", "staff"].includes(assignedUserRole)
//     ) {
//       logger.warn(
//         "Privileged access unauthorized violation: Rejecting non-staff request",
//         { userId: user.id, role: assignedUserRole, path: currentUrl.pathname },
//       );
//       return NextResponse.redirect(
//         new URL("/dashboard?error=unauthorized_staff", request.url),
//         303,
//       );
//     }
//   }

//   return baseResponse;
// }

// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|api/media|api/archive|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
//   ],
// };

// export default proxy;

// import { NextResponse } from "next/server";
// import { createServerClient } from "@supabase/ssr";
// import arcjet, { tokenBucket, detectBot } from "@arcjet/next";
// import { logger } from "@/lib/logger";

// const aj = arcjet({
//   key: process.env.ARCJET_KEY,
//   characteristics: ["ip.src"],
//   rules: [
//     detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE"] }),
//     tokenBucket({ mode: "LIVE", refillRate: 5, interval: "10s", capacity: 20 }),
//   ],
// });

// export async function proxy(request) {
//   const currentUrl = request.nextUrl.clone();
//   const isDevelopmentEnvironment = process.env.NODE_ENV === "development";

//   // Build a production-grade Content Security Policy matrix dynamically
//   const compiledCspRule = isDevelopmentEnvironment
//     ? `default-src 'self' http://localhost:* ws://localhost:*;
//        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.sslcommerz.com https://*.supabase.co;
//        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
//        img-src 'self' data: blob: https://*.supabase.co https://*.sslcommerz.com;
//        font-src 'self' https://fonts.gstatic.com;
//        connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.sslcommerz.com ws://localhost:* http://localhost:* chrome-extension://* blob:;
//        frame-src 'self' https://*.sslcommerz.com https://www.youtube.com;
//        base-uri 'self';
//        form-action 'self' https://*.sslcommerz.com;
//        frame-ancestors 'self' http://localhost:*;`
//         .replace(/\s+/g, " ")
//         .trim()
//     : `default-src 'self';
//        script-src 'self' 'unsafe-inline' https://*.sslcommerz.com https://*.supabase.co;
//        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
//        img-src 'self' data: blob: https://*.supabase.co https://*.sslcommerz.com;
//        font-src 'self' https://fonts.gstatic.com;
//        connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.sslcommerz.com;
//        frame-src 'self' https://*.sslcommerz.com https://www.youtube.com;
//        base-uri 'self';
//        form-action 'self' https://*.sslcommerz.com;
//        frame-ancestors 'none';`
//         .replace(/\s+/g, " ")
//         .trim();

//   // 1. WEBHOOK REDIRECT PROTECTION
//   if (currentUrl.pathname === "/checkout/success") {
//     logger.info(
//       "Success page route requested. Attaching standard CSP headers.",
//       {
//         path: currentUrl.pathname,
//         method: request.method,
//       },
//     );

//     const successResponse = NextResponse.next();
//     successResponse.headers.set("Content-Security-Policy", compiledCspRule);
//     return successResponse;
//   }

//   const clientIp = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
//   const isPrefetch =
//     request.headers.get("x-nextjs-prefetch") ||
//     request.headers.get("purpose") === "prefetch";

//   let baseResponse = NextResponse.next();

//   // Attach uniform security headers globally across routing boundaries
//   baseResponse.headers.set("Content-Security-Policy", compiledCspRule);
//   baseResponse.headers.set(
//     "X-Frame-Options",
//     isDevelopmentEnvironment ? "SAMEORIGIN" : "DENY",
//   );
//   baseResponse.headers.set("X-Content-Type-Options", "nosniff");
//   baseResponse.headers.set(
//     "Referrer-Policy",
//     "strict-origin-when-cross-origin",
//   );

//   if (!isDevelopmentEnvironment) {
//     baseResponse.headers.set(
//       "Strict-Transport-Security",
//       "max-age=63072000; includeSubDomains; preload",
//     );
//   }

//   baseResponse.headers.set(
//     "Permissions-Policy",
//     "geolocation=(), camera=(), microphone=(), payment=(self)",
//   );

//   if (isPrefetch) {
//     return baseResponse;
//   }

//   // Intercept and validate cross-origin requests
//   const originHeader = request.headers.get("origin");
//   if (originHeader && originHeader !== "null") {
//     try {
//       const validatedOrigin = new URL(originHeader).origin;
//       const canonicalAppOrigin = process.env.NEXT_PUBLIC_APP_URL
//         ? new URL(process.env.NEXT_PUBLIC_APP_URL).origin
//         : null;

//       if (canonicalAppOrigin && validatedOrigin !== canonicalAppOrigin) {
//         const isLocalNetworkRequest =
//           isDevelopmentEnvironment &&
//           (validatedOrigin.includes("localhost") ||
//             validatedOrigin.includes("127.0.0.1") ||
//             validatedOrigin.startsWith("http://192.168."));

//         if (!isLocalNetworkRequest) {
//           logger.warn("Cross-Origin Request Blocked via proxy validation", {
//             url: currentUrl.pathname,
//             origin: validatedOrigin,
//             ip: clientIp,
//           });
//           return new NextResponse("Cross-Origin Request Blocked", {
//             status: 403,
//           });
//         }
//       }
//     } catch (err) {
//       logger.error("Malformed Origin Header Entry Encountered", err, {
//         origin: originHeader,
//         ip: clientIp,
//       });
//       return new NextResponse("Malformed Origin Header Entry", { status: 400 });
//     }
//   }

//   // Apply rate limiting and bot shields to interactive processing pathways
//   if (
//     currentUrl.pathname.startsWith("/api/checkout") ||
//     currentUrl.pathname.startsWith("/dashboard") ||
//     currentUrl.pathname.startsWith("/auth")
//   ) {
//     try {
//       let decision;
//       if (isDevelopmentEnvironment) {
//         decision = await Promise.race([
//           aj.protect(request, { requested: 1 }),
//           new Promise((_, reject) =>
//             setTimeout(
//               () => reject(new Error("Local DNS/Network Timeout")),
//               3000,
//             ),
//           ),
//         ]);
//       } else {
//         decision = await aj.protect(request, { requested: 1 });
//       }

//       if (decision.isDenied()) {
//         const isBotTrigger = decision.reason.isBot();
//         logger.warn(
//           isBotTrigger
//             ? "Automated bot traffic deflected"
//             : "Client API rate limit threshold reached",
//           { context: "ARCJET_SHIELD", path: currentUrl.pathname, ip: clientIp },
//         );

//         return NextResponse.json(
//           {
//             error: isBotTrigger
//               ? "Automated access blocked"
//               : "Rate limit exceeded",
//           },
//           { status: isBotTrigger ? 403 : 429 },
//         );
//       }
//     } catch (edgeErr) {
//       logger.error(
//         "Arcjet connection layer error, failing open safely",
//         edgeErr,
//         { ip: clientIp, path: currentUrl.pathname },
//       );
//     }
//   }

//   // 2. BACKEND ROLE-CHECK AUTHORIZATION LOGIC (Database Driven, Not JWT Dependent)
//   if (currentUrl.pathname.startsWith("/dashboard")) {
//     const supabase = createServerClient(
//       process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//       {
//         cookies: {
//           getAll() {
//             return request.cookies.getAll();
//           },
//           setAll(cookiesToSet) {
//             cookiesToSet.forEach(({ name, value, options }) => {
//               request.cookies.set(name, value, options);
//               baseResponse.cookies.set(name, value, options);
//             });
//           },
//         },
//       },
//     );

//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) {
//       logger.info(
//         "Unauthenticated proxy session redirecting to login portal.",
//         { targetPath: currentUrl.pathname },
//       );
//       return NextResponse.redirect(
//         new URL(
//           `/login?redirect=${encodeURIComponent(currentUrl.pathname)}`,
//           request.url,
//         ),
//         303,
//       );
//     }

//     // Security Fix: Look up the user's role directly from your database profile table
//     // instead of trusting the client-side authentication token payload.
//     const { data: userProfile, error: profileError } = await supabase
//       .from("profiles")
//       .select("role")
//       .eq("id", user.id)
//       .single();

//     if (profileError || !userProfile) {
//       logger.error(
//         "Failed to retrieve authoritative role verification data from DB profile index.",
//         profileError,
//         { userId: user.id },
//       );
//       return NextResponse.redirect(
//         new URL("/login?error=profile_unresolved", request.url),
//         303,
//       );
//     }

//     const assignedUserRole = userProfile.role || "customer";

//     const attemptsAccessToStaffPages = [
//       "/dashboard/inventory",
//       "/dashboard/publications",
//     ].some((p) => currentUrl.pathname.startsWith(p));

//     const attemptsAccessToAdminPages = [
//       "/dashboard/users",
//       "/dashboard/messages",
//     ].some((p) => currentUrl.pathname.startsWith(p));

//     // Admin Barrier Block
//     if (attemptsAccessToAdminPages && assignedUserRole !== "admin") {
//       logger.warn(
//         "Privileged access unauthorized violation: Rejecting non-admin request",
//         {
//           userId: user.id,
//           role: assignedUserRole,
//           path: currentUrl.pathname,
//         },
//       );
//       return NextResponse.redirect(
//         new URL("/dashboard?error=unauthorized_admin", request.url),
//         303,
//       );
//     }

//     // Staff / Contributor Barrier Block
//     if (
//       attemptsAccessToStaffPages &&
//       !["admin", "contributor", "staff"].includes(assignedUserRole)
//     ) {
//       logger.warn(
//         "Privileged access unauthorized violation: Rejecting non-staff request",
//         {
//           userId: user.id,
//           role: assignedUserRole,
//           path: currentUrl.pathname,
//         },
//       );
//       return NextResponse.redirect(
//         new URL("/dashboard?error=unauthorized_staff", request.url),
//         303,
//       );
//     }
//   }

//   return baseResponse;
// }

// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|api/media|api/archive|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
//   ],
// };

// export default proxy;

import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import arcjet, { tokenBucket, detectBot } from "@arcjet/next";
import { logger } from "@/lib/logger";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE"] }),
    tokenBucket({ mode: "LIVE", refillRate: 5, interval: "10s", capacity: 20 }),
  ],
});

export async function proxy(request) {
  const requestStartTime = Date.now();
  const currentUrl = request.nextUrl.clone();
  const isDevelopmentEnvironment = process.env.NODE_ENV === "development";
  const clientIp = request.headers.get("x-forwarded-for") ?? "127.0.0.1";

  // Build a production-grade Content Security Policy matrix dynamically
  const compiledCspRule = isDevelopmentEnvironment
    ? `default-src 'self' http://localhost:* ws://localhost:*; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.sslcommerz.com https://*.supabase.co; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://*.supabase.co https://*.sslcommerz.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.sslcommerz.com ws://localhost:* http://localhost:* chrome-extension://* blob:; frame-src 'self' https://*.sslcommerz.com https://www.youtube.com; base-uri 'self'; form-action 'self' https://*.sslcommerz.com; frame-ancestors 'self' http://localhost:*;`
        .replace(/\s+/g, " ")
        .trim()
    : `default-src 'self'; script-src 'self' 'unsafe-inline' https://*.sslcommerz.com https://*.supabase.co; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://*.supabase.co https://*.sslcommerz.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.sslcommerz.com; frame-src 'self' https://*.sslcommerz.com https://www.youtube.com; base-uri 'self'; form-action 'self' https://*.sslcommerz.com; frame-ancestors 'none';`
        .replace(/\s+/g, " ")
        .trim();

  // Create base response and helper to universally apply security headers
  let baseResponse = NextResponse.next({
    request: { headers: request.headers },
  });

  const applyHeaders = (res) => {
    res.headers.set("Content-Security-Policy", compiledCspRule);
    res.headers.set(
      "X-Frame-Options",
      isDevelopmentEnvironment ? "SAMEORIGIN" : "DENY",
    );
    res.headers.set("X-Content-Type-Options", "nosniff");
    res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    if (!isDevelopmentEnvironment) {
      res.headers.set(
        "Strict-Transport-Security",
        "max-age=63072000; includeSubDomains; preload",
      );
    }
    res.headers.set(
      "Permissions-Policy",
      "geolocation=(), camera=(), microphone=(), payment=(self)",
    );
    return res;
  };

  // 1. WEBHOOK REDIRECT PROTECTION
  if (currentUrl.pathname === "/checkout/success") {
    return applyHeaders(NextResponse.next());
  }

  const isPrefetch =
    request.headers.get("x-nextjs-prefetch") ||
    request.headers.get("purpose") === "prefetch";

  // 2. UNIFORM GLOBAL SECURITY HEADERS
  baseResponse = applyHeaders(baseResponse);

  if (isPrefetch) return baseResponse;

  // 3. CROSS-ORIGIN VERIFICATION
  const originHeader = request.headers.get("origin");
  if (originHeader && originHeader !== "null") {
    try {
      const validatedOrigin = new URL(originHeader).origin;
      const canonicalAppOrigin = process.env.NEXT_PUBLIC_APP_URL
        ? new URL(process.env.NEXT_PUBLIC_APP_URL).origin
        : null;

      if (canonicalAppOrigin && validatedOrigin !== canonicalAppOrigin) {
        const isLocalNetworkRequest =
          isDevelopmentEnvironment &&
          (validatedOrigin.includes("localhost") ||
            validatedOrigin.includes("127.0.0.1") ||
            validatedOrigin.startsWith("http://192.168."));
        if (!isLocalNetworkRequest) {
          logger.warn("Cross-Origin Request Blocked", {
            url: currentUrl.pathname,
            origin: validatedOrigin,
            ip: clientIp,
          });
          return applyHeaders(
            new NextResponse("Cross-Origin Request Blocked", { status: 403 }),
          );
        }
      }
    } catch (err) {
      return applyHeaders(
        new NextResponse("Malformed Origin Header Entry", { status: 400 }),
      );
    }
  }

  // 4. ARCJET RATE LIMITING & BOT SHIELD
  if (
    currentUrl.pathname.startsWith("/api/checkout") ||
    currentUrl.pathname.startsWith("/dashboard") ||
    currentUrl.pathname.startsWith("/auth") ||
    currentUrl.pathname.startsWith("/api/admin")
  ) {
    try {
      let decision = isDevelopmentEnvironment
        ? await Promise.race([
            aj.protect(request, { requested: 1 }),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Local Timeout")), 3000),
            ),
          ])
        : await aj.protect(request, { requested: 1 });

      if (decision.isDenied()) {
        const isBotTrigger = decision.reason.isBot();
        logger.warn(
          isBotTrigger
            ? "Automated bot traffic deflected"
            : "API rate limit threshold breached",
          { path: currentUrl.pathname, ip: clientIp },
        );
        return applyHeaders(
          NextResponse.json(
            {
              error: isBotTrigger
                ? "Automated access blocked"
                : "Rate limit exceeded",
            },
            { status: isBotTrigger ? 403 : 429 },
          ),
        );
      }
    } catch (edgeErr) {
      logger.error(
        "Arcjet connection layer error, failing open safely",
        edgeErr,
      );
    }
  }

  // 5. SSR AUTH & DATABASE-BACKED ROLE AUTHORIZATION (RBAC)
  const isDashboardRoute = currentUrl.pathname.startsWith("/dashboard");
  const isAdminApiRoute = currentUrl.pathname.startsWith("/api/admin");

  if (isDashboardRoute || isAdminApiRoute) {
    const supabase = createServerClient(
      process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value, options);
              baseResponse.cookies.set(name, value, options);
            });
          },
        },
      },
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Helper: Safely moves refreshed auth cookies to redirect/error responses
    const enforceResponse = (res) => {
      baseResponse.cookies
        .getAll()
        .forEach((c) => res.cookies.set(c.name, c.value, c));
      return applyHeaders(res);
    };

    if (!user) {
      if (isAdminApiRoute) {
        return enforceResponse(
          NextResponse.json(
            { error: "Authentication required" },
            { status: 401 },
          ),
        );
      }
      return enforceResponse(
        NextResponse.redirect(
          new URL(
            `/login?redirect=${encodeURIComponent(currentUrl.pathname)}`,
            request.url,
          ),
          303,
        ),
      );
    }

    const { data: userProfile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    const assignedUserRole = userProfile?.role || "customer";

    const attemptsAccessToStaffPages = [
      "/dashboard/inventory",
      "/dashboard/publications",
    ].some((p) => currentUrl.pathname.startsWith(p));
    const attemptsAccessToAdminPages = [
      "/dashboard/users",
      "/dashboard/messages",
      "/dashboard/settings",
    ].some((p) => currentUrl.pathname.startsWith(p));

    if (
      (attemptsAccessToAdminPages || isAdminApiRoute) &&
      assignedUserRole !== "admin"
    ) {
      logger.warn("Unauthorized administrative boundary access attempted.", {
        userId: user.id,
        role: assignedUserRole,
        path: currentUrl.pathname,
      });

      if (isAdminApiRoute) {
        return enforceResponse(
          NextResponse.json(
            { error: "Insufficient system privileges." },
            { status: 403 },
          ),
        );
      }
      return enforceResponse(
        NextResponse.redirect(
          new URL("/dashboard?error=unauthorized_admin", request.url),
          303,
        ),
      );
    }

    if (
      attemptsAccessToStaffPages &&
      !["admin", "contributor"].includes(assignedUserRole)
    ) {
      return enforceResponse(
        NextResponse.redirect(
          new URL("/dashboard?error=unauthorized_staff", request.url),
          303,
        ),
      );
    }
  }

  // 6. APM MONITORING
  const responseDuration = Date.now() - requestStartTime;
  logger.info("Proxy Cycle Resolved", {
    path: currentUrl.pathname,
    method: request.method,
    durationMs: responseDuration,
    ip: clientIp,
  });

  return baseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/media|api/archive|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

export default proxy;
