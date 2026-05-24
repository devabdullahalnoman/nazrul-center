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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      // Pass the form payload and the raw file handle down the stream
      await register({ ...formData, photoFile });
    } catch (error) {
      setErrorMsg(
        error.message || "Registration runtime processing exception occurred.",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card w-full max-w-lg bg-white shadow-xl p-8 lg:p-10 border border-gray-100 rounded-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
          Create Account
        </h2>
        <p className="text-nazrul-terracotta text-sm font-medium italic">
          Join the cultural historical archive ledger
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold animate-in fade-in duration-200">
          {errorMsg}
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label className="text-[10px] font-black uppercase text-nazrul-sand tracking-widest block mb-2 ml-1">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full p-4 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none text-sm focus:border-nazrul-terracotta transition-colors"
          />
        </div>

        <div>
          <label className="text-[10px] font-black uppercase text-nazrul-sand tracking-widest block mb-2 ml-1">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="johndoe@archive.org"
            className="w-full p-4 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none text-sm focus:border-nazrul-terracotta transition-colors"
          />
        </div>

        <div>
          <label className="text-[10px] font-black uppercase text-nazrul-sand tracking-widest block mb-2 ml-1">
            Password *
          </label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full p-4 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none text-sm focus:border-nazrul-terracotta transition-colors"
          />
        </div>

        <div>
          <label className="text-[10px] font-black uppercase text-nazrul-sand tracking-widest block mb-2 ml-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="01XXXXXXXXX"
            className="w-full p-4 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none text-sm focus:border-nazrul-terracotta transition-colors"
          />
        </div>

        <div>
          <label className="text-[10px] font-black uppercase text-nazrul-sand tracking-widest block mb-2 ml-1">
            Mailing Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter full physical address details..."
            className="w-full p-4 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none text-sm min-h-20 max-h-37.5 focus:border-nazrul-terracotta transition-colors"
          />
        </div>

        <div>
          <label className="text-[10px] font-black uppercase text-nazrul-sand tracking-widest block mb-2 ml-1">
            Profile Identification Photo
          </label>
          <div
            className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-nazrul-terracotta transition-colors duration-300 cursor-pointer flex items-center justify-between"
            onClick={() => fileInputRef.current.click()}
          >
            <span className="text-sm text-gray-500 font-medium truncate max-w-[80%]">
              {photoFile ? photoFile.name : "Select raw asset image file..."}
            </span>
            <span className="text-nazrul-terracotta font-black text-xs uppercase tracking-widest shrink-0">
              Browse
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isRegistering}
          className="w-full mt-6 py-4 bg-nazrul-terracotta text-white rounded-2xl font-black uppercase tracking-widest hover:bg-nazrul-crimson disabled:opacity-50 transition-colors duration-300 shadow-xl shadow-nazrul-terracotta/10 active:scale-[0.99]"
        >
          {isRegistering ? "Creating Account..." : "Register"}
        </button>
      </div>

      <p className="text-center text-sm mt-8 text-gray-500 font-medium">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-nazrul-terracotta font-bold hover:underline"
        >
          Login here
        </Link>
      </p>
    </form>
  );
}
