"use client";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import Sidebar from "@/components/dashboard/Sidebar";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#FDFCFB]">
        <div className="w-12 h-12 border-4 border-[#946659]/20 border-t-[#946659] rounded-full animate-spin mb-4"></div>
        <p className="font-serif italic text-[#946659] animate-pulse">
          Resuming Session...
        </p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex bg-[#FDFCFB] min-h-screen">
      <Sidebar user={user} />

      <main className="flex-1 ml-64 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto transition-opacity duration-500 ease-in-out">
          {children}
        </div>
      </main>
    </div>
  );
}
