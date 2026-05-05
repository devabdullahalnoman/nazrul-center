"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/lib/supabase/auth-service";

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState(user?.full_name || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.updateProfile({ full_name: name });
      await refreshUser();
      alert("Profile Updated Successfully!");
    } catch (err) {
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-black uppercase italic tracking-tighter mb-8 underline">
        Account Settings
      </h1>

      <form
        onSubmit={handleUpdate}
        className="bg-white border-2 border-black p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6"
      >
        <div>
          <label className="text-[10px] font-black uppercase text-gray-400">
            Full Name
          </label>
          <input
            className="w-full p-4 border-2 border-black rounded-xl mt-1 font-bold"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-[10px] font-black uppercase text-gray-400">
            Email (Cannot Change)
          </label>
          <input
            className="w-full p-4 border-2 border-black rounded-xl mt-1 font-bold bg-gray-50 opacity-50"
            value={user?.email}
            disabled
          />
        </div>

        <button
          disabled={loading}
          className="w-full py-4 bg-black text-white font-black uppercase rounded-xl hover:bg-[#946659] transition-colors"
        >
          {loading ? "SAVING..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
