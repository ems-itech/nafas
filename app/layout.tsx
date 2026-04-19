import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Tajawal } from "next/font/google";
import { sanityFetch } from "@/sanity/fetch";
import { siteSettingsQuery } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";
import { resolveThemeId } from "@/lib/theme/theme";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nafas Beauty Lounge",
  description: "Nafas Beauty Lounge — A space to breathe.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let themeId: "default" | "warm" = "default";

  try {
    const settings = await sanityFetch<SiteSettings>(siteSettingsQuery);
    themeId = resolveThemeId(settings?.activeTheme);
  } catch {
    // If Sanity is unavailable, we keep the default theme.
  }

  return (
    <html
      lang="en"
      data-theme={themeId === "default" ? undefined : themeId}
      className={`${cormorant.variable} ${montserrat.variable} ${tajawal.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
