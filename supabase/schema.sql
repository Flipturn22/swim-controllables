-- Run once in Supabase → SQL Editor
-- Flipturn demo schema (per-user rows + RLS)

create table if not exists swimmer_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  profile jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists check_ins (
  id text not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  date date not null,
  practice_attendance text not null,
  sleep_bucket text not null,
  sleep_hours numeric,
  soreness integer not null,
  felt_sick boolean,
  primary key (id),
  unique (user_id, date)
);

create table if not exists weekly_check_ins (
  id text not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  week_start date not null,
  buy_in integer not null,
  team_dryland boolean not null,
  personal_gym boolean not null,
  primary key (id),
  unique (user_id, week_start)
);

create table if not exists meet_times (
  id text not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  event text not null,
  time_seconds numeric not null,
  date date not null,
  meet_name text,
  course text,
  is_personal_best boolean,
  primary key (id)
);

alter table swimmer_profiles enable row level security;
alter table check_ins enable row level security;
alter table weekly_check_ins enable row level security;
alter table meet_times enable row level security;

create policy "profiles own row" on swimmer_profiles
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "check_ins own rows" on check_ins
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "weekly own rows" on weekly_check_ins
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "meets own rows" on meet_times
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
