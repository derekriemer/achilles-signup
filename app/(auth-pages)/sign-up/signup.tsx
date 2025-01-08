"use client";
import { signUpAction} from "./signupAction";
import { FormMessage } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useActionState } from "react";

export default function Signup() {
  const [formState, formAction] = useActionState(signUpAction, {
    message: null,
    errors: {},
  });
  
  return (
    <main className="w-full flex-1 flex items-center justify-center h-screen p-4">
    <section className="sm:max-w-md w-full">
    <form className="flex flex-col min-w-64 max-w-64 mx-auto" action={formAction}>
    <h1 className="text-2xl font-medium mb-2">Sign up</h1>
    <p className="text-sm text-foreground mb-6">
    Already have an account?{" "}
    <Link className="text-primary font-medium underline" href="/sign-in">
    Sign in
    </Link>
    </p>

    {formState.errorMessage  && (
    <p className="text-red-500 text-sm" aria-live="polite">
      {formState.errorMessage}
      </p>
  )}

    <div className="flex flex-col gap-2">
    <Label htmlFor="email">Email</Label>
    <Input
    id="email"
    name="email"
    type="email"
    placeholder="you@example.com"
    required
    aria-invalid={formState?.errors?.email ? "true" : "false"}
    />
    {formState.errors?.email&& (
      <p className="text-red-500 text-sm" aria-live="polite">
      {formState.errors?.email}
      </p>
    )}
    <label htmlFor="name">Name</label>
    <Input
    id="name"
    name="name"
    type="text"
    placeholder="bob Smith"
    required
    aria-invalid={formState?.errors?.name ? "true" : "false"}
    />
    {formState.errors?.email && (
      <p className="text-red-500 text-sm" aria-live="polite">
      {formState.errors.name}
      </p>
    )}
    
    <Label htmlFor="password">Password</Label>
    <Input
    id="password"
    name="password"
    type="password"
    placeholder="Your password"
    minLength={6}
    required
    aria-invalid={formState?.errors?.password ? "true" : "false"}
    />
    {formState.errors?.password && (
      <p className="text-red-500 text-sm" aria-live="polite">
      {formState.errors.password}
      </p>
    )}
    
    <SubmitButton pendingText="Signing up...">Sign up</SubmitButton>
    </div>
    
    {formState.message && (
      <p> {formState.message } </p>
    )}
    </form>
    </section>
    </main>
  );
}
