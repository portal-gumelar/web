import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ShoppingBag, Globe, Share2, History, Zap, CheckCircle } from 'lucide-react';

const NAMES = [
  'Budi', 'Slamet', 'Agus', 'Siti', 'Aminah', 'Sri', 'Eko', 'Dwi', 'Tri', 'Yanto',
  'Mulyono', 'Ratna', 'Dewi', 'Bambang', 'Wawan', 'Rina', 'Maya', 'Heri', 'Joko', 'Hadi',
  'Paijo', 'Painem', 'Sumiati', 'Tukiran', 'Supardi', 'Endang', 'Lilis', 'Yadi', 'Nanang', 'Ujang',
  'Asep', 'Dadang', 'Cecep', 'Eneng', 'Siska', 'Rully', 'Deni', 'Iwan', 'Rahmat', 'Hidayat',
  'Sutrisno', 'Sugeng', 'Sutono', 'Puji', 'Lestari', 'Wahyu', 'Aris', 'Edi', 'Tono', 'Tini',
  'Guntur', 'Mega', 'Sakti', 'Wira', 'Satria', 'Bunga', 'Mawar', 'Melati', 'Indah', 'Cahyo',
  'Dimas', 'Adit', 'Rian', 'Fajar', 'Surya', 'Bintang', 'Langit', 'Putra', 'Putri', 'Sari'
];

const LAST_NAMES = [
  'Gumelar', 'Sudarmo', 'Prasetyo', 'Wibowo', 'Santoso', 'Kusuma', 'Wijaya', 'Saputra', 'Hidayat',
  'Banyumas', 'Ajibarang', 'Cilacap', 'Purwokerto', 'Sejati', 'Utomo', 'Nugroho', 'Setiawan'
];

const ACTIONS = [
  { text: 'Baru saja mendaftar sebagai Member', icon: <Users size={16} className="text-blue-500" /> },
  { text: 'Sedang membaca Sejarah Gumelar', icon: <History size={16} className="text-amber-500" /> },
  { text: 'Baru saja mencoba Layanan Kasir', icon: <ShoppingBag size={16} className="text-green-500" /> },
  { text: 'Mengajukan pembuatan Website UMKM', icon: <Globe size={16} className="text-indigo-500" /> },
  { text: 'Membagikan portal ini ke Media Sosial', icon: <Share2 size={16} className="text-pink-500" /> },
  { text: 'Mengoptimalkan foto produk di Image Optimizer', icon: <Zap size={16} className="text-yellow-500" /> },
  { text: 'Baru saja membuat Kode QR untuk usahanya', icon: <CheckCircle size={16} className="text-teal-500" /> },
  { text: 'Melihat-lihat Galeri Portofolio Web', icon: <Globe size={16} className="text-blue-400" /> }
];

const TIMES = ['Baru saja', '2 menit lalu', '5 menit lalu', '10 menit lalu', '1 menit lalu', '3 menit lalu'];

export default function FomoNotification() {
  const [currentFomo, setCurrentFomo] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  const generateFomo = () => {
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
    const time = TIMES[Math.floor(Math.random() * TIMES.length)];
    
    return {
      user: `${name} ${lastName}`,
      action: action.text,
      icon: action.icon,
      time: time
    };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isVisible) {
        setCurrentFomo(generateFomo());
        setIsVisible(true);
        
        // Hide after 6 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 6000);
      }
    }, 15000); // Show every 15 seconds

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && currentFomo && (
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.8 }}
          className="fixed bottom-4 left-4 z-[999] max-w-[240px] md:max-w-[280px]"
        >
          <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-2.5 flex items-center gap-3 relative overflow-hidden group">
            {/* Animated Glow Line */}
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
            
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 transition-colors">
              {currentFomo.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-0">Aktivitas</p>
              <p className="text-[10px] text-slate-800 leading-tight">
                <span className="font-bold">{currentFomo.user}</span> {currentFomo.action}
              </p>
              <p className="text-[8px] text-slate-400 mt-0.5 font-medium">{currentFomo.time}</p>
            </div>
            
            <div className="absolute top-1.5 right-1.5">
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
