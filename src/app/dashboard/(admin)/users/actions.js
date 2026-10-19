"use server";

import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

export async function updateUserRole(targetUserId, newRole) {
  // 1. Verify requesting user is an admin
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "admin") {
    throw new Error("Unauthorized: Admin access required.");
  }

  // 2. Instantiate Admin Supabase Client with service role key
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  // 3. Perform role update
  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    targetUserId,
    { app_metadata: { role: newRole } },
  );

  if (error) throw new Error(error.message);

  return { success: true, user: data.user };
}
