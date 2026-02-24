import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Eye, EyeOff, Video, GripVertical } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ImageUpload from '@/components/ImageUpload';

interface LessonItem {
  id?: string;
  title: string;
  description: string;
  video_url: string;
  duration: string;
  sort_order: number;
}

interface CourseItem {
  id: string;
  title: string;
  description: string | null;
  program: string;
  duration: string | null;
  lessons_count: number | null;
  image_url: string | null;
  level: string | null;
  published: boolean | null;
  price: number | null;
}

const defaultForm = { title: '', description: '', program: 'general', duration: '', image_url: '', level: 'débutant', published: false, price: 0 };

export default function AdminCourses() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [lessons, setLessons] = useState<LessonItem[]>([]);
  const [showLessons, setShowLessons] = useState<string | null>(null);
  const [courseLessons, setCourseLessons] = useState<LessonItem[]>([]);

  const fetchCourses = async () => {
    const { data } = await supabase.from('courses_admin').select('*').order('created_at', { ascending: false });
    setCourses((data as CourseItem[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchCourses(); }, []);

  const fetchLessonsForCourse = async (courseId: string) => {
    const { data } = await supabase
      .from('lessons')
      .select('*')
      .eq('course_id', courseId)
      .order('sort_order', { ascending: true });
    return (data as LessonItem[]) || [];
  };

  const handleSave = async () => {
    const lessonsCount = lessons.length;
    const payload = { ...form, lessons_count: lessonsCount };

    let courseId = editing;

    if (editing) {
      await supabase.from('courses_admin').update(payload).eq('id', editing);
    } else {
      const { data } = await supabase.from('courses_admin').insert(payload).select('id').single();
      courseId = data?.id || null;
    }

    if (courseId) {
      // Delete existing lessons then re-insert
      await supabase.from('lessons').delete().eq('course_id', courseId);
      
      if (lessons.length > 0) {
        const lessonsToInsert = lessons.map((l, i) => ({
          course_id: courseId,
          title: l.title,
          description: l.description,
          video_url: l.video_url,
          duration: l.duration,
          sort_order: i,
        }));
        await supabase.from('lessons').insert(lessonsToInsert);
      }
    }

    setShowForm(false);
    setEditing(null);
    setForm(defaultForm);
    setLessons([]);
    fetchCourses();
  };

  const handleEdit = async (c: CourseItem) => {
    setForm({
      title: c.title,
      description: c.description || '',
      program: c.program,
      duration: c.duration || '',
      image_url: c.image_url || '',
      level: c.level || 'débutant',
      published: c.published || false,
      price: c.price || 0,
    });
    const existingLessons = await fetchLessonsForCourse(c.id);
    setLessons(existingLessons);
    setEditing(c.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce cours et toutes ses leçons ?')) return;
    await supabase.from('courses_admin').delete().eq('id', id);
    fetchCourses();
  };

  const togglePublish = async (c: CourseItem) => {
    await supabase.from('courses_admin').update({ published: !c.published }).eq('id', c.id);
    fetchCourses();
  };

  const addLesson = () => {
    setLessons([...lessons, { title: '', description: '', video_url: '', duration: '', sort_order: lessons.length }]);
  };

  const updateLesson = (index: number, field: keyof LessonItem, value: string) => {
    const updated = [...lessons];
    (updated[index] as any)[field] = value;
    setLessons(updated);
  };

  const removeLesson = (index: number) => {
    setLessons(lessons.filter((_, i) => i !== index));
  };

  const viewCourseLessons = async (courseId: string) => {
    const data = await fetchLessonsForCourse(courseId);
    setCourseLessons(data);
    setShowLessons(courseId);
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Cours & École Biblique</h2>
        <button onClick={() => { setForm(defaultForm); setEditing(null); setLessons([]); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors">
          <Plus className="w-4 h-4" /> Nouveau cours
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <motion.div key={course.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {course.image_url && (
              <img src={course.image_url} alt={course.title} className="w-full h-40 object-cover" />
            )}
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium px-2 py-1 bg-green-50 text-green-600 rounded-lg">{course.level}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-lg ${course.published ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                  {course.published ? 'Publié' : 'Brouillon'}
                </span>
              </div>
              <h3 className="font-semibold text-slate-800 mb-1">{course.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-2 mb-3">{course.description}</p>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{course.lessons_count} leçons • {course.duration}</span>
                <span>{Number(course.price).toLocaleString()} FCFA</span>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                <button onClick={() => togglePublish(course)} className="p-2 hover:bg-slate-100 rounded-lg">
                  {course.published ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-green-500" />}
                </button>
                <button onClick={() => viewCourseLessons(course.id)} className="p-2 hover:bg-slate-100 rounded-lg" title="Voir les leçons">
                  <Video className="w-4 h-4 text-blue-500" />
                </button>
                <button onClick={() => handleEdit(course)} className="p-2 hover:bg-slate-100 rounded-lg"><Pencil className="w-4 h-4 text-slate-400" /></button>
                <button onClick={() => handleDelete(course.id)} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {courses.length === 0 && <div className="bg-white rounded-2xl p-12 text-center text-slate-400">Aucun cours</div>}

      {/* View Lessons Modal */}
      <AnimatePresence>
        {showLessons && (
          <motion.div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLessons(null)}>
            <motion.div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800">Leçons du cours</h3>
                <button onClick={() => setShowLessons(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              {courseLessons.length === 0 ? (
                <p className="text-slate-400 text-center py-8">Aucune leçon ajoutée</p>
              ) : (
                <div className="space-y-3">
                  {courseLessons.map((lesson, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm flex-shrink-0">{i + 1}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-slate-800 text-sm">{lesson.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{lesson.description}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                          {lesson.duration && <span>⏱ {lesson.duration}</span>}
                          {lesson.video_url && <span className="text-green-500">✓ Vidéo</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Course Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">{editing ? 'Modifier' : 'Nouveau'} Cours</h3>
                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Titre *</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Programme</label>
                    <select value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none">
                      <option value="1ere-annee">1ère Année</option>
                      <option value="2eme-annee">2ème Année</option>
                      <option value="3eme-annee">3ème Année</option>
                      <option value="general">Général</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Niveau</label>
                    <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none">
                      <option value="débutant">Débutant</option>
                      <option value="intermédiaire">Intermédiaire</option>
                      <option value="avancé">Avancé</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Durée totale</label>
                    <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="6 semaines" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Prix (FCFA)</label>
                    <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none" />
                  </div>
                </div>
                <ImageUpload
                  value={form.image_url}
                  onChange={(url) => setForm({ ...form, image_url: url })}
                  folder="courses"
                />
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 rounded text-green-600" />
                  <span className="text-sm text-slate-600">Publier</span>
                </label>

                {/* Lessons Section */}
                <div className="border-t border-slate-200 pt-4 mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                      <Video className="w-5 h-5 text-blue-500" />
                      Leçons ({lessons.length})
                    </h4>
                    <button onClick={addLesson} className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                      <Plus className="w-4 h-4" /> Ajouter une leçon
                    </button>
                  </div>

                  <div className="space-y-4">
                    {lessons.map((lesson, index) => (
                      <div key={index} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <GripVertical className="w-4 h-4 text-slate-300" />
                            <span className="text-sm font-semibold text-slate-600">Leçon {index + 1}</span>
                          </div>
                          <button onClick={() => removeLesson(index)} className="p-1 hover:bg-red-50 rounded-lg">
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                        <div className="space-y-3">
                          <input
                            value={lesson.title}
                            onChange={(e) => updateLesson(index, 'title', e.target.value)}
                            placeholder="Titre de la leçon *"
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                          <textarea
                            value={lesson.description}
                            onChange={(e) => updateLesson(index, 'description', e.target.value)}
                            placeholder="Description de la leçon"
                            rows={2}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              value={lesson.video_url}
                              onChange={(e) => updateLesson(index, 'video_url', e.target.value)}
                              placeholder="URL de la vidéo (YouTube, Vimeo...)"
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            <input
                              value={lesson.duration}
                              onChange={(e) => updateLesson(index, 'duration', e.target.value)}
                              placeholder="Durée (ex: 15:30)"
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {lessons.length === 0 && (
                    <p className="text-center text-slate-400 text-sm py-4">Aucune leçon. Cliquez sur "Ajouter une leçon" pour commencer.</p>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl">Annuler</button>
                <button onClick={handleSave} disabled={!form.title} className="px-6 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-50">
                  {editing ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
