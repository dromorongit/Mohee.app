import { requireUser, logout } from "@/server/require-user"
import { redirect } from "next/navigation"
import PageShell from "@/components/page-shell"
import { PrimaryButton } from "@/components/primary-button"

export default async function HomePage() {
  const user = await requireUser()
  if (!user.onboardingCompleted) {
    redirect("/onboarding")
  }

  return (
    <PageShell>
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to Mohee</h1>
        <p className="opacity-80 max-w-xs">{user.email}</p>
        <form action={logout} className="w-full">
          <PrimaryButton>Log out</PrimaryButton>
        </form>
      </div>
    </PageShell>
  );
}
