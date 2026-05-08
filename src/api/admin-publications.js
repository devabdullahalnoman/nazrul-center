import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export const adminPublicationsApi = {
  // CREATE
  async addPublication(formData) {
    const { data, error } = await supabase
      .from("publications")
      .insert([formData])
      .select();
    if (error) throw error;
    return data;
  },

  // UPDATE
  async updatePublication(id, updates) {
    // Remove primary key and metadata to prevent DB errors during update
    const { id: _, created_at: __, ...cleanUpdates } = updates;
    const { data, error } = await supabase
      .from("publications")
      .update(cleanUpdates)
      .eq("id", id)
      .select();
    if (error) throw error;
    return data;
  },

  // DELETE
  async deletePublication(id) {
    const { error } = await supabase.from("publications").delete().eq("id", id);
    if (error) throw error;
    return true;
  },
};
