export default function VideoPlayer({ videoId }) {
  return (
    <div className="w-full max-w-5xl mx-auto shadow-2xl rounded-3xl overflow-hidden bg-black aspect-video border-4 border-base-300">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}
