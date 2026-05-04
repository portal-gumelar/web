import { useState } from 'react';
import { FileCheck, Download, Eye, ChevronDown, ChevronUp } from 'lucide-react';

interface CVData {
  nama: string;
  ttl: string;
  alamat: string;
  telepon: string;
  email: string;
  foto: string;
  ringkasan: string;
  pendidikan: { institusi: string; jurusan: string; tahun: string }[];
  pengalaman: { perusahaan: string; jabatan: string; periode: string; deskripsi: string }[];
  keahlian: string;
  bahasa: string;
  sertifikat: string;
  template: 'modern' | 'classic';
}

const defaultCV: CVData = {
  nama: '',
  ttl: '',
  alamat: '',
  telepon: '',
  email: '',
  foto: '',
  ringkasan: '',
  pendidikan: [{ institusi: '', jurusan: '', tahun: '' }],
  pengalaman: [{ perusahaan: '', jabatan: '', periode: '', deskripsi: '' }],
  keahlian: '',
  bahasa: '',
  sertifikat: '',
  template: 'modern',
};

export default function BuatCVPage() {
  const [cv, setCv] = useState<CVData>(defaultCV);
  const [preview, setPreview] = useState(false);
  const [openSection, setOpenSection] = useState<string>('data-diri');

  const updateField = (field: keyof CVData, val: string) => {
    setCv(prev => ({ ...prev, [field]: val }));
  };

  const Section = ({ id, title, emoji, children }: { id: string; title: string; emoji: string; children: React.ReactNode }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <button
        onClick={() => setOpenSection(openSection === id ? '' : id)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{emoji}</span>
          <span className="font-bold text-gray-800">{title}</span>
        </div>
        {openSection === id ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
      </button>
      {openSection === id && (
        <div className="px-5 pb-5 pt-2 border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50";
  const labelClass = "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide";

  if (preview) {
    return (
      <div className="min-h-screen bg-gray-100 pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setPreview(false)} className="flex items-center gap-2 text-blue-600 font-semibold hover:underline">
              ← Kembali Edit
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all"
            >
              <Download size={16} />
              Cetak / Simpan PDF
            </button>
          </div>

          {/* CV Preview */}
          <div className={`bg-white shadow-xl rounded-2xl overflow-hidden ${cv.template === 'modern' ? '' : ''}`}>
            {cv.template === 'modern' ? (
              <div>
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-8">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-blue-400 flex items-center justify-center text-white text-4xl font-black border-4 border-white/30 flex-shrink-0">
                      {cv.nama ? cv.nama.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div>
                      <h1 className="text-3xl font-black mb-1">{cv.nama || 'Nama Lengkap'}</h1>
                      <p className="text-blue-200 text-sm">{cv.alamat}</p>
                      <div className="flex gap-4 mt-2 text-sm text-blue-200">
                        {cv.telepon && <span>📞 {cv.telepon}</span>}
                        {cv.email && <span>✉️ {cv.email}</span>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  {cv.ringkasan && (
                    <div>
                      <h2 className="text-sm font-black uppercase tracking-widest text-blue-700 border-b-2 border-blue-200 pb-1 mb-3">Profil</h2>
                      <p className="text-gray-700 text-sm leading-relaxed">{cv.ringkasan}</p>
                    </div>
                  )}

                  {cv.pendidikan.some(p => p.institusi) && (
                    <div>
                      <h2 className="text-sm font-black uppercase tracking-widest text-blue-700 border-b-2 border-blue-200 pb-1 mb-3">Pendidikan</h2>
                      {cv.pendidikan.filter(p => p.institusi).map((p, i) => (
                        <div key={i} className="mb-2">
                          <div className="flex justify-between">
                            <span className="font-semibold text-gray-800">{p.institusi}</span>
                            <span className="text-gray-500 text-sm">{p.tahun}</span>
                          </div>
                          <span className="text-gray-600 text-sm">{p.jurusan}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {cv.pengalaman.some(p => p.perusahaan) && (
                    <div>
                      <h2 className="text-sm font-black uppercase tracking-widest text-blue-700 border-b-2 border-blue-200 pb-1 mb-3">Pengalaman Kerja</h2>
                      {cv.pengalaman.filter(p => p.perusahaan).map((p, i) => (
                        <div key={i} className="mb-3">
                          <div className="flex justify-between">
                            <span className="font-semibold text-gray-800">{p.jabatan}</span>
                            <span className="text-gray-500 text-sm">{p.periode}</span>
                          </div>
                          <span className="text-gray-600 text-sm">{p.perusahaan}</span>
                          {p.deskripsi && <p className="text-gray-500 text-xs mt-1">{p.deskripsi}</p>}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-6">
                    {cv.keahlian && (
                      <div>
                        <h2 className="text-sm font-black uppercase tracking-widest text-blue-700 border-b-2 border-blue-200 pb-1 mb-3">Keahlian</h2>
                        <div className="flex flex-wrap gap-1">
                          {cv.keahlian.split(',').map((s, i) => (
                            <span key={i} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{s.trim()}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {cv.bahasa && (
                      <div>
                        <h2 className="text-sm font-black uppercase tracking-widest text-blue-700 border-b-2 border-blue-200 pb-1 mb-3">Bahasa</h2>
                        <p className="text-gray-700 text-sm">{cv.bahasa}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8">
                <div className="text-center border-b-2 border-gray-200 pb-6 mb-6">
                  <h1 className="text-3xl font-black text-gray-800">{cv.nama || 'Nama Lengkap'}</h1>
                  <p className="text-gray-500 mt-1">{cv.alamat}</p>
                  <div className="flex justify-center gap-6 mt-2 text-sm text-gray-600">
                    {cv.telepon && <span>📞 {cv.telepon}</span>}
                    {cv.email && <span>✉️ {cv.email}</span>}
                  </div>
                </div>
                {/* Simple classic layout */}
                {cv.ringkasan && (
                  <div className="mb-4">
                    <h2 className="font-black text-gray-800 uppercase text-sm tracking-wider mb-2">Profil Singkat</h2>
                    <p className="text-gray-600 text-sm">{cv.ringkasan}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <FileCheck className="text-blue-500" size={36} />
          </div>
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            ✨ LAYANAN GRATIS MEMBER
          </div>
          <h1 className="text-4xl font-black text-gray-800 mb-2">Buat CV Lamaran</h1>
          <p className="text-gray-500">Buat CV profesional siap pakai dalam hitungan menit</p>
        </div>

        {/* Template Selector */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-4">
          <p className="text-sm font-bold text-gray-700 mb-3">Pilih Template</p>
          <div className="grid grid-cols-2 gap-3">
            {([
              { val: 'modern', label: 'Modern', desc: 'Colorful & Professional', color: 'border-blue-400 bg-blue-50' },
              { val: 'classic', label: 'Klasik', desc: 'Clean & Formal', color: 'border-gray-400 bg-gray-50' },
            ] as const).map(t => (
              <button
                key={t.val}
                onClick={() => updateField('template', t.val)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${cv.template === t.val ? t.color : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className="font-bold text-sm text-gray-800">{t.label}</div>
                <div className="text-xs text-gray-500">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Form Sections */}
        <div className="space-y-3">
          <Section id="data-diri" title="Data Diri" emoji="👤">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className={labelClass}>Nama Lengkap *</label>
                <input type="text" value={cv.nama} onChange={e => updateField('nama', e.target.value)} className={inputClass} placeholder="Nama lengkap sesuai KTP" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Tempat, Tanggal Lahir</label>
                  <input type="text" value={cv.ttl} onChange={e => updateField('ttl', e.target.value)} className={inputClass} placeholder="Gumelar, 01 Jan 1990" />
                </div>
                <div>
                  <label className={labelClass}>No. Telepon</label>
                  <input type="tel" value={cv.telepon} onChange={e => updateField('telepon', e.target.value)} className={inputClass} placeholder="08xx-xxxx-xxxx" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" value={cv.email} onChange={e => updateField('email', e.target.value)} className={inputClass} placeholder="email@example.com" />
              </div>
              <div>
                <label className={labelClass}>Alamat Lengkap</label>
                <textarea rows={2} value={cv.alamat} onChange={e => updateField('alamat', e.target.value)} className={`${inputClass} resize-none`} placeholder="Alamat lengkap domisili" />
              </div>
            </div>
          </Section>

          <Section id="profil" title="Profil / Ringkasan" emoji="📋">
            <div>
              <label className={labelClass}>Ringkasan Diri</label>
              <textarea
                rows={4}
                value={cv.ringkasan}
                onChange={e => updateField('ringkasan', e.target.value)}
                className={`${inputClass} resize-none`}
                placeholder="Deskripsikan diri Anda secara singkat, termasuk tujuan karir dan keunggulan Anda..."
              />
              <p className="text-xs text-gray-400 mt-1">Tips: Tulis 2-4 kalimat yang menonjolkan keahlian dan motivasi Anda.</p>
            </div>
          </Section>

          <Section id="pendidikan" title="Riwayat Pendidikan" emoji="🎓">
            <div className="space-y-4">
              {cv.pendidikan.map((p, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-xl space-y-3">
                  <div>
                    <label className={labelClass}>Nama Institusi</label>
                    <input type="text" value={p.institusi} onChange={e => {
                      const updated = [...cv.pendidikan];
                      updated[i] = { ...updated[i], institusi: e.target.value };
                      setCv(prev => ({ ...prev, pendidikan: updated }));
                    }} className={inputClass} placeholder="SD/SMP/SMA/SMK/Universitas" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Jurusan / Bidang Studi</label>
                      <input type="text" value={p.jurusan} onChange={e => {
                        const updated = [...cv.pendidikan];
                        updated[i] = { ...updated[i], jurusan: e.target.value };
                        setCv(prev => ({ ...prev, pendidikan: updated }));
                      }} className={inputClass} placeholder="Jurusan..." />
                    </div>
                    <div>
                      <label className={labelClass}>Tahun Lulus</label>
                      <input type="text" value={p.tahun} onChange={e => {
                        const updated = [...cv.pendidikan];
                        updated[i] = { ...updated[i], tahun: e.target.value };
                        setCv(prev => ({ ...prev, pendidikan: updated }));
                      }} className={inputClass} placeholder="2020" />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setCv(prev => ({ ...prev, pendidikan: [...prev.pendidikan, { institusi: '', jurusan: '', tahun: '' }] }))}
                className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl text-sm hover:border-blue-400 hover:text-blue-600 transition-all"
              >
                + Tambah Pendidikan
              </button>
            </div>
          </Section>

          <Section id="pengalaman" title="Pengalaman Kerja" emoji="💼">
            <div className="space-y-4">
              {cv.pengalaman.map((p, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-xl space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Nama Perusahaan</label>
                      <input type="text" value={p.perusahaan} onChange={e => {
                        const updated = [...cv.pengalaman];
                        updated[i] = { ...updated[i], perusahaan: e.target.value };
                        setCv(prev => ({ ...prev, pengalaman: updated }));
                      }} className={inputClass} placeholder="Nama perusahaan" />
                    </div>
                    <div>
                      <label className={labelClass}>Jabatan / Posisi</label>
                      <input type="text" value={p.jabatan} onChange={e => {
                        const updated = [...cv.pengalaman];
                        updated[i] = { ...updated[i], jabatan: e.target.value };
                        setCv(prev => ({ ...prev, pengalaman: updated }));
                      }} className={inputClass} placeholder="Posisi Anda" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Periode Kerja</label>
                    <input type="text" value={p.periode} onChange={e => {
                      const updated = [...cv.pengalaman];
                      updated[i] = { ...updated[i], periode: e.target.value };
                      setCv(prev => ({ ...prev, pengalaman: updated }));
                    }} className={inputClass} placeholder="Jan 2020 - Des 2022" />
                  </div>
                  <div>
                    <label className={labelClass}>Deskripsi Pekerjaan</label>
                    <textarea rows={2} value={p.deskripsi} onChange={e => {
                      const updated = [...cv.pengalaman];
                      updated[i] = { ...updated[i], deskripsi: e.target.value };
                      setCv(prev => ({ ...prev, pengalaman: updated }));
                    }} className={`${inputClass} resize-none`} placeholder="Tugas dan tanggung jawab utama..." />
                  </div>
                </div>
              ))}
              <button
                onClick={() => setCv(prev => ({ ...prev, pengalaman: [...prev.pengalaman, { perusahaan: '', jabatan: '', periode: '', deskripsi: '' }] }))}
                className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl text-sm hover:border-blue-400 hover:text-blue-600 transition-all"
              >
                + Tambah Pengalaman
              </button>
            </div>
          </Section>

          <Section id="keahlian" title="Keahlian & Lainnya" emoji="⚡">
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Keahlian (pisahkan dengan koma)</label>
                <input type="text" value={cv.keahlian} onChange={e => updateField('keahlian', e.target.value)} className={inputClass} placeholder="Microsoft Office, Komputer, Mengemudi, dll." />
              </div>
              <div>
                <label className={labelClass}>Kemampuan Bahasa</label>
                <input type="text" value={cv.bahasa} onChange={e => updateField('bahasa', e.target.value)} className={inputClass} placeholder="Bahasa Indonesia (Lancar), Jawa (Lancar), Inggris (Pasif)" />
              </div>
              <div>
                <label className={labelClass}>Sertifikat / Penghargaan</label>
                <textarea rows={2} value={cv.sertifikat} onChange={e => updateField('sertifikat', e.target.value)} className={`${inputClass} resize-none`} placeholder="Sertifikat pelatihan, penghargaan, dll." />
              </div>
            </div>
          </Section>
        </div>

        {/* Preview & Download Button */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setPreview(true)}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-lg rounded-xl shadow transition-all"
          >
            <Eye size={20} />
            Preview & Unduh CV
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Layanan gratis untuk member Gumelar.ID · Data Anda tidak disimpan
        </p>
      </div>
    </div>
  );
}
