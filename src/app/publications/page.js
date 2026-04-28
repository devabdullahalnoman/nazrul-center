"use client"; // Required for interactivity (tabs and filtering)
import { useState } from "react";
import Image from "next/image";

export default function PublicationsPage() {
  // 1. The state to track which category is active
  const [activeTab, setActiveTab] = useState("All");

  // 2. Your actual data (this is where you'll eventually put all the books)
  const publications = [
    {
      id: 1,
      title: "Agnibeena",
      category: "Books by Nazrul",
      type: "Poetry",
      year: "1922",
    },
    {
      id: 2,
      title: "Sanchita",
      category: "Books by Nazrul",
      type: "Poetry",
      year: "1925",
    },
    {
      id: 3,
      title: "Nazrul: A Life",
      category: "Books on Nazrul",
      type: "Biography",
      year: "2010",
    },
    {
      id: 4,
      title: "Rebel Poet's Legacy",
      category: "Research",
      type: "Journal",
      year: "2021",
    },
    {
      id: 5,
      title: "Bishar Banshi",
      category: "Books by Nazrul",
      type: "Poetry",
      year: "1924",
    },
    {
      id: 6,
      title: "The Mind of a Rebel",
      category: "Books on Nazrul",
      type: "Analysis",
      year: "2015",
    },
    {
      id: 7,
      title: "Dhaka University Journal",
      category: "Research",
      type: "Academic",
      year: "2019",
    },
    {
      id: 8,
      title: "Dolon Chapa",
      category: "Books by Nazrul",
      type: "Poetry",
      year: "1923",
    },
  ];

  // 3. Logic to filter the books based on the activeTab
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
                onClick={() => setActiveTab(tab)} // This updates the state
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

        {/* PUBLICATIONS GRID - Now dynamic! */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredWorks.length > 0 ? (
            filteredWorks.map((work) => (
              <div
                key={work.id}
                className="card bg-base-100 shadow-sm hover:shadow-xl transition-all border border-base-200"
              >
                <figure className="px-4 pt-4">
                  <div className="aspect-[3/4] w-full bg-neutral-100 rounded-xl flex items-center justify-center text-gray-400 italic">
                    {/* Cover Placeholder */}
                    Cover Image
                  </div>
                </figure>
                <div className="card-body items-center text-center p-6">
                  <div className="badge badge-outline badge-sm mb-2 opacity-70">
                    {work.type}
                  </div>
                  <h2 className="card-title text-lg font-bold">{work.title}</h2>
                  <p className="text-sm text-gray-500">Year: {work.year}</p>
                  <div className="card-actions mt-4 w-full">
                    <button className="btn btn-neutral btn-block btn-sm">
                      Read Details
                    </button>
                  </div>
                </div>
              </div>
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
