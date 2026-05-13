/**
 * Modular Category Button
 * Features: Zoom animation & Rebel Red hover state
 */
export default function CategoryButton({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest 
        transition-all duration-500 border transform
        ${isActive 
          ? "bg-nazrul-terracotta text-nazrul-base border-nazrul-terracotta shadow-lg scale-105" 
          : "bg-transparent text-gray-500 border-nazrul-sand hover:border-nazrul-crimson hover:text-nazrul-crimson hover:scale-110 hover:shadow-md active:scale-95"
        }
      `}
    >
      {label}
    </button>
  );
}