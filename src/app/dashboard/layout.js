import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/dashboard/Sidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  // 1. Initialize the Server-side Supabase client
  const supabase = await createClient();

  // 2. Get the authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 3. Security: If the Proxy somehow missed them, redirect to login
  if (!user) {
    redirect("/login");
  }

  // 4. Fetch the profile to get the 'role' (admin, operator, or user)
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  return (
    <div className="flex min-h-screen bg-base-100">
      {/* Pass the role to the Sidebar so it knows which links to show.
          If the profile fails to load, we default to 'user' 
      */}
      <Sidebar
        role={profile?.role || "user"}
        userName={profile?.full_name || user.email}
      />

      <main className="flex-1 bg-base-200">
        {/* Header/Navbar could go here */}
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <h1 className="font-semibold text-gray-700 uppercase tracking-widest text-sm">
            {profile?.role} Panel
          </h1>
          <div className="text-sm text-gray-500">{user.email}</div>
        </header>

        <div className="p-8">
          {/* This is where your page.js content will appear */}
          {children}
        </div>
      </main>
    </div>
  );
}
