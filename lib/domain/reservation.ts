export const RESERVATION_STATUSES = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
] as const;

export type ReservationStatus = (typeof RESERVATION_STATUSES)[number];

export type StaffRole = "admin" | "staff";

export type NotificationChannel = "email";
export type NotificationStatus = "sent" | "failed" | "skipped";
