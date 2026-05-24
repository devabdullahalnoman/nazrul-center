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
