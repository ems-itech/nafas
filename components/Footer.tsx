"use client";

import { MapPin, Phone } from "lucide-react";
import type { Messages } from "@/lib/i18n/messages";

type Props = {
  t: Messages;
  phoneHref?: string;
};

export default function Footer({
  t,
  phoneHref = "tel:+962791234567",
}: Props) {
  return (
    <footer id="contact" className="bg-foreground text-primary-foreground section-spacing">
      <div className="container-narrow">
        <div className="grid sm:grid-cols-3 gap-12 sm:gap-8">

          {/* BRAND */}
          <div>
            <h3 className="font-serif text-2xl font-light mb-4">
              Nafas
            </h3>
            <p className="font-sans text-primary-foreground/60 text-sm leading-relaxed font-light">
              {t.footer.tagline1}
              <br />
              {t.footer.tagline2}
            </p>
          </div>

          {/* ADDRESS (STATIC NOW) */}
          <div>
            <h4 className="font-ui text-primary-foreground/80 mb-4">
              {t.footer.visit}
            </h4>

            <div className="flex items-start gap-2 text-primary-foreground/60 text-sm">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <p>{t.footer.location}</p>
            </div>
          </div>

          {/* HOURS */}
          <div>
            <h4 className="font-ui text-primary-foreground/80 mb-4">
              {t.footer.hours}
            </h4>

            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              {t.footer.workingHours}
            </p>

            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 mt-4 text-primary text-sm hover:text-accent transition-colors"
            >
              <Phone size={14} />
              {t.footer.call}
            </a>
          </div>

        </div>

        <div className="mt-20 pt-6 border-t border-primary-foreground/10 text-center">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Nafas Beauty Lounge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}