// import { UserManagementManager } from "@/features/dashboard/admin/components/UserManagementManager";

// export const metadata = {
//   title: "User Management | Nazrul Center",
//   description: "Administrative console for managing user roles and profiles.",
// };

// export default function UserManagementPage() {
//   return (
//     <div className="animate-in fade-in duration-700">
//       <UserManagementManager />
//     </div>
//   );
// }

// import { createServerClient } from "@/lib/supabase/server";
// import { UserManagementManager } from "@/features/dashboard/admin/components/UserManagementManager";

// export const metadata = {
//   title: "User Management | Nazrul Center",
//   description: "Administrative console for managing user roles and profiles.",
// };

// export default async function UserManagementPage() {
//   const supabase = await createServerClient();

//   // Fetch all user profiles using RLS
//   const { data: profiles, error } = await supabase
//     .from("profiles")
//     .select("*")
//     .order("created_at", { ascending: false });

//   if (error) {
//     console.error("Failed to load profiles:", error.message);
//   }

//   return (
//     <div className="animate-in fade-in duration-700">
//       <UserManagementManager initialProfiles={profiles || []} />
//     </div>
//   );
// }

import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";
import { UserManagementManager } from "@/features/dashboard/admin/components/UserManagementManager";
import { redirect } from "next/navigation";

export const metadata = {
  title: "User Management | Nazrul Center",
  description: "Administrative console for managing user roles and profiles.",
};

export default async function UserManagementPage() {
  const serviceRoleKey = process.env.SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!serviceRoleKey || !supabaseUrl) {
    throw new Error(
      "Missing Environment Variables: Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local",
    );
  }

  // 1. Authenticate active session user
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2. Initialize Privileged Service Role Client
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

  // 3. Verify Admin status via DB profile
  const { data: currentProfile } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const isAdmin =
    user.app_metadata?.role === "admin" || currentProfile?.role === "admin";

  if (!isAdmin) {
    redirect("/dashboard");
  }

  // 4. Fetch ALL user profiles using Service Role Key
  const { data: profiles, error } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading profiles:", error.message);
  }

  return (
    <div className="animate-in fade-in duration-700">
      <UserManagementManager initialUsers={profiles || []} />
    </div>
  );
}
