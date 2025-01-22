"use client";
import { signUpAction} from "./signupAction";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useActionState } from "react";

//TODO: add a confirm password field. We might just client validate this if Dr. clever figures out a way to do it with ease.
export default function Signup() {
  const [formState, formAction] = useActionState(signUpAction, {
    fields: {
      name: {},
      email: {},
      password: {},
    },
  });
  
  return (
    <main className="w-full flex-1 flex items-center justify-center h-screen p-4">
    <section className="sm:max-w-md w-full">
    <form 
    style={{
      display:formState.message? 'none' : 'block',
    }}
    className="flex flex-col min-w-64 max-w-64 mx-auto" action={formAction}>
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
    aria-invalid={formState.fields.email.error ? "true" : "false"}
    id="email"
    name="email"
    placeholder="you@example.com"
    required
    type="email"
    defaultValue =  {formState.fields.email.value ?? ""}
    />
    {formState.fields.email.error && (
      <p className="text-red-500 text-sm">
      {formState.fields.email.error}
      </p>
    )}
    <label htmlFor="name">Name</label>
    <Input
    aria-invalid={formState.fields.name.error ? "true" : "false"}
    id="name"
    name="name"
    placeholder="bob Smith"
    required
    type="text"
    defaultValue =  {formState.fields.name.value ?? ""}
    />
    {formState.fields.name.error && (
      <p className="text-red-500 text-sm" aria-live="polite">
      {formState.fields.name.error}
      </p>
    )}
    
    <Label htmlFor="password">Password</Label>
    <Input
    aria-invalid={formState.fields.password.error ? "true" : "false"}
    id="password"
    name="password"
    placeholder="Your password"
    minLength={6}
    required
    type="password"
    defaultValue = {formState.fields.password.value ?? ""}
    />
    {formState.fields.password.error && (
      <p className="text-red-500 text-sm" aria-live="polite">
      {formState.fields.password.error}
      </p>
    )}
    
    <SubmitButton pendingText="Signing up...">Sign up</SubmitButton>
    </div>
    
    </form>
    
    {formState.message && (
      <p> {formState.message } </p>
    )}
    </section>
    </main>
  );
}
