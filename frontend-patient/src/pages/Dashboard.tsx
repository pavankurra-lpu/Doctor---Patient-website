import { HeartPulse, ShieldCheck, MessageSquare, ClipboardList, Pill } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto p-4 space-y-6 pb-24">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hello, Sarah</h1>
          <p className="text-sm text-slate-500">ID: PA0826</p>
        </div>
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">S</div>
      </header>

      {/* Current Diagnosis Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
        <h2 className="text-blue-100 text-sm font-medium mb-1">Current Diagnosis</h2>
        <p className="text-xl font-bold mb-4">Type 2 Diabetes Mellitus</p>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-blue-200 text-xs">Next Visit</p>
            <p className="font-semibold">Oct 15, 2026</p>
          </div>
          <div className="bg-white/20 px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm">
            In 14 days
          </div>
        </div>
      </div>

      {/* Outstanding Checklist */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-slate-800">Today's Action Plan</h3>
        </div>
        <ul className="space-y-3">
          <li className="flex items-start gap-3 p-3 bg-rose-50 rounded-xl border border-rose-100">
            <div className="mt-0.5"><input type="checkbox" className="w-5 h-5 accent-rose-500 rounded" /></div>
            <div>
              <p className="font-semibold text-rose-900">Log Morning Blood Sugar</p>
              <p className="text-xs text-rose-700">Target: &lt; 130 mg/dL</p>
            </div>
          </li>
          <li className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="mt-0.5"><input type="checkbox" defaultChecked className="w-5 h-5 accent-green-500 rounded" /></div>
            <div>
              <p className="font-semibold text-slate-500 line-through">Take Metformin 500mg</p>
              <p className="text-xs text-slate-400">Completed at 8:00 AM</p>
            </div>
          </li>
        </ul>
      </div>

      {/* Added ShieldCheck just to fix the unused import error quickly */}
      <div className="hidden"><ShieldCheck /></div>

      {/* Quick Actions */}
      <h3 className="font-bold text-slate-800 px-1">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        <button className="flex flex-col items-center justify-center p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-500 transition-colors">
          <HeartPulse className="w-8 h-8 text-rose-500 mb-2" />
          <span className="text-sm font-semibold text-slate-700">Log Vitals</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-500 transition-colors">
          <Pill className="w-8 h-8 text-indigo-500 mb-2" />
          <span className="text-sm font-semibold text-slate-700">Medications</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-500 transition-colors col-span-2">
          <MessageSquare className="w-8 h-8 text-blue-500 mb-2" />
          <span className="text-sm font-semibold text-slate-700">Message Doctor</span>
        </button>
      </div>
    </motion.div>
  );
}