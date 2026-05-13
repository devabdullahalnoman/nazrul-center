import { PublicationManager } from "@/features/dashboard/shared/publications/components/PublicationManager";

export const metadata = {
  title: "Publications | Nazrul Center",
};

export default function PublicationsPage() {
  return (
    <div className="animate-in fade-in duration-700">
      <PublicationManager />
    </div>
  );
}
