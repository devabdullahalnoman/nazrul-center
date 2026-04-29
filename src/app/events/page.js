"use client";
import { useState } from "react";
import { eventsData } from "@/components/events/eventsData";
import EventCard from "@/components/events/EventCard";

export default function EventsPage() {
  // 1. Updated state to include "All"
  const [activeTab, setActiveTab] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Seminars & Conferences",
    "Cultural Programs",
    "Workshops",
  ];

  // 2. Updated Filtering Logic
  const filteredEvents = eventsData.filter((event) => {
    // If tab is "All", ignore status check; otherwise match status
    const statusMatch = activeTab === "All" || event.status === activeTab;

    // Category check
    const categoryMatch =
      activeCategory === "All" || event.category === activeCategory;

    return statusMatch && categoryMatch;
  });

  return (
    <div className="bg-base-100 min-h-screen pb-20">
      <div className="bg-neutral text-neutral-content py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Events</h1>
          <p className="text-xl text-primary font-medium tracking-wide">
            The complete archive of Nazrul-related gatherings.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Timing Toggle with "All" option */}
        <div className="flex justify-center mb-10">
          <div className="tabs tabs-boxed bg-base-200 p-1">
            {["All", "Upcoming", "Past"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab tab-lg px-8 md:px-12 transition-all ${
                  activeTab === tab
                    ? "tab-active bg-primary! text-primary-content! font-bold"
                    : ""
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn btn-sm rounded-full px-6 transition-all ${
                activeCategory === cat
                  ? "btn-neutral"
                  : "btn-outline btn-neutral opacity-60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="col-span-full py-32 text-center bg-base-200 rounded-3xl border-2 border-dashed border-base-300">
              <p className="text-gray-400 italic text-xl">
                No events found matching your current selection.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
