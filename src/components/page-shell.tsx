export default function PageShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-dvh flex flex-col items-center">
      <main className="flex-1 w-full mx-auto max-w-sm px-6 py-8">
        {children}
      </main>
    </div>
  );
}
