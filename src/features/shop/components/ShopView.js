"use client";
import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import CategoryButton from "@/components/ui/CategoryButton";
import SearchBox from "@/components/ui/SearchBox";
import { Pagination } from "@/components/ui/Pagination";

export default function ShopView({ initialProducts }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 8;
  const categories = [
    "All",
    "Souvenirs",
    "Physical books",
    "Apparels",
    "Portraits",
    "Others",
  ];

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((p) => {
      const matchesCategory =
        activeFilter === "All" || p.category === activeFilter;
      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery, initialProducts]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="mb-12">
        <SearchBox
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search for rare books, portraits, or souvenirs..."
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-20">
        {categories.map((cat) => (
          <CategoryButton
            key={cat}
            label={cat}
            isActive={activeFilter === cat}
            onClick={() => {
              setActiveFilter(cat);
              setCurrentPage(1);
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center border-t border-nazrul-sand/20 pt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
