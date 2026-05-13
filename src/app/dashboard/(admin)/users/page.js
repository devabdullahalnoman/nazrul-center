import { UserManagementManager } from "@/features/dashboard/admin/components/UserManagementManager";

export const metadata = {
  title: "User Management | Nazrul Center",
  description: "Administrative console for managing user roles and profiles.",
};

export default function UserManagementPage() {
  return (
    <div className="animate-in fade-in duration-700">
      <UserManagementManager />
    </div>
  );
}
