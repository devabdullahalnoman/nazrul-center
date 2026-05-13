"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { UniversalModal } from "@/components/ui/UniversalModal";
import { publicationsApi } from "../../api/publications.api";

export function PublicationModal({
  isOpen,
  onClose,
  item,
  setItem,
  mode,
  refresh,
}) {
  const [loading, setLoading] = useState(false);
  const [tempFile, setTempFile] = useState(null);
  const fileInputRef = useRef(null);

  const categories = [
    "Books on Nazrul",
    "Books by Nazrul",
    "Documents & Research Papers",
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTempFile(file);
      setItem({ ...item, cover_url: URL.createObjectURL(file) });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await publicationsApi.savePublication(item, tempFile);
      refresh();
      onClose();
      setTempFile(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UniversalModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        mode === "ADD" ? "Archive New Publication" : "Edit Scholarly Record"
      }
      maxWidth="max-w-5xl"
    >
      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Left Side: Photo Upload & Featured */}
          <div className="md:col-span-1 space-y-6">
            <div
              onClick={() => fileInputRef.current.click()}
              className="relative aspect-3/4 bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-inner flex items-center justify-center cursor-pointer group"
            >
              {item?.cover_url ? (
                <Image
                  src={item.cover_url}
                  alt="Preview"
                  fill
                  className="object-cover group-hover:opacity-50 transition-opacity"
                />
              ) : (
                <span className="text-[10px] font-black text-gray-300 uppercase">
                  Click to Upload
                </span>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <div className="bg-black text-white text-[8px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                  Select Cover
                </div>
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />

            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase text-gray-400 ml-1">
                Or Cover URL
              </label>
              <input
                className="w-full p-3 bg-gray-50 rounded-xl text-[10px] font-bold outline-none border border-transparent focus:border-nazrul-sand"
                value={item?.cover_url || ""}
                onChange={(e) =>
                  setItem({ ...item, cover_url: e.target.value })
                }
                placeholder="Image link..."
              />
            </div>

            <label className="flex items-center gap-3 p-4 bg-nazrul-base/50 rounded-2xl cursor-pointer border border-nazrul-sand/30 transition-all hover:border-nazrul-terracotta/50">
              <input
                type="checkbox"
                checked={item?.is_featured || false}
                onChange={(e) =>
                  setItem({ ...item, is_featured: e.target.checked })
                }
                className="w-4 h-4 accent-nazrul-terracotta"
              />
              <span className="text-[10px] font-black uppercase text-nazrul-ink">
                Feature on Homepage
              </span>
            </label>
          </div>

          {/* Right Side: Data Fields */}
          <div className="md:col-span-3 grid grid-cols-2 gap-6">
            <div className="col-span-2 space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                Publication Title
              </label>
              <input
                className="w-full p-4 bg-gray-50 rounded-2xl font-bold outline-none border border-transparent focus:border-nazrul-sand text-nazrul-ink"
                value={item?.title || ""}
                required
                onChange={(e) => setItem({ ...item, title: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                Author / Editor
              </label>
              <input
                className="w-full p-4 bg-gray-50 rounded-2xl font-bold outline-none border border-transparent focus:border-nazrul-sand"
                value={item?.author || ""}
                onChange={(e) => setItem({ ...item, author: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                Category
              </label>
              <select
                className="w-full p-4 bg-gray-50 rounded-2xl font-bold outline-none border border-transparent focus:border-nazrul-sand appearance-none"
                value={item?.category || ""}
                onChange={(e) => setItem({ ...item, category: e.target.value })}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                Publication Year
              </label>
              <input
                className="w-full p-4 bg-gray-50 rounded-2xl font-bold outline-none border border-transparent focus:border-nazrul-sand font-mono"
                value={item?.year || ""}
                onChange={(e) => setItem({ ...item, year: e.target.value })}
              />
            </div>

            <div className="col-span-2 space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                Archive Summary
              </label>
              <textarea
                rows={5}
                className="w-full p-4 bg-gray-50 rounded-2xl outline-none text-sm resize-none border border-transparent focus:border-nazrul-sand leading-relaxed"
                value={item?.description || ""}
                onChange={(e) =>
                  setItem({ ...item, description: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-8 border-t border-gray-50">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-5 bg-nazrul-ink text-white rounded-3xl font-black uppercase text-[10px] tracking-widest hover:bg-nazrul-terracotta transition-all shadow-xl disabled:opacity-50"
          >
            {loading
              ? "Archiving..."
              : mode === "ADD"
                ? "Archive Record"
                : "Update Entry"}
          </button>
          {mode === "EDIT" && (
            <button
              type="button"
              onClick={async () => {
                if (confirm("Permanently delete this archive entry?")) {
                  await publicationsApi.deletePublication(item.id);
                  refresh();
                  onClose();
                }
              }}
              className="px-12 py-5 bg-red-50 text-red-500 rounded-3xl font-black uppercase text-[10px] tracking-widest hover:bg-red-500 hover:text-white transition-all"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </UniversalModal>
  );
}
