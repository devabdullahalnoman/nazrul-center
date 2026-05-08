import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const PLAYLIST_ID = "PLn37PtBgFR0GxX69MHXa015DOqYEz9U4H";

export const getPlaylistSongs = async () => {
  try {
    // 1. Fetch Playlist Items (IDs and Titles)
    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=6&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;
    const playlistRes = await axios.get(playlistUrl);

    const items = playlistRes.data.items;
    const videoIds = items.map((item) => item.contentDetails.videoId).join(",");

    // 2. Fetch Video Details (Specific Durations)
    const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${API_KEY}`;
    const videoRes = await axios.get(videoUrl);
    const videoDetails = videoRes.data.items;

    // 3. Map everything together
    return items.map((item) => {
      const vId = item.contentDetails.videoId;
      const details = videoDetails.find((v) => v.id === vId);

      // Parse ISO 8601 Duration
      let duration = "0:00";
      if (details?.contentDetails?.duration) {
        const iso = details.contentDetails.duration;
        const matches = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        const hours = matches[1] ? parseInt(matches[1]) : 0;
        const mins = matches[2] ? parseInt(matches[2]) : 0;
        const secs = matches[3] ? parseInt(matches[3]) : 0;

        if (hours > 0) {
          duration = `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
        } else {
          duration = `${mins}:${secs.toString().padStart(2, "0")}`;
        }
      }

      return {
        id: item.id,
        title: item.snippet.title,
        channelName:
          item.snippet.videoOwnerChannelTitle || item.snippet.channelTitle,
        youtubeId: vId,
        duration: duration,
      };
    });
  } catch (error) {
    console.error("YouTube API Error:", error);
    return [];
  }
};
