import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface PageContent {
  id: string;
  page_slug: string;
  section_key: string;
  title: string | null;
  content: string | null;
  image_url: string | null;
  sort_order: number | null;
}

const defaultForm = { page_slug: '', section_key: '', title: '', content: '', image_url: '', sort_order: 0 };

export default function AdminPages() {
  const [contents, setContents] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);

  const fetchContents = async () => {
    const { data } = await supabase.from('page_contents').select('*').order('page_slug').order('sort_order');
    setContents((data as PageContent[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchContents(); }, []);

  const handleSave = async () => {
    if (editing) {
      await supabase.from('page_contents').update(form).eq('id', editing);
    } else {
      await supabase.from('page_contents').insert(form);
    }
    setShowForm(false);
    setEditing(null);
    setForm(defaultForm);
    fetchContents();
  };

  const handleEdit = (item: PageContent) => {
    setForm({
      page_slug: item.page_slug,
      section_key: item.section_key,
      title: item.title || '',
      content: item.content || '',
      image_url: item.image_url || '',
      sort_order: item.sort_order || 0,
    });
    setEditing(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce contenu ?')) return;
    await supabase.from('page_contents').delete().eq('id', id);
    fetchContents();
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full" /></div>;

  const grouped = contents.reduce((acc, item) => {
    if (!acc[item.page_slug]) acc[item.page_slug] = [];
    acc[item.page_slug].push(item);
    return acc;
  }, {} as Record<string, PageContent[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Contenus des Pages</h2>
        <button
          onClick={() => { setForm(defaultForm); setEditing(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Nouveau contenu
        </button>
      </div>

      {Object.entries(grouped).map(([slug, items]) => (
        <div key={slug} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-100">
            <h3 className="font-semibold text-slate-700 capitalize">{slug}</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {items.map((item) => (
              <div key={item.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <p className="font-medium text-slate-800">{item.title || item.section_key}</p>
                  <p className="text-xs text-slate-400 mt-1">{item.section_key}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(item)} className="p-2 hover:bg-slate-100 rounded-lg"><Pencil className="w-4 h-4 text-slate-400" /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {contents.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center text-slate-400 shadow-sm border border-slate-100">
          Aucun contenu de page configuré
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-2xl p-8 w-full max-w-xl" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">{editing ? 'Modifier' : 'Nouveau'} Contenu</h3>
                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Page *</label>
                    <select value={form.page_slug} onChange={(e) => setForm({ ...form, page_slug: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none">
                      <option value="">Sélectionner</option>
                      <option value="home">Accueil</option>
                      <option value="association">Association</option>
                      <option value="church">Église</option>
                      <option value="school">École</option>
                      <option value="contact">Contact</option>
                      <option value="donate">Dons</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Section *</label>
                    <input value={form.section_key} onChange={(e) => setForm({ ...form, section_key: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="hero, about, etc." />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Titre</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Contenu</label>
                  <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={5} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">URL de l'image</label>
                  <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl">Annuler</button>
                <button onClick={handleSave} disabled={!form.page_slug || !form.section_key} className="px-6 py-2 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 disabled:opacity-50">
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
