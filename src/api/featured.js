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
        is_featured: "eq.true",
        select: "id, title, category, cover_url, year",
      },
    });
    return data;
  } catch (error) {
    console.error("Featured Fetch Error:", error);
    throw error;
  }
};
