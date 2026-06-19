# Backend (data layer)

This folder holds **database definitions and seeds** for the portfolio. Runtime API logic lives in the Next.js app at `../frontend/app/api/*`, which connects to Supabase using server-side credentials.

## What lives here

| Path | Purpose |
|------|---------|
| `supabase/schema.sql` | Tables: `messages`, `projects`, `analytics_events` |
| `supabase/seed.sql` | Initial project rows (Loan Approval Intelligence, Sneakify) |

## How it connects to the frontend

1. Create a Supabase project and run `schema.sql`, then `seed.sql`, in the SQL Editor.
2. In `frontend/.env.local`, set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`.
3. The Next.js **API routes** (`/api/contact`, `/api/projects`, `/api/analytics`) use the **service role** key only on the server to insert/select rows.
4. The browser never receives the service role key; forms call same-origin `/api/*` routes.

## Environment variables (reference)

Copy the same variable *names* into Vercel for production. Values come from Supabase **Project Settings → API**.

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (reserved for future client-side features; API routes do not require it today)
- `SUPABASE_SERVICE_ROLE_KEY` (**secret**, server-only)

See the repository root `README.md` for full setup and deployment.
