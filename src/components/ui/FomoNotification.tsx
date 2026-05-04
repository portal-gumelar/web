import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Eye, CheckCircle2, UserCheck } from 'lucide-react';

// Random mock messages for the FOMO notifications
const FOMO_MESSAGES = [
  { text: "12 orang sedang melihat portal ini", icon: Eye, color: "text-blue-500", bg: "bg-blue-100" },
  { text: "Budi dari RW 02 baru saja mendaftar member", icon: UserCheck, color: "text-green-500", bg: "bg-green-100" },
  { text: "Siti sedang melihat halaman Info Jasa", icon: Eye, color: "text-purple-500", bg: "bg-purple-100" },
  { text: "Pak Kades baru saja mengunggah Berita Baru", icon: Bell, color: "text-yellow-500", bg: "bg-yellow-100" },
  { text: "Warga Gumelar baru saja mengunduh Form Surat", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-100" },
  { text: "5 orang online di halaman Transparansi", icon: Eye, color: "text-indigo-500", bg: "bg-indigo-100" },
  { text: "Donasi kopi baru saja diterima! ☕", icon: Bell, color: "text-orange-500", bg: "bg-orange-100" }
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

  const Icon = currentMessage.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-6 z-50 max-w-xs bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 flex items-center gap-3 cursor-pointer"
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
