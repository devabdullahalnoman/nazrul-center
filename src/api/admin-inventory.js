import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export const adminInventoryApi = {
  // Create
  async addItem(formData) {
    const { data, error } = await supabase
      .from("inventory")
      .insert([formData])
      .select();
    if (error) throw error;
    return data;
  },

  // Update
  async updateItem(id, updates) {
    const { id: _, created_at: __, ...cleanUpdates } = updates;
    const { data, error } = await supabase
      .from("inventory")
      .update(cleanUpdates)
      .eq("id", id)
      .select();
    if (error) throw error;
    return data;
  },

  // Delete
  async deleteItem(id) {
    const { error } = await supabase.from("inventory").delete().eq("id", id);
    if (error) throw error;
    return true;
  },
};
