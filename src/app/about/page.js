import { aboutData } from "@/components/about/aboutData";

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-nazrul-honeycomb py-1 px-4">
        <div className="container mx-auto max-w-7xl my-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-nazrul-maroon">
            {aboutData.header.title}
          </h1>
          <p className="text-2xl text-nazrul-olive font-semibold tracking-wide">
            {aboutData.header.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-16 text-nazrul-ink">
        <div className="space-y-16">
          {aboutData.sections.map((section, idx) => (
            <section
              key={idx}
              className="border-b border-base-200 pb-12 last:border-0"
            >
              <h2 className="text-4xl text-nazrul-maroon font-bold mb-6">
                {section.title}
              </h2>

              {section.content &&
                section.content.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-xl text-gray-700 mb-4 leading-relaxed"
                  >
                    {p}
                  </p>
                ))}

              {section.listTitle && (
                <p className="font-bold text-2xl mb-4 text-neutral">
                  {section.listTitle}
                </p>
              )}

              {section.list && (
                <ul className="list-disc pl-6 space-y-3 mb-6">
                  {section.list.map((item, lIdx) => (
                    <li key={lIdx} className="text-xl text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.footer && (
                <p className="text-lg text-gray-700 italic border-l-4 border-nazrul-crimson pl-4 py-2 rounded-lg">
                  {section.footer}
                </p>
              )}
            </section>
          ))}

          {/* Management Section */}
          <section className="bg-nazrul-sand text-nazrul-maroon p-10 rounded-4xl shadow-xl">
            <h2 className="text-3xl font-bold mb-10 border-b border-white/20 pb-4">
              Founder & Advisors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {aboutData.management.founderAdvisors.map((person, pIdx) => (
                <div key={pIdx} className="flex flex-col">
                  <span className="text-xl font-bold text-nazrul">
                    {person.name}
                  </span>
                  <span className="opacity-80">{person.role}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold mb-6 text-nazrul-maroon">
              With support from:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aboutData.management.support.map((org, oIdx) => (
                <div key={oIdx} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-nazrul-crimson rounded-full"></div>
                  <span className="text-lg opacity-90">{org}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
