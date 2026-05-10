"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminView from "@/components/dashboard/admin/AdminView";
import ContributorView from "@/components/dashboard/contributor/ContributorView";
import UserView from "@/components/dashboard/user/UserView";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we are CERTAIN there is no user after loading finishes
    if (!loading && !user) {
      router.push("/"); 
    }
  }, [user, loading, router]);

  // 1. Keep the user on this screen while loading
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FDFCFB]">
        <div className="w-8 h-8 border-4 border-[#946659]/20 border-t-[#946659] rounded-full animate-spin"></div>
      </div>
    );
  }

  // 2. If no user after loading, return null (the useEffect will handle redirect)
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#FDFCFB]">
      <Sidebar user={user} />
      <main className="flex-1 p-8 overflow-y-auto animate-in fade-in duration-700">
        {/* We use the role property directly from the auth user object */}
        {user.role === "admin" && <AdminView user={user} />}
        {user.role === "contributor" && <ContributorView user={user} />}
        {user.role === "user" && <UserView user={user} />}
        
        {/* Safety for users with no assigned role */}
        {!["admin", "contributor", "user"].includes(user.role) && (
          <div className="flex items-center justify-center h-full font-serif italic text-gray-400">
            Setting up your workspace...
          </div>
        )}
      </main>
    </div>
  );
}