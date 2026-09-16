# Build Phases

Recommended order — each phase should be a separate git branch/PR, working and deployable before moving to the next. Do this in VS Code or GitHub Codespaces, ideally with Copilot on.

## Phase 0 — Project setup (done in this scaffold)
- Next.js + Tailwind config
- Supabase client helpers (browser, server, middleware session refresh)
- `.env.example`
- Push this repo to GitHub

## Phase 1 — Database schema
- Run `supabase/schema.sql` in a new Supabase project
- Confirm tables: `categories`, `products`, `profiles`, `addresses`, `orders`, `order_items`
- Confirm Row Level Security policies work (customers see only their own orders/addresses; anyone can read products; only admins can write products)

## Phase 2 — Storefront: browsing
- Home page (hero + featured products)
- Product listing page with category filter
- Product detail page (images, sizes, price, "add to cart")
- Pull data from Supabase `products` table (public read)

## Phase 3 — Product import
- Send the Excel sheet
- `scripts/import-products.mjs` maps columns → `products` table and bulk inserts
- Verify products show correctly on the storefront

## Phase 4 — Cart
- Client-side cart (React context + localStorage), no DB needed yet
- Cart page: quantities, remove item, subtotal

## Phase 5 — Customer accounts
- Supabase Auth: signup/login (email + password, or add Google later)
- Account page: order history, saved addresses
- Auth-gated checkout (must be logged in to place an order)

## Phase 6 — Checkout + Razorpay
- Checkout page: shipping address form
- API route creates a Razorpay order server-side
- Razorpay Checkout widget on the client
- API route verifies payment signature, marks order as paid, writes `orders` + `order_items` rows

## Phase 7 — Admin panel
- `/admin` routes protected by `is_admin` flag on the logged-in user's profile (middleware already scaffolded for this)
- Product CRUD (create/edit/delete, upload images to Supabase Storage)
- Orders view (list, status, mark as shipped/delivered)

## Phase 8 — Polish
- Loading/error states, empty states (empty cart, no orders yet)
- Mobile responsiveness pass (Polypane is useful here)
- Basic SEO: metadata, product page titles/descriptions, sitemap

## Phase 9 — Deploy
- Push to GitHub, connect repo to Vercel
- Add environment variables in Vercel project settings
- Point GoDaddy domain's DNS to Vercel (A record / CNAME as Vercel instructs)
- Set up Razorpay webhook pointing at production URL

## Phase 10 — Post-launch
- Add Sentry for error tracking
- Analytics (Vercel Analytics or similar)
- Abandoned cart / low stock alerts, discount codes, reviews — only once the core flow is solid
