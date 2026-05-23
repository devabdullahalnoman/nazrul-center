import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { headers } from "next/headers";
import { logger } from "@/lib/logger";

/**
 * Securely writes an immutable record to the database audit ledger.
 */
export async function logAudit({
  userId = null,
  action,
  entityType,
  entityId = null,
  metadata = {},
}) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const headersList = await headers();

    // Extract IP address securely behind proxies
    const ipAddress =
      headersList.get("x-forwarded-for") ||
      headersList.get("x-real-ip") ||
      "unknown";

    const { error } = await supabaseAdmin.from("audit_logs").insert({
      user_id: userId,
      action: action,
      entity_type: entityType,
      entity_id: entityId,
      metadata: metadata,
      ip_address: ipAddress,
    });

    if (error) {
      logger.error("Failed to write to immutable audit ledger.", error);
    }
  } catch (err) {
    logger.error("Audit logging runtime exception.", err);
  }
}
