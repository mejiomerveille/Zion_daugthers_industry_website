import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ImageUpload from '@/components/ImageUpload';

interface EventItem {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string;
  image_url: string | null;
  author: string | null;
  featured: boolean | null;
  published: boolean | null;
  created_at: string;
}

const defaultEvent = { title: '', excerpt: '', content: '', category: 'Actualité', image_url: '', author: '', featured: false, published: false };

export default function AdminEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(defaultEvent);

  const fetchEvents = async () => {
    const { data } = await supabase.from('events').select('*').order('created_at', { ascending: false });
    setEvents((data as EventItem[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleSave = async () => {
    if (editing) {
      await supabase.from('events').update({ ...form, published_at: form.published ? new Date().toISOString() : null }).eq('id', editing);
    } else {
      await supabase.from('events').insert({ ...form, published_at: form.published ? new Date().toISOString() : null });
    }
    setShowForm(false);
    setEditing(null);
    setForm(defaultEvent);
    fetchEvents();
  };

  const handleEdit = (event: EventItem) => {
    setForm({
      title: event.title,
      excerpt: event.excerpt || '',
      content: event.content || '',
      category: event.category,
      image_url: event.image_url || '',
      author: event.author || '',
      featured: event.featured || false,
      published: event.published || false,
    });
    setEditing(event.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet événement ?')) return;
    await supabase.from('events').delete().eq('id', id);
    fetchEvents();
  };

  const togglePublish = async (event: EventItem) => {
    const published = !event.published;
    await supabase.from('events').update({ published, published_at: published ? new Date().toISOString() : null }).eq('id', event.id);
    fetchEvents();
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Événements & Actualités</h2>
        <button
          onClick={() => { setForm(defaultEvent); setEditing(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Nouveau
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-left">
            <tr>
              <th className="px-6 py-4 font-medium">Titre</th>
              <th className="px-6 py-4 font-medium hidden md:table-cell">Catégorie</th>
              <th className="px-6 py-4 font-medium hidden md:table-cell">Statut</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-800">{event.title}</div>
                  <div className="text-xs text-slate-400 mt-1">{event.author}</div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">{event.category}</span>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${event.published ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                    {event.published ? 'Publié' : 'Brouillon'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => togglePublish(event)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title={event.published ? 'Dépublier' : 'Publier'}>
                      {event.published ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-green-500" />}
                    </button>
                    <button onClick={() => handleEdit(event)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <Pencil className="w-4 h-4 text-slate-400" />
                    </button>
                    <button onClick={() => handleDelete(event.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-400">Aucun événement</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">{editing ? 'Modifier' : 'Nouvel'} Événement</h3>
                <button onClick={() => { setShowForm(false); setEditing(null); }} className="p-2 hover:bg-slate-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Titre *</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Résumé</label>
                  <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Contenu</label>
                  <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={5} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Catégorie</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <option>Actualité de l'Église</option>
                      <option>Conférence</option>
                      <option>Baptême</option>
                      <option>Jeunesse</option>
                      <option>Action Sociale</option>
                      <option>Formation</option>
                      <option>Témoignage</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Auteur</label>
                    <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                </div>
                <ImageUpload
                  value={form.image_url}
                  onChange={(url) => setForm({ ...form, image_url: url })}
                  folder="events"
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 rounded text-blue-600" />
                    <span className="text-sm text-slate-600">À la une</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 rounded text-green-600" />
                    <span className="text-sm text-slate-600">Publier</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => { setShowForm(false); setEditing(null); }} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                  Annuler
                </button>
                <button onClick={handleSave} disabled={!form.title} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50">
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
