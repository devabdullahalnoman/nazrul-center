import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QueryProvider from "@/lib/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nazrul Center",
  description:
    "A comprehensive digital archive and resource center dedicated to the life, works, and legacy of Kazi Nazrul Islam, the Rebel Poet of Bengal.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        {/* We will build the Navbar next */}
        <header className="sticky top-0 z-50">
          <Navbar />
        </header>

        <QueryProvider>
          <main className="grow w-full mx-auto">{children}</main>
        </QueryProvider>

        <Footer />
      </body>
    </html>
  );
}
