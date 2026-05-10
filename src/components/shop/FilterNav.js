export default function FilterNav({
  categories,
  activeFilter,
  onFilterChange,
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-16">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onFilterChange(cat)}
          className={`btn btn-sm md:btn-md rounded-full px-8 ${
            activeFilter === cat
              ? "btn-primary shadow-lg"
              : "btn-ghost border-base-300"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
