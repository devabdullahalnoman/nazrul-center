"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { UniversalModal } from "@/components/ui/UniversalModal";
import { inventoryApi } from "../../api/inventory.api";

export function InventoryModal({ isOpen, onClose, selectedItem, setSelectedItem, mode, refresh }) {
  const [loading, setLoading] = useState(false);
  const [tempFile, setTempFile] = useState(null);
  const fileInputRef = useRef(null);
  
  const categories = ["Physical Book", "Apparels", "Souvenirs", "Portrait", "Other"];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTempFile(file);
      // Local preview only
      setSelectedItem({ ...selectedItem, image_url: URL.createObjectURL(file) });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await inventoryApi.saveProduct(selectedItem, tempFile);
      if (error) throw error;
      
      refresh();
      onClose();
      setTempFile(null);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UniversalModal isOpen={isOpen} onClose={onClose} title={mode === "ADD" ? "New Inventory Item" : "Manage Record"} maxWidth="max-w-5xl">
      <form onSubmit={handleFormSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* IMAGE SECTION */}
          <div className="md:col-span-1 space-y-6">
            <div 
              onClick={() => fileInputRef.current.click()}
              className="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 flex items-center justify-center cursor-pointer group shadow-inner"
            >
              {selectedItem?.image_url ? (
                <Image src={selectedItem.image_url} alt="" fill className="object-cover group-hover:opacity-40 transition-opacity" />
              ) : (
                <span className="text-[10px] font-black text-gray-300 uppercase">Upload Photo</span>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                 <div className="bg-black text-white text-[8px] font-black px-4 py-2 rounded-full uppercase tracking-widest">Select Image</div>
              </div>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />

            <div className="pt-4 space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={selectedItem?.is_featured || false} onChange={(e) => setSelectedItem({...selectedItem, is_featured: e.target.checked})} className="w-4 h-4 rounded text-black focus:ring-0" />
                <span className="text-[9px] font-black uppercase text-gray-400">Featured</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={selectedItem?.is_sale || false} onChange={(e) => setSelectedItem({...selectedItem, is_sale: e.target.checked})} className="w-4 h-4 rounded text-nazrul-crimson focus:ring-0" />
                <span className="text-[9px] font-black uppercase text-gray-400">On Sale</span>
              </label>
            </div>
          </div>

          {/* DATA FIELDS */}
          <div className="md:col-span-3 grid grid-cols-2 gap-6">
            <div className="col-span-2 space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400">Item Name</label>
              <input className="w-full p-4 bg-gray-50 rounded-2xl font-bold border border-transparent focus:border-gray-200 outline-none" value={selectedItem?.item_name || ""} required onChange={(e) => setSelectedItem({...selectedItem, item_name: e.target.value})} />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400">Category</label>
              <select className="w-full p-4 bg-gray-50 rounded-2xl font-bold outline-none" value={selectedItem?.item_type} onChange={(e) => setSelectedItem({...selectedItem, item_type: e.target.value})}>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400">Stock</label>
              <input type="number" className="w-full p-4 bg-gray-50 rounded-2xl font-black outline-none" value={selectedItem?.stock_quantity || ""} onChange={(e) => setSelectedItem({...selectedItem, stock_quantity: e.target.value})} />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400">Price (৳)</label>
              <input type="number" className="w-full p-4 bg-gray-50 rounded-2xl font-black outline-none text-nazrul-crimson" value={selectedItem?.price || ""} onChange={(e) => setSelectedItem({...selectedItem, price: e.target.value})} />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400">Previous Price (৳)</label>
              <input type="number" className="w-full p-4 bg-gray-50 rounded-2xl font-black outline-none opacity-50" value={selectedItem?.previous_price || ""} onChange={(e) => setSelectedItem({...selectedItem, previous_price: e.target.value})} />
            </div>

            <div className="col-span-2 space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400">Short Description</label>
              <input className="w-full p-4 bg-gray-50 rounded-2xl outline-none text-sm" value={selectedItem?.short_description || ""} onChange={(e) => setSelectedItem({...selectedItem, short_description: e.target.value})} />
            </div>

            <div className="col-span-2 space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400">Full Description</label>
              <textarea rows={4} className="w-full p-4 bg-gray-50 rounded-2xl outline-none text-sm resize-none" value={selectedItem?.description || ""} onChange={(e) => setSelectedItem({...selectedItem, description: e.target.value})} />
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-8 border-t border-gray-50">
          <button type="submit" disabled={loading} className="flex-1 py-5 bg-black text-white rounded-3xl font-black uppercase text-[10px] tracking-widest hover:bg-nazrul-terracotta transition-all disabled:opacity-50">
            {loading ? "Processing..." : mode === "ADD" ? "Add to Shop" : "Update Record"}
          </button>
          {mode === "EDIT" && (
            <button type="button" onClick={async () => { if(confirm("Delete?")) { await inventoryApi.deleteItem(selectedItem.id); refresh(); onClose(); }}} className="px-12 py-5 bg-red-50 text-red-500 rounded-3xl font-black uppercase text-[10px] tracking-widest hover:bg-red-500 hover:text-white transition-all">
              Delete
            </button>
          )}
        </div>
      </form>
    </UniversalModal>
  );
}