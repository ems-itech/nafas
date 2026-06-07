import { redirect } from "next/navigation";
import { getStaffSession } from "@/lib/auth/session";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getStaffSession();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar userName={user.name} />
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
