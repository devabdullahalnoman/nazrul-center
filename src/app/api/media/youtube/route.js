// import { NextResponse } from "next/server";
// import axios from "axios";

// export const dynamic = "force-dynamic";

// export async function GET() {
//   try {
//     // 1. Prefix-resilient lookup layer: checks private, then checks public fallback
//     const API_KEY =
//       process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
//     const PLAYLIST_ID = "PLn37PtBgFR0GxX69MHXa015DOqYEz9U4H";

//     // 2. Clearer logging context
//     if (!API_KEY) {
//       console.error(
//         "❌ BACKEND ERROR: YOUTUBE_API_KEY could not be read by the server runtime environment.",
//       );
//       return NextResponse.json(
//         {
//           error:
//             "YouTube integration unconfigured on server backend. Environment key is missing.",
//         },
//         { status: 503 },
//       );
//     }

//     const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=6&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;

//     const playlistRes = await axios.get(playlistUrl, {
//       headers: {
//         Accept: "application/json",
//         "User-Agent": "Next.js Server Proxy",
//       },
//     });

//     const items = playlistRes.data.items || [];
//     if (items.length === 0) {
//       return NextResponse.json([]);
//     }

//     const videoIds = items.map((item) => item.contentDetails.videoId).join(",");
//     const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${API_KEY}`;

//     const videoRes = await axios.get(videoUrl, {
//       headers: {
//         Accept: "application/json",
//         "User-Agent": "Next.js Server Proxy",
//       },
//     });
//     const videoDetails = videoRes.data.items || [];

//     const mappedVideos = items.map((item) => {
//       const vId = item.contentDetails.videoId;
//       const details = videoDetails.find((v) => v.id === vId);

//       let duration = "0:00";
//       if (details?.contentDetails?.duration) {
//         const iso = details.contentDetails.duration;
//         const matches = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
//         const hours = matches[1] ? parseInt(matches[1]) : 0;
//         const mins = matches[2] ? parseInt(matches[2]) : 0;
//         const secs = matches[3] ? parseInt(matches[3]) : 0;
//         duration =
//           hours > 0
//             ? `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
//             : `${mins}:${secs.toString().padStart(2, "0")}`;
//       }

//       return {
//         id: item.id,
//         title: item.snippet.title,
//         channelName:
//           item.snippet.videoOwnerChannelTitle || item.snippet.channelTitle,
//         youtubeId: vId,
//         duration,
//       };
//     });

//     return NextResponse.json(mappedVideos);
//   } catch (error) {
//     console.error(
//       "❌ YouTube Backend Proxy Exception:",
//       error.response?.data || error.message,
//     );
//     return NextResponse.json(
//       {
//         error: "Failed to communicate with downstream YouTube services safely.",
//       },
//       { status: 502 },
//     );
//   }
// }

import { NextResponse } from "next/server";

export const revalidate = 60;

export async function GET() {
  try {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const PLAYLIST_ID = "PLn37PtBgFR0GxX69MHXa015DOqYEz9U4H";
    const systemBaseUrl = process.env.BASE_URL || "http://localhost:3000";

    if (!API_KEY) {
      return NextResponse.json(
        { error: "YouTube server token configuration missing." },
        { status: 503 },
      );
    }

    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=6&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;

    const playlistRes = await fetch(playlistUrl, {
      method: "GET",
      headers: {
        Referer: systemBaseUrl,
        Accept: "application/json",
      },
    });

    if (!playlistRes.ok)
      throw new Error(
        `Downstream catalog connection error: ${playlistRes.status}`,
      );

    const playlistData = await playlistRes.json();
    const items = playlistData.items || [];
    if (items.length === 0) return NextResponse.json([]);

    const videoIds = items.map((item) => item.contentDetails.videoId).join(",");
    const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${API_KEY}`;

    const videoRes = await fetch(videoUrl, {
      method: "GET",
      headers: {
        Referer: systemBaseUrl,
        Accept: "application/json",
      },
    });

    if (!videoRes.ok) throw new Error("Metadata extraction failed.");
    const videoData = await videoRes.json();
    const videoDetails = videoData.items || [];

    const mappedVideos = items.map((item) => {
      const vId = item.contentDetails.videoId;
      const details = videoDetails.find((v) => v.id === vId);

      let duration = "0:00";
      if (details?.contentDetails?.duration) {
        const iso = details.contentDetails.duration;
        const matches = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        const hours = matches[1] ? parseInt(matches[1]) : 0;
        const mins = matches[2] ? parseInt(matches[2]) : 0;
        const secs = matches[3] ? parseInt(matches[3]) : 0;
        duration =
          hours > 0
            ? `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
            : `${mins}:${secs.toString().padStart(2, "0")}`;
      }

      return {
        id: item.id,
        title: item.snippet.title,
        channelName:
          item.snippet.videoOwnerChannelTitle || item.snippet.channelTitle,
        youtubeId: vId,
        duration,
      };
    });

    return NextResponse.json(mappedVideos);
  } catch (error) {
    console.error("YouTube Proxy Error:", error.message);
    return NextResponse.json(
      { error: "Failed to communicate with media services safely." },
      { status: 502 },
    );
  }
}
