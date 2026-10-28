"use client"

import { useActionState, useState } from "react"

import { completeOnboarding } from "./actions"
import { FormField } from "@/components/form-field"
import { PrimaryButton } from "@/components/primary-button"

export default function OnboardingForm() {
  const [state, formAction, isPending] = useActionState(completeOnboarding, null)
  const [bio, setBio] = useState("")

  return (
    <form action={formAction} className="w-full space-y-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome to Mohee. Let&apos;s set up your profile.
        </h1>
        <p className="text-sm opacity-80 max-w-xs">
          A few details so people can find you.
        </p>
      </div>

      {state?.formErrors?.length && (
        <p className="text-sm text-error text-center">{state.formErrors[0]}</p>
      )}

      <FormField
        label="Display name"
        id="display-name"
        error={state?.fieldErrors?.displayName?.[0]}
        helperText="How you will appear to others."
      >
        <input
          name="displayName"
          type="text"
          autoComplete="name"
          maxLength={50}
          required
          autoFocus
          className="w-full min-h-[48px] rounded-full border border-ink/20 bg-background text-ink px-4 text-base placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-orange"
          placeholder="Alex Rivera"
        />
      </FormField>

      <div className="flex flex-col w-full gap-1.5">
        <label htmlFor="username" id="username-label" className="text-sm font-semibold leading-none">
          Username
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink opacity-60 text-base">
            @
          </span>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            maxLength={20}
            required
            aria-labelledby="username-label"
            aria-describedby={
              state?.fieldErrors?.username
                ? "username-error username-helper"
                : "username-helper"
            }
            className="w-full min-h-[48px] pl-10 rounded-full border border-ink/20 bg-background text-ink text-base placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-orange"
            placeholder="alexr"
          />
        </div>
        {state?.fieldErrors?.username && (
          <p id="username-error" className="text-sm text-error" role="alert">
            {state.fieldErrors.username[0]}
          </p>
        )}
        <p id="username-helper" className="text-xs opacity-75">
          Lowercase letters, numbers, and underscores. Must start with a letter.
        </p>
      </div>

      <div className="flex flex-col w-full gap-2">
        <label htmlFor="user-type" className="text-sm font-semibold leading-none">
          I&apos;m a
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="relative cursor-pointer">
            <input
              name="userType"
              type="radio"
              value="student"
              required
              className="sr-only peer"
              defaultChecked
            />
            <span
              className={`block min-h-[48px] rounded-full border border-ink/20 bg-background text-ink text-base font-semibold leading-none flex items-center justify-center px-4 focus-within:ring-2 focus-within:ring-orange peer-checked:ring-2 peer-checked:ring-orange peer-checked:bg-orange peer-checked:text-white ${
                state?.fieldErrors?.userType ? "border-error" : ""
              }`}
            >
              I&apos;m a student
            </span>
          </label>
          <label className="relative cursor-pointer">
            <input
              name="userType"
              type="radio"
              value="creator"
              className="sr-only peer"
            />
            <span
              className={`block min-h-[48px] rounded-full border border-ink/20 bg-background text-ink text-base font-semibold leading-none flex items-center justify-center px-4 focus-within:ring-2 focus-within:ring-orange peer-checked:ring-2 peer-checked:ring-orange peer-checked:bg-orange peer-checked:text-white ${
                state?.fieldErrors?.userType ? "border-error" : ""
              }`}
            >
              I&apos;m a creator
            </span>
          </label>
        </div>
        {state?.fieldErrors?.userType && (
          <p className="text-sm text-error">{state.fieldErrors.userType[0]}</p>
        )}
      </div>

      <FormField
        label="Bio"
        id="bio"
        error={state?.fieldErrors?.bio?.[0]}
        helperText={`${bio.length}/160 characters`}
      >
        <textarea
          name="bio"
          id="bio-textarea"
          maxLength={160}
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          className="w-full min-h-[48px] rounded-full border border-ink/20 bg-background text-ink px-4 text-base placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-orange"
          placeholder="Tell people a little about yourself"
        />
      </FormField>

      <FormField
        label="School or campus"
        id="school"
        error={state?.fieldErrors?.school?.[0]}
        helperText="Optional. Where you study or teach."
      >
        <input
          name="school"
          type="text"
          autoComplete="organization"
          maxLength={80}
          className="w-full min-h-[48px] rounded-full border border-ink/20 bg-background text-ink px-4 text-base placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-orange"
          placeholder="Mohee University"
        />
      </FormField>

      <PrimaryButton type="submit" disabled={isPending}>
        {isPending ? "Joining…" : "Join Mohee"}
      </PrimaryButton>
    </form>
  );
}
