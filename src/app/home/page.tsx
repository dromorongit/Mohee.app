import { requireUser, logout } from "@/server/require-user"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const user = await requireUser()
  if (!user.onboardingCompleted) {
    redirect("/onboarding")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-page-bg text-ink px-6">
      <div className="max-w-xs text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to Mohee</h1>
        <p className="text-ink opacity-80">{user.email}</p>
        <form action={logout}>
          <button
            className="w-full h-12 rounded-full bg-orange text-white font-semibold text-lg shadow-lg"
          >
            Log out
          </button>
        </form>
      </div>
    </div>
  )
}
