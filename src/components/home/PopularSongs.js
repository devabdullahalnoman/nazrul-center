export default function PopularSongs() {
  const songs = [
    {
      id: 1,
      title: "Karar Oi Louho Kapat",
      category: "Patriotic",
      duration: "3:45",
    },
    {
      id: 2,
      title: "Moro Piya Swapaney Asey",
      category: "Ghazal",
      duration: "4:12",
    },
    {
      id: 3,
      title: "Bagichay Bulbuli Tui",
      category: "Classic",
      duration: "5:02",
    },
    {
      id: 4,
      title: "Shukno Patar Nupur Paye",
      category: "Nature",
      duration: "3:58",
    },
  ];

  return (
    <section className="py-20 px-4 bg-base-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span className="p-2 bg-primary/10 rounded-lg">🎵</span>
          Popular Sangeet
        </h2>

        <div className="grid lg:grid-cols-2 gap-4">
          {songs.map((song) => (
            <div
              key={song.id}
              className="flex items-center justify-between p-4 rounded-xl border border-base-200 hover:bg-primary/5 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-primary text-primary-content rounded-full group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{song.title}</h3>
                  <span className="badge badge-sm badge-ghost text-xs opacity-60 uppercase tracking-tighter">
                    {song.category}
                  </span>
                </div>
              </div>
              <div className="text-sm font-mono opacity-50">
                {song.duration}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button className="btn btn-outline btn-primary px-10">
            Explore Music Archive
          </button>
        </div>
      </div>
    </section>
  );
}
