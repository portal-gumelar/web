import { useState } from 'react';
import { Globe, ExternalLink, Monitor, Smartphone, Tablet, CheckCircle2, ArrowLeft, ArrowRight, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface PortfolioItem {
  id: string;
  title: string;
  category: 'UMKM' | 'Jasa' | 'PJTKI' | 'Personal';
  image: string;
  description: string;
  features: string[];
  link: string;
}

const portfolioData: PortfolioItem[] = [
  {
    id: '1',
    title: 'Landing Page Toko Kelontong Berkah',
    category: 'UMKM',
    image: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&q=80&w=800',
    description: 'Website katalog produk untuk toko kelontong modern dengan fitur integrasi WhatsApp order.',
    features: ['Katalog Produk', 'Tombol WA Otomatis', 'Maps Lokasi'],
    link: '#'
  },
  {
    id: '2',
    title: 'Web Profil Jasa Bengkel Maju',
    category: 'Jasa',
    image: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&q=80&w=800',
    description: 'Halaman profil bengkel untuk menampilkan daftar layanan servis dan booking jadwal online.',
    features: ['List Harga Jasa', 'Booking Jadwal', 'Galeri Pengerjaan'],
    link: '#'
  },
  {
    id: '3',
    title: 'Portal Penyalur Kerja (PJTKI) Amanah',
    category: 'PJTKI',
    image: 'https://images.unsplash.com/photo-1454165833767-131435bb4496?auto=format&fit=crop&q=80&w=800',
    description: 'Landing page profesional untuk agensi penyalur tenaga kerja dengan formulir pendaftaran digital.',
    features: ['Informasi Negara', 'Form Pendaftaran', 'Testimoni'],
    link: '#'
  },
  {
    id: '4',
    title: 'Web Portofolio Fotografi Gumelar',
    category: 'Personal',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=800',
    description: 'Website galeri foto estetik untuk menampilkan karya-karya fotografi terbaik warga lokal.',
    features: ['Masonry Gallery', 'Lightbox View', 'Contact Me'],
    link: '#'
  },
  {
    id: '5',
    title: 'Landing Page Kerajinan Bambu Lestari',
    category: 'UMKM',
    image: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=800',
    description: 'Website khusus untuk memasarkan produk kerajinan tangan lokal ke kancah nasional.',
    features: ['Showcase Produk', 'Cerita Brand', 'Order via WA'],
    link: '#'
  }
];

export default function PortfolioWebPage() {
  const navigate = useNavigate();
  const [selectedKategori, setSelectedKategori] = useState<string>('Semua');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  
  // Form State
  const [formData, setFormData] = useState({
    usaha: '',
    jenis: 'Landing Page UMKM',
    deskripsi: '',
    warna: '',
    wa: ''
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Admin GUMELAR.ID,%0A%0ASaya ingin mengajukan konsep website:%0A%0A*Nama Usaha:* ${formData.usaha}%0A*Jenis Web:* ${formData.jenis}%0A*Deskripsi:* ${formData.deskripsi}%0A*Warna:* ${formData.warna}%0A*WhatsApp:* ${formData.wa}%0A%0AMohon bantuannya untuk diproses. Terima kasih!`;
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  const categories = ['Semua', 'UMKM', 'Jasa', 'PJTKI', 'Personal'];
  const filteredData = selectedKategori === 'Semua' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === selectedKategori);

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/layanan')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-10 group transition-all"
        >
          <div className="p-2 bg-slate-100 rounded-xl group-hover:bg-amber-100 group-hover:text-amber-700 transition-all">
            <ArrowLeft size={20} />
          </div>
          Kembali ke Layanan
        </motion.button>

        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-bold mb-6"
          >
            <Globe size={16} /> SHOWCASE DIGITAL GUMELAR
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Karya Web & <span className="text-amber-500 underline decoration-wavy decoration-slate-200">Landing Page</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Koleksi website profesional yang telah kami bangun untuk memajukan ekonomi digital komunitas Gumelar. 
            <span className="font-bold text-slate-900"> Khusus Member, Anda bisa mendapatkan ini GRATIS!</span>
          </p>
        </div>

        {/* Filters & View Mode */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-slate-50 p-4 rounded-3xl border border-slate-100">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedKategori(cat)}
                className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                  selectedKategori === cat 
                    ? 'bg-slate-900 text-white shadow-xl scale-105' 
                    : 'bg-white text-slate-500 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
            <button 
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'desktop' ? 'bg-amber-100 text-amber-700' : 'text-slate-400'}`}
            >
              <Monitor size={20} />
            </button>
            <button 
              onClick={() => setViewMode('mobile')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'mobile' ? 'bg-amber-100 text-amber-700' : 'text-slate-400'}`}
            >
              <Smartphone size={20} />
            </button>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredData.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative"
              >
                {/* Mockup Frame */}
                <div className={`relative transition-all duration-500 ${viewMode === 'mobile' ? 'max-w-[300px] mx-auto' : 'w-full'}`}>
                  <div className={`bg-slate-900 rounded-[2rem] p-3 shadow-2xl transition-all duration-500 ${viewMode === 'mobile' ? 'aspect-[9/18.5]' : 'aspect-video'}`}>
                    {/* Top Bar for Desktop */}
                    {viewMode === 'desktop' && (
                      <div className="flex items-center gap-1.5 mb-2 px-2">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <div className="ml-2 h-4 w-32 bg-slate-800 rounded-full" />
                      </div>
                    )}
                    {/* Content */}
                    <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative group-hover:shadow-inner transition-all">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="bg-white text-slate-900 p-4 rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          <ExternalLink size={24} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Card */}
                <div className="mt-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-lg group-hover:shadow-2xl transition-all group-hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-slate-100 text-slate-500 rounded-full">
                      {item.category} Project
                    </span>
                    <div className="flex gap-1">
                      <Monitor size={14} className="text-slate-300" />
                      <Tablet size={14} className="text-slate-300" />
                      <Smartphone size={14} className="text-slate-300" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.features.map(f => (
                      <span key={f} className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                        <CheckCircle2 size={12} className="text-green-500" /> {f}
                      </span>
                    ))}
                  </div>

                  <button className="w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold rounded-2xl border border-slate-200 transition-all flex items-center justify-center gap-2 group/btn">
                    Lihat Demo <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Request Form Section */}
        <section className="mt-32">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden border border-slate-800">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -ml-48 -mb-48" />

            <div className="relative z-10">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-900 px-4 py-1.5 rounded-full text-xs font-black mb-6">
                  📝 FORMULIR PENGAJUAN
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ajukan Konsep <span className="text-amber-400">Web Impian</span> Anda</h2>
                <p className="text-slate-400 text-lg">
                  Jelaskan kebutuhan usaha Anda, dan tim kreatif kami akan membantu mewujudkannya secara profesional.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Benefits/Guide */}
                <div className="space-y-8">
                  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                    <h4 className="text-amber-400 font-bold mb-4 flex items-center gap-2">
                      <CheckCircle2 size={18} /> Kenapa Mengisi Form Ini?
                    </h4>
                    <ul className="space-y-3 text-slate-300 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-1">•</span> 
                        <span>Membantu kami memahami visi dan tujuan usaha Anda.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-1">•</span> 
                        <span>Menentukan gaya desain yang paling cocok untuk target pasar Anda.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-1">•</span> 
                        <span>Mempercepat proses pengerjaan (Estimasi 3-7 hari kerja).</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-amber-400/5 rounded-2xl border border-amber-400/20">
                    <p className="text-amber-400 text-sm italic font-medium leading-relaxed">
                      "Kami percaya setiap usaha di Gumelar punya cerita unik. Mari kita buatkan 'rumah digital' yang nyaman bagi pelanggan Anda."
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center font-black text-slate-900">G</div>
                      <div>
                        <div className="text-white text-xs font-bold">Admin GUMELAR.ID</div>
                        <div className="text-slate-500 text-[10px]">Creative & Dev Team</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* The Form with Login Check */}
                <div className="relative">
                  {!localStorage.getItem('currentUser') && (
                    <div className="absolute inset-0 z-20 backdrop-blur-md bg-slate-900/60 rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center border border-white/10">
                      <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mb-6 shadow-2xl animate-bounce">
                        <Lock size={32} className="text-slate-900" />
                      </div>
                      <h4 className="text-white text-2xl font-black mb-4">Akses Khusus Member</h4>
                      <p className="text-slate-300 mb-8 max-w-xs">
                        Silakan masuk ke akun Member Anda untuk dapat mengisi formulir pengajuan konsep web.
                      </p>
                      <button 
                        onClick={() => navigate('/login')}
                        className="px-8 py-4 bg-amber-400 text-slate-900 font-black rounded-2xl hover:scale-105 transition-all shadow-xl"
                      >
                        Masuk Sekarang
                      </button>
                    </div>
                  )}
                  
                  <form onSubmit={handleFormSubmit} className={`space-y-5 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl transition-all ${!localStorage.getItem('currentUser') ? 'opacity-20 blur-sm pointer-events-none' : ''}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Nama Usaha / Brand *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.usaha}
                        onChange={(e) => setFormData({ ...formData, usaha: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                        placeholder="Contoh: Keripik Singkong Barokah"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Jenis Website *</label>
                      <select 
                        value={formData.jenis}
                        onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                      >
                        <option>Landing Page UMKM</option>
                        <option>Web Profil Jasa</option>
                        <option>Katalog Produk Online</option>
                        <option>Profil PJTKI / Lembaga</option>
                        <option>Personal Portofolio</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Konsep & Deskripsi Singkat *</label>
                    <textarea 
                      required
                      rows={4}
                      value={formData.deskripsi}
                      onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all resize-none"
                      placeholder="Jelaskan konsep apa yang Anda inginkan (misal: nuansa alam, banyak foto produk, fokus ke tombol WA, dll)"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Referensi Warna Utama</label>
                      <input 
                        type="text" 
                        value={formData.warna}
                        onChange={(e) => setFormData({ ...formData, warna: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                        placeholder="Contoh: Hijau Daun & Putih"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Nomor WhatsApp *</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.wa}
                        onChange={(e) => setFormData({ ...formData, wa: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                        placeholder="0812xxxxxx"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black text-lg rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
                  >
                    🚀 Kirim Pengajuan Konsep
                  </button>
                  <p className="text-[10px] text-center text-slate-400 font-medium italic">
                    * Tim kami akan menghubungi Anda via WhatsApp setelah data divalidasi.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* CTA Section (Original) */}

      </div>
    </div>
  );
}
