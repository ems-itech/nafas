"use server";

import { revalidatePath } from "next/cache";
import {
  createService,
  deleteService,
  updateService,
} from "@/lib/services/service-catalog.service";
import { serviceSchema } from "@/lib/validators/admin.schema";

function parseServiceForm(formData: FormData) {
  return serviceSchema.safeParse({
    name: formData.get("name"),
    durationMinutes: formData.get("durationMinutes"),
    priceCents: formData.get("priceCents") || null,
    isActive: formData.get("isActive") === "on" || formData.get("isActive") === "true",
  });
}

export async function createServiceAction(
  formData: FormData,
): Promise<{ ok: false; error: string } | { ok: true }> {
  const parsed = parseServiceForm(formData);
  if (!parsed.success) return { ok: false, error: "Invalid data" };
  await createService(parsed.data);
  revalidatePath("/services");
  return { ok: true };
}

export async function updateServiceAction(id: string, formData: FormData): Promise<void> {
  const parsed = parseServiceForm(formData);
  if (!parsed.success) return;
  await updateService(id, parsed.data);
  revalidatePath("/services");
}

export async function deleteServiceAction(id: string): Promise<void> {
  await deleteService(id);
  revalidatePath("/services");
}
