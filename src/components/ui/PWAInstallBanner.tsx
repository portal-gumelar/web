import { useState, useEffect } from 'react';
import { Download, X, Smartphone, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Check if user has already dismissed it this session
      const isDismissed = sessionStorage.getItem('pwa_banner_dismissed');
      if (!isDismissed) {
        setShowBanner(true);
      }
    });

    window.addEventListener('appinstalled', () => {
      // Log install to analytics or hide banner
      setShowBanner(false);
      setDeferredPrompt(null);
      console.log('PWA was installed');
    });
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem('pwa_banner_dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-24 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[999] md:w-96"
        >
          <div className="bg-white rounded-[2rem] shadow-2xl border border-blue-100 p-6 relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 shrink-0">
                <Smartphone size={24} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-black text-slate-900 text-sm">Instal GUMELAR.ID</h3>
                  <Sparkles size={14} className="text-amber-400 animate-pulse" />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Akses Kasir & Layanan Member lebih cepat dengan menginstal aplikasi di layar utama Anda.
                </p>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleInstall}
                    className="flex-1 py-3 bg-blue-600 text-white text-xs font-black rounded-xl shadow-md hover:bg-blue-700 transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Download size={14} /> Instal Sekarang
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="p-3 text-slate-400 hover:bg-slate-50 rounded-xl transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
