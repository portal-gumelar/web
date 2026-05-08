import { useState } from 'react';
import { Users, CheckCircle, ChevronDown, ArrowLeft } from 'lucide-react';
import { subKategoriProduksi, subKategoriJasa, destinasiPJTKI } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

interface FormData {
  nama: string;
  alamat: string;
  telepon: string;
  email: string;
  kategori: 'produksi' | 'jasa' | 'pjtki' | '';
  subKategori: string;
  namaUsaha: string;
  deskripsi: string;
  linkUrl: string;
  destinasi: string;
  setuju: boolean;
}

const defaultForm: FormData = {
  nama: '',
  alamat: '',
  telepon: '',
  email: '',
  kategori: '',
  subKategori: '',
  namaUsaha: '',
  deskripsi: '',
  linkUrl: '',
  destinasi: '',
  setuju: false,
};

export default function DaftarMemberPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const update = (field: keyof FormData, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.nama.trim()) errs.nama = 'Nama wajib diisi';
    if (!form.alamat.trim()) errs.alamat = 'Alamat wajib diisi';
    if (!form.telepon.trim()) errs.telepon = 'Nomor telepon wajib diisi';
    if (!form.kategori) errs.kategori = 'Pilih kategori usaha';
    if (form.kategori && !form.subKategori) errs.subKategori = 'Pilih sub kategori';
    if (!form.setuju) errs.setuju = 'Anda harus menyetujui syarat & ketentuan';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  const selectClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 appearance-none";
  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";
  const errClass = "text-red-500 text-xs mt-1";

  const getSubKategori = () => {
    if (form.kategori === 'produksi') return subKategoriProduksi;
    if (form.kategori === 'jasa') return subKategoriJasa;
    return [];
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-500" size={48} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-3">Pendaftaran Berhasil!</h2>
          <p className="text-gray-600 mb-2">
            Selamat bergabung, <strong>{form.nama}</strong>!
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Data Anda telah diterima. Tim kami akan menghubungi Anda via telepon/WhatsApp untuk verifikasi akun member Gumelar.ID.
          </p>
          <div className="bg-green-50 rounded-2xl p-4 text-left mb-6 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle size={14} />
              <span>Profil member akan segera aktif</span>
            </div>
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle size={14} />
              <span>Akses layanan gratis (Compress PDF & Buat CV)</span>
            </div>
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle size={14} />
              <span>Usaha Anda akan tampil di direktori Gumelar.ID</span>
            </div>
          </div>
          <button
            onClick={() => { setForm(defaultForm); setSubmitted(false); }}
            className="px-8 py-3 bg-green-700 hover:bg-green-600 text-white font-bold rounded-xl transition-all"
          >
            Daftar Member Lain
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/layanan')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-8 group transition-all"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Kembali
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Users className="text-green-600" size={36} />
          </div>
          <h1 className="text-4xl font-black text-gray-800 mb-2">
            Daftar <span className="text-green-700">Member</span>
          </h1>
          <div className="w-16 h-1 bg-green-600 mx-auto rounded-full mb-4" />
          <p className="text-gray-500">Bergabunglah dengan komunitas Gumelar.ID dan nikmati berbagai manfaat</p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { emoji: '📋', text: 'Profil di Direktori' },
            { emoji: '📄', text: 'Compress PDF Gratis' },
            { emoji: '📝', text: 'Buat CV Gratis' },
          ].map(b => (
            <div key={b.text} className="bg-white rounded-xl p-3 text-center border border-gray-100 shadow-sm">
              <div className="text-2xl mb-1">{b.emoji}</div>
              <div className="text-xs font-semibold text-gray-600">{b.text}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Data Pribadi */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
              <span className="w-7 h-7 bg-green-600 text-white rounded-lg text-sm flex items-center justify-center font-bold">1</span>
              Data Pribadi
            </h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Nama Lengkap *</label>
                <input type="text" value={form.nama} onChange={e => update('nama', e.target.value)} className={inputClass} placeholder="Nama lengkap Anda" />
                {errors.nama && <p className={errClass}>{errors.nama}</p>}
              </div>
              <div>
                <label className={labelClass}>Alamat *</label>
                <textarea rows={2} value={form.alamat} onChange={e => update('alamat', e.target.value)} className={`${inputClass} resize-none`} placeholder="Nama desa, RT/RW, Dusun..." />
                {errors.alamat && <p className={errClass}>{errors.alamat}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>No. Telepon / WA *</label>
                  <input type="tel" value={form.telepon} onChange={e => update('telepon', e.target.value)} className={inputClass} placeholder="08xx-xxxx-xxxx" />
                  {errors.telepon && <p className={errClass}>{errors.telepon}</p>}
                </div>
                <div>
                  <label className={labelClass}>Email (opsional)</label>
                  <input type="email" value={form.email} onChange={e => update('email', e.target.value)} className={inputClass} placeholder="email@domain.com" />
                </div>
              </div>
            </div>
          </div>

          {/* Jenis Usaha */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
              <span className="w-7 h-7 bg-green-600 text-white rounded-lg text-sm flex items-center justify-center font-bold">2</span>
              Jenis Usaha / UMKM
            </h3>
            <div className="space-y-4">

              {/* Nama Usaha */}
              <div>
                <label className={labelClass}>Nama Usaha (opsional)</label>
                <input type="text" value={form.namaUsaha} onChange={e => update('namaUsaha', e.target.value)} className={inputClass} placeholder="Nama toko/usaha Anda" />
              </div>

              {/* Kategori */}
              <div>
                <label className={labelClass}>Kategori Usaha *</label>
                <div className="grid grid-cols-3 gap-3">
                  {([
                    { val: 'produksi', label: '🏭 Produksi', desc: 'Makanan, Minuman, Tekstil' },
                    { val: 'jasa', label: '🔧 Jasa', desc: 'Bengkel, Tukang, dll' },
                    { val: 'pjtki', label: '✈️ PJTKI', desc: 'Penyalur TKI LN' },
                  ] as const).map(k => (
                    <button
                      type="button"
                      key={k.val}
                      onClick={() => { update('kategori', k.val); update('subKategori', ''); }}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        form.kategori === k.val
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-bold text-sm">{k.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{k.desc}</div>
                    </button>
                  ))}
                </div>
                {errors.kategori && <p className={errClass}>{errors.kategori}</p>}
              </div>

              {/* Sub Kategori Produksi / Jasa */}
              {(form.kategori === 'produksi' || form.kategori === 'jasa') && (
                <div>
                  <label className={labelClass}>Sub Kategori *</label>
                  <div className="relative">
                    <select
                      value={form.subKategori}
                      onChange={e => update('subKategori', e.target.value)}
                      className={selectClass}
                    >
                      <option value="">-- Pilih Sub Kategori --</option>
                      {getSubKategori().map(s => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.subKategori && <p className={errClass}>{errors.subKategori}</p>}
                </div>
              )}

              {/* PJTKI */}
              {form.kategori === 'pjtki' && (
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Negara Tujuan *</label>
                    <div className="relative">
                      <select
                        value={form.subKategori}
                        onChange={e => update('subKategori', e.target.value)}
                        className={selectClass}
                      >
                        <option value="">-- Pilih Negara Tujuan --</option>
                        {destinasiPJTKI.map(d => (
                          <option key={d.value} value={d.value}>{d.label}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.subKategori && <p className={errClass}>{errors.subKategori}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Link Website / Landing Page (opsional)</label>
                    <input type="url" value={form.linkUrl} onChange={e => update('linkUrl', e.target.value)} className={inputClass} placeholder="https://website-pjtki.com" />
                  </div>
                </div>
              )}

              {/* Deskripsi */}
              <div>
                <label className={labelClass}>Deskripsi Usaha</label>
                <textarea
                  rows={3}
                  value={form.deskripsi}
                  onChange={e => update('deskripsi', e.target.value)}
                  className={`${inputClass} resize-none`}
                  placeholder="Ceritakan usaha/layanan Anda secara singkat..."
                />
              </div>
            </div>
          </div>

          {/* Disclaimer & Setuju */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
            <h3 className="font-bold text-red-700 mb-3 flex items-center gap-2">
              ⚠️ Syarat & Ketentuan Member
            </h3>
            <ul className="text-sm text-red-700 space-y-2 mb-4">
              <li>• Tidak memposting konten berbau <strong>POLITIK atau SARA</strong></li>
              <li>• Semua informasi yang diposting menjadi tanggung jawab pribadi penulis</li>
              <li>• Konten yang melanggar dapat dihapus tanpa pemberitahuan sebelumnya</li>
              <li>• Data yang diberikan harus benar dan dapat diverifikasi</li>
              <li>• Keanggotaan dapat dicabut jika melanggar ketentuan</li>
            </ul>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.setuju}
                onChange={e => update('setuju', e.target.checked)}
                className="mt-0.5 w-5 h-5 accent-red-600 flex-shrink-0"
              />
              <span className="text-sm text-red-700 font-semibold">
                Saya telah membaca dan menyetujui semua syarat & ketentuan di atas, serta berkomitmen untuk tidak memposting konten POLITIK dan SARA.
              </span>
            </label>
            {errors.setuju && <p className={errClass}>{errors.setuju}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-5 bg-green-700 hover:bg-green-600 text-white font-black text-xl rounded-2xl shadow-xl transition-all hover:scale-[1.02]"
          >
            🎉 Daftar Jadi Member Sekarang!
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          Pendaftaran gratis selamanya · Gumelar.ID
        </p>
      </div>
    </div>
  );
}
