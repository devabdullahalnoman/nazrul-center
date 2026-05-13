import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata = { title: "Login | Nazrul Center" };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-nazrul-base p-4">
      <LoginForm />
    </div>
  );
}
