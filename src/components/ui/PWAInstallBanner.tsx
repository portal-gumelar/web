import { useState, useEffect } from 'react';
import { Download, X, Smartphone, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const isDismissed = sessionStorage.getItem('pwa_banner_dismissed');
      if (!isDismissed) {
        setShowBanner(true);
      }
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
          {/* Overlay to catch clicks anywhere else */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 z-[998] bg-slate-900/10 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            className="fixed bottom-6 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[999] md:w-[400px]"
          >
            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-blue-50 p-6 relative overflow-hidden group">
              {/* Decorative Gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600" />
              
              <div className="flex items-start gap-5 relative z-10">
                <div className="relative shrink-0">
                  <div className="w-16 h-16 bg-white rounded-3xl p-1 shadow-xl border border-slate-100 flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://ik.imagekit.io/Gumelar/LogO/WhatsApp%20Image%202026-05-08%20at%2022.31.20.jpeg?updatedAt=1778265866416" 
                      alt="Gumelar Logo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white border-2 border-white">
                    <Smartphone size={12} />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-slate-900 text-base tracking-tight">Instal Portal Gumelar</h3>
                      <Sparkles size={14} className="text-amber-400 fill-amber-400 animate-pulse" />
                    </div>
                    <button
                      onClick={handleDismiss}
                      className="p-1 text-slate-300 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <p className="text-xs text-slate-500 leading-relaxed mb-5 font-medium">
                    Nikmati akses Kasir UMKM & Layanan Member lebih cepat. Tanpa buka browser, langsung dari layar HP Anda!
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleInstall}
                      className="flex-[2] py-3.5 bg-blue-600 text-white text-xs font-black rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 active:scale-95 group"
                    >
                      <Download size={14} className="group-hover:translate-y-0.5 transition-transform" /> 
                      PASANG SEKARANG
                    </button>
                    <button
                      onClick={handleDismiss}
                      className="flex-1 py-3.5 bg-slate-50 text-slate-500 text-[10px] font-black rounded-2xl hover:bg-slate-100 transition-all uppercase tracking-widest"
                    >
                      Nanti Saja
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
