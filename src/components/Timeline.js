// src/components/Timeline.js
export default function Timeline() {
  const milestones = [
    {
      year: "1899",
      event: "Born in Churulia, West Bengal",
      desc: "The birth of the 'Dukhu Mia'.",
    },
    {
      year: "1922",
      event: "Publication of 'Bidrohi'",
      desc: "The poem that shook the British Empire.",
    },
    {
      year: "1972",
      event: "Arrival in Bangladesh",
      desc: "Declared as the National Poet.",
    },
  ];

  return (
    <section className="py-20 bg-base-200 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          The Rebel&#39;s Journey
        </h2>
        <ul className="timeline timeline-vertical lg:timeline-horizontal">
          {milestones.map((m, idx) => (
            <li key={idx}>
              <div className="timeline-start font-mono italic">{m.year}</div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-primary"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box shadow-md p-4">
                <span className="font-bold block">{m.event}</span>
                <span className="text-sm opacity-70">{m.desc}</span>
              </div>
              {idx !== milestones.length - 1 && <hr className="bg-primary" />}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
