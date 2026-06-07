import { addMinutes, format, getDay, parseISO } from "date-fns";
import { and, asc, eq, gt, gte, lt, ne } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import {
  availabilityExceptions,
  availabilityRules,
  customers,
  reservations,
  services,
} from "@/lib/db/schema";
import type { ReservationInput } from "@/lib/validators/admin.schema";

function parseTimeOnDate(date: Date, time: string) {
  const [h, m] = time.split(":").map(Number);
  const d = new Date(date);
  d.setHours(h ?? 0, m ?? 0, 0, 0);
  return d;
}

export async function isWithinAvailability(startAt: Date, endAt: Date) {
  const db = getDb();
  const dateKey = format(startAt, "yyyy-MM-dd");
  const exception = await db.query.availabilityExceptions.findFirst({
    where: eq(availabilityExceptions.date, dateKey),
  });

  if (exception?.isClosed) return false;

  let windowStart: Date;
  let windowEnd: Date;

  if (exception?.startTime && exception?.endTime) {
    windowStart = parseTimeOnDate(startAt, exception.startTime);
    windowEnd = parseTimeOnDate(startAt, exception.endTime);
  } else {
    const day = getDay(startAt);
    const rule = await db.query.availabilityRules.findFirst({
      where: and(eq(availabilityRules.dayOfWeek, day), eq(availabilityRules.isActive, true)),
    });
    if (!rule) return false;
    windowStart = parseTimeOnDate(startAt, rule.startTime);
    windowEnd = parseTimeOnDate(startAt, rule.endTime);
  }

  return startAt >= windowStart && endAt <= windowEnd;
}

export async function hasReservationConflict(
  startAt: Date,
  endAt: Date,
  excludeId?: string,
) {
  const db = getDb();
  const conditions = [
    ne(reservations.status, "cancelled"),
    lt(reservations.startAt, endAt),
    gt(reservations.endAt, startAt),
  ];
  if (excludeId) {
    conditions.push(ne(reservations.id, excludeId));
  }
  const rows = await db
    .select({ id: reservations.id })
    .from(reservations)
    .where(and(...conditions))
    .limit(1);
  return rows.length > 0;
}

export async function listReservations() {
  const db = getDb();
  return db
    .select({
      reservation: reservations,
      customer: customers,
      service: services,
    })
    .from(reservations)
    .innerJoin(customers, eq(reservations.customerId, customers.id))
    .innerJoin(services, eq(reservations.serviceId, services.id))
    .orderBy(asc(reservations.startAt));
}

export async function getReservation(id: string) {
  const db = getDb();
  const rows = await db
    .select({
      reservation: reservations,
      customer: customers,
      service: services,
    })
    .from(reservations)
    .innerJoin(customers, eq(reservations.customerId, customers.id))
    .innerJoin(services, eq(reservations.serviceId, services.id))
    .where(eq(reservations.id, id))
    .limit(1);
  return rows[0] ?? null;
}

export async function listReservationsInRange(from: Date, to: Date) {
  const db = getDb();
  return db
    .select({
      reservation: reservations,
      customer: customers,
      service: services,
    })
    .from(reservations)
    .innerJoin(customers, eq(reservations.customerId, customers.id))
    .innerJoin(services, eq(reservations.serviceId, services.id))
    .where(and(gte(reservations.startAt, from), lt(reservations.startAt, to)))
    .orderBy(asc(reservations.startAt));
}

export async function createReservation(input: ReservationInput, staffUserId?: string) {
  const db = getDb();
  const service = await db.query.services.findFirst({
    where: eq(services.id, input.serviceId),
  });
  if (!service || !service.isActive) {
    throw new Error("SERVICE_NOT_FOUND");
  }

  const endAt = addMinutes(input.startAt, service.durationMinutes);

  if (!(await isWithinAvailability(input.startAt, endAt))) {
    throw new Error("OUTSIDE_AVAILABILITY");
  }
  if (await hasReservationConflict(input.startAt, endAt)) {
    throw new Error("CONFLICT");
  }

  const [row] = await db
    .insert(reservations)
    .values({
      customerId: input.customerId,
      serviceId: input.serviceId,
      staffUserId: staffUserId ?? null,
      startAt: input.startAt,
      endAt,
      status: input.status,
      notes: input.notes || null,
    })
    .returning();

  return getReservation(row!.id);
}

export async function updateReservation(
  id: string,
  input: ReservationInput,
  staffUserId?: string,
) {
  const db = getDb();
  const service = await db.query.services.findFirst({
    where: eq(services.id, input.serviceId),
  });
  if (!service || !service.isActive) {
    throw new Error("SERVICE_NOT_FOUND");
  }

  const endAt = addMinutes(input.startAt, service.durationMinutes);

  if (!(await isWithinAvailability(input.startAt, endAt))) {
    throw new Error("OUTSIDE_AVAILABILITY");
  }
  if (await hasReservationConflict(input.startAt, endAt, id)) {
    throw new Error("CONFLICT");
  }

  await db
    .update(reservations)
    .set({
      customerId: input.customerId,
      serviceId: input.serviceId,
      staffUserId: staffUserId ?? null,
      startAt: input.startAt,
      endAt,
      status: input.status,
      notes: input.notes || null,
      updatedAt: new Date(),
    })
    .where(eq(reservations.id, id));

  return getReservation(id);
}

export async function cancelReservation(id: string) {
  const db = getDb();
  await db
    .update(reservations)
    .set({ status: "cancelled", updatedAt: new Date() })
    .where(eq(reservations.id, id));
  return getReservation(id);
}

export function toCalendarEvents(
  rows: Awaited<ReturnType<typeof listReservations>>,
) {
  return rows
    .filter((r) => r.reservation.status !== "cancelled")
    .map((r) => ({
      id: r.reservation.id,
      title: `${r.customer.name} — ${r.service.name}`,
      start: new Date(r.reservation.startAt),
      end: new Date(r.reservation.endAt),
      resource: r,
    }));
}

export function parseLocalDateTime(value: string) {
  return parseISO(value);
}
