"use server"

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client"
import { UserType } from "@prisma/client"
import { redirect } from "next/navigation"

import { prisma } from "@/server/db"
import { requireUser } from "@/server/require-user"
import { completeOnboardingSchema } from "@/lib/validation/profile"

export type CompleteOnboardingState = {
  fieldErrors?: Record<string, string[]>
  formErrors?: string[]
  success?: boolean
}

function buildFieldErrors(error: { issues: Array<{ path: unknown[]; message: string }> }) {
  const fieldErrors: Record<string, string[]> = {}
  const formErrors: string[] = []
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "")
    if (key) {
      if (!fieldErrors[key]) fieldErrors[key] = []
      fieldErrors[key].push(issue.message)
    } else {
      formErrors.push(issue.message)
    }
  }
  return { fieldErrors, formErrors }
}

export async function completeOnboarding(
  _prev: CompleteOnboardingState | null,
  formData: FormData,
): Promise<CompleteOnboardingState> {
  const user = await requireUser()

  const raw = {
    displayName: formData.get("displayName"),
    username: formData.get("username"),
    userType: formData.get("userType"),
    bio: formData.get("bio"),
    school: formData.get("school"),
  }

  const result = completeOnboardingSchema.safeParse(raw)
  if (!result.success) {
    return buildFieldErrors(result.error)
  }

  const { displayName, username, userType, bio, school } = result.data

  let updateResult
  try {
    updateResult = await prisma.user.updateMany({
      where: { id: user.id, onboardingCompleted: false },
      data: {
        displayName,
        username,
        userType: userType === "student" ? UserType.STUDENT : UserType.CREATOR,
        bio: bio ?? null,
        school: school ?? null,
        onboardingCompleted: true,
      },
    })
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const target = (error as { meta?: { target?: string[] } }).meta?.target
      if (Array.isArray(target) && target.includes("username")) {
        return { formErrors: ["That username is taken. Try another."] }
      }
    }
    throw error
  }

  if (updateResult.count === 0) {
    redirect("/home")
  }

  redirect(`/u/${username}`)
}
