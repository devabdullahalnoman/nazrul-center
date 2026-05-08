import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export const adminUsersApi = {
  // Fetch all profiles from the database
  async getAllUsers() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("full_name", { ascending: true });
    if (error) throw error;
    return data || [];
  },

  // Securely update a user's role
  async updateUserRole(userId, newRole) {
    const { data, error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId)
      .select();
    if (error) throw error;
    return data;
  },
};
