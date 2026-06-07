import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { canServeMarketing } from "@/lib/config/hosts";

export default async function StudioLayout({ children }: { children: ReactNode }) {
  const host = (await headers()).get("host") ?? "";
  if (!canServeMarketing(host)) notFound();
  return children;
}
