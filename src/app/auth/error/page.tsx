export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: { message?: string } | Promise<{ message?: string }>
}) {
  const message = (await searchParams)?.message

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-page-bg text-ink px-6">
      <div className="max-w-xs text-center space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">
          That link is expired or invalid
        </h2>
        <p className="text-ink opacity-80">
          Magic links work once and expire after 15 minutes. Request a new one
          to try again.
        </p>
        {message && (
          <p className="text-xs text-ink/50 mt-2">({message})</p>
        )}
        <a
          href="/login"
          className="inline-block w-full h-12 rounded-full bg-orange text-white font-semibold text-lg flex items-center justify-center shadow-lg"
        >
          Request a new link
        </a>
      </div>
    </div>
  )
}
