# Codetopia Community Website

Public hub for Codetopia Community — an open community where people in tech do real work together, based in Ghana and open to the world. Events, careers, articles, gallery, how-to guides, community impact stories, and the archive of past mentorship programmes, plus a full admin panel.

Teaching (mentorship programmes, courses, structured learning) belongs to Codetopia Academy, not the community. Don't add copy that promises it here.

In visitor-facing copy, avoid em dashes. Use a full stop, colon or comma instead.

**Production:** [community.codetopia.org](https://community.codetopia.org)

---

## Stack

Next.js 15 (App Router) · TypeScript · PostgreSQL (Prisma) · Tailwind CSS · Biome · shadcn/ui · Cloudinary · Resend · pnpm

---

## Project structure

```
src/
  app/
    (site)/       # public pages — about, articles, careers, events,
                  # gallery, howtos, impact, mentorships, team
    admin/        # admin panel — gallery, impact, careers, mentorships,
                  # newsletter, spotlight, team, events, articles config
    api/          # public read endpoints + admin CRUD endpoints
  components/
    home/         # homepage sections
    admin/        # tables, forms, modals
    layout/       # Header, Footer, Container, ThemeToggle
    ui/           # shadcn/ui primitives
  lib/
    howtos.ts     # fetches MDX guides from codetopiacommunity/community-howtos via GitHub API
    hashnode.ts   # fetches articles from the Hashnode publication's RSS feed
  types/
    index.ts      # shared TypeScript interfaces
prisma/
  schema.prisma   # all models
```

---

## Architecture

- **Server components** handle data fetching. **Client islands** (`"use client"`) handle interactivity.
- Pages use `export const revalidate = 60` (ISR) — the DB is never queried at build time.
- How-to guides are MDX files in a separate repo (`codetopiacommunity/community-howtos`), fetched live via the GitHub API.
- Articles are read from the Hashnode publication's RSS feed (`https://<host>/rss.xml`). Hashnode's GraphQL API needs a Pro plan for every request since May 2026, so it is not used. The Hashnode host and featured slugs are stored in the DB and configurable from the admin panel.
- Admin auth uses SSO via the Community Portal (OAuth2 + PKCE). Optional — the app runs without the SSO env vars but admin login will fail.

---

## Database models

| Model | Purpose |
|-------|---------|
| `Admin` | Admin panel users |
| `TeamMember` | Team members, linked to mentorships |
| `GalleryAlbum` + `GalleryPhoto` | Photo albums and their photos (cascade delete) |
| `ImpactStory` | Community impact events (`startDate` is ISO string `YYYY-MM-DD`, not DateTime) |
| `Event` | Community events |
| `Mentorship` | Mentorship programmes, linked to `TeamMember` |
| `Career` | Open roles / job listings |
| `Spotlight` | Technical spotlights on community members |
| `Newsletter` + `NewsletterDeliveryLog` | Email campaigns and delivery tracking |
| `Subscriber` | Newsletter subscribers (email-verified) |
| `ArticlesConfig` | Hashnode host + featured article slugs (one row, admin-configurable) |

---

## Design system

The site has a deliberate editorial/brutalist aesthetic. Follow these when writing UI:

- **No rounded corners** — always `rounded-none`, never `rounded-md` etc.
- **Headings** — `font-sans font-black uppercase tracking-tighter`
- **Body / labels** — `font-mono`; small labels use `text-[10px] uppercase tracking-[0.3em] text-muted-foreground`
- **Palette** — black/zinc/white on dark surfaces. Content pages (articles, howtos) use `foreground` / `background` / `border` CSS tokens and support light/dark mode via `ContentThemeProvider`.
- **Layout** — border-based, not shadow-based. Use the `Container` component for max-width sections.
- **Hover** — list rows use `hover:bg-foreground/[0.03]`; links use `hover:text-white`
- **Active / selected state** — `bg-foreground text-background border-foreground`
- **Transitions** — `transition-colors duration-200` standard

---

## Commands

```bash
pnpm dev          # start dev server
pnpm build        # production build
pnpm check        # lint + format check
pnpm check:fix    # auto-fix lint + format
pnpm doctor       # React Doctor checks
```

---

## Key conventions

- Use Next.js `<Link>` for all internal navigation, never `<a>`
- `ImpactStory.startDate` is stored as an ISO string (`YYYY-MM-DD`), not a `DateTime` — sort lexicographically
- Gallery album photo counts use `_count.photos` (Prisma count), not `photos.length` (only 1 photo is fetched per album for the cover)
- Commits follow [Conventional Commits](https://www.conventionalcommits.org): `feat:`, `fix:`, `chore:`, `docs:`, `style:`
- All work branches off `dev`. PRs go into `dev`, then `dev → main` to ship to production.
