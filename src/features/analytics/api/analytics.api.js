import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const analyticsApi = {
  /**
   * Fires the atomic background visit mutation.
   */
  async registerVisit() {
    const { error } = await supabase.rpc("increment_site_visits");
    if (error) {
      console.error("Database analytics write rejected:", error.message);
      throw error;
    }
  },

  /**
   * Safe array-fallback selection query to completely dodge JSON coercion failures.
   */
  async getVisitCount() {
    const { data, error } = await supabase
      .from("site_analytics")
      .select("metric_value")
      .eq("metric_key", "total_historical_visits");

    if (error) {
      console.error("Database analytics read rejected:", error.message);
      throw error;
    }

    // Read index 0 safely instead of demanding .single() coercion
    if (data && data.length > 0) {
      return Number(data[0].metric_value);
    }

    return 0;
  }
};