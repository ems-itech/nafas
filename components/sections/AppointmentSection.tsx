"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Locale } from "@/lib/i18n/locales";
import { getLocalizedValue } from "@/lib/i18n/getLocalizedValue";
import {
  appointmentSchema,
  type AppointmentInput,
} from "@/lib/appointment/schema";
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
        services: "الخدمات",
        date: "التاريخ/الوقت",
        message: "ملاحظة (اختياري)",
        submit: "إرسال الطلب",
        sending: "جاري الإرسال…",
        success:
          "تم إرسال طلبك بنجاح. سنعاود التواصل معك قريباً.",
        error: "حدث خطأ. الرجاء المحاولة مرة أخرى.",
      }
    : {
        name: "Name",
        phone: "Phone",
        services: "Services",
        date: "Date / time",
        message: "Message (optional)",
        submit: "Submit request",
        sending: "Sending…",
        success:
          "Request sent successfully. We’ll contact you soon.",
        error: "Something went wrong. Please try again.",
      };
}

export default function AppointmentSection({
  locale,
  section,
  serviceOptions,
}: Props) {
  const title = getLocalizedValue(section.title, locale) || "";
  const description =
    getLocalizedValue(section.description, locale) || "";
  const enabled = section.formEnabled !== false;
  const t = copy(locale);

  const options = useMemo(
    () => serviceOptions.filter((s) => s.trim().length > 0),
    [serviceOptions],
  );

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const form = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      phone: "",
      services: [],
      date: "",
      message: "",
    },
    mode: "onTouched",
  });

  async function onSubmit(values: AppointmentInput) {
    setStatus("sending");

    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.ok) {
        throw new Error("bad_response");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (!enabled) return null;

  return (
    <section id="appointment" className="section-spacing bg-secondary">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-foreground mb-5">
            {title}
          </h2>

          {description && (
            <p className="text-muted-foreground max-w-xl mx-auto font-light">
              {description}
            </p>
          )}
        </motion.div>

        <div className="max-w-2xl mx-auto bg-card rounded-2xl border border-border p-7 sm:p-9">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* NAME + PHONE */}
            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label={t.name}
                error={form.formState.errors.name?.message}
              >
                <input
                  {...form.register("name")}
                  className={inputClass(
                    Boolean(form.formState.errors.name),
                  )}
                />
              </Field>

              <Field
                label={t.phone}
                error={form.formState.errors.phone?.message}
              >
                <input
                  {...form.register("phone")}
                  className={inputClass(
                    Boolean(form.formState.errors.phone),
                  )}
                />
              </Field>
            </div>

            {/* SERVICES */}
            <Field
              label={t.services}
              error={form.formState.errors.services?.message}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {options.map((service) => (
                  <label
                    key={service}
                    className="flex items-center gap-3 cursor-pointer rounded-xl border border-border p-3 hover:bg-muted/40 transition"
                  >
                    <input
                      type="checkbox"
                      value={service}
                      {...form.register("services")}
                      className="accent-primary"
                    />
                    <span className="text-sm font-medium text-foreground">
                      {service}
                    </span>
                  </label>
                ))}
              </div>
            </Field>

            {/* DATE */}
            <Field
              label={t.date}
              error={form.formState.errors.date?.message}
            >
              <input
                {...form.register("date")}
                className={inputClass(
                  Boolean(form.formState.errors.date),
                )}
              />
            </Field>

            {/* MESSAGE */}
            <Field
              label={t.message}
              error={form.formState.errors.message?.message}
            >
              <textarea
                {...form.register("message")}
                className={cn(
                  inputClass(
                    Boolean(form.formState.errors.message),
                  ),
                  "min-h-28",
                )}
              />
            </Field>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={status === "sending"}
              className={cn(
                "w-full bg-primary text-primary-foreground py-3.5 rounded-full font-medium transition",
                status === "sending" && "opacity-60",
              )}
            >
              {status === "sending" ? t.sending : t.submit}
            </button>

            {/* STATUS */}
            {status === "success" && (
              <p className="text-center text-sm text-green-600">
                {t.success}
              </p>
            )}

            {status === "error" && (
              <p className="text-center text-sm text-red-500">
                {t.error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------------- UI HELPERS ---------------- */

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
      <span className="block text-sm font-semibold text-foreground mb-2">
        {label}
      </span>

      {children}

      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl border px-4 py-3 text-sm outline-none transition",
    hasError
      ? "border-red-500 focus:border-red-500"
      : "border-border focus:border-primary",
  );
}