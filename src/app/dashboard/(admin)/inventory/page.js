"use client";
import { useState } from "react";
import Image from "next/image";
import { useAdminInventory } from "@/hooks/useAdminInventory";
import { adminInventoryApi } from "@/api/admin-inventory";
import InventoryTable from "@/components/dashboard/admin/InventoryTable";

export default function InventoryPage() {
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
  } = useAdminInventory();

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("ADD");

  const categories = [
    "All",
    "Physical Book",
    "Mugs",
    "T-Shirt",
    "Souvenirs",
    "Portrait",
    "Other",
  ];

  const handleOpenAdd = () => {
    setSelectedItem({
      item_name: "",
      item_type: "Physical Book",
      price: 0,
      stock_quantity: 0,
      description: "",
      image_url: "",
      is_featured: false,
    });
    setModalMode("ADD");
    setIsModalOpen(true);
  };

  const handleAction = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === "ADD") await adminInventoryApi.addItem(selectedItem);
      else await adminInventoryApi.updateItem(selectedItem.id, selectedItem);
      setIsModalOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading)
    return (
      <div className="p-20 font-serif italic text-[#946659]">
        Syncing Warehouse...
      </div>
    );

  return (
    <div className="p-10 space-y-10">
      <header className="flex justify-between items-end pb-8 border-b border-gray-100">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900">
            Inventory Management
          </h1>
          <p className="text-[#946659] italic font-medium">
            Boutique & Souvenir Oversight
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-[#946659] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#946659]/20 transition-transform hover:scale-105"
        >
          + Add New Item
        </button>
      </header>

      {/* FILTER & SEARCH */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${categoryFilter === cat ? "bg-black text-white" : "bg-white text-gray-400 border border-gray-100"}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          placeholder="Search inventory..."
          className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm outline-none focus:ring-1 ring-[#946659] w-full md:w-80 shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <InventoryTable
        data={items}
        onManage={(item) => {
          setSelectedItem(item);
          setModalMode("EDIT");
          setIsModalOpen(true);
        }}
      />

      {/* FOOTER PAGINATION */}
      <div className="flex justify-between items-center bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
        <p className="text-[10px] font-black uppercase text-gray-400">
          Total Items: <span className="text-black">{totalCount}</span>
        </p>
        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 text-[10px] font-black border border-gray-100 rounded-xl disabled:opacity-20 transition-all"
          >
            Prev
          </button>
          <div className="bg-gray-50 px-4 py-2 rounded-xl text-[10px] font-black">
            {currentPage} / {totalPages}
          </div>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 text-[10px] font-black border border-gray-100 rounded-xl disabled:opacity-20 transition-all"
          >
            Next
          </button>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-5xl rounded-[40px] p-12 shadow-2xl overflow-y-auto max-h-[95vh] animate-in zoom-in duration-300">
            <form onSubmit={handleAction} className="space-y-8">
              <div className="flex justify-between items-center border-b border-gray-50 pb-6">
                <h2 className="text-3xl font-serif font-bold text-gray-900">
                  {modalMode === "ADD" ? "Register Item" : "Item Details"}
                </h2>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-300 hover:text-black text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                <div className="md:col-span-1 space-y-6">
                  <div className="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 flex items-center justify-center">
                    {selectedItem.image_url ? (
                      <Image
                        src={selectedItem.image_url}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-[10px] font-black text-gray-300 uppercase">
                        No Photo
                      </span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-gray-400">
                      Image URL
                    </label>
                    <input
                      className="w-full p-3 bg-gray-50 rounded-xl text-[10px] font-bold outline-none"
                      value={selectedItem.image_url || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          image_url: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="md:col-span-3 grid grid-cols-2 gap-6">
                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400">
                      Item Name
                    </label>
                    <input
                      className="w-full p-4 bg-gray-50 rounded-2xl font-bold outline-none"
                      value={selectedItem.item_name || ""}
                      required
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          item_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400">
                      Category
                    </label>
                    <select
                      className="w-full p-4 bg-gray-50 rounded-2xl font-bold outline-none"
                      value={selectedItem.item_type}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          item_type: e.target.value,
                        })
                      }
                    >
                      {categories
                        .filter((c) => c !== "All")
                        .map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        className="w-full p-4 bg-gray-50 rounded-2xl font-black outline-none"
                        value={selectedItem.price || ""}
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            price: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400">
                        Stock
                      </label>
                      <input
                        type="number"
                        className="w-full p-4 bg-gray-50 rounded-2xl font-black outline-none"
                        value={selectedItem.stock_quantity || ""}
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            stock_quantity: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      className="w-full p-4 bg-gray-50 rounded-2xl outline-none text-sm"
                      value={selectedItem.description || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-8 border-t border-gray-50">
                <button
                  type="submit"
                  className="flex-1 py-5 bg-black text-white rounded-[24px] font-black uppercase text-[10px] tracking-widest hover:bg-[#946659] transition-all"
                >
                  {modalMode === "ADD" ? "Save Item" : "Edit Record"}
                </button>
                {modalMode === "EDIT" && (
                  <button
                    type="button"
                    onClick={async () => {
                      if (confirm("Delete item?")) {
                        await adminInventoryApi.deleteItem(selectedItem.id);
                        setIsModalOpen(false);
                      }
                    }}
                    className="px-12 py-5 bg-red-50 text-red-500 rounded-[24px] font-black uppercase text-[10px] tracking-widest hover:bg-red-500 hover:text-white transition-all"
                  >
                    Delete
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
