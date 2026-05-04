import { Coffee, Users, Newspaper, Palette, Briefcase, Star, ChevronRight, Shield, Zap } from 'lucide-react';
import { ActivePage } from '../types';

interface HomePageProps {
  setActivePage: (page: ActivePage) => void;
}

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

export default function HomePage({ setActivePage }: HomePageProps) {
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
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 via-green-800/70 to-green-950/90" />

        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 px-5 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            <Shield size={14} />
            PORTAL KOMUNITAS RESMI GUMELAR
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight drop-shadow-2xl">
            GUMELAR<span className="text-yellow-400">.ID</span>
          </h1>

          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6 rounded-full" />

          <p className="text-xl md:text-2xl text-green-100 font-medium mb-3">
            Ruang Kreatif Masyarakat Gumelar
          </p>
          <p className="text-green-300 text-lg mb-10 max-w-2xl mx-auto">
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
              className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-green-900 font-black rounded-xl shadow-2xl transition-all duration-200 hover:scale-105 text-lg"
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
          <div className="mt-16 flex flex-col items-center gap-2 text-green-300 animate-bounce">
            <span className="text-xs">Scroll untuk melihat menu</span>
            <ChevronRight size={20} className="rotate-90" />
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="bg-gradient-to-b from-green-950 to-green-900 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Zap size={14} />
            SELAMAT DATANG
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Selamat Datang di Ruang Kreatif<br />
            <span className="text-yellow-400">Masyarakat Gumelar!</span>
          </h2>
          <p className="text-green-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Portal Gumelar hadir sebagai wadah digital bagi seluruh masyarakat Gumelar dan sekitarnya
            untuk berbagi informasi, menampilkan karya, dan mengembangkan usaha lokal bersama-sama.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-black text-yellow-400">500+</div>
              <div className="text-green-300 text-sm mt-1">Member Aktif</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-black text-yellow-400">120+</div>
              <div className="text-green-300 text-sm mt-1">UMKM Terdaftar</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-black text-yellow-400">50+</div>
              <div className="text-green-300 text-sm mt-1">Karya Dipublish</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Menu Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-3">
              Menu <span className="text-green-700">Utama</span>
            </h2>
            <div className="w-16 h-1 bg-green-600 mx-auto rounded-full mb-4" />
            <p className="text-gray-500">Pilih menu di bawah untuk memulai</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.id}
                  onClick={() => setActivePage(card.id)}
                  className={`${card.bg} group p-6 rounded-2xl border border-gray-200 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left relative overflow-hidden`}
                >
                  {/* Number badge */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-sm font-bold text-gray-400">
                    {card.num}
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white" size={24} />
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>

                  <div className="mt-4 flex items-center gap-1 text-green-700 text-sm font-semibold">
                    Buka <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Access Layanan */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-3">
            Layanan <span className="text-green-700">Gratis</span> untuk Member
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

      {/* Footer */}
      <footer className="bg-green-900 text-white py-10 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-3xl font-black mb-2">
            GUMELAR<span className="text-yellow-400">.ID</span>
          </div>
          <p className="text-green-300 text-sm mb-4">Ruang Kreatif Masyarakat Gumelar dan Sekitarnya</p>
          <div className="w-16 h-0.5 bg-green-600 mx-auto mb-4" />
          <p className="text-green-400 text-xs">
            ⚠️ Disclaimer: No Politik · No SARA · Semua informasi yang disampaikan menjadi tanggung jawab penulis
          </p>
          <p className="text-green-500 text-xs mt-2">© 2025 Gumelar.ID · Sarilane</p>
        </div>
      </footer>
    </div>
  );
}
