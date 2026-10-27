"use server"

import { prisma } from "@/server/db"
import { signIn } from "@/server/auth"

export type LoginResult = {
  message: string
  error?: boolean
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const THROTTLE_MS = 60 * 1000

const requests = new Map<string, number>()

const GENERIC_MESSAGE =
  "Check your email. If this email is invited, a link is on its way. It works for 15 minutes."

export async function requestLoginLink(
  email: string,
): Promise<LoginResult> {
  const normalized = email.trim().toLowerCase()
  const now = Date.now()

  if (!EMAIL_REGEX.test(normalized)) {
    return { message: "Please enter a valid email address.", error: true }
  }

  const last = requests.get(normalized)
  if (last !== undefined && now - last < THROTTLE_MS) {
    return {
      message: "Please wait a moment before requesting another link.",
      error: true,
    }
  }
  requests.set(normalized, now)

  const allowed = await prisma.allowedEmail.findUnique({
    where: { email: normalized },
  })
  if (!allowed) {
    return { message: GENERIC_MESSAGE }
  }

  await signIn("nodemailer", {
    email: normalized,
    redirect: false,
    callbackUrl: "/home",
  })

  return { message: GENERIC_MESSAGE }
}

export async function loginFormAction(
  _prev: LoginResult | null,
  formData: FormData,
): Promise<LoginResult> {
  const email = formData.get("email")
  return requestLoginLink(typeof email === "string" ? email : "")
}
