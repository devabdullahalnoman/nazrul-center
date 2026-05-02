import { createClient } from "@/lib/supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Optional: Get user profile details
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user?.id)
    .single();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-lg mt-4">
        Welcome back,{" "}
        <span className="font-bold text-primary">
          {profile?.full_name || user?.email}
        </span>
        !
      </p>
      <div className="badge badge-outline mt-2">{profile?.role || "User"}</div>
    </div>
  );
}
