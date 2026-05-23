"use client";

import { useState, useEffect, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCartStore } from "@/features/cart/hooks/useCartStore";
import { analyticsApi } from "@/features/analytics/api/analytics.api";
import CartDrawer from "@/features/cart/components/CartDrawer";
import { ShoppingBag, Eye } from "lucide-react";

// Scaled up typography across all layout tiers
const commonFontSize =
  "text-[14px] xl:text-[15px] min-[1360px]:text-[16px] min-[1440px]:text-[17px] min-[1550px]:text-[18px]";
const commonWeight = "font-semibold";
const activeLink = "text-nazrul-crimson";
const linkStyle = `transition-all duration-200 ${commonWeight} px-1.5 xl:px-2 min-[1360px]:px-3 min-[1440px]:px-3.5 min-[1550px]:px-4 ${commonFontSize} hover:text-nazrul-crimson whitespace-nowrap`;

const supabase = createClient();

const NavItems = memo(
  ({ isMobile = false, pathname, onClose, user, onLogout }) => {
    const items = [
      { name: "Home", href: "/" },
      { name: "Biography", href: "/biography" },
      { name: "Publications", href: "/publications" },
      // { name: "Songs", href: "/songs" },
      { name: "Docu Film", href: "/docu-film" },
      { name: "Shop", href: "/shop" },
      // { name: "Events", href: "/events" },
    ];

    return (
      <>
        {items.map((item) => (
          <li key={item.href} className="list-none">
            <Link
              href={item.href}
              onClick={onClose}
              className={`${linkStyle} ${pathname === item.href ? activeLink : ""} ${isMobile ? "py-2.5 block w-full text-[16px]" : ""}`}
            >
              {item.name}
            </Link>
          </li>
        ))}

        {/* Desktop Dropdown */}
        {/* {!isMobile && (
          <li className="dropdown dropdown-hover list-none">
            <div
              tabIndex={0}
              role="button"
              className={`${linkStyle} flex items-center gap-0.5 cursor-pointer ${pathname === "/media" || pathname === "/news" ? activeLink : ""}`}
            >
              Media & News
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 xl:h-3.5 xl:w-3.5 opacity-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[100] menu p-2 shadow-2xl bg-white text-gray-800 rounded-box w-44 border m-0 pt-4"
            >
              <li>
                <Link
                  href="/media"
                  className={`py-2 hover:text-nazrul-crimson ${commonWeight} text-[16px]`}
                >
                  Media
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className={`py-2 hover:text-nazrul-crimson ${commonWeight} text-[16px]`}
                >
                  News
                </Link>
              </li>
            </ul>
          </li>
        )} */}

        {/* Mobile Links */}
        {/* {isMobile && (
          <>
            <li className="list-none">
              <Link
                onClick={onClose}
                href="/media"
                className={`${linkStyle} py-2.5 block w-full text-[16px]`}
              >
                Media
              </Link>
            </li>
            <li className="list-none">
              <Link
                onClick={onClose}
                href="/news"
                className={`${linkStyle} py-2.5 block w-full text-[16px]`}
              >
                News
              </Link>
            </li>
          </>
        )} */}

        <li className="list-none">
          <Link
            href="/about"
            onClick={onClose}
            className={`${linkStyle} ${pathname === "/about" ? activeLink : ""} ${isMobile ? "py-2.5 block w-full text-[16px]" : ""}`}
          >
            About Us
          </Link>
        </li>

        {/* Mobile Dynamic Auth Drawer Links (For Guest Users) */}
        {isMobile && !user && (
          <div className="mt-2 pt-2 border-t border-gray-100 w-full">
            <div className="flex flex-col gap-1 mt-2">
              <Link
                href="/login"
                onClick={onClose}
                className="px-3 py-2.5 text-[16px] font-bold text-[#946659] hover:bg-gray-50 rounded-lg transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/register"
                onClick={onClose}
                className="px-3 py-2.5 text-[16px] font-bold text-white bg-[#946659] hover:bg-[#7a5449] rounded-lg transition-colors text-center mt-1"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </>
    );
  },
);

NavItems.displayName = "NavItems";

export default function Navbar() {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visits, setVisits] = useState(0);
  const pathname = usePathname();
  const itemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    setMounted(true);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    async function evaluateAnalytics() {
      if (typeof window === "undefined") return;
      try {
        const sessionActive = sessionStorage.getItem(
          "nzrul_active_visit_token",
        );

        if (!sessionActive) {
          await analyticsApi.registerVisit().catch(() => {});
          sessionStorage.setItem("nzrul_active_visit_token", "true");
        }

        const exactCount = await analyticsApi.getVisitCount();
        if (exactCount > 0) {
          setVisits(exactCount);
          localStorage.setItem("nzrul_cached_total_visits", String(exactCount));
        } else {
          const localCache = localStorage.getItem("nzrul_cached_total_visits");
          if (localCache) setVisits(Number(localCache));
        }
      } catch (err) {
        console.error("Analytics execution loop suppressed gracefully:", err);
        const localCache = localStorage.getItem("nzrul_cached_total_visits");
        if (localCache) setVisits(Number(localCache));
      }
    }

    evaluateAnalytics();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <nav
      className={`sticky top-0 z-[100] transition-all duration-300 bg-[#F8F8F8] text-gray-800 py-2 px-3 sm:px-6 lg:px-4 xl:px-18 min-[1360px]:px-10 min-[1550px]:px-16 ${!isScrolled ? "shadow-none" : "shadow-lg"}`}
    >
      <div className="flex items-center justify-between w-full max-w-[1920px] mx-auto gap-1">
        {/* LEFT CONTAINER: Hamburger, Compact Fluid Logo, Views Badge */}
        <div className="flex items-center shrink-0">
          <div className="lg:hidden relative">
            <button
              aria-label="Toggle navigation"
              className="btn btn-ghost p-1 mr-2"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 sm:h-7 sm:w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>

            {isOpen && (
              <ul className="absolute left-0 mt-4 p-4 shadow-2xl bg-white rounded-2xl w-[85vw] max-w-[300px] border border-gray-100 text-gray-800 flex flex-col gap-1 z-[110] list-none">
                <NavItems
                  isMobile={true}
                  pathname={pathname}
                  onClose={() => setIsOpen(false)}
                  user={user}
                  onLogout={handleLogout}
                />
              </ul>
            )}
          </div>

          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="Logo"
              width={280}
              height={95}
              priority
              className="w-[120px] sm:w-[140px] lg:w-[145px] xl:w-[195px] min-[1360px]:w-[195px] min-[1440px]:w-[230px] min-[1550px]:w-[270px] h-auto transition-all duration-300 shrink-0"
            />
          </Link>

          {mounted && (
            <div className="flex items-center gap-1 ml-2 xl:ml-3 px-2 py-0.5 xl:py-1 bg-gray-200/50 border border-gray-300/30 rounded-full text-gray-600 font-sans tracking-wide shrink-0">
              <Eye className="w-3.5 h-3.5 text-[#946659]" />
              <span className="text-[12px] xl:text-[13px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap">
                <span className="hidden min-[1360px]:inline">Views: </span>
                {visits > 0 ? visits.toLocaleString() : "..."}
              </span>
            </div>
          )}
        </div>

        {/* CENTER CONTAINER: Modern responsive gap distribution with built-in safety */}
        <div className="hidden lg:flex items-center justify-center flex-1 mx-2">
          <ul className="flex items-center gap-1 xl:gap-2.5 min-[1360px]:gap-4 min-[1440px]:gap-6 min-[1550px]:gap-8 list-none m-0 p-0">
            <NavItems isMobile={false} pathname={pathname} />
          </ul>
        </div>

        {/* RIGHT CONTAINER: Cart Icon & Restored Dynamic User Avatar Layout */}
        <div className="flex items-center gap-2 xl:gap-3 min-[1360px]:gap-5 shrink-0">
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 relative hover:bg-gray-200/50 rounded-full transition-all shrink-0"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-5 h-5 xl:w-6 xl:h-6 text-gray-700" />
            {mounted && itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] xl:text-[11px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {itemCount}
              </span>
            )}
          </button>

          {!user ? (
            <div className="hidden sm:flex items-center gap-2 xl:gap-3 min-[1360px]:gap-5 shrink-0">
              <Link
                href="/login"
                className={`${commonFontSize} ${commonWeight} text-[#946659] hover:text-nazrul-crimson transition-colors whitespace-nowrap`}
              >
                Log In
              </Link>
              <Link
                href="/register"
                className={`flex items-center justify-center h-8 xl:h-8.5 min-[1360px]:h-10 border-none bg-[#946659] text-white px-3.5 xl:px-4 min-[1360px]:px-5 min-[1550px]:px-7 rounded-full shadow-md hover:bg-nazrul-crimson transition-all ${commonFontSize} ${commonWeight} whitespace-nowrap`}
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="dropdown dropdown-end shrink-0">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border-2 border-[#946659] h-8 w-8 xl:h-8.5 xl:w-8.5 min-[1360px]:h-10 min-[1360px]:w-10 min-h-0"
              >
                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center font-bold uppercase text-[#946659] text-[14px] xl:text-[15px] min-[1360px]:text-[17px]">
                  {user.email?.[0]}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu mt-3 z-[10] p-2 shadow-2xl bg-white rounded-box w-56 border text-gray-800"
              >
                <li className="border-b pb-2 mb-2 px-4 py-2 text-[14px] opacity-70 truncate font-medium">
                  {user.email}
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className={`${commonWeight} py-2 text-[16px]`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className={`${commonWeight} py-2 text-[16px] flex justify-between items-center`}
                  >
                    Cart
                    {mounted && itemCount > 0 && (
                      <span className="badge badge-sm bg-[#946659] text-white border-none">
                        {itemCount}
                      </span>
                    )}
                  </button>
                </li>
                <li className="mt-2 pt-2 border-t">
                  <button
                    onClick={handleLogout}
                    className={`text-red-600 ${commonWeight} py-2 w-full text-left text-[16px]`}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
}
