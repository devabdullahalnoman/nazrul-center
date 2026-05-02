"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const supabase = createClient();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    if (error) alert(error.message);
    else alert("Success! Please verify your email.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <form
        onSubmit={handleSignUp}
        className="card w-96 bg-base-100 shadow-xl p-8 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Join Nazrul Center</h2>
        <input
          className="input input-bordered"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="input input-bordered"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input input-bordered"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-full">Sign Up</button>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="link text-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
