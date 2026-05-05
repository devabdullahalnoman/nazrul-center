export default function StatCard({ title, value, icon, color = "text-black" }) {
  return (
    <div className="bg-white border-4 border-black p-5 rounded-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between h-36">
      <div className="flex justify-between items-start">
        <div className="bg-gray-100 p-2 rounded-xl border-2 border-black text-2xl">
          {icon}
        </div>
        <div className="text-[9px] font-black uppercase text-gray-400 tracking-widest text-right leading-tight">
          {title}
        </div>
      </div>

      <div>
        <p
          className={`text-3xl font-black italic tracking-tighter leading-none ${color}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
