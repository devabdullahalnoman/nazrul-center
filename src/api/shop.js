import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export const shopApi = {
  async fetchProducts() {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },
};
