import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeartPulse, Stethoscope, Building2, Activity } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Hospital Themed Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2906&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-slate-900/90" />
      
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="bg-white/20 p-4 rounded-full inline-block backdrop-blur-sm mb-6 shadow-2xl">
            <Activity className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-4">CareLoop</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">The unified platform connecting patients, doctors, and hospital administration for continuous care.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Patient Portal Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Link to="/patient" className="block group bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl hover:bg-white/20 transition-all hover:-translate-y-2">
              <HeartPulse className="w-12 h-12 text-rose-400 mb-6 group-hover:scale-110 transition-transform" />
              <h2 className="text-2xl font-bold text-white mb-2">Patient Portal</h2>
              <p className="text-blue-100/70 text-sm">Access your care plan, log vitals, and connect with your doctor.</p>
            </Link>
          </motion.div>

          {/* Doctor Portal Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Link to="/doctor" className="block group bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl hover:bg-white/20 transition-all hover:-translate-y-2">
              <Stethoscope className="w-12 h-12 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
              <h2 className="text-2xl font-bold text-white mb-2">Doctor Portal</h2>
              <p className="text-blue-100/70 text-sm">Monitor patients, update follow-up plans, and review alerts.</p>
            </Link>
          </motion.div>

          {/* Admin Portal Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Link to="/admin" className="block group bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl hover:bg-white/20 transition-all hover:-translate-y-2">
              <Building2 className="w-12 h-12 text-emerald-400 mb-6 group-hover:scale-110 transition-transform" />
              <h2 className="text-2xl font-bold text-white mb-2">Hospital Admin</h2>
              <p className="text-blue-100/70 text-sm">Manage staff, allocate doctors to patients by root cause, and view analytics.</p>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}