import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, User, Lock, ArrowRight, Eye, EyeOff, ShieldCheck, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ onLogin }: { onLogin: (user: any) => void }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    // Simulate Member Login
    setTimeout(() => {
      const userData = {
        name: username || 'Member Gumelar',
        role: 'member',
        id: Date.now().toString()
      };
      localStorage.setItem('currentUser', JSON.stringify(userData));
      onLogin(userData);
      setIsSuccess(true);
      setTimeout(() => navigate('/'), 1500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-blue-600 rounded-[2.5rem] shadow-xl shadow-blue-200 flex items-center justify-center mx-auto mb-6 transform -rotate-12">
            <LogIn className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Selamat <span className="text-blue-600">Datang</span></h1>
          <p className="text-gray-500">Masuk untuk mengakses layanan eksklusif warga</p>
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-100 border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-10">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck size={40} className="text-green-500" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-800">Berhasil Masuk!</h2>
                  <p className="text-gray-500 mt-2">Mengalihkan Anda ke dashboard...</p>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleLogin} 
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nomor WhatsApp / ID</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                        <input 
                          type="text" 
                          required
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-12 py-4 text-gray-800 focus:border-blue-500 focus:bg-white outline-none transition-all"
                          placeholder="08xxxxxxxxxx"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kata Sandi</label>
                        <button type="button" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Lupa Password?</button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                        <input 
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-12 py-4 text-gray-800 focus:border-blue-500 focus:bg-white outline-none transition-all"
                          placeholder="••••••••"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-blue-500 transition-colors"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer group px-1">
                      <div className="relative flex items-center justify-center">
                        <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-lg checked:bg-blue-600 checked:border-blue-600 transition-all" />
                        <div className="absolute opacity-0 peer-checked:opacity-100 text-white pointer-events-none">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-gray-500 group-hover:text-gray-700 transition-colors">Ingat saya di perangkat ini</span>
                    </label>
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoggingIn ? (
                      <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Masuk Sekarang <ArrowRight size={20} /></>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
          
          <div className="p-8 bg-slate-50 text-center border-t border-gray-100">
            <p className="text-gray-500 text-xs mb-3">Belum menjadi member?</p>
            <button 
              onClick={() => navigate('/daftar-member')}
              className="px-8 py-3 bg-white border border-gray-200 text-blue-600 font-black text-xs rounded-xl hover:bg-blue-50 hover:border-blue-100 transition-all shadow-sm"
            >
              DAFTAR MEMBER GUMELAR.ID →
            </button>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-gray-300">
          <Heart size={14} className="fill-gray-300" />
          <span className="text-[10px] font-black uppercase tracking-widest">Membangun Komunitas Digital</span>
        </div>
      </div>
    </div>
  );
}
