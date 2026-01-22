# Ad Analytics Dashboard

A SaaS MVP for tracking Meta Ads and Google Ads campaign performance in one unified dashboard.

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![Tailwind](https://img.shields.io/badge/Tailwind-4-blue) ![Prisma](https://img.shields.io/badge/Prisma-5-green)

## Features

- User authentication (signup/login)
- Dashboard with campaign metrics (spend, conversions, ROAS, impressions)
- Campaign table with Meta and Google Ads data
- Auto-seeded demo data for new users
- AI recommendations placeholder (coming soon)

## Quick Start

**New here?** Check out [SETUP.md](./SETUP.md) for detailed instructions on:
- Setting up Neon database
- Configuring Netlify environment variables
- Getting started with Claude Code

**Demo mode** (no database needed):
```
Email: demo@test.com
Password: demo123
```

## Development

```bash
npm install
npm run dev
```

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Neon PostgreSQL + Prisma
- **Auth:** NextAuth.js v5
- **Charts:** Recharts
- **Deployment:** Netlify

## Environment Variables

```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
```

---

Built with [Claude Code](https://claude.ai/code)
