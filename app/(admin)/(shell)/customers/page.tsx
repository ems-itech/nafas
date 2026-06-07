import { listCustomers } from "@/lib/services/customer.service";
import { CustomerCreateForm } from "@/components/admin/CustomerCreateForm";
import { deleteCustomerAction } from "@/app/(admin)/actions/customers";
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

export default async function CustomersPage() {
  const customers = await listCustomers();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground">Manage client records</p>
      </div>

      <ShadcnCard>
        <ShadcnCardHeader>
          <ShadcnCardTitle className="text-base">Add customer</ShadcnCardTitle>
        </ShadcnCardHeader>
        <ShadcnCardContent>
          <CustomerCreateForm />
        </ShadcnCardContent>
      </ShadcnCard>

      <ShadcnCard>
        <ShadcnCardHeader>
          <ShadcnCardTitle className="text-base">All customers</ShadcnCardTitle>
        </ShadcnCardHeader>
        <ShadcnCardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="w-[100px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.phone}</TableCell>
                  <TableCell>{c.email || "—"}</TableCell>
                  <TableCell>
                    <form action={deleteCustomerAction.bind(null, c.id)}>
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
