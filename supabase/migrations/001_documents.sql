-- Enable pgvector extension
create extension if not exists vector;

-- Documents table for RAG chunks
-- Google text-embedding-004 produces 768-dimensional vectors by default
create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  content text not null,
  metadata jsonb default '{}'::jsonb,
  embedding vector(768),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists documents_source_idx on documents (source);
create index if not exists documents_embedding_idx on documents
  using hnsw (embedding vector_cosine_ops);

create or replace function match_documents(
  query_embedding vector(768),
  match_count int default 5
)
returns table (
  id uuid,
  source text,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    documents.id,
    documents.source,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  order by documents.embedding <=> query_embedding
  limit match_count;
$$;
