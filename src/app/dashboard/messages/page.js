"use client";
import { useState } from "react";

export default function CommunicationCenter() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-1 space-y-6">
        <h2 className="text-2xl font-serif font-bold">Complains & Messages</h2>
        {/* Mapped Ticket List */}
        <div
          onClick={() =>
            setSelected({ id: "CMP-99", user: "Maria K", type: "Complain" })
          }
          className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${selected?.id === "CMP-99" ? "border-[#946659] bg-[#946659]/5" : "border-gray-50 bg-white hover:border-gray-200"}`}
        >
          <span className="text-[9px] font-black uppercase text-red-500">
            Active Complaint
          </span>
          <h4 className="font-bold text-gray-800 mt-1">
            Item Damaged on Arrival
          </h4>
          <p className="text-xs text-gray-400 italic mt-1">From: Maria K.</p>
        </div>
      </div>

      <div className="lg:col-span-2">
        {selected ? (
          <div className="bg-white border border-gray-100 rounded-[40px] p-10 shadow-sm animate-in slide-in-from-right-4 duration-500">
            <header className="mb-8 border-b border-gray-50 pb-6">
              <h3 className="text-2xl font-serif font-bold text-gray-900">
                Resolution Panel: {selected.id}
              </h3>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-sm font-medium">
                  User: <span className="font-bold">{selected.user}</span>
                </p>
                <button className="text-[10px] bg-gray-100 px-2 py-1 rounded font-bold uppercase">
                  View Profile
                </button>
              </div>
            </header>

            <div className="bg-gray-50 p-6 rounded-2xl italic text-gray-600 mb-8 leading-relaxed">
              &quot;I received my order yesterday, but the Kazi Nazrul Geeti CD
              box set was cracked. I would like a replacement or a full refund
              immediately.&quot;
            </div>

            <textarea
              className="w-full p-5 border border-gray-200 rounded-2xl outline-none focus:border-[#946659] text-sm"
              rows="5"
              placeholder="Type your response to the user..."
            ></textarea>

            <button className="w-full mt-4 py-4 bg-black text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-[#946659] transition-all">
              Send Response & Update Status
            </button>
          </div>
        ) : (
          <div className="h-full border-2 border-dashed border-gray-200 rounded-[40px] flex items-center justify-center text-gray-300 italic">
            Select a message to open resolution panel.
          </div>
        )}
      </div>
    </div>
  );
}
