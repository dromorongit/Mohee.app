"use client"

import { useActionState } from "react"
import Image from "next/image"

import { loginFormAction } from "./actions"
import { PrimaryButton } from "@/components/primary-button"

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginFormAction, {
    message: "",
    error: false,
  })

  return (
    <form action={formAction} className="w-full space-y-4">
      <Image
        src="/brand/moheeapplogo.png"
        alt="Mohee logo"
        width={72}
        height={72}
        className="mx-auto rounded-full"
        priority
      />
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Sign in to Mohee</h2>
        <p className="opacity-80 max-w-xs">
          Enter your invited email address and we’ll send you a login link.
        </p>
      </div>

      <div className="flex flex-col w-full gap-2">
        <label htmlFor="email" className="text-sm font-semibold">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          autoFocus
          className="w-full min-h-[48px] rounded-full border border-ink/20 bg-background text-ink px-4 text-base placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-orange"
          placeholder="you@example.com"
          required
        />
        {state?.error && (
          <p className="text-sm text-error">{state.message}</p>
        )}
      </div>

      <PrimaryButton type="submit" disabled={isPending}>
        {isPending ? "Sending…" : "Send me a login link"}
      </PrimaryButton>

      {!state?.error && state?.message && (
        <p className="text-sm opacity-80 text-center">{state.message}</p>
      )}
    </form>
  );
}
