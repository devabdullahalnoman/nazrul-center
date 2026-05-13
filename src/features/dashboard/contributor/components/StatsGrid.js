import { StatCard } from "@/features/dashboard/shared/components/StatCard";

export function StatsGrid({ stats }) {
  const cards = [
    { title: "Global Orders", value: stats.totalOrders, icon: "📦" },
    { title: "My Completed", value: stats.completedByMe, icon: "✅" },
    { title: "Pending Pool", value: stats.pendingOrders, icon: "📥" },
    { title: "Wishlists", value: stats.wishlistCount, icon: "✨" },
    { title: "Inventory Items", value: stats.inventoryItems, icon: "🏺" },
    { title: "Publications", value: stats.publicationCount, icon: "📚" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <StatCard key={i} {...card} valueColorClass="text-nazrul-ink" />
      ))}
    </div>
  );
}
