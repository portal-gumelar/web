import { Star, FileText, FileCheck, FileSignature } from 'lucide-react';
import { ActivePage } from '../types';

interface LayananPageProps {
  setActivePage: (page: ActivePage) => void;
}

export default function LayananPage({ setActivePage }: LayananPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">

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
        <div className="bg-gradient-to-r from-pink-600 to-rose-700 text-white rounded-2xl p-6 mb-8 flex items-center gap-6">
          <div className="text-6xl">🎫</div>
          <div>
            <h3 className="text-xl font-black mb-1">Khusus Member Gumelar.ID</h3>
            <p className="text-pink-200 text-sm">Daftar sebagai member untuk menikmati semua layanan gratis ini. Mudah, cepat, dan tanpa biaya!</p>
            <button
              onClick={() => setActivePage('daftar-member')}
              className="mt-3 px-5 py-2 bg-white text-pink-700 font-bold rounded-xl text-sm hover:bg-pink-50 transition-all"
            >
              Daftar Member Sekarang →
            </button>
          </div>
        </div>

        {/* Layanan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* E-Surat Online */}
          <button
            onClick={() => setActivePage('surat-online')}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-left hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group md:col-span-2 lg:col-span-1"
          >
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileSignature className="text-green-600" size={28} />
            </div>
            <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold mb-3">
              ✨ BARU
            </div>
            <h3 className="text-2xl font-black text-gray-800 mb-2">E-Surat / Administrasi</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Layanan mandiri permohonan surat keterangan desa. Ajukan surat Pengantar, Domisili, SKU, SKTM dengan mudah dan langsung terhubung ke WhatsApp Admin.
            </p>
            <div className="space-y-2">
              {['Proses cepat', 'Langsung via WhatsApp', 'Tersedia berbagai jenis surat', 'Tanpa antri di balai desa'].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-500">✓</span> {f}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 text-green-600 font-bold text-sm">
              Buat Surat Sekarang → 
            </div>
          </button>

          {/* Compress PDF */}
          <button
            onClick={() => setActivePage('compress-pdf')}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-left hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
          >
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="text-red-500" size={28} />
            </div>
            <div className="inline-flex items-center gap-1 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-semibold mb-3">
              ✨ GRATIS
            </div>
            <h3 className="text-2xl font-black text-gray-800 mb-2">Compress PDF</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Kompres ukuran file PDF dengan mudah dan cepat. Ideal untuk dokumen lamaran kerja,
              laporan, atau dokumen penting lainnya agar mudah dikirim via email / WhatsApp.
            </p>
            <div className="space-y-2">
              {['Kompres hingga 80% lebih kecil', 'Kualitas terjaga', 'Aman & privat', 'Tanpa install aplikasi'].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-500">✓</span> {f}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 text-red-600 font-bold text-sm">
              Gunakan Layanan → 
            </div>
          </button>

          {/* Buat CV */}
          <button
            onClick={() => setActivePage('buat-cv')}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-left hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileCheck className="text-blue-500" size={28} />
            </div>
            <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-semibold mb-3">
              ✨ GRATIS
            </div>
            <h3 className="text-2xl font-black text-gray-800 mb-2">Buat CV Lamaran</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Buat Curriculum Vitae (CV) profesional untuk melamar pekerjaan. Pilih template,
              isi data, dan unduh CV siap pakai. Cocok untuk melamar kerja lokal maupun ke luar negeri.
            </p>
            <div className="space-y-2">
              {['Template profesional tersedia', 'Mudah diisi dan diedit', 'Download format PDF/Word', 'Panduan tips menulis CV'].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-500">✓</span> {f}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 text-blue-600 font-bold text-sm">
              Gunakan Layanan → 
            </div>
          </button>

        </div>

        {/* Coming Soon */}
        <div className="mt-8 bg-gray-100 rounded-2xl p-6 text-center border-2 border-dashed border-gray-300">
          <div className="text-4xl mb-3">🚀</div>
          <h3 className="text-lg font-bold text-gray-700 mb-2">Layanan Lainnya Segera Hadir</h3>
          <p className="text-gray-500 text-sm">Kami terus mengembangkan layanan baru untuk member Gumelar.ID. Stay tuned!</p>
          <div className="flex justify-center gap-3 mt-4 flex-wrap">
            {['Desain Undangan', 'Cetak Online', 'Konsultasi Usaha', 'E-Sertifikat'].map(s => (
              <span key={s} className="px-3 py-1 bg-white border border-gray-300 text-gray-500 text-xs rounded-full">
                🔒 {s}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
