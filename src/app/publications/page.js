"use client";
import { useState } from "react";
import { publications } from "@/components/publications/publicationsData";
import PublicationCard from "@/components/publications/PublicationCard";

export default function PublicationsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredWorks =
    activeTab === "All"
      ? publications
      : publications.filter((item) => item.category === activeTab);

  return (
    <div className="bg-base-100 min-h-screen pb-20">
      <div className="bg-neutral text-neutral-content py-16 px-4">
        <div className="container mx-auto max-w-7xl text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Publications</h1>
          <p className="text-xl text-primary font-medium">
            Explore the literary works and academic research.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* INTERACTIVE TABS */}
        <div className="tabs tabs-boxed mb-12 bg-base-200 p-2 inline-flex flex-wrap justify-center md:justify-start">
          {["All", "Books by Nazrul", "Books on Nazrul", "Research"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab px-6 md:px-8 transition-all ${
                  activeTab === tab
                    ? "tab-active bg-primary text-primary-content"
                    : ""
                }`}
              >
                {tab}
              </button>
            ),
          )}
        </div>

        {/* PUBLICATIONS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredWorks.length > 0 ? (
            filteredWorks.map((work) => (
              <PublicationCard key={work.id} work={work} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-400">
              No publications found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
