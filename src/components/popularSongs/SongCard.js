export default function SongCard({ song }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full">
      {/* Player Section */}
      <div className="relative aspect-video w-full bg-black">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${song.youtubeId}?modestbranding=1&rel=0`}
          title={song.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0"
        ></iframe>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col grow justify-between">
        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
          {song.title}
        </h3>

        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest truncate max-w-120px">
              {song.channelName}
            </p>
          </div>

          <span className="text-[10px] font-mono font-bold text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
            {song.duration}
          </span>
        </div>
      </div>
    </div>
  );
}
