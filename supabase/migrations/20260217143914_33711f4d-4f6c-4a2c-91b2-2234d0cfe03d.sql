
-- Fix the overly permissive profiles insert policy
DROP POLICY "System inserts profile" ON public.profiles;
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
-- Allow the trigger (which runs as SECURITY DEFINER) to also insert
