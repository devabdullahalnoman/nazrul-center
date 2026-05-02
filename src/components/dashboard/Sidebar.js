"use client";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client"; // Updated import
import { useRouter } from "next/navigation";

export default function Sidebar({ role, userName }) {
  const router = useRouter();
  const supabase = createClient(); // Initialize the modular client

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Use window.location for logout to completely clear the
    // server-side session cookies in Next.js 16
    window.location.href = "/login";
  };

  // Define links for each role
  const menuItems = {
    admin: [
      { name: "Admin Home", href: "/dashboard" },
      { name: "All Orders", href: "/dashboard/admin-orders" },
      { name: "Manage Users", href: "/dashboard/manage-users" },
      { name: "Complaints", href: "/dashboard/complaints" },
    ],
    operator: [
      { name: "Order Pool", href: "/dashboard" },
      { name: "My Active Tasks", href: "/dashboard/my-tasks" },
    ],
    user: [
      { name: "My Orders", href: "/dashboard" },
      { name: "Wishlist", href: "/dashboard/wishlist" },
      { name: "Support/Complains", href: "/dashboard/support" },
    ],
  };

  const links = menuItems[role] || menuItems.user;

  return (
    <div className="w-64 bg-neutral text-neutral-content min-h-screen p-4 flex flex-col">
      <div className="mb-10 px-2">
        <h2 className="text-2xl font-bold text-white">Nazrul Center</h2>
        <p className="text-xs opacity-60 italic">{userName}</p>
      </div>

      <ul className="menu w-full p-0 grow">
        <li className="menu-title text-gray-400 text-xs mb-2">
          {role?.toUpperCase()} MENU
        </li>
        {links.map((item, index) => (
          <li key={`${item.href}-${index}`}>
            <Link
              href={item.href}
              className="hover:bg-primary hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="border-t border-gray-700 pt-4">
        <button
          onClick={handleLogout}
          className="btn btn-error btn-outline btn-block btn-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
