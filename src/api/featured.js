import axios from "axios";

export const getFeaturedBooksData = async () => {
  const { data } = await axios.get("/api/archive/publications?featured=true");
  return data;
};
