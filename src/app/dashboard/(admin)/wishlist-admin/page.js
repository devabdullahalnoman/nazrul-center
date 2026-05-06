"use client";
export default function WishlistAdmin() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-serif font-bold">User Wishlists</h1>
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50/50 text-gray-400 font-bold uppercase text-[10px]">
            <tr>
              <th className="px-6 py-4 text-left">Product</th>
              <th className="px-6 py-4 text-left">Wish Count</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Last Action By</th>
              <th className="px-6 py-4 text-right">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <tr>
              <td className="px-6 py-4 font-bold text-gray-800">
                Agnibina First Edition (Facsimile)
              </td>
              <td className="px-6 py-4 italic">54 Users</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-red-50 text-red-500 rounded-full text-[10px] font-black uppercase">
                  Unavailable
                </span>
              </td>
              <td className="px-6 py-4">
                <p className="text-xs font-bold">Hasan Ali</p>
                <button className="text-[9px] text-[#946659] hover:underline uppercase font-black">
                  View Profile
                </button>
              </td>
              <td className="px-6 py-4 text-right flex justify-end gap-2">
                <button className="px-3 py-1 bg-green-600 text-white text-[10px] font-bold rounded">
                  Available
                </button>
                <button className="px-3 py-1 bg-gray-800 text-white text-[10px] font-bold rounded">
                  Pending
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
