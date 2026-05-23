import { createClient } from "@/lib/supabase/client";

export const settingsApi = {
  /**
   * Updates shipping rates directly via the Thick Client.
   * Supabase RLS guarantees ONLY 'admin' can execute this successfully.
   */
  async updateShippingRates(insideDhaka, outsideDhaka) {
    const supabase = createClient();

    // 1. Update Inside Dhaka
    const { error: insideError } = await supabase
      .from("system_settings")
      .update({ value: insideDhaka, updated_at: new Date().toISOString() })
      .eq("key", "shipping_inside_dhaka");

    if (insideError) throw new Error("Failed to update Inside Dhaka rate.");

    // 2. Update Outside Dhaka
    const { error: outsideError } = await supabase
      .from("system_settings")
      .update({ value: outsideDhaka, updated_at: new Date().toISOString() })
      .eq("key", "shipping_outside_dhaka");

    if (outsideError) throw new Error("Failed to update Outside Dhaka rate.");

    return { success: true };
  },

  /**
   * Fetches current shipping rates for the UI
   */
  async getShippingRates() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("system_settings")
      .select("key, value")
      .in("key", ["shipping_inside_dhaka", "shipping_outside_dhaka"]);

    if (error) throw error;
    return data;
  },
};
