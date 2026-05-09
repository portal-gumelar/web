import { useState, useEffect } from 'react';
import { Download, X, Smartphone, Sparkles, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Force show for testing
      setShowBanner(true);
    });

    window.addEventListener('appinstalled', () => {
      setShowBanner(false);
      setDeferredPrompt(null);
    });
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowBanner(false);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem('pwa_banner_dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 z-[998] bg-slate-900/20 backdrop-blur-[4px]"
          />

          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            className="fixed bottom-6 left-4 right-4 md:left-auto md:right-10 md:bottom-10 z-[999] md:w-[420px]"
          >
            <div className="bg-white/90 backdrop-blur-xl rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.25)] border border-white p-2 relative overflow-hidden group">
              <div className="bg-white rounded-[2.5rem] p-6 relative z-10">
                <div className="flex items-start gap-5">
                  <div className="relative shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-1 shadow-2xl rotate-3 overflow-hidden">
                      <img 
                        src="https://ik.imagekit.io/Gumelar/LogO/WhatsApp%20Image%202026-05-08%20at%2022.31.20.jpeg?updatedAt=1778265866416" 
                        alt="Logo" 
                        className="w-full h-full object-cover rounded-[1.8rem]"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-lg border border-blue-50">
                      <Zap size={16} fill="currentColor" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Aplikasi</span>
                        <Sparkles size={16} className="text-amber-400 fill-amber-400" />
                      </div>
                      <button onClick={handleDismiss} className="text-slate-300 hover:text-slate-900"><X size={20} /></button>
                    </div>
                    <h3 className="font-black text-slate-900 text-xl tracking-tight leading-none mb-2">GUMELAR.ID</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-bold opacity-80">Instal Kasir & Layanan Member secepat kilat! 🚀</p>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center gap-3">
                  <button onClick={handleInstall} className="flex-[3] py-4 bg-slate-900 text-white text-xs font-black rounded-2xl shadow-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3 active:scale-95">
                    <Download size={16} /> PASANG APLIKASI
                  </button>
                  <button onClick={handleDismiss} className="flex-1 py-4 bg-slate-100 text-slate-400 text-[10px] font-black rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest">Nanti</button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
