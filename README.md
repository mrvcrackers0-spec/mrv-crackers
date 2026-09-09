# MRV Crackers

Production website for MRV Crackers — a premium festive crackers storefront with a WhatsApp-based ordering flow and a Supabase-backed admin panel.

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS v4
- React Router
- Zustand (cart state, persisted to localStorage)
- Supabase (Postgres, Auth, Storage)
- jsPDF (optional order summary PDF)
- Lucide React (icons)

## Getting started

```bash
npm install
npm run dev
```

The site runs immediately with built-in mock data (`src/lib/mockData.ts`) even without Supabase configured, so you can preview the UI right away. To connect a real backend, follow the Supabase setup below.

## Supabase setup

1. **Create a project** at [supabase.com](https://supabase.com).
2. **Run the schema**: open the SQL editor in your project and run the contents of [`supabase/schema.sql`](supabase/schema.sql). This creates the `categories`, `products`, and `site_settings` tables, enables Row Level Security, and sets up the `product-images` and `site-assets` storage buckets with their access policies.
3. **(Optional) Seed demo data**: run [`supabase/seed.sql`](supabase/seed.sql) to populate a placeholder `site_settings` row plus a handful of sample categories/products so the site isn't empty on first load. Everything it inserts can be edited or deleted later from `/admin`.
4. **Create an admin user**: in the Supabase dashboard go to Authentication → Users → Add user, and create an email/password login. Any authenticated user can access `/admin` — there is no public sign-up flow, so only accounts you create here can log in.
5. **Copy your API credentials**: in Project Settings → API, copy the Project URL and the `anon public` key.
6. **Configure the app**: copy `.env.example` to `.env` and fill in the two values:
   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
7. Restart the dev server (`npm run dev`). The app will now read/write real data from Supabase instead of the mock fallback.

The Supabase **service role key is never used in the frontend** — all admin writes go through the authenticated user's session under Row Level Security.

## Project structure

See `src/` — pages under `src/pages`, shared UI under `src/components`, data access under `src/services` (Supabase-first, mock-data fallback), Supabase/WhatsApp/PDF helpers under `src/lib`.

## Customer routes

`/home` · `/estimate` · `/cart` · `/contact-us`

## Admin routes

`/admin/login` · `/admin` · `/admin/products` · `/admin/categories` · `/admin/settings`

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build
- `npm run lint` — lint with oxlint
