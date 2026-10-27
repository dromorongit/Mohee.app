import { prisma } from "@/server/db"

export async function GET() {
  try {
    await prisma.$queryRawUnsafe("SELECT 1")
  } catch {
    return Response.json(
      { status: "error", message: "Database unavailable" },
      { status: 500 },
    )
  }

  return Response.json({ status: "ok" })
}
