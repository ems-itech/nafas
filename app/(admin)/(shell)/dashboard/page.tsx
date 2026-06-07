import Link from "next/link";
import { format } from "date-fns";
import { listCustomers } from "@/lib/services/customer.service";
import { listReservations } from "@/lib/services/reservation.service";
import { listServices } from "@/lib/services/service-catalog.service";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import {
  ShadcnCard,
  ShadcnCardContent,
  ShadcnCardHeader,
  ShadcnCardTitle,
} from "@/components/ui/shadcn/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";

export default async function DashboardPage() {
  const [reservations, customers, services] = await Promise.all([
    listReservations(),
    listCustomers(),
    listServices(),
  ]);

  const upcoming = reservations
    .filter(
      (r) =>
        r.reservation.status !== "cancelled" &&
        new Date(r.reservation.startAt) >= new Date(),
    )
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Reservation overview</p>
        </div>
        <Button asChild>
          <Link href="/reservations/new">New reservation</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <ShadcnCard>
          <ShadcnCardHeader>
            <ShadcnCardTitle className="text-base">Reservations</ShadcnCardTitle>
          </ShadcnCardHeader>
          <ShadcnCardContent>
            <p className="text-3xl font-bold">{reservations.length}</p>
          </ShadcnCardContent>
        </ShadcnCard>
        <ShadcnCard>
          <ShadcnCardHeader>
            <ShadcnCardTitle className="text-base">Customers</ShadcnCardTitle>
          </ShadcnCardHeader>
          <ShadcnCardContent>
            <p className="text-3xl font-bold">{customers.length}</p>
          </ShadcnCardContent>
        </ShadcnCard>
        <ShadcnCard>
          <ShadcnCardHeader>
            <ShadcnCardTitle className="text-base">Active services</ShadcnCardTitle>
          </ShadcnCardHeader>
          <ShadcnCardContent>
            <p className="text-3xl font-bold">{services.filter((s) => s.isActive).length}</p>
          </ShadcnCardContent>
        </ShadcnCard>
      </div>

      <ShadcnCard>
        <ShadcnCardHeader>
          <ShadcnCardTitle className="text-base">Upcoming reservations</ShadcnCardTitle>
        </ShadcnCardHeader>
        <ShadcnCardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>When</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcoming.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-muted-foreground">
                    No upcoming reservations.
                  </TableCell>
                </TableRow>
              ) : (
                upcoming.map((row) => (
                  <TableRow key={row.reservation.id}>
                    <TableCell>
                      {format(new Date(row.reservation.startAt), "MMM d, yyyy HH:mm")}
                    </TableCell>
                    <TableCell>{row.customer.name}</TableCell>
                    <TableCell>{row.service.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{row.reservation.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ShadcnCardContent>
      </ShadcnCard>
    </div>
  );
}
