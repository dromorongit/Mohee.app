import { notFound } from "next/navigation"

import { requireOnboardedUser } from "@/server/require-onboarded-user"
import { prisma } from "@/server/db"

import PageShell from "@/components/page-shell"
import { Avatar } from "@/components/avatar"
import { PrimaryButton } from "@/components/primary-button"

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }> | { username: string }
}) {
  const { username } = await params
  const normalized = String(username ?? "").trim().toLowerCase()

  const viewer = await requireOnboardedUser()

  const user = await prisma.user.findUnique({
    where: { username: normalized },
    select: {
      id: true,
      username: true,
      displayName: true,
      userType: true,
      bio: true,
      school: true,
      profileImageUrl: true,
      createdAt: true,
      isActive: true,
    },
  })

  if (!user || !user.isActive) {
    notFound()
  }

  const isOwn = viewer.id === user.id

  return (
    <PageShell>
      <div className="flex flex-col items-center gap-4 text-center">
        <Avatar
          username={user.username ?? undefined}
          displayName={user.displayName ?? undefined}
          size={88}
        />
        <h1 className="text-2xl font-bold tracking-tight">
          {user.displayName ?? user.username}
        </h1>
        <p className="text-base opacity-80">@{user.username}</p>
        <p
          className={`text-xs font-semibold rounded-full border border-ink/20 px-3 py-1 ${
            user.userType === "CREATOR" ? "bg-sky/10" : "bg-peach/10"
          }`}
        >
          {user.userType === "CREATOR" ? "Creator" : "Student"}
        </p>
        {user.school && <p className="text-sm opacity-80">{user.school}</p>}
        {user.bio && (
          <p className="text-sm max-w-xs text-center opacity-90">{user.bio}</p>
        )}
        {isOwn && (
          <a href="/settings/profile" className="w-full">
            <PrimaryButton>Edit profile</PrimaryButton>
          </a>
        )}
      </div>

      <div className="w-full mt-6 border-t border-ink/10 pt-4">
        <h2 className="text-sm font-semibold mb-3">Posts</h2>
        <p className="text-sm opacity-70 text-center">
          {isOwn ? "Share your first post soon." : "No posts yet."}
        </p>
      </div>
    </PageShell>
  );
}
