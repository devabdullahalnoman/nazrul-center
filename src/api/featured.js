// import axios from "axios";

// const api = axios.create({
//   baseURL: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1`,
//   headers: {
//     apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//     Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
//   },
// });

// /**
//  * Fetches only publications marked as featured
//  * Based on the 'publications' table structure
//  */
// // src/api/featured.js
// export const getFeaturedBooksData = async () => {
//   try {
//     const { data, error } = await api.get("/publications", {
//       params: {
//         is_featured: "is.true", // Use 'is.true' for boolean columns in PostgREST
//         select: "*",
//       },
//     });
//     if (error) throw error;
//     return data;
//   } catch (err) {
//     console.error("API Fetch Error:", err);
//     return [];
//   }
// };

import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1`,
  headers: {
    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
  },
});

export const getFeaturedBooksData = async () => {
  try {
    const { data } = await api.get("/publications", {
      params: {
        is_featured: "eq.true", // Supabase usually handles 'true' as boolean automatically
        select: "id, title, category, cover_url, year",
      },
    });
    return data;
  } catch (error) {
    console.error("Featured Fetch Error:", error);
    throw error;
  }
};
