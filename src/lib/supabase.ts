import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://vskrhdwiwyjgreadfvmb.supabase.co";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZza3JoZHdpd3lqZ3JlYWRmdm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMzc3NjEsImV4cCI6MjA4NjkxMzc2MX0.yVVZqxc9jZBL9mVXLteuxs4lwlmh9oUhPqRPbzJklvs";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Types pour TypeScript (legacy - garde pour compatibilité)
export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  message?: string;
  promo_code: string;
  payment_status: 'pending' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface Course {
  completed: unknown;
  id: string;
  title: string;
  description: string;
  program: string;
  duration: string;
  lessons_count: number;
  image_url: string;
  level: string;
  created_at: string;
}

export interface StudentProgress {
  id: string;
  student_id: string;
  course_id: string;
  progress: number;
  completed: boolean;
  updated_at: string;
}

export interface QuizResult {
  id: string;
  student_id: string;
  student_name: string;
  score: number;
  total_questions: number;
  answers: any[];
  created_at: string;
}

// Legacy services - these reference tables that may not exist yet
// Using 'any' cast to avoid type errors with the new typed client
const db = supabase as any;

export const studentService = {
  async register(studentData: Omit<Student, 'id' | 'promo_code' | 'payment_status' | 'created_at' | 'updated_at'>) {
    const { data, error } = await db.from('students').insert([studentData]).select().single();
    if (error) throw error;
    return data;
  },
  async verifyPromoCode(promoCode: string) {
    const { data, error } = await db.from('students').select('*').eq('promo_code', promoCode).eq('payment_status', 'completed').single();
    if (error) throw error;
    return data;
  },
  async updatePaymentStatus(studentId: string, status: 'pending' | 'completed' | 'failed') {
    const { data, error } = await db.from('students').update({ payment_status: status }).eq('id', studentId).select().single();
    if (error) throw error;
    return data;
  }
};

export const courseService = {
  async getAllCourses() {
    const { data, error } = await db.from('courses_admin').select('*').eq('published', true).order('created_at', { ascending: true });
    if (error) throw error;
    return data;
  },
  async getCoursesByProgram(program: string) {
    const { data, error } = await db.from('courses_admin').select('*').eq('program', program).eq('published', true).order('created_at', { ascending: true });
    if (error) throw error;
    return data;
  }
};

export const progressService = {
  async getStudentProgress(studentId: string) {
    const { data, error } = await db.from('student_progress').select(`*, courses (*)`).eq('student_id', studentId);
    if (error) throw error;
    return data;
  },
  async updateProgress(studentId: string, courseId: string, progress: number, completed: boolean = false) {
    const { data, error } = await db.from('student_progress').upsert({ student_id: studentId, course_id: courseId, progress, completed, updated_at: new Date().toISOString() }).select().single();
    if (error) throw error;
    return data;
  }
};

export const quizService = {
  async saveQuizResult(result: Omit<QuizResult, 'id' | 'created_at'>) {
    const { data, error } = await db.from('quiz_results').insert([result]).select().single();
    if (error) throw error;
    return data;
  },
  async getStudentResults(studentId: string) {
    const { data, error } = await db.from('quiz_results').select('*').eq('student_id', studentId).order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }
};
