"use client"

import { useActionState } from "react"
import Image from "next/image"

import { loginFormAction } from "./actions"

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginFormAction, {
    message: "",
    error: false,
  })

  return (
    <form action={formAction} className="w-full max-w-xs px-4 py-6 space-y-4">
      <Image
        src="/brand/moheeapplogo.png"
        alt="Mohee logo"
        width={80}
        height={80}
        className="mx-auto rounded-full"
        priority
      />
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Sign in to Mohee</h2>
        <p className="text-ink opacity-80">
          Enter your invited email address and we’ll send you a login link.
        </p>
      </div>

      <div className="flex flex-col w-full gap-2">
        <label htmlFor="email" className="text-sm font-semibold text-ink">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          autoFocus
          className="w-full h-12 rounded-full border border-ink/20 bg-background text-ink px-4 text-base placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-orange"
          placeholder="you@example.com"
          required
        />
        {state?.error && (
          <p className="text-sm text-error">{state.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full h-12 rounded-full bg-orange text-white font-semibold text-lg disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
      >
        {isPending ? "Sending…" : "Send me a login link"}
      </button>

      {!state?.error && state?.message && (
        <p className="text-sm text-ink opacity-80 text-center">
          {state.message}
        </p>
      )}
    </form>
  )
}
