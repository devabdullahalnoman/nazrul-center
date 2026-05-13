import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const publicationsApi = {
  // Internal helper for image storage
  async _uploadImage(file) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}-${Date.now()}.${fileExt}`;
    const filePath = `publications/${fileName}`;

    const { data, error } = await supabase.storage
      .from("publications-cover")
      .upload(filePath, file);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("publications-cover").getPublicUrl(filePath);

    return publicUrl;
  },

  async fetchPublications() {
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  // Master Save Function (Handles Upload + Add/Update)
  async savePublication(itemData, file = null) {
    let finalCoverUrl = itemData.cover_url;

    if (file) {
      finalCoverUrl = await this._uploadImage(file);
    }

    const payload = {
      title: itemData.title,
      author: itemData.author,
      category: itemData.category,
      year: itemData.year,
      description: itemData.description,
      cover_url: finalCoverUrl,
      is_featured: itemData.is_featured || false,
    };

    if (itemData.id) {
      const { data, error } = await supabase
        .from("publications")
        .update(payload)
        .eq("id", itemData.id)
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const { data, error } = await supabase
        .from("publications")
        .insert([payload])
        .select();
      if (error) throw error;
      return data[0];
    }
  },

  async deletePublication(id) {
    const { error } = await supabase.from("publications").delete().eq("id", id);
    if (error) throw error;
    return true;
  },
};
