"use client";
import Image from "next/image";

export default function PublicationTable({ data, onAction }) {
  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50/50 border-b border-gray-50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
          <tr>
            <th className="px-6 py-4">Cover</th>
            <th className="px-6 py-4">Title & Author</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4 text-center">Year</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
              <td className="px-6 py-4">
                <div className="relative w-12 h-16 bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-50">
                  <Image
                    src={
                      item.cover_url ||
                      "https://placehold.co/400x600/png?text=No+Cover"
                    }
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </td>
              <td className="px-6 py-4">
                <p className="font-bold text-gray-900 leading-tight">
                  {item.title}
                </p>
                <p className="text-xs text-[#946659] italic mt-1">
                  {item.author}
                </p>
              </td>
              <td className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-tighter">
                {item.category}
              </td>
              <td className="px-6 py-4 text-center font-mono text-xs text-gray-500">
                {item.year || "—"}
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onAction(item)}
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
