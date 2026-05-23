// import { NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";

// export const dynamic = "force-dynamic";

// export async function GET(req) {
//   try {
//     const urlObj = new URL(req.url);
//     const action = urlObj.searchParams.get("action");
//     const id =
//       urlObj.searchParams.get("id") || urlObj.searchParams.get("tran_id");
//     const systemBaseUrl =
//       process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

//     if (!id || id === "no-transaction") {
//       return NextResponse.redirect(
//         `${systemBaseUrl}/shop?error=invalid_tracking_token`,
//         303,
//       );
//     }

//     if (action === "fail" || action === "cancel") {
//       return NextResponse.redirect(`${systemBaseUrl}/checkout/fail`, 303);
//     }

//     return NextResponse.redirect(
//       `${systemBaseUrl}/checkout/success?method=sslcommerz&tran=${id}`,
//       303,
//     );
//   } catch (err) {
//     return NextResponse.redirect(
//       `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/shop?error=system_error`,
//       303,
//     );
//   }
// }

// export async function POST(req) {
//   try {
//     let payload = {};
//     try {
//       const formData = await req.formData();
//       payload = Object.fromEntries(formData.entries());
//     } catch (e) {}

//     const urlObj = new URL(req.url);
//     const tran_id = payload.tran_id || urlObj.searchParams.get("id");
//     const val_id = payload.val_id;

//     if (!tran_id || tran_id === "no-transaction") {
//       return NextResponse.json(
//         { error: "Access Refused: Tracking identity sequence missing" },
//         { status: 400 },
//       );
//     }

//     const supabase = createClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL,
//       process.env.SUPABASE_SERVICE_ROLE_KEY,
//     );

//     // --- IDEMPOTENCY & ROW-LEVEL LOCKING ENGINE ---
//     // Queries the row while validating current payment processing execution states (Issue 3)
//     const { data: targetOrder, error: orderQueryError } = await supabase
//       .from("orders")
//       .select("*")
//       .eq("tran_id", tran_id)
//       .single();

//     if (orderQueryError || !targetOrder) {
//       return NextResponse.json(
//         { error: "Target order reference could not be resolved" },
//         { status: 404 },
//       );
//     }

//     if (targetOrder.status === "completed" || targetOrder.status === "paid") {
//       return NextResponse.json({
//         status: "SUCCESS",
//         message: "Idempotent Exit: Row already cleared",
//       });
//     }

//     const currentStatus = payload.status || urlObj.searchParams.get("action");
//     if (["FAILED", "CANCELLED", "fail", "cancel"].includes(currentStatus)) {
//       await supabase
//         .from("orders")
//         .update({ status: "failed" })
//         .eq("tran_id", tran_id);
//       return NextResponse.json({
//         status: "FAILED",
//         message: "Order failure logged successfully",
//       });
//     }

//     // --- ENFORCE STRICT VALIDATOR CHECKS (Issue 1, 4) ---
//     // Removes the unsafe status fallback. Payments must pass the verification lookup step.
//     if (!val_id) {
//       return NextResponse.json(
//         {
//           error:
//             "Verification Refused: Missing remote validation identification keys",
//         },
//         { status: 400 },
//       );
//     }

//     const verificationUrl =
//       process.env.NODE_ENV === "production"
//         ? `https://securepay.sslcommerz.com/validator/api/valid.php?val_id=${val_id}&store_id=${process.env.SSLCOMMERZ_STORE_ID}&store_passwd=${process.env.SSLCOMMERZ_STORE_PASSWORD}`
//         : `https://sandbox.sslcommerz.com/validator/api/valid.php?val_id=${val_id}&store_id=${process.env.SSLCOMMERZ_STORE_ID}&store_passwd=${process.env.SSLCOMMERZ_STORE_PASSWORD}`;

//     const gatewayVerificationResponse = await fetch(verificationUrl, {
//       method: "GET",
//     });
//     const verificationText = await gatewayVerificationResponse.text();

//     let verificationData = {};
//     try {
//       verificationData = JSON.parse(verificationText);
//     } catch (e) {
//       return NextResponse.json(
//         { error: "Gateway transaction stream unreadable" },
//         { status: 502 },
//       );
//     }

//     // STRICT SERVER-TO-SERVER MATCH CONDITIONS
//     const passStatusCheck =
//       verificationData?.status === "VALID" ||
//       verificationData?.status === "VALIDATED";
//     const passAmountCheck =
//       Number(verificationData?.amount).toFixed(2) ===
//       Number(targetOrder.total_amount).toFixed(2);
//     const passCurrencyCheck = verificationData?.currency === "BDT";
//     const passStoreCheck =
//       verificationData?.store_id === process.env.SSLCOMMERZ_STORE_ID;

//     if (
//       !passStatusCheck ||
//       !passAmountCheck ||
//       !passCurrencyCheck ||
//       !passStoreCheck
//     ) {
//       console.error("🚨 CRITICAL PAYMENT FORGERY ATTEMPT DETECTED:", {
//         verificationData,
//         targetOrder,
//       });
//       await supabase
//         .from("orders")
//         .update({ status: "price_tampering_forgery_detected" })
//         .eq("tran_id", tran_id);
//       return NextResponse.json(
//         {
//           error:
//             "Security Exception: Multi-factor transaction validation failure",
//         },
//         { status: 401 },
//       );
//     }

//     // --- ATOMIC DECREMENTATION LOOP (Issue 2) ---
//     // Loops over the item array and updates database values atomically to prevent race condition discrepancies.
//     const orderedItemsArray = targetOrder.items || [];
//     for (const item of orderedItemsArray) {
//       // Direct database decrement calculation removes local variable read/write race condition delays
//       const { data: finalStockRow, error: rpcError } = await supabase.rpc(
//         "decrement_inventory_stock",
//         {
//           product_uuid: item.id,
//           decrement_by: Number(item.quantity || 1),
//         },
//       );

//       if (rpcError) {
//         // Fallback row-level tracking pattern if the Postgres function is not compiled
//         const { data: liveItem } = await supabase
//           .from("inventory")
//           .select("stock_quantity")
//           .eq("id", item.id)
//           .single();
//         const adjustedStock = Math.max(
//           0,
//           (liveItem?.stock_quantity || 0) - Number(item.quantity || 1),
//         );
//         await supabase
//           .from("inventory")
//           .update({ stock_quantity: adjustedStock })
//           .eq("id", item.id);
//       }
//     }

//     // Finalize order state changes across the database records
//     await supabase
//       .from("orders")
//       .update({ status: "completed" })
//       .eq("tran_id", tran_id);

//     return NextResponse.json({
//       status: "SUCCESS",
//       message: "Transaction processed completely and securely",
//     });
//   } catch (criticalBoundaryFault) {
//     console.error("Fatal Webhook Interrupt Exception:", criticalBoundaryFault);
//     return NextResponse.json(
//       { error: "Internal Secure Processing Interrupted" },
//       { status: 500 },
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";
// import crypto from "crypto";

// export const dynamic = "force-dynamic";

// // Function to validate hash signature strings from SSLCommerz payloads
// function verifySSLCommerzSignature(payload, storePassword) {
//   if (!payload.verify_sign || !payload.verify_key) return false;

//   const keys = payload.verify_key.split(",");
//   keys.sort();

//   let checkString = "";
//   for (const key of keys) {
//     if (key !== "store_passwd") {
//       checkString += `${key}=${payload[key]}&`;
//     }
//   }

//   const md5Password = crypto
//     .createHash("md5")
//     .update(storePassword)
//     .digest("hex");
//   checkString += `store_passwd=${md5Password}`;

//   const generatedSignature = crypto
//     .createHash("md5")
//     .update(checkString)
//     .digest("hex");
//   return generatedSignature.toLowerCase() === payload.verify_sign.toLowerCase();
// }

// export async function POST(req) {
//   const supabase = createClient(
//     process.env.SUPABASE_URL,
//     process.env.SUPABASE_SERVICE_ROLE_KEY,
//   );
//   const systemBaseUrl = process.env.BASE_URL;

//   try {
//     const formData = await req.formData();
//     const payload = Object.fromEntries(formData.entries());

//     const { searchParams } = new URL(req.url);
//     const queryAction = searchParams.get("action");

//     const tran_id = payload.tran_id;
//     const val_id = payload.val_id;
//     const status = payload.status;

//     if (!tran_id) {
//       return NextResponse.json(
//         { error: "Access Rejected: Inbound identifier missing" },
//         { status: 400 },
//       );
//     }

//     // 1. Core verification phase checks
//     const { data: targetOrder, error: orderQueryError } = await supabase
//       .from("orders")
//       .select("*")
//       .eq("tran_id", tran_id)
//       .single();

//     if (orderQueryError || !targetOrder) {
//       return NextResponse.json(
//         { error: "Target order reference could not be resolved" },
//         { status: 404 },
//       );
//     }

//     // Idempotency guard: if already complete, redirect to success screen immediately
//     if (targetOrder.status === "completed" || targetOrder.status === "paid") {
//       return NextResponse.redirect(
//         `${systemBaseUrl}/checkout/success?method=sslcommerz&tran=${tran_id}`,
//         303,
//       );
//     }

//     // 2. Handle failure or cancellations directly
//     if (
//       queryAction === "fail" ||
//       queryAction === "cancel" ||
//       status === "FAILED" ||
//       status === "CANCELLED"
//     ) {
//       await supabase
//         .from("orders")
//         .update({ status: "failed" })
//         .eq("tran_id", tran_id);
//       return NextResponse.redirect(`${systemBaseUrl}/checkout/fail`, 303);
//     }

//     // 3. Signature verification layer
//     if (process.env.NODE_ENV === "production") {
//       const isSignatureValid = verifySSLCommerzSignature(
//         payload,
//         process.env.SSLCOMMERZ_STORE_PASSWORD,
//       );
//       if (!isSignatureValid) {
//         await supabase
//           .from("orders")
//           .update({ status: "signature_verification_failed" })
//           .eq("tran_id", tran_id);
//         return NextResponse.json(
//           {
//             error: "Security Exception: Payload signature verification failed",
//           },
//           { status: 400 },
//         );
//       }
//     }

//     // 4. API verification phase check via validation endpoints
//     let isGatewayVerified = false;
//     if (val_id) {
//       const validatorEndpoint =
//         process.env.NODE_ENV === "production"
//           ? `https://securepay.sslcommerz.com/validator/api/valid.php?val_id=${val_id}&store_id=${process.env.SSLCOMMERZ_STORE_ID}&store_passwd=${process.env.SSLCOMMERZ_STORE_PASSWORD}`
//           : `https://sandbox.sslcommerz.com/validator/api/valid.php?val_id=${val_id}&store_id=${process.env.SSLCOMMERZ_STORE_ID}&store_passwd=${process.env.SSLCOMMERZ_STORE_PASSWORD}`;

//       const gatewayVerificationResponse = await fetch(validatorEndpoint, {
//         method: "GET",
//       });
//       const verificationText = await gatewayVerificationResponse.text();

//       if (verificationText.trim().startsWith("{")) {
//         const verificationData = JSON.parse(verificationText);

//         // Enforce strict parameter mapping validations
//         const totalAmountMatches =
//           Number(verificationData?.amount) === Number(targetOrder.total_amount);
//         const transactionIdMatches = verificationData?.tran_id === tran_id;
//         const currencyMatches =
//           verificationData?.currency === targetOrder.currency;
//         const storeIdMatches =
//           verificationData?.store_id === process.env.SSLCOMMERZ_STORE_ID;
//         const statusIsValid =
//           verificationData?.status === "VALID" ||
//           verificationData?.status === "VALIDATED";

//         if (
//           totalAmountMatches &&
//           transactionIdMatches &&
//           currencyMatches &&
//           storeIdMatches &&
//           statusIsValid
//         ) {
//           isGatewayVerified = true;
//         }
//       }
//     }

//     if (!isGatewayVerified) {
//       await supabase
//         .from("orders")
//         .update({ status: "payment_verification_failed" })
//         .eq("tran_id", tran_id);
//       return NextResponse.json(
//         { error: "Security Alert: Gateway parameter cross-matching rejected" },
//         { status: 400 },
//       );
//     }

//     // 5. Invoke the atomic transactional SQL function block
//     const { data: transactionResult, error: transactionError } =
//       await supabase.rpc("process_order_payment_atomic", {
//         p_tran_id: tran_id,
//         p_gateway_response: payload,
//       });

//     if (
//       transactionError ||
//       !transactionResult ||
//       !transactionResult[0]?.success
//     ) {
//       console.error(
//         "Atomic transaction operation aborted:",
//         transactionError || transactionResult[0]?.message,
//       );
//       return NextResponse.json(
//         {
//           error:
//             transactionResult[0]?.message ||
//             "Stock allocation transaction conflict",
//         },
//         { status: 409 },
//       );
//     }

//     return NextResponse.redirect(
//       `${systemBaseUrl}/checkout/success?method=sslcommerz&tran=${tran_id}`,
//       303,
//     );
//   } catch (err) {
//     console.error("Critical webhook execution exception:", err);
//     return NextResponse.json(
//       { error: "Internal Secure Server Exception Blocked" },
//       { status: 500 },
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";

// const supabaseAdmin = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_ROLE_KEY,
// );

// export async function POST(request) {
//   try {
//     // Construct structural dictionary map parsing out values from the inbound string payload
//     const formDataText = await request.text();
//     const payloadParams = new URLSearchParams(formDataText);
//     const webhookData = Object.fromEntries(payloadParams.entries());

//     const { tran_id, val_id, amount, status } = webhookData;

//     if (!tran_id || !val_id) {
//       return NextResponse.json(
//         { error: "Missing identity tracking tokens." },
//         { status: 400 },
//       );
//     }

//     // 1. Verify that the order exists and is in a 'pending' state
//     const { data: orderRecord, error: orderFetchError } = await supabaseAdmin
//       .from("orders")
//       .select("id, total_amount, status")
//       .eq("tran_id", tran_id)
//       .single();

//     if (orderFetchError || !orderRecord) {
//       return NextResponse.json(
//         { error: "Referenced ledger asset not found." },
//         { status: 404 },
//       );
//     }

//     // Stop execution early if the targeted transaction order has already been finalized
//     if (orderRecord.status === "paid") {
//       return NextResponse.json(
//         { message: "Transaction already processed." },
//         { status: 200 },
//       );
//     }

//     // 2. Force secondary validation via a direct server-to-server API call
//     const validatorEndpoint =
//       process.env.NODE_ENV === "production"
//         ? `https://securepay.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${process.env.SSLCOMMERZ_STORE_ID}&store_passwd=${process.env.SSLCOMMERZ_STORE_PASSWORD}`
//         : `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${process.env.SSLCOMMERZ_STORE_ID}&store_passwd=${process.env.SSLCOMMERZ_STORE_PASSWORD}`;

//     const validatorResponse = await fetch(validatorEndpoint, { method: "GET" });
//     const validationResult = await validatorResponse.json();

//     // 3. Enforce strict parameter verification
//     const isStateValid =
//       validationResult?.status === "VALID" ||
//       validationResult?.status === "SUCCESS";
//     const isAmountMatching =
//       Math.abs(
//         Number(validationResult?.amount) - Number(orderRecord.total_amount),
//       ) < 0.01;
//     const isTransactionMatching = validationResult?.tran_id === tran_id;

//     if (!isStateValid || !isAmountMatching || !isTransactionMatching) {
//       // Transition compromised entries to a 'failed' state
//       await supabaseAdmin
//         .from("orders")
//         .update({ status: "failed" })
//         .eq("id", orderRecord.id);

//       return NextResponse.json(
//         { error: "Security parameters mismatch. State locked down." },
//         { status: 400 },
//       );
//     }

//     /* 4. Execute an idempotent database mutation query.
//          By enforcing status = 'pending' in the filter clause, we guarantee
//          that only one concurrent request can successfully modify this record.
//     */
//     const { data: postMutationRecord, error: mutationError } =
//       await supabaseAdmin
//         .from("orders")
//         .update({ status: "paid" })
//         .eq("id", orderRecord.id)
//         .eq("status", "pending")
//         .select();

//     if (
//       mutationError ||
//       !postMutationRecord ||
//       postMutationRecord.length === 0
//     ) {
//       return NextResponse.json(
//         { message: "Race condition intercepted. Action completed safely." },
//         { status: 200 },
//       );
//     }

//     // Create a secure audit trail of the payment validation event
//     await supabaseAdmin.from("payment_audit_logs").insert([
//       {
//         order_id: orderRecord.id,
//         tran_id: tran_id,
//         val_id: val_id,
//         verified_amount: validationResult.amount,
//         raw_payload: JSON.stringify(webhookData),
//         created_at: new Date().toISOString(),
//       },
//     ]);

//     // Construct a secure absolute URL redirect targeting the success view interface
//     const redirectionDestination = new URL(
//       "/checkout/success",
//       process.env.NEXT_PUBLIC_APP_URL,
//     );
//     redirectionDestination.searchParams.set("tran_id", tran_id);

//     return NextResponse.redirect(redirectionDestination.toString(), 303);
//   } catch (globalCatchError) {
//     console.error(
//       "System Runtime Breakage on SSLCommerz Webhook Callback:",
//       globalCatchError,
//     );
//     return NextResponse.json(
//       { error: "Fatal webhook pipeline exception." },
//       { status: 500 },
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { getSupabaseAdmin } from "@/lib/supabase/admin";
// import { logger } from "@/lib/logger";

// export async function POST(request) {
//   const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
//   let transactionId = "UNKNOWN";

//   try {
//     const rawFormPayload = await request.text();
//     const params = new URLSearchParams(rawFormPayload);
//     const webhookData = Object.fromEntries(params.entries());

//     transactionId = webhookData.tran_id || "UNKNOWN";
//     const validationId = webhookData.val_id;
//     const paymentStatus = webhookData.status;

//     logger.info("IPN payment webhook received.", {
//       transactionId,
//       paymentStatus,
//     });

//     // 1. Verify critical verification fields are populated
//     if (!transactionId || !validationId) {
//       logger.error(
//         "Fraud Check Failed: Missing critical transaction identifiers.",
//         null,
//         { transactionId },
//       );
//       return NextResponse.redirect(
//         new URL("/checkout?error=invalid_payload", baseUrl),
//         303,
//       );
//     }

//     // 2. Perform live verification directly against the payment gateway API servers
//     const verificationUrl =
//       process.env.NODE_ENV === "production"
//         ? `https://securepay.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${validationId}&store_id=${process.env.SSLCOMMERZ_STORE_ID}&store_passwd=${process.env.SSLCOMMERZ_STORE_PASSWORD}`
//         : `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${validationId}&store_id=${process.env.SSLCOMMERZ_STORE_ID}&store_passwd=${process.env.SSLCOMMERZ_STORE_PASSWORD}`;

//     const gatewayResponse = await fetch(verificationUrl, { method: "GET" });
//     if (!gatewayResponse.ok) {
//       throw new Error("Unable to contact SSLCommerz validation servers.");
//     }

//     const validationResult = await gatewayResponse.json();
//     const verifiedStatus = validationResult?.status || "";

//     if (
//       verifiedStatus !== "VALID" &&
//       verifiedStatus !== "SUCCESS" &&
//       verifiedStatus !== "VALIDATED"
//     ) {
//       logger.warn(
//         "Fraud Prevention: Gateway reported invalid verification token status.",
//         { transactionId, verifiedStatus },
//       );
//       return NextResponse.redirect(
//         new URL("/checkout?error=verification_failed", baseUrl),
//         303,
//       );
//     }

//     const gatewayVerifiedAmount = parseFloat(validationResult?.amount || "0");
//     const supabaseAdmin = getSupabaseAdmin();

//     // 3. Complete structural state transitions inside the database without using missing schema keys
//     const { data: rpcResponse, error: rpcError } = await supabaseAdmin.rpc(
//       "finalize_payment_idempotent",
//       {
//         p_tran_id: transactionId,
//         p_val_id: validationId,
//         p_verified_amount: gatewayVerifiedAmount,
//         p_raw_payload: validationResult,
//       },
//     );

//     if (rpcError || !rpcResponse?.success) {
//       logger.error(
//         "Transaction Core Aborted Settlement:",
//         new Error(rpcError?.message || rpcResponse?.error),
//         { transactionId },
//       );
//       return NextResponse.redirect(
//         new URL(`/checkout?error=settlement_rejected`, baseUrl),
//         303,
//       );
//     }

//     logger.info("Transaction finalized successfully.", { transactionId });
//     return NextResponse.redirect(
//       new URL(
//         `/checkout/success?method=sslcommerz&tran=${transactionId}`,
//         baseUrl,
//       ),
//       303,
//     );
//   } catch (err) {
//     logger.error("Critical Webhook Runtime Failure:", err, { transactionId });
//     return NextResponse.redirect(
//       new URL("/checkout?error=system_error", baseUrl),
//       303,
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { getSupabaseAdmin } from "@/lib/supabase/admin";
// import { logger } from "@/lib/logger";

// export async function POST(request) {
//   const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
//   let transactionId = "UNKNOWN";

//   try {
//     const rawFormPayload = await request.text();
//     const params = new URLSearchParams(rawFormPayload);
//     const webhookData = Object.fromEntries(params.entries());

//     transactionId = webhookData.tran_id || "UNKNOWN";
//     const validationId = webhookData.val_id;

//     logger.info("SSLCommerz transactional verification webhook reached.", {
//       transactionId,
//     });

//     // 1. Enforce validation arguments
//     if (!transactionId || !validationId) {
//       logger.error(
//         "Fraud Signature Encountered: Missing parameter references.",
//         null,
//         { transactionId },
//       );
//       return NextResponse.redirect(
//         new URL("/checkout?error=invalid_payload", baseUrl),
//         303,
//       );
//     }

//     // 2. Query remote gateway servers directly to cross-check payment statuses
//     const verificationUrl =
//       process.env.NODE_ENV === "production"
//         ? `https://securepay.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${validationId}&store_id=${process.env.SSLCOMMERZ_STORE_ID}&store_passwd=${process.env.SSLCOMMERZ_STORE_PASSWORD}`
//         : `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${validationId}&store_id=${process.env.SSLCOMMERZ_STORE_ID}&store_passwd=${process.env.SSLCOMMERZ_STORE_PASSWORD}`;

//     const gatewayResponse = await fetch(verificationUrl, { method: "GET" });
//     if (!gatewayResponse.ok) {
//       throw new Error(
//         "Validation handshake could not be established with remote gateway API.",
//       );
//     }

//     const validationResult = await gatewayResponse.json();
//     const verifiedStatus = validationResult?.status || "";

//     // Strictly enforce validation statuses
//     if (
//       verifiedStatus !== "VALID" &&
//       verifiedStatus !== "SUCCESS" &&
//       verifiedStatus !== "VALIDATED"
//     ) {
//       logger.warn(
//         "Fraud Prevention: Remote gateway verification signature failed validation check.",
//         { transactionId, verifiedStatus },
//       );
//       return NextResponse.redirect(
//         new URL("/checkout?error=verification_failed", baseUrl),
//         303,
//       );
//     }

//     const gatewayVerifiedAmount = parseFloat(validationResult?.amount || "0");
//     const supabaseAdmin = getSupabaseAdmin();

//     // 3. Complete structural state transitions inside the database without using missing schema keys
//     const { data: rpcResponse, error: rpcError } = await supabaseAdmin.rpc(
//       "finalize_payment_idempotent",
//       {
//         p_tran_id: transactionId,
//         p_val_id: validationId,
//         p_verified_amount: gatewayVerifiedAmount,
//         p_raw_payload: validationResult,
//       },
//     );

//     if (rpcError || !rpcResponse?.success) {
//       logger.error(
//         "Settlement rejected by core database security rules:",
//         new Error(rpcError?.message || rpcResponse?.error),
//         { transactionId },
//       );
//       return NextResponse.redirect(
//         new URL(`/checkout?error=settlement_rejected`, baseUrl),
//         303,
//       );
//     }

//     logger.info("Transaction validated and finalized successfully.", {
//       transactionId,
//     });
//     return NextResponse.redirect(
//       new URL(
//         `/checkout/success?method=sslcommerz&tran=${transactionId}`,
//         baseUrl,
//       ),
//       303,
//     );
//   } catch (err) {
//     logger.error(
//       "Critical Exception caught during webhook compilation processing loop:",
//       err,
//       { transactionId },
//     );
//     return NextResponse.redirect(
//       new URL("/checkout?error=system_error", baseUrl),
//       303,
//     );
//   }
// }

import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { logger } from "@/lib/logger";
import { logAudit } from "@/lib/audit";

export async function POST(request) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  let transactionId = "UNKNOWN";

  try {
    const rawFormPayload = await request.text();
    const params = new URLSearchParams(rawFormPayload);
    const webhookData = Object.fromEntries(params.entries());

    transactionId = webhookData.tran_id || "UNKNOWN";
    const validationId = webhookData.val_id;

    // A. DETERMINE CHANNEL ORIGIN IMMEDIATELY
    const acceptHeader = request.headers.get("accept") || "";
    const isBrowserRedirect =
      acceptHeader.includes("text/html") || !webhookData.ipn_notification;

    logger.info(
      `SSLCommerz endpoint hit via ${isBrowserRedirect ? "BROWSER_REDIRECT" : "BACKGROUND_IPN"} channel.`,
      {
        transactionId,
      },
    );

    // B. SEPARATE USER REDIRECTS FROM MECHANICAL MUTATIONS
    // If it's a customer browser redirecting back, do not make them wait for complex validation.
    // Send them straight to the success page where a real-time UI loading element checks fulfillment status.
    if (isBrowserRedirect) {
      logger.info(
        "Fast-tracking client browser context safely to success confirmation page view.",
        { transactionId },
      );
      return NextResponse.redirect(
        new URL(
          `/checkout/success?method=sslcommerz&tran=${transactionId}`,
          baseUrl,
        ),
        303,
      );
    }

    // =========================================================================
    // BACKGROUND AUTOMATED IPN PROCESSING ONLY (Runs asynchronously)
    // =========================================================================
    if (!transactionId || !validationId) {
      logger.error(
        "Fraud Signature Encountered by IPN: Missing parameters.",
        null,
        { transactionId },
      );
      return NextResponse.json(
        { success: false, error: "Missing payload signatures." },
        { status: 400 },
      );
    }

    // 1. Fetch remote validation receipt
    const verificationUrl =
      process.env.NODE_ENV === "production"
        ? `https://securepay.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${validationId}&store_id=${process.env.SSLCOMMERZ_STORE_ID}&store_passwd=${process.env.SSLCOMMERZ_STORE_PASSWORD}`
        : `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${validationId}&store_id=${process.env.SSLCOMMERZ_STORE_ID}&store_passwd=${process.env.SSLCOMMERZ_STORE_PASSWORD}`;

    const gatewayResponse = await fetch(verificationUrl, { method: "GET" });
    if (!gatewayResponse.ok) {
      throw new Error(
        "Validation handshake could not be established with remote gateway API.",
      );
    }

    const validationResult = await gatewayResponse.json();
    const verifiedStatus = validationResult?.status || "";

    if (
      verifiedStatus !== "VALID" &&
      verifiedStatus !== "SUCCESS" &&
      verifiedStatus !== "VALIDATED"
    ) {
      logger.warn(
        "Fraud Prevention: Remote gateway signature validation failed.",
        { transactionId, verifiedStatus },
      );
      return NextResponse.json(
        { success: false, error: "Gateway transaction invalid." },
        { status: 400 },
      );
    }

    const gatewayVerifiedAmount = parseFloat(validationResult?.amount || "0");
    const supabaseAdmin = getSupabaseAdmin();

    // 2. RUN THE DATABASE MUTATION VIA ADMINISTRATIVE ELEVATION
    const { data: rpcResponse, error: rpcError } = await supabaseAdmin.rpc(
      "finalize_payment_idempotent",
      {
        p_tran_id: transactionId,
        p_val_id: validationId,
        p_verified_amount: gatewayVerifiedAmount,
        p_raw_payload: validationResult,
      },
    );

    // If it failed because it was already completed, answer back with a clean 200 OK so the gateway knows to stop pinging
    if (!rpcError && rpcResponse?.message?.includes("already finalized")) {
      logger.info(
        "IPN intercepted a duplicate tracking ping for an already completed transaction.",
        { transactionId },
      );
      return NextResponse.json(
        { success: true, message: "Transaction completed previously." },
        { status: 200 },
      );
    }

    if (rpcError || !rpcResponse?.success) {
      logger.error(
        "Settlement rejected by core database security processing engine rules:",
        new Error(rpcError?.message || rpcResponse?.error),
        { transactionId },
      );
      return NextResponse.json(
        { success: false, error: rpcError?.message || rpcResponse?.error },
        { status: 422 },
      );
    }

    // 3. Log external application auditing safely
    try {
      await logAudit({
        userId: null,
        action: "PAYMENT_SETTLED_WEBHOOK",
        entityType: "transaction",
        entityId: transactionId,
        metadata: {
          validationId,
          verifiedAmount: gatewayVerifiedAmount,
          gatewayStatus: verifiedStatus,
        },
      });
    } catch (auditLogErr) {
      logger.warn("Non-blocking audit table write skipped gracefully.", {
        transactionId,
      });
    }

    logger.info(
      "Transaction validated and finalized successfully by background IPN systems.",
      { transactionId },
    );
    return NextResponse.json(
      { success: true, message: "Transaction processed and locked safely." },
      { status: 200 },
    );
  } catch (err) {
    logger.error(
      "Critical Exception caught during webhook compilation processing loop:",
      err,
      { transactionId },
    );
    // Always return headless JSON statuses for core catch blocks to protect API routing protocols
    return NextResponse.json(
      { success: false, error: "Internal processing crash event triggered." },
      { status: 500 },
    );
  }
}
