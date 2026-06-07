import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { canServeAdmin } from "@/lib/config/hosts";
import "./admin.css";

export default async function AdminRootLayout({ children }: { children: ReactNode }) {
  const host = (await headers()).get("host") ?? "";
  if (!canServeAdmin(host)) notFound();

  return <div className="admin-app">{children}</div>;
}
