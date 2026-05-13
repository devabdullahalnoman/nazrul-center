"use client";
import { useState } from "react";
import { usePublications } from "../../hooks/usePublications";
import { PublicationTable } from "./PublicationTable";
import { PublicationModal } from "./PublicationModal";
import { DashboardFilter } from "../../components/DashboardFilter";
import { DashboardSearch } from "../../components/DashboardSearch";
import { DashboardPagination } from "@/features/dashboard/shared/components/DashboardPagination";

export function PublicationManager() {
  const {
    pubs,
    loading,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    totalCount,
    refresh,
  } = usePublications();

  const [selected, setSelected] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("ADD");

  const filterOptions = [
    { label: "All Works", value: "All" },
    { label: "Books on Nazrul", value: "Books on Nazrul" },
    { label: "Books by Nazrul", value: "Books by Nazrul" },
    {
      label: "Documents & Research Papers",
      value: "Documents & Research Papers",
    },
  ];

  if (loading)
    return (
      <div className="p-20 text-center font-serif italic text-nazrul-terracotta animate-pulse text-xl">
        Opening the Archive...
      </div>
    );

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end pb-8 border-b border-nazrul-sand">
        <div>
          <h1 className="text-5xl font-serif font-bold text-nazrul-ink tracking-tight uppercase">
            Publications
          </h1>
          <p className="text-nazrul-terracotta font-medium italic mt-2 text-lg">
            Literary Records & Scholarly Management
          </p>
        </div>
        <button
          onClick={() => {
            setSelected({ category: "Books on Nazrul", is_featured: false });
            setMode("ADD");
            setModalOpen(true);
          }}
          className="bg-nazrul-ink text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl hover:bg-nazrul-terracotta transition-all"
        >
          + Add New Entry
        </button>
      </header>

      <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
        <DashboardFilter
          options={filterOptions}
          activeFilter={categoryFilter}
          onFilterChange={(val) => {
            setCategoryFilter(val);
            setCurrentPage(1);
          }}
        />
        <DashboardSearch
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by title or author..."
        />
      </div>

      <PublicationTable
        items={pubs}
        onManage={(p) => {
          setSelected(p);
          setMode("EDIT");
          setModalOpen(true);
        }}
      />

      <DashboardPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalCount}
        onPageChange={setCurrentPage}
      />

      <PublicationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        item={selected}
        setItem={setSelected}
        mode={mode}
        refresh={refresh}
      />
    </div>
  );
}
