"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/(admin)/actions/auth";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import {
  ShadcnCard,
  ShadcnCardContent,
  ShadcnCardDescription,
  ShadcnCardHeader,
  ShadcnCardTitle,
} from "@/components/ui/shadcn/card";

export function LoginForm() {
  const [state, action, pending] = useActionState(
    async (_prev: { ok: false; error: string } | null, formData: FormData) => {
      const result = await loginAction(formData);
      if (result && "error" in result) return result;
      return null;
    },
    null,
  );

  return (
    <ShadcnCard className="w-full max-w-md">
      <ShadcnCardHeader>
        <ShadcnCardTitle>Staff sign in</ShadcnCardTitle>
        <ShadcnCardDescription>Nafas reservation admin</ShadcnCardDescription>
      </ShadcnCardHeader>
      <ShadcnCardContent>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>
          {state?.error ? (
            <p className="text-sm text-destructive">{state.error}</p>
          ) : null}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </ShadcnCardContent>
    </ShadcnCard>
  );
}
