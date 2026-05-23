"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Creates an isolated server-only connection context for data fetching.
 */
async function getSupabaseServerInstance() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Handled internally during edge routing phases
          }
        },
      },
    },
  );
}

/**
 * Shared server side schema normalizer helper
 */
function _normalizeProduct(item) {
  if (!item) return null;

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

  // CDN IMAGE PREFIX RESOLUTION
  const rawImage = item.image_url || item.image_path || item.image || "";
  let finalImageUrl = rawImage;
  if (rawImage && !rawImage.startsWith("http") && !rawImage.startsWith("/")) {
    finalImageUrl = `https://rhaxakxqjpkjepkhpdnu.supabase.co/storage/v1/object/public/publications-cover/${rawImage}`;
  } else if (!rawImage) {
    finalImageUrl = "/placeholder-product.jpg";
  }

  return {
    id: item.id,
    name: item.item_name || "Unnamed Item",
    price: Number(item.price || 0),
    previousPrice: item.previous_price || null,
    isSale: item.is_sale || false,
    shortDescription:
      item.short_description ||
      "A rare artifact from the Nazrul Archive collection.",
    longDescription:
      item.description ||
      "No extended historical context available for this item.",
    category: mappedCategory,
    tag: item.is_featured ? "Featured" : null,
    image: finalImageUrl,
    stock: Number(item.stock_quantity ?? 0),
  };
}

/**
 * Fetches inventory raw data cleanly using server contexts.
 */
export async function fetchServerProducts() {
  const supabase = await getSupabaseServerInstance();
  const { data, error } = await supabase
    .from("inventory")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data.map((item) => _normalizeProduct(item));
}

/**
 * Fetches individual inventory metrics by tracking UUID id parameters.
 */
export async function fetchServerProductById(id) {
  const supabase = await getSupabaseServerInstance();
  const { data, error } = await supabase
    .from("inventory")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return _normalizeProduct(data);
}
