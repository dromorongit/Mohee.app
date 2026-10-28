import Image from "next/image"

const AVATAR_COLORS = ["#FF8A1F", "#FF6A00", "#7DBDEB", "#FCAF8F"]

export function Avatar({
  username,
  displayName,
  size = 48,
  imageUrl,
  className,
}: {
  username?: string
  displayName?: string
  size?: number
  imageUrl?: string
  className?: string
}) {
  const name = (displayName ?? username ?? "").trim()
  const parts = name.split(/\s+/).filter(Boolean)
  const initials = parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "?"

  let hash = 0
  const seed = username ?? name
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0
  }
  const color = AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]

  return (
    <div
      className={`flex items-center justify-center rounded-full text-ink font-semibold ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        fontSize: Math.max(12, Math.round(size * 0.4)),
        lineHeight: 1,
        backgroundColor: color,
      }}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt=""
          fill
          className="rounded-full object-cover"
          sizes={`${size}px`}
        />
      ) : (
        initials
      )}
    </div>
  )
}
