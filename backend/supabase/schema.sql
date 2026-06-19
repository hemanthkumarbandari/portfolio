-- Portfolio database schema for Supabase (PostgreSQL)
-- Run in Supabase SQL Editor or via migration tooling.

-- Extensions (uuid generation)
create extension if not exists "pgcrypto";

-- Messages from contact form
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_created_at_idx on public.messages (created_at desc);

-- Projects showcased on the site
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  description text not null,
  problem text,
  solution text,
  impact text,
  tech_stack text[] not null default '{}',
  github_link text,
  demo_link text,
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_featured_sort_idx on public.projects (featured desc, sort_order asc);

-- Optional analytics events
create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  path text,
  meta jsonb,
  created_at timestamptz not null default now()
);

create index if not exists analytics_events_created_at_idx on public.analytics_events (created_at desc);

-- Row Level Security: direct client access off; server uses service role (bypasses RLS)
alter table public.messages enable row level security;
alter table public.projects enable row level security;
alter table public.analytics_events enable row level security;

-- No policies for anon/authenticated = deny direct table access from browser keys
-- API routes use SUPABASE_SERVICE_ROLE_KEY

-- Optional: allow public read of projects via anon (uncomment if you prefer client-side fetch)
-- create policy "Public read projects" on public.projects for select using (true);

comment on table public.messages is 'Inbound contact form submissions';
comment on table public.projects is 'Portfolio project records';
comment on table public.analytics_events is 'Lightweight page/event tracking';
