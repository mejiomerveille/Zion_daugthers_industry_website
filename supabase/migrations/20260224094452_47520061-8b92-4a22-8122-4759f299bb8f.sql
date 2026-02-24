
CREATE TABLE public.evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  program TEXT NOT NULL DEFAULT '1ere-annee',
  course_id UUID REFERENCES public.courses_admin(id) ON DELETE SET NULL,
  evaluation_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  max_score INTEGER DEFAULT 100,
  status TEXT NOT NULL DEFAULT 'planned',
  instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;

-- Admin full access
CREATE POLICY "Admin read evaluations" ON public.evaluations FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "Admin insert evaluations" ON public.evaluations FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "Admin update evaluations" ON public.evaluations FOR UPDATE TO authenticated USING (is_admin());
CREATE POLICY "Admin delete evaluations" ON public.evaluations FOR DELETE TO authenticated USING (is_admin());

-- Public read planned/active evaluations
CREATE POLICY "Public read active evaluations" ON public.evaluations FOR SELECT TO anon, authenticated USING (status IN ('planned', 'active'));

-- Trigger for updated_at
CREATE TRIGGER update_evaluations_updated_at
  BEFORE UPDATE ON public.evaluations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
