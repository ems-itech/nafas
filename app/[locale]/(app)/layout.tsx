import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string } | Promise<{ locale: string }>;
}) {
  const resolved = await Promise.resolve(params);
  const locale = resolved.locale || "en";
  const session = await getServerSession(authConfig);

  if (!session) redirect(`/${locale}/login`);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Nafas</h2>
          <p className="text-xs text-gray-400 mt-1">{session.user?.name}</p>
          <p className="text-xs text-gray-500">{(session.user as any)?.role}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link
            href={`/${locale}/dashboard`}
            className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href={`/${locale}/staff`}
            className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            Staff
          </Link>
          <Link
            href={`/${locale}/clients`}
            className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            Clients
          </Link>
          {(session.user as any)?.role === "admin" && (
            <Link
              href={`/${locale}/dashboard/admin`}
              className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors text-red-400"
            >
              Admin Panel page
            </Link>
            
          )}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 overflow-auto">
        {children}
      </main>
    </div>
  );
}