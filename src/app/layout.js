import Navbar from "@/components/ui/Navbar";
import "./globals.css";
import ReactQueryProvider from "@/lib/react-query/provider";
import Footer from "@/components/ui/Footer";

export const metadata = {
  title: "Nazrul Center | The Archive & Platform",
  description:
    "The official archive and platform dedicated to the Rebel Poet, Kazi Nazrul Islam.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-nazrul-base" suppressHydrationWarning>
        <ReactQueryProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </ReactQueryProvider>
        <Footer></Footer>
      </body>
    </html>
  );
}
