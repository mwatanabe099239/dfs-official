-- Editable knowledge source articles (dashboard writes here)
create table if not exists knowledge_articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  content text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists knowledge_articles_slug_idx on knowledge_articles (slug);
create index if not exists knowledge_articles_updated_at_idx on knowledge_articles (updated_at desc);
