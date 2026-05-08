"use client";
import Image from "next/image";

export default function InventoryTable({ data, onManage }) {
  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50/50 border-b border-gray-50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
          <tr>
            <th className="px-6 py-4">Item</th>
            <th className="px-6 py-4">Title</th>
            <th className="px-6 py-4">Type</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4 text-center">Stock</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
              <td className="px-6 py-4">
                <div className="relative w-12 h-12 bg-gray-100 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                  <Image
                    src={
                      item.image_url ||
                      "https://placehold.co/400x400/png?text=No+Image"
                    }
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </td>
              <td className="px-6 py-4 font-bold text-gray-900">
                {item.item_name}
              </td>
              <td className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">
                {item.item_type}
              </td>
              <td className="px-6 py-4 font-black text-[#946659]">
                ${item.price}
              </td>
              <td className="px-6 py-4 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-black ${item.stock_quantity < 10 ? "bg-red-50 text-red-500" : "bg-green-50 text-green-600"}`}
                >
                  {item.stock_quantity}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onManage(item)}
                  className="text-[10px] font-black bg-gray-900 text-white px-5 py-2 rounded-xl hover:bg-[#946659] transition-all"
                >
                  Manage
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
