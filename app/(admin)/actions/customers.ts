"use server";

import { revalidatePath } from "next/cache";
import {
  createCustomer,
  deleteCustomer,
  updateCustomer,
} from "@/lib/services/customer.service";
import { customerSchema } from "@/lib/validators/admin.schema";

function parseCustomerForm(formData: FormData) {
  return customerSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    notes: formData.get("notes"),
  });
}

export async function createCustomerAction(
  formData: FormData,
): Promise<{ ok: false; error: string } | { ok: true }> {
  const parsed = parseCustomerForm(formData);
  if (!parsed.success) return { ok: false, error: "Invalid data" };
  await createCustomer(parsed.data);
  revalidatePath("/customers");
  return { ok: true };
}

export async function updateCustomerAction(id: string, formData: FormData): Promise<void> {
  const parsed = parseCustomerForm(formData);
  if (!parsed.success) return;
  await updateCustomer(id, parsed.data);
  revalidatePath("/customers");
}

export async function deleteCustomerAction(id: string): Promise<void> {
  await deleteCustomer(id);
  revalidatePath("/customers");
}
