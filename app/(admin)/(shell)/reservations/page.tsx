import Link from "next/link";
import { format } from "date-fns";
import { listReservations } from "@/lib/services/reservation.service";
import { cancelReservationAction } from "@/app/(admin)/actions/reservations";
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

export default async function ReservationsPage() {
  const rows = await listReservations();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
          <p className="text-muted-foreground">Manage appointments</p>
        </div>
        <Button asChild>
          <Link href="/reservations/new">New reservation</Link>
        </Button>
      </div>

      <ShadcnCard>
        <ShadcnCardHeader>
          <ShadcnCardTitle className="text-base">All reservations</ShadcnCardTitle>
        </ShadcnCardHeader>
        <ShadcnCardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>When</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[180px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.reservation.id}>
                  <TableCell>
                    {format(new Date(row.reservation.startAt), "MMM d, yyyy HH:mm")}
                  </TableCell>
                  <TableCell>{row.customer.name}</TableCell>
                  <TableCell>{row.service.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{row.reservation.status}</Badge>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/reservations/${row.reservation.id}`}>Edit</Link>
                    </Button>
                    {row.reservation.status !== "cancelled" ? (
                      <form action={cancelReservationAction.bind(null, row.reservation.id)}>
                        <Button type="submit" variant="outline" size="sm">
                          Cancel
                        </Button>
                      </form>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ShadcnCardContent>
      </ShadcnCard>
    </div>
  );
}
