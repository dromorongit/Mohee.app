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
# Create and apply the first migration against Railway:
npx prisma migrate dev --name init
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

## Tech

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- ESLint
- Nunito (Google font, via next/font)
