import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicesMenu from "@/components/ServicesMenu";

export const metadata: Metadata = {
  title: "Service Menu | Nafas Beauty Lounge",
  description: "Explore the Nafas Beauty Lounge services and price menu.",
  alternates: { canonical: "/en/services" },
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "en") notFound();

  return <ServicesMenu />;
}
