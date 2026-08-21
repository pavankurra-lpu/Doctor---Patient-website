import { motion } from 'framer-motion';
import { User, Stethoscope, Building2, Phone, Clock, ShieldPlus, ChevronRight, ActivitySquare, HeartPulse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top Banner */}
      <div className="bg-slate-900 text-slate-300 py-2 px-6 flex justify-between items-center text-xs font-semibold tracking-wider uppercase">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-emerald-400" /> 24/7 Emergency Services</span>
          <span className="flex items-center gap-2"><ShieldPlus className="w-3 h-3 text-emerald-400" /> Accredited Facility</span>
        </div>
        <div className="flex items-center gap-2 text-rose-400 font-bold">
          <Phone className="w-3 h-3" /> Ambulance: 911
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <ActivitySquare className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">CareLoop<span className="text-blue-600">.</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
            <a href="#" className="hover:text-blue-600 transition">Our Services</a>
            <a href="#" className="hover:text-blue-600 transition">Find a Doctor</a>
            <a href="#" className="hover:text-blue-600 transition">Locations</a>
            <a href="#" className="hover:text-blue-600 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-blue-50/50" />
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
              <HeartPulse className="w-4 h-4" /> Leading Healthcare Network
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-black text-slate-900 leading-tight">
              World-class care,<br/>close to <span className="text-blue-600">home.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-slate-600 max-w-lg leading-relaxed">
              Experience the future of healthcare. Our digital unified platform connects patients, doctors, and hospital administration in real-time to provide faster, better care.
            </motion.p>
          </div>
          
          <div className="flex-1 grid gap-4 w-full max-w-md">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Access Portals</h3>
            
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <button onClick={() => navigate('/patient')} className="w-full text-left bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 p-6 rounded-2xl transition-all group flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors"><User className="w-6 h-6" /></div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Patient Portal</h3>
                    <p className="text-sm text-slate-500">Bookings, results, & care plans</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <button onClick={() => navigate('/doctor')} className="w-full text-left bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 p-6 rounded-2xl transition-all group flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors"><Stethoscope className="w-6 h-6" /></div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Doctor Portal</h3>
                    <p className="text-sm text-slate-500">Manage queue & prescriptions</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <button onClick={() => navigate('/admin')} className="w-full text-left bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/20 p-6 rounded-2xl transition-all group flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors"><Building2 className="w-6 h-6" /></div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Hospital Authority</h3>
                    <p className="text-sm text-slate-400">Strict Administration Access</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}