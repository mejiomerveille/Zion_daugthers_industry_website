import { useEffect, useState } from 'react';

import { Trash2, CheckCircle, Clock, XCircle, Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  program: string;
  message: string | null;
  promo_code: string | null;
  payment_status: string;
  created_at: string;
}

export default function AdminStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    const { data } = await (supabase as any).from('students').select('*').order('created_at', { ascending: false });
    setStudents((data as Student[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchStudents(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await (supabase as any).from('students').update({ payment_status: status }).eq('id', id);
    fetchStudents();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet étudiant ?')) return;
    await (supabase as any).from('students').delete().eq('id', id);
    fetchStudents();
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-50 text-yellow-600',
    completed: 'bg-green-50 text-green-600',
    failed: 'bg-red-50 text-red-600',
  };

  const statusLabels: Record<string, string> = {
    pending: 'En attente',
    completed: 'Confirmé',
    failed: 'Refusé',
  };

  const programLabels: Record<string, string> = {
    '1ere-annee': '1ère Année',
    '2eme-annee': '2ème Année',
    '3eme-annee': '3ème Année',
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full" /></div>;

  const stats = {
    total: students.length,
    confirmed: students.filter(s => s.payment_status === 'completed').length,
    pending: students.filter(s => s.payment_status === 'pending').length,
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Étudiants Inscrits</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
              <p className="text-sm text-slate-500">Total inscrits</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{stats.confirmed}</p>
              <p className="text-sm text-slate-500">Confirmés</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{stats.pending}</p>
              <p className="text-sm text-slate-500">En attente</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-left">
              <tr>
                <th className="px-6 py-4 font-medium">Nom</th>
                <th className="px-6 py-4 font-medium hidden md:table-cell">Email / Tél</th>
                <th className="px-6 py-4 font-medium hidden md:table-cell">Programme</th>
                <th className="px-6 py-4 font-medium">Code Promo</th>
                <th className="px-6 py-4 font-medium">Statut</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">{student.name}</div>
                    <div className="text-xs text-slate-400 mt-1">{new Date(student.created_at).toLocaleDateString('fr-FR')}</div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="text-slate-600">{student.email}</div>
                    <div className="text-xs text-slate-400">{student.phone}</div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded-lg text-xs font-medium">
                      {programLabels[student.program] || student.program}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <code className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-mono">
                      {student.promo_code}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${statusColors[student.payment_status] || ''}`}>
                      {statusLabels[student.payment_status] || student.payment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {student.payment_status !== 'completed' && (
                        <button onClick={() => updateStatus(student.id, 'completed')} className="p-2 hover:bg-green-50 rounded-lg" title="Confirmer">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </button>
                      )}
                      {student.payment_status !== 'failed' && (
                        <button onClick={() => updateStatus(student.id, 'failed')} className="p-2 hover:bg-red-50 rounded-lg" title="Refuser">
                          <XCircle className="w-4 h-4 text-red-400" />
                        </button>
                      )}
                      <button onClick={() => handleDelete(student.id)} className="p-2 hover:bg-red-50 rounded-lg" title="Supprimer">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">Aucun étudiant inscrit</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
