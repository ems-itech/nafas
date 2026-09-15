"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n/locales";
import type { SiteSettings } from "@/sanity/types";
import type { SectionOf } from "./content";
import { serviceCards, text } from "./content";
import Icon from "./Icon";
import styles from "../FigmaHomePage.module.css";

export default function HomeAppointmentSection({ locale, section, services, settings }: { locale: Locale; section?: SectionOf<"appointmentSection">; services?: SectionOf<"servicesSection">; settings?: SiteSettings | null }) {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
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
          <dl><div><dt>Address</dt><dd>{address}</dd></div><div><dt>Hours</dt><dd>{hours}</dd></div><div><dt>Contact</dt><dd>{phone} · {section?.email || "hello@nafas.jo"}</dd></div></dl>
        </div>
        {section?.formEnabled !== false && <form className={styles.contactForm} onSubmit={submitAppointment}>
          <div className={styles.formRow}><label>Name<input name="name" placeholder="Your name" minLength={2} required /></label><label>Phone<input name="phone" placeholder="+962" minLength={6} required /></label></div>
          <label>Service<span className={styles.selectWrap}><select name="service" defaultValue="" required><option value="" disabled>Select service</option>{choices.map((choice) => <option key={choice.name}>{choice.name}</option>)}</select><Icon src="/images/figma-nafas/icon-chevron-form.svg" /></span></label>
          <label>Anything we should know?<textarea name="message" placeholder="Preferred day, sensitivities, first visit…" /></label>
          <button type="submit" disabled={formState === "sending"}>{formState === "sending" ? "Sending…" : "Send Request"}</button>
          {formState === "sent" && <p className={styles.formMessage}>Your request has been sent.</p>}
          {formState === "error" && <p className={styles.formError}>Please try again or call us directly.</p>}
        </form>}
      </div>
    </section>
  );
}
