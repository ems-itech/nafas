import { listServices } from "@/lib/services/service-catalog.service";
import { ServiceCreateForm } from "@/components/admin/ServiceCreateForm";
import { deleteServiceAction } from "@/app/(admin)/actions/services";
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

export default async function ServicesPage() {
  const services = await listServices();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Services</h1>
        <p className="text-muted-foreground">Bookable services catalog</p>
      </div>

      <ShadcnCard>
        <ShadcnCardHeader>
          <ShadcnCardTitle className="text-base">Add service</ShadcnCardTitle>
        </ShadcnCardHeader>
        <ShadcnCardContent>
          <ServiceCreateForm />
        </ShadcnCardContent>
      </ShadcnCard>

      <ShadcnCard>
        <ShadcnCardHeader>
          <ShadcnCardTitle className="text-base">All services</ShadcnCardTitle>
        </ShadcnCardHeader>
        <ShadcnCardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.durationMinutes} min</TableCell>
                  <TableCell>
                    {s.priceCents != null ? `$${(s.priceCents / 100).toFixed(2)}` : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={s.isActive ? "default" : "secondary"}>
                      {s.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <form action={deleteServiceAction.bind(null, s.id)}>
                      <Button type="submit" variant="outline" size="sm">
                        Delete
                      </Button>
                    </form>
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
