
-- =============================================
-- 1. FIX RLS POLICIES: RESTRICTIVE → PERMISSIVE
-- =============================================

-- EVENTS
DROP POLICY IF EXISTS "Public read published events" ON public.events;
DROP POLICY IF EXISTS "Admin read all events" ON public.events;
DROP POLICY IF EXISTS "Admin insert events" ON public.events;
DROP POLICY IF EXISTS "Admin update events" ON public.events;
DROP POLICY IF EXISTS "Admin delete events" ON public.events;

CREATE POLICY "Public read published events" ON public.events AS PERMISSIVE FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Admin read all events" ON public.events AS PERMISSIVE FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "Admin insert events" ON public.events AS PERMISSIVE FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "Admin update events" ON public.events AS PERMISSIVE FOR UPDATE TO authenticated USING (is_admin());
CREATE POLICY "Admin delete events" ON public.events AS PERMISSIVE FOR DELETE TO authenticated USING (is_admin());

-- COURSES_ADMIN
DROP POLICY IF EXISTS "Public read published courses" ON public.courses_admin;
DROP POLICY IF EXISTS "Admin read all courses" ON public.courses_admin;
DROP POLICY IF EXISTS "Admin insert courses" ON public.courses_admin;
DROP POLICY IF EXISTS "Admin update courses" ON public.courses_admin;
DROP POLICY IF EXISTS "Admin delete courses" ON public.courses_admin;

CREATE POLICY "Public read published courses" ON public.courses_admin AS PERMISSIVE FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Admin read all courses" ON public.courses_admin AS PERMISSIVE FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "Admin insert courses" ON public.courses_admin AS PERMISSIVE FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "Admin update courses" ON public.courses_admin AS PERMISSIVE FOR UPDATE TO authenticated USING (is_admin());
CREATE POLICY "Admin delete courses" ON public.courses_admin AS PERMISSIVE FOR DELETE TO authenticated USING (is_admin());

-- PAGE_CONTENTS
DROP POLICY IF EXISTS "Public read page contents" ON public.page_contents;
DROP POLICY IF EXISTS "Admin insert page contents" ON public.page_contents;
DROP POLICY IF EXISTS "Admin update page contents" ON public.page_contents;
DROP POLICY IF EXISTS "Admin delete page contents" ON public.page_contents;

CREATE POLICY "Public read page contents" ON public.page_contents AS PERMISSIVE FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin insert page contents" ON public.page_contents AS PERMISSIVE FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "Admin update page contents" ON public.page_contents AS PERMISSIVE FOR UPDATE TO authenticated USING (is_admin());
CREATE POLICY "Admin delete page contents" ON public.page_contents AS PERMISSIVE FOR DELETE TO authenticated USING (is_admin());

-- DONATIONS
DROP POLICY IF EXISTS "Admin read donations" ON public.donations;
DROP POLICY IF EXISTS "Admin insert donations" ON public.donations;
DROP POLICY IF EXISTS "Admin update donations" ON public.donations;
DROP POLICY IF EXISTS "Admin delete donations" ON public.donations;

CREATE POLICY "Admin read donations" ON public.donations AS PERMISSIVE FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "Admin insert donations" ON public.donations AS PERMISSIVE FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "Admin update donations" ON public.donations AS PERMISSIVE FOR UPDATE TO authenticated USING (is_admin());
CREATE POLICY "Admin delete donations" ON public.donations AS PERMISSIVE FOR DELETE TO authenticated USING (is_admin());

-- PROFILES
DROP POLICY IF EXISTS "Users read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users insert own profile" ON public.profiles;

CREATE POLICY "Users read own profile" ON public.profiles AS PERMISSIVE FOR SELECT TO authenticated USING ((auth.uid() = user_id) OR is_admin());
CREATE POLICY "Users update own profile" ON public.profiles AS PERMISSIVE FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own profile" ON public.profiles AS PERMISSIVE FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- USER_ROLES
DROP POLICY IF EXISTS "Admin can read roles" ON public.user_roles;

CREATE POLICY "Admin can read roles" ON public.user_roles AS PERMISSIVE FOR SELECT TO authenticated USING (is_admin());

-- =============================================
-- 2. CREATE STUDENTS TABLE
-- =============================================
CREATE TABLE public.students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  program text NOT NULL DEFAULT '1ere-annee',
  message text,
  promo_code text UNIQUE,
  payment_status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Auto-generate promo code
CREATE OR REPLACE FUNCTION public.generate_promo_code()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.promo_code IS NULL THEN
    NEW.promo_code := 'ZION' || LPAD(FLOOR(RANDOM() * 999999)::text, 6, '0');
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER generate_student_promo_code
  BEFORE INSERT ON public.students
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_promo_code();

CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Students RLS: anyone can register, admin manages
CREATE POLICY "Anyone can register" ON public.students AS PERMISSIVE FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admin read students" ON public.students AS PERMISSIVE FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "Admin update students" ON public.students AS PERMISSIVE FOR UPDATE TO authenticated USING (is_admin());
CREATE POLICY "Admin delete students" ON public.students AS PERMISSIVE FOR DELETE TO authenticated USING (is_admin());
-- Students can verify their own code
CREATE POLICY "Verify own promo code" ON public.students AS PERMISSIVE FOR SELECT TO anon, authenticated USING (payment_status = 'completed');

-- =============================================
-- 3. CREATE STORAGE BUCKET FOR MEDIA
-- =============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

CREATE POLICY "Public read media" ON storage.objects AS PERMISSIVE FOR SELECT TO anon, authenticated USING (bucket_id = 'media');
CREATE POLICY "Admin upload media" ON storage.objects AS PERMISSIVE FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media' AND public.is_admin());
CREATE POLICY "Admin update media" ON storage.objects AS PERMISSIVE FOR UPDATE TO authenticated USING (bucket_id = 'media' AND public.is_admin());
CREATE POLICY "Admin delete media" ON storage.objects AS PERMISSIVE FOR DELETE TO authenticated USING (bucket_id = 'media' AND public.is_admin());

-- =============================================
-- 4. ADD TRIGGER FOR NEW USER PROFILES
-- =============================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
