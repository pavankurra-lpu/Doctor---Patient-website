import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, ShieldCheck, ArrowRight, HeartPulse, ChevronLeft, ClipboardList, Lock, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PatientPortal() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<'register' | 'login'>('login');
  const [timer, setTimer] = useState(60);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  
  // Login State
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [sessionId, setSessionId] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let interval: any;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleRegister = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const generatedId = (name.substring(0, 2) || 'XX').toUpperCase() + '0826';
    setSessionId('mock-session');
    setUniqueId(generatedId);
    
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    alert('[VERCEL DEMO] A real backend would email this. For now, your OTP is: ' + mockOtp);
    
    (window as any)._mockOtp = mockOtp;
    
    setTimer(60);
    setStep(2);
    setIsLoading(false);
  };

  const handleVerify = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (otp === (window as any)._mockOtp) {
      setStep(3); // Go to Set Password step
    } else {
      alert('Invalid OTP. Please try again.');
    }
    setIsLoading(false);
  };

  const handleSetPassword = () => {
    if (password.length < 4) {
      alert('Password must be at least 4 characters');
      return;
    }
    // Save to localStorage for future logins
    localStorage.setItem('careloop_user_' + uniqueId, JSON.stringify({ name, password }));
    setStep(4);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    const saved = localStorage.getItem('careloop_user_' + loginId.toUpperCase());
    if (saved) {
      const data = JSON.parse(saved);
      if (data.password === loginPassword) {
        setName(data.name);
        setUniqueId(loginId.toUpperCase());
        setStep(4);
      } else {
        alert('Incorrect password');
      }
    } else {
      alert('Unique ID not found. Please register first.');
    }
    setIsLoading(false);
  };

  if (step === 4) {
    return <Dashboard name={name} uniqueId={uniqueId} onLogout={() => { setStep(1); setMode('login'); setLoginPassword(''); }} />
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-600/10 to-transparent -z-10" />
      
      <button onClick={() => navigate('/')} className="absolute top-6 left-6 flex items-center text-slate-500 hover:text-slate-800 transition-colors bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm border border-slate-200">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
      </button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md border border-slate-100">
        <div className="bg-blue-600 p-8 text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />
          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md mb-4">
              <HeartPulse className="text-white w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">CareLoop</h1>
            <p className="text-blue-100 mt-1 text-sm font-medium">Patient Portal</p>
          </div>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                
                {/* Mode Toggle */}
                <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                  <button onClick={() => setMode('login')} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${mode === 'login' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}>Login</button>
                  <button onClick={() => setMode('register')} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${mode === 'register' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}>Register</button>
                </div>

                {mode === 'register' ? (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">New Patient Registration</h2>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><User className="h-5 w-5 text-slate-400" /></div>
                      <input type="text" className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-slate-400" /></div>
                      <input type="email" className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button onClick={handleRegister} disabled={isLoading || !name || !email} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all disabled:opacity-70 mt-6">
                      {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Send OTP <ArrowRight className="w-4 h-4" /></>}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">Welcome Back</h2>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><User className="h-5 w-5 text-slate-400" /></div>
                      <input type="text" className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" placeholder="Unique ID (e.g. PA0826)" value={loginId} onChange={(e) => setLoginId(e.target.value)} />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-slate-400" /></div>
                      <input type="password" className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                    </div>
                    <button onClick={handleLogin} disabled={isLoading || !loginId || !loginPassword} className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-xl transition-all disabled:opacity-70 mt-6">
                      {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Login <ArrowRight className="w-4 h-4" /></>}
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4"><ShieldCheck className="w-6 h-6" /></div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">Verify your identity</h2>
                  <p className="text-slate-500 text-sm">We've sent a secure code to<br/><strong className="text-slate-700">{email}</strong></p>
                </div>
                <div className="space-y-6">
                  <input type="text" maxLength={6} className="block w-full text-center tracking-[1em] py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-xl" placeholder="••••••" value={otp} onChange={(e) => setOtp(e.target.value)} />
                  <button onClick={handleVerify} disabled={isLoading || otp.length < 6} className="w-full flex items-center justify-center bg-slate-900 text-white font-semibold py-3 px-4 rounded-xl">
                    {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Verify OTP'}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4 shadow-inner"><KeyRound className="w-8 h-8" /></div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Set Your Password</h2>
                <p className="text-slate-500 mb-6 text-sm">Save your Unique ID and set a password for future logins.</p>
                
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Your Unique ID</p>
                  <p className="text-2xl font-black text-blue-600 tracking-widest">{uniqueId}</p>
                </div>

                <div className="relative mb-6 text-left">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-slate-400" /></div>
                  <input type="password" className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                
                <button onClick={handleSetPassword} disabled={password.length < 4} className="w-full bg-slate-900 text-white font-semibold py-3 px-4 rounded-xl shadow-lg disabled:opacity-70">Complete Registration</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

function Dashboard({ name, uniqueId, onLogout }: any) {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Log Morning Blood Sugar', target: '< 130 mg/dL', done: false },
    { id: 2, text: 'Take Metformin 500mg', target: 'With breakfast', done: false }
  ]);

  const [patientData, setPatientData] = useState<any>(null);

  useEffect(() => {
    // Poll the mock DB to check if Admin has assigned a doctor yet
    const checkStatus = () => {
      const allPatients = getPatients();
      const current = allPatients.find((p: any) => p.uniqueId === uniqueId);
      if (current) setPatientData(current);
    };
    checkStatus();
    const int = setInterval(checkStatus, 2000);
    return () => clearInterval(int);
  }, [uniqueId]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const isAssigned = patientData && patientData.status !== 'new_registration';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-slate-950 text-slate-100 pb-24 relative overflow-hidden font-sans">
      
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-md mx-auto p-6 space-y-8 mt-6 relative z-10">
        
        <div className="flex items-center justify-between">
          <button onClick={onLogout} className="text-slate-400 hover:text-white transition flex items-center text-sm font-medium bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 backdrop-blur-md">
            <ChevronLeft className="w-4 h-4 mr-1"/> Exit
          </button>
          <div className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-mono text-sm tracking-widest">{uniqueId}</div>
        </div>

        <header className="flex justify-between items-end">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <p className="text-sm text-slate-400 mb-1">Welcome back,</p>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">{name.split(' ')[0] || 'Patient'}</h1>
          </motion.div>
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-blue-500/20 border border-white/10">{name.charAt(0) || 'P'}</div>
        </header>

        {/* Status Alert */}
        {!isAssigned && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 flex items-start gap-3">
            <div className="mt-0.5 text-yellow-500 animate-pulse"><ActivitySquare className="w-5 h-5" /></div>
            <div>
              <h3 className="font-bold text-yellow-500 text-sm">Awaiting Doctor Assignment</h3>
              <p className="text-xs text-yellow-500/70 mt-1">Your case is currently being reviewed by the Hospital Authority. Your full care plan will appear here once a doctor is assigned.</p>
            </div>
          </motion.div>
        )}

        {isAssigned && patientData?.assignedDoctor && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3">
            <div className="text-emerald-500"><ShieldCheck className="w-5 h-5" /></div>
            <div>
              <h3 className="font-bold text-emerald-500 text-sm">Doctor Assigned</h3>
              <p className="text-xs text-emerald-500/70 mt-0.5">You are under the care of <strong className="text-emerald-400">{patientData.assignedDoctor}</strong></p>
            </div>
          </motion.div>
        )}

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
          <div className="relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full" />
            <h2 className="text-slate-400 text-sm font-medium mb-2 flex items-center gap-2"><HeartPulse className="w-4 h-4 text-blue-400" /> Initial Vitals (At Visit)</h2>
            <div className="flex justify-between items-end">
              <div className="flex items-baseline gap-2 mb-2 mt-4">
                <p className="text-4xl font-black text-white">84</p>
                <p className="text-slate-400 text-sm font-medium">bpm</p>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <p className="text-4xl font-black text-white">118</p>
                <p className="text-slate-400 text-sm font-medium">mg/dL</p>
              </div>
            </div>
          </div>
        </motion.div>

        {isAssigned && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400"><ClipboardList className="w-5 h-5" /></div>
              <h3 className="font-bold text-white text-lg">Prescription & Plan</h3>
            </div>
            <ul className="space-y-4">
              {tasks.map((task, i) => (
                <motion.li key={task.id} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 + (i * 0.1) }} className={`flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer border ${task.done ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-white/5 border-white/5 hover:bg-white/10'}`} onClick={() => toggleTask(task.id)}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 ${task.done ? 'bg-emerald-500 text-slate-900 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'border-2 border-slate-600'}`}>
                    {task.done && <ShieldCheck className="w-5 h-5"/>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold truncate transition-all duration-300 ${task.done ? 'text-emerald-400 line-through opacity-70' : 'text-slate-200'}`}>{task.text}</p>
                    <p className={`text-xs transition-colors ${task.done ? 'text-emerald-500/50' : 'text-slate-500'}`}>{task.target}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
