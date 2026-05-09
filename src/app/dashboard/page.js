"use client";
import { useAuth } from "@/hooks/useAuth";
import AdminView from "@/components/dashboard/admin/AdminView";
import ContributorView from "@/components/dashboard/contributor/ContributorView";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (!user) return null;

  return (
    <div className="animate-in fade-in duration-500">
      {user.role === "admin" && <AdminView />}
      {user.role === "contributor" && <ContributorView user={user} />}
      {user.role !== "admin" && user.role !== "contributor" && (
        <div>Standard User Dashboard</div>
      )}
    </div>
  );
}
