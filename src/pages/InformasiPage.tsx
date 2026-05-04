import { useState } from 'react';
import { Newspaper, Eye, Clock, Plus, AlertTriangle, ChevronRight, Calendar } from 'lucide-react';
import { mockBerita } from '../data/mockData';
import { BeritaItem } from '../types';

const kategoriWarna: Record<string, string> = {
  Pertanian: 'bg-green-100 text-green-700',
  Infrastruktur: 'bg-orange-100 text-orange-700',
  Budaya: 'bg-purple-100 text-purple-700',
  Ekonomi: 'bg-blue-100 text-blue-700',
};

export default function InformasiPage() {
  const [beritaList, setBeritaList] = useState<BeritaItem[]>(mockBerita);
  const [selectedBerita, setSelectedBerita] = useState<BeritaItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ judul: '', konten: '', penulis: '', kategori: 'Umum' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBerita: BeritaItem = {
      id: Date.now().toString(),
      ...form,
      tanggal: new Date().toISOString().split('T')[0],
      views: 0,
    };
    setBeritaList([newBerita, ...beritaList]);
    setForm({ judul: '', konten: '', penulis: '', kategori: 'Umum' });
    setShowForm(false);
  };

  if (selectedBerita) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setSelectedBerita(null)}
            className="flex items-center gap-2 text-green-700 font-semibold mb-6 hover:underline"
          >
            ← Kembali ke daftar berita
          </button>
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${kategoriWarna[selectedBerita.kategori] || 'bg-gray-100 text-gray-600'}`}>
              {selectedBerita.kategori}
            </span>
            <h1 className="text-3xl font-black text-gray-800 mt-4 mb-3">{selectedBerita.judul}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-6 border-b pb-6">
              <span>✍️ {selectedBerita.penulis}</span>
              <span>📅 {selectedBerita.tanggal}</span>
              <span className="flex items-center gap-1"><Eye size={14} /> {selectedBerita.views} views</span>
            </div>
            <div className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap">{selectedBerita.konten}</div>
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-700 flex items-start gap-2">
              <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
              <span>Informasi ini menjadi tanggung jawab penuh penulis: <strong>{selectedBerita.penulis}</strong></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Newspaper size={14} />
            INFORMASI SEPUTAR GUMELAR
          </div>
          <h1 className="text-4xl font-black text-gray-800 mb-3">
            Berita & <span className="text-green-700">Informasi</span>
          </h1>
          <div className="w-16 h-1 bg-green-600 mx-auto rounded-full mb-4" />
          <p className="text-gray-500">Informasi terkini dari dan untuk masyarakat Gumelar</p>
        </div>

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
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-5 py-3 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-xl shadow transition-all"
          >
            <Plus size={16} />
            Posting Berita
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📝 Tambah Informasi / Berita</h3>
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-xs text-red-700">
              <strong>⚠️ DISCLAIMER:</strong> No Politik · No SARA · Informasi yang Anda posting menjadi tanggung jawab pribadi Anda.
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Judul Berita *</label>
                <input
                  type="text"
                  required
                  value={form.judul}
                  onChange={e => setForm({ ...form, judul: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Masukkan judul berita..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Penulis *</label>
                  <input
                    type="text"
                    required
                    value={form.penulis}
                    onChange={e => setForm({ ...form, penulis: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Nama Anda..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
                  <select
                    value={form.kategori}
                    onChange={e => setForm({ ...form, kategori: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {['Umum', 'Pertanian', 'Ekonomi', 'Budaya', 'Infrastruktur', 'Pendidikan', 'Kesehatan'].map(k => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Isi Berita *</label>
                <textarea
                  required
                  rows={5}
                  value={form.konten}
                  onChange={e => setForm({ ...form, konten: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  placeholder="Tulis informasi / berita Anda di sini..."
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="px-6 py-3 bg-green-700 hover:bg-green-600 text-white font-bold rounded-xl transition-all">
                  Publikasikan
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-all">
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Agenda / Kalender Kegiatan */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar size={24} className="text-green-600" /> Agenda Desa Bulan Ini
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 overflow-x-auto no-scrollbar">
            <div className="flex gap-4 p-2">
              {[
                { tgl: '10', bln: 'Mei', title: 'Posyandu Balita & Lansia', loc: 'Balai Desa', time: '08:00' },
                { tgl: '15', bln: 'Mei', title: 'Kerja Bakti Dusun', loc: 'Dusun II', time: '07:00' },
                { tgl: '20', bln: 'Mei', title: 'Rapat Musrenbangdes', loc: 'Aula Balai Desa', time: '19:30' },
                { tgl: '28', bln: 'Mei', title: 'Pengajian Rutin', loc: 'Masjid Jami', time: '20:00' },
              ].map((agenda, i) => (
                <div key={i} className="min-w-[240px] flex gap-3 p-3 bg-green-50 border border-green-100 rounded-xl hover:bg-green-100 transition-colors">
                  <div className="bg-white rounded-lg px-3 py-2 text-center shadow-sm border border-green-200 h-fit flex flex-col justify-center">
                    <div className="text-xl font-black text-green-700 leading-none">{agenda.tgl}</div>
                    <div className="text-[10px] font-bold text-green-600 uppercase mt-1">{agenda.bln}</div>
                  </div>
                  <div className="flex-1 py-0.5">
                    <div className="font-bold text-gray-800 text-sm leading-tight mb-1">{agenda.title}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mb-0.5">
                      <Clock size={10} className="text-green-600" /> {agenda.time} WIB
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      📍 {agenda.loc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Berita List */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Newspaper size={24} className="text-green-600" /> Berita Terkini
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {beritaList.map((berita) => (
            <div
              key={berita.id}
              onClick={() => setSelectedBerita(berita)}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${kategoriWarna[berita.kategori] || 'bg-gray-100 text-gray-600'}`}>
                  {berita.kategori}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Eye size={12} /> {berita.views}
                </span>
              </div>
              <h3 className="font-bold text-gray-800 text-lg leading-snug mb-3 group-hover:text-green-700 transition-colors">
                {berita.judul}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4">{berita.konten}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-3">
                  <span>✍️ {berita.penulis}</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {berita.tanggal}</span>
                </div>
                <ChevronRight size={16} className="text-green-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
