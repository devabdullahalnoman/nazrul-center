import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export const usersApi = {
  async fetchUsers() {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, email, phone, role, avatar_url, address, created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error("Fetch Error:", err.message);
      throw err;
    }
  },

  async updateUserRole(userId, newRole) {
    const { data, error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId)
      .select();
    if (error) throw error;
    return data[0];
  },
};
