import axios from "axios";

export const getPlaylistSongs = async () => {
  try {
    const { data } = await axios.get("/api/media/youtube");
    return data;
  } catch (error) {
    console.error("Error fetching media assets from API layer:", error);
    // Rethrow or reject so monitoring utilities can trace checkout or media fetch anomalies
    throw new Error(
      error?.response?.data?.error || "Media catalog unreachable.",
    );
  }
};
