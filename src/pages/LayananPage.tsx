import { Star, FileText, FileCheck, FileSignature, QrCode, Image, LayoutGrid, Coffee, Heart, Globe, ArrowRight, Calculator, Sparkles } from 'lucide-react';
import { ActivePage } from '../types';

interface LayananPageProps {
  setActivePage: (page: ActivePage) => void;
}

export default function LayananPage({ setActivePage }: LayananPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star size={14} />
            LAYANAN MEMBER
          </div>
          <h1 className="text-4xl font-black text-gray-800 mb-3">
            Layanan <span className="text-pink-600">Gratis</span> untuk Member
          </h1>
          <div className="w-16 h-1 bg-pink-500 mx-auto rounded-full mb-4" />
          <p className="text-gray-500">Nikmati berbagai layanan digital gratis, khusus untuk member Gumelar.ID</p>
        </div>

        {/* Member Badge Info */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-[2rem] p-8 mb-12 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="text-7xl bg-white/10 w-24 h-24 rounded-3xl flex items-center justify-center backdrop-blur-sm">🎫</div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-black mb-2">Khusus Member Gumelar.ID</h3>
            <p className="text-slate-400 text-sm max-w-md">Daftar sebagai member untuk menikmati semua layanan gratis ini. Semua alat dijalankan di browser Anda sendiri (Aman & Privat).</p>
          </div>
          <button
            onClick={() => setActivePage('daftar-member')}
            className="px-8 py-4 bg-pink-600 text-white font-black rounded-2xl text-sm hover:bg-pink-500 transition-all shadow-xl whitespace-nowrap"
          >
            Daftar Member Sekarang →
          </button>
        </div>

        {/* Layanan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* E-Surat Online */}
          <button
            onClick={() => setActivePage('surat-online')}
            className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 text-left hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileSignature className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-black text-gray-800 mb-2 group-hover:text-green-600 transition-colors">E-Surat Online</h3>
            <p className="text-gray-500 text-xs leading-relaxed mb-6">
              Ajukan surat Pengantar, Domisili, SKU, SKTM dengan mudah dan langsung terhubung ke WhatsApp Admin GUMELAR.ID.
            </p>
            <div className="mt-auto flex items-center gap-2 text-green-600 font-bold text-xs uppercase tracking-widest">
              Gunakan Sekarang → 
            </div>
          </button>

          {/* QR Code Gen */}
          <button
            onClick={() => setActivePage('qr-code')}
            className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 text-left hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <QrCode className="text-amber-600" size={24} />
            </div>
            <h3 className="text-xl font-black text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">QR Code Generator</h3>
            <p className="text-gray-500 text-xs leading-relaxed mb-6">
              Buat kode QR untuk WhatsApp, Link Shopee, Toko Online, atau Lokasi UMKM Anda secara instan.
            </p>
            <div className="mt-auto flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-widest">
              Gunakan Sekarang → 
            </div>
          </button>

          {/* Image Optimizer */}
          <button
            onClick={() => setActivePage('image-optimizer')}
            className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 text-left hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Image className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-xl font-black text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">Image Optimizer</h3>
            <p className="text-gray-500 text-xs leading-relaxed mb-6">
              Kecilkan ukuran foto jualan Anda agar loading web cepat dan hemat kuota pelanggan saat dikirim via WA.
            </p>
            <div className="mt-auto flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest">
              Gunakan Sekarang → 
            </div>
          </button>

          {/* Compress PDF */}
          <button
            onClick={() => setActivePage('compress-pdf')}
            className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 text-left hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileText className="text-red-500" size={24} />
            </div>
            <h3 className="text-xl font-black text-gray-800 mb-2 group-hover:text-red-600 transition-colors">Compress PDF</h3>
            <p className="text-gray-500 text-xs leading-relaxed mb-6">
              Kompres ukuran file PDF lamaran kerja atau laporan agar mudah dikirim via email dan tidak melebihi batas.
            </p>
            <div className="mt-auto flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-widest">
              Gunakan Sekarang → 
            </div>
          </button>

          {/* Buat CV */}
          <button
            onClick={() => setActivePage('buat-cv')}
            className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 text-left hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileCheck className="text-blue-500" size={24} />
            </div>
            <h3 className="text-xl font-black text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">Buat CV Lamaran</h3>
            <p className="text-gray-500 text-xs leading-relaxed mb-6">
              Buat Curriculum Vitae profesional secara instan. Isi data diri, pilih template, dan unduh siap cetak.
            </p>
            <div className="mt-auto flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
              Gunakan Sekarang → 
            </div>
          </button>

          {/* GRATIS Landing Page */}
          <div
            className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-[2rem] shadow-xl p-8 text-left hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden flex flex-col"
          >
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-12 transition-transform">
              <LayoutGrid className="text-amber-600" size={24} />
            </div>
            <div className="bg-slate-900 text-amber-400 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-tighter w-fit mb-3">
              GRATIS / FREE
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Web & Landing Page</h3>
            <p className="text-slate-800 text-xs leading-relaxed mb-6 font-medium">
              Khusus UMKM Gumelar! Kami bantu buatkan Landing Page / Web sederhana untuk jualan Anda secara Gratis.
            </p>
            <button 
              onClick={() => window.open('https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20ingin%20dibuatkan%20Landing%20Page%20Gratis%20untuk%20usaha%20saya.', '_blank')}
              className="mt-auto flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all"
            >
              Ajukan Sekarang → 
            </button>
          </div>

          {/* Portfolio Gallery */}
          <button
            onClick={() => setActivePage('portfolio')}
            className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 text-left hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe className="text-amber-600" size={24} />
            </div>
            <h3 className="text-xl font-black text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">Galeri Web UMKM</h3>
            <p className="text-gray-500 text-xs leading-relaxed mb-6">
              Lihat contoh website dan landing page profesional yang bisa didapatkan secara gratis khusus member.
            </p>
            <div className="mt-auto flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-widest">
              Lihat Galeri <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Kasir Sederhana */}
          <button
            onClick={() => setActivePage('kasir')}
            className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 text-left hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Calculator className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-black text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">Kasir Gumelar</h3>
            <p className="text-gray-500 text-xs leading-relaxed mb-6">
              Aplikasi kasir (POS) sederhana untuk mencatat penjualan, hitung kembalian, dan cetak struk untuk UMKM.
            </p>
            <div className="mt-auto flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
              Gunakan Kasir <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Member Tools Hub */}
          <button
            onClick={() => setActivePage('member-tools')}
            className="bg-slate-900 rounded-[2rem] shadow-xl p-8 text-left hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[50px]" />
            <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="text-slate-900" size={24} />
            </div>
            <h3 className="text-xl font-black text-white mb-2 group-hover:text-amber-400 transition-colors">Member Tools Hub</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Akses kalkulator profit, generator caption AI, kartu nama digital, dan papan info warga dalam satu tempat.
            </p>
            <div className="mt-auto flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-widest">
              Buka Hub <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

        </div>

        {/* Donation/Sruput Kopi Banner in Layanan */}
        <div className="mt-12 bg-amber-50 border-2 border-amber-200 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="w-20 h-20 bg-amber-400 rounded-3xl flex items-center justify-center shadow-lg rotate-3">
            <Coffee size={40} className="text-slate-900" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-black text-slate-900 mb-1 flex items-center justify-center md:justify-start gap-2">
              Sruput Kopi Bareng Dev <Heart size={20} className="text-red-500 fill-red-500" />
            </h3>
            <p className="text-slate-600 text-sm font-medium">Layanan ini gratis, namun dukungan Anda lewat "Sruput Kopi" sangat membantu kami terus berinovasi.</p>
          </div>
          <button 
            onClick={() => setActivePage('donasi')}
            className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl text-xs hover:bg-slate-800 transition-all shadow-xl whitespace-nowrap"
          >
            ☕ Sruput Kopi (Donasi)
          </button>
        </div>

        {/* Coming Soon */}
        <div className="mt-12 bg-gray-100 rounded-3xl p-10 text-center border-2 border-dashed border-gray-300">
          <div className="text-5xl mb-4">🚀</div>
          <h3 className="text-xl font-black text-gray-800 mb-2">Layanan Lainnya Segera Hadir</h3>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">Kami terus mengembangkan alat digital baru untuk memajukan ekonomi kreatif warga Gumelar.</p>
          <div className="flex justify-center gap-3 mt-6 flex-wrap">
            {['Kartu Nama Digital', 'Cek Ongkir Lokal', 'Katalog WA', 'Alat Desain Banner'].map(s => (
              <span key={s} className="px-4 py-2 bg-white border border-gray-200 text-gray-500 text-xs font-bold rounded-full shadow-sm">
                🔒 {s}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
