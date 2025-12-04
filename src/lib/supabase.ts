import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Vérification silencieuse pour éviter les erreurs en développement
const isSupabaseConfigured = supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour TypeScript
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

// Fonctions utilitaires
export const studentService = {
  // Inscription d'un étudiant
  async register(studentData: Omit<Student, 'id' | 'promo_code' | 'payment_status' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('students')
      .insert([studentData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Vérification du code promo
  async verifyPromoCode(promoCode: string) {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('promo_code', promoCode)
      .eq('payment_status', 'completed')
      .single();
    
    if (error) throw error;
    return data;
  },

  // Mise à jour du statut de paiement
  async updatePaymentStatus(studentId: string, status: 'pending' | 'completed' | 'failed') {
    const { data, error } = await supabase
      .from('students')
      .update({ payment_status: status })
      .eq('id', studentId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

export const courseService = {
  // Récupérer tous les cours
  async getAllCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  // Récupérer les cours par programme
  async getCoursesByProgram(program: string) {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('program', program)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data;
  }
};

export const progressService = {
  // Récupérer la progression d'un étudiant
  async getStudentProgress(studentId: string) {
    const { data, error } = await supabase
      .from('student_progress')
      .select(`
        *,
        courses (*)
      `)
      .eq('student_id', studentId);
    
    if (error) throw error;
    return data;
  },

  // Mettre à jour la progression
  async updateProgress(studentId: string, courseId: string, progress: number, completed: boolean = false) {
    const { data, error } = await supabase
      .from('student_progress')
      .upsert({
        student_id: studentId,
        course_id: courseId,
        progress,
        completed,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

export const quizService = {
  // Sauvegarder les résultats d'un quiz
  async saveQuizResult(result: Omit<QuizResult, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('quiz_results')
      .insert([result])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Récupérer les résultats d'un étudiant
  async getStudentResults(studentId: string) {
    const { data, error } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};