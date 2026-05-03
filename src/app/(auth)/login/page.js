// "use client";
// import { useState } from "react";
// import { createClient } from "@/lib/supabase/client";
// import { useRouter } from "next/navigation";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();
//   const supabase = createClient();

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });
//     if (error) alert(error.message);
//     else {
//       router.push("/dashboard");
//       router.refresh();
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
//       <form
//         onSubmit={handleSignIn}
//         className="card w-96 bg-base-100 shadow-xl p-8 space-y-4"
//       >
//         <h2 className="text-2xl font-bold text-center">Login</h2>
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
//         <button className="btn btn-primary w-full">Sign In</button>
//       </form>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { authService } from "@/lib/supabase/auth-service";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login(email, password);
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="card w-96 bg-white shadow-xl p-8 space-y-4"
      >
        <h2 className="text-2xl font-bold">Welcome Back</h2>
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn w-full text-white border-none"
          style={{ backgroundColor: "#946659" }}
        >
          Log In
        </button>
      </form>
    </div>
  );
}
