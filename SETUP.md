# Ad Analytics Dashboard - Setup Guide

Welcome! This guide will get you up and running with the Ad Analytics Dashboard and introduce you to Claude Code.

---

## Part 1: Get the App Running on Netlify

Your app is already deployed via GitHub + Netlify, but you need to connect a database.

### Step 1: Create a Free Neon Database

1. Go to [neon.tech](https://neon.tech) and sign up (free tier is fine)
2. Create a new project (name it anything, like "ad-analytics")
3. Once created, you'll see a **Connection String** that looks like:
   ```
   postgresql://username:password@ep-something.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
4. **Copy this connection string** - you'll need it next

### Step 2: Add Environment Variables to Netlify

1. Go to your Netlify dashboard → Your site → **Site settings**
2. Click **Environment variables** in the sidebar
3. Add these three variables:

   | Key | Value |
   |-----|-------|
   | `DATABASE_URL` | Your Neon connection string from Step 1 |
   | `NEXTAUTH_SECRET` | Run `openssl rand -base64 32` in terminal to generate one |
   | `NEXTAUTH_URL` | Your Netlify URL (e.g., `https://your-site.netlify.app`) |

4. **Redeploy** your site (Deploys → Trigger deploy → Deploy site)

### Step 3: Push Database Schema

You need to create the database tables. In your terminal:

```bash
cd your-project-folder
npm install
npx prisma db push
```

This creates the User, AdAccount, and Campaign tables in your Neon database.

### Step 4: Test It!

1. Visit your Netlify URL
2. Click "Get Started" to sign up
3. Create an account and log in
4. The dashboard will auto-populate with demo campaign data

---

## Part 2: Introduction to Claude Code

Claude Code is an AI coding assistant that runs in your terminal. It can read your codebase, write code, run commands, and help you build features.

### Installing Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

Then authenticate:
```bash
claude login
```

### Using Claude Code

Navigate to your project folder and just run:
```bash
claude
```

You're now in an interactive session with Claude. Try these:

**Ask questions about the code:**
```
What does the auth flow look like in this app?
```

**Make changes:**
```
Add a "Total Clicks" card to the dashboard summary
```

**Run commands:**
```
Run the dev server
```

**Fix bugs:**
```
The login form isn't showing error messages, can you fix it?
```

### Pro Tips

1. **Be specific** - "Add a logout button to the sidebar" is better than "add logout"
2. **Claude reads your files** - It knows your codebase, so reference things naturally
3. **It can run terminal commands** - Ask it to install packages, run builds, etc.
4. **Review changes** - Claude shows you what it's changing before applying

### Example Session

```
You: Add a date filter dropdown to the dashboard that filters campaigns by "Last 7 days", "Last 30 days", "All time"

Claude: I'll add a date filter to the dashboard. Let me:
1. Create a DateFilter component
2. Add it to the dashboard page
3. Filter the campaign data based on selection
...
```

---

## Part 3: Local Development

Want to run the app locally while developing?

```bash
# Install dependencies
npm install

# Create .env file with your credentials
cp .env.example .env
# Edit .env and add your DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL

# Generate Prisma client
npx prisma generate

# Start dev server
npm run dev
```

Visit http://localhost:3000

**Quick test without database:**
- Email: `demo@test.com`
- Password: `demo123`

---

## Project Structure (Quick Reference)

```
src/
  app/
    page.tsx              # Landing page
    login/page.tsx        # Login form
    signup/page.tsx       # Signup form
    dashboard/page.tsx    # Main dashboard
    api/                  # Backend API routes
  components/
    ui/                   # Buttons, cards, inputs
    dashboard/            # Dashboard-specific components
  lib/
    auth.ts               # Authentication config
    db.ts                 # Database connection
```

---

## Need Help?

Just open Claude Code and ask! It knows this entire codebase.

```bash
claude
```

Then: "How do I add a new API endpoint?" or "Explain how authentication works"

Happy coding!
