import { requireUser } from "@/server/require-user"
import { redirect } from "next/navigation"

import PageShell from "@/components/page-shell"
import OnboardingForm from "./onboarding-form"

export default async function OnboardingPage() {
  const user = await requireUser()
  if (user.onboardingCompleted) {
    redirect("/home")
  }

  return (
    <PageShell>
      <OnboardingForm />
    </PageShell>
  );
}
