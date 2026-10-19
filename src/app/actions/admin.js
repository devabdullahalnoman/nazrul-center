"use server";

import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function changeUserRole(targetUserId, newRole) {
  const serviceRoleKey = process.env.SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!serviceRoleKey || !supabaseUrl) {
    throw new Error(
      "Missing Environment Variables: Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.",
    );
  }

  // 1. Authenticate the active requesting user session
  const supabase = await createServerClient();
  const {
    data: { user },
    error: authUserError,
  } = await supabase.auth.getUser();

  if (authUserError || !user) {
    throw new Error("Unauthorized");
  }

  // 2. Initialize Privileged Service Role Client
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

  // 3. Fallback verification: Check database profile directly if JWT claim is stale
  const { data: requesterProfile } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const isAdmin =
    user.app_metadata?.role === "admin" || requesterProfile?.role === "admin";

  if (!isAdmin) {
    throw new Error("Forbidden: Admin access required.");
  }

  // 4. Update auth.users app_metadata (Required for RLS policies)
  const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
    targetUserId,
    { app_metadata: { role: newRole } },
  );

  if (authError) {
    throw new Error(`Auth Metadata Update Failed: ${authError.message}`);
  }

  // 5. Update public.profiles table (Required for UI display)
  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .update({ role: newRole })
    .eq("id", targetUserId);

  if (profileError) {
    throw new Error(`Profile Update Failed: ${profileError.message}`);
  }

  // 6. Revalidate cache for the user management dashboard
  revalidatePath("/dashboard/users");

  return { success: true };
}
