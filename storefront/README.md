# Shree Fashion — Custom Website

A custom-coded storefront for **Shree Fashion** (ladies' clothing), replacing the current Shopify site at shree-fashion.com.

## Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 14 (App Router, TypeScript) | Deploys natively on Vercel |
| Hosting | Vercel | Free/Pro tier, connect GitHub repo for auto-deploys |
| Database + Auth | Supabase | Postgres DB, customer accounts, storage for product images |
| Payments | Razorpay | Orders API + signature verification, online payments only (no COD) |
| Domain | GoDaddy | Point DNS to Vercel |
| Styling | Tailwind CSS | |

## Why this repo currently only has scaffolding

Building the full storefront, admin panel, and checkout flow is a real software project — it needs iterative coding, running, and testing that's better done in an actual dev environment (VS Code / GitHub Codespaces) than generated all at once in a chat. This repo gives you a correct, working foundation (config, Supabase clients with auth/session handling, DB schema, env setup) so building the rest is filling in well-defined pieces, not starting from a blank folder.

See **PHASES.md** for the build order.

## Using your GitHub Student Developer Pack

You mentioned having the GitHub Student Pack — here's what's actually useful for this project:

- **GitHub Codespaces** — spin up a full cloud dev environment (VS Code in the browser) with no local setup. Good option if you don't want to install Node.js locally.
- **GitHub Copilot (Student)** — free while building; will meaningfully speed up filling in the phases below once you're coding in an editor.
- **GitLens / GitKraken** — nicer git history/visualization once you're branching per phase.
- **1Password** — a good habit for storing your Supabase/Razorpay secret keys instead of leaving them in plain text notes.
- **Icons8** — free icons for product categories, payment badges, social icons, etc.
- **Polypane** — browser for testing the storefront across phone/tablet/desktop sizes as you build — genuinely useful for an e-commerce UI.
- **Sentry** — worth wiring up once checkout is live, to catch real payment/order errors in production.
- **Notion** — could be a lightweight place to track the phases/tasks below instead of a separate project tool.

Not needed for this project: MongoDB (using Supabase/Postgres instead), Heroku credits, Azure credits, Namecheap/Name.com domain (you already own the GoDaddy domain).

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from your Supabase project settings → API
- `SUPABASE_SERVICE_ROLE_KEY` — same page, **server-only**, never expose to the browser
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` — from Razorpay Dashboard → API Keys
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` — same as `RAZORPAY_KEY_ID`, exposed to the client for the checkout widget
- `NEXT_PUBLIC_SITE_URL` — e.g. `https://shree-fashion.com` in production, `http://localhost:3000` locally

## Database

`supabase/schema.sql` has the full schema (products, categories, profiles with an `is_admin` flag, addresses, orders, order_items) with Row Level Security policies. Run it in the Supabase SQL editor for a new project before writing any app code.

## Getting started (once you say go on building)

```bash
npm install
cp .env.example .env.local   # then fill in real values
npm run dev
```

## Product import

Once you send the Excel sheet, `scripts/import-products.mjs` will read it and bulk-insert into the `products` table using the service role key — this seeds your initial catalog. After that, new products go through the admin panel, which writes to the same table.
