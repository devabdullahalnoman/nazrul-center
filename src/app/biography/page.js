export default function BiographyPage() {
  const chapters = [
    {
      id: "early",
      title: "Early Life",
      content:
        "Born on May 24, 1899, in Churulia, Kazi Nazrul Islam was known as 'Dukhu Mia'...",
    },
    {
      id: "soldier",
      title: "The Soldier Poet",
      content:
        "In 1917, he joined the 49th Bengali Regiment and served in Karachi during WWI...",
    },
    {
      id: "rebel",
      title: "The Rebel Voice",
      content:
        "Returning to Calcutta, he published 'Bidrohi' in 1921, which became a landmark in literature...",
    },
    {
      id: "national",
      title: "National Poet",
      content:
        "In 1972, he was brought to Bangladesh and honored as the National Poet...",
    },
  ];

  return (
    <div className="bg-base-100 min-h-screen">
      {/* Hero Header */}
      <section className="bg-neutral text-neutral-content py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            The Life of Kazi Nazrul Islam
          </h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto italic">
            &quot;I am the rebel poet, I am the heart of the world.&quot;
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12">
        {/* Sticky Scroll-Spy Navigation (Desktop) */}
        <aside className="lg:w-1/4 h-fit lg:sticky lg:top-24 hidden lg:block">
          <ul className="menu bg-base-200 p-4 rounded-2xl font-bold">
            <li className="menu-title opacity-50 uppercase text-xs">
              Chapters
            </li>
            {chapters.map((ch) => (
              <li key={ch.id}>
                <a href={`#${ch.id}`}>{ch.title}</a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Narrative Content */}
        <main className="lg:w-3/4">
          <article className="prose prose-lg max-w-none prose-headings:font-bold prose-p:text-gray-700">
            {chapters.map((chapter) => (
              <section
                key={chapter.id}
                id={chapter.id}
                className="mb-20 scroll-mt-24"
              >
                <h2 className="text-4xl border-b-2 border-primary pb-2 inline-block mb-8">
                  {chapter.title}
                </h2>
                <p>{chapter.content}</p>
                {/* Image Placeholder for production photos */}
                <div className="aspect-video bg-base-300 rounded-2xl my-8 flex items-center justify-center text-gray-400 italic">
                  Historical Photo: {chapter.title}
                </div>
              </section>
            ))}
          </article>
        </main>
      </div>
    </div>
  );
}
