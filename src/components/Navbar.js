import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const navLinks = (
    <>
      <li>
        <Link href="/biography">Biography</Link>
      </li>
      <li>
        <Link href="/publications">Publications</Link>
      </li>
      <li>
        <Link href="/songs">Songs</Link>
      </li>
      <li>
        <Link href="/docu-film">Docu Film</Link>
      </li>
      <li>
        <Link href="/shop">Books & Gifts</Link>
      </li>
      <li>
        <Link href="/media">Media & News</Link>
      </li>
      <li>
        <Link href="/events">Events</Link>
      </li>
      <li>
        <Link href="/about">About Us</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-100 px-2 md:px-8">
      <div className="navbar-start">
        {/* Mobile Menu Dropdown */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            aria-label="Menu"
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
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow-xl bg-base-100 rounded-box w-64 border border-base-200"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo - Fixed with Next.js best practices */}
        <Link href="/" className="flex items-center">
          <div className="bg-white p-1 rounded-lg">
            <Image
              src="/logo.png"
              alt="Logo"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "150px", height: "auto" }}
              priority
            />
          </div>
        </Link>
      </div>

      {/* Desktop Menu - Hidden on small screens */}
      <div className="navbar-center hidden xl:flex">
        <ul className="menu menu-horizontal px-1 font-semibold gap-1">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end">
        <Link
          href="/contact"
          className="btn btn-primary btn-sm md:btn-md px-6 shadow-md"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
