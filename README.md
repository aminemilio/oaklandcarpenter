# Oakland Carpenter — California Carpentry Directory

A Next.js 16 directory site for licensed carpenters across California. **Completely free** — no paid tiers, no commission, no lead fees. Browse by city or service, CSLB license verification built into the listing flow, SEO-optimized content guides.

Built for free hosting on Vercel (with PostgreSQL switch — see below).

---

## What's included

- **Public directory** — browse carpenters by city (15 California cities) or by service (10 categories)
- **Listing detail pages** — each carpenter gets a full profile with contact info, services, CSLB license, and JSON-LD structured data for SEO
- **Free submission form** — carpenters submit their business; submissions go into a pending queue
- **Admin dashboard** at `/admin` — password-protected, approve/reject pending submissions, view stats
- **SEO content hub** at `/resources` — 4 keyword-optimized guides for California homeowners (how to hire a carpenter, cabinet costs, deck permits, license classes)
- **Real photography** — all CC0 / Public Domain / CC BY from Wikimedia Commons (attribution in footer)
- **Sitemap + robots.txt** — all routes submitted to search engines
- **Glass UI + scroll animations** — modern, professional design with Plus Jakarta Sans typography

## ⚠️ Read this before launching

**The sample data has been cleared.** The database is now empty — ready for real listings.

### How to get REAL carpenter listings

You have three options:

**Option A — Let carpenters submit themselves (recommended)**
1. Launch the site empty
2. Market it to California carpenters (Facebook groups, Reddit, trade associations)
3. Carpenters find the site, submit through the form at `/?view=submit`
4. You approve them in the admin dashboard at `/admin`
5. Each approved submission becomes a live listing

**Option B — Manually add real listings from the CSLB database**
1. Go to https://www.cslb.ca.gov/FindAContractor (Find a Licensed Contractor tool)
2. Search by city (e.g., "Oakland") and license class (B = General Building, C-6 = Cabinet & Millwork)
3. The CSLB tool shows: business name, license number, status, phone, address
4. Contact each carpenter to get consent and gather missing info (email, website, services, description)
5. Add them via the CSV import script (see below) or the admin dashboard

**Option C — CSV bulk import**
1. Collect real carpenter data in `scripts/listings.csv` (template included)
2. Run: `bun run scripts/import-csv.ts`
3. The script imports all listings, skipping duplicates

### CSV import format
The `scripts/listings.csv` file uses this header:
```
businessName,ownerName,city,county,region,primaryService,services,description,phone,email,website,address,licenseNumber,licenseClass,licenseStatus,yearEstablished,rating,reviewCount,featured,verified
```

Example row:
```
"Smith Carpentry",,Oakland,Alameda,Bay Area,General Carpentry,"General Carpentry, Framing, Deck Building","Licensed Class B contractor serving Oakland since 2005.",(510) 555-1234,smith@example.com,https://smithcarpentry.com,123 Main St Oakland CA,1024587,B,Active,2005,4.8,23,false,false
```

**Important:** Only list businesses that have consented. Do NOT scrape the CSLB database and publish listings without the carpenter's knowledge. If a business requests removal, you must honor it (per the Terms of Service).

---

## Tech stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS 4** + **shadcn/ui**
- **Prisma ORM** with **SQLite** (local dev) — switch to **PostgreSQL** for Vercel production
- **Plus Jakarta Sans** typography, warm amber/espresso color palette
- **Framer Motion** scroll-reveal animations
- **Real photography** — all CC0 / Public Domain / CC BY from Wikimedia Commons (attribution in footer)

## Project structure

```
prisma/
  schema.prisma          # Listing + Submission models
src/
  app/
    layout.tsx           # Root layout, fonts, metadata, JSON-LD
    page.tsx             # Main router (URL-param-based view switching)
    globals.css          # Warm amber/espresso theme + glass utilities
    api/
      listings/route.ts  # GET listings (filter/search), single by id
      cities/route.ts    # GET cities with listing counts
      services/route.ts  # GET service categories with counts
      submit/route.ts    # POST public submission (validates + dedup)
  components/
    directory/
      site-header.tsx    # Glass navbar, scroll-aware
      site-footer.tsx    # Multi-column + newsletter + photo credits
      listing-card.tsx   # Featured cards with image header
      reveal.tsx         # Framer Motion scroll-reveal wrappers
      types.ts           # Shared types + URL param helpers
      views/
        home-view.tsx
        browse-view.tsx
        city-view.tsx
        listing-detail-view.tsx
        submit-view.tsx
        pricing-view.tsx
        about-view.tsx
    ui/                  # shadcn/ui components
  lib/
    db.ts                # Prisma client
    images.ts            # CC-licensed image registry + attribution data
    format.ts            # Star ratings, license labels, etc.
public/
  logo.svg               # Hammer + wood favicon
  robots.txt
  sitemap.xml            # Home + 15 city pages + 10 service pages
scripts/
  seed.ts                # ⚠️ SAMPLE data — do not use in production
  clear-data.ts          # Wipes all listings + submissions
  fetch_free_images.py   # Helper to fetch CC images from Wikimedia
.env.example             # Environment variable template
```

## Local development

```bash
# Install dependencies
bun install

# Set up the database (SQLite, file-based)
bun run db:push

# (Optional) Seed with sample data for testing
bun run scripts/seed.ts

# Start dev server
bun run dev
# Open http://localhost:3000
```

## Production deployment on Vercel

### Critical: switch SQLite → PostgreSQL

Vercel serverless functions don't have a persistent filesystem. SQLite won't work in production — every deployment wipes the database and writes don't persist across invocations. You **must** switch to PostgreSQL.

#### Step 1: Set up a Postgres database (free options)

Pick one:

- **Neon** (recommended, generous free tier): [neon.tech](https://neon.tech) — sign up, create a project, copy the connection string
- **Vercel Postgres**: in your Vercel project → Storage tab → Create → Postgres (free on Hobby)
- **Supabase**: [supabase.com](https://supabase.com) — free tier, gives you a Postgres connection string
- **Railway**: [railway.app](https://railway.app) — free trial, then $5/month

Get your `DATABASE_URL` — it looks like:
```
postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?schema=public
```

#### Step 2: Update Prisma schema

In `prisma/schema.prisma`, change line 13:
```prisma
datasource db {
  provider = "postgresql"   # was "sqlite"
  url      = env("DATABASE_URL")
}
```

#### Step 3: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Oakland Carpenter directory"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/oaklandcarpenter.git
git push -u origin main
```

#### Step 4: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Framework preset: **Next.js** (auto-detected)
4. Root directory: `./` (default)
5. Build command: `next build` (default)
6. Output directory: `.next` (default)
7. Install command: `bun install` (or `npm install`)

#### Step 5: Set environment variables

In Vercel project settings → Environment Variables, add:

| Name | Value | Environments |
|------|-------|--------------|
| `DATABASE_URL` | `postgresql://...` (from step 1) | Production, Preview |

#### Step 6: Deploy + push schema

1. Click **Deploy** — the first build will succeed but the database is empty
2. After deploy, push the Prisma schema to your production database:

```bash
# From your local machine, with the production DATABASE_URL set:
DATABASE_URL="postgresql://your-production-url" bun run db:generate
DATABASE_URL="postgresql://your-production-url" bun run db:push
```

Or use the Vercel CLI:
```bash
vercel env pull .env.production
bun run db:push
```

#### Step 7: Decide on data

**For an empty production launch (recommended):**
- Don't run any seed script
- The site launches with "no carpenters yet" messages on city pages
- Carpenters submit their own listings through the form
- You approve them in the database (admin UI not built yet — use Prisma Studio or raw SQL)

**For a seeded production launch (use your own real data):**
- Write your own seed script with real listings sourced from the CSLB database
- Only include businesses that have consented to being listed
- Run: `DATABASE_URL="your-production-url" bun run scripts/your-seed.ts`

#### Step 8: Connect your domain

In Vercel project settings → Domains:
1. Add `oaklandcarpenter.com`
2. Add `www.oaklandcarpenter.com` (redirect to apex)
3. Update your DNS at your registrar (Namecheap, GoDaddy, etc.) to point to Vercel's nameservers or add the A/CNAME records Vercel shows you

#### Step 9: Submit to search engines

1. [Google Search Console](https://search.google.com/search-console) — add your property, verify via DNS, submit `https://oaklandcarpenter.com/sitemap.xml`
2. [Bing Webmaster Tools](https://www.bing.com/webmasters) — same process

---

## After launch

### Approving submissions via the admin dashboard

When a carpenter submits through the public form, the submission lands in the `Submission` table with `status='pending'`. To approve:

1. Go to `https://oaklandcarpenter.com/admin`
2. Enter your `ADMIN_PASSWORD` (set in Vercel env vars)
3. You'll see pending submissions with full details
4. For each submission:
   - Click "Show full details" to see all submitted info
   - Click the "Verify license on cslb.ca.gov" link to check the CSLB license
   - Check "Verified (CSLB checked)" if the license is valid
   - Check "Featured (top placement)" if you want this listing featured (free, admin-curated)
   - Click "Approve & publish" to create the listing, OR "Reject" to mark it rejected

The admin dashboard also shows:
- Total published listings, verified count, featured count
- Pending / approved / rejected submission counts
- Top cities by listing count

**Note:** The admin auth is simple password-based (env var check via header). For a larger team or more security, replace with NextAuth.js + proper session management.

### Adding more SEO articles

The 4 built-in articles live in `src/lib/articles.ts`. To add more:

1. Add a new article object to the `ARTICLES` array with a unique `slug`, `title`, `description`, `keywords`, `category`, `readTime`, `lastUpdated`, `content` (array of sections), and optional `faq`
2. Add the new URL to `public/sitemap.xml`
3. The article automatically appears on `/resources` and is linked from related articles

Article topics that rank well for California carpenter directories:
- "Best carpenter in [city]" per major city
- "How much does [service] cost in [city]"
- "Do I need a permit for [project] in [city]"
- "What to look for when hiring a [trade]"

### Repurposing "Featured"

There's no paid Featured tier — the directory is completely free. The `featured` field on listings is admin-curated: you check the "Featured" box in the admin dashboard when approving a submission, and that listing gets top placement + a gold badge. Use it to highlight:
- Long-standing businesses with consistently good reviews
- Businesses with verified CSLB licenses in good standing
- Businesses that have been with the directory longest

### SEO improvements for later

The current setup uses URL search params (`?view=city&city=Oakland`) for all views. For maximum SEO, consider adding real Next.js routes:

```
/oakland                              → city page
/oakland/redwood-craft-carpentry      → listing detail
/browse/custom-cabinets               → service browse
/resources/how-to-hire-carpenter      → article
```

This requires adding dynamic route files in `src/app/`. Each route gets its own URL, which Google prefers over query-param URLs. The data access functions are already in `src/lib/queries.ts` ready to use.

---

## Verification

Before launching, verify:

- [ ] `prisma/schema.prisma` provider is `postgresql` (not `sqlite`)
- [ ] `DATABASE_URL` env var is set in Vercel (production Postgres connection string)
- [ ] `ADMIN_PASSWORD` env var is set in Vercel (choose a strong password)
- [ ] `bun run db:push` ran successfully against production database
- [ ] Sample seed data was NOT run on production (or was cleared with `clear-data.ts`)
- [ ] All images load (Wikimedia URLs sometimes rate-limit — if you see broken images, download them and host in `/public/images/`)
- [ ] Submit form works end-to-end (submit a test listing, check it appears in `/admin`)
- [ ] Admin dashboard works (log in at `/admin`, approve a test submission)
- [ ] Domain is connected and SSL is active
- [ ] Sitemap submitted to Google Search Console

## License

MIT for the code. Photography is CC0 / Public Domain / CC BY — see footer for individual attributions.

## Disclaimer

Oakland Carpenter is an independent directory and is not affiliated with the California Contractors State License Board (CSLB). Always verify a contractor's license directly with the CSLB before hiring.
