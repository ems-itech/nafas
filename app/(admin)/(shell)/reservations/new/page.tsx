import { listCustomers } from "@/lib/services/customer.service";
import { listServices } from "@/lib/services/service-catalog.service";
import { ReservationForm } from "@/components/admin/ReservationForm";
import {
  ShadcnCard,
  ShadcnCardContent,
  ShadcnCardHeader,
  ShadcnCardTitle,
} from "@/components/ui/shadcn/card";

type Props = {
  searchParams: Promise<{ start?: string }> | { start?: string };
};

export default async function NewReservationPage({ searchParams }: Props) {
  const params = await Promise.resolve(searchParams);
  const [customers, services] = await Promise.all([
    listCustomers(),
    listServices(true),
  ]);

  let defaultStartAt = params.start;
  if (defaultStartAt && !defaultStartAt.includes("T")) {
    defaultStartAt = `${defaultStartAt}T10:00`;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New reservation</h1>
        <p className="text-muted-foreground">Book an appointment</p>
      </div>
      <ShadcnCard>
        <ShadcnCardHeader>
          <ShadcnCardTitle className="text-base">Details</ShadcnCardTitle>
        </ShadcnCardHeader>
        <ShadcnCardContent>
          <ReservationForm
            customers={customers.map((c) => ({ id: c.id, label: `${c.name} (${c.phone})` }))}
            services={services.map((s) => ({
              id: s.id,
              label: `${s.name} (${s.durationMinutes} min)`,
            }))}
            defaultStartAt={defaultStartAt}
          />
        </ShadcnCardContent>
      </ShadcnCard>
    </div>
  );
}
