import { requireUser } from "./require-user"
import { redirect } from "next/navigation"

export async function requireOnboardedUser() {
  const user = await requireUser()
  if (!user.onboardingCompleted) {
    redirect("/onboarding")
  }
  return user
}
