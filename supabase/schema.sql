-- SwimSure: one table for every enquiry from the website.
-- Paste this whole file into Supabase → SQL Editor → Run.

create table if not exists public.enquiries (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  kind        text not null check (kind in ('parent', 'society', 'coach')),
  name        text not null,
  email       text not null,
  phone       text not null,
  society     text,            -- society / apartment name
  area        text,            -- Bengaluru area, e.g. Whitefield
  child_age   text,            -- parents: age of the child
  flats       text,            -- societies: number of flats
  experience  text,            -- coaches: years and certificates
  message     text,
  status      text not null default 'new'
              check (status in ('new', 'contacted', 'enrolled', 'closed'))
);

-- Row Level Security: the website may ADD enquiries, but nobody can READ
-- them with the public key. You read them in the Supabase Table Editor.
alter table public.enquiries enable row level security;

drop policy if exists "website can add enquiries" on public.enquiries;
create policy "website can add enquiries"
  on public.enquiries
  for insert
  to anon
  with check (
    char_length(name)  between 1 and 120
    and char_length(email) between 3 and 200
    and char_length(phone) between 6 and 30
    and coalesce(char_length(message), 0) <= 2000
    and status = 'new'
  );
