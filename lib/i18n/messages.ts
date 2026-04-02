import type { Locale } from "./locales";

export type Messages = {
  nav: { services: string; about: string; contact: string; callNow: string };
  hero: { headline1: string; headline2: string; sub: string; cta: string; discover: string };
  services: { title: string; subtitle: string };
  about: { title1: string; title2: string; p1: string; p2: string };
  footer: { visit: string; hours: string; tagline1: string; tagline2: string; call: string };
};

export const messages: Record<Locale, Messages> = {
  en: {
    nav: { services: "Services", about: "About", contact: "Contact", callNow: "Call Now" },
    hero: {
      headline1: "A space",
      headline2: "to breathe.",
      sub: "Nafas Beauty Lounge — where tranquility meets precision care.",
      cta: "Call Now",
      discover: "Discover More",
    },
    services: {
      title: "Our Services",
      subtitle:
        "Each treatment is designed as a moment of restoration — unhurried, intentional, and tailored to you.",
    },
    about: {
      title1: "Rooted in care,",
      title2: "guided by calm.",
      p1:
        "Nafas — meaning “breath” in Arabic — is built on the belief that self‑care should feel like a return to yourself. We created a space where every detail invites stillness.",
      p2:
        "Our team brings years of expertise and a shared philosophy — that beauty begins with presence, and care begins with listening.",
    },
    footer: {
      visit: "Visit Us",
      hours: "Hours",
      tagline1: "Beauty Lounge",
      tagline2: "A space to breathe.",
      call: "Call",
    },
  },
  ar: {
    nav: { services: "الخدمات", about: "من نحن", contact: "تواصل", callNow: "اتصل الآن" },
    hero: {
      headline1: "مساحة",
      headline2: "لتتنفس.",
      sub: "نفَس بيوتي لاونج — حيث يلتقي الهدوء بالعناية الدقيقة.",
      cta: "اتصل الآن",
      discover: "اكتشف المزيد",
    },
    services: {
      title: "خدماتنا",
      subtitle: "كل جلسة صُمّمت لتكون لحظة استعادة — بهدوء، وبعناية، ومناسبة لك.",
    },
    about: {
      title1: "متجذّرون في العناية،",
      title2: "ومسترشدون بالهدوء.",
      p1:
        "نفَس — ومعناها “الأنفاس” — يقوم على فكرة أن العناية بالنفس يجب أن تشعرك بالعودة إلى ذاتك. صنعنا مساحة تدعو للسكينة في كل تفصيل.",
      p2:
        "فريقنا يجمع الخبرة مع فلسفة واحدة: أن الجمال يبدأ بالحضور، وأن العناية تبدأ بالإنصات.",
    },
    footer: {
      visit: "زورونا",
      hours: "ساعات العمل",
      tagline1: "صالون تجميل",
      tagline2: "مساحة لتتنفس.",
      call: "اتصل",
    },
  },
};

