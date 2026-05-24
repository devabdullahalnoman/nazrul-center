import { createClient } from "@/lib/supabase/client";
import { uploadImage } from "@/lib/supabase/storage";
import { sanitizeHtml } from "@/lib/validation/sanitize";
import { InputEngine } from "@/lib/validation/inputEngine";

const supabase = createClient();

export const inventoryApi = {
  /**
   * Unified Fetch: Gets all items
   */
  async fetchInventory() {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  },

  /**
   * Master Save Function: Handles both ADD and UPDATE logic
   * Hardened with exact database formatting, types check, and absolute bounds bounds checks.
   * @param {Object} itemData - The selectedItem state
   * @param {File|null} file - The physical file to upload (tempFile)
   */
  async saveProduct(itemData, file = null) {
    if (!itemData) {
      throw new Error("Product payload data is required.");
    }

    let finalImageUrl = itemData.image_url;

    // 1. If a new file is provided, leverage the centralized storage engine
    if (file) {
      finalImageUrl = await uploadImage(file, "shop-assets", "inventory");
    }

    // 2. Parse and validate numeric inputs thoroughly
    const parsedPrice = parseFloat(itemData.price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      throw new Error(
        "Validation failure: Price must be a non-negative number.",
      );
    }

    let parsedPreviousPrice = null;
    if (
      itemData.previous_price !== undefined &&
      itemData.previous_price !== null &&
      itemData.previous_price !== ""
    ) {
      parsedPreviousPrice = parseFloat(itemData.previous_price);
      if (isNaN(parsedPreviousPrice) || parsedPreviousPrice < 0) {
        throw new Error(
          "Validation failure: Previous price must be a non-negative number.",
        );
      }
    }

    const parsedStock = parseInt(itemData.stock_quantity, 10);
    if (isNaN(parsedStock) || parsedStock < 0) {
      throw new Error(
        "Validation failure: Stock quantity must be an integer greater than or equal to 0.",
      );
    }

    // 3. Format the payload and clean injections via shared lib filters
    const payload = {
      item_name: InputEngine.sanitizeString(
        itemData.item_name || "Untitled Item",
      ),
      item_type: InputEngine.sanitizeString(itemData.item_type || "General"),
      price: parsedPrice,
      previous_price: parsedPreviousPrice,
      stock_quantity: parsedStock,
      description: sanitizeHtml(itemData.description || ""),
      short_description: InputEngine.sanitizeString(
        itemData.short_description || "",
      ),
      image_url: finalImageUrl || null,
      is_sale: Boolean(itemData.is_sale),
      is_featured: Boolean(itemData.is_featured),
    };

    // 4. Update if ID exists, otherwise Insert
    if (itemData.id) {
      const { data, error } = await supabase
        .from("inventory")
        .update(payload)
        .eq("id", itemData.id)
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const { data, error } = await supabase
        .from("inventory")
        .insert([payload])
        .select();
      if (error) throw error;
      return data[0];
    }
  },

  /**
   * Delete Logic
   */
  async deleteItem(id) {
    if (!id)
      throw new Error(
        "Item identifier is required for processing deletion requests.",
      );

    const { error } = await supabase.from("inventory").delete().eq("id", id);

    if (error) throw error;
    return true;
  },
};
