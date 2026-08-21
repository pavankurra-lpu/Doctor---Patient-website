import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Search, ActivitySquare, UserPlus, Users, FileText, ChevronLeft, CheckCircle2, ChevronRight, Upload, ShieldAlert, Lock, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getPatients, savePatients, getDoctors } from './lib/mockDB';

export default function AdminPortal() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [adminKey, setAdminKey] = useState('');

  const [activeTab, setActiveTab] = useState('new');
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated) return;
    // Poll local storage to simulate realtime DB sync for Vercel demo
    const load = () => {
      setPatients(getPatients());
      setDoctors(getDoctors());
    };
    load();
    const int = setInterval(load, 2000);
    return () => clearInterval(int);
  }, [isAuthenticated]);

  const handleLogin = () => {
    // Strict mock credentials for demo
    if (adminId.toUpperCase() === 'ADMIN' && adminKey === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('ACCESS DENIED: Invalid Authority Credentials');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-sans text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950 -z-10" />
        
        <button onClick={() => navigate('/')} className="absolute top-6 left-6 flex items-center text-slate-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <ChevronLeft className="w-4 h-4 mr-1" /> Return
        </button>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden w-full max-w-md border border-emerald-500/30 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-teal-400" />
          
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl relative z-10"><ShieldAlert className="w-10 h-10 text-emerald-400" /></div>
              </div>
            </div>
            
            <h1 className="text-2xl font-black text-center mb-1 text-emerald-400 tracking-wider uppercase">Restricted Area</h1>
            <p className="text-center text-slate-400 text-sm mb-8 font-mono">Hospital Authority Access Only</p>
            
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><UserPlus className="h-5 w-5 text-emerald-500/50" /></div>
                <input type="text" className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-mono uppercase placeholder:normal-case" placeholder="Authority ID (Use: ADMIN)" value={adminId} onChange={e => setAdminId(e.target.value)} />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><KeyRound className="h-5 w-5 text-emerald-500/50" /></div>
                <input type="password" className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-mono placeholder:normal-case" placeholder="Security Key (Use: admin123)" value={adminKey} onChange={e => setAdminKey(e.target.value)} />
              </div>

              <button onClick={handleLogin} className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-xl font-bold mt-6 shadow-[0_0_20px_rgba(5,150,105,0.4)] transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
                <Lock className="w-4 h-4" /> Authenticate
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const newPatients = patients.filter(p => p.status === 'new_registration');
  const queue = patients.filter(p => p.status === 'queue').sort((a, b) => a.name.localeCompare(b.name));
  const onboard = patients.filter(p => p.status === 'onboard');
  const records = patients.filter(p => p.status === 'record');

  const handleAssignDoctor = (id: string, doc: any) => {
    const updated = patients.map(p => p.uniqueId === id ? { ...p, status: 'queue', assignedDoctor: doc.name, assignedDoctorId: doc.id } : p);
    savePatients(updated);
    setPatients(updated);
  };

  const handleUploadTest = (id: string) => {
    const updated = patients.map(p => p.uniqueId === id ? { ...p, testResults: [...(p.testResults || []), 'CBC Blood Panel - NORMAL'] } : p);
    savePatients(updated);
    setPatients(updated);
    alert('Test result uploaded successfully!');
  };

  const handleCheckupDone = (id: string, nextStatus: 'onboard' | 'record') => {
    const updated = patients.map(p => p.uniqueId === id ? { ...p, status: nextStatus, lastVisit: new Date().toISOString() } : p);
    savePatients(updated);
    setPatients(updated);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Building2 className="text-emerald-400" /> Hospital Authority
              </h1>
              <p className="text-slate-400 text-sm mt-1">Centralized Patient Management System</p>
            </div>
          </div>
          <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl">
            {[
              { id: 'new', label: 'New Registrations', count: newPatients.length, icon: UserPlus },
              { id: 'queue', label: 'Patient Queue', count: queue.length, icon: Users },
              { id: 'onboard', label: 'On-board', count: onboard.length, icon: ActivitySquare },
              { id: 'record', label: 'Records', count: records.length, icon: FileText }
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.15)]' : 'text-slate-400 hover:text-slate-200'}`}>
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.count > 0 && <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-emerald-500/20' : 'bg-white/10'}`}>{tab.count}</span>}
              </button>
            ))}
          </div>
        </header>

        {/* Hospital Capacity Widget */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/50 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl"><Building2 className="w-6 h-6"/></div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase">Total Beds</p>
              <p className="text-2xl font-black">450</p>
            </div>
          </div>
          <div className="bg-slate-900/50 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl"><ActivitySquare className="w-6 h-6"/></div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase">Available</p>
              <p className="text-2xl font-black">{450 - onboard.length - queue.length}</p>
            </div>
          </div>
          <div className="bg-slate-900/50 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-rose-500/20 text-rose-400 rounded-xl"><ShieldAlert className="w-6 h-6"/></div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase">Critical ICU</p>
              <p className="text-2xl font-black">12/50</p>
            </div>
          </div>
          <div className="bg-slate-900/50 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl"><Users className="w-6 h-6"/></div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase">Doctors On Duty</p>
              <p className="text-2xl font-black">{doctors.length}</p>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'new' && (
            <motion.div key="new" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid gap-4">
              {newPatients.length === 0 ? (
                <div className="text-center py-20 text-slate-500 border border-white/5 rounded-3xl bg-white/5 backdrop-blur-sm">No new registrations pending assignment.</div>
              ) : (
                newPatients.map(p => (
                  <div key={p.uniqueId} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex items-center justify-between hover:bg-white/10 transition">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-md text-xs font-bold tracking-widest">{p.uniqueId}</span>
                        <h3 className="text-xl font-bold">{p.name}</h3>
                      </div>
                      <p className="text-slate-400 text-sm flex items-start gap-2 max-w-xl">
                        <ActivitySquare className="w-4 h-4 mt-0.5 text-rose-400 shrink-0" /> 
                        <span className="italic">"{p.illness}"</span>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {doctors.length === 0 ? <span className="text-rose-400 text-sm">No doctors registered yet. Register a doctor first.</span> : doctors.map(doc => (
                        <button key={doc.id} onClick={() => handleAssignDoctor(p.uniqueId, doc)} className="px-4 py-2 bg-slate-800 hover:bg-emerald-600 border border-white/10 rounded-xl text-sm font-semibold transition-colors">
                          Assign {doc.name} ({doc.specialty})
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === 'queue' && (
            <motion.div key="queue" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid gap-4">
              {queue.length === 0 ? (
                <div className="text-center py-20 text-slate-500 border border-white/5 rounded-3xl bg-white/5 backdrop-blur-sm">Queue is empty.</div>
              ) : (
                queue.map(p => (
                  <div key={p.uniqueId} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold">{p.name}</h3>
                        <span className="text-slate-500 text-sm">({p.uniqueId})</span>
                      </div>
                      <p className="text-emerald-400 text-sm font-medium mb-1">Assigned to: {p.assignedDoctor}</p>
                      
                      {p.testsRequested && p.testsRequested.length > 0 && (
                        <div className="mb-3 text-sm text-yellow-400">
                          <strong>Test Requested by Doctor:</strong> {p.testsRequested.join(', ')}
                        </div>
                      )}

                      <div className="flex gap-3 mt-2">
                        <button onClick={() => handleUploadTest(p.uniqueId)} className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-semibold hover:bg-blue-500/30 transition">
                          <Upload className="w-3 h-3" /> Upload Test Results
                        </button>
                        <span className="text-slate-500 text-xs py-1.5">{p.testResults?.length || 0} tests on file</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 border-l border-white/10 pl-6">
                      <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Mark Checkup As:</p>
                      <button onClick={() => handleCheckupDone(p.uniqueId, 'onboard')} className="px-4 py-2 bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 border border-indigo-500/20 rounded-xl text-sm font-semibold transition-colors text-left flex justify-between items-center w-48">
                        Ongoing Treatment <ChevronRight className="w-4 h-4"/>
                      </button>
                      <button onClick={() => handleCheckupDone(p.uniqueId, 'record')} className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 border border-white/10 rounded-xl text-sm font-semibold transition-colors text-left flex justify-between items-center w-48">
                        Case Closed <CheckCircle2 className="w-4 h-4"/>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === 'onboard' && (
            <motion.div key="onboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-3 gap-4">
               {onboard.length === 0 ? (
                <div className="col-span-3 text-center py-20 text-slate-500 border border-white/5 rounded-3xl bg-white/5 backdrop-blur-sm">No ongoing patients.</div>
              ) : (
                onboard.map(p => (
                  <div key={p.uniqueId} className="bg-indigo-950/30 backdrop-blur-md border border-indigo-500/20 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-indigo-100">{p.name}</h3>
                    <p className="text-indigo-400/70 text-xs mb-4">{p.uniqueId} • {p.assignedDoctor}</p>
                    <p className="text-sm text-indigo-200 line-clamp-2">{p.illness}</p>
                    <button onClick={() => handleCheckupDone(p.uniqueId, 'record')} className="mt-4 w-full py-2 bg-indigo-500/20 hover:bg-indigo-500/40 text-indigo-300 text-sm font-bold rounded-lg transition">Close Case</button>
                  </div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === 'record' && (
            <motion.div key="record" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid gap-4">
              {records.length === 0 ? (
                <div className="text-center py-20 text-slate-500 border border-white/5 rounded-3xl bg-white/5 backdrop-blur-sm">No historical records found.</div>
              ) : (
                records.map(p => (
                  <div key={p.uniqueId} className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex items-start gap-6 opacity-70 hover:opacity-100 transition">
                    <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                      <FileText className="text-slate-400 w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-slate-200">{p.name} <span className="text-slate-500 text-sm font-normal ml-2">{p.uniqueId}</span></h3>
                        <span className="text-xs text-slate-500 font-mono">Last Visit: {new Date(p.lastVisit).toLocaleDateString()}</span>
                      </div>
                      <p className="text-slate-400 text-sm mb-2">Treated by {p.assignedDoctor} for: "{p.illness}"</p>
                      
                      {p.testResults && p.testResults.length > 0 && (
                        <div className="mt-4 p-3 bg-black/20 rounded-lg border border-white/5">
                          <p className="text-xs font-bold text-slate-500 uppercase mb-2">Lifetime Test Records</p>
                          <ul className="list-disc list-inside text-sm text-slate-300">
                            {p.testResults.map((t: string, i: number) => <li key={i}>{t}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
