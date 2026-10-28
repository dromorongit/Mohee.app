import PageShell from "@/components/page-shell"
import { PrimaryButton } from "@/components/primary-button"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: { message?: string } | Promise<{ message?: string }>
}) {
  const message = (await searchParams)?.message

  return (
    <PageShell>
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">
          That link is expired or invalid
        </h2>
        <p className="opacity-80 max-w-xs">
          Magic links work once and expire after 15 minutes. Request a new one
          to try again.
        </p>
        {message && (
          <p className="text-xs opacity-50 mt-2">({message})</p>
        )}
        <a href="/login" className="w-full">
          <PrimaryButton>Request a new link</PrimaryButton>
        </a>
      </div>
    </PageShell>
  );
}
