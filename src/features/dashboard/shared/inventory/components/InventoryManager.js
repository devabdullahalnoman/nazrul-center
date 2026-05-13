"use client";
import { useState } from "react";
import { useInventory } from "../../hooks/useInventory";
import { inventoryApi } from "../../api/inventory.api";
import { InventoryTable } from "./InventoryTable";
import { InventoryModal } from "./InventoryModal";
import { DashboardFilter } from "../../components/DashboardFilter";
import { DashboardSearch } from "../../components/DashboardSearch";
import { DashboardPagination } from "@/features/dashboard/shared/components/DashboardPagination";

export function InventoryManager() {
  const {
    items,
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
  } = useInventory();

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("ADD");

  const filterOptions = [
    { label: "All", value: "All" },
    { label: "Books", value: "Physical Book" },
    { label: "Souvenirs", value: "Souvenirs" },
    { label: "Portraits", value: "Portrait" },
  ];

  const handleAction = async (e) => {
    e.preventDefault();
    if (modalMode === "ADD") await inventoryApi.addItem(selectedItem);
    else await inventoryApi.updateItem(selectedItem.id, selectedItem);
    refresh();
    setIsModalOpen(false);
  };

  if (loading)
    return (
      <div className="p-20 font-serif italic text-nazrul-terracotta">
        Syncing...
      </div>
    );

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end pb-8 border-b border-gray-100">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 uppercase">
            Inventory
          </h1>
          <p className="text-nazrul-terracotta italic font-medium">
            Boutique & Souvenir Oversight
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedItem({
              item_name: "",
              item_type: "Physical Book",
              price: 0,
              stock_quantity: 0,
            });
            setModalMode("ADD");
            setIsModalOpen(true);
          }}
          className="bg-nazrul-terracotta text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl"
        >
          + Add New Item
        </button>
      </header>

      <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
        <DashboardFilter
          options={filterOptions}
          activeFilter={categoryFilter}
          onFilterChange={setCategoryFilter}
        />
        <DashboardSearch value={searchQuery} onChange={setSearchQuery} />
      </div>

      <InventoryTable
        items={items}
        onManage={(item) => {
          setSelectedItem(item);
          setModalMode("EDIT");
          setIsModalOpen(true);
        }}
      />

      <DashboardPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalCount}
        onPageChange={setCurrentPage}
      />

      <InventoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        onSave={handleAction}
        mode={modalMode}
        refresh={refresh}
      />
    </div>
  );
}
