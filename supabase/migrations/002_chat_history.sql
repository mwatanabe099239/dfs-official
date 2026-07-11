-- Chat groups (conversation threads) scoped by browser session
create table if not exists chat_groups (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  title text not null default 'New Conversation',
  locale text not null default 'en' check (locale in ('en', 'ja')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references chat_groups(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists chat_groups_session_id_idx on chat_groups (session_id);
create index if not exists chat_groups_updated_at_idx on chat_groups (updated_at desc);
create index if not exists chat_messages_group_id_idx on chat_messages (group_id);
create index if not exists chat_messages_created_at_idx on chat_messages (created_at);
