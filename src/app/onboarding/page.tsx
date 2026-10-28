import { requireUser, logout } from "@/server/require-user"
import PageShell from "@/components/page-shell"
import { PrimaryButton } from "@/components/primary-button"

export default async function OnboardingPage() {
  await requireUser()

  return (
    <PageShell>
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Onboarding</h1>
        <p className="opacity-80 max-w-xs">
          Onboarding comes in the next phase. Your account is ready.
        </p>
        <form action={logout} className="w-full">
          <PrimaryButton>Log out</PrimaryButton>
        </form>
      </div>
    </PageShell>
  );
}
