--  RUN 1st
create extension vector;

-- RUN 2nd
create table ask_ai (
  id bigserial primary key,
  deal_title text,
  deal_url text,
  deal_date text,
  deal_price text,
  deal_old_price text,
  deal_image text,
  content text,
  content_length bigint,
  content_tokens bigint,
  embedding vector (1536)
);

-- RUN 3rd after running the scripts ---> npm run scrape and npm run embed 
create or replace function ask_ai_search (
  query_embedding vector(1536),
  similarity_threshold float,
  match_count int
)
returns table (
  id bigint,
  deal_title text,
  deal_url text,
  deal_date text,
  deal_price text,
  deal_old_price text,
  deal_image text,
  content text,
  content_length bigint,
  content_tokens bigint,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    ask_ai.id,
    ask_ai.deal_title,
    ask_ai.deal_url,
    ask_ai.deal_date,
    ask_ai.deal_price,
    ask_ai.deal_old_price,
    ask_ai.deal_image,
    ask_ai.content,
    ask_ai.content_length,
    ask_ai.content_tokens,
    1 - (ask_ai.embedding <=> query_embedding) as similarity
  from ask_ai
  where 1 - (ask_ai.embedding <=> query_embedding) > similarity_threshold
  order by ask_ai.embedding <=> query_embedding
  limit match_count;
end;
$$;


-- RUN 4th
create index on ask_ai
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);