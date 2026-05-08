"use client";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import UserTable from "@/components/dashboard/admin/UserTable";

export default function UsersPage() {
  const {
    users,
    loading,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    counts,
  } = useAdminUsers();

  const filterOptions = [
    { label: "All Users", value: "All" },
    { label: "Admins", value: "admin" },
    { label: "Contributors", value: "contributor" },
    { label: "Regular Users", value: "user" },
  ];

  if (loading)
    return (
      <div className="p-20 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#946659] mb-4"></div>
        <p className="font-serif italic text-[#946659]">
          Loading User Directory...
        </p>
      </div>
    );

  return (
    <div className="p-10 space-y-10">
      <header className="flex justify-between items-end pb-8 border-b border-gray-100">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 leading-tight">
            User Management
          </h1>
          <p className="text-[#946659] italic font-medium mt-1">
            Access Control & Role Delegation
          </p>
        </div>
      </header>

      {/* SEARCH AND FILTERS */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setRoleFilter(opt.value);
                setCurrentPage(1);
              }}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap ${
                roleFilter === opt.value
                  ? "bg-black text-white shadow-lg"
                  : "bg-white text-gray-400 border border-gray-100 hover:bg-gray-50"
              }`}
            >
              {opt.label}
              <span
                className={`px-2 py-0.5 rounded-md text-[8px] ${
                  roleFilter === opt.value
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {counts[opt.value]}
              </span>
            </button>
          ))}
        </div>
        <input
          placeholder="Search by name or email..."
          className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm outline-none focus:ring-1 ring-[#946659] w-full md:w-80 shadow-sm"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <UserTable data={users} />

      {/* PAGINATION FOOTER */}
      <div className="px-8 py-5 bg-white border border-gray-100 rounded-[32px] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
          Total in list: <span className="text-[#946659]">{users.length}</span>
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 text-[10px] font-black uppercase bg-white border border-gray-100 rounded-xl disabled:opacity-20 transition-all hover:border-[#946659]"
          >
            Prev
          </button>

          <div className="bg-white border border-gray-100 px-3 py-2 rounded-xl text-[10px] font-bold text-[#946659]">
            {currentPage} / {totalPages}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 text-[10px] font-black uppercase bg-white border border-gray-100 rounded-xl disabled:opacity-20 transition-all hover:border-[#946659]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
