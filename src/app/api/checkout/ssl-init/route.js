// import { NextResponse } from "next/server";
// import { createServerClient } from "@supabase/ssr";

// export async function POST(req) {
//   try {
//     const systemBaseUrl =
//       process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
//     const requestOrigin =
//       req.headers.get("origin") || req.headers.get("referer");

//     // =====================================================================
//     // STEP 1: ZERO-TRUST CORS BOUNDARY VALIDATION
//     // =====================================================================
//     if (process.env.NODE_ENV === "production" && requestOrigin) {
//       if (!requestOrigin.startsWith(systemBaseUrl)) {
//         return NextResponse.json(
//           {
//             error:
//               "Security Exception: Request cross-origin signature verification mismatch",
//           },
//           { status: 403 },
//         );
//       }
//     }

//     // Initialize an authentic server-side Supabase client using browser request tokens
//     let supabaseResponse = NextResponse.next();
//     const supabase = createServerClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//       {
//         cookies: {
//           getAll() {
//             return req.cookies.getAll();
//           },
//           setAll(cookiesToSet) {
//             cookiesToSet.forEach(({ name, value, options }) =>
//               req.cookies.set(name, value, options),
//             );
//           },
//         },
//       },
//     );

//     // =====================================================================
//     // STEP 2: RE-AUTHENTICATE CUSTOMER SESSION ON THE SERVER
//     // =====================================================================
//     const {
//       data: { user },
//       error: authError,
//     } = await supabase.auth.getUser();
//     if (authError || !user) {
//       return NextResponse.json(
//         { error: "Access Denied: Unauthenticated checkout session signature" },
//         { status: 401 },
//       );
//     }

//     const body = await req.json();
//     const { items, customer_name, customer_email, phone, address } = body;

//     // Validate request structure structural integrity
//     if (!items || !Array.isArray(items) || items.length === 0) {
//       return NextResponse.json(
//         {
//           error:
//             "Data Validation Refused: Missing structural payload items matrix",
//         },
//         { status: 400 },
//       );
//     }

//     // =====================================================================
//     // STEP 3: SERVER-SIDE PRICE & INVENTORY VALIDATION (IMMUTABLE RESOLUTION)
//     // =====================================================================
//     const productIds = items.map((item) => item.id);

//     // Pull verified, unalterable item prices directly from your secured inventory table
//     const { data: dbProducts, error: dbError } = await supabase
//       .from("inventory")
//       .select("id, price, stock, name")
//       .in("id", productIds);

//     if (dbError || !dbProducts || dbProducts.length !== productIds.length) {
//       return NextResponse.json(
//         {
//           error:
//             "Processing Failure: One or more requested artifacts could not be verified in the database archive",
//         },
//         { status: 404 },
//       );
//     }

//     let serverCalculatedTotal = 0;

//     // Map array elements to run calculations safely using server-isolated memory metrics
//     for (const clientItem of items) {
//       const matchedDbProduct = dbProducts.find((p) => p.id === clientItem.id);

//       // Stock Availability Gate
//       if (matchedDbProduct.stock < clientItem.quantity) {
//         return NextResponse.json(
//           {
//             error: `Inventory Exhausted: "${matchedDbProduct.name}" does not possess sufficient stock limits for this order`,
//           },
//           { status: 400 },
//         );
//       }

//       // Accumulate total using database-resolved values only
//       serverCalculatedTotal +=
//         Number(matchedDbProduct.price) * parseInt(clientItem.quantity, 10);
//     }

//     // Add delivery constants securely on the server environment side
//     const baseShippingFee = 80;
//     const finalCalculatedAmount = serverCalculatedTotal + baseShippingFee;

//     // Generate a secure, trackable database transaction order ledger row
//     const internalTransactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

//     const { error: orderInsertionError } = await supabase
//       .from("orders")
//       .insert({
//         id: internalTransactionId,
//         user_id: user.id,
//         total_amount: finalCalculatedAmount,
//         status: "pending", // Enforced directly by Layer 1 RLS setup
//         customer_details: {
//           name: customer_name,
//           email: customer_email,
//           phone,
//           address,
//         },
//         items_snapshot: items.map((i) => ({
//           id: i.id,
//           quantity: i.quantity,
//           database_price_resolved: dbProducts.find((p) => p.id === i.id).price,
//         })),
//       });

//     if (orderInsertionError) {
//       return NextResponse.json(
//         {
//           error:
//             "Database Synchronization Exception: Local order initialization sequence failed",
//         },
//         { status: 500 },
//       );
//     }

//     // =====================================================================
//     // STEP 4: HANDSHAKE CONSTRAINTS DISPATCH TO SSLCOMMERZ GATEWAY
//     // =====================================================================
//     const gatewayParams = new URLSearchParams();
//     gatewayParams.append("store_id", process.env.SSLCOMMERZ_STORE_ID);
//     gatewayParams.append("store_passwd", process.env.SSLCOMMERZ_STORE_PASSWORD);
//     gatewayParams.append("total_amount", finalCalculatedAmount.toFixed(2));
//     gatewayParams.append("currency", "BDT");
//     gatewayParams.append("tran_id", internalTransactionId);

//     // Server-isolated routing endpoint triggers
//     gatewayParams.append(
//       "success_url",
//       `${systemBaseUrl}/api/checkout/payment-webhook?action=success&id=${internalTransactionId}`,
//     );
//     gatewayParams.append(
//       "fail_url",
//       `${systemBaseUrl}/shop?payment_status=failed&ref=${internalTransactionId}`,
//     );
//     gatewayParams.append(
//       "cancel_url",
//       `${systemBaseUrl}/shop?payment_status=cancelled`,
//     );

//     // Customer profile strings
//     gatewayParams.append(
//       "cus_name",
//       customer_name?.replace(/[<>]/g, "") || "Anonymous Patron",
//     );
//     gatewayParams.append("cus_email", customer_email || user.email);
//     gatewayParams.append("cus_phone", phone || "01700000000");
//     gatewayParams.append(
//       "cus_add1",
//       address?.replace(/[<>]/g, "") || "Dhaka, Bangladesh",
//     );
//     gatewayParams.append("cus_city", "Dhaka");
//     gatewayParams.append("cus_country", "Bangladesh");
//     gatewayParams.append("shipping_method", "NO");
//     gatewayParams.append(
//       "product_name",
//       "Nazrul Archive Collective Cultural Deliverables",
//     );
//     gatewayParams.append("product_category", "E-Commerce Package");
//     gatewayParams.append("product_profile", "general");

//     const gatewayUrl =
//       process.env.NODE_ENV === "production"
//         ? "https://securepay.sslcommerz.com/gwprocess/v4/api.php"
//         : "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

//     const gatewayHandshakeStream = await fetch(gatewayUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: gatewayParams.toString(),
//     });

//     const gatewayHandshakeOutput = await gatewayHandshakeStream.json();

//     if (
//       gatewayHandshakeOutput?.status === "SUCCESS" &&
//       gatewayHandshakeOutput?.GatewayPageURL
//     ) {
//       return NextResponse.json({ url: gatewayHandshakeOutput.GatewayPageURL });
//     }

//     return NextResponse.json(
//       {
//         error:
//           gatewayHandshakeOutput?.failedreason ||
//           "Secure Payment Gateway connection protocol handshake failed",
//       },
//       { status: 400 },
//     );
//   } catch (globalFaultContext) {
//     console.error(
//       "Critical Unhandled Secure Checkout Pipeline Exception:",
//       globalFaultContext,
//     );
//     return NextResponse.json(
//       { error: "Internal Secure Processing Server Error Boundary Intercepted" },
//       { status: 500 },
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { createServerClient } from "@supabase/ssr";
// import { createClient } from "@supabase/supabase-js";
// import crypto from "crypto";
// import { CheckoutInputSchema, validateEnv } from "@/lib/validation/schemas";

// export const dynamic = "force-dynamic";

// export async function POST(req) {
//   try {
//     // 1. RUNTIME ENGINE BOUNDARY INFRASTRUCTURE HEALTH CHECKS
//     validateEnv();

//     const systemBaseUrl =
//       process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
//     const requestOrigin =
//       req.headers.get("origin") || req.headers.get("referer");

//     // STRENGTHEN ORIGIN CHECKS: Replaces weak string match rules with explicit URL origin domain objects (Issue 7)
//     if (process.env.NODE_ENV === "production" && requestOrigin) {
//       try {
//         const strictOriginDomain = new URL(requestOrigin).origin;
//         const targetSystemDomain = new URL(systemBaseUrl).origin;
//         if (strictOriginDomain !== targetSystemDomain) {
//           return NextResponse.json(
//             { error: "Access Exception: Origin authentication rejected" },
//             { status: 403 },
//           );
//         }
//       } catch (err) {
//         return NextResponse.json(
//           { error: "Malformed HTTP client header data stream rejected" },
//           { status: 400 },
//         );
//       }
//     }

//     const supabaseUserClient = createServerClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//       {
//         cookies: {
//           getAll() {
//             return req.cookies.getAll();
//           },
//           setAll(cookiesToSet) {
//             try {
//               cookiesToSet.forEach(({ name, value, options }) =>
//                 req.cookies.set(name, value, options),
//               );
//             } catch (e) {}
//           },
//         },
//       },
//     );

//     const {
//       data: { user },
//       error: authError,
//     } = await supabaseUserClient.auth.getUser();
//     if (authError || !user) {
//       return NextResponse.json(
//         { error: "Access Denied: Session verification signature mismatch" },
//         { status: 401 },
//       );
//     }

//     // 2. PARSE AND RUN INPUT SCHEMA VALIDATION ENGINE
//     const unvalidatedBody = await req.json();
//     const validationParser = CheckoutInputSchema.safeParse(unvalidatedBody);

//     if (!validationParser.success) {
//       return NextResponse.json(
//         {
//           error: "Payload Parsing Rejected",
//           details: validationParser.error.format(),
//         },
//         { status: 400 },
//       );
//     }

//     const {
//       items: incomingItems,
//       customer_name,
//       customer_email,
//       phone,
//       address,
//     } = validationParser.data;

//     // SERVER-SIDE GENERATION ONLY: Prevents client injection attacks (Issue 9)
//     const internalTransactionId = `TXN-${crypto.randomBytes(8).toString("hex").toUpperCase()}-${Date.now()}`;

//     // Initialize administrative connection isolated from public credentials (Issue 5)
//     const supabaseAdminClient = createClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL,
//       process.env.SUPABASE_SERVICE_ROLE_KEY,
//     );

//     const productIds = incomingItems.map((item) => item.id);
//     const { data: dbProducts, error: dbError } = await supabaseAdminClient
//       .from("inventory")
//       .select("id, price, stock_quantity, item_name")
//       .in("id", productIds);

//     if (dbError || !dbProducts || dbProducts.length !== productIds.length) {
//       return NextResponse.json(
//         {
//           error:
//             "Database Reference Mismatch: Item mappings do not match inventory records",
//         },
//         { status: 404 },
//       );
//     }

//     let serverCalculatedTotal = 0;
//     for (const clientItem of incomingItems) {
//       const matchedDbProduct = dbProducts.find((p) => p.id === clientItem.id);
//       if ((matchedDbProduct?.stock_quantity ?? 0) < clientItem.quantity) {
//         return NextResponse.json(
//           {
//             error: `Inventory Depleted: "${matchedDbProduct?.item_name || "Item"}" out of stock`,
//           },
//           { status: 400 },
//         );
//       }
//       serverCalculatedTotal +=
//         Number(matchedDbProduct.price) * clientItem.quantity;
//     }

//     const finalCalculatedAmount = serverCalculatedTotal + 100;

//     const { error: orderInsertionError } = await supabaseAdminClient
//       .from("orders")
//       .insert({
//         user_id: user.id,
//         total_amount: finalCalculatedAmount,
//         status: "pending",
//         payment_method: "sslcommerz",
//         customer_address: address,
//         tran_id: internalTransactionId,
//         items: incomingItems,
//       });

//     if (orderInsertionError) {
//       return NextResponse.json(
//         {
//           error:
//             "Database Synchronization Exception: Order initialization sequence failed",
//         },
//         { status: 500 },
//       );
//     }

//     // 3. EXECUTE GATEWAY HANDSHAKE REQUEST DISPATCH
//     const gatewayParams = new URLSearchParams();
//     gatewayParams.append("store_id", process.env.SSLCOMMERZ_STORE_ID);
//     gatewayParams.append("store_passwd", process.env.SSLCOMMERZ_STORE_PASSWORD);
//     gatewayParams.append("total_amount", String(finalCalculatedAmount));
//     gatewayParams.append("currency", "BDT");
//     gatewayParams.append("tran_id", internalTransactionId);
//     gatewayParams.append(
//       "success_url",
//       `${systemBaseUrl}/api/checkout/payment-webhook?action=success&id=${internalTransactionId}`,
//     );
//     gatewayParams.append(
//       "fail_url",
//       `${systemBaseUrl}/api/checkout/payment-webhook?action=fail&id=${internalTransactionId}`,
//     );
//     gatewayParams.append(
//       "cancel_url",
//       `${systemBaseUrl}/api/checkout/payment-webhook?action=cancel&id=${internalTransactionId}`,
//     );
//     gatewayParams.append("cus_name", customer_name);
//     gatewayParams.append("cus_email", customer_email);
//     gatewayParams.append("cus_add1", address);
//     gatewayParams.append("cus_phone", phone);
//     gatewayParams.append("cus_country", "Bangladesh");
//     gatewayParams.append("shipping_method", "NO");
//     gatewayParams.append(
//       "product_name",
//       "Nazrul Archive Checkout Material Collection",
//     );
//     gatewayParams.append("product_category", "Archive Materials");
//     gatewayParams.append("product_profile", "general");

//     const sslcommerzInitEndpoint =
//       process.env.NODE_ENV === "production"
//         ? "https://securepay.sslcommerz.com/gwprocess/v4/api.php"
//         : "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

//     const gatewayResponse = await fetch(sslcommerzInitEndpoint, {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: gatewayParams.toString(),
//     });

//     const parsedResult = await gatewayResponse.json().catch(() => ({}));

//     if (parsedResult?.status === "SUCCESS" && parsedResult?.GatewayPageURL) {
//       return NextResponse.json({ url: parsedResult.GatewayPageURL });
//     }

//     return NextResponse.json(
//       { error: parsedResult?.failedreason || "Payment Initiation Aborted" },
//       { status: 400 },
//     );
//   } catch (criticalBoundaryFault) {
//     console.error(
//       "Critical Failure: Init Sequence Blocked",
//       criticalBoundaryFault,
//     );
//     return NextResponse.json(
//       { error: "Internal Server Error Boundary Met" },
//       { status: 500 },
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { createServerClient } from "@supabase/ssr";
// import { createClient } from "@supabase/supabase-js";
// import { z } from "zod";
// import crypto from "crypto";

// export const dynamic = "force-dynamic";

// // Enforce strict runtime data validation structures
// const InitCheckoutSchema = z.object({
//   items: z
//     .array(
//       z.object({
//         id: z.number().or(z.string()),
//         quantity: z.number().min(1),
//       }),
//     )
//     .min(1),
//   address: z.string().min(5),
//   phone: z.string().min(10),
// });

// export async function POST(req) {
//   try {
//     const systemBaseUrl = process.env.BASE_URL; // Server private structural URL matching address
//     const originHeader =
//       req.headers.get("origin") || req.headers.get("referer");

//     if (!systemBaseUrl) {
//       return NextResponse.json(
//         { error: "System base configuration pointer missing" },
//         { status: 500 },
//       );
//     }

//     // Verify request origin using full host comparison
//     if (originHeader) {
//       const formattedOrigin = new URL(originHeader).origin;
//       const formattedBase = new URL(systemBaseUrl).origin;
//       if (formattedOrigin !== formattedBase) {
//         return NextResponse.json(
//           { error: "Security Exception: Origin verification mismatch" },
//           { status: 403 },
//         );
//       }
//     }

//     // Initialize Supabase client using explicit cookies from next/headers
//     const supabaseUserClient = createServerClient(
//       process.env.SUPABASE_URL,
//       process.env.SUPABASE_ANON_KEY,
//       {
//         cookies: {
//           getAll() {
//             return req.cookies.getAll();
//           },
//           setAll(cookiesToSet) {
//             try {
//               cookiesToSet.forEach(({ name, value, options }) =>
//                 req.cookies.set(name, value, options),
//               );
//             } catch {}
//           },
//         },
//       },
//     );

//     const {
//       data: { user },
//       error: authError,
//     } = await supabaseUserClient.auth.getUser();
//     if (authError || !user) {
//       return NextResponse.json(
//         { error: "Access Denied: Session validation unauthenticated" },
//         { status: 401 },
//       );
//     }

//     const rawBody = await req.json();
//     const parsedPayload = InitCheckoutSchema.safeParse(rawBody);

//     if (!parsedPayload.success) {
//       return NextResponse.json(
//         {
//           error: "Data Validation Fault",
//           details: parsedPayload.error.flatten(),
//         },
//         { status: 400 },
//       );
//     }

//     const { items: incomingItems, address, phone } = parsedPayload.data;

//     // Use server environment secrets exclusively
//     const supabaseAdminClient = createClient(
//       process.env.SUPABASE_URL,
//       process.env.SUPABASE_SERVICE_ROLE_KEY,
//     );

//     const productIds = incomingItems.map((item) => item.id);
//     const { data: dbProducts, error: dbError } = await supabaseAdminClient
//       .from("inventory")
//       .select("id, price, stock_quantity, item_name")
//       .in("id", productIds);

//     if (dbError || !dbProducts || dbProducts.length !== productIds.length) {
//       return NextResponse.json(
//         { error: "Database Sync Exception: Catalog validation failed" },
//         { status: 400 },
//       );
//     }

//     let serverCalculatedTotal = 0;
//     const verifiedItemsArray = [];

//     for (const clientItem of incomingItems) {
//       const matchedDbProduct = dbProducts.find(
//         (p) => Number(p.id) === Number(clientItem.id),
//       );
//       const currentStock = matchedDbProduct?.stock_quantity ?? 0;

//       if (currentStock < clientItem.quantity) {
//         return NextResponse.json(
//           {
//             error: `Inventory Exhausted: "${matchedDbProduct?.item_name || "Item"}" has insufficient stock`,
//           },
//           { status: 400 },
//         );
//       }

//       serverCalculatedTotal +=
//         Number(matchedDbProduct.price) * clientItem.quantity;
//       verifiedItemsArray.push({
//         id: matchedDbProduct.id,
//         name: matchedDbProduct.item_name,
//         quantity: clientItem.quantity,
//         price: Number(matchedDbProduct.price),
//       });
//     }

//     const finalCalculatedAmount = serverCalculatedTotal + 100; // Add standard fixed shipping allocation fee

//     // Construct a cryptographically secure transaction identifier
//     const uniqueTransactionId = `NC-${Date.now()}-${crypto.randomUUID()}`;

//     const { error: orderInsertionError } = await supabaseAdminClient
//       .from("orders")
//       .insert({
//         user_id: user.id,
//         total_amount: finalCalculatedAmount,
//         status: "pending",
//         payment_method: "sslcommerz",
//         customer_address: address,
//         customer_phone: phone,
//         tran_id: uniqueTransactionId,
//         currency: "BDT",
//         items: verifiedItemsArray,
//       });

//     if (orderInsertionError) {
//       console.error(
//         "Orders collection registration failed:",
//         orderInsertionError.message,
//       );
//       return NextResponse.json(
//         { error: "Local transaction registry initialization failed" },
//         { status: 500 },
//       );
//     }

//     const gatewayParams = new URLSearchParams();
//     gatewayParams.append("store_id", process.env.SSLCOMMERZ_STORE_ID);
//     gatewayParams.append("store_passwd", process.env.SSLCOMMERZ_STORE_PASSWORD);
//     gatewayParams.append("total_amount", String(finalCalculatedAmount));
//     gatewayParams.append("currency", "BDT");
//     gatewayParams.append("tran_id", uniqueTransactionId);

//     // Explicit server endpoints targeting webhook processors
//     gatewayParams.append(
//       "success_url",
//       `${systemBaseUrl}/api/checkout/payment-webhook`,
//     );
//     gatewayParams.append(
//       "fail_url",
//       `${systemBaseUrl}/api/checkout/payment-webhook?action=fail`,
//     );
//     gatewayParams.append(
//       "cancel_url",
//       `${systemBaseUrl}/api/checkout/payment-webhook?action=cancel`,
//     );

//     gatewayParams.append("cus_name", user.email.split("@")[0] || "Customer");
//     gatewayParams.append("cus_email", user.email);
//     gatewayParams.append("cus_add1", address);
//     gatewayParams.append("cus_phone", phone);
//     gatewayParams.append("cus_country", "Bangladesh");
//     gatewayParams.append("shipping_method", "NO");
//     gatewayParams.append("product_name", "Nazrul Archive Cart Purchase");
//     gatewayParams.append("product_category", "Archive Materials");
//     gatewayParams.append("product_profile", "general");

//     const sslcommerzInitEndpoint =
//       process.env.NODE_ENV === "production"
//         ? "https://securepay.sslcommerz.com/gwprocess/v4/api.php"
//         : "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

//     const gatewayResponse = await fetch(sslcommerzInitEndpoint, {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: gatewayParams.toString(),
//     });

//     const initResultText = await gatewayResponse.text();
//     const parsedResult = JSON.parse(initResultText);

//     if (parsedResult?.status === "SUCCESS" && parsedResult?.GatewayPageURL) {
//       return NextResponse.json({ url: parsedResult.GatewayPageURL });
//     }

//     return NextResponse.json(
//       {
//         error:
//           parsedResult?.failedreason || "Payment channel allocation failed",
//       },
//       { status: 400 },
//     );
//   } catch (err) {
//     console.error("Payment registration route runtime crash:", err);
//     return NextResponse.json(
//       { error: "Internal Secure Server Exception Context Blocked" },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export async function POST(req) {
  try {
    const systemBaseUrl = process.env.BASE_URL || "http://localhost:3000";
    const originHeader = req.headers.get("origin");
    if (
      originHeader &&
      new URL(originHeader).origin !== new URL(systemBaseUrl).origin
    ) {
      return NextResponse.json({ error: "CSRF Exception" }, { status: 403 });
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet) =>
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            ),
        },
      },
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user)
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );

    const { items, address, phone } = await req.json();

    // 🌟 STRICT SERVER-SIDE CALCULATION: Query the DB directly
    const supabaseAdmin = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
    );
    const productIds = items.map((i) => i.id);
    const { data: dbProducts } = await supabaseAdmin
      .from("inventory")
      .select("id, price, stock_quantity")
      .in("id", productIds);

    let totalCalculatedAmount = 0;
    for (const item of items) {
      const dbProduct = dbProducts.find((p) => p.id === item.id);
      if (!dbProduct || dbProduct.stock_quantity < item.quantity)
        return NextResponse.json(
          { error: "Stock unavailable" },
          { status: 409 },
        );
      totalCalculatedAmount += Number(dbProduct.price) * item.quantity;
    }

    const tran_id = `NC-${Date.now()}-${crypto.randomBytes(6).toString("hex")}`;
    const { error: orderError } = await supabaseAdmin.from("orders").insert([
      {
        tran_id,
        user_id: user.id,
        total_amount: totalCalculatedAmount,
        currency: "BDT",
        status: "pending",
        shipping_address: address,
        contact_phone: phone,
        items,
      },
    ]);

    if (orderError) throw orderError;

    const sslcommerzPayload = new URLSearchParams({
      store_id: process.env.SSLCOMMERZ_STORE_ID,
      store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD,
      total_amount: totalCalculatedAmount,
      currency: "BDT",
      tran_id,
      success_url: `${systemBaseUrl}/api/checkout/payment-webhook?action=success`,
      fail_url: `${systemBaseUrl}/api/checkout/payment-webhook?action=fail`,
      cancel_url: `${systemBaseUrl}/api/checkout/payment-webhook?action=cancel`,
      cus_name: user.email.split("@")[0],
      cus_email: user.email,
      cus_add1: address,
      cus_phone: phone,
      shipping_method: "NO",
      product_name: "Catalog Purchase",
      product_category: "Books",
      product_profile: "physical-goods",
    });

    const sslEndpoint =
      process.env.NODE_ENV === "production"
        ? "https://securepay.sslcommerz.com/gwprocess/v4/api.php"
        : "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";
    const res = await fetch(sslEndpoint, {
      method: "POST",
      body: sslcommerzPayload,
    });
    const data = await res.json();

    if (data?.status === "SUCCESS")
      return NextResponse.json({
        url: data.GatewayPageURL,
        transactionId: tran_id,
      });
    return NextResponse.json({ error: "Gateway failure" }, { status: 502 });
  } catch (err) {
    return NextResponse.json({ error: "Server exception" }, { status: 500 });
  }
}
