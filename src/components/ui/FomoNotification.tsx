import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Eye, CheckCircle2, UserCheck } from 'lucide-react';

// Random mock messages for the FOMO notifications
const FOMO_MESSAGES = [
  { text: "Ahmad dari Purwokerto baru saja membuka portal ini", icon: Eye, color: "text-blue-500", bg: "bg-blue-100" },
  { text: "Siti baru saja mendaftar jadi member Gumelar.ID", icon: UserCheck, color: "text-green-500", bg: "bg-green-100" },
  { text: "Rizki dari Cilacap sedang melihat Info Jasa", icon: Eye, color: "text-purple-500", bg: "bg-purple-100" },
  { text: "Dewi baru saja mengajukan E-Surat secara online", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-100" },
  { text: "Andi dari Jakarta membuka halaman UMKM Gumelar", icon: Eye, color: "text-indigo-500", bg: "bg-indigo-100" },
  { text: "Nurul baru saja memberikan donasi Sruput Kopi ☕", icon: Bell, color: "text-orange-500", bg: "bg-orange-100" },
  { text: "Fajar dari Ajibarang sedang melihat Ruang Kreatif", icon: Eye, color: "text-pink-500", bg: "bg-pink-100" },
  { text: "Hasan baru saja melihat Galeri Ruang Kreatif", icon: Eye, color: "text-amber-600", bg: "bg-amber-100" },
  { text: "Rina dari Banyumas tertarik dengan produk UMKM lokal", icon: Eye, color: "text-blue-600", bg: "bg-blue-100" },
  { text: "Doni baru saja menghubungi penjual via WhatsApp", icon: CheckCircle2, color: "text-teal-500", bg: "bg-teal-100" },
];

export default function FomoNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(FOMO_MESSAGES[0]);

  useEffect(() => {
    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(() => {
      showRandomNotification();
    }, 3000);

    return () => clearTimeout(initialTimeout);
  }, []);

  const showRandomNotification = () => {
    // Pick a random message
    const randomMsg = FOMO_MESSAGES[Math.floor(Math.random() * FOMO_MESSAGES.length)];
    setCurrentMessage(randomMsg);
    setIsVisible(true);

    // Hide it after 4 seconds
    setTimeout(() => {
      setIsVisible(false);
      
      // Schedule next notification between 10 to 30 seconds
      const nextDelay = Math.floor(Math.random() * 20000) + 10000;
      setTimeout(() => {
        showRandomNotification();
      }, nextDelay);
      
    }, 4000);
  };

  if (!currentMessage) return null;
  const Icon = currentMessage.icon || Bell;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 flex items-center gap-3 cursor-pointer"
          onClick={() => setIsVisible(false)} // Dismiss on click
        >
          {/* Icon Box */}
          <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${currentMessage.bg}`}>
            <Icon size={18} className={currentMessage.color} />
          </div>
          
          {/* Text Content */}
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800 leading-tight">
              {currentMessage.text}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">Baru saja</p>
          </div>
          
          {/* Glowing dot indicator */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
