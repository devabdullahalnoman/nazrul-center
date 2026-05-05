"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authService } from "@/lib/supabase/auth-service";

export default function Sidebar({ user }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Command Center", path: "/dashboard", icon: "📊" },
    { name: "E-Books", path: "/dashboard/publications", icon: "📖" },
    { name: "Inventory", path: "/dashboard/inventory", icon: "📦" },
    { name: "Orders", path: "/dashboard/orders", icon: "🛒" },
    { name: "Wishlist", path: "/dashboard/wishlist-admin", icon: "✨" },
    { name: "Messages & Complains", path: "/dashboard/messages", icon: "✉️" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col shadow-sm">
      <div className="p-8 border-b border-gray-50">
        <h2 className="text-[#946659] font-serif text-2xl font-bold tracking-tight">
          Nazrul Center
        </h2>
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">
          Administrator
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#946659]/10 text-[#946659] border-l-4 border-[#946659]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>{item.icon}</span> {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-gray-100 bg-gray-50/50">
        <button
          onClick={() => authService.logout()}
          className="w-full text-left text-xs font-bold text-red-400 hover:text-red-600 uppercase tracking-widest"
        >
          Logout System
        </button>
      </div>
    </aside>
  );
}
