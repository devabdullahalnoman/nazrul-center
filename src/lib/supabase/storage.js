import { createClient } from "./client";

const supabase = createClient();

/**
 * Reusable Supabase Storage Uploader
 * Handles safe unique pathing, file format verification, and returns public URLs.
 * * @param {File} file - The raw client-side File object from a form input
 * @param {string} bucket - The targeted Supabase Storage Bucket (e.g., 'shop-assets', 'avatars')
 * @param {string} folder - Optional subfolder target inside the bucket (e.g., 'inventory')
 * @returns {Promise<string>} Fully formatted public URL of the uploaded asset
 */
export async function uploadImage(file, bucket, folder = "") {
  if (!file || !file.name) {
    throw new Error("No valid file reference provided for storage upload.");
  }

  // 1. Enforce strict file extension whitelisting to block malicious executable scripts
  const fileExt = file.name.split(".").pop().toLowerCase();
  const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
  if (!allowedExtensions.includes(fileExt)) {
    throw new Error(
      `Unauthorized file format. Allowed types: ${allowedExtensions.join(", ")}`,
    );
  }

  // 2. Generate a collision-resistant safe path name
  const safeRandom = Math.random().toString(36).substring(2, 15);
  const fileName = `${safeRandom}-${Date.now()}.${fileExt}`;
  const filePath = folder ? `${folder}/${fileName}` : fileName;

  // 3. Upload file asset with 1-hour browser cache configuration
  const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw error;

  // 4. Extract and resolve the public URL for database storage
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return publicUrl;
}
