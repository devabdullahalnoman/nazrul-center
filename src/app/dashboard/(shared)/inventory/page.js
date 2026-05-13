import { InventoryManager } from "@/features/dashboard/shared/inventory/components/InventoryManager";

export const metadata = {
  title: "Inventory | Nazrul Center",
};

export default function InventoryPage() {
  return (
    <div className="animate-in fade-in duration-700">
      <InventoryManager />
    </div>
  );
}
