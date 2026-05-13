import { createProxyClient } from "@/lib/supabase/proxy";

/**
 * Nazrul Center Shop API
 * Handles data fetching, normalization, and category mapping.
 */
export const shopApi = {
  /**
   * Fetches all products for the main shop grid.
   */
  async getProducts() {
    const supabase = await createProxyClient();

    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      throw error;
    }

    return data.map((item) => this._normalizeProduct(item));
  },

  /**
   * Fetches a single product for the detail page.
   * Uses the standard ID from the database.
   */
  async getProductById(id) {
    const supabase = await createProxyClient();

    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }

    return this._normalizeProduct(data);
  },

  /**
   * Internal helper to normalize database fields to match the UI requirements.
   * Handles the 5 categories: Souvenirs, Physical books, Apparels, Portraits, Others.
   */
  _normalizeProduct(item) {
    // 1. Normalize Categories
    let mappedCategory = "Others";
    const dbType = (item.item_type || "").toLowerCase();

    if (dbType.includes("book")) {
      mappedCategory = "Physical books";
    } else if (dbType.includes("souvenir")) {
      mappedCategory = "Souvenirs";
    } else if (dbType.includes("apparel") || dbType.includes("clothing")) {
      mappedCategory = "Apparels";
    } else if (dbType.includes("portrait") || dbType.includes("photo")) {
      mappedCategory = "Portraits";
    }

    // 2. Return the structured object matching your exact screenshots
    return {
      id: item.id,
      name: item.item_name,
      price: item.price,
      // Logic for sale badge and strikethrough price
      previousPrice: item.previous_price || null,
      isSale: item.is_sale || false,
      // Dual description logic
      shortDescription:
        item.short_description ||
        "A rare artifact from the Nazrul Archive collection.",
      longDescription:
        item.description ||
        "No extended historical context available for this item.",
      category: mappedCategory,
      tag: item.is_featured ? "Featured" : null,
      image: item.image_url || "/placeholder.jpg",
      stock: item.stock_quantity || 0,
    };
  },
};
