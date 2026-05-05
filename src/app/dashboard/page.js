"use client";
import { useAuth } from "@/hooks/useAuth";
import AdminView from "@/components/dashboard/admin/AdminView";
import ContributorView from "@/components/dashboard/contributor/ContributorView";
import UserView from "@/components/dashboard/user/UserView";

export default function DashboardPage() {
  const { user } = useAuth();
  if (!user) return null;

  switch (user.role) {
    case "admin":
      return <AdminView user={user} />;
    case "contributor":
      return <ContributorView user={user} />;
    default:
      return <UserView user={user} />;
  }
}
