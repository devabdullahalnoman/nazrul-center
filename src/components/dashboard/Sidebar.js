"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authService } from "@/lib/supabase/auth-service";

export default function Sidebar({ user }) {
  const pathname = usePathname();

  const allItems = [
    { name: "Command Center", path: "/dashboard", icon: "📊", roles: ["admin", "contributor"] },
    { name: "E-Books", path: "/dashboard/publications", icon: "📖", roles: ["admin"] },
    { name: "Inventory", path: "/dashboard/inventory", icon: "📦", roles: ["admin"] },
    { name: "Users", path: "/dashboard/users", icon: "👥", roles: ["admin"] },
    { name: "Messages", path: "/dashboard/messages", icon: "✉️", roles: ["admin"] },
  ];

  const menuItems = allItems.filter(item => item.roles.includes(user?.role));

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col shadow-sm">
      <div className="p-8 border-b border-gray-50">
        <h2 className="text-[#946659] font-serif text-2xl font-bold">Nazrul Center</h2>
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black mt-1">
          {user?.role}
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              pathname === item.path ? "bg-[#946659]/10 text-[#946659] border-l-4 border-[#946659]" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span>{item.icon}</span> {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-100 bg-gray-50/50">
        <button onClick={() => authService.logout()} className="w-full text-left text-[10px] font-black text-red-400 hover:text-red-600 uppercase tracking-widest">
          Logout System
        </button>
      </div>
    </aside>
  );
}