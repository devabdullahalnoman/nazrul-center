export default function SongRow({ song }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-base-100 border-b border-base-200 hover:bg-base-200 transition-colors group">
      <div className="flex-1">
        <h3 className="font-bold text-lg text-neutral group-hover:text-primary transition-colors">
          {song.title}
        </h3>
        <div className="flex flex-wrap gap-2 mt-1">
          <span className="badge badge-sm badge-outline opacity-70">
            {song.category}
          </span>
          <span className="text-xs text-gray-500 italic">Rag: {song.rag}</span>
          <span className="text-xs text-gray-500">• {song.year}</span>
        </div>
      </div>
      <div className="mt-4 md:mt-0 flex gap-2">
        <button className="btn btn-circle btn-ghost btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <button className="btn btn-primary btn-sm px-6">Lyrics</button>
      </div>
    </div>
  );
}
