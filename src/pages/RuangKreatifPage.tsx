import { useState } from 'react';
import { Palette, Heart, Plus } from 'lucide-react';
import { mockKarya } from '../data/mockData';
import { KaryaItem } from '../types';

const jenisWarna: Record<string, string> = {
  Puisi: 'bg-pink-100 text-pink-700',
  Cerpen: 'bg-blue-100 text-blue-700',
  Desain: 'bg-purple-100 text-purple-700',
  Musik: 'bg-green-100 text-green-700',
  Fotografi: 'bg-amber-100 text-amber-700',
  Lainnya: 'bg-gray-100 text-gray-700',
};

const jenisEmoji: Record<string, string> = {
  Puisi: '📜',
  Cerpen: '📖',
  Desain: '🎨',
  Musik: '🎵',
  Fotografi: '📸',
  Lainnya: '✨',
};

export default function RuangKreatifPage() {
  const [karya, setKarya] = useState<KaryaItem[]>(mockKarya);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ judul: '', deskripsi: '', penulis: '', jenis: 'Puisi' });

  const toggleLike = (id: string) => {
    const newLiked = new Set(liked);
    if (newLiked.has(id)) {
      newLiked.delete(id);
      setKarya(karya.map(k => k.id === id ? { ...k, likes: k.likes - 1 } : k));
    } else {
      newLiked.add(id);
      setKarya(karya.map(k => k.id === id ? { ...k, likes: k.likes + 1 } : k));
    }
    setLiked(newLiked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newKarya: KaryaItem = {
      id: Date.now().toString(),
      ...form,
      tanggal: new Date().toISOString().split('T')[0],
      likes: 0,
    };
    setKarya([newKarya, ...karya]);
    setForm({ judul: '', deskripsi: '', penulis: '', jenis: 'Puisi' });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Palette size={14} />
            RUANG KREATIF
          </div>
          <h1 className="text-4xl font-black text-gray-800 mb-3">
            Galeri <span className="text-purple-700">Karya</span> Member
          </h1>
          <div className="w-16 h-1 bg-purple-600 mx-auto rounded-full mb-4" />
          <p className="text-gray-500">Ruang ekspresi dan apresiasi karya cipta masyarakat Gumelar</p>
        </div>

        {/* Jenis filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['Semua', 'Puisi', 'Cerpen', 'Desain', 'Musik', 'Fotografi'].map(j => (
            <span key={j} className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-full text-sm cursor-pointer hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-all">
              {jenisEmoji[j] || '✨'} {j}
            </span>
          ))}
        </div>

        {/* Post Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-5 py-3 bg-purple-700 hover:bg-purple-600 text-white font-semibold rounded-xl shadow transition-all"
          >
            <Plus size={16} />
            Bagikan Karya
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">🎨 Bagikan Karya Anda</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Judul Karya *</label>
                <input
                  type="text"
                  required
                  value={form.judul}
                  onChange={e => setForm({ ...form, judul: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Judul karya Anda..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Penulis / Kreator *</label>
                  <input
                    type="text"
                    required
                    value={form.penulis}
                    onChange={e => setForm({ ...form, penulis: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Nama Anda..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Jenis Karya</label>
                  <select
                    value={form.jenis}
                    onChange={e => setForm({ ...form, jenis: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {['Puisi', 'Cerpen', 'Desain', 'Musik', 'Fotografi', 'Lainnya'].map(j => (
                      <option key={j} value={j}>{j}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi / Kutipan Karya *</label>
                <textarea
                  required
                  rows={5}
                  value={form.deskripsi}
                  onChange={e => setForm({ ...form, deskripsi: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Deskripsikan atau kutipan karya Anda..."
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="px-6 py-3 bg-purple-700 hover:bg-purple-600 text-white font-bold rounded-xl transition-all">
                  Publikasikan Karya
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-all">
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Karya Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {karya.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
            >
              {/* Color header */}
              <div className={`h-2 ${
                item.jenis === 'Puisi' ? 'bg-gradient-to-r from-pink-400 to-pink-600' :
                item.jenis === 'Cerpen' ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                item.jenis === 'Desain' ? 'bg-gradient-to-r from-purple-400 to-purple-600' :
                item.jenis === 'Musik' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                item.jenis === 'Fotografi' ? 'bg-gradient-to-r from-amber-400 to-amber-600' :
                'bg-gradient-to-r from-gray-400 to-gray-600'
              }`} />

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${jenisWarna[item.jenis] || 'bg-gray-100 text-gray-700'}`}>
                    {jenisEmoji[item.jenis]} {item.jenis}
                  </span>
                  <span className="text-xs text-gray-400">{item.tanggal}</span>
                </div>

                <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-purple-700 transition-colors">
                  {item.judul}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3 italic">
                  "{item.deskripsi}"
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-sm text-gray-600 font-medium">✍️ {item.penulis}</span>
                  <button
                    onClick={() => toggleLike(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                      liked.has(item.id)
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500'
                    }`}
                  >
                    <Heart size={14} className={liked.has(item.id) ? 'fill-red-500' : ''} />
                    {item.likes}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
