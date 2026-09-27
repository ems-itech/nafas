"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n/locales";
import type { SiteSettings } from "@/sanity/types";
import type { SectionOf } from "./content";
import { serviceCards, text } from "./content";
import Icon from "./Icon";
import styles from "../FigmaHomePage.module.css";

const CONTACT_COPY: Record<Locale, {
  address: string;
  hours: string;
  contact: string;
  name: string;
  namePlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  service: string;
  servicePlaceholder: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  sent: string;
  error: string;
}> = {
  en: {
    address: "Address",
    hours: "Hours",
    contact: "Contact",
    name: "Name",
    namePlaceholder: "Your name",
    phone: "Phone",
    phonePlaceholder: "+962",
    service: "Service",
    servicePlaceholder: "Select service",
    message: "Anything we should know?",
    messagePlaceholder: "Preferred day, sensitivities, first visit…",
    submit: "Send Request",
    sending: "Sending…",
    sent: "Your request has been sent.",
    error: "Please try again or call us directly.",
  },
  ar: {
    address: "العنوان",
    hours: "ساعات العمل",
    contact: "التواصل",
    name: "الاسم",
    namePlaceholder: "الاسم الكامل",
    phone: "رقم الهاتف",
    phonePlaceholder: "+962",
    service: "الخدمة",
    servicePlaceholder: "اختر الخدمة",
    message: "هل هناك شيء ينبغي أن نعرفه؟",
    messagePlaceholder: "اليوم المفضل، الحساسية، الزيارة الأولى…",
    submit: "إرسال الطلب",
    sending: "جارٍ الإرسال…",
    sent: "تم إرسال طلبك بنجاح.",
    error: "يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.",
  },
};

export default function HomeAppointmentSection({ locale, section, services, settings }: { locale: Locale; section?: SectionOf<"appointmentSection">; services?: SectionOf<"servicesSection">; settings?: SiteSettings | null }) {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const copy = CONTACT_COPY[locale];
  const phone = settings?.contact?.phone?.trim() || "+962790077730";
  const address = text(settings?.contact?.address, locale, "Abdoun, Amman, Jordan");
  const hours = text(settings?.contact?.hours, locale, "Sat–Thu · 10:00 – 20:00");
  const choices = serviceCards(services, locale);

  async function submitAppointment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setFormState("sending");
    try {
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          services: [data.get("service")],
          date: "Flexible",
          message: data.get("message"),
        }),
      });
      if (!response.ok) throw new Error("request_failed");
      form.reset();
      setFormState("sent");
    } catch {
      setFormState("error");
    }
  }

  return (
    <section id="contact" className={styles.contactSection}>
      <Image src="/images/figma-nafas/contact-floral.png" alt="" width={208} height={254} className={styles.contactFloralLeft} />
      <Image src="/images/figma-nafas/contact-floral.png" alt="" width={208} height={254} className={styles.contactFloralRight} />
      <div className={styles.contactPanel}>
        <div className={styles.contactCopy}>
          <h2>{text(section?.title, locale, "Come breathe with us in Abdoun")}</h2>
          <p>{text(section?.description, locale, "A space designed to feel less like a clinic and more like the calmest room in someone's home.")}</p>
          <dl><div><dt>{copy.address}</dt><dd>{address}</dd></div><div><dt>{copy.hours}</dt><dd>{hours}</dd></div><div><dt>{copy.contact}</dt><dd><bdi dir="ltr">{phone}</bdi> · <bdi dir="ltr">{section?.email || "hello@nafas.jo"}</bdi></dd></div></dl>
        </div>
        {section?.formEnabled !== false && <form className={`${styles.contactForm} ${locale === "ar" ? styles.contactFormRtl : ""}`} onSubmit={submitAppointment}>
          <div className={styles.formRow}><label>{copy.name}<input name="name" placeholder={copy.namePlaceholder} minLength={2} required /></label><label>{copy.phone}<input name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" placeholder={copy.phonePlaceholder} minLength={6} required /></label></div>
          <label>{copy.service}<span className={styles.selectWrap}><select name="service" defaultValue="" required><option value="" disabled>{copy.servicePlaceholder}</option>{choices.map((choice) => <option key={choice.name}>{choice.name}</option>)}</select><Icon src="/images/figma-nafas/icon-chevron-form.svg" /></span></label>
          <label>{copy.message}<textarea name="message" placeholder={copy.messagePlaceholder} /></label>
          <button type="submit" disabled={formState === "sending"}>{formState === "sending" ? copy.sending : copy.submit}</button>
          {formState === "sent" && <p className={styles.formMessage}>{copy.sent}</p>}
          {formState === "error" && <p className={styles.formError}>{copy.error}</p>}
        </form>}
      </div>
    </section>
  );
}
