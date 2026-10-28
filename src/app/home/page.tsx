import { requireOnboardedUser } from "@/server/require-onboarded-user"
import { logout } from "@/server/require-user"

import PageShell from "@/components/page-shell"
import { PrimaryButton } from "@/components/primary-button"

export default async function HomePage() {
  const user = await requireOnboardedUser()

  return (
    <PageShell>
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user.displayName ?? "there"}
        </h1>
        {user.username && (
          <a
            href={`/u/${user.username}`}
            className="text-sm underline underline-offset-4 opacity-80"
          >
            My profile
          </a>
        )}
        <form action={logout} className="w-full">
          <PrimaryButton>Log out</PrimaryButton>
        </form>
      </div>
    </PageShell>
  );
}
