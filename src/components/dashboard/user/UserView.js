"use client";

export default function UserView({ user }) {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-black uppercase tracking-tighter italic">
          Member <span className="text-[#946659]">Portal</span>
        </h1>
        <p className="text-sm font-medium text-gray-500">
          Welcome, {user.full_name}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#946659] text-white p-8 rounded-3xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black uppercase italic">My Library</h2>
          <p className="text-sm opacity-80 mt-2">
            Access your purchased e-books and research papers here.
          </p>
          <button className="mt-6 bg-black text-white px-6 py-2 rounded-xl text-xs font-black uppercase">
            Open Reader
          </button>
        </div>

        <div className="bg-white p-8 rounded-3xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black uppercase italic">Wishlist</h2>
          <p className="text-sm text-gray-500 mt-2">
            View the items you are tracking for purchase.
          </p>
          <button className="mt-6 border-2 border-black px-6 py-2 rounded-xl text-xs font-black uppercase hover:bg-black hover:text-white transition">
            View Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
