import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, ClipboardCheck, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Evaluation {
  id: string;
  title: string;
  description: string | null;
  program: string;
  course_id: string | null;
  evaluation_date: string;
  duration_minutes: number | null;
  max_score: number | null;
  status: string;
  instructions: string | null;
}

interface CourseOption {
  id: string;
  title: string;
  program: string;
}

const defaultForm = {
  title: '',
  description: '',
  program: '1ere-annee',
  course_id: '',
  evaluation_date: '',
  duration_minutes: 60,
  max_score: 100,
  status: 'planned',
  instructions: '',
};

const statusLabels: Record<string, { label: string; color: string }> = {
  planned: { label: 'Planifiée', color: 'bg-blue-50 text-blue-600' },
  active: { label: 'En cours', color: 'bg-green-50 text-green-600' },
  completed: { label: 'Terminée', color: 'bg-slate-100 text-slate-500' },
  cancelled: { label: 'Annulée', color: 'bg-red-50 text-red-500' },
};

const programLabels: Record<string, string> = {
  '1ere-annee': '1ère Année',
  '2eme-annee': '2ème Année',
  '3eme-annee': '3ème Année',
  general: 'Général',
};

export default function AdminEvaluations() {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [courses, setCourses] = useState<CourseOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);

  const fetchData = async () => {
    const [evalsRes, coursesRes] = await Promise.all([
      supabase.from('evaluations').select('*').order('evaluation_date', { ascending: true }),
      supabase.from('courses_admin').select('id, title, program'),
    ]);
    setEvaluations((evalsRes.data as Evaluation[]) || []);
    setCourses((coursesRes.data as CourseOption[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    const payload = {
      title: form.title,
      description: form.description || null,
      program: form.program,
      course_id: form.course_id || null,
      evaluation_date: form.evaluation_date,
      duration_minutes: form.duration_minutes,
      max_score: form.max_score,
      status: form.status,
      instructions: form.instructions || null,
    };

    if (editing) {
      await supabase.from('evaluations').update(payload).eq('id', editing);
    } else {
      await supabase.from('evaluations').insert(payload);
    }

    setShowForm(false);
    setEditing(null);
    setForm(defaultForm);
    fetchData();
  };

  const handleEdit = (e: Evaluation) => {
    setForm({
      title: e.title,
      description: e.description || '',
      program: e.program,
      course_id: e.course_id || '',
      evaluation_date: e.evaluation_date ? e.evaluation_date.slice(0, 16) : '',
      duration_minutes: e.duration_minutes || 60,
      max_score: e.max_score || 100,
      status: e.status,
      instructions: e.instructions || '',
    });
    setEditing(e.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette évaluation ?')) return;
    await supabase.from('evaluations').delete().eq('id', id);
    fetchData();
  };

  const filteredCourses = courses.filter(c => c.program === form.program || form.program === 'general');

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Évaluations & Examens</h2>
        <button
          onClick={() => { setForm(defaultForm); setEditing(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-xl text-sm font-medium hover:bg-orange-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Planifier une évaluation
        </button>
      </div>

      {/* Evaluations List */}
      <div className="space-y-4">
        {evaluations.map((ev) => {
          const st = statusLabels[ev.status] || statusLabels.planned;
          const course = courses.find(c => c.id === ev.course_id);
          const evalDate = new Date(ev.evaluation_date);
          return (
            <motion.div
              key={ev.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ClipboardCheck className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold text-slate-800">{ev.title}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-lg ${st.color}`}>{st.label}</span>
                      <span className="text-xs font-medium px-2 py-0.5 bg-purple-50 text-purple-600 rounded-lg">{programLabels[ev.program] || ev.program}</span>
                    </div>
                    {ev.description && <p className="text-sm text-slate-500 mb-2">{ev.description}</p>}
                    <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {evalDate.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} à {evalDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span>⏱ {ev.duration_minutes} min</span>
                      <span>📊 /{ev.max_score} pts</span>
                      {course && <span>📚 {course.title}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => handleEdit(ev)} className="p-2 hover:bg-slate-100 rounded-lg"><Pencil className="w-4 h-4 text-slate-400" /></button>
                  <button onClick={() => handleDelete(ev.id)} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {evaluations.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center text-slate-400">
          <ClipboardCheck className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p>Aucune évaluation planifiée</p>
        </div>
      )}

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">{editing ? 'Modifier' : 'Planifier'} une évaluation</h3>
                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Titre *</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="Ex: Examen mi-parcours - Théologie" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Programme *</label>
                    <select value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value, course_id: '' })} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none">
                      <option value="1ere-annee">1ère Année</option>
                      <option value="2eme-annee">2ème Année</option>
                      <option value="3eme-annee">3ème Année</option>
                      <option value="general">Général</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Cours associé</label>
                    <select value={form.course_id} onChange={(e) => setForm({ ...form, course_id: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none">
                      <option value="">— Aucun —</option>
                      {filteredCourses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Date et heure *</label>
                    <input type="datetime-local" value={form.evaluation_date} onChange={(e) => setForm({ ...form, evaluation_date: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Statut</label>
                    <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none">
                      <option value="planned">Planifiée</option>
                      <option value="active">En cours</option>
                      <option value="completed">Terminée</option>
                      <option value="cancelled">Annulée</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Durée (minutes)</label>
                    <input type="number" value={form.duration_minutes} onChange={(e) => setForm({ ...form, duration_minutes: Number(e.target.value) })} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Note maximale</label>
                    <input type="number" value={form.max_score} onChange={(e) => setForm({ ...form, max_score: Number(e.target.value) })} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Instructions / Consignes</label>
                  <textarea value={form.instructions} onChange={(e) => setForm({ ...form, instructions: e.target.value })} rows={3} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="Consignes pour les étudiants..." />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl">Annuler</button>
                <button onClick={handleSave} disabled={!form.title || !form.evaluation_date} className="px-6 py-2 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  {editing ? 'Mettre à jour' : 'Planifier'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
