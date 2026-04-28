export default function PublicationsPage() {
  const sections = [
    { title: "Books by Kazi Nazrul Islam", icon: "✍️" },
    { title: "Books on Nazrul", icon: "📖" },
    { title: "Research Papers & Journals", icon: "🔬" },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12">Publications</h1>
      <div className="space-y-16">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">{section.icon}</span> {section.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="card bg-base-100 border border-base-200 hover:shadow-lg transition-shadow"
                >
                  <div className="h-64 bg-base-200 rounded-t-xl"></div>
                  <div className="card-body p-4">
                    <h3 className="font-bold">Publication Title</h3>
                    <p className="text-sm opacity-60">Author/Volume Info</p>
                    <button className="btn btn-primary btn-sm mt-2">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
