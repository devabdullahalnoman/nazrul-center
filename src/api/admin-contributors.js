import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export const adminContributorsApi = {
  async getContributors() {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
        *,
        orders:orders!operator_id(
          id, 
          order_id, 
          total_amount, 
          status, 
          created_at
        )
      `,
      )
      .eq("role", "contributor")
      .order("full_name", { ascending: true });

    if (error) {
      console.error("Contributor Fetch Failure:", error.message);
      return [];
    }
    return data || [];
  },
};
