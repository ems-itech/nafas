"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  createReservationAction,
  updateReservationAction,
} from "@/app/(admin)/actions/reservations";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { Textarea } from "@/components/ui/shadcn/textarea";

type Option = { id: string; label: string };

type Props = {
  customers: Option[];
  services: Option[];
  defaultStartAt?: string;
  reservationId?: string;
  defaultValues?: {
    customerId: string;
    serviceId: string;
    startAt: string;
    status: string;
    notes: string;
  };
};

export function ReservationForm({
  customers,
  services,
  defaultStartAt,
  reservationId,
  defaultValues,
}: Props) {
  const [state, action, pending] = useActionState(
    async (_prev: { ok: false; error: string } | null, formData: FormData) => {
      const result = reservationId
        ? await updateReservationAction(reservationId, formData)
        : await createReservationAction(formData);
      if (!result.ok) return result;
      if (!reservationId && "id" in result && result.id) {
        window.location.href = `/reservations/${result.id}`;
      }
      return null;
    },
    null,
  );

  return (
    <form action={action} className="grid max-w-2xl gap-4">
      <div className="space-y-2">
        <Label htmlFor="customerId">Customer</Label>
        <select
          id="customerId"
          name="customerId"
          required
          defaultValue={defaultValues?.customerId}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">Select customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="serviceId">Service</Label>
        <select
          id="serviceId"
          name="serviceId"
          required
          defaultValue={defaultValues?.serviceId}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">Select service</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="startAt">Start</Label>
        <Input
          id="startAt"
          name="startAt"
          type="datetime-local"
          required
          defaultValue={defaultStartAt || defaultValues?.startAt}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          name="status"
          defaultValue={defaultValues?.status || "pending"}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" defaultValue={defaultValues?.notes} />
      </div>
      {state?.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
      <div className="flex gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : reservationId ? "Update" : "Create"}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/reservations">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
