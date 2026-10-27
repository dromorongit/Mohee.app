import { prisma } from "@/server/db"

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const testerEmails = (process.env.TESTER_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter((email): email is string => email.length > 0)

  const emails = [...(adminEmail ? [adminEmail] : []), ...testerEmails]

  for (const email of emails) {
    await prisma.allowedEmail.upsert({
      where: { email },
      update: {},
      create: { email },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
