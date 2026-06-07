"use server";

import { redirect } from "next/navigation";
import { destroySession } from "@/lib/auth/session";
import { loginStaff } from "@/lib/services/auth.service";
import { loginSchema } from "@/lib/validators/admin.schema";

export async function loginAction(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { ok: false as const, error: "Invalid form data" };
  }

  const result = await loginStaff(parsed.data);
  if (!result.ok) {
    return result;
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  await destroySession();
  redirect("/login");
}
