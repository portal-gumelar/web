import { useState } from 'react';
import { User, ShieldCheck, Lock, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginPageProps {
  onLogin: (role: 'admin' | 'member', name: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [activeTab, setActiveTab] = useState<'member' | 'admin'>('member');
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      setTimeout(() => {
        const name = activeTab === 'admin' ? 'Administrator' : (formData.identifier || 'Warga Gumelar');
        onLogin(activeTab, name);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20 pb-12 px-4">
      <div className="max-w-md w-full">
        
        {/* Logo / Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            Portal Komunitas Gumelar
          </div>
          <h1 className="text-3xl font-black text-gray-800">Selamat Datang</h1>
          <p className="text-gray-500 mt-2 text-sm">Masuk untuk mengakses layanan eksklusif warga</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
          
          {/* Tabs */}
          <div className="flex p-2 bg-gray-50 m-4 rounded-2xl">
            <button
              onClick={() => setActiveTab('member')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'member' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <User size={16} /> Warga / Member
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'admin' ? 'bg-white text-amber-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <ShieldCheck size={16} /> Admin Desa
            </button>
          </div>

          <div className="p-8 pt-4">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-2xl font-black text-gray-800">Berhasil Masuk!</h2>
                  <p className="text-gray-500 mt-2">Mengalihkan Anda ke dashboard...</p>
                </motion.div>
              ) : (
                <motion.form
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">
                      {activeTab === 'member' ? 'Nomor WhatsApp' : 'Username / Email'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        {activeTab === 'member' ? <Phone size={18} /> : <User size={18} />}
                      </div>
                      <input
                        required
                        type={activeTab === 'member' ? 'tel' : 'text'}
                        value={formData.identifier}
                        onChange={e => setFormData({ ...formData, identifier: e.target.value })}
                        placeholder={activeTab === 'member' ? '08xx xxxx xxxx' : 'admin_gumelar'}
                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Kata Sandi</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <Lock size={18} />
                      </div>
                      <input
                        required
                        type="password"
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {activeTab === 'member' && (
                    <div className="flex items-center justify-between px-1">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-xs text-gray-500 group-hover:text-gray-700">Ingat Saya</span>
                      </label>
                      <button type="button" className="text-xs font-bold text-blue-600 hover:underline">Lupa Password?</button>
                    </div>
                  )}

                  <button
                    disabled={loading}
                    type="submit"
                    className={`w-full py-4 rounded-2xl text-white font-black text-lg shadow-xl flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] ${
                      activeTab === 'admin' 
                        ? 'bg-amber-500 hover:bg-amber-400 shadow-amber-200' 
                        : 'bg-blue-600 hover:bg-blue-500 shadow-blue-200'
                    }`}
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Masuk Sekarang <ArrowRight size={20} /></>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
          
          <div className="p-6 bg-gray-50 text-center border-t border-gray-100">
            <p className="text-sm text-gray-500">
              {activeTab === 'member' ? 'Belum punya akun warga?' : 'Hanya untuk staf resmi desa'}
            </p>
            {activeTab === 'member' && (
              <button className="text-sm font-black text-blue-600 mt-1 hover:underline">Daftar Member Gumelar.ID →</button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Sistem Autentikasi Terintegrasi · GUMELAR.ID v2.0
        </p>
      </div>
    </div>
  );
}
