import { useState } from 'react';
import { Palette, Heart, Plus, Share2, Link as LinkIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [selectedKarya, setSelectedKarya] = useState<KaryaItem | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

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

  const handleShare = (karya: KaryaItem) => {
    const shareUrl = window.location.href;
    const shareText = encodeURIComponent(`Lihat karya keren "${karya.judul}" oleh ${karya.penulis} di GUMELAR.ID!`);
    return { shareUrl, shareText };
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
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
            <span key={j} className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-full text-sm cursor-pointer hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-all font-bold">
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
        <AnimatePresence>
          {showForm && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }} 
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8 overflow-hidden"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 font-black">🎨 Bagikan Karya Anda</h3>
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Karya Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {karya.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200 group flex flex-col"
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

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${jenisWarna[item.jenis] || 'bg-gray-100 text-gray-700'}`}>
                    {jenisEmoji[item.jenis]} {item.jenis}
                  </span>
                  <span className="text-xs text-gray-400 font-bold">{item.tanggal}</span>
                </div>

                <h3 className="font-black text-gray-800 text-lg mb-2 group-hover:text-purple-700 transition-colors">
                  {item.judul}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3 italic flex-1">
                  "{item.deskripsi}"
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-sm text-gray-600 font-bold">✍️ {item.penulis}</span>
                  <div className="flex items-center gap-2">
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
                    <button 
                      onClick={() => setSelectedKarya(item)}
                      className="p-1.5 bg-gray-50 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share/Detail Modal */}
      <AnimatePresence>
        {selectedKarya && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[2rem] shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100"
            >
              <div className={`h-3 ${jenisWarna[selectedKarya.jenis]?.split(' ')[0] || 'bg-purple-600'}`} />
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className={`text-xs px-3 py-1 rounded-full font-bold ${jenisWarna[selectedKarya.jenis] || 'bg-gray-100 text-gray-700'}`}>
                      {jenisEmoji[selectedKarya.jenis]} {selectedKarya.jenis}
                    </span>
                    <h2 className="text-2xl font-black text-gray-800 mt-2">{selectedKarya.judul}</h2>
                  </div>
                  <button onClick={() => setSelectedKarya(null)} className="p-2 bg-gray-50 text-gray-400 hover:text-red-500 rounded-full transition-all">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100 italic text-gray-600 leading-relaxed text-lg">
                  "{selectedKarya.deskripsi}"
                </div>

                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-black">
                    {selectedKarya.penulis[0]}
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Kreator</div>
                    <div className="text-gray-800 font-bold">{selectedKarya.penulis}</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Share2 size={12} /> Bagikan Ke Teman
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <a 
                      href={`https://wa.me/?text=${handleShare(selectedKarya).shareText}%20${encodeURIComponent(handleShare(selectedKarya).shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#25D366] text-white rounded-xl text-xs font-bold shadow-md hover:scale-105 transition-transform"
                    >
                      WhatsApp
                    </a>
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(handleShare(selectedKarya).shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#1877F2] text-white rounded-xl text-xs font-bold shadow-md hover:scale-105 transition-transform"
                    >
                      Facebook
                    </a>
                    <button 
                      onClick={copyToClipboard}
                      className={`px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 ${copySuccess ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      <LinkIcon size={14} /> {copySuccess ? 'Berhasil Disalin!' : 'Salin Link'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
