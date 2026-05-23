import axios from "axios";

export const getPublications = async () => {
  const { data } = await axios.get("/api/archive/publications");
  return data;
};
