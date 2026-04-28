export default function UpcomingEvents() {
  const events = [
    {
      day: "12",
      month: "MAY",
      title: "Nazrul Birth Anniversary Gala",
      time: "10:00 AM",
      loc: "Main Auditorium",
    },
    {
      day: "05",
      month: "JUN",
      title: "Poetry Recitation Workshop",
      time: "04:00 PM",
      loc: "Seminar Hall",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-10">Upcoming Events</h2>
        <div className="space-y-6">
          {events.map((e, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-base-100 border border-base-200 shadow-sm"
            >
              <div className="flex flex-col items-center justify-center bg-neutral text-neutral-content w-24 h-24 rounded-xl shrink-0">
                <span className="text-3xl font-black">{e.day}</span>
                <span className="text-sm font-bold text-primary">
                  {e.month}
                </span>
              </div>
              <div className="grow text-center sm:text-left">
                <h3 className="text-xl font-bold mb-1">{e.title}</h3>
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm opacity-60">
                  <span className="flex items-center gap-1">🕒 {e.time}</span>
                  <span className="flex items-center gap-1">📍 {e.loc}</span>
                </div>
              </div>
              <button className="btn btn-primary px-8 rounded-full">
                Register
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
