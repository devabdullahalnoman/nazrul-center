import Image from "next/image";

export default function BiographyPage() {
  const timelineData = [
    { year: "1899", text: "Born on 24 May in Churulia, Burdwan, India." },
    {
      year: "1908",
      text: "Father, Kazi Fakir Ahmad, dies; Nazrul takes early responsibilities.",
    },
    {
      year: "1910–1917",
      text: "Interrupted education; works as teacher, muezzin, bakery & tea shop assistant; joins folk-opera group; develops early literary skills.",
    },
    {
      year: "1917",
      text: "Joins the 49th Bengal Regiment, serves in the Indian Army, and continues writing.",
    },
    {
      year: "1919",
      text: "First publication: The Autobiography of a Vagabond in Saogat magazine.",
    },
    {
      year: "1920",
      text: "Returns to Calcutta; begins journalistic & literary career.",
    },
    {
      year: "1921",
      text: "Meets Rabindranath Tagore; engagement with Nargis; deep involvement in patriotic activities.",
    },
    {
      year: "1922",
      text: "Publishes Bidrohi (The Rebel), Agnibeena; banned works lead to first imprisonment.",
    },
    {
      year: "1923",
      text: "Imprisoned; begins 40-day hunger strike in protest of inhumane treatment.",
    },
    {
      year: "1924",
      text: "Marries Pramila; publication of two poetry volumes banned by the British Government.",
    },
    {
      year: "1925–1927",
      text: "Actively participates in political & cultural movements; publishes patriotic songs; begins music innovation in Krishnanagar.",
    },
    {
      year: "1928–1932",
      text: "Works with gramophone companies & radio; popularizes Nazrul Geeti.",
    },
    {
      year: "1933–1939",
      text: "Engaged in films, All India Radio programs; writes and directs songs and plays.",
    },
    {
      year: "1941–1942",
      text: "Falls seriously ill; recites Quran; final active years of music and literature.",
    },
    {
      year: "1942–1976",
      text: "Lives in silence due to illness; receives various awards, including Jagattarini Gold Medal, Padma Bhushan, and Ekushey Padak.",
    },
    { year: "1972", text: "Moves to Bangladesh; welcomed as National Poet." },
    {
      year: "1976",
      text: "Passes away on 29 August in Dhaka; buried with state honors near Dhaka University Central Mosque.",
    },
  ];

  return (
    <div className="bg-base-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-neutral text-neutral-content py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Biography Of Kazi Nazrul Islam
          </h1>
          <p className="text-xl text-primary font-medium tracking-wide">
            The Rebel Poet of Bengal
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-11/12 px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT SIDEBAR: Quick Links */}
          <aside className="lg:w-1/5 order-2 lg:order-1">
            <div className="lg:sticky lg:top-24 bg-base-200 p-6 rounded-2xl border border-base-300">
              <h3 className="font-bold text-lg mb-4 border-b border-base-300 pb-2">
                Quick Links
              </h3>
              <ul className="menu menu-sm p-0 font-medium gap-2">
                <li>
                  <a
                    href="#Early"
                    className="hover:text-primary transition-colors"
                  >
                    Early Life
                  </a>
                </li>
                <li>
                  <a
                    href="#Family"
                    className="hover:text-primary transition-colors"
                  >
                    Family & Education
                  </a>
                </li>
                <li>
                  <a
                    href="#Literary"
                    className="hover:text-primary transition-colors"
                  >
                    Literary Journey
                  </a>
                </li>
                <li>
                  <a
                    href="#Revolutionary"
                    className="hover:text-primary transition-colors"
                  >
                    Revolutionary Spirit
                  </a>
                </li>
                <li>
                  <a
                    href="#Prison"
                    className="hover:text-primary transition-colors"
                  >
                    Prison Life
                  </a>
                </li>
                <li>
                  <a
                    href="#Musical"
                    className="hover:text-primary transition-colors"
                  >
                    Musical Contribution
                  </a>
                </li>
                <li>
                  <a
                    href="#Film"
                    className="hover:text-primary transition-colors"
                  >
                    Film & Radio
                  </a>
                </li>
                <li>
                  <a
                    href="#Tragedy"
                    className="hover:text-primary transition-colors"
                  >
                    Tragedy & Illness
                  </a>
                </li>
                <li>
                  <a
                    href="#Awards"
                    className="hover:text-primary transition-colors"
                  >
                    Awards
                  </a>
                </li>
                <li>
                  <a
                    href="#Timeline"
                    className="hover:text-primary transition-colors font-bold text-secondary"
                  >
                    Timeline
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          {/* CENTER: Verbatim Content */}
          <main className="lg:w-1/2 order-3 lg:order-2">
            <article className="prose prose-lg max-w-none prose-p:text-gray-700 leading-relaxed">
              <section id="Early" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold mb-6">Early Life</h2>
                <p>
                  Kazi Nazrul Islam was born on <strong>24 May 1899</strong> in
                  the village of <strong>Churulia</strong>, in the Burdwan
                  district of Bengal (then British India). He was the second of
                  four children. His childhood nickname was{" "}
                  <strong>“Dukhu Mia”</strong>, reflecting the hardship and
                  struggles he faced from an early age.
                </p>
                <p>
                  In 1908, Nazrul lost his father at the age of nine. This
                  sudden loss forced him into responsibilities far beyond his
                  years and deeply shaped his outlook on life, suffering, and
                  resilience.
                </p>
              </section>

              <section id="Family" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold mb-6">
                  Family and Education
                </h2>
                <p>
                  After his father’s death, Nazrul worked as a{" "}
                  <strong>muezzin</strong> at a local mosque and later as a
                  school teacher. During this period, he gained a strong
                  foundation in religious studies, which later influenced much
                  of his poetry and music.
                </p>
                <p>
                  Poverty repeatedly interrupted his formal education. At times,
                  he left school to work in tea stalls, bakeries, and with
                  travelling theatre groups. Despite these challenges, his
                  passion for learning and creativity never faded.
                </p>
              </section>

              <section id="Literary" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold mb-6">Literary Journey</h2>
                <p>
                  Nazrul Islam emerged as a defining literary voice of{" "}
                  <strong>post-Tagore modern Bengali literature</strong>. His
                  poetry, essays, novels, and plays introduced bold themes and a
                  powerful new language.
                </p>
                <p>His writings spoke against:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Colonial oppression and imperialism</li>
                  <li>Social injustice and inequality</li>
                  <li>Religious intolerance and communal division</li>
                </ul>
                <p>
                  Nazrul’s work transformed Bengali poetry with new rhythms,
                  fiery emotion, and a fearless spirit of rebellion.
                </p>
              </section>

              <section id="Revolutionary" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold mb-6">
                  Revolutionary Spirit
                </h2>
                <p>
                  Nazrul was not only a poet but also a revolutionary thinker.
                  His iconic poem <strong>“Bidrohi” (The Rebel)</strong>,
                  published in 1922, made him an instant symbol of resistance.
                </p>
                <p>
                  His fearless writings alarmed the British colonial
                  authorities:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Several of his books were banned.</li>
                  <li>He was imprisoned multiple times.</li>
                </ul>
                <p>
                  Nazrul used literature as a weapon against injustice, firmly
                  believing that art must stand with truth and freedom.
                </p>
              </section>

              <section id="Prison" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold mb-6">Prison Life</h2>
                <p>
                  During imprisonment, Nazrul protested inhumane treatment by
                  launching a <strong>40-day hunger strike</strong>. His health
                  deteriorated, yet his spirit remained unbroken.
                </p>
                <p>
                  At this time, Rabindranath Tagore sent him a telegram that
                  read:
                </p>
                <blockquote className="bg-base-200 p-6 rounded-xl border-l-4 border-primary italic">
                  “Give up the hunger strike. Our literature claims you.”
                </blockquote>
                <p>
                  Even in prison, Nazrul continued to write poems and songs,
                  proving his extraordinary mental strength and dedication.
                </p>
              </section>

              <section id="Musical" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold mb-6">
                  Musical Contribution
                </h2>
                <p>
                  Nazrul Islam made an unparalleled contribution to Bengali
                  music. He composed and wrote{" "}
                  <strong>thousands of songs</strong>, now known as{" "}
                  <strong>Nazrul Geeti</strong>.
                </p>
                <p>Key features of his music:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Fusion of classical ragas with folk traditions</li>
                  <li>
                    Equal mastery of Islamic devotional songs, Shyama Sangeet,
                    bhajans, and kirtans
                  </li>
                  <li>Introduction of the Bengali ghazal</li>
                </ul>
                <p>
                  His musical legacy broke rigid boundaries and brought
                  spiritual harmony into Bengali culture.
                </p>
              </section>

              <section id="Film" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold mb-6">
                  Film, Radio, and Cultural Work
                </h2>
                <p>During the 1930s and 1940s, Nazrul actively worked in:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Film music composition</li>
                  <li>All India Radio</li>
                  <li>Gramophone recordings</li>
                </ul>
                <p>
                  Through radio and recordings, his music reached a wider
                  audience and shaped modern Bengali musical identity.
                </p>
              </section>

              <section id="Tragedy" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold mb-6">
                  Personal Tragedy and Illness
                </h2>
                <p>
                  Nazrul’s personal life was marked by deep sorrow. He endured:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>The death of his mother</li>
                  <li>The loss of his young son Bulbul</li>
                  <li>His wife Pramila Devi’s prolonged illness</li>
                </ul>
                <p>
                  In <strong>1942</strong>, Nazrul fell seriously ill and
                  gradually lost his power of speech. He spent the next{" "}
                  <strong>34 years in silence</strong>, a tragic contrast to his
                  once fiery voice.
                </p>
              </section>

              <section id="Awards" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold mb-6">
                  Awards and Recognition
                </h2>
                <p>
                  Nazrul’s personal life was marked by deep sorrow. He endured:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>The death of his mother</li>
                  <li>The loss of his young son Bulbul</li>
                  <li>His wife Pramila Devi’s prolonged illness</li>
                </ul>
                <p>
                  In <strong>1942</strong>, Nazrul fell seriously ill and
                  gradually lost his power of speech. He spent the next{" "}
                  <strong>34 years in silence</strong>, a tragic contrast to his
                  once fiery voice.
                </p>
              </section>

              <section id="Death" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold mb-6">
                  Final Years and Death
                </h2>
                <p>
                  In <strong>1972</strong>, Nazrul was brought to Bangladesh,
                  where he spent his final years under state care.
                </p>
                <p>
                  He passed away on <strong>29 August 1976</strong> in Dhaka. He
                  was buried with full state honors near the Dhaka University
                  Central Mosque.
                </p>
              </section>

              <section
                id="Timeline"
                className="scroll-mt-24 pt-8 border-t border-base-300"
              >
                <h2 className="text-4xl font-black mb-12">
                  Timeline: Key Milestones
                </h2>
                <div className="space-y-8">
                  {timelineData.map((item, idx) => (
                    <div key={idx} className="flex gap-6 group">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-primary"></div>
                        <div className="w-0.5 h-full bg-base-300 group-last:hidden"></div>
                      </div>
                      <div className="pb-8">
                        <span className="text-primary font-bold text-xl">
                          {item.year}
                        </span>
                        <p className="text-gray-600 mt-1">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </article>
          </main>

          {/* RIGHT SIDEBAR: Portrait */}
          <aside className="lg:w-1/3 order-1 lg:order-3">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://placehold.co/400x500/1e3a8a/white?text=Nazrul+Portrait"
                  alt="Kazi Nazrul Islam Portrait"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              <p className="text-center mt-4 text-sm italic text-gray-500 font-bold">
                The Rebel Poet of Bengal
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
