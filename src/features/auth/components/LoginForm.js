"use client";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Link from "next/link";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { login, isLoggingIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      await login({ email, password });
    } catch (error) {
      setErrorMsg("Invalid login credentials.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card w-full max-w-md bg-white shadow-2xl p-8 lg:p-10 border border-gray-100 rounded-4xl"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
          Welcome Back
        </h2>
        <p className="text-nazrul-terracotta italic font-medium">
          Access your dashboard
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-2xl text-sm font-medium">
          {errorMsg}
        </div>
      )}

      <div className="space-y-4">
        <input
          type="email"
          required
          placeholder="Email Address"
          className="input w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-nazrul-terracotta transition-all text-gray-900"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="Password"
          className="input w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-nazrul-terracotta transition-all text-gray-900"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* FIXED BUTTON: Uses arbitrary hex values for guaranteed rendering */}
        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full mt-4 py-4 bg-nazrul-terracotta text-white rounded-2xl font-black uppercase tracking-widest hover:bg-nazrul-maroon disabled:opacity-50 transition-colors duration-300 shadow-xl shadow-nazrul-terracotta/20"
        >
          {isLoggingIn ? "Authenticating..." : "Sign In"}
        </button>
      </div>

      <p className="text-center text-sm mt-8 text-gray-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-nazrul-maroon font-bold hover:underline"
        >
          Register
        </Link>
      </p>
    </form>
  );
}
