"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlaylistSongs } from "@/api/youtube";
import SongCard from "../popularSongs/SongCard";

export default function PopularSongs() {
  const {
    data: songs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popular-songs"],
    queryFn: getPlaylistSongs,
    staleTime: 1000 * 60 * 60,
  });

  if (isLoading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-gray-400 font-medium">
          Fetching YouTube Playlist...
        </p>
      </div>
    );
  }

  if (isError) return null;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-black text-nazrul-terracotta tracking-tight">
              Popular Songs
            </h2>
            <div className="h-1.5 w-16 bg-nazrul-crimson mt-3 rounded-full"></div>
          </div>
          <button
            className="uppercase tracking-[0.2em] transition-all hover:cursor-pointer w-full rounded-4xl border-2 border-nazrul-terracotta hover:border-nazrul-crimson text-nazrul-terracotta font-bold hover:bg-nazrul-crimson hover:text-white max-w-80"
            onClick={() =>
              window.open(
                `https://www.youtube.com/playlist?list=PLn37PtBgFR0GxX69MHXa015DOqYEz9U4H`,
                "_blank",
              )
            }
          >
            View Official Playlist
          </button>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {songs?.slice(0, 6).map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </div>
    </section>
  );
}
