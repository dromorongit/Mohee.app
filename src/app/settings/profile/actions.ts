"use server"

import { UserType } from "@prisma/client"

import { prisma } from "@/server/db"
import { requireUser } from "@/server/require-user"
import { updateProfileSchema } from "@/lib/validation/profile"

export type UpdateProfileState = {
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

export async function updateProfile(
  _prev: UpdateProfileState | null,
  formData: FormData,
): Promise<UpdateProfileState> {
  const user = await requireUser()

  const raw = {
    displayName: formData.get("displayName"),
    userType: formData.get("userType"),
    bio: formData.get("bio"),
    school: formData.get("school"),
  }

  const result = updateProfileSchema.safeParse(raw)
  if (!result.success) {
    return buildFieldErrors(result.error)
  }

  const { displayName, userType, bio, school } = result.data

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        displayName,
        userType: userType === "student" ? UserType.STUDENT : UserType.CREATOR,
        bio: bio ?? null,
        school: school ?? null,
      },
    })
  } catch {
    return { formErrors: ["Something went wrong saving your profile. Try again."] }
  }

  return { success: true }
}
