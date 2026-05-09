import { Coffee, Users, Newspaper, Palette, Briefcase, Star, ChevronRight, Shield, Zap, X, Heart, Gift, Share2, Link as LinkIcon } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ActivePage } from '../types';

interface HomePageProps {
  setActivePage: (page: ActivePage) => void;
}

const galleryImages = [
  { src: "https://ik.imagekit.io/Gumelar/WhatsApp%20Image%202026-05-07%20at%2016.02.59.jpeg?updatedAt=1778146904593", caption: "Maju Bersama UMKM Gumelar" },
  { src: "https://ik.imagekit.io/Gumelar/WhatsApp%20Image%202026-05-07%20at%2016.02.58%20(1).jpeg?updatedAt=1778146903929", caption: "Ruang Kreatif Karya Lokal" },
  { src: "https://ik.imagekit.io/Gumelar/WhatsApp%20Image%202026-05-07%20at%2016.02.56.jpeg?updatedAt=1778146898519", caption: "Portal Gumelar: Dari Kita Untuk Semua" },
  { src: "https://ik.imagekit.io/Gumelar/WhatsApp%20Image%202026-05-07%20at%2016.03.00.jpeg?updatedAt=1778146902020", caption: "Kembangkan Potensi Usaha Desa" },
  { src: "https://ik.imagekit.io/Gumelar/WhatsApp%20Image%202026-05-07%20at%2016.02.58.jpeg?updatedAt=1778146897922", caption: "Bersinergi Membangun Ekonomi Lokal" },
  { src: "https://ik.imagekit.io/Gumelar/WhatsApp%20Image%202026-05-07%20at%2016.02.56%20(1).jpeg?updatedAt=1778146897332", caption: "Produk Lokal Berkualitas Unggul" },
  { src: "https://ik.imagekit.io/Gumelar/WhatsApp%20Image%202026-05-07%20at%2016.02.55%20(1).jpeg?updatedAt=1778146889744", caption: "Gumelar.ID Wadah Inspirasi Warga" },
  { src: "https://ik.imagekit.io/Gumelar/WhatsApp%20Image%202026-05-07%20at%2016.02.55.jpeg?updatedAt=1778146867547", caption: "Dukung Karya & Usaha Tetangga" },
  { src: "https://ik.imagekit.io/Gumelar/WhatsApp%20Image%202026-05-07%20at%2016.03.00%20(1).jpeg?updatedAt=1778146840004", caption: "Langkah Kecil, Dampak Besar" },
];

const menuCards = [
  {
    id: 'tentang' as ActivePage,
    icon: Users,
    title: 'Tentang Kami',
    desc: 'Kenali lebih dekat komunitas Gumelar dan visi misi kami untuk masyarakat',
    color: 'from-blue-500 to-blue-700',
    bg: 'bg-blue-50',
    num: '1',
  },
  {
    id: 'informasi' as ActivePage,
    icon: Newspaper,
    title: 'Informasi Gumelar',
    desc: 'Berita dan informasi terkini seputar Gumelar, member dapat memposting berita',
    color: 'from-green-500 to-green-700',
    bg: 'bg-green-50',
    num: '2',
  },
  {
    id: 'kreatif' as ActivePage,
    icon: Palette,
    title: 'Ruang Kreatif',
    desc: 'Galeri karya-karya kreatif dari member komunitas Gumelar',
    color: 'from-purple-500 to-purple-700',
    bg: 'bg-purple-50',
    num: '3',
  },
  {
    id: 'jasa' as ActivePage,
    icon: Briefcase,
    title: 'Informasi Jasa',
    desc: 'Direktori pelaku usaha, UMKM, dan penyedia jasa di sekitar Gumelar',
    color: 'from-orange-500 to-orange-700',
    bg: 'bg-orange-50',
    num: '4',
  },
  {
    id: 'layanan' as ActivePage,
    icon: Star,
    title: 'Layanan Member',
    desc: 'Layanan gratis untuk member: Compress PDF & Pembuatan CV Lamaran Kerja',
    color: 'from-pink-500 to-pink-700',
    bg: 'bg-pink-50',
    num: '5',
  },
  {
    id: 'donasi' as ActivePage,
    icon: Coffee,
    title: 'Donasi Sruput Kopi',
    desc: 'Dukung keberlangsungan portal ini dengan "sruput kopi" bareng kami',
    color: 'from-amber-500 to-amber-700',
    bg: 'bg-amber-50',
    num: '☕',
  },
];

// Animation variants
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Animated counter hook
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
      >
        {value}{suffix}
      </motion.span>
    </motion.span>
  );
}


export default function HomePage({ setActivePage }: HomePageProps) {
  const [selectedImage, setSelectedImage] = useState<{src: string, caption: string} | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/hero-gumelar.jpg)' }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/85 via-slate-800/75 to-slate-950/90" />

        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-5xl mx-auto px-4 py-12 sm:py-20 text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 px-5 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            <Shield size={14} />
            PORTAL KOMUNITAS RESMI GUMELAR
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-4 leading-tight drop-shadow-2xl">
            GUMELAR<span className="text-yellow-400">.ID</span>
          </h1>

          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6 rounded-full" />

          <p className="text-xl md:text-2xl text-slate-200 font-medium mb-3">
            Ruang Kreatif Masyarakat Gumelar
          </p>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Portal resmi komunitas Gumelar dan sekitarnya — tempat berbagi informasi, karya, dan usaha lokal
          </p>

          {/* Disclaimer */}
          <div className="inline-flex items-center gap-3 bg-red-600/80 backdrop-blur-sm border border-red-400/50 text-white px-6 py-3 rounded-xl text-sm font-bold mb-10">
            <Shield size={16} />
            DISCLAIMER: NO POLITIK · NO SARA
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActivePage('daftar-member')}
              className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-900 font-black rounded-xl shadow-2xl transition-all duration-200 hover:scale-105 text-lg"
            >
              🎉 Daftar Jadi Member
            </button>
            <button
              onClick={() => setActivePage('informasi')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/30 backdrop-blur-sm transition-all duration-200 hover:scale-105 text-lg"
            >
              Lihat Informasi →
            </button>
          </div>

          {/* Scroll hint */}
          <div className="mt-16 flex flex-col items-center gap-2 text-slate-400 animate-bounce">
            <span className="text-xs">Scroll untuk melihat menu</span>
            <ChevronRight size={20} className="rotate-90" />
          </div>
        </motion.div>
      </section>

      {/* Welcome Section */}
      <section className="bg-gradient-to-b from-slate-950 to-slate-900 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Zap size={14} />
            SELAMAT DATANG
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            Selamat Datang di Ruang Kreatif<br className="hidden sm:block" />
            <span className="text-amber-400"> Masyarakat Gumelar!</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Portal Gumelar hadir sebagai wadah digital bagi seluruh masyarakat Gumelar dan sekitarnya
            untuk berbagi informasi, menampilkan karya, dan mengembangkan usaha lokal bersama-sama.
          </p>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-12"
          >
            <motion.div variants={cardVariants} className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-black text-amber-400"><AnimatedNumber value={500} suffix="+" /></div>
              <div className="text-slate-400 text-sm mt-1">Member Aktif</div>
            </motion.div>
            <motion.div variants={cardVariants} className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-black text-amber-400"><AnimatedNumber value={120} suffix="+" /></div>
              <div className="text-slate-400 text-sm mt-1">UMKM Terdaftar</div>
            </motion.div>
            <motion.div variants={cardVariants} className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-black text-amber-400"><AnimatedNumber value={50} suffix="+" /></div>
              <div className="text-slate-400 text-sm mt-1">Karya Dipublish</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="bg-slate-950 py-16 border-t border-slate-900 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 mb-10 flex items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 px-3 py-1 rounded-full text-xs font-bold mb-3">
              📸 GALERI TERBARU
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              Potret <span className="text-amber-400">Komunitas</span>
            </h2>
            <p className="text-slate-400 text-base mt-2 max-w-xl">Momen kebersamaan, kreativitas, dan kegiatan dari masyarakat Gumelar.</p>
          </div>
          <button 
            onClick={() => setActivePage('kreatif')}
            className="hidden sm:flex items-center gap-1 text-amber-400 hover:text-amber-300 text-sm font-bold transition-all hover:gap-2"
          >
            Lihat Galeri <ChevronRight size={16} />
          </button>
        </div>

        {/* Marquee Gallery Container */}
        <div className="relative flex overflow-hidden group pb-8">
          {/* Gradient Masks for fading effect at edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none"></div>

          {/* Marquee Scroll */}
          <div className="flex gap-4 px-4 w-max animate-marquee">
            {[...galleryImages, ...galleryImages].map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedImage(item)}
                className="w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 flex-shrink-0 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 hover:border-amber-400/50 transition-all duration-500 cursor-pointer relative group"
              >
                <img 
                  src={item.src} 
                  alt={item.caption} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center sm:hidden mt-4">
           <button 
            onClick={() => setActivePage('kreatif')}
            className="inline-flex items-center gap-1 text-amber-400 text-sm font-bold"
          >
            Lihat Semua Foto <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* Main Menu Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-3">
              Menu <span className="text-slate-700">Utama</span>
            </h2>
            <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full mb-4" />
            <p className="text-gray-500">Pilih menu di bawah untuk memulai</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {menuCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.button
                  key={card.id}
                  variants={cardVariants}
                  whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActivePage(card.id)}
                  className={`${card.bg} group p-6 rounded-2xl border border-gray-200 hover:border-transparent transition-all duration-300 text-left relative overflow-hidden`}
                >
                  {/* Number badge */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-sm font-bold text-gray-400">
                    {card.num}
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <Icon className="text-white" size={24} />
                  </motion.div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>

                  <div className="mt-4 flex items-center gap-1 text-slate-700 text-sm font-semibold">
                    Buka <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Quick Access Layanan */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-3">
            Layanan <span className="text-amber-500">Gratis</span> untuk Member
          </h2>
          <p className="text-gray-500 mb-8">Nikmati layanan digital gratis khusus member Gumelar.ID</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => setActivePage('compress-pdf')}
              className="p-6 bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1 text-left group"
            >
              <div className="text-4xl mb-3">📄</div>
              <h3 className="font-bold text-gray-800 text-lg mb-1">Compress PDF</h3>
              <p className="text-sm text-gray-500">Kompres ukuran file PDF secara gratis dan mudah</p>
            </button>
            <button
              onClick={() => setActivePage('buat-cv')}
              className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1 text-left group"
            >
              <div className="text-4xl mb-3">📝</div>
              <h3 className="font-bold text-gray-800 text-lg mb-1">Buat CV Lamaran Kerja</h3>
              <p className="text-sm text-gray-500">Buat CV profesional untuk melamar pekerjaan</p>
            </button>
          </div>
        </div>
      </section>

      {/* Sruput Kopi / Donation Section */}
      <section className="bg-amber-400 py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
          <Coffee size={200} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-black mb-6 animate-bounce">
            <Gift size={16} className="text-amber-400" /> DUKUNGAN EKONOMI DIGITAL
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            Gratis <span className="bg-white px-3">Landing Page</span> & Web Untuk UMKM
          </h2>
          <p className="text-xl text-slate-800 mb-10 font-medium max-w-2xl mx-auto">
            GUMELAR.ID bantu buatkan profil digital usaha Anda tanpa biaya. Mari maju bersama sambil <span className="font-black italic">"Sruput Kopi"</span> bareng tim pengembang kami.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => window.open('https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20ingin%20dibuatkan%20Landing%20Page%20Gratis%20untuk%20usaha%20saya.', '_blank')}
              className="px-10 py-5 bg-slate-900 text-white font-black rounded-3xl text-xl shadow-2xl hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-3"
            >
              🚀 Buatkan Web Saya
            </button>
            <button 
              onClick={() => setActivePage('donasi')}
              className="px-10 py-5 bg-white text-slate-900 font-black rounded-3xl text-xl shadow-xl hover:bg-gray-50 transition-all active:scale-95 flex items-center gap-3"
            >
              ☕ Sruput Kopi (Donasi)
            </button>
          </div>
          <p className="mt-8 text-sm text-slate-700 font-bold opacity-60 italic">
            * Layanan ini diberikan gratis sebagai bentuk dukungan untuk kemajuan ekonomi kreatif desa.
          </p>
        </div>
      </section>

      {/* Tech Stack Marquee Section */}
      <section className="py-20 bg-white overflow-hidden border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-4">Industrial Standard Technology</p>
          <h2 className="text-3xl font-black text-slate-900">Teknologi di Balik <span className="text-blue-600">GUMELAR.ID</span></h2>
        </div>

        <div className="relative flex overflow-x-hidden">
          <motion.div 
            animate={{ x: [0, -1920] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="flex gap-12 items-center whitespace-nowrap"
          >
            {[
              { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
              { name: 'Laravel', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
              { name: 'Tailwind', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
              { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
              { name: 'Vite', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
              { name: 'PostgreSQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
              { name: 'Vercel', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
              { name: 'Framer', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg' },
            ].map((tech, i) => (
              <div key={i} className="flex items-center justify-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100 group hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 min-w-[160px]">
                <img src={tech.url} alt={tech.name} className="h-7 w-7 object-contain transition-all duration-500 group-hover:scale-110" />
                <span className="font-black text-slate-900 uppercase text-[10px] tracking-widest">{tech.name}</span>
              </div>
            ))}
            {/* Duplicate for infinite loop */}
            {[
              { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
              { name: 'Laravel', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
              { name: 'Tailwind', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
              { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
              { name: 'Vite', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
              { name: 'PostgreSQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
              { name: 'Vercel', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
              { name: 'Framer', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg' },
            ].map((tech, i) => (
              <div key={`dup-${i}`} className="flex items-center justify-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100 group hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 min-w-[160px]">
                <img src={tech.url} alt={tech.name} className="h-7 w-7 object-contain transition-all duration-500 group-hover:scale-110" />
                <span className="font-black text-slate-900 uppercase text-[10px] tracking-widest">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 items-center">
            <div className="text-center md:text-left">
              <div className="text-3xl font-black mb-2 tracking-tighter">
                GUMELAR<span className="text-amber-400">.ID</span>
              </div>
              <p className="text-slate-400 text-sm">Digitalisasi Desa, Sejahterakan Warga.</p>
            </div>
            <div className="flex justify-center gap-6">
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-amber-400 hover:text-slate-900 transition-all"><Share2 size={20} /></a>
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-amber-400 hover:text-slate-900 transition-all"><LinkIcon size={20} /></a>
            </div>
            <div className="text-center md:text-right">
              <button 
                onClick={() => setActivePage('tentang')}
                className="text-amber-400 font-bold hover:underline"
              >
                Tentang Kami
              </button>
            </div>
          </div>
          <div className="w-full h-px bg-white/10 mb-8" />
          <div className="text-center">
            <p className="text-slate-500 text-[10px] mb-2 uppercase tracking-widest font-bold">
              ⚠️ No Politik · No SARA · No Hoax
            </p>
            <p className="text-slate-600 text-[10px] font-medium">
              © 2025 GUMELAR.ID · Dikelola oleh LacosDev.com
            </p>
          </div>
        </div>
      </footer>
      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
          >
            <X size={24} />
          </button>
          <div 
            className="relative max-w-5xl w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.src} 
              alt={selectedImage.caption} 
              className="w-full h-full object-contain max-h-[85vh]"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 sm:p-8">
              <h3 className="text-white text-xl sm:text-2xl font-black drop-shadow-md">
                {selectedImage.caption}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
