import { useState } from 'react';
import { Newspaper, Eye, Clock, Plus, AlertTriangle, ChevronRight, Calendar, Image, Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockBerita } from '../data/mockData';
import { BeritaItem } from '../types';

const kategoriWarna: Record<string, string> = {
  Pertanian: 'bg-green-100 text-green-700',
  Infrastruktur: 'bg-orange-100 text-orange-700',
  Budaya: 'bg-purple-100 text-purple-700',
  Ekonomi: 'bg-blue-100 text-blue-700',
};

// Helper: extract YouTube embed ID from URL
function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export default function InformasiPage() {
  const [beritaList, setBeritaList] = useState<BeritaItem[]>(mockBerita);
  const [selectedBerita, setSelectedBerita] = useState<BeritaItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    judul: '',
    konten: '',
    penulis: '',
    kategori: 'Umum',
    youtubeUrl: '',
  });
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [fotoFile, setFotoFile] = useState<File | null>(null);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setFotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ytId = form.youtubeUrl ? getYouTubeId(form.youtubeUrl) : undefined;
    const newBerita: BeritaItem = {
      id: Date.now().toString(),
      judul: form.judul,
      konten: form.konten,
      penulis: form.penulis,
      kategori: form.kategori,
      tanggal: new Date().toISOString().split('T')[0],
      gambar: fotoPreview || undefined,
      youtubeUrl: ytId ? `https://www.youtube.com/embed/${ytId}` : undefined,
      views: 0,
    };
    setBeritaList([newBerita, ...beritaList]);
    setForm({ judul: '', konten: '', penulis: '', kategori: 'Umum', youtubeUrl: '' });
    setFotoPreview(null);
    setFotoFile(null);
    setShowForm(false);
  };

  // Detail view
  if (selectedBerita) {
    const ytId = selectedBerita.youtubeUrl
      ? getYouTubeId(selectedBerita.youtubeUrl) || selectedBerita.youtubeUrl.split('/').pop()
      : null;

    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setSelectedBerita(null)}
            className="flex items-center gap-2 text-slate-700 font-semibold mb-6 hover:underline"
          >
            ← Kembali ke daftar berita
          </button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm p-6 sm:p-8"
          >
            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${kategoriWarna[selectedBerita.kategori] || 'bg-gray-100 text-gray-600'}`}>
              {selectedBerita.kategori}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-800 mt-4 mb-3">{selectedBerita.judul}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6 border-b pb-6">
              <span>✍️ {selectedBerita.penulis}</span>
              <span>📅 {selectedBerita.tanggal}</span>
              <span className="flex items-center gap-1"><Eye size={14} /> {selectedBerita.views} views</span>
            </div>

            {/* Foto */}
            {selectedBerita.gambar && (
              <div className="mb-6 rounded-2xl overflow-hidden">
                <img
                  src={selectedBerita.gambar}
                  alt={selectedBerita.judul}
                  className="w-full max-h-80 object-cover"
                />
              </div>
            )}

            {/* YouTube embed */}
            {selectedBerita.youtubeUrl && (
              <div className="mb-6 rounded-2xl overflow-hidden bg-black aspect-video">
                <iframe
                  className="w-full h-full"
                  src={selectedBerita.youtubeUrl}
                  title="Video YouTube"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            <div className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap">{selectedBerita.konten}</div>
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-700 flex items-start gap-2">
              <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
              <span>Informasi ini menjadi tanggung jawab penuh penulis: <strong>{selectedBerita.penulis}</strong></span>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Newspaper size={14} />
            INFORMASI SEPUTAR GUMELAR
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-800 mb-3">
            Berita & <span className="text-blue-700">Informasi</span>
          </h1>
          <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full mb-4" />
          <p className="text-gray-500">Informasi terkini dari dan untuk masyarakat Gumelar</p>
        </motion.div>

        {/* Warning */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start gap-3">
          <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-amber-700">
            <strong>⚠️ Peringatan:</strong> Semua informasi yang disampaikan menjadi tanggung jawab penuh penulis.
            Platform ini <strong>TIDAK MENERIMA</strong> konten berbau politik dan SARA.
          </p>
        </div>

        {/* Post Button */}
        <div className="flex justify-end mb-6">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl shadow transition-all"
          >
            {showForm ? <X size={16} /> : <Plus size={16} />}
            {showForm ? 'Tutup Form' : 'Posting Berita'}
          </motion.button>
        </div>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8 overflow-hidden"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">📝 Tambah Informasi / Berita</h3>
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-xs text-red-700">
                <strong>⚠️ DISCLAIMER:</strong> No Politik · No SARA · Informasi yang Anda posting menjadi tanggung jawab pribadi Anda.
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Judul */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Judul Berita *</label>
                  <input
                    type="text"
                    required
                    value={form.judul}
                    onChange={e => setForm({ ...form, judul: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="Masukkan judul berita..."
                  />
                </div>

                {/* Penulis & Kategori */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Penulis *</label>
                    <input
                      type="text"
                      required
                      value={form.penulis}
                      onChange={e => setForm({ ...form, penulis: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                      placeholder="Nama Anda..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
                    <select
                      value={form.kategori}
                      onChange={e => setForm({ ...form, kategori: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      {['Umum', 'Pertanian', 'Ekonomi', 'Budaya', 'Infrastruktur', 'Pendidikan', 'Kesehatan'].map(k => (
                        <option key={k} value={k}>{k}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Isi Berita */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Isi Berita *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.konten}
                    onChange={e => setForm({ ...form, konten: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                    placeholder="Tulis informasi / berita Anda di sini..."
                  />
                </div>

                {/* Upload Foto */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Image size={14} className="inline mr-1" />
                    Upload Foto (Opsional)
                  </label>
                  <label className="flex items-center gap-3 border-2 border-dashed border-gray-300 hover:border-amber-400 rounded-xl p-4 cursor-pointer transition-colors group">
                    <div className="w-10 h-10 bg-amber-50 group-hover:bg-amber-100 rounded-xl flex items-center justify-center transition-colors">
                      <Image size={18} className="text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Klik untuk pilih foto</p>
                      <p className="text-xs text-gray-400">JPG, PNG, WEBP — Maks 5MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFotoChange}
                    />
                  </label>
                  {/* Preview Foto */}
                  {fotoPreview && (
                    <div className="mt-3 relative inline-block">
                      <img src={fotoPreview} alt="Preview" className="max-h-48 rounded-xl object-cover border border-gray-200" />
                      <button
                        type="button"
                        onClick={() => { setFotoPreview(null); setFotoFile(null); }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Link YouTube */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Play size={14} className="inline mr-1 text-red-500" />
                    Link Video YouTube (Opsional)
                  </label>
                  <input
                    type="url"
                    value={form.youtubeUrl}
                    onChange={e => setForm({ ...form, youtubeUrl: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  {/* Preview YouTube */}
                  {form.youtubeUrl && getYouTubeId(form.youtubeUrl) && (
                    <div className="mt-3 rounded-xl overflow-hidden aspect-video bg-black">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${getYouTubeId(form.youtubeUrl)}`}
                        title="Preview YouTube"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all"
                  >
                    Publikasikan
                  </motion.button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-all"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Agenda / Kalender Kegiatan */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar size={24} className="text-amber-500" /> Agenda Desa Bulan Ini
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 overflow-x-auto">
            <div className="flex gap-4 p-2">
              {[
                { tgl: '10', bln: 'Mei', title: 'Posyandu Balita & Lansia', loc: 'Balai Desa', time: '08:00' },
                { tgl: '15', bln: 'Mei', title: 'Kerja Bakti Dusun', loc: 'Dusun II', time: '07:00' },
                { tgl: '20', bln: 'Mei', title: 'Rapat Musrenbangdes', loc: 'Aula Balai Desa', time: '19:30' },
                { tgl: '28', bln: 'Mei', title: 'Pengajian Rutin', loc: 'Masjid Jami', time: '20:00' },
              ].map((agenda, i) => (
                <div key={i} className="min-w-[240px] flex gap-3 p-3 bg-amber-50 border border-amber-100 rounded-xl hover:bg-amber-100 transition-colors">
                  <div className="bg-white rounded-lg px-3 py-2 text-center shadow-sm border border-amber-200 h-fit">
                    <div className="text-xl font-black text-amber-600 leading-none">{agenda.tgl}</div>
                    <div className="text-[10px] font-bold text-amber-500 uppercase mt-1">{agenda.bln}</div>
                  </div>
                  <div className="flex-1 py-0.5">
                    <div className="font-bold text-gray-800 text-sm leading-tight mb-1">{agenda.title}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mb-0.5">
                      <Clock size={10} className="text-amber-500" /> {agenda.time} WIB
                    </div>
                    <div className="text-xs text-gray-500">📍 {agenda.loc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Berita List */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Newspaper size={24} className="text-slate-700" /> Berita Terkini
        </h2>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {beritaList.map((berita) => (
            <motion.div
              key={berita.id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.09)' }}
              onClick={() => setSelectedBerita(berita)}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 cursor-pointer overflow-hidden group"
            >
              {/* Foto thumbnail */}
              {berita.gambar && (
                <div className="h-40 overflow-hidden">
                  <img src={berita.gambar} alt={berita.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              )}
              {/* YouTube thumbnail */}
              {!berita.gambar && berita.youtubeUrl && (
                <div className="h-40 overflow-hidden relative bg-black flex items-center justify-center">
                  <img
                    src={`https://img.youtube.com/vi/${berita.youtubeUrl.split('/embed/')[1]}/hqdefault.jpg`}
                    alt="YouTube"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-xl">
                      <Play size={22} className="text-white ml-0.5" />
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${kategoriWarna[berita.kategori] || 'bg-gray-100 text-gray-600'}`}>
                    {berita.kategori}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Eye size={12} /> {berita.views}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 text-lg leading-snug mb-3 group-hover:text-amber-600 transition-colors">
                  {berita.judul}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{berita.konten}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-3">
                    <span>✍️ {berita.penulis}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {berita.tanggal}</span>
                  </div>
                  <ChevronRight size={16} className="text-amber-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
