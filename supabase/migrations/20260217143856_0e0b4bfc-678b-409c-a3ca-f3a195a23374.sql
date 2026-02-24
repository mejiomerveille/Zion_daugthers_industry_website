
-- Role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT NOT NULL DEFAULT 'Actualité',
  image_url TEXT,
  author TEXT,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Page contents table
CREATE TABLE public.page_contents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug TEXT NOT NULL,
  section_key TEXT NOT NULL,
  title TEXT,
  content TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(page_slug, section_key)
);
ALTER TABLE public.page_contents ENABLE ROW LEVEL SECURITY;

-- Courses table
CREATE TABLE public.courses_admin (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  program TEXT NOT NULL DEFAULT 'general',
  duration TEXT,
  lessons_count INTEGER DEFAULT 0,
  image_url TEXT,
  level TEXT DEFAULT 'débutant',
  published BOOLEAN DEFAULT false,
  price NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.courses_admin ENABLE ROW LEVEL SECURITY;

-- Donations table
CREATE TABLE public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name TEXT,
  donor_email TEXT,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'XAF',
  payment_method TEXT,
  status TEXT DEFAULT 'completed',
  notes TEXT,
  donation_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Helper function: is_admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
$$;

-- Helper function: has_role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_page_contents_updated_at BEFORE UPDATE ON public.page_contents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_courses_admin_updated_at BEFORE UPDATE ON public.courses_admin FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS POLICIES

-- user_roles: only admin can read
CREATE POLICY "Admin can read roles" ON public.user_roles FOR SELECT TO authenticated USING (public.is_admin());

-- profiles: users read own, admin reads all
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "System inserts profile" ON public.profiles FOR INSERT WITH CHECK (true);

-- events: public read published, admin full access
CREATE POLICY "Public read published events" ON public.events FOR SELECT USING (published = true);
CREATE POLICY "Admin read all events" ON public.events FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admin insert events" ON public.events FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admin update events" ON public.events FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admin delete events" ON public.events FOR DELETE TO authenticated USING (public.is_admin());

-- page_contents: public read, admin full access
CREATE POLICY "Public read page contents" ON public.page_contents FOR SELECT USING (true);
CREATE POLICY "Admin insert page contents" ON public.page_contents FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admin update page contents" ON public.page_contents FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admin delete page contents" ON public.page_contents FOR DELETE TO authenticated USING (public.is_admin());

-- courses_admin: public read published, admin full access
CREATE POLICY "Public read published courses" ON public.courses_admin FOR SELECT USING (published = true);
CREATE POLICY "Admin read all courses" ON public.courses_admin FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admin insert courses" ON public.courses_admin FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admin update courses" ON public.courses_admin FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admin delete courses" ON public.courses_admin FOR DELETE TO authenticated USING (public.is_admin());

-- donations: admin only
CREATE POLICY "Admin read donations" ON public.donations FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admin insert donations" ON public.donations FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admin update donations" ON public.donations FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admin delete donations" ON public.donations FOR DELETE TO authenticated USING (public.is_admin());
