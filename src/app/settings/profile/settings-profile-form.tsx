"use client"

import { useActionState } from "react"

import { updateProfile } from "./actions"
import { Avatar } from "@/components/avatar"
import { PrimaryButton } from "@/components/primary-button"

type Initial = {
  username: string
  displayName: string
  userType: "student" | "creator"
  bio: string
  school: string
}

export default function SettingsProfileForm({ initial }: { initial: Initial }) {
  const [state, formAction, isPending] = useActionState(updateProfile, null)

  return (
    <form action={formAction} className="w-full space-y-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <Avatar
          username={initial.username}
          displayName={initial.displayName ?? undefined}
          size={88}
        />
        <h1 className="text-2xl font-bold tracking-tight">Edit profile</h1>
      </div>

      {state?.formErrors?.length && (
        <p className="text-sm text-error text-center">{state.formErrors[0]}</p>
      )}
      {state?.success && (
        <p className="text-sm opacity-80 text-center">Profile saved</p>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="display-name" id="display-name-label" className="text-sm font-semibold leading-none">
          Display name
        </label>
        <input
          id="display-name"
          name="displayName"
          type="text"
          autoComplete="name"
          maxLength={50}
          defaultValue={initial.displayName}
          aria-labelledby="display-name-label"
          aria-describedby={state?.fieldErrors?.displayName ? "display-name-error" : undefined}
          className="w-full min-h-[48px] rounded-full border border-ink/20 bg-background text-ink px-4 text-base placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-orange"
          placeholder="Alex Rivera"
        />
        {state?.fieldErrors?.displayName && (
          <p id="display-name-error" className="text-sm text-error" role="alert">
            {state.fieldErrors.displayName[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="user-type" id="user-type-label" className="text-sm font-semibold leading-none">
          User type
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="relative cursor-pointer">
            <input
              name="userType"
              type="radio"
              value="student"
              required
              className="sr-only peer"
              defaultChecked={initial.userType === "student"}
            />
            <span
              className={`block min-h-[48px] rounded-full border border-ink/20 bg-background text-ink text-base font-semibold leading-none flex items-center justify-center px-4 focus-within:ring-2 focus-within:ring-orange peer-checked:ring-2 peer-checked:ring-orange peer-checked:bg-orange peer-checked:text-white ${
                state?.fieldErrors?.userType ? "border-error" : ""
              }`}
            >
              Student
            </span>
          </label>
          <label className="relative cursor-pointer">
            <input
              name="userType"
              type="radio"
              value="creator"
              className="sr-only peer"
              defaultChecked={initial.userType === "creator"}
            />
            <span
              className={`block min-h-[48px] rounded-full border border-ink/20 bg-background text-ink text-base font-semibold leading-none flex items-center justify-center px-4 focus-within:ring-2 focus-within:ring-orange peer-checked:ring-2 peer-checked:ring-orange peer-checked:bg-orange peer-checked:text-white ${
                state?.fieldErrors?.userType ? "border-error" : ""
              }`}
            >
              Creator
            </span>
          </label>
        </div>
        {state?.fieldErrors?.userType && (
          <p className="text-sm text-error">{state.fieldErrors.userType[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="bio-textarea" id="bio-label" className="text-sm font-semibold leading-none">
          Bio
        </label>
        <textarea
          id="bio-textarea"
          name="bio"
          defaultValue={initial.bio}
          maxLength={160}
          aria-labelledby="bio-label"
          aria-describedby={state?.fieldErrors?.bio ? "bio-error" : undefined}
          className="w-full min-h-[48px] rounded-full border border-ink/20 bg-background text-ink px-4 text-base placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-orange"
          placeholder="Tell people a little about yourself"
        />
        <div className="flex justify-end">
          <p className="text-xs opacity-75">
            {initial.bio.length}/160 characters
          </p>
        </div>
        {state?.fieldErrors?.bio && (
          <p id="bio-error" className="text-sm text-error" role="alert">
            {state.fieldErrors.bio[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="school" id="school-label" className="text-sm font-semibold leading-none">
          School or campus
        </label>
        <input
          id="school"
          name="school"
          type="text"
          autoComplete="organization"
          maxLength={80}
          defaultValue={initial.school}
          aria-labelledby="school-label"
          aria-describedby={state?.fieldErrors?.school ? "school-error" : undefined}
          className="w-full min-h-[48px] rounded-full border border-ink/20 bg-background text-ink px-4 text-base placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-orange"
          placeholder="Mohee University"
        />
        {state?.fieldErrors?.school && (
          <p id="school-error" className="text-sm text-error" role="alert">
            {state.fieldErrors.school[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold leading-none">Username</p>
        <span className="text-base text-ink">@{initial.username}</span>
        <p className="text-xs opacity-75">Usernames can&apos;t be changed after signing up.</p>
      </div>

      <PrimaryButton type="submit" disabled={isPending}>
        {isPending ? "Saving…" : "Save"}
      </PrimaryButton>
    </form>
  );
}
