-- Seed data for local / staging Supabase (adjust UUIDs if needed)
-- Run after schema.sql

insert into public.projects (
  title,
  slug,
  description,
  problem,
  solution,
  impact,
  tech_stack,
  github_link,
  demo_link,
  featured,
  sort_order
) values
(
  'Loan Approval Intelligence',
  'loan-approval-prediction',
  'End-to-end eligibility engine that turns messy applicant signals into a governed prediction surface with explainable outputs.',
  'Credit decisions were slow, inconsistent, and hard to audit when models lived only in notebooks.',
  'A supervised learning stack with rigorous preprocessing, comparative model evaluation, and a FastAPI service behind a web UI with charts for operators.',
  'Lifted decision consistency with ~80–85% test accuracy and cut manual triage by surfacing clear risk signals at submission time.',
  array['Python', 'FastAPI', 'Flask', 'scikit-learn', 'JavaScript', 'Data viz'],
  null,
  null,
  true,
  1
),
(
  'Sneakify',
  'sneakify',
  'A commerce-grade sneaker discovery experience focused on speed, filtering, and product storytelling.',
  'Shoppers bounced when catalogs felt sluggish and filters broke flow on smaller screens.',
  'Component-driven listings with responsive layouts, animated transitions, and navigation tuned for perceived performance.',
  'Higher engagement through smooth browsing, fast filtering, and a premium UI that scales from phone to desktop.',
  array['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  null,
  null,
  true,
  2
)
on conflict (slug) do nothing;
