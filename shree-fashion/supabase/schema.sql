-- Run this in the Supabase SQL editor for a new project (Phase 1)

-- ========== PROFILES (extends Supabase auth.users) ==========
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Users can view their own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update using (auth.uid() = id);

-- Auto-create a profile row whenever someone signs up
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ========== CATEGORIES ==========
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique
);

alter table categories enable row level security;
create policy "Anyone can read categories" on categories for select using (true);

-- ========== PRODUCTS ==========
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  price numeric(10, 2) not null,
  compare_at_price numeric(10, 2), -- original price, for showing a "sale" strike-through
  category_id uuid references categories(id),
  sizes text[] default '{}',        -- e.g. {S,M,L,XL}
  colors text[] default '{}',
  images text[] default '{}',       -- Supabase Storage URLs
  stock integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table products enable row level security;

create policy "Anyone can read active products"
  on products for select using (is_active = true);

create policy "Admins can manage products"
  on products for all using (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  );

-- ========== ADDRESSES ==========
create table addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  full_name text not null,
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  pincode text not null,
  phone text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

alter table addresses enable row level security;

create policy "Users manage their own addresses"
  on addresses for all using (auth.uid() = user_id);

-- ========== ORDERS ==========
create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id),
  address_id uuid references addresses(id),
  status text not null default 'pending', -- pending | paid | shipped | delivered | cancelled
  total numeric(10, 2) not null,
  razorpay_order_id text,
  razorpay_payment_id text,
  created_at timestamptz not null default now()
);

alter table orders enable row level security;

create policy "Users can view their own orders"
  on orders for select using (auth.uid() = user_id);

create policy "Admins can view and update all orders"
  on orders for all using (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  );

-- Orders are inserted via a server-side route using the service role key
-- (after Razorpay signature verification), so no public insert policy is needed.

-- ========== ORDER ITEMS ==========
create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id),
  product_name text not null,   -- snapshot, in case product is edited/removed later
  price numeric(10, 2) not null, -- snapshot of price at time of purchase
  size text,
  color text,
  quantity integer not null
);

alter table order_items enable row level security;

create policy "Users can view items of their own orders"
  on order_items for select using (
    exists (select 1 from orders where orders.id = order_id and orders.user_id = auth.uid())
  );

create policy "Admins can manage all order items"
  on order_items for all using (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  );

-- ========== To make yourself an admin ==========
-- After signing up once through the site, run:
-- update profiles set is_admin = true where id = 'your-user-uuid-from-auth.users';
