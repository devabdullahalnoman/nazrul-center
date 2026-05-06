export default function StatCard({ title, value, icon, color = "text-gray-900", mini = false }) {
  if (mini) {
    return (
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-[#946659]/20 transition-all group">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 group-hover:text-[#946659]">
          {title}
        </p>
        <p className={`text-2xl font-serif font-bold ${color}`}>
          {value ?? 0}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#946659]/5 hover:border-[#946659]/30 transition-all duration-500 group">
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#FDFCFB] flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          {title}
        </p>
      </div>
      <p className={`text-4xl font-serif font-bold tracking-tight ${color}`}>
        {typeof value === 'number' && title.includes('Revenue') ? `$${value.toFixed(2)}` : (value ?? 0)}
      </p>
      <div className="w-10 h-1.5 bg-[#946659]/10 rounded-full mt-3 group-hover:w-20 group-hover:bg-[#946659] transition-all duration-700"></div>
    </div>
  );
}