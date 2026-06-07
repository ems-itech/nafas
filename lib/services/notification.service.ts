import { format } from "date-fns";
import { Resend } from "resend";
import { getDb } from "@/lib/db/client";
import { notificationLogs } from "@/lib/db/schema";

type ReservationDetail = {
  reservation: {
    id: string;
    status: string;
    startAt: Date;
    endAt: Date;
    notes: string | null;
  };
  customer: { name: string; phone: string; email: string | null };
  service: { name: string };
};

export async function notifyStaffReservationEvent(
  event: "created" | "updated" | "cancelled",
  detail: ReservationDetail | null,
) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ADMIN_NOTIFICATION_EMAIL;
  const from = process.env.APPOINTMENT_FROM_EMAIL || "Nafas <no-reply@nafasbeautylounge.com>";

  if (!detail) return;

  const subject = `Reservation ${event}: ${detail.customer.name} — ${detail.service.name}`;
  const text = [
    `Reservation ${event}`,
    "",
    `Customer: ${detail.customer.name}`,
    `Phone: ${detail.customer.phone}`,
    `Service: ${detail.service.name}`,
    `Status: ${detail.reservation.status}`,
    `Start: ${format(detail.reservation.startAt, "yyyy-MM-dd HH:mm")}`,
    `End: ${format(detail.reservation.endAt, "yyyy-MM-dd HH:mm")}`,
    detail.reservation.notes ? `Notes: ${detail.reservation.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const db = getDb();

  if (!apiKey || !to) {
    await db.insert(notificationLogs).values({
      reservationId: detail.reservation.id,
      channel: "email",
      status: "skipped",
      subject,
      error: "Email not configured",
    });
    return;
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({ from, to, subject, text });
    await db.insert(notificationLogs).values({
      reservationId: detail.reservation.id,
      channel: "email",
      status: "sent",
      subject,
    });
  } catch (err) {
    await db.insert(notificationLogs).values({
      reservationId: detail.reservation.id,
      channel: "email",
      status: "failed",
      subject,
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
