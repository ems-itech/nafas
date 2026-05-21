"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/${locale}/login`);
    }
  }, [status, router, locale]);

  if (status === "loading") {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome, {session.user?.name || session.user?.email}</p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: `/${locale}/login` })}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="font-semibold text-gray-900">User Info</h2>
              <div className="mt-4 space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Email:</span> {session.user?.email}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Name:</span> {session.user?.name}
                </p>
                {session.user?.id && (
                  <p className="text-gray-700">
                    <span className="font-medium">ID:</span> {session.user.id}
                  </p>
                )}
                {(session.user as any)?.role && (
                  <p className="text-gray-700">
                    <span className="font-medium">Role:</span> {(session.user as any).role}
                  </p>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="font-semibold text-gray-900">Status</h2>
              <p className="text-green-600 mt-4">✓ Successfully logged in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
