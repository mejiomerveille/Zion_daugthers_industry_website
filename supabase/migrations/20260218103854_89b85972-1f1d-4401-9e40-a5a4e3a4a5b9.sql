
-- Fix RLS policies: change from RESTRICTIVE to PERMISSIVE (default)
-- Drop all existing policies and recreate as PERMISSIVE

-- user_roles
DROP POLICY IF EXISTS "Admin can read roles" ON public.user_roles;
CREATE POLICY "Admin can read roles" ON public.user_roles FOR SELECT TO authenticated USING (public.is_admin());

-- profiles
DROP POLICY IF EXISTS "Users read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users insert own profile" ON public.profiles;
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- events
DROP POLICY IF EXISTS "Public read published events" ON public.events;
DROP POLICY IF EXISTS "Admin read all events" ON public.events;
DROP POLICY IF EXISTS "Admin insert events" ON public.events;
DROP POLICY IF EXISTS "Admin update events" ON public.events;
DROP POLICY IF EXISTS "Admin delete events" ON public.events;
CREATE POLICY "Public read published events" ON public.events FOR SELECT USING (published = true);
CREATE POLICY "Admin read all events" ON public.events FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admin insert events" ON public.events FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admin update events" ON public.events FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admin delete events" ON public.events FOR DELETE TO authenticated USING (public.is_admin());

-- page_contents
DROP POLICY IF EXISTS "Public read page contents" ON public.page_contents;
DROP POLICY IF EXISTS "Admin insert page contents" ON public.page_contents;
DROP POLICY IF EXISTS "Admin update page contents" ON public.page_contents;
DROP POLICY IF EXISTS "Admin delete page contents" ON public.page_contents;
CREATE POLICY "Public read page contents" ON public.page_contents FOR SELECT USING (true);
CREATE POLICY "Admin insert page contents" ON public.page_contents FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admin update page contents" ON public.page_contents FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admin delete page contents" ON public.page_contents FOR DELETE TO authenticated USING (public.is_admin());

-- courses_admin
DROP POLICY IF EXISTS "Public read published courses" ON public.courses_admin;
DROP POLICY IF EXISTS "Admin read all courses" ON public.courses_admin;
DROP POLICY IF EXISTS "Admin insert courses" ON public.courses_admin;
DROP POLICY IF EXISTS "Admin update courses" ON public.courses_admin;
DROP POLICY IF EXISTS "Admin delete courses" ON public.courses_admin;
CREATE POLICY "Public read published courses" ON public.courses_admin FOR SELECT USING (published = true);
CREATE POLICY "Admin read all courses" ON public.courses_admin FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admin insert courses" ON public.courses_admin FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admin update courses" ON public.courses_admin FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admin delete courses" ON public.courses_admin FOR DELETE TO authenticated USING (public.is_admin());

-- donations
DROP POLICY IF EXISTS "Admin read donations" ON public.donations;
DROP POLICY IF EXISTS "Admin insert donations" ON public.donations;
DROP POLICY IF EXISTS "Admin update donations" ON public.donations;
DROP POLICY IF EXISTS "Admin delete donations" ON public.donations;
CREATE POLICY "Admin read donations" ON public.donations FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admin insert donations" ON public.donations FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admin update donations" ON public.donations FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admin delete donations" ON public.donations FOR DELETE TO authenticated USING (public.is_admin());
