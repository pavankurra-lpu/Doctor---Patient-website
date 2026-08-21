import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, User, ShieldCheck, ArrowRight, HeartPulse, ChevronLeft, ClipboardList, Pill } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PatientPortal() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(60);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [sessionId, setSessionId] = useState('');
  const [uniqueId, setUniqueId] = useState('');

  useEffect(() => {
    let interval: any;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });
      const data = await res.json();
      setSessionId(data.registration_session_id);
      alert('[DEV MODE] The backend generated this OTP for you: ' + data.dev_otp);
      setTimer(60);
      setStep(2);
    } catch (e) {
      alert('Failed to send OTP');
    }
    setIsLoading(false);
  };

  const handleVerify = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3000/auth/register/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registration_session_id: sessionId, otp })
      });
      const data = await res.json();
      if (res.ok) {
        setUniqueId(data.unique_id);
        setStep(3);
      } else {
        alert(data.error || 'Invalid OTP');
      }
    } catch (e) {
      alert('Verification failed');
    }
    setIsLoading(false);
  };

  if (step === 4) {
    return <Dashboard name={name} uniqueId={uniqueId} onLogout={() => navigate('/')} />
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-600/10 to-transparent -z-10" />
      
      {/* Back Button */}
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
                <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">Enter your details</h2>
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><User className="h-5 w-5 text-slate-400" /></div>
                    <input type="text" className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Phone className="h-5 w-5 text-slate-400" /></div>
                    <input type="email" className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <button onClick={handleRegister} disabled={isLoading || !name || !email} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all disabled:opacity-70 mt-6">
                    {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Continue <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4"><ShieldCheck className="w-6 h-6" /></div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">Verify your identity</h2>
                  <p className="text-slate-500 text-sm">We\\'ve sent a secure code to<br/><strong className="text-slate-700">{email}</strong></p>
                </div>
                <div className="space-y-6">
                  <input type="text" maxLength={6} className="block w-full text-center tracking-[1em] py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-xl" placeholder="••••••" value={otp} onChange={(e) => setOtp(e.target.value)} />
                  <button onClick={handleVerify} disabled={isLoading || otp.length < 6} className="w-full flex items-center justify-center bg-slate-900 text-white font-semibold py-3 px-4 rounded-xl">
                    {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Verify Account'}
                  </button>
                  <p className="text-center text-sm text-slate-500 font-medium">
                    Didn\\'t receive it? {timer > 0 ? <span className="text-slate-400">Resend in {timer}s</span> : <button onClick={handleRegister} className="text-blue-600 hover:underline">Resend Now</button>}
                  </p>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-500 mb-6 shadow-inner"><ShieldCheck className="w-10 h-10" /></div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Authentication Success</h2>
                <p className="text-slate-500 mb-8">Your unique CareLoop identifier has been generated.</p>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Your Unique ID</p>
                  <p className="text-3xl font-black text-blue-600 tracking-widest">{uniqueId}</p>
                </div>
                <button onClick={() => setStep(4)} className="w-full bg-slate-900 text-white font-semibold py-3 px-4 rounded-xl shadow-lg">Enter Dashboard</button>
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

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-slate-50 pb-24">
      {/* Dashboard Header with Logout */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <button onClick={onLogout} className="text-slate-500 flex items-center text-sm font-medium"><ChevronLeft className="w-4 h-4"/> Logout</button>
        <div className="font-bold text-blue-600">{uniqueId}</div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6 mt-4">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Hello, {name.split(' ')[0] || 'Patient'}</h1>
            <p className="text-sm text-slate-500">Your Care Dashboard</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">{name.charAt(0) || 'P'}</div>
        </header>

        {/* Vitals Results Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
          <h2 className="text-blue-100 text-sm font-medium mb-1">Latest Results</h2>
          <div className="flex items-baseline gap-2 mb-4">
            <p className="text-3xl font-bold">118</p>
            <p className="text-blue-200 text-sm">mg/dL</p>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-blue-200 text-xs">Last updated</p>
              <p className="font-semibold">Today, 8:30 AM</p>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-lg text-sm font-medium">Normal Range</div>
          </div>
        </div>

        {/* Interactive Checklist */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-800">Today's Action Plan</h3>
          </div>
          <ul className="space-y-3">
            {tasks.map(task => (
              <li key={task.id} className={\lex items-start gap-3 p-3 rounded-xl border transition-colors \\}>
                <div className="mt-0.5 cursor-pointer" onClick={() => toggleTask(task.id)}>
                  <div className={\w-6 h-6 rounded-md flex items-center justify-center transition-colors \\}>
                    {task.done && <ShieldCheck className="w-4 h-4"/>}
                  </div>
                </div>
                <div className="flex-1">
                  <p className={\ont-semibold transition-colors \\}>{task.text}</p>
                  <p className={\	ext-xs \\}>{task.target}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
