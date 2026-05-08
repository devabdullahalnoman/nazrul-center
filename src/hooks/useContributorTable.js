"use client";
import { useState, useMemo } from "react";

export function useContributorTable(contributors, itemsPerPage = 5) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContributor, setSelectedContributor] = useState(null);

  const filtered = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return (contributors || []).filter(
      (c) =>
        c.full_name?.toLowerCase().includes(query) ||
        c.email?.toLowerCase().includes(query),
    );
  }, [contributors, searchQuery]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginatedData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return {
    paginatedData,
    searchQuery,
    setSearchQuery: (val) => {
      setSearchQuery(val);
      setCurrentPage(1);
    },
    currentPage,
    setCurrentPage,
    totalPages,
    selectedContributor,
    setSelectedContributor,
  };
}
