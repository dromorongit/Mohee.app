# Mohee.app

Mohee — brand scaffold with Next.js (App Router, TypeScript, Tailwind).

## Install

```bash
npm install
```

## Run (dev)

```bash
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Test

```bash
npm test
```

## Database

This app uses [Prisma](https://www.prisma.io) (v7) with PostgreSQL on Railway.

### Get `DATABASE_URL`

Open the Railway dashboard, select your PostgreSQL service, go to **Connect**, and copy the connection string (`DATABASE_URL`). Read it from `DATABASE_URL` only — never print or commit it.

### Setup

1. Copy `.env.example` to `.env` (gitignored — never commit secrets).
2. Set `DATABASE_URL` from Railway, plus `ADMIN_EMAIL` (required) and optional `TESTER_EMAILS` (comma-separated).
3. Install dependencies and generate the Prisma Client:

```bash
npm install
npm run db:generate
```

### Commands

```bash
# Create the first migration (without applying):
npx prisma migrate dev --create-only --name init

# Append any manual SQL (e.g. CHECK constraints) to the generated migration.sql, then apply:
npx prisma migrate dev
# (shortcut: npm run db:migrate)

# Open Prisma Studio
npm run db:studio

# Seed allowed_emails from ADMIN_EMAIL / TESTER_EMAILS
npm run db:seed

# Regenerate Prisma Client after schema changes
npm run db:generate
```

The seed script reads `ADMIN_EMAIL` and `TESTER_EMAILS` from `.env`, lowercases and trims them, and upserts each into `allowed_emails`.

## Environment

Copy `.env.example` to `.env` and fill in placeholders as needed. `.env` is gitignored — never commit secrets.

### Auth (magic-link login)

Auth.js v5 (`next-auth@beta`) with the Nodemailer provider handles magic-link authentication:

- `AUTH_SECRET` — required in production; signs session cookies and verification tokens. Generate with `openssl rand -base64 32`.
- `AUTH_URL` — public URL of the app, used in magic-link callbacks (e.g. `http://localhost:3000`).
- `EMAIL_SERVER` — SMTP connection string (e.g. `smtp://user:pass@host:port`). Leave empty in development to print magic links to the terminal instead of sending.
- `EMAIL_FROM` — "From" address for magic-link emails (e.g. `Mohee <no-reply@mohee.app>`).
- `ADMIN_EMAIL` — the admin's email; the first user created with this email gets `is_admin` set to true.

Flow:
1. Invite an email by adding it to `allowed_emails` (seed script upserts `ADMIN_EMAIL` and `TESTER_EMAILS`).
2. The user enters their email on `/login`; if it is on the allowlist, a signed magic link (valid 15 minutes) is emailed.
3. Clicking the link signs the user in and creates their account on first use.
4. `/home` and `/onboarding` are protected; suspended users (`is_active = false`) cannot sign in and existing sessions stop working.

## Tech

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- ESLint
- Nunito (Google font, via next/font)
- [Auth.js v5](https://authjs.dev) (next-auth@beta) with [@auth/prisma-adapter](https://authjs.dev/reference/adapter/prisma) and Nodemailer
