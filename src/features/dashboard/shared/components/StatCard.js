export function StatCard({
  title,
  value,
  icon,
  colorClass = "text-nazrul-ink",
  mini = false,
}) {
  if (mini) {
    return (
      <div className="bg-white p-4 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm">
        <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
          {title}
        </span>
        <span className="font-bold text-nazrul-ink">{value}</span>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm flex flex-col gap-2 transition-all hover:shadow-md">
      <div className="flex justify-between items-center">
        <span className="text-2xl">{icon}</span>
        <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest bg-gray-50 px-2 py-1 rounded-md">
          Live
        </span>
      </div>
      <div className="mt-2">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-tighter">
          {title}
        </p>
        <p className={`text-3xl font-black ${colorClass}`}>
          {typeof value === "number" && title.includes("Revenue")
            ? `$${value.toLocaleString()}`
            : value}
        </p>
      </div>
    </div>
  );
}
