-- ============================================================
-- MRV Crackers — keep-alive cron job
-- Prevents the Supabase free-tier project from auto-pausing due
-- to inactivity, by running a trivial read-only query every few
-- days. Runs entirely inside Supabase (no external service, no
-- app code, no secrets). Run this once in the SQL editor.
-- ============================================================

create extension if not exists pg_cron schema cron;

-- cron.schedule() replaces any existing job with the same name,
-- so this script is safe to re-run.
-- Every 3 days at 03:00 UTC, read a single row from site_settings.
-- Read-only, no rows created/changed, no app-facing effect.
select cron.schedule(
  'mrv-crackers-keep-alive',
  '0 3 */3 * *',
  $$ select id from public.site_settings limit 1; $$
);
