import axios from "axios";

export const getPublications = async () => {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/publications?select=*`;

  const response = await axios.get(url, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    },
  });
  return response.data;
};
