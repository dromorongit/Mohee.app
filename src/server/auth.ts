import type { Session } from "next-auth"
import nodemailer from "nodemailer"
import NextAuth, { type NextAuthConfig } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Nodemailer from "next-auth/providers/nodemailer"

import { prisma } from "./db"

declare module "@auth/core/types" {
  interface Session {
    user: {
      id: string
      email: string
      isAdmin: boolean
      onboardingCompleted: boolean
    } & DefaultSession["user"]
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    isActive: boolean
    isAdmin: boolean
    onboardingCompleted: boolean
  }
}

const isDev = process.env.NODE_ENV === "development"
const hasEmailServer = Boolean(process.env.EMAIL_SERVER)

const LINK_MAX_AGE_SECONDS = 15 * 60

const transporter = hasEmailServer
  ? nodemailer.createTransport(process.env.EMAIL_SERVER!)
  : null

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Nodemailer({
      server: process.env.EMAIL_SERVER || "smtp://localhost:25",
      from: process.env.EMAIL_FROM,
      maxAge: LINK_MAX_AGE_SECONDS,
      sendVerificationRequest: async ({ identifier, url }) => {
        if (isDev && !hasEmailServer) {
          console.log(`[Mohee dev] Magic link for ${identifier}: ${url}`)
          return
        }
        if (!transporter) {
          throw new Error("EMAIL_SERVER is not configured")
        }
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: identifier,
          subject: "Your Mohee login link",
          text: emailText(identifier, url),
          html: emailHtml(identifier, url),
        })
      },
    }),
  ],
  session: { strategy: "database" },
  trustHost: true,
  pages: {
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, email }) {
      const isVerificationRequest = email?.verificationRequest === true
      const emailAddress = user?.email?.trim().toLowerCase()
      if (!emailAddress) {
        return false
      }

      const allowed = await prisma.allowedEmail.findUnique({
        where: { email: emailAddress },
      })
      if (!allowed) {
        return false
      }

      if (!isVerificationRequest) {
        const existing = await prisma.user.findUnique({
          where: { email: emailAddress },
        })
        if (!existing?.isActive) {
          return false
        }
      }

      return true
    },
    async session({ session, user }) {
      if (!user?.isActive) {
        return null as unknown as Session
      }
      session.user.id = user.id
      session.user.email = user.email
      session.user.isAdmin = user.isAdmin
      session.user.onboardingCompleted = user.onboardingCompleted
      return session
    },
  },
  events: {
    async createUser({ user }) {
      const adminEmail = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase()
      const email = user.email ?? ""
      await prisma.user.update({
        where: { id: user.id },
        data: {
          email: email.toLowerCase(),
          isAdmin: email.toLowerCase() === adminEmail,
        },
      })
    },
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

function emailText(identifier: string, url: string): string {
  return [
    `Hi ${identifier},`,
    "",
    "Here is your Mohee login link:",
    url,
    "",
    "It works for 15 minutes. After that, it expires and can no longer be used.",
    "If you didn’t ask for this link, you can safely ignore this email.",
    "",
    "— Mohee",
  ].join("\n")
}

function emailHtml(identifier: string, url: string): string {
  return `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#F3DDBC;font-family:Nunito,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table width="100%" style="max-width:480px;background:#ffffff;border-radius:16px;overflow:hidden;" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td align="center" style="background:#FF8A1F;padding:24px 16px;">
                <h1 style="margin:0;font-size:24px;color:#ffffff;">Mohee</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 24px 8px;color:#2B2B2B;font-size:16px;line-height:1.5;">
                <p style="margin:0 0 12px;">Hi ${identifier},</p>
                <p style="margin:0 0 16px;">Tap the button below to sign in to Mohee:</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:8px 24px 24px;">
                <a href="${url}" style="display:inline-block;background:#FF8A1F;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:700;font-size:16px;padding:14px 28px;">Sign in to Mohee</a>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 24px;color:#6B5B46;font-size:14px;line-height:1.5;">
                <p style="margin:0 0 8px;">This link works for 15 minutes, then it expires.</p>
                <p style="margin:0;">If you didn’t ask for this link, you can safely ignore this email.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`.trim()
}
