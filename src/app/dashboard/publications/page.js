"use client";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

export default function PublicationsPage() {
  const supabase = createClient();

  // State
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    category: "Books by Nazrul",
    author: "",
    file_url: "",
    is_featured: false,
  });

  // --- 1. FUNCTIONS FIRST (To avoid "Accessed before declaration") ---

  const fetchBooks = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBooks(data || []);
    } catch (err) {
      console.error("Error fetching publications:", err.message);
    } finally {
      setIsDataLoading(false);
    }
  }, [supabase]);

  const handleAddBook = async (e) => {
    e.preventDefault();

    // REQUIREMENT: Auto-author logic for Nazrul
    let finalAuthor = form.author;
    if (
      form.category === "Books by Nazrul" &&
      (!form.author || form.author.trim() === "")
    ) {
      finalAuthor = "Kazi Nazrul Islam";
    }

    const { error } = await supabase.from("publications").insert([
      {
        ...form,
        author: finalAuthor,
      },
    ]);

    if (!error) {
      setForm({
        title: "",
        category: "Books by Nazrul",
        author: "",
        file_url: "",
        is_featured: false,
      });
      // We don't need to manually re-fetch here because the Realtime listener below will handle it!
    } else {
      alert(error.message);
    }
  };

  // --- 2. USEEFFECT LATER ---

  useEffect(() => {
    let isMounted = true;

    const initializeData = async () => {
      // Initial fetch
      await fetchBooks();

      // REAL-TIME SUBSCRIPTION: Updates UI across all devices instantly
      if (isMounted) {
        const channel = supabase
          .channel("realtime-publications")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "publications" },
            () => {
              if (isMounted) {
                fetchBooks(); // Re-syncs the list whenever ANY device makes a change
              }
            },
          )
          .subscribe();

        return () => {
          isMounted = false;
          supabase.removeChannel(channel);
        };
      }
    };

    const cleanup = initializeData();

    return () => {
      isMounted = false;
      cleanup?.then((fn) => fn?.());
    };
  }, [fetchBooks, supabase]);

  // --- 3. RENDER LOGIC ---

  const filteredBooks =
    filter === "All" ? books : books.filter((b) => b.category === filter);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="border-b border-gray-100 pb-6">
        <h1 className="text-4xl font-serif font-bold text-gray-900">
          Digital Publications
        </h1>
        <p className="text-[#946659] font-medium italic mt-1">
          E-Book Archive & Research Management
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ADD PANEL */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm sticky top-10">
            <h3 className="text-xl font-serif font-bold mb-6 text-gray-800">
              Register E-Book
            </h3>
            <form onSubmit={handleAddBook} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                  Category
                </label>
                <select
                  className="w-full p-3 bg-gray-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#946659]/20 transition-all"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  <option>Books by Nazrul</option>
                  <option>Books on Nazrul</option>
                  <option>Research Papers</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                  Title
                </label>
                <input
                  className="w-full p-3 bg-gray-50 border-none rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#946659]/20"
                  placeholder="Enter publication title"
                  value={form.title}
                  required
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                  Author
                </label>
                <input
                  className="w-full p-3 bg-gray-50 border-none rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#946659]/20"
                  placeholder="Auto-fills if left blank"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#946659]"
                  checked={form.is_featured}
                  onChange={(e) =>
                    setForm({ ...form, is_featured: e.target.checked })
                  }
                />
                <span className="text-[10px] font-black uppercase text-gray-500">
                  Feature on Homepage
                </span>
              </div>

              <button className="w-full py-4 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#946659] transition-all shadow-lg shadow-black/5">
                Update Database
              </button>
            </form>
          </div>
        </div>

        {/* LIST PANEL */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {[
              "All",
              "Books by Nazrul",
              "Books on Nazrul",
              "Research Papers",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${filter === cat ? "bg-[#946659] text-white shadow-md" : "bg-white text-gray-400 border border-gray-100"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/50 border-b border-gray-50 text-[10px] font-black uppercase text-gray-400">
                <tr>
                  <th className="px-6 py-4">Publication Details</th>
                  <th className="px-6 py-4 text-center">E-Book Status</th>
                  <th className="px-6 py-4 text-right">Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredBooks.map((book) => (
                  <tr
                    key={book.id}
                    className="hover:bg-gray-50/30 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <p className="font-bold text-gray-800 leading-tight">
                        {book.title}
                      </p>
                      <p className="text-xs text-[#946659] italic mt-1">
                        {book.author}
                      </p>
                    </td>
                    <td className="px-6 py-5 text-center">
                      {book.file_url ? (
                        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[9px] font-black uppercase tracking-tighter">
                          Read Button Enabled
                        </span>
                      ) : (
                        <span className="text-[9px] text-gray-300 font-bold uppercase tracking-tighter italic">
                          Offline Only
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-4">
                        <button className="text-[10px] font-black text-blue-400 uppercase hover:text-blue-600">
                          Edit
                        </button>
                        <button className="text-[10px] font-black text-red-300 uppercase hover:text-red-500">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredBooks.length === 0 && !isDataLoading && (
              <div className="p-20 text-center">
                <p className="text-gray-300 italic font-serif">
                  No publications found in this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
