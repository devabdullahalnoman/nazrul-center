"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

// Scaled up typography matching the navbar layout tiers
const commonFontSize =
  "text-[14px] xl:text-[15px] min-[1360px]:text-[16px] min-[1440px]:text-[17px] min-[1550px]:text-[18px]";
const commonWeight = "font-semibold";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F8F8F8] text-gray-800 border-t border-gray-200/60 pt-12 pb-6 px-3 sm:px-6 lg:px-4 xl:px-18 min-[1360px]:px-10 min-[1550px]:px-16">
      <div className="w-full max-w-480 mx-auto">
        
        {/* Main Footer Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12 mb-10">
          
          {/* Column 1: Brand / Logo Identity */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block shrink-0">
              <Image
                src="/logo.png"
                alt="Logo"
                width={240}
                height={80}
                className="w-35 xl:w-45 min-[1440px]:w-52.5 h-auto transition-all"
              />
            </Link>
            <p className={`${commonFontSize} text-gray-600 font-medium leading-relaxed max-w-sm`}>
              Preserving and celebrating the timeless literary, musical, and revolutionary heritage of Kazi Nazrul Islam for generations to come.
            </p>
          </div>

          {/* Column 2: Quick Navigation Links */}
          <div>
            <h3 className="text-[16px] xl:text-[18px] font-bold text-nazrul-terracotta mb-4">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
              <li>
                <Link href="/biography" className={`${commonFontSize} ${commonWeight} text-gray-600 hover:text-nazrul-crimson transition-colors`}>
                  Biography
                </Link>
              </li>
              <li>
                <Link href="/publications" className={`${commonFontSize} ${commonWeight} text-gray-600 hover:text-nazrul-crimson transition-colors`}>
                  Publications
                </Link>
              </li>
              <li>
                <Link href="/docu-film" className={`${commonFontSize} ${commonWeight} text-gray-600 hover:text-nazrul-crimson transition-colors`}>
                  Docu Film
                </Link>
              </li>
              <li>
                <Link href="/shop" className={`${commonFontSize} ${commonWeight} text-gray-600 hover:text-nazrul-crimson transition-colors`}>
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className={`${commonFontSize} ${commonWeight} text-gray-600 hover:text-nazrul-crimson transition-colors`}>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Channels */}
          <div>
            <h3 className="text-[16px] xl:text-[18px] font-bold text-nazrul-terracotta mb-4">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3.5 list-none m-0 p-0 text-gray-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-nazrul-terracotta shrink-0 mt-0.5" />
                <span className={`${commonFontSize} font-medium`}>
                  123 Nazrul Avenue, Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-5 h-5 text-nazrul-terracotta shrink-0" />
                <span className={`${commonFontSize} font-medium`}>
                  +880 1234-567890
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-nazrul-terracotta shrink-0" />
                <a href="mailto:info@nazrulcenter.org" className={`${commonFontSize} font-medium hover:text-nazrul-crimson transition-colors`}>
                  info@nazrulcenter.org
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Community Engagement */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[16px] xl:text-[18px] font-bold text-nazrul-terracotta">
              Stay Connected
            </h3>
            <p className={`${commonFontSize} text-gray-600 font-medium leading-relaxed`}>
              Subscribe to receive updates on historical discoveries, events, and new publications.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-md gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-[14px] outline-none focus:border-nazrul-terracotta transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-nazrul-terracotta hover:bg-nazrul-crimson text-white font-bold px-4 py-2 text-[14px] rounded-lg transition-colors shadow-sm"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Closing Information Block Divider Line */}
        <div className="border-t border-gray-300/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Copyright Metadata block */}
          <p className="text-[12px] xl:text-[14px] font-medium text-gray-500 text-center sm:text-left">
            &copy; {currentYear} Nazrul Center. All rights reserved.
          </p>

          {/* Scaled Up Social Channels Using Pure Custom Inline SVGs */}
          <div className="flex items-center gap-5 text-gray-500">
            {/* Facebook */}
            <a href="#" aria-label="Facebook" className="hover:text-nazrul-crimson transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            {/* Brand New X (Formerly Twitter) Asset */}
            <a href="#" aria-label="X (Twitter)" className="hover:text-nazrul-crimson transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" fill="currentColor" stroke="none"></path>
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className="hover:text-nazrul-crimson transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" aria-label="YouTube" className="hover:text-nazrul-crimson transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}