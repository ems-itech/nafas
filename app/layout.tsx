import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Tajawal, Geist } from "next/font/google";
import { sanityFetch } from "@/sanity/fetch";
import { siteSettingsQuery } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";
import { resolveThemeId } from "@/lib/theme/theme";
import { AuthProvider } from "./providers";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
      className={cn("h-full", "antialiased", cormorant.variable, montserrat.variable, tajawal.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
