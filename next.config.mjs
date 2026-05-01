/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    dangerouslyAllowSVG: true, // ADD THIS LINE
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "rhaxakxqjpkjepkhpdnu.supabase.co", // Your Supabase Host
        port: "",
        pathname: "/storage/v1/object/public/**", // Matches all public storage files
      },
    ],
  },
};

export default nextConfig;
