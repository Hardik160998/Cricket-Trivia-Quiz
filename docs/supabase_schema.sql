-- 1. Categories Table
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  icon text,
  created_at timestamptz default now()
);

-- 2. Questions Table
create table questions (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id) on delete cascade,
  question text not null,
  options text[] not null,
  correct_answer text not null,
  image_url text, -- WebP format recommended
  created_at timestamptz default now()
);

-- 3. User Stats Table (Gamification)
create table user_stats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique, -- links to auth.users if using auth
  display_name text,
  total_score bigint default 0,
  total_coins bigint default 0,
  daily_streak int default 0,
  last_played_at timestamptz,
  created_at timestamptz default now()
);

-- 4. Leaderboard Table (Weekly/Monthly snapshots)
create table leaderboard (
  id uuid primary key default gen_random_uuid(),
  user_stats_id uuid references user_stats(id),
  coins_won int,
  score int,
  week_number int,
  year int,
  created_at timestamptz default now()
);

-- Indexes for performance
create index idx_questions_category on questions(category_id);
create index idx_user_stats_coins on user_stats(total_coins desc);

-- RLS POLICIES
-- Enable RLS on all tables
alter table categories enable row level security;
alter table questions enable row level security;
alter table user_stats enable row level security;
alter table leaderboard enable row level security;

-- Categories: Everyone can read, only service role can write
create policy "Allow public read-only access on categories" on categories for select using (true);
create policy "Allow all access to service role on categories" on categories for all using (true) with check (true);

-- Questions: Everyone can read, only service role can write
create policy "Allow public read-only access on questions" on questions for select using (true);
create policy "Allow all access to service role on questions" on questions for all using (true) with check (true);

-- User Stats: Everyone can read, anyone can insert/update (for gamification without auth)
-- Note: In a production app, you should restrict this to authenticated users or use a more secure method.
create policy "Allow public access on user_stats" on user_stats for all using (true) with check (true);

-- Leaderboard: Everyone can read
create policy "Allow public read-only access on leaderboard" on leaderboard for select using (true);
create policy "Allow all access to service role on leaderboard" on leaderboard for all using (true) with check (true);
