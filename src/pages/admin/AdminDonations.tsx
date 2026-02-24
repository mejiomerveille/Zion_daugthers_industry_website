import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Donation {
  id: string;
  donor_name: string | null;
  donor_email: string | null;
  amount: number;
  currency: string | null;
  payment_method: string | null;
  status: string | null;
  notes: string | null;
  donation_date: string;
}

const defaultForm = { donor_name: '', donor_email: '', amount: 0, currency: 'XAF', payment_method: 'Mobile Money', status: 'completed', notes: '' };

export default function AdminDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const fetchDonations = async () => {
    const { data } = await supabase.from('donations').select('*').order('donation_date', { ascending: false });
    setDonations((data as Donation[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchDonations(); }, []);

  const handleSave = async () => {
    await supabase.from('donations').insert({ ...form, donation_date: new Date().toISOString() });
    setShowForm(false);
    setForm(defaultForm);
    fetchDonations();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce don ?')) return;
    await supabase.from('donations').delete().eq('id', id);
    fetchDonations();
  };

  const total = donations.reduce((sum, d) => sum + Number(d.amount), 0);

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Gestion des Dons</h2>
        <button onClick={() => { setForm(defaultForm); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-xl text-sm font-medium hover:bg-pink-700 transition-colors">
          <Plus className="w-4 h-4" /> Enregistrer un don
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-1"><TrendingUp className="w-4 h-4" /> Total</div>
          <p className="text-2xl font-bold text-slate-800">{total.toLocaleString('fr-FR')} FCFA</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="text-slate-500 text-sm mb-1">Nombre de dons</div>
          <p className="text-2xl font-bold text-slate-800">{donations.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="text-slate-500 text-sm mb-1">Don moyen</div>
          <p className="text-2xl font-bold text-slate-800">{donations.length ? Math.round(total / donations.length).toLocaleString('fr-FR') : 0} FCFA</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-left">
            <tr>
              <th className="px-6 py-4 font-medium">Donateur</th>
              <th className="px-6 py-4 font-medium">Montant</th>
              <th className="px-6 py-4 font-medium hidden md:table-cell">Méthode</th>
              <th className="px-6 py-4 font-medium hidden md:table-cell">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {donations.map((d) => (
              <tr key={d.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-800">{d.donor_name || 'Anonyme'}</p>
                  <p className="text-xs text-slate-400">{d.donor_email}</p>
                </td>
                <td className="px-6 py-4 font-semibold text-slate-800">{Number(d.amount).toLocaleString('fr-FR')} {d.currency}</td>
                <td className="px-6 py-4 hidden md:table-cell text-slate-500">{d.payment_method}</td>
                <td className="px-6 py-4 hidden md:table-cell text-slate-500">{new Date(d.donation_date).toLocaleDateString('fr-FR')}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(d.id)} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></button>
                </td>
              </tr>
            ))}
            {donations.length === 0 && <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">Aucun don enregistré</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-2xl p-8 w-full max-w-md" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">Enregistrer un Don</h3>
                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Nom du donateur</label>
                  <input value={form.donor_name} onChange={(e) => setForm({ ...form, donor_name: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
                  <input value={form.donor_email} onChange={(e) => setForm({ ...form, donor_email: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Montant (FCFA) *</label>
                  <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Méthode de paiement</label>
                  <select value={form.payment_method} onChange={(e) => setForm({ ...form, payment_method: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none">
                    <option>Mobile Money</option>
                    <option>Orange Money</option>
                    <option>Espèces</option>
                    <option>Virement</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Notes</label>
                  <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl">Annuler</button>
                <button onClick={handleSave} disabled={!form.amount} className="px-6 py-2 bg-pink-600 text-white rounded-xl font-medium hover:bg-pink-700 disabled:opacity-50">Enregistrer</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
