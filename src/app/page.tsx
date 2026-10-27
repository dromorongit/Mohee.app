import { getOptionalUser } from "@/server/require-user"
import { redirect } from "next/navigation"
import Image from "next/image"

export default async function Home() {
  const user = await getOptionalUser()
  if (user) {
    redirect("/home")
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-page-bg text-ink">
      <header className="w-full max-w-xs px-4 py-8 flex flex-col items-center gap-6">
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
          <p className="text-lg text-ink opacity-90">Welcome</p>
        </div>
        <a href="/login">
          <button className="w-full h-12 rounded-full bg-orange text-white font-semibold text-lg shadow-lg">
            Log in
          </button>
        </a>
      </header>
    </div>
  );
}
