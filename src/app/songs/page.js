"use client";
import { useState } from "react";
import { songsData } from "@/components/songs/songData";
import SongRow from "@/components/songs/SongRow";

export default function SongsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const categories = [
    "All",
    "Revolutionary",
    "Ghazal",
    "Islamic",
    "Devotional",
    "Romantic",
    "Nature",
  ];

  const filteredSongs =
    activeTab === "All"
      ? songsData
      : songsData.filter((song) => song.category === activeTab);

  return (
    <div className="bg-base-100 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-neutral text-neutral-content py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Nazrul Geeti Archive
          </h1>
          <p className="text-xl text-primary font-medium tracking-wide">
            A spiritual and revolutionary journey through music
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Genre Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`btn btn-sm md:btn-md rounded-full px-6 ${
                activeTab === cat ? "btn-primary" : "btn-outline btn-neutral"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Songs List Wrapper */}
        <div className="bg-base-100 rounded-2xl shadow-xl border border-base-200 overflow-hidden">
          <div className="bg-base-300 px-6 py-3 hidden md:flex font-bold text-sm uppercase tracking-wider text-gray-600">
            <span className="flex-1">Song Title & Details</span>
            <span className="w-40 text-right">Actions</span>
          </div>

          <div className="divide-y divide-base-200">
            {filteredSongs.length > 0 ? (
              filteredSongs.map((song) => <SongRow key={song.id} song={song} />)
            ) : (
              <div className="p-20 text-center text-gray-400">
                No songs found in this genre.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
