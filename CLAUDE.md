# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ad Analytics Dashboard - A SaaS MVP for tracking Meta Ads and Google Ads campaign performance in a unified dashboard.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
npx prisma generate        # Generate Prisma client after schema changes
npx prisma db push         # Push schema changes to database
```

## Architecture

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS, Prisma + Neon PostgreSQL, NextAuth.js v5 (beta), Recharts

### Authentication Flow
- NextAuth.js v5 with credentials provider (`src/lib/auth.ts`)
- Route protection via `authorized` callback in auth config
- Middleware exports auth as middleware (`src/middleware.ts`)
- Demo mode: `demo@test.com` / `demo123` works without database

### Data Models (Prisma)
- `User` → has many `AdAccount` → has many `Campaign`
- Campaigns store: spend, impressions, clicks, conversions, roas, status, platform

### API Routes
- `/api/auth/[...nextauth]` - NextAuth handlers
- `/api/signup` - User registration (hashes password with bcryptjs)
- `/api/dashboard` - Returns campaigns + summary metrics (demo user gets mock data)
- `/api/seed` - Auto-seeds mock campaign data on first login

### Key Patterns
- Prisma client singleton in `src/lib/db.ts` with global caching for dev
- Mock data generator in `src/lib/mock-data.ts` for seeding realistic campaign metrics
- Dashboard auto-seeds data for new users, skips for demo user

## Environment Variables

Required in `.env`:
- `DATABASE_URL` - Neon PostgreSQL connection string
- `NEXTAUTH_SECRET` - JWT secret (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL` - App URL (http://localhost:3000 for local)

## Deployment

Configured for Netlify via `netlify.toml` with `@netlify/plugin-nextjs`.
