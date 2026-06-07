"use client";

import { useActionState } from "react";
import { createCustomerAction } from "@/app/(admin)/actions/customers";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { Textarea } from "@/components/ui/shadcn/textarea";

export function CustomerCreateForm() {
  const [state, action, pending] = useActionState(
    async (_prev: { ok: false; error: string } | null, formData: FormData) => {
      const result = await createCustomerAction(formData);
      if (!result.ok) return result;
      (document.getElementById("customer-create-form") as HTMLFormElement)?.reset();
      return null;
    },
    null,
  );

  return (
    <form id="customer-create-form" action={action} className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" />
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" />
      </div>
      {state?.error ? <p className="text-sm text-destructive md:col-span-2">{state.error}</p> : null}
      <div className="md:col-span-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Add customer"}
        </Button>
      </div>
    </form>
  );
}
