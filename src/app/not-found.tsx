import PageShell from "@/components/page-shell"

export default function NotFound() {
  return (
    <PageShell>
      <div className="flex flex-col items-center gap-4 text-center py-24">
        <h1 className="text-3xl font-bold tracking-tight">Profile not found</h1>
        <p className="opacity-80 max-w-xs">
          We couldn&apos;t find that account. It may not exist or may be suspended.
        </p>
        <a href="/home" className="text-sm underline underline-offset-4">
          Go home
        </a>
      </div>
    </PageShell>
  );
}
