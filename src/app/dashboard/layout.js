"use client";
import { useAuth } from "@/hooks/useAuth";
import Sidebar from "@/components/dashboard/Sidebar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  // ONLY show loading on the very first visit.
  // Once the user is in state, don't show it during navigation.
  if (loading && !user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#FDFCFB]">
        <div className="w-12 h-12 border-4 border-[#946659]/20 border-t-[#946659] rounded-full animate-spin mb-4"></div>
        <p className="font-serif italic text-[#946659]">Authenticating...</p>
      </div>
    );
  }

  if (!user) return null; // Redirect logic usually handled in useAuth

  return (
    <div className="flex bg-[#FDFCFB] min-h-screen">
      {/* Sidebar is outside the 'children', so it NEVER reloads */}
      <Sidebar user={user} />

      <main className="flex-1 ml-64 p-8 lg:p-12">
        <div className="max-w-7xl mx-auto transition-all duration-300">
          {children}
        </div>
      </main>
    </div>
  );
}
