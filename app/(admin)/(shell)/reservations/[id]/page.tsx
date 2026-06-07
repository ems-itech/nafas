import { notFound } from "next/navigation";
import { format } from "date-fns";
import { listCustomers } from "@/lib/services/customer.service";
import { getReservation } from "@/lib/services/reservation.service";
import { listServices } from "@/lib/services/service-catalog.service";
import { ReservationForm } from "@/components/admin/ReservationForm";
import { cancelReservationAction } from "@/app/(admin)/actions/reservations";
import { Button } from "@/components/ui/shadcn/button";
import {
  ShadcnCard,
  ShadcnCardContent,
  ShadcnCardHeader,
  ShadcnCardTitle,
} from "@/components/ui/shadcn/card";

type Props = {
  params: Promise<{ id: string }> | { id: string };
};

function toLocalInputValue(date: Date) {
  return format(date, "yyyy-MM-dd'T'HH:mm");
}

export default async function EditReservationPage({ params }: Props) {
  const { id } = await Promise.resolve(params);
  const detail = await getReservation(id);
  if (!detail) notFound();

  const [customers, services] = await Promise.all([
    listCustomers(),
    listServices(true),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit reservation</h1>
          <p className="text-muted-foreground">{detail.customer.name}</p>
        </div>
        {detail.reservation.status !== "cancelled" ? (
          <form action={cancelReservationAction.bind(null, id)}>
            <Button type="submit" variant="outline">
              Cancel reservation
            </Button>
          </form>
        ) : null}
      </div>
      <ShadcnCard>
        <ShadcnCardHeader>
          <ShadcnCardTitle className="text-base">Details</ShadcnCardTitle>
        </ShadcnCardHeader>
        <ShadcnCardContent>
          <ReservationForm
            reservationId={id}
            customers={customers.map((c) => ({ id: c.id, label: `${c.name} (${c.phone})` }))}
            services={services.map((s) => ({
              id: s.id,
              label: `${s.name} (${s.durationMinutes} min)`,
            }))}
            defaultValues={{
              customerId: detail.reservation.customerId,
              serviceId: detail.reservation.serviceId,
              startAt: toLocalInputValue(new Date(detail.reservation.startAt)),
              status: detail.reservation.status,
              notes: detail.reservation.notes || "",
            }}
          />
        </ShadcnCardContent>
      </ShadcnCard>
    </div>
  );
}
