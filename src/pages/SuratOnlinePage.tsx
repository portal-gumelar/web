import { useState } from 'react';
import { Send, FileSignature, ArrowLeft, AlertCircle } from 'lucide-react';
import { ActivePage } from '../types';

interface SuratOnlinePageProps {
  setActivePage: (page: ActivePage) => void;
}

export default function SuratOnlinePage({ setActivePage }: SuratOnlinePageProps) {
  const [form, setForm] = useState({
    nama: '',
    nik: '',
    alamat: '',
    jenisSurat: 'Surat Pengantar RT/RW',
    keperluan: '',
  });

  const adminWhatsApp = '6281234567890'; // Replace with real admin WA number

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Halo Admin Desa Gumelar,
Saya ingin mengajukan permohonan surat:

*Jenis Surat:* ${form.jenisSurat}
*Nama Lengkap:* ${form.nama}
*NIK:* ${form.nik}
*Alamat Lengkap:* ${form.alamat}
*Keperluan:* ${form.keperluan}

Mohon arahannya untuk proses selanjutnya. Terima kasih.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${adminWhatsApp}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setActivePage('layanan')}
          className="flex items-center gap-2 text-blue-600 font-semibold mb-6 hover:underline"
        >
          <ArrowLeft size={16} /> Kembali ke Layanan
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <FileSignature size={32} />
            </div>
            <h1 className="text-3xl font-black mb-2">E-Surat Online</h1>
            <p className="text-blue-100 text-sm max-w-md mx-auto">
              Layanan mandiri pengajuan surat keterangan desa. Cepat, mudah, dan langsung terhubung dengan Admin Desa via WhatsApp.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-blue-800">
                Data yang Anda kirimkan akan diteruskan ke WhatsApp Admin Desa. Pastikan Anda menggunakan nomor yang aktif agar mudah dihubungi kembali.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Jenis Surat Keterangan *</label>
                <select
                  value={form.jenisSurat}
                  onChange={e => setForm({ ...form, jenisSurat: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="Surat Pengantar RT/RW">Surat Pengantar RT/RW</option>
                  <option value="Surat Keterangan Domisili">Surat Keterangan Domisili</option>
                  <option value="Surat Keterangan Usaha (SKU)">Surat Keterangan Usaha (SKU)</option>
                  <option value="Surat Keterangan Tidak Mampu (SKTM)">Surat Keterangan Tidak Mampu (SKTM)</option>
                  <option value="Surat Keterangan Kematian">Surat Keterangan Kematian</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap Sesuai KTP *</label>
                <input
                  type="text"
                  required
                  value={form.nama}
                  onChange={e => setForm({ ...form, nama: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan nama lengkap..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">NIK (Nomor KTP) *</label>
                  <input
                    type="number"
                    required
                    value={form.nik}
                    onChange={e => setForm({ ...form, nik: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="16 digit NIK..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Alamat Domisili (RT/RW) *</label>
                  <input
                    type="text"
                    required
                    value={form.alamat}
                    onChange={e => setForm({ ...form, alamat: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contoh: RT 01 / RW 02..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Keperluan Surat *</label>
                <textarea
                  required
                  rows={3}
                  value={form.keperluan}
                  onChange={e => setForm({ ...form, keperluan: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Contoh: Untuk persyaratan pembuatan SKCK..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-md mt-4"
              >
                <Send size={18} />
                Kirim Permohonan via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
