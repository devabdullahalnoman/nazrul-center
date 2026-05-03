"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { authService } from "@/lib/supabase/auth-service";
import { useAuth } from "@/hooks/useAuth";

// --- DESIGN TOKENS ---
const brandColor = "#946659";
const commonFontSize = "text-[15px]";
const commonWeight = "font-semibold";
const activeLink = "text-[#be123c]";
const linkStyle = `transition-all duration-200 ${commonWeight} px-3 ${commonFontSize} hover:text-[#be123c]`;

// --- SHARED NAVIGATION LINKS ---
const NavItems = ({ isMobile = false, pathname, onClose }) => {
  const items = [
    { name: "Home", href: "/" },
    { name: "Biography", href: "/biography" },
    { name: "Publications", href: "/publications" },
    { name: "Songs", href: "/songs" },
    { name: "Docu Film", href: "/docu-film" },
    { name: "Books & Gifts", href: "/shop" },
  ];

  return (
    <>
      {items.map((item) => (
        <li key={item.href} className="list-none">
          <Link
            href={item.href}
            onClick={onClose}
            className={`${linkStyle} ${pathname === item.href ? activeLink : ""} ${isMobile ? "py-3 block w-full" : ""}`}
          >
            {item.name}
          </Link>
        </li>
      ))}

      {/* Desktop Media Dropdown */}
      {!isMobile && (
        <li className="dropdown dropdown-hover list-none">
          <div
            tabIndex={0}
            role="button"
            className={`${linkStyle} flex items-center gap-1 ${pathname === "/media" || pathname === "/news" ? activeLink : ""}`}
          >
            Media & News
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 opacity-50"
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
            className="dropdown-content z-1 menu p-2 shadow-2xl bg-white text-gray-800 rounded-box w-44 border m-0 pt-4"
          >
            <li>
              <Link
                href="/media"
                className={`hover:text-[#be123c] py-2 ${commonFontSize} ${commonWeight} ${pathname === "/media" ? activeLink : ""}`}
              >
                Media
              </Link>
            </li>
            <li>
              <Link
                href="/news"
                className={`hover:text-[#be123c] py-2 ${commonFontSize} ${commonWeight} ${pathname === "/news" ? activeLink : ""}`}
              >
                News
              </Link>
            </li>
          </ul>
        </li>
      )}

      {/* Mobile Media Links (Flattened) */}
      {isMobile && (
        <>
          <li className="list-none">
            <Link
              onClick={onClose}
              href="/media"
              className={`${linkStyle} ${pathname === "/media" ? activeLink : ""} py-3 block w-full`}
            >
              Media
            </Link>
          </li>
          <li className="list-none">
            <Link
              onClick={onClose}
              href="/news"
              className={`${linkStyle} ${pathname === "/news" ? activeLink : ""} py-3 block w-full`}
            >
              News
            </Link>
          </li>
        </>
      )}

      <li className="list-none">
        <Link
          href="/about"
          onClick={onClose}
          className={`${linkStyle} ${pathname === "/about" ? activeLink : ""} ${isMobile ? "py-3 block w-full" : ""}`}
        >
          About Us
        </Link>
      </li>
    </>
  );
};

// --- MAIN NAVBAR COMPONENT ---
export default function Navbar() {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";

  return (
    <nav
      className={`navbar sticky top-0 z-100 px-4 md:px-12 transition-all duration-300 ${
        isHome && !isScrolled
          ? "bg-transparent py-4 text-gray-800"
          : "bg-white shadow-md py-4 text-gray-800"
      }`}
    >
      <div className="navbar-start flex items-center">
        {/* MOBILE MENU TOGGLE (Strict State Control) */}
        <div className="xl:hidden relative">
          <button
            className="btn btn-ghost p-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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

          {/* Conditional Rendering: Menu only enters DOM when isOpen is true */}
          {isOpen && (
            <ul className="absolute left-0 mt-3 p-4 shadow-2xl bg-white rounded-box w-[80vw] max-w-sm border text-gray-800 flex flex-col gap-2 z-110 list-none">
              <NavItems
                isMobile={true}
                pathname={pathname}
                onClose={() => setIsOpen(false)}
              />
              {!user && (
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="btn btn-outline btn-sm"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    style={{ backgroundColor: brandColor }}
                    className="btn btn-sm text-white border-none"
                  >
                    Register
                  </Link>
                </div>
              )}
            </ul>
          )}
        </div>

        <Link href="/" className="flex items-center ml-2">
          <div className="bg-white p-1 rounded shadow-sm">
            <Image
              src="/logo.png"
              alt="Logo"
              width={170}
              height={58}
              priority
              className="w-150px md:w-210px h-auto"
            />
          </div>
        </Link>
      </div>

      <div className="navbar-center hidden xl:flex">
        <ul className="flex items-center space-x-1 list-none">
          <NavItems isMobile={false} pathname={pathname} />
        </ul>
      </div>

      <div className="navbar-end gap-2 md:gap-4">
        {!user ? (
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              href="/login"
              style={{ color: brandColor }}
              className={`${commonFontSize} ${commonWeight} hidden sm:block`}
            >
              Log In
            </Link>
            <Link
              href="/register"
              style={{ backgroundColor: brandColor }}
              className={`btn btn-sm h-10 border-none text-white px-4 md:px-6 rounded-full shadow-md ${commonFontSize} ${commonWeight}`}
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar border-2"
              style={{ borderColor: brandColor }}
            >
              <div
                className={`w-8 md:w-10 rounded-full bg-gray-100 flex items-center justify-center ${commonWeight} uppercase ${commonFontSize}`}
                style={{ color: brandColor }}
              >
                {user.email?.[0]}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu mt-3 z-1 p-2 shadow-2xl bg-white rounded-box w-56 border text-gray-800"
            >
              <li className="menu-title px-4 py-2 border-b text-[10px] uppercase opacity-40">
                {user.email}
              </li>
              <li>
                <Link
                  href="/dashboard/profile"
                  className={`py-3 ${commonFontSize} ${commonWeight} ${pathname === "/dashboard/profile" ? activeLink : ""}`}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className={`py-3 ${commonFontSize} ${commonWeight} ${pathname === "/dashboard" ? activeLink : ""}`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className={`py-3 ${commonFontSize} ${commonWeight} ${pathname === "/cart" ? activeLink : ""}`}
                >
                  Cart
                </Link>
              </li>
              <li>
                <button
                  onClick={() => authService.logout()}
                  className={`text-red-600 py-3 border-t mt-1 w-full text-left ${commonFontSize} ${commonWeight}`}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
