"use client";
import { useState } from "react";
import Image from "next/image";
import { useAdminPublications } from "@/hooks/useAdminPublications";
import { adminPublicationsApi } from "@/api/admin-publications";
import PublicationTable from "@/components/dashboard/admin/PublicationTable";

export default function PublicationsPage() {
  const { publications, loading } = useAdminPublications();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("ADD");

  const handleOpenAdd = () => {
    setSelectedItem({
      title: "",
      author: "Kazi Nazrul Islam",
      category: "Books by Nazrul",
      year: new Date().getFullYear(),
      description: "",
      cover_url: "",
      file_url: "",
      is_featured: false,
    });
    setModalMode("ADD");
    setIsModalOpen(true);
  };

  const handleAction = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === "ADD")
        await adminPublicationsApi.addPublication(selectedItem);
      else
        await adminPublicationsApi.updatePublication(
          selectedItem.id,
          selectedItem,
        );
      setIsModalOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading)
    return (
      <div className="p-20 font-serif italic text-[#946659]">
        Syncing E-Book Archive...
      </div>
    );

  return (
    <div className="p-10 space-y-10 animate-in fade-in duration-500">
      <header className="flex justify-between items-end pb-8 border-b border-gray-100">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 leading-tight">
            Digital Publications
          </h1>
          <p className="text-[#946659] italic font-medium">
            Archive & Research Oversight
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-[#946659] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#946659]/20 transition-transform hover:scale-105"
        >
          + Add New E-Book
        </button>
      </header>

      <PublicationTable
        data={publications}
        onAction={(item) => {
          setSelectedItem(item);
          setModalMode("EDIT");
          setIsModalOpen(true);
        }}
      />

      {/* COMPREHENSIVE DETAIL & EDIT MODAL */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-5xl rounded-[40px] p-12 shadow-2xl overflow-y-auto max-h-[95vh] relative animate-in zoom-in duration-300">
            <form onSubmit={handleAction} className="space-y-8">
              <div className="flex justify-between items-center border-b border-gray-50 pb-6">
                <h2 className="text-3xl font-serif font-bold text-gray-900">
                  {modalMode === "ADD" ? "Register E-Book" : "Archive Details"}
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
                {/* PHOTO & URLS COLUMN */}
                <div className="md:col-span-1 space-y-6">
                  <div className="relative aspect-[3/4] bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-inner flex items-center justify-center">
                    {selectedItem.cover_url ? (
                      <Image
                        src={selectedItem.cover_url}
                        alt="Cover Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-[10px] font-black uppercase text-gray-300">
                        No Preview Available
                      </span>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest">
                        Cover Image URL
                      </label>
                      <input
                        className="w-full p-3 bg-gray-50 rounded-xl text-[10px] font-bold outline-none border border-gray-100"
                        value={selectedItem.cover_url || ""}
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            cover_url: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest">
                        PDF/File URL
                      </label>
                      <input
                        className="w-full p-3 bg-gray-50 rounded-xl text-[10px] font-bold outline-none border border-gray-100"
                        value={selectedItem.file_url || ""}
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            file_url: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* FIELDS COLUMN */}
                <div className="md:col-span-3 grid grid-cols-2 gap-6">
                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400">
                      Title
                    </label>
                    <input
                      className="w-full p-4 bg-gray-50 rounded-2xl font-bold border-none outline-none focus:ring-1 ring-[#946659]"
                      value={selectedItem.title || ""}
                      required
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400">
                      Author
                    </label>
                    <input
                      className="w-full p-4 bg-gray-50 rounded-2xl outline-none"
                      value={selectedItem.author || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          author: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400">
                      Category
                    </label>
                    <select
                      className="w-full p-4 bg-gray-50 rounded-2xl font-bold outline-none appearance-none"
                      value={selectedItem.category || "Books by Nazrul"}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          category: e.target.value,
                        })
                      }
                    >
                      <option>Books by Nazrul</option>
                      <option>Books on Nazrul</option>
                      <option>Research Papers</option>
                      <option>Songs</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400">
                      Year
                    </label>
                    <input
                      type="number"
                      className="w-full p-4 bg-gray-50 rounded-2xl outline-none font-mono"
                      value={selectedItem.year || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          year: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center gap-4 pt-6">
                    <input
                      type="checkbox"
                      checked={selectedItem.is_featured || false}
                      className="w-5 h-5 accent-[#946659] rounded-md"
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          is_featured: e.target.checked,
                        })
                      }
                    />
                    <label className="text-[10px] font-black uppercase text-gray-500">
                      Feature on Homepage
                    </label>
                  </div>
                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      className="w-full p-4 bg-gray-50 rounded-2xl outline-none text-sm leading-relaxed"
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
                  className="flex-1 py-5 bg-black text-white rounded-3xl font-black uppercase text-[10px] tracking-widest hover:bg-[#946659] transition-all"
                >
                  {modalMode === "ADD" ? "Save to Archive" : "Edit Record"}
                </button>
                {modalMode === "EDIT" && (
                  <button
                    type="button"
                    onClick={async () => {
                      if (confirm("Permanently delete this record?")) {
                        await adminPublicationsApi.deletePublication(
                          selectedItem.id,
                        );
                        setIsModalOpen(false);
                      }
                    }}
                    className="px-12 py-5 bg-red-50 text-red-500 rounded-3xl font-black uppercase text-[10px] tracking-widest hover:bg-red-500 hover:text-white transition-all"
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
