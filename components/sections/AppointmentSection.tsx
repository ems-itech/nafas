"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Locale } from "@/lib/i18n/locales";
import { getLocalizedValue } from "@/lib/i18n/getLocalizedValue";
import { appointmentSchema, type AppointmentInput } from "@/lib/appointment/schema";
import type { HomepageAppointmentSection } from "@/sanity/types";
import { cn } from "@/lib/utils";

type Props = {
  locale: Locale;
  section: HomepageAppointmentSection;
  serviceOptions: string[];
};

function copy(locale: Locale) {
  return locale === "ar"
    ? {
        name: "الاسم",
        phone: "رقم الهاتف",
        service: "الخدمة",
        date: "التاريخ/الوقت",
        message: "ملاحظة (اختياري)",
        submit: "إرسال الطلب",
        sending: "جاري الإرسال…",
        success: "تم إرسال طلبك بنجاح. سنعاود التواصل معك قريباً.",
        error: "حدث خطأ. الرجاء المحاولة مرة أخرى.",
        selectService: "اختر خدمة",
      }
    : {
        name: "Name",
        phone: "Phone",
        service: "Service",
        date: "Date / time",
        message: "Message (optional)",
        submit: "Submit request",
        sending: "Sending…",
        success: "Request sent successfully. We’ll contact you soon.",
        error: "Something went wrong. Please try again.",
        selectService: "Select a service",
      };
}

export default function AppointmentSection({ locale, section, serviceOptions }: Props) {
  const title = getLocalizedValue(section.title, locale) || "";
  const description = getLocalizedValue(section.description, locale) || "";
  const enabled = section.formEnabled !== false;
  const t = copy(locale);

  const options = useMemo(
    () => serviceOptions.filter((s) => s.trim().length > 0),
    [serviceOptions],
  );

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );

  const form = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { name: "", phone: "", service: "", date: "", message: "" },
    mode: "onTouched",
  });

  async function onSubmit(values: AppointmentInput) {
    setStatus("sending");
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || !json?.ok) throw new Error("bad_response");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (!enabled) return null;

  return (
    <section id="appointment" className="section-spacing">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-foreground mb-5">
            {title}
          </h2>
          {description ? (
            <p className="font-sans text-muted-foreground max-w-xl mx-auto font-light">
              {description}
            </p>
          ) : null}
        </motion.div>

        <div className="max-w-2xl mx-auto bg-card rounded-2xl border border-border p-7 sm:p-9">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label={t.name}
                error={form.formState.errors.name?.message}
              >
                <input
                  {...form.register("name")}
                  className={inputClass(Boolean(form.formState.errors.name))}
                  autoComplete="name"
                />
              </Field>

              <Field
                label={t.phone}
                error={form.formState.errors.phone?.message}
              >
                <input
                  {...form.register("phone")}
                  className={inputClass(Boolean(form.formState.errors.phone))}
                  autoComplete="tel"
                  inputMode="tel"
                />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label={t.service}
                error={form.formState.errors.service?.message}
              >
                <select
                  {...form.register("service")}
                  className={inputClass(Boolean(form.formState.errors.service))}
                >
                  <option value="">{t.selectService}</option>
                  {options.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label={t.date}
                error={form.formState.errors.date?.message}
              >
                <input
                  {...form.register("date")}
                  className={inputClass(Boolean(form.formState.errors.date))}
                  placeholder={locale === "ar" ? "مثال: السبت 5 مساءً" : "e.g. Sat 5pm"}
                />
              </Field>
            </div>

            <Field
              label={t.message}
              error={form.formState.errors.message?.message}
            >
              <textarea
                {...form.register("message")}
                className={cn(
                  inputClass(Boolean(form.formState.errors.message)),
                  "min-h-28 resize-y",
                )}
              />
            </Field>

            <button
              type="submit"
              disabled={status === "sending"}
              className={cn(
                "w-full font-ui bg-primary text-primary-foreground px-8 py-3.5 rounded-full transition-colors duration-200",
                status === "sending" ? "opacity-70 cursor-not-allowed" : "hover:bg-accent",
              )}
            >
              {status === "sending" ? t.sending : t.submit}
            </button>

            {status === "success" ? (
              <p className="text-center font-sans text-sm text-primary">{t.success}</p>
            ) : null}
            {status === "error" ? (
              <p className="text-center font-sans text-sm text-destructive">{t.error}</p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block font-ui text-sm text-foreground/80 mb-2">{label}</span>
      {children}
      {error ? (
        <span className="block mt-2 font-sans text-xs text-destructive">{error}</span>
      ) : null}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-background px-4 py-3 font-sans text-sm outline-none transition-colors",
    hasError ? "border-destructive/60 focus:border-destructive" : "border-border focus:border-primary/50",
  );
}

