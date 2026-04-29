import { mediaData } from "@/components/media/mediaData";
import Image from "next/image";

export default function MediaPage() {
  return (
    <div className="bg-base-100 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-neutral text-neutral-content py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Media Hub</h1>
          <p className="text-xl text-primary font-medium">
            Explore our rich multimedia collection.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* VIDEO SECTION */}
        <section id="videos" className="mb-20">
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-primary pl-4">
            Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mediaData.videos.map((vid) => (
              <div key={vid.id} className="group">
                <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-lg border border-base-300">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${vid.youtubeId}`}
                    title={vid.title}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
                <h3 className="mt-4 font-bold text-lg">{vid.title}</h3>
                <span className="text-sm text-gray-500">
                  Duration: {vid.duration}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Audio */}
        <section id="audio">
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-primary pl-4">
            Audio Archive
          </h2>
          <div className="space-y-4">
            {mediaData.audios.map((audio) => (
              <div
                key={audio.id}
                className="flex items-center justify-between p-4 bg-base-200 rounded-xl hover:bg-base-300 transition-colors"
              >
                <div>
                  <p className="font-bold">{audio.title}</p>
                  <p className="text-xs text-gray-500">
                    {audio.source} • {audio.duration}
                  </p>
                </div>
                <button className="btn btn-circle btn-sm btn-primary">▶</button>
              </div>
            ))}
          </div>
        </section>

        {/* Photos */}
        <section id="photos">
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-primary pl-4">
            Photo Gallery
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {mediaData.photos.map((photo) => (
              <div
                key={photo.id}
                className="aspect-square bg-base-200 rounded-xl overflow-hidden hover:opacity-90 transition-opacity cursor-pointer border border-base-300"
              >
                <Image
                  src={photo.url}
                  alt={photo.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Press Coverage */}
        <section id="press">
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-primary pl-4">
            Press Coverage
          </h2>
          <div className="space-y-6">
            {mediaData.press.map((item) => (
              <div key={item.id} className="border-b border-base-200 pb-4">
                <h3 className="font-bold hover:text-primary cursor-pointer transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.source} — {item.date}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Downloads */}
        <section id="downloads">
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-primary pl-4">
            Downloads
          </h2>
          <div className="bg-base-200 p-6 rounded-3xl border border-base-300">
            <div className="space-y-4">
              {mediaData.downloads.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between bg-base-100 p-4 rounded-xl shadow-sm"
                >
                  <div>
                    <p className="font-bold text-sm">{file.title}</p>
                    <p className="text-xs text-gray-500">
                      {file.type} • {file.size}
                    </p>
                  </div>
                  <button className="btn btn-neutral btn-sm">Download</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
