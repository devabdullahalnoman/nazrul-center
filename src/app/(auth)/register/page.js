import { RegisterForm } from "@/features/auth/components/RegisterForm";

export const metadata = { title: "Register | Nazrul Center" };

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-nazrul-base p-4 py-20">
      <RegisterForm />
    </div>
  );
}
