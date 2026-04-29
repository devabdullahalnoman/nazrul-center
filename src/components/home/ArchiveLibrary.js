const depts = [
  { name: "Poetry", count: "1,200+", icon: "✒️" },
  { name: "Short Stories", count: "50+", icon: "📖" },
  { name: "Sangeet (Songs)", count: "4,000+", icon: "🎶" },
  { name: "Novel", count: "3", icon: "📚" },
  { name: "Essays", count: "100+", icon: "📝" },
  { name: "Letters", count: "200+", icon: "✉️" },
  { name: "Plays", count: "10+", icon: "🎭" },
  { name: "Translations", count: "15 Languages", icon: "🌐" },
];

export default function ArchiveLibrary() {
  return (
    <section className="py-20 px-4 bg-base-200">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">The Digital Library</h2>
          <p className="text-gray-600">
            The world&apos;s most comprehensive digital repository of Kazi
            Nazrul Islam&apos;s creative works.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {depts.map((dept, i) => (
            <div
              key={i}
              className="bg-base-100 p-6 rounded-2xl border border-base-300 hover:border-primary transition-all group cursor-pointer"
            >
              <div className="text-3xl mb-3 group-hover:bounce">
                {dept.icon}
              </div>
              <h3 className="font-bold text-lg">{dept.name}</h3>
              <p className="text-sm opacity-60">{dept.count} Items</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
