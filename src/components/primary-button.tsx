export function PrimaryButton({
  children,
  className,
  disabled,
  ...props
}: {
  children: React.ReactNode
  className?: string
  disabled?: boolean
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">) {
  return (
    <button
      disabled={disabled}
      className={`w-full min-h-[48px] px-6 text-center rounded-full bg-orange text-ink font-semibold text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange active:bg-orange/90 disabled:opacity-60 disabled:cursor-not-allowed ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
