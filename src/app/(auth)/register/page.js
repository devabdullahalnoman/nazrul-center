// "use client";
// import { useState } from "react";
// import { createClient } from "@/lib/supabase/client";
// import Link from "next/link";

// export default function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const supabase = createClient();

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     const { error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: { data: { full_name: name } },
//     });
//     if (error) alert(error.message);
//     else alert("Success! Please verify your email.");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
//       <form
//         onSubmit={handleSignUp}
//         className="card w-96 bg-base-100 shadow-xl p-8 space-y-4"
//       >
//         <h2 className="text-2xl font-bold text-center">Join Nazrul Center</h2>
//         <input
//           className="input input-bordered"
//           placeholder="Full Name"
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           className="input input-bordered"
//           type="email"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           className="input input-bordered"
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button className="btn btn-primary w-full">Sign Up</button>
//         <p className="text-center text-sm">
//           Already have an account?{" "}
//           <Link href="/login" className="link text-primary">
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { authService } from "@/lib/supabase/auth-service";

export default function RegisterPage() {
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await authService.register(form.email, form.password, form.name);
      alert("Registration successful! Check your email.");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleRegister}
        className="card w-96 bg-white shadow-xl p-8 space-y-4"
      >
        <h2 className="text-2xl font-bold">Create Account</h2>
        <input
          placeholder="Full Name"
          className="input input-bordered w-full"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          className="btn w-full text-white border-none"
          style={{ backgroundColor: "#946659" }}
        >
          Register
        </button>
      </form>
    </div>
  );
}
