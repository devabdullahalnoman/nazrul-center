import { createProxyClient } from "@/lib/supabase/proxy";
import { DashboardShell } from "@/features/dashboard/shared/components/DashboardShell";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const supabase = await createProxyClient(); // Awaited client factory
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/login");

  return (
    <DashboardShell profile={profile}>
      {children}
    </DashboardShell>
  );
}