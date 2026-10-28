import { notFound } from "next/navigation"

import { requireOnboardedUser } from "@/server/require-onboarded-user"
import { prisma } from "@/server/db"

import PageShell from "@/components/page-shell"
import SettingsProfileForm from "./settings-profile-form"

export default async function SettingsProfilePage() {
  const user = await requireOnboardedUser()

  const current = await prisma.user.findUnique({
    where: { id: user.id },
    select: { username: true, displayName: true, userType: true, bio: true, school: true },
  })

  if (!current || !current.username) {
    notFound()
  }

  return (
    <PageShell>
      <SettingsProfileForm
        initial={{
          username: current.username,
          displayName: current.displayName ?? "",
          userType: current.userType === "CREATOR" ? "creator" : "student",
          bio: current.bio ?? "",
          school: current.school ?? "",
        }}
      />
    </PageShell>
  );
}
