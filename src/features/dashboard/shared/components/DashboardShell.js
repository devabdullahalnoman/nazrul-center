"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function DashboardShell({ children, profile }) {
  const { logout } = useAuth();
  const role = profile?.role || "user";

  // Moved to a constant for cleaner modularity,
  // ensuring paths match our admin feature folders
  const navLinks = {
    admin: [
      { name: "Command Center", path: "/dashboard" },
      { name: "Manage Inventory", path: "/dashboard/inventory" },
      { name: "Manage Publications", path: "/dashboard/publications" },
      { name: "Manage Users", path: "/dashboard/users" }, // Renamed to match UI
      { name: "User Tickets", path: "/dashboard/tickets" },
    ],
    contributor: [
      { name: "Overview", path: "/dashboard" },
      { name: "Manage Inventory", path: "/dashboard/inventory" },
      { name: "Manage Publications", path: "/dashboard/publications" },
    ],
    user: [
      { name: "My Profile", path: "/dashboard" },
      { name: "My Orders", path: "/dashboard/my-orders" },
      { name: "My Wishlist", path: "/dashboard/my-wishlist" },
    ],
  };

  const linksToRender = navLinks[role] || navLinks.user;

  return (
    <div className="drawer lg:drawer-open bg-nazrul-base min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Mobile Header */}
        <div className="w-full navbar bg-white shadow-sm lg:hidden border-b border-gray-100">
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost text-nazrul-terracotta"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 font-serif font-bold text-xl text-nazrul-ink">
            Nazrul Center
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-10 text-nazrul-ink">{children}</main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-50">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="w-80 min-h-full bg-white border-r border-nazrul-sand flex flex-col shadow-2xl lg:shadow-none">
          {/* Sidebar Header */}
          <div className="p-8 border-b border-gray-50 flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-serif font-bold text-nazrul-ink leading-tight">
              The Archive
            </h2>
            <p className="text-[10px] font-black text-nazrul-terracotta uppercase tracking-[0.2em] mt-2">
              {role} Panel
            </p>
          </div>

          {/* User Profile Summary */}
          <div className="p-6 flex items-center gap-4 bg-nazrul-base border-b border-gray-50">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full ring ring-nazrul-terracotta ring-offset-nazrul-base ring-offset-2 overflow-hidden relative">
                <Image
                  src={
                    profile?.avatar_url ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.full_name || "User")}&background=D9C7AD&color=58161F`
                  }
                  alt="Profile"
                  width={48}
                  height={48}
                  className="object-cover"
                  unoptimized={!profile?.avatar_url}
                />
              </div>
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-nazrul-ink text-sm truncate">
                {profile?.full_name}
              </p>
              <p className="text-[10px] text-gray-500 truncate font-medium">
                {profile?.email}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="menu p-4 w-full text-nazrul-ink gap-2 flex-1 mt-4">
            {linksToRender.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.path}
                  className="hover:bg-nazrul-terracotta hover:text-white rounded-xl py-3 px-6 transition-all duration-200 font-bold uppercase text-[10px] tracking-widest"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Sign Out Button */}
          <div className="p-6 mt-auto border-t border-gray-50">
            <button
              onClick={() => logout()}
              className="btn w-full bg-transparent border-2 border-nazrul-crimson text-nazrul-crimson hover:bg-nazrul-crimson hover:text-white rounded-xl transition-all duration-300 uppercase tracking-widest font-black text-[10px]"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
