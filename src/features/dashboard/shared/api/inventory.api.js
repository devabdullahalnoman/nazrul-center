import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const inventoryApi = {
  /**
   * Internal Private Helper: Handles physical file uploads to Supabase Storage
   * @param {File} file - The raw file object from the input
   */
  async _uploadImage(file) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}-${Date.now()}.${fileExt}`;
    const filePath = `inventory/${fileName}`;

    // Upload the file to the 'shop-assets' bucket
    const { data, error } = await supabase.storage
      .from("shop-assets")
      .upload(filePath, file);

    if (error) throw error;

    // Retrieve the public URL for the database
    const {
      data: { publicUrl },
    } = supabase.storage.from("shop-assets").getPublicUrl(filePath);

    return publicUrl;
  },

  /**
   * Unified Fetch: Gets all items
   */
  async fetchInventory() {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  /**
   * Master Save Function: Handles both ADD and UPDATE logic
   * This is the function called by your Modal's handleFormSubmit.
   * @param {Object} itemData - The selectedItem state
   * @param {File|null} file - The physical file to upload (tempFile)
   */
  async saveProduct(itemData, file = null) {
    let finalImageUrl = itemData.image_url;

    // 1. If a new file is provided, upload it and get the new URL
    if (file) {
      finalImageUrl = await this._uploadImage(file);
    }

    // 2. Format the payload for Supabase
    const payload = {
      item_name: itemData.item_name,
      item_type: itemData.item_type,
      price: parseFloat(itemData.price),
      previous_price: itemData.previous_price
        ? parseFloat(itemData.previous_price)
        : null,
      stock_quantity: parseInt(itemData.stock_quantity),
      description: itemData.description,
      short_description: itemData.short_description,
      image_url: finalImageUrl,
      is_sale: itemData.is_sale || false,
      is_featured: itemData.is_featured || false,
    };

    // 3. Update if ID exists, otherwise Insert
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
    const { error } = await supabase.from("inventory").delete().eq("id", id);
    if (error) throw error;
    return true;
  },
};
