"use server";

import { revalidatePath } from "next/cache";
import { requireStaffSession } from "@/lib/auth/session";
import { notifyStaffReservationEvent } from "@/lib/services/notification.service";
import {
  cancelReservation,
  createReservation,
  updateReservation,
} from "@/lib/services/reservation.service";
import { reservationSchema } from "@/lib/validators/admin.schema";

function mapError(code: string) {
  switch (code) {
    case "OUTSIDE_AVAILABILITY":
      return "Selected time is outside business hours.";
    case "CONFLICT":
      return "Another reservation overlaps this time slot.";
    case "SERVICE_NOT_FOUND":
      return "Service not found or inactive.";
    default:
      return "Could not save reservation.";
  }
}

function parseReservationForm(formData: FormData) {
  return reservationSchema.safeParse({
    customerId: formData.get("customerId"),
    serviceId: formData.get("serviceId"),
    startAt: formData.get("startAt"),
    status: formData.get("status") || "pending",
    notes: formData.get("notes"),
  });
}

export async function createReservationAction(formData: FormData) {
  const staff = await requireStaffSession();
  const parsed = parseReservationForm(formData);
  if (!parsed.success) return { ok: false as const, error: "Invalid data" };

  try {
    const detail = await createReservation(parsed.data, staff.id);
    await notifyStaffReservationEvent("created", detail);
    revalidatePath("/reservations");
    revalidatePath("/calendar");
    revalidatePath("/dashboard");
    return { ok: true as const, id: detail?.reservation.id };
  } catch (err) {
    return { ok: false as const, error: mapError(String(err).replace("Error: ", "")) };
  }
}

export async function updateReservationAction(id: string, formData: FormData) {
  const staff = await requireStaffSession();
  const parsed = parseReservationForm(formData);
  if (!parsed.success) return { ok: false as const, error: "Invalid data" };

  try {
    const detail = await updateReservation(id, parsed.data, staff.id);
    await notifyStaffReservationEvent("updated", detail);
    revalidatePath("/reservations");
    revalidatePath("/calendar");
    revalidatePath("/dashboard");
    return { ok: true as const };
  } catch (err) {
    return { ok: false as const, error: mapError(String(err).replace("Error: ", "")) };
  }
}

export async function cancelReservationAction(id: string): Promise<void> {
  await requireStaffSession();
  const detail = await cancelReservation(id);
  await notifyStaffReservationEvent("cancelled", detail);
  revalidatePath("/reservations");
  revalidatePath("/calendar");
  revalidatePath("/dashboard");
}
