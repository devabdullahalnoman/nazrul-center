"use client";
import Image from "next/image";
import { UniversalModal } from "@/components/ui/UniversalModal";

export function UserDetailsModal({ isOpen, onClose, user }) {
  if (!user) return null;

  const u = user;

  // Fallback avatar logic
  const userImage =
    u.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(u.full_name || "User")}&background=946659&color=fff&size=512`;

  const initials = u.full_name
    ? u.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  return (
    <UniversalModal
      isOpen={isOpen}
      onClose={onClose}
      title="Identity"
      maxWidth="max-w-4xl"
    >
      <div className="p-2 space-y-8 animate-in fade-in duration-300">
        {/* HEADER SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-10 items-start border-b border-gray-100 pb-10">
          {/* PHOTO BOX: Optimized for 180x230 Portrait Ratio */}
          <div className="relative w-45 h-57.5 bg-nazrul-terracotta rounded-3xl overflow-hidden border-4 border-white shadow-xl flex items-center justify-center shrink-0 mx-auto md:mx-0">
            {/* Fallback Initials Layer */}
            <span className="absolute text-5xl font-bold text-white/30 uppercase select-none z-0">
              {initials}
            </span>

            {/* Next.js Image with fixed dimensions for guaranteed visibility */}
            <Image
              src={userImage}
              alt={u.full_name || "User"}
              width={180}
              height={230}
              className="relative z-10 w-full h-full object-cover"
              priority
              unoptimized
            />
          </div>

          {/* IDENTITY INFORMATION */}
          <div className="flex flex-col justify-center space-y-6 text-center md:text-left">
            <div>
              <p className="text-[10px] font-black uppercase text-nazrul-terracotta tracking-[0.4em] mb-2">
                Personnel Record
              </p>
              <h2 className="text-4xl font-serif font-bold text-gray-900 leading-tight">
                {u.full_name || "Guest Account"}
              </h2>
              <div className="mt-3">
                <span className="px-4 py-1.5 bg-nazrul-terracotta text-white font-black uppercase text-[9px] tracking-[0.2em] rounded-full shadow-md">
                  {u.role || "User"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard
                label="Email Address"
                value={u.email || "No Record"}
                icon="✉️"
              />
              <InfoCard
                label="Contact Number"
                value={u.phone || "Not Provided"}
                icon="📞"
              />
              <InfoCard
                label="Joining Date"
                value={
                  u.created_at
                    ? new Date(u.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "Date Unknown"
                }
                icon="📅"
              />
              <InfoCard
                label="System ID"
                value={u.id ? u.id.slice(0, 8).toUpperCase() : "—"}
                icon="🆔"
              />
            </div>
          </div>
        </div>

        {/* ADDRESS SECTION */}
        <div className="p-8 bg-gray-50 rounded-4xl border border-gray-100">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
            <span className="text-lg opacity-40">🏠</span>
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em]">
              Residential Address
            </p>
          </div>
          <p className="text-lg font-bold text-gray-900 italic leading-relaxed text-center md:text-left">
            &quot;
            {u.address ||
              "No physical address has been recorded in the central ledger."}
            &quot;
          </p>
        </div>
      </div>
    </UniversalModal>
  );
}

function InfoCard({ label, value, icon }) {
  return (
    <div className="p-5 bg-white rounded-3xl border border-gray-100 shadow-sm text-left">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs opacity-40">{icon}</span>
        <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">
          {label}
        </p>
      </div>
      <p className="text-sm font-bold text-gray-900 truncate">{value}</p>
    </div>
  );
}
