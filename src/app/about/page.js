import { aboutData } from "@/components/about/aboutData";

export default function AboutPage() {
  return (
    <div className="bg-base-100 min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-neutral text-neutral-content py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
            {aboutData.header.title}
          </h1>
          <p className="text-xl leading-relaxed mb-8">
            {aboutData.header.subtitle}
          </p>
          <div className="bg-white/10 p-6 rounded-2xl border border-white/20 italic">
            {aboutData.header.launchInfo}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="space-y-16">
          {aboutData.sections.map((section, idx) => (
            <section
              key={idx}
              className="border-b border-base-200 pb-12 last:border-0"
            >
              <h2 className="text-3xl font-bold text-neutral mb-6">
                {section.title}
              </h2>

              {section.content &&
                section.content.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-lg text-gray-700 mb-4 leading-relaxed"
                  >
                    {p}
                  </p>
                ))}

              {section.listTitle && (
                <p className="font-bold text-lg mb-4 text-neutral">
                  {section.listTitle}
                </p>
              )}

              {section.list && (
                <ul className="list-disc pl-6 space-y-3 mb-6">
                  {section.list.map((item, lIdx) => (
                    <li key={lIdx} className="text-lg text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.footer && (
                <p className="text-lg text-gray-700 italic border-l-4 border-primary pl-4 py-2 bg-base-200 rounded-r-lg">
                  {section.footer}
                </p>
              )}
            </section>
          ))}

          {/* Management Section */}
          <section className="bg-neutral text-neutral-content p-10 rounded-4xl shadow-xl">
            <h2 className="text-3xl font-bold mb-10 border-b border-white/20 pb-4">
              Founder & Advisors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {aboutData.management.founderAdvisors.map((person, pIdx) => (
                <div key={pIdx} className="flex flex-col">
                  <span className="text-xl font-bold text-primary">
                    {person.name}
                  </span>
                  <span className="opacity-80">{person.role}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold mb-6 text-primary">
              With support from:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aboutData.management.support.map((org, oIdx) => (
                <div key={oIdx} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
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
