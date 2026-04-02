"use client";

import { MapPin, Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n/locales";
import type { Messages } from "@/lib/i18n/messages";
import type { SiteSettings } from "@/sanity/types";

type Props = {
  t: Messages;
  settings?: SiteSettings | null;
  phoneHref?: string;
};

export default function Footer({
  t,
  settings,
  phoneHref = "tel:+962791234567",
}: Props) {
  const address = settings?.address?.trim();
  const hours = settings?.hours?.trim();
  const phone = settings?.phone?.trim();
  const effectivePhoneHref = phone ? `tel:${phone.replace(/\s+/g, "")}` : phoneHref;

  return (
    <footer id="contact" className="bg-foreground text-primary-foreground section-spacing">
      <div className="container-narrow">
        <div className="grid sm:grid-cols-3 gap-12 sm:gap-8">
          <div>
            <h3 className="font-serif text-2xl font-light mb-4">Nafas</h3>
            <p className="font-sans text-primary-foreground/60 text-sm leading-relaxed font-light">
              {t.footer.tagline1}
              <br />
              {t.footer.tagline2}
            </p>
          </div>
          <div>
            <h4 className="font-ui text-primary-foreground/80 mb-4">{t.footer.visit}</h4>
            <div className="flex items-start gap-2 text-primary-foreground/60 text-sm leading-relaxed font-sans font-light">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <p>{address || "—"}</p>
            </div>
          </div>
          <div>
            <h4 className="font-ui text-primary-foreground/80 mb-4">{t.footer.hours}</h4>
            <p className="font-sans text-primary-foreground/60 text-sm leading-relaxed font-light whitespace-pre-line">
              {hours || "—"}
            </p>
            <a
              href={effectivePhoneHref}
              className="inline-flex items-center gap-2 mt-4 font-sans text-primary text-sm hover:text-accent transition-colors"
            >
              <Phone size={14} />
              {phone || t.footer.call}
            </a>
          </div>
        </div>
        <div className="mt-20 pt-6 border-t border-primary-foreground/10 text-center">
          <p className="font-ui text-primary-foreground/40 text-xs">
            © {new Date().getFullYear()} Nafas Beauty Lounge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

