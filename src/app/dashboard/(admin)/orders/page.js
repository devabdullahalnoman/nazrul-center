"use client";
export default function OrdersPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-serif font-bold text-gray-900">
          Order Management
        </h1>
        <p className="text-[#946659] font-medium italic">
          Track and assign contributor handlers
        </p>
      </header>

      <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
            <tr>
              <th className="px-6 py-4">Order Details</th>
              <th className="px-6 py-4">Total Price</th>
              <th className="px-6 py-4">Customer Details</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Contributor Handler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {/* Real data mapping goes here */}
            <tr className="hover:bg-gray-50/30 transition-colors">
              <td className="px-6 py-5 font-bold">#ORD-5501</td>
              <td className="px-6 py-5 text-[#946659] font-black">$120.00</td>
              <td className="px-6 py-5">
                <p className="font-bold">Kamal Ahmed</p>
                <p className="text-[10px] text-gray-400 italic">
                  kamal@email.com
                </p>
              </td>
              <td className="px-6 py-5">
                <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                  Pending Approval
                </span>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold">Unassigned</span>
                  <button className="text-[10px] bg-black text-white px-2 py-1 rounded-lg uppercase">
                    Assign
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
