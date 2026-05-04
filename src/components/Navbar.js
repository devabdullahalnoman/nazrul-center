"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { authService } from "@/lib/supabase/auth-service";
import { useAuth } from "@/hooks/useAuth";

// --- DESIGN TOKENS ---
const commonFontSize = "text-[12px] xl:text-[14px] min-[1550px]:text-[15px]";
const commonWeight = "font-semibold";
const activeLink = "text-primary";
const linkStyle = `transition-all duration-200 ${commonWeight} px-2 xl:px-3 ${commonFontSize} hover:text-primary whitespace-nowrap`;

const NavItems = ({ isMobile = false, pathname, onClose, user }) => {
  const items = [
    { name: "Home", href: "/" },
    { name: "Biography", href: "/biography" },
    { name: "Publications", href: "/publications" },
    { name: "Songs", href: "/songs" },
    { name: "Docu Film", href: "/docu-film" },
    { name: "Books & Gifts", href: "/shop" },
    { name: "Events", href: "/events" },
  ];

  return (
    <>
      {items.map((item) => (
        <li key={item.href} className="list-none">
          <Link
            href={item.href}
            onClick={onClose}
            className={`${linkStyle} ${pathname === item.href ? activeLink : ""} ${isMobile ? "py-1.5 block w-full text-[11px]" : ""}`}
          >
            {item.name}
          </Link>
        </li>
      ))}

      {!isMobile && (
        <li className="dropdown dropdown-hover list-none">
          <div
            tabIndex={0}
            role="button"
            className={`${linkStyle} flex items-center gap-0.5 cursor-pointer ${pathname === "/media" || pathname === "/news" ? activeLink : ""}`}
          >
            Media & News
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 opacity-50"
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
                className={`py-2 hover:text-primary ${commonWeight} ${commonFontSize}`}
              >
                Media
              </Link>
            </li>
            <li>
              <Link
                href="/news"
                className={`py-2 hover:text-primary ${commonWeight} ${commonFontSize}`}
              >
                News
              </Link>
            </li>
          </ul>
        </li>
      )}

      {isMobile && (
        <>
          <li className="list-none">
            <Link
              onClick={onClose}
              href="/media"
              className={`${linkStyle} py-1.5 block w-full text-[11px]`}
            >
              Media
            </Link>
          </li>
          <li className="list-none">
            <Link
              onClick={onClose}
              href="/news"
              className={`${linkStyle} py-1.5 block w-full text-[11px]`}
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
          className={`${linkStyle} ${pathname === "/about" ? activeLink : ""} ${isMobile ? "py-1.5 block w-full text-[11px]" : ""}`}
        >
          About Us
        </Link>
      </li>

      {/* MOBILE ONLY: Auth Buttons inside Hamburger */}
      {isMobile && !user && (
        <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-gray-100 min-[541px]:hidden">
          <Link
            href="/login"
            onClick={onClose}
            className="text-[11px] font-bold text-[#946659] py-1 px-2 text-center border border-[#946659] rounded"
          >
            Log In
          </Link>
          <Link
            href="/register"
            onClick={onClose}
            className="text-[11px] font-bold bg-[#946659] text-white py-1.5 px-2 text-center rounded"
          >
            Register
          </Link>
        </div>
      )}
    </>
  );
};

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

  return (
    <nav
      className={`navbar sticky top-0 z-[100] transition-all duration-300 bg-[#F8F8F8] text-gray-800 py-1 px-3 min-[1550px]:px-12 ${!isScrolled ? "shadow-none" : "shadow-lg"}`}
    >
      <div className="navbar-start flex items-center">
        <div className="lg:hidden relative">
          <button
            className="btn btn-ghost p-1"
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
          {isOpen && (
            <ul className="absolute left-0 mt-3 p-3 shadow-2xl bg-white rounded-box w-[85vw] max-w-[240px] border text-gray-800 flex flex-col gap-0 z-[110] list-none">
              <NavItems
                isMobile={true}
                pathname={pathname}
                onClose={() => setIsOpen(false)}
                user={user}
              />
            </ul>
          )}
        </div>

        <Link href="/" className="flex items-center ml-1">
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={68}
            priority
            className="w-[110px] md:w-[150px] min-[1550px]:w-[200px] h-auto transition-all duration-300"
          />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center space-x-0 list-none">
          <NavItems isMobile={false} pathname={pathname} user={user} />
        </ul>
      </div>

      <div className="navbar-end gap-1.5 xl:gap-4">
        {!user ? (
          <div className="hidden min-[541px]:flex items-center gap-2 xl:gap-4">
            <Link
              href="/login"
              className={`${commonFontSize} ${commonWeight} text-[#946659] hover:text-primary transition-colors whitespace-nowrap`}
            >
              Log In
            </Link>
            <Link
              href="/register"
              className={`btn btn-xs xl:btn-sm h-8 xl:h-10 border-none bg-[#946659] text-white px-3 min-[1550px]:px-6 rounded-full shadow-md hover:bg-primary transition-all ${commonFontSize} ${commonWeight} whitespace-nowrap`}
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar border-2 border-[#946659]"
            >
              <div className="w-8 md:w-10 rounded-full bg-gray-100 flex items-center justify-center font-bold uppercase text-[#946659]">
                {user.email?.[0]}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu mt-3 z-[10] p-2 shadow-2xl bg-white rounded-box w-56 border text-gray-800"
            >
              <li className="border-b pb-2 mb-2 px-4 py-2 text-[11px] opacity-70 truncate font-medium">
                {user.email}
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className={`${commonWeight} py-2 text-[12px]`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/profile"
                  className={`${commonWeight} py-2 text-[12px]`}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className={`${commonWeight} py-2 text-[12px] flex justify-between items-center`}
                >
                  Cart
                  <span className="badge badge-sm bg-[#946659] text-white border-none">
                    0
                  </span>
                </Link>
              </li>
              <li className="mt-2 pt-2 border-t">
                <button
                  onClick={() => authService.logout()}
                  className={`text-red-600 ${commonWeight} py-2 w-full text-left text-[12px]`}
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
