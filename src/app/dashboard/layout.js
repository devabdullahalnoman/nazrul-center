// "use client";
// import { useAuth } from "@/hooks/useAuth";
// import Sidebar from "@/components/dashboard/Sidebar";
// import { usePathname } from "next/navigation";

// export default function DashboardLayout({ children }) {
//   const { user, loading } = useAuth();
//   const pathname = usePathname();

//   // ONLY show loading on the very first visit.
//   // Once the user is in state, don't show it during navigation.
//   if (loading && !user) {
//     return (
//       <div className="h-screen flex flex-col items-center justify-center bg-[#FDFCFB]">
//         <div className="w-12 h-12 border-4 border-[#946659]/20 border-t-[#946659] rounded-full animate-spin mb-4"></div>
//         <p className="font-serif italic text-[#946659]">Authenticating...</p>
//       </div>
//     );
//   }

//   if (!user) return null; // Redirect logic usually handled in useAuth

//   return (
//     <div className="flex bg-[#FDFCFB] min-h-screen">
//       {/* Sidebar is outside the 'children', so it NEVER reloads */}
//       <Sidebar user={user} />

//       <main className="flex-1 ml-64 p-8 lg:p-12">
//         <div className="max-w-7xl mx-auto transition-all duration-300">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import Sidebar from "@/components/dashboard/Sidebar";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If the check is finished and no user was found, boot to login
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // Use the Clay and Ivory theme for the loader
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

  // Prevent flash of content if user is null but redirect hasn't happened yet
  if (!user) return null;

  return (
    <div className="flex bg-[#FDFCFB] min-h-screen">
      {/* Sidebar is outside of children - it will NOT reload when tabs change */}
      <Sidebar user={user} />

      <main className="flex-1 ml-64 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto transition-opacity duration-500 ease-in-out">
          {children}
        </div>
      </main>
    </div>
  );
}
