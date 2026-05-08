import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, User, ArrowRight, Eye, EyeOff, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginPage({ onLogin }: { onLogin: (user: any) => void }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    // Simulate Admin Login
    setTimeout(() => {
      const adminUser = {
        name: username || 'Administrator',
        role: 'admin',
        id: 'admin-1'
      };
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      onLogin(adminUser);
      setIsSuccess(true);
      setTimeout(() => navigate('/informasi'), 1500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-blue-400 text-xs font-black uppercase tracking-widest mb-6">
            <Terminal size={14} /> Secure Admin Portal
          </div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Otoritas <span className="text-blue-500">Pusat</span></h1>
          <p className="text-slate-500 text-sm">Hanya personil terverifikasi yang diizinkan masuk.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-blue-500/10"
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck size={40} className="text-green-500" />
                </div>
                <h2 className="text-2xl font-black text-white">Akses Diterima</h2>
                <p className="text-slate-500 mt-2">Mengalihkan ke sistem utama...</p>
              </motion.div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Admin Username</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                      <input 
                        type="text" 
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-12 py-4 text-white focus:border-blue-500 outline-none transition-all"
                        placeholder="ID Personil"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Secret Key</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                      <input 
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-12 py-4 text-white focus:border-blue-500 outline-none transition-all"
                        placeholder="••••••••"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-blue-500"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoggingIn ? (
                    <RefreshCw className="animate-spin" size={20} />
                  ) : (
                    <>Verifikasi Akses <ArrowRight size={20} /></>
                  )}
                </button>

                <div className="text-center pt-4 border-t border-slate-800">
                  <button 
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-slate-600 text-xs hover:text-slate-400 font-bold"
                  >
                    Bukan Admin? Kembali ke Login Member
                  </button>
                </div>
              </form>
            )}
          </AnimatePresence>
        </motion.div>

        <p className="text-center text-[10px] text-slate-700 font-black uppercase tracking-[0.2em] mt-12">
          Encrypted Session · Secure Core v2.0
        </p>
      </div>
    </div>
  );
}

// Simple RefreshCw icon if missing in lucide
function RefreshCw(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}
