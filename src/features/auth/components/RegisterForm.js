// "use client";
// import { useState, useRef } from "react";
// import { useAuth } from "../hooks/useAuth";
// import Link from "next/link";

// export function RegisterForm() {
//   const { register, isRegistering } = useAuth();
//   const fileInputRef = useRef(null);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     phone: "",
//     address: "",
//   });
//   const [photoFile, setPhotoFile] = useState(null);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     try {
//       await register({ ...formData, photoFile });
//     } catch (error) {
//       setErrorMsg(
//         error.message || "Registration runtime processing exception.",
//       );
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="card w-full max-w-lg bg-white shadow-xl p-8 lg:p-10 border border-gray-100 rounded-4xl mx-auto"
//     >
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
//           Create Account
//         </h2>
//         <p className="text-nazrul-terracotta italic font-medium">
//           Join the Nazrul Center
//         </p>
//       </div>

//       {errorMsg && (
//         <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-2xl text-sm font-medium animate-in fade-in duration-200">
//           {errorMsg}
//         </div>
//       )}

//       <div className="space-y-4">
//         <input
//           type="text"
//           name="fullName"
//           required
//           placeholder="Full Name"
//           value={formData.fullName}
//           className="input w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-nazrul-terracotta transition-all text-gray-900"
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           name="email"
//           required
//           placeholder="Email Address"
//           value={formData.email}
//           className="input w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-nazrul-terracotta transition-all text-gray-900"
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           name="password"
//           required
//           placeholder="Password (Min 6 Characters)"
//           value={formData.password}
//           className="input w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-nazrul-terracotta transition-all text-gray-900"
//           onChange={handleChange}
//         />
//         <input
//           type="tel"
//           name="phone"
//           placeholder="Phone Number"
//           value={formData.phone}
//           className="input w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-nazrul-terracotta transition-all text-gray-900"
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="address"
//           placeholder="Shipping Address"
//           value={formData.address}
//           className="input w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-nazrul-terracotta transition-all text-gray-900"
//           onChange={handleChange}
//         />

//         <div
//           className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-nazrul-maroon transition-colors duration-300 cursor-pointer"
//           onClick={() => fileInputRef.current.click()}
//         >
//           <div className="flex items-center justify-between">
//             <span className="text-sm text-gray-500 font-medium">
//               {photoFile ? photoFile.name : "Upload Profile Photo"}
//             </span>
//             <span className="text-nazrul-terracotta font-bold text-xs uppercase tracking-widest">
//               Browse
//             </span>
//           </div>
//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             ref={fileInputRef}
//             onChange={(e) => setPhotoFile(e.target.files[0])}
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isRegistering}
//           className="w-full mt-6 py-4 bg-nazrul-terracotta text-white rounded-2xl font-black uppercase tracking-widest hover:bg-nazrul-maroon disabled:opacity-50 transition-colors duration-300 shadow-xl shadow-nazrul-terracotta/20"
//         >
//           {isRegistering ? "Creating Account..." : "Register"}
//         </button>
//       </div>

//       <p className="text-center text-sm mt-8 text-gray-500">
//         Already have an account?{" "}
//         <Link
//           href="/login"
//           className="text-nazrul-maroon font-bold hover:underline"
//         >
//           Log In
//         </Link>
//       </p>
//     </form>
//   );
// }

// "use client";
// import { useState, useRef } from "react";
// import { useAuth } from "../hooks/useAuth";
// import Link from "next/link";

// export function RegisterForm() {
//   const { register, isRegistering } = useAuth();
//   const fileInputRef = useRef(null);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     phone: "",
//     address: "",
//   });
//   const [photoFile, setPhotoFile] = useState(null);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     try {
//       await register({ ...formData, photoFile });
//     } catch (error) {
//       setErrorMsg(
//         error.message ||
//           "Registration sequence encountered a validation reject.",
//       );
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="card w-full max-w-lg bg-white shadow-xl p-8 lg:p-10 border border-gray-100 rounded-4xl mx-auto"
//     >
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
//           Create Account
//         </h2>
//         <p className="text-nazrul-terracotta italic font-medium">
//           Join the Nazrul Center
//         </p>
//       </div>

//       {errorMsg && (
//         <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-2xl text-sm font-medium">
//           {errorMsg}
//         </div>
//       )}

//       <div className="space-y-4">
//         <input
//           name="fullName"
//           type="text"
//           required
//           placeholder="Full Name *"
//           className="input w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-nazrul-terracotta transition-all text-gray-900"
//           onChange={handleChange}
//         />
//         <input
//           name="email"
//           type="email"
//           required
//           placeholder="Email Address *"
//           className="input w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-nazrul-terracotta transition-all text-gray-900"
//           onChange={handleChange}
//         />
//         <input
//           name="password"
//           type="password"
//           required
//           placeholder="Password *"
//           className="input w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-nazrul-terracotta transition-all text-gray-900"
//           onChange={handleChange}
//         />

//         <div className="divider text-xs uppercase tracking-widest text-gray-400 font-bold py-2">
//           Optional Details
//         </div>
//         <input
//           name="phone"
//           type="tel"
//           placeholder="Phone Number"
//           className="input w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-nazrul-terracotta transition-all text-gray-900"
//           onChange={handleChange}
//         />
//         <textarea
//           name="address"
//           placeholder="Shipping Address"
//           rows="2"
//           className="textarea w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-nazrul-terracotta transition-all resize-none text-gray-900"
//           onChange={handleChange}
//         ></textarea>

//         <div
//           className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-nazrul-maroon transition-colors duration-300 cursor-pointer"
//           onClick={() => fileInputRef.current.click()}
//         >
//           <div className="flex items-center justify-between">
//             <span className="text-sm text-gray-500 font-medium">
//               {photoFile ? photoFile.name : "Upload Profile Photo"}
//             </span>
//             <span className="text-nazrul-terracotta font-bold text-xs uppercase tracking-widest">
//               Browse
//             </span>
//           </div>
//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             ref={fileInputRef}
//             onChange={(e) => setPhotoFile(e.target.files[0])}
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isRegistering}
//           className="w-full mt-6 py-4 bg-nazrul-terracotta text-white rounded-2xl font-black uppercase tracking-widest hover:bg-nazrul-maroon disabled:opacity-50 transition-colors duration-300 shadow-xl shadow-nazrul-terracotta/20"
//         >
//           {isRegistering ? "Creating Account..." : "Register"}
//         </button>
//       </div>

//       <p className="text-center text-sm mt-8 text-gray-500">
//         Already have an account?{" "}
//         <Link
//           href="/login"
//           className="text-nazrul-maroon font-bold hover:underline"
//         >
//           Log in
//         </Link>
//       </p>
//     </form>
//   );
// }

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
            className="w-full p-4 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none text-sm min-h-[80px] max-h-[150px] focus:border-nazrul-terracotta transition-colors"
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
