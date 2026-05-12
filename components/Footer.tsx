"use client";

import { MapPin, Phone } from "lucide-react";
import type { Messages } from "@/lib/i18n/messages";
import type { SiteSettings } from "@/sanity/types";
import type { Locale } from "@/lib/i18n/locales";
import { getLocalizedValue } from "@/lib/i18n/getLocalizedValue";

type Props = {
  locale: Locale;
  t: Messages;
  settings?: SiteSettings | null;
  phoneHref?: string;
};

export default function Footer({
  locale,
  t,
  settings,
  phoneHref = "tel:+962791234567",
}: Props) {
  const address =
    getLocalizedValue(settings?.contact?.address, locale)?.trim();

  const hours =
    getLocalizedValue(settings?.contact?.hours, locale)?.trim();

  const phone = settings?.contact?.phone?.trim();

  const effectivePhoneHref = phone
    ? `tel:${phone.replace(/\s+/g, "")}`
    : phoneHref;

  /* ---------------------------
     BRAND FIX (IMAGE)
  ---------------------------- */
  const brandImage = settings?.header?.brand?.asset?.url;
  const brandAlt =
    getLocalizedValue(settings?.header?.brand?.alt, locale) || "Brand";

  const brandFallback = "Nafas";

  const social =
    settings?.footer?.social?.filter((x) => x?.url && x?.label) ?? [];

  return (
    <footer
      id="contact"
      className="bg-foreground text-primary-foreground section-spacing"
    >
      <div className="container-narrow">
        <div className="grid sm:grid-cols-3 gap-12 sm:gap-8">

          {/* ---------------- BRAND SECTION ---------------- */}
          <div>
            <a href="#hero" className="mb-4">
              {brandImage ? (
                <img
                  src={brandImage}
                  alt={brandAlt}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <h3 className="font-serif text-2xl font-light">
                  {brandFallback}
                </h3>
              )}
            </a>

            <p className="font-sans text-primary-foreground/60 text-sm leading-relaxed font-light">
              {getLocalizedValue(settings?.footer?.tagline, locale) ? (
                <span className="whitespace-pre-line">
                  {getLocalizedValue(settings?.footer?.tagline, locale)}
                </span>
              ) : (
                <>
                  {t.footer.tagline1}
                  <br />
                  {t.footer.tagline2}
                </>
              )}
            </p>

            {social.length ? (
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                {social.map((item) => (
                  <a
                    key={item.url}
                    href={item.url!}
                    target="_blank"
                    rel="noreferrer"
                    className="font-ui text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {/* ---------------- ADDRESS ---------------- */}
          <div>
            <h4 className="font-ui text-primary-foreground/80 mb-4">
              {t.footer.visit}
            </h4>

            <div className="flex items-start gap-2 text-primary-foreground/60 text-sm leading-relaxed font-sans font-light">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <p>{address || "—"}</p>
            </div>
          </div>

          {/* ---------------- HOURS + PHONE ---------------- */}
          <div>
            <h4 className="font-ui text-primary-foreground/80 mb-4">
              {t.footer.hours}
            </h4>

            <p className="font-sans text-primary-foreground/60 text-sm leading-relaxed font-light whitespace-pre-line">
              {hours || "—"}
            </p>

            <a
              href={effectivePhoneHref}
              className="inline-flex items-center gap-2 mt-4 font-sans text-primary text-sm hover:text-accent transition-colors"
            >
              <Phone size={14} />
              {phone ? (
                <span
                  dir="ltr"
                  className="tabular-nums"
                  style={{ unicodeBidi: "plaintext" }}
                >
                  {phone}
                </span>
              ) : (
                t.footer.call
              )}
            </a>
          </div>
        </div>

        {/* ---------------- COPYRIGHT ---------------- */}
        <div className="mt-20 pt-6 border-t border-primary-foreground/10 text-center">
          <p className="font-ui text-primary-foreground/40 text-xs">
            © {new Date().getFullYear()} Nafas Beauty Lounge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}