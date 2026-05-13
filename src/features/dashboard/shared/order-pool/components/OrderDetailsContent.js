"use client";

export function OrderDetailsContent({ order }) {
  if (!order) return null;
  const itemsList = order.items || [];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      {/* 1. Header: Customer & Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
          <p className="text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">
            Customer Profile
          </p>
          <p className="text-xl font-bold text-nazrul-ink">
            {order.customer?.full_name}
          </p>
          <p className="text-sm text-nazrul-terracotta italic">
            {order.customer?.email}
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-right">
          <p className="text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">
            Timeline
          </p>
          <div className="space-y-1 text-sm font-medium">
            <p>
              <span className="text-gray-400">Placed:</span>{" "}
              {new Date(order.created_at).toLocaleString()}
            </p>
            <p>
              <span className="text-gray-400">Archival Log:</span>{" "}
              {order.updated_at
                ? new Date(order.updated_at).toLocaleString()
                : "First Entry"}
            </p>
            <div className="mt-3">
              <span className="badge bg-nazrul-ink text-white uppercase text-[10px] font-black px-4 py-3">
                {order.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Shipping Address */}
      <div className="p-6 bg-nazrul-base border border-nazrul-sand rounded-4xl">
        <p className="text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">
          Shipping Destination
        </p>
        <p className="text-base italic text-nazrul-ink font-medium leading-relaxed">
          {order.customer_address || "No address provided in archive."}
        </p>
      </div>

      {/* 3. Operator/Handler Section */}
      <div className="p-5 bg-white border border-gray-100 rounded-3xl flex justify-between items-center shadow-sm">
        <div>
          <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
            Managed By
          </p>
          <p className="text-base font-bold text-nazrul-ink">
            {order.operator?.full_name || "Unassigned"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
            Handler Contact
          </p>
          <p className="text-sm font-medium text-nazrul-terracotta italic">
            {order.operator?.email || "N/A"}
          </p>
        </div>
      </div>

      {/* 4. Purchased Items */}
      <div className="space-y-4">
        <p className="text-xs font-black uppercase text-gray-400 tracking-widest px-2">
          Purchased Items
        </p>
        <div className="space-y-3">
          {itemsList.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-5 bg-white border border-gray-100 rounded-2xl shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-nazrul-sand/20 rounded-xl flex items-center justify-center font-black text-nazrul-terracotta">
                  {idx + 1}
                </div>
                <div>
                  <p className="font-bold text-nazrul-ink text-base">
                    {item.name || "Item"}
                  </p>
                  <p className="text-xs text-gray-400 font-bold uppercase">
                    Qty:{" "}
                    <span className="text-nazrul-terracotta font-black">
                      {item.qty || item.quantity}
                    </span>
                  </p>
                </div>
              </div>
              <p className="font-black text-nazrul-terracotta text-lg">
                BDT {item.price}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Grand Total */}
      <div className="flex justify-between items-center p-8 bg-nazrul-ink text-white rounded-[40px] shadow-2xl">
        <div>
          <span className="font-serif text-2xl block">Grand Total</span>
          <span className="text-[10px] font-black text-nazrul-sand uppercase tracking-widest">
            Verified Payment
          </span>
        </div>
        <span className="text-5xl font-black text-nazrul-sand">
          BDT {order.total_amount}
        </span>
      </div>
    </div>
  );
}
