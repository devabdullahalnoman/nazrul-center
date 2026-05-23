// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { createClient } from "@/lib/supabase/client";
// import { useAuth } from "@/features/auth/hooks/useAuth";
// import { useCartStore } from "@/features/cart/hooks/useCartStore";
// import CartDrawer from "@/features/cart/components/CartDrawer";
// import { ShoppingBag } from "lucide-react";

// // --- DESIGN TOKENS ---
// const commonFontSize = "text-[12px] xl:text-[14px] min-[1550px]:text-[15px]";
// const commonWeight = "font-semibold";
// const activeLink = "text-primary";
// const linkStyle = `transition-all duration-200 ${commonWeight} px-2 xl:px-3 ${commonFontSize} hover:text-primary whitespace-nowrap`;

// const supabase = createClient();

// const NavItems = ({ isMobile = false, pathname, onClose, user }) => {
//   const items = [
//     { name: "Home", href: "/" },
//     { name: "Biography", href: "/biography" },
//     { name: "Publications", href: "/publications" },
//     { name: "Songs", href: "/songs" },
//     { name: "Docu Film", href: "/docu-film" },
//     { name: "Books & Gifts", href: "/shop" },
//     { name: "Events", href: "/events" },
//   ];

//   return (
//     <>
//       {items.map((item) => (
//         <li key={item.href} className="list-none">
//           <Link
//             href={item.href}
//             onClick={onClose}
//             className={`${linkStyle} ${pathname === item.href ? activeLink : ""} ${isMobile ? "py-1.5 block w-full text-[11px]" : ""}`}
//           >
//             {item.name}
//           </Link>
//         </li>
//       ))}

//       {!isMobile && (
//         <li className="dropdown dropdown-hover list-none">
//           <div
//             tabIndex={0}
//             role="button"
//             className={`${linkStyle} flex items-center gap-0.5 cursor-pointer ${pathname === "/media" || pathname === "/news" ? activeLink : ""}`}
//           >
//             Media & News
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//             </svg>
//           </div>
//           <ul tabIndex={0} className="dropdown-content z-[100] menu p-2 shadow-2xl bg-white text-gray-800 rounded-box w-44 border m-0 pt-4">
//             <li><Link href="/media" className={`py-2 hover:text-primary ${commonWeight} ${commonFontSize}`}>Media</Link></li>
//             <li><Link href="/news" className={`py-2 hover:text-primary ${commonWeight} ${commonFontSize}`}>News</Link></li>
//           </ul>
//         </li>
//       )}

//       {isMobile && (
//         <>
//           <li className="list-none"><Link onClick={onClose} href="/media" className={`${linkStyle} py-1.5 block w-full text-[11px]`}>Media</Link></li>
//           <li className="list-none"><Link onClick={onClose} href="/news" className={`${linkStyle} py-1.5 block w-full text-[11px]`}>News</Link></li>
//         </>
//       )}

//       <li className="list-none">
//         <Link href="/about" onClick={onClose} className={`${linkStyle} ${pathname === "/about" ? activeLink : ""} ${isMobile ? "py-1.5 block w-full text-[11px]" : ""}`}>
//           About Us
//         </Link>
//       </li>
//     </>
//   );
// };

// export default function Navbar() {
//   const { user } = useAuth();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [mounted, setMounted] = useState(false); // Hydration fix
//   const pathname = usePathname();
//   const itemCount = useCartStore((state) => state.getItemCount());

//   useEffect(() => {
//     setMounted(true); // Navbar is now safe to render client-side state
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     window.location.reload();
//   };

//   return (
//     <nav className={`navbar sticky top-0 z-[100] transition-all duration-300 bg-[#F8F8F8] text-gray-800 py-1 px-3 min-[1550px]:px-12 ${!isScrolled ? "shadow-none" : "shadow-lg"}`}>
//       <div className="navbar-start flex items-center">
//         <div className="lg:hidden relative">
//           <button className="btn btn-ghost p-1" onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}>
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//             </svg>
//           </button>
//           {isOpen && (
//             <ul className="absolute left-0 mt-3 p-3 shadow-2xl bg-white rounded-box w-[85vw] max-w-[240px] border text-gray-800 flex flex-col gap-0 z-[110] list-none">
//               <NavItems isMobile={true} pathname={pathname} onClose={() => setIsOpen(false)} user={user} />
//             </ul>
//           )}
//         </div>

//         <Link href="/" className="flex items-center ml-1">
//           <Image src="/logo.png" alt="Logo" width={200} height={68} priority className="w-[110px] md:w-[150px] min-[1550px]:w-[200px] h-auto transition-all duration-300" />
//         </Link>
//       </div>

//       <div className="navbar-center hidden lg:flex">
//         <ul className="flex items-center space-x-0 list-none">
//           <NavItems isMobile={false} pathname={pathname} user={user} />
//         </ul>
//       </div>

//       <div className="navbar-end gap-2 xl:gap-4">
//         {/* Cart Trigger */}
//         <button
//           onClick={() => setIsCartOpen(true)}
//           className="p-2 relative hover:bg-gray-200/50 rounded-full transition-all"
//         >
//           <ShoppingBag className="w-5 h-5 text-nazrul-ink" />
//           {mounted && itemCount > 0 && (
//             <span className="absolute -top-0.5 -right-0.5 bg-nazrul-crimson text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-in zoom-in duration-300">
//               {itemCount}
//             </span>
//           )}
//         </button>

//         {!user ? (
//           <div className="hidden min-[541px]:flex items-center gap-2 xl:gap-4">
//             <Link href="/login" className={`${commonFontSize} ${commonWeight} text-[#946659] hover:text-primary transition-colors whitespace-nowrap`}>Log In</Link>
//             <Link href="/register" className={`btn btn-xs xl:btn-sm h-8 xl:h-10 border-none bg-[#946659] text-white px-3 min-[1550px]:px-6 rounded-full shadow-md hover:bg-primary transition-all ${commonFontSize} ${commonWeight} whitespace-nowrap`}>Register</Link>
//           </div>
//         ) : (
//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-[#946659]">
//               <div className="w-8 md:w-10 rounded-full bg-gray-100 flex items-center justify-center font-bold uppercase text-[#946659]">
//                 {user.email?.[0]}
//               </div>
//             </div>
//             <ul tabIndex={0} className="dropdown-content menu mt-3 z-[10] p-2 shadow-2xl bg-white rounded-box w-56 border text-gray-800">
//               <li className="border-b pb-2 mb-2 px-4 py-2 text-[11px] opacity-70 truncate font-medium">{user.email}</li>
//               <li><Link href="/dashboard" className={`${commonWeight} py-2 text-[12px]`}>Dashboard</Link></li>
//               <li>
//                 <button onClick={() => setIsCartOpen(true)} className={`${commonWeight} py-2 text-[12px] flex justify-between items-center`}>
//                   Cart
//                   {mounted && itemCount > 0 && (
//                     <span className="badge badge-sm bg-[#946659] text-white border-none">{itemCount}</span>
//                   )}
//                 </button>
//               </li>
//               <li className="mt-2 pt-2 border-t"><button onClick={handleLogout} className={`text-red-600 ${commonWeight} py-2 w-full text-left text-[12px]`}>Logout</button></li>
//             </ul>
//           </div>
//         )}
//       </div>
//       <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
//     </nav>
//   );
// }

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

// Layout styling parameters
const commonFontSize = "text-[12px] xl:text-[14px] min-[1550px]:text-[15px]";
const commonWeight = "font-semibold";
const activeLink = "text-primary";
const linkStyle = `transition-all duration-200 ${commonWeight} px-2 xl:px-3 ${commonFontSize} hover:text-primary whitespace-nowrap`;

const supabase = createClient();

// Isolated Menu Item Iteration Handler Component
const NavItems = memo(({ isMobile = false, pathname, onClose }) => {
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
    </>
  );
});

NavItems.displayName = "NavItems";

export default function Navbar() {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visits, setVisits] = useState(0); // Initialize at 0 explicitly to prevent layout shifting
  const pathname = usePathname();
  const itemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    setMounted(true);

    // Throttled frame handler prevents layout reflow lag
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

        // Force a query check regardless of token to ensure the UI views element renders with data
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
      className={`navbar sticky top-0 z-[100] transition-all duration-300 bg-[#F8F8F8] text-gray-800 py-1 px-3 min-[1550px]:px-12 ${!isScrolled ? "shadow-none" : "shadow-lg"}`}
    >
      <div className="navbar-start flex items-center">
        <div className="lg:hidden relative">
          <button
            aria-label="Toggle navigation"
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

        {/* Views Container badge elements */}
        {mounted && (
          <div className="flex items-center gap-1.5 ml-4 px-3 py-1 bg-gray-200/50 border border-gray-300/30 rounded-full text-gray-600 font-sans tracking-wide">
            <Eye className="w-3 h-3 text-[#946659]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Views: {visits > 0 ? visits.toLocaleString() : "..."}
            </span>
          </div>
        )}
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center space-x-0 list-none">
          <NavItems isMobile={false} pathname={pathname} />
        </ul>
      </div>

      <div className="navbar-end gap-2 xl:gap-4">
        <button
          onClick={() => setIsCartOpen(true)}
          className="p-2 relative hover:bg-gray-200/50 rounded-full transition-all"
          aria-label="View Cart"
        >
          <ShoppingBag className="w-5 h-5 text-gray-700" />
          {mounted && itemCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
              {itemCount}
            </span>
          )}
        </button>

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
                <button
                  onClick={() => setIsCartOpen(true)}
                  className={`${commonWeight} py-2 text-[12px] flex justify-between items-center`}
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
                  className={`text-red-600 ${commonWeight} py-2 w-full text-left text-[12px]`}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
}
