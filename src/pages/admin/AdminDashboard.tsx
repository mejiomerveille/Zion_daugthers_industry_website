import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, FileText, GraduationCap, Heart, TrendingUp, ClipboardCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ events: 0, pages: 0, courses: 0, donations: 0, totalDonations: 0, evaluations: 0 });

  useEffect(() => {
    async function fetchStats() {
      const [events, pages, courses, donations, evaluations] = await Promise.all([
        supabase.from('events').select('id', { count: 'exact', head: true }),
        supabase.from('page_contents').select('id', { count: 'exact', head: true }),
        supabase.from('courses_admin').select('id', { count: 'exact', head: true }),
        supabase.from('donations').select('amount'),
        supabase.from('evaluations').select('id', { count: 'exact', head: true }),
      ]);

      const totalDonations = (donations.data || []).reduce((sum: number, d: any) => sum + Number(d.amount), 0);

      setStats({
        events: events.count || 0,
        pages: pages.count || 0,
        courses: courses.count || 0,
        donations: (donations.data || []).length,
        totalDonations,
        evaluations: evaluations.count || 0,
      });
    }
    fetchStats();
  }, []);

  const cards = [
    { label: 'Événements', value: stats.events, icon: CalendarDays, color: 'from-blue-500 to-blue-600' },
    { label: 'Contenus', value: stats.pages, icon: FileText, color: 'from-purple-500 to-purple-600' },
    { label: 'Cours', value: stats.courses, icon: GraduationCap, color: 'from-green-500 to-green-600' },
    { label: 'Dons', value: stats.donations, icon: Heart, color: 'from-pink-500 to-pink-600' },
    { label: 'Évaluations', value: stats.evaluations, icon: ClipboardCheck, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800">{card.value}</p>
            <p className="text-sm text-slate-500 mt-1">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Total donations */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          <h3 className="font-semibold text-slate-800">Total des Dons</h3>
        </div>
        <p className="text-4xl font-bold text-slate-800">
          {stats.totalDonations.toLocaleString('fr-FR')} <span className="text-lg text-slate-400">FCFA</span>
        </p>
      </div>
    </div>
  );
}
