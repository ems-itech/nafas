"use client";

import { MapPin, Phone } from "lucide-react";
import type { Messages } from "@/lib/i18n/messages";
import type { Locale } from "@/lib/i18n/locales";
import type { SiteSettings } from "@/sanity/types";

type Props = {
  t: Messages;
  locale: Locale;
  settings?: SiteSettings | null;
  phoneHref?: string;
};

// ✅ Improved localization helper (no empty string bugs)
function pickLocalized(
  locale: Locale,
  field?: { en?: string; ar?: string },
  fallback = "",
) {
  if (!field) return fallback;

  if (locale === "ar") {
    return field.ar?.trim() ? field.ar : field.en?.trim() || fallback;
  }

  return field.en?.trim() ? field.en : field.ar?.trim() || fallback;
}

export default function Footer({ t, locale, settings, phoneHref }: Props) {
 
  const phone = settings?.phone || "+962791234567";
  const href = phoneHref || `tel:${phone}`;

  
  console.log("locale:", locale);
  console.log("settings:", settings);

  return (
    <footer
      id="contact"
      className="bg-foreground text-primary-foreground section-spacing"
    >
      <div className="container-narrow">
        <div className="grid sm:grid-cols-3 gap-12 sm:gap-8">
          {/* BRAND */}
          <div>
            <h3 className="font-serif text-4xl font-light mb-4">Nafas</h3>

            <p className="font-sans text-primary-foreground/60 text-sm leading-relaxed font-light">
              {pickLocalized(locale, settings?.nafas, t.footer.tagline1)}
            </p>
          </div>

          {/* ADDRESS */}
          <div>
            <h4 className="font-serif text-4xl font-light mb-4">
              {t.footer.visit}
            </h4>

            <div className="flex items-start gap-2 text-primary-foreground/60 text-sm leading-relaxed">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <p>
                {pickLocalized(locale, settings?.address, t.footer.location)}
              </p>
            </div>
          </div>

          {/* HOURS */}
          <div>
  <h4 className="font-serif text-4xl font-light mb-4">
    {t.footer.hours}
  </h4>

  <p className="font-sans text-primary-foreground/60 text-sm leading-relaxed font-light">
    {pickLocalized(locale, settings?.hours, t.footer.workingHours)}
  </p>

  <a
    href={href}
    className="mt-4 block font-sans text-sm text-primary hover:text-accent transition-colors"
  >
    {settings?.phone || "+962791234567"}
  </a>
</div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="mt-20 pt-6 border-t border-primary-foreground/10 text-center">
          <p className="text-base text-primary-foreground/40">
            © {new Date().getFullYear()} Nafas Beauty Lounge. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
