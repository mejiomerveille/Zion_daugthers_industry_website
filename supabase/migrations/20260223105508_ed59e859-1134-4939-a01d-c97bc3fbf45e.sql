
-- Create lessons table for storing individual video lessons per course
CREATE TABLE public.lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses_admin(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  duration TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read lessons of published courses" ON public.lessons
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.courses_admin WHERE id = lessons.course_id AND published = true)
  );

CREATE POLICY "Admin read all lessons" ON public.lessons
  FOR SELECT USING (is_admin());

CREATE POLICY "Admin insert lessons" ON public.lessons
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "Admin update lessons" ON public.lessons
  FOR UPDATE USING (is_admin());

CREATE POLICY "Admin delete lessons" ON public.lessons
  FOR DELETE USING (is_admin());

-- Trigger for updated_at
CREATE TRIGGER update_lessons_updated_at
  BEFORE UPDATE ON public.lessons
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
