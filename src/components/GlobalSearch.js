// src/components/GlobalSearch.js
export default function GlobalSearch() {
  return (
    <section className="relative -mt-8 z-30 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-base-100 shadow-2xl rounded-2xl p-2 flex flex-col md:flex-row gap-2 border border-primary/10">
          <input
            type="text"
            placeholder="Search for poems, songs, or books..."
            className="input input-ghost w-full focus:bg-transparent focus:outline-none text-lg px-6"
          />
          <select className="select select-ghost font-medium">
            <option>All Categories</option>
            <option>Poetry</option>
            <option>Sangeet (Music)</option>
            <option>Biography</option>
          </select>
          <button className="btn btn-primary px-10 rounded-xl">Search</button>
        </div>
      </div>
    </section>
  );
}
