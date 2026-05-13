"use client";
import { useState, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import Link from "next/link";

export function RegisterForm() {
  const { register, isRegistering } = useAuth();
  const fileInputRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [photoFile, setPhotoFile] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      await register({ ...formData, photoFile });
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card w-full max-w-lg bg-white shadow-xl p-8 lg:p-10 border border-gray-100 rounded-4xl"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
          Create Account
        </h2>
        <p className="text-nazrul-terracotta italic font-medium">
          Join the Nazrul Center
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-2xl text-sm font-medium">
          {errorMsg}
        </div>
      )}

      <div className="space-y-4">
        <input
          name="fullName"
          type="text"
          required
          placeholder="Full Name *"
          className="input w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-nazrul-terracotta transition-all text-gray-900"
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email Address *"
          className="input w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-nazrul-terracotta transition-all text-gray-900"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Password *"
          className="input w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-nazrul-terracotta transition-all text-gray-900"
          onChange={handleChange}
        />

        <div className="divider text-xs uppercase tracking-widest text-gray-400 font-bold py-2">
          Optional Details
        </div>
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          className="input w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-nazrul-terracotta transition-all text-gray-900"
          onChange={handleChange}
        />
        <textarea
          name="address"
          placeholder="Shipping Address"
          rows="2"
          className="textarea w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-nazrul-terracotta transition-all resize-none text-gray-900"
          onChange={handleChange}
        ></textarea>

        <div
          className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-nazrul-maroon transition-colors duration-300 cursor-pointer"
          onClick={() => fileInputRef.current.click()}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">
              {photoFile ? photoFile.name : "Upload Profile Photo"}
            </span>
            <span className="text-nazrul-terracotta font-bold text-xs uppercase tracking-widest">
              Browse
            </span>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => setPhotoFile(e.target.files[0])}
          />
        </div>

        {/* FIXED BUTTON: Uses arbitrary hex values for guaranteed rendering */}
        <button
          type="submit"
          disabled={isRegistering}
          className="w-full mt-6 py-4 bg-nazrul-terracotta text-white rounded-2xl font-black uppercase tracking-widest hover:bg-nazrul-maroon disabled:opacity-50 transition-colors duration-300 shadow-xl shadow-nazrul-terracotta/20"
        >
          {isRegistering ? "Creating Account..." : "Register"}
        </button>
      </div>

      <p className="text-center text-sm mt-8 text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-nazrul-maroon font-bold hover:underline"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}
