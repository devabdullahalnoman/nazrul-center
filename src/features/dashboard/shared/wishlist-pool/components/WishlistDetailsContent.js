"use client";

export function WishlistDetailsContent({ request }) {
  // Use the 'display' object we verified in the logs
  if (!request) return null;

  return (
    <div className="space-y-8 p-2 animate-in fade-in duration-300">
      {/* Header Section */}
      <div className="flex justify-between items-start border-b border-gray-100 pb-6">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase text-nazrul-terracotta tracking-widest">
            {request.display?.itemType || "Archive"} Request
          </p>
          <h4 className="text-3xl font-serif font-bold text-nazrul-ink leading-tight">
            {request.display?.itemName || "Unknown Item"}
          </h4>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
            Submitted
          </p>
          <p className="font-bold text-nazrul-ink">
            {request.created_at
              ? new Date(request.created_at).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Requester Profile */}
      <div className="p-6 bg-gray-50 rounded-4xl border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl">👤</div>
        <p className="text-[10px] font-black uppercase text-gray-400 mb-3 tracking-widest">
          Requester Profile
        </p>
        <p className="font-bold text-nazrul-ink text-xl">
          {request.customer?.full_name}
        </p>
        <p className="text-xs italic text-gray-500 mt-1">
          {request.customer?.email}
        </p>
      </div>

      {/* Description Section - USING THE VERIFIED DISPLAY PATH */}
      <div className="space-y-3">
        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">
          Archive Item Description
        </p>
        <div className="p-8 bg-white border border-gray-100 rounded-[40px] shadow-sm">
          <p className="text-sm italic leading-relaxed text-gray-600">
            {/* THIS IS THE FIX: Using display.description based on your log */}
            {request?.description || "No description provided."}
          </p>
        </div>
      </div>

      {/* Managed By Section */}
      <div className="pt-6 border-t border-gray-50 flex justify-between items-end text-[10px] font-black uppercase tracking-widest">
        <div>
          <p className="text-gray-400 mb-1">Managed By</p>
          <p className="text-nazrul-ink font-bold">
            {request.updater?.full_name}
            {request.updater?.email && (
              <span className="text-gray-400 lowercase font-medium ml-2">
                ({request.updater.email})
              </span>
            )}
          </p>
        </div>
        <div className="text-right text-nazrul-terracotta italic">
          Last Activity:{" "}
          {request.updated_at
            ? new Date(request.updated_at).toLocaleString()
            : "Initial Entry"}
        </div>
      </div>
      <div></div>
      <div className="text-right text-nazrul-terracotta italic">
        <p className="text-nazrul-ink font-bold">
          {request.availability_status}
        </p>
      </div>
    </div>
  );
}
