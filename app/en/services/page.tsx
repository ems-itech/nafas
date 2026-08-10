import type { Metadata } from "next";
import ServicesMenu from "@/components/ServicesMenu";

export const metadata: Metadata = {
  title: "Service Menu | Nafas Beauty Lounge",
  description: "Explore the Nafas Beauty Lounge services and price menu.",
  alternates: { canonical: "/en/services" },
};

export default function ServicesPage() {
  return <ServicesMenu />;
}
