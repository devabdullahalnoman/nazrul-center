import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const navLinks = (
    <>
      <li>
        <Link href="/biography">Biography</Link>
      </li>
      <li>
        <Link href="/works">Works</Link>
      </li>
      <li>
        <Link href="/archive">Archive</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-2 md:px-8">
      <div className="navbar-start">
        {/* Mobile Menu Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
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

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">{navLinks}</ul>
      </div>

      <div className="navbar-end">
        <Link href="/contact" className="btn btn-primary btn-sm md:btn-md">
          Contact
        </Link>
      </div>
    </div>
  );
}
