import { createClient } from "@/lib/supabase/server";
import { AdminView } from "@/features/dashboard/admin/components/AdminView";
import { ContributorView } from "@/features/dashboard/contributor/components/ContributorView";
import { UserView } from "@/features/dashboard/user/components/UserView";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const role = profile?.role || "user";

  return (
    <main className="w-full min-h-screen bg-nazrul-base">
      {role === "admin" && <AdminView profile={profile} />}
      {role === "contributor" && <ContributorView profile={profile} />}
      {role === "user" && <UserView profile={profile} />}
    </main>
  );
}
