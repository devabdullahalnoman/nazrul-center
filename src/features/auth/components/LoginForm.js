// "use client";
// import { useState } from "react";
// import { useAuth } from "../hooks/useAuth";
// import Link from "next/link";

// export function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const { login, isLoggingIn, signInWithGoogle, isGoogleLoading } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     try {
//       await login({ email, password });
//     } catch (error) {
//       setErrorMsg(error.message || "Invalid login credentials configuration.");
//     }
//   };

//   const handleGoogleSSO = async () => {
//     setErrorMsg("");
//     try {
//       await signInWithGoogle();
//     } catch (err) {
//       setErrorMsg(
//         "Identity Connection Framework Error: Google OAuth2 handoff failed.",
//       );
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto bg-white shadow-2xl p-8 lg:p-10 border border-gray-100 rounded-4xl">
//       <form onSubmit={handleSubmit}>
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
//             Welcome Back
//           </h2>
//           <p className="text-nazrul-terracotta italic font-medium">
//             Access your dashboard
//           </p>
//         </div>

//         {errorMsg && (
//           <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-2xl text-sm font-medium animate-in fade-in duration-200">
//             {errorMsg}
//           </div>
//         )}

//         <div className="space-y-4">
//           <input
//             type="email"
//             required
//             placeholder="Email Address"
//             className="input w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-nazrul-terracotta transition-all text-gray-900"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             required
//             placeholder="Password"
//             className="input w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-nazrul-terracotta transition-all text-gray-900"
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button
//             type="submit"
//             disabled={isLoggingIn || isGoogleLoading}
//             className="w-full mt-4 py-4 bg-nazrul-terracotta text-white rounded-2xl font-black uppercase tracking-widest hover:bg-nazrul-maroon disabled:opacity-50 transition-colors duration-300 shadow-xl shadow-nazrul-terracotta/20"
//           >
//             {isLoggingIn ? "Authenticating..." : "Sign In"}
//           </button>
//         </div>
//       </form>

//       {/* Context Grid Splitter Layout Element */}
//       <div className="relative my-6">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-gray-200"></div>
//         </div>
//         <div className="relative flex justify-center text-xs uppercase">
//           <span className="bg-white px-4 text-gray-400 font-bold tracking-widest text-[9px] font-sans">
//             Or Secure Connect
//           </span>
//         </div>
//       </div>

//       {/* Google Single Sign On Component Hook Button */}
//       <button
//         type="button"
//         disabled={isLoggingIn || isGoogleLoading}
//         onClick={handleGoogleSSO}
//         className="w-full py-4 bg-white border-2 border-gray-900 text-gray-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-50 transition-all flex items-center justify-center gap-3 active:scale-[0.99] disabled:opacity-50 font-sans"
//       >
//         <svg className="w-4 h-4" viewBox="0 0 24 24">
//           <path
//             fill="#EA4335"
//             d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.44 0-6.228-2.788-6.228-6.228 0-3.44 2.788-6.228 6.228-6.228 1.487 0 2.857.525 3.935 1.417l2.946-2.946C18.665 2.502 15.617 1.5 12.24 1.5c-5.79 0-10.5 4.71-10.5 10.5s4.71 10.5 10.5 10.5c5.364 0 9.876-3.845 10.435-9H12.24z"
//           />
//         </svg>
//         {isGoogleLoading ? "Connecting OAuth..." : "Sign In with Google"}
//       </button>

//       <p className="text-center text-sm mt-8 text-gray-500">
//         Don&apos;t have an account?{" "}
//         <Link
//           href="/register"
//           className="text-nazrul-maroon font-bold hover:underline"
//         >
//           Register Here
//         </Link>
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useAuth } from "../hooks/useAuth";
// import Link from "next/link";

// export function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const { login, isLoggingIn, signInWithGoogle, isGoogleLoading } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     try {
//       await login({ email, password });
//     } catch (error) {
//       setErrorMsg(error.message || "Invalid verification parameters parsed.");
//     }
//   };

//   return (
//     <div className="w-full max-w-md bg-white shadow-2xl p-8 lg:p-10 border border-gray-100 rounded-4xl mx-auto">
//       <form onSubmit={handleSubmit}>
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
//             Welcome Back
//           </h2>
//           <p className="text-nazrul-terracotta italic font-medium">
//             Access your dashboard
//           </p>
//         </div>

//         {errorMsg && (
//           <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-2xl text-sm font-medium">
//             {errorMsg}
//           </div>
//         )}

//         <div className="space-y-4">
//           <input
//             type="email"
//             required
//             placeholder="Email Address"
//             className="input w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-nazrul-terracotta transition-all text-gray-900"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             required
//             placeholder="Password"
//             className="input w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-nazrul-terracotta transition-all text-gray-900"
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button
//             type="submit"
//             disabled={isLoggingIn || isGoogleLoading}
//             className="w-full mt-4 py-4 bg-nazrul-terracotta text-white rounded-2xl font-black uppercase tracking-widest hover:bg-nazrul-maroon disabled:opacity-50 transition-colors duration-300 shadow-xl shadow-nazrul-terracotta/20"
//           >
//             {isLoggingIn ? "Authenticating..." : "Sign In"}
//           </button>
//         </div>
//       </form>

//       <div className="relative my-6">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-gray-200"></div>
//         </div>
//         <div className="relative flex justify-center text-xs uppercase">
//           <span className="bg-white px-4 text-gray-400 font-bold tracking-widest text-[9px] font-sans">
//             Or SSO Connection
//           </span>
//         </div>
//       </div>

//       <button
//         type="button"
//         disabled={isLoggingIn || isGoogleLoading}
//         onClick={() =>
//           signInWithGoogle().catch(() =>
//             setErrorMsg("Google SSO Connection Aborted"),
//           )
//         }
//         className="w-full py-4 bg-white border-2 border-gray-900 text-gray-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-50 transition-all flex items-center justify-center gap-3 active:scale-[0.99] disabled:opacity-50 font-sans"
//       >
//         <svg className="w-4 h-4" viewBox="0 0 24 24">
//           <path
//             fill="#EA4335"
//             d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.44 0-6.228-2.788-6.228-6.228 0-3.44 2.788-6.228 6.228-6.228 1.487 0 2.857.525 3.935 1.417l2.946-2.946C18.665 2.502 15.617 1.5 12.24 1.5c-5.79 0-10.5 4.71-10.5 10.5s4.71 10.5 10.5 10.5c5.364 0 9.876-3.845 10.435-9H12.24z"
//           />
//         </svg>
//         {isGoogleLoading ? "Connecting..." : "Sign In with Google"}
//       </button>

//       <p className="text-center text-sm mt-8 text-gray-500">
//         Don&apos;t have an account?{" "}
//         <Link
//           href="/register"
//           className="text-nazrul-maroon font-bold hover:underline"
//         >
//           Register
//         </Link>
//       </p>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Link from "next/link";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { login, isLoggingIn, signInWithGoogle, isGoogleLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      await login({ email, password });
    } catch (error) {
      setErrorMsg(error.message || "Invalid login credentials configuration.");
    }
  };

  const handleGoogleSSO = async () => {
    setErrorMsg("");
    try {
      await signInWithGoogle();
    } catch (err) {
      setErrorMsg(
        "Identity Connection Framework Error: Google OAuth2 handoff failed.",
      );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-2xl p-8 lg:p-10 border border-gray-100 rounded-4xl">
      <form onSubmit={handleSubmit}>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-nazrul-terracotta text-sm uppercase tracking-widest font-black">
            Access the Archive
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium text-center border border-red-100">
            {errorMsg}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-nazrul-terracotta focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
              placeholder="scholar@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-nazrul-terracotta focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full mt-8 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-nazrul-terracotta disabled:opacity-50 transition-colors duration-300 shadow-xl shadow-gray-900/20"
        >
          {isLoggingIn ? "Authenticating..." : "Sign In"}
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-gray-400 font-bold tracking-widest text-[9px] font-sans">
            Or SSO Connection
          </span>
        </div>
      </div>

      <button
        type="button"
        disabled={isLoggingIn || isGoogleLoading}
        onClick={() =>
          signInWithGoogle().catch(() =>
            setErrorMsg("Google SSO Connection Aborted"),
          )
        }
        className="w-full py-4 bg-white border-2 border-gray-900 text-gray-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-50 transition-all flex items-center justify-center gap-3 active:scale-[0.99] disabled:opacity-50 font-sans"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.44 0-6.228-2.788-6.228-6.228 0-3.44 2.788-6.228 6.228-6.228 1.487 0 2.857.525 3.922 1.51L20.024 4.9C18.208 3.2 15.433 2.014 12.24 2.014 6.64 2.014 2.013 6.64 2.013 12.24c0 5.6 4.627 10.226 10.227 10.226 5.9 0 10.226-4.148 10.226-10.4 0-.714-.07-1.402-.191-2.066h-10.035z"
          />
        </svg>
        Continue with Google
      </button>

      <p className="text-center text-sm mt-8 text-gray-500">
        Don&apos;t have an access key?{" "}
        <Link
          href="/register"
          className="text-nazrul-terracotta font-bold hover:text-nazrul-maroon hover:underline transition-colors"
        >
          Request Access
        </Link>
      </p>
    </div>
  );
}
