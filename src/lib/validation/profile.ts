import { z } from "zod"

export const RESERVED_USERNAMES = [
  "admin",
  "administrator",
  "mohee",
  "support",
  "help",
  "api",
  "login",
  "logout",
  "settings",
  "home",
  "onboarding",
  "auth",
  "u",
  "null",
  "undefined",
  "root",
  "system",
]

const reservedSet = new Set(RESERVED_USERNAMES)

const CONTROL_CHARS = /[\u0000-\u001F\u007F-\u009F]/g

const cleanText = (value: unknown): string => {
  if (value === null || value === undefined) return ""
  if (typeof value !== "string") return ""
  return value.replace(CONTROL_CHARS, "").trim()
}

export const displayNameSchema = z
  .preprocess(cleanText, z.string().min(2, "Display name must be at least 2 characters.").max(50, "Display name must be at most 50 characters."))

export const usernameSchema = z
  .preprocess(
    (value: unknown): string => {
      if (value === null || value === undefined) return ""
      if (typeof value !== "string") return ""
      return value.trim().toLowerCase()
    },
    z.string()
      .min(3, "Username must be at least 3 characters.")
      .max(20, "Username must be at most 20 characters.")
      .regex(
        /^[a-z][a-z0-9_]{2,19}$/,
        "Usernames must start with a letter and can only contain lowercase letters, numbers, and underscores.",
      )
      .refine(
        (value) => !reservedSet.has(value),
        "That username is reserved. Try another.",
      ),
  )

export const userTypeSchema = z.enum(["student", "creator"], {
  error: "Pick student or creator.",
})

const optionalText = (max: number) =>
  z.preprocess(cleanText, z.string().max(max, `Must be at most ${max} characters.`)).optional().nullish()

export const completeOnboardingSchema = z.object({
  displayName: displayNameSchema,
  username: usernameSchema,
  userType: userTypeSchema,
  bio: optionalText(160),
  school: optionalText(80),
})

export type CompleteOnboardingInput = z.infer<typeof completeOnboardingSchema>

export const updateProfileSchema = z.object({
  displayName: displayNameSchema,
  userType: userTypeSchema,
  bio: optionalText(160),
  school: optionalText(80),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
