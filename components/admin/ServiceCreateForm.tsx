"use client";

import { useActionState } from "react";
import { createServiceAction } from "@/app/(admin)/actions/services";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";

export function ServiceCreateForm() {
  const [state, action, pending] = useActionState(
    async (_prev: { ok: false; error: string } | null, formData: FormData) => {
      const result = await createServiceAction(formData);
      if (!result.ok) return result;
      (document.getElementById("service-create-form") as HTMLFormElement)?.reset();
      return null;
    },
    null,
  );

  return (
    <form id="service-create-form" action={action} className="grid gap-4 md:grid-cols-3">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="durationMinutes">Duration (minutes)</Label>
        <Input id="durationMinutes" name="durationMinutes" type="number" min={15} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceCents">Price (cents, optional)</Label>
        <Input id="priceCents" name="priceCents" type="number" min={0} />
      </div>
      <label className="flex items-center gap-2 text-sm md:col-span-3">
        <input type="checkbox" name="isActive" defaultChecked />
        Active
      </label>
      {state?.error ? <p className="text-sm text-destructive md:col-span-3">{state.error}</p> : null}
      <div className="md:col-span-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Add service"}
        </Button>
      </div>
    </form>
  );
}
