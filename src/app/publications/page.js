"use client";
import { useState, useMemo } from "react";
import { usePublications } from "@/hooks/usePublications";
import PublicationCard from "@/components/publications/PublicationCard";
import CategoryButton from "@/components/ui/CategoryButton";
import { Pagination } from "@/components/ui/Pagination"; // Fixed: Added curly braces for named export

export default function PublicationsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8; // Adjust this number based on your preference

  // Fetching data using our TanStack Hook
  const { data: publications = [], isLoading, isError } = usePublications();

  // Filter the data coming from Supabase
  const filteredWorks = useMemo(() => {
    return activeTab === "All"
      ? publications
      : publications.filter((item) => item.category === activeTab);
  }, [activeTab, publications]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredWorks.length / ITEMS_PER_PAGE);
  const paginatedWorks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredWorks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredWorks, currentPage]);

  const handleCategoryChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-error">
        Error loading archive. Please check your connection.
      </div>
    );

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-nazrul-honeycomb py-16 px-4">
        <div className="container mx-auto max-w-7xl text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-nazrul-maroon mb-4">Publications</h1>
          <p className="text-2xl text-nazrul-olive font-semibold tracking-wide">
            Explore the literary works and academic research.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Interactive Category Buttons */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {["All", "Books by Nazrul", "Books on Nazrul", "Research"].map(
            (tab) => (
              <CategoryButton
                key={tab}
                label={tab}
                isActive={activeTab === tab}
                onClick={() => handleCategoryChange(tab)}
              />
            ),
          )}
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {paginatedWorks.length > 0 ? (
            paginatedWorks.map((work) => (
              <PublicationCard key={work.id} work={work} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-400">
              No publications found in this category.
            </div>
          )}
        </div>

        {/* Pagination Integration */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />
          </div>
        )}
      </div>
    </div>
  );
}