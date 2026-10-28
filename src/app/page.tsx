import { getOptionalUser } from "@/server/require-user"
import { redirect } from "next/navigation"
import Image from "next/image"

import PageShell from "@/components/page-shell"
import { PrimaryButton } from "@/components/primary-button"

export default async function Home() {
  const user = await getOptionalUser()
  if (user) {
    redirect("/home")
  }

  return (
    <PageShell>
      <div className="flex flex-col items-center gap-6 text-center">
        <Image
          src="/brand/moheeapplogo.png"
          alt="Mohee logo"
          width={120}
          height={120}
          priority
          className="rounded-full"
        />
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold tracking-tight">Mohee</h1>
          <p className="text-lg opacity-90">Welcome</p>
        </div>
        <p className="text-sm opacity-80 max-w-xs">
          A friendly place for students and creators to share what they make.
        </p>
        <p className="text-xs opacity-50">
          Mohee means Welcome.
        </p>
        <a href="/login" className="w-full">
          <PrimaryButton>Log in</PrimaryButton>
        </a>
      </div>
    </PageShell>
  );
}
