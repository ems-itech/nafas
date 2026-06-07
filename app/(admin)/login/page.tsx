import { redirect } from "next/navigation";
import { getStaffSession } from "@/lib/auth/session";
import { LoginForm } from "@/components/admin/LoginForm";

export default async function LoginPage() {
  const user = await getStaffSession();
  if (user) redirect("/dashboard");

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <LoginForm />
    </div>
  );
}
