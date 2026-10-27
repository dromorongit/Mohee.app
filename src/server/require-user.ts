import { auth, signOut } from "@/server/auth"
import { redirect } from "next/navigation"

export type UserSession = {
  id: string
  email: string
  isAdmin: boolean
  onboardingCompleted: boolean
}

export async function requireUser(): Promise<UserSession> {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }
  return session.user as UserSession
}

export async function getOptionalUser(): Promise<UserSession | null> {
  const session = await auth()
  if (!session?.user) {
    return null
  }
  return session.user as UserSession
}

export async function logout(): Promise<never> {
  "use server"
  return await signOut({ redirectTo: "/" })
}
