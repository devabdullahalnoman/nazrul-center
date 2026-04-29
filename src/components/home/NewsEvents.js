export default function NewsEvents() {
  const news = [
    {
      id: 1,
      date: "Oct 24",
      title: "New Digital Manuscripts Uploaded",
      tag: "Archive",
    },
    {
      id: 2,
      date: "Nov 02",
      title: "Annual Nazrul Jayanti Seminar",
      tag: "Event",
    },
    {
      id: 3,
      date: "Dec 15",
      title: "Rare Audio Restoration Project",
      tag: "Project",
    },
  ];

  return (
    <section className="py-20 px-4 bg-base-100">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* News List */}
          <div className="grow lg:w-2/3">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <span className="w-2 h-8 bg-primary rounded-full"></span>
              Latest News
            </h2>
            <div className="space-y-4">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="group flex items-center gap-6 p-4 rounded-xl hover:bg-base-200 transition-colors cursor-pointer border border-base-200"
                >
                  <div className="bg-primary text-primary-content p-3 rounded-lg text-center min-w-20">
                    <span className="block text-xs font-bold uppercase">
                      {item.date.split(" ")[0]}
                    </span>
                    <span className="block text-xl font-bold">
                      {item.date.split(" ")[1]}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">
                      {item.tag}
                    </span>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Announcement Card */}
          <div className="lg:w-1/3">
            <div className="card w-full bg-neutral text-neutral-content shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-primary">Announcement</h2>
                <p>
                  The Nazrul Center physical library is now open for researchers
                  every Saturday. Pre-registration is required.
                </p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary btn-sm">Learn More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
