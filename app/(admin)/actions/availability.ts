"use server";

import { revalidatePath } from "next/cache";
import { upsertAvailabilityRule } from "@/lib/services/availability.service";
import { availabilityRuleSchema } from "@/lib/validators/admin.schema";

export async function saveAvailabilityAction(formData: FormData): Promise<void> {
  const parsed = availabilityRuleSchema.safeParse({
    dayOfWeek: formData.get("dayOfWeek"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    isActive: formData.get("isActive") === "on" || formData.get("isActive") === "true",
  });

  if (!parsed.success) return;
  await upsertAvailabilityRule(parsed.data);
  revalidatePath("/availability");
}
