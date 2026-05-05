import { useState } from 'react';
import { Newspaper, Eye, Clock, Plus, AlertTriangle, ChevronRight, Calendar, Image, Play, X, MessageSquare, Reply, ShieldCheck, Send, MapPin, User, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockBerita } from '../data/mockData';
import { BeritaItem, Comment, AgendaItem } from '../types';

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
  const [agendaList, setAgendaList] = useState<AgendaItem[]>([
    { id: '1', tgl: '10', bln: 'Mei', title: 'Posyandu Balita & Lansia', loc: 'Balai Desa', time: '08:00', deskripsi: 'Kegiatan rutin pemeriksaan kesehatan balita dan lansia di wilayah Gumelar. Mohon kehadiran warga tepat waktu.', penulis: 'Bidan Desa' },
    { id: '2', tgl: '15', bln: 'Mei', title: 'Kerja Bakti Dusun', loc: 'Dusun II', time: '07:00', deskripsi: 'Membersihkan selokan dan jalanan dusun untuk menyambut musim hujan. Harap membawa peralatan masing-masing.', penulis: 'Kadus II' },
    { id: '3', tgl: '20', bln: 'Mei', title: 'Rapat Musrenbangdes', loc: 'Aula Balai Desa', time: '19:30', deskripsi: 'Pembahasan rencana pembangunan desa tahun anggaran mendatang. Kehadiran tokoh masyarakat sangat diharapkan.', penulis: 'Sekdes' },
  ]);
  
  const [selectedBerita, setSelectedBerita] = useState<BeritaItem | null>(null);
  const [selectedAgenda, setSelectedAgenda] = useState<AgendaItem | null>(null);
  const [showForm, setShowForm] = useState<'berita' | 'agenda' | null>(null);
  
  // Berita Form State
  const [form, setForm] = useState({
    judul: '',
    konten: '',
    penulis: '',
    kategori: 'Umum',
    youtubeUrl: '',
  });
  
  // Agenda Form State
  const [agendaForm, setAgendaForm] = useState({
    title: '',
    tgl: '',
    bln: 'Mei',
    time: '',
    loc: '',
    deskripsi: '',
    penulis: ''
  });

  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [fotoFile, setFotoFile] = useState<File | null>(null);

  // Comment state
  const [commentForm, setCommentForm] = useState({ penulis: '', konten: '' });
  const [replyTarget, setReplyTarget] = useState<{ id: string; penulis: string } | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setFotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitBerita = (e: React.FormEvent) => {
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
      komentar: [],
    };
    setBeritaList([newBerita, ...beritaList]);
    setForm({ judul: '', konten: '', penulis: '', kategori: 'Umum', youtubeUrl: '' });
    setFotoPreview(null);
    setFotoFile(null);
    setShowForm(null);
  };

  const handleSubmitAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    const newAgenda: AgendaItem = {
      ...agendaForm,
      id: Date.now().toString(),
    };
    setAgendaList([newAgenda, ...agendaList]);
    setAgendaForm({ title: '', tgl: '', bln: 'Mei', time: '', loc: '', deskripsi: '', penulis: '' });
    setShowForm(null);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBerita || !commentForm.konten) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      penulis: isAdminMode ? 'Admin Gumelar' : (commentForm.penulis || 'Warga Anonim'),
      konten: commentForm.konten,
      tanggal: 'Baru saja',
      isAdmin: isAdminMode,
      balasan: [],
    };

    const updatedList = beritaList.map(b => {
      if (b.id === selectedBerita.id) {
        const currentKomentar = b.komentar || [];
        if (replyTarget) {
          const newKomentar = currentKomentar.map(c => {
            if (c.id === replyTarget.id) {
              return { ...c, balasan: [...(c.balasan || []), newComment] };
            }
            return c;
          });
          return { ...b, komentar: newKomentar };
        } else {
          return { ...b, komentar: [newComment, ...currentKomentar] };
        }
      }
      return b;
    });

    setBeritaList(updatedList);
    setSelectedBerita(updatedList.find(b => b.id === selectedBerita.id) || null);
    setCommentForm({ penulis: '', konten: '' });
    setReplyTarget(null);
  };

  // ---------------------------------------------------------
  // AGENDA DETAIL VIEW
  // ---------------------------------------------------------
  if (selectedAgenda) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setSelectedAgenda(null)}
            className="flex items-center gap-2 text-slate-700 font-semibold mb-6 hover:underline transition-all"
          >
            ← Kembali ke Informasi
          </button>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-amber-100"
          >
            {/* Header Banner */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-8 sm:p-12 text-white relative">
              <div className="absolute top-0 right-0 p-10 opacity-10">
                <Calendar size={180} />
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white text-amber-600 rounded-2xl px-5 py-3 text-center shadow-lg">
                  <div className="text-4xl font-black leading-none">{selectedAgenda.tgl}</div>
                  <div className="text-sm font-bold uppercase tracking-widest mt-1">{selectedAgenda.bln}</div>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider">
                  Agenda Desa
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-6">{selectedAgenda.title}</h1>
              <div className="flex flex-wrap gap-6 text-sm font-medium">
                <div className="flex items-center gap-2 bg-black/10 rounded-xl px-4 py-2">
                  <Clock size={18} /> {selectedAgenda.time} WIB
                </div>
                <div className="flex items-center gap-2 bg-black/10 rounded-xl px-4 py-2">
                  <MapPin size={18} /> {selectedAgenda.loc}
                </div>
              </div>
            </div>

            <div className="p-8 sm:p-12">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                  <User size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Penyelenggara / Penulis</div>
                  <div className="text-gray-800 font-bold">{selectedAgenda.penulis}</div>
                </div>
              </div>

              <div className="prose prose-slate max-w-none mb-10">
                <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
                  <Info className="text-amber-500" /> Detail Kegiatan
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">{selectedAgenda.deskripsi}</p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0">
                  <Calendar size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 mb-1">Simpan Tanggal Ini!</h4>
                  <p className="text-sm text-blue-700 leading-relaxed">
                    Jangan lupa hadir tepat waktu di <strong>{selectedAgenda.loc}</strong> pada jam <strong>{selectedAgenda.time} WIB</strong>. Kehadiran Anda sangat berarti bagi kemajuan desa.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------
  // BERITA DETAIL VIEW (Existing)
  // ---------------------------------------------------------
  if (selectedBerita) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setSelectedBerita(null)}
            className="flex items-center gap-2 text-slate-700 font-semibold mb-6 hover:underline transition-all"
          >
            ← Kembali ke Informasi
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-sm overflow-hidden"
          >
            {selectedBerita.gambar && (
              <div className="w-full h-64 sm:h-96 overflow-hidden">
                <img
                  src={selectedBerita.gambar}
                  alt={selectedBerita.judul}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6 sm:p-10">
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${kategoriWarna[selectedBerita.kategori] || 'bg-gray-100 text-gray-600'}`}>
                {selectedBerita.kategori}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-gray-800 mt-4 mb-4 leading-tight">{selectedBerita.judul}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-1">✍️ <span className="text-gray-700 font-medium">{selectedBerita.penulis}</span></div>
                <div className="flex items-center gap-1">📅 <span>{selectedBerita.tanggal}</span></div>
                <div className="flex items-center gap-1"><Eye size={14} /> <span>{selectedBerita.views} views</span></div>
              </div>

              {selectedBerita.youtubeUrl && (
                <div className="mb-8 rounded-2xl overflow-hidden bg-black shadow-xl aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={selectedBerita.youtubeUrl}
                    title="Video YouTube"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap mb-10">{selectedBerita.konten}</div>
              
              <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-800 flex items-start gap-3">
                <AlertTriangle size={20} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <p>Informasi ini sepenuhnya merupakan tanggung jawab penulis: <strong>{selectedBerita.penulis}</strong>. Redaksi GUMELAR.ID hanya sebagai penyedia platform.</p>
              </div>

              {/* Comment Section */}
              <div className="mt-16 pt-10 border-t border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-gray-800 flex items-center gap-3">
                    <MessageSquare className="text-amber-500" />
                    Komentar <span className="text-gray-400 font-medium text-lg">({(selectedBerita.komentar?.length || 0) + (selectedBerita.komentar?.reduce((acc, c) => acc + (c.balasan?.length || 0), 0) || 0)})</span>
                  </h3>
                  
                  <button 
                    onClick={() => setIsAdminMode(!isAdminMode)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      isAdminMode ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <ShieldCheck size={14} />
                    {isAdminMode ? 'Mode Admin Aktif' : 'Login Admin'}
                  </button>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 mb-10 border border-gray-100">
                  <form onSubmit={handleAddComment} className="space-y-4">
                    {!isAdminMode && (
                      <input
                        type="text"
                        placeholder="Nama Anda..."
                        value={commentForm.penulis}
                        onChange={e => setCommentForm({ ...commentForm, penulis: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    )}
                    <textarea
                      required
                      placeholder={replyTarget ? "Tulis balasan Anda..." : "Apa pendapat Anda?"}
                      rows={3}
                      value={commentForm.konten}
                      onChange={e => setCommentForm({ ...commentForm, konten: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                    />
                    <div className="flex justify-end">
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all ${
                          isAdminMode ? 'bg-slate-800 text-white' : 'bg-amber-500 text-slate-900'
                        }`}
                      >
                        <Send size={16} /> Kirim
                      </motion.button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------
  // MAIN LIST VIEW
  // ---------------------------------------------------------
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

        {/* Buttons to open forms */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(showForm === 'berita' ? null : 'berita')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold shadow-lg transition-all ${
              showForm === 'berita' ? 'bg-red-500 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
          >
            {showForm === 'berita' ? <X size={20} /> : <Plus size={20} />}
            Posting Berita
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(showForm === 'agenda' ? null : 'agenda')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold shadow-lg transition-all ${
              showForm === 'agenda' ? 'bg-red-500 text-white' : 'bg-amber-500 text-slate-900 hover:bg-amber-400'
            }`}
          >
            {showForm === 'agenda' ? <X size={20} /> : <Calendar size={20} />}
            Input Agenda Desa
          </motion.button>
        </div>

        {/* Forms Container */}
        <AnimatePresence mode="wait">
          {showForm === 'berita' && (
            <motion.div
              key="form-berita"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-12 overflow-hidden"
            >
              <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
                <Newspaper className="text-blue-600" /> Tulis Berita Baru
              </h3>
              <form onSubmit={handleSubmitBerita} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Judul Berita *</label>
                    <input required type="text" value={form.judul} onChange={e => setForm({ ...form, judul: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Kategori</label>
                    <select value={form.kategori} onChange={e => setForm({ ...form, kategori: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 outline-none">
                      {['Umum', 'Pertanian', 'Ekonomi', 'Budaya', 'Infrastruktur'].map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Isi Berita *</label>
                  <textarea required rows={6} value={form.konten} onChange={e => setForm({ ...form, konten: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 outline-none resize-none" />
                </div>
                <div className="flex gap-4">
                  <button type="submit" className="flex-1 bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-700 transition-all">Publikasikan Berita</button>
                  <button type="button" onClick={() => setShowForm(null)} className="px-8 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200">Batal</button>
                </div>
              </form>
            </motion.div>
          )}

          {showForm === 'agenda' && (
            <motion.div
              key="form-agenda"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-amber-100 p-8 mb-12 overflow-hidden"
            >
              <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
                <Calendar className="text-amber-500" /> Buat Agenda Desa (Landing Page Otomatis)
              </h3>
              <form onSubmit={handleSubmitAgenda} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nama Kegiatan *</label>
                    <input required type="text" value={agendaForm.title} onChange={e => setAgendaForm({ ...agendaForm, title: e.target.value })} placeholder="Contoh: Rapat RT 01" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Lokasi *</label>
                    <input required type="text" value={agendaForm.loc} onChange={e => setAgendaForm({ ...agendaForm, loc: e.target.value })} placeholder="Contoh: Balai Desa" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="flex gap-2">
                    <input required type="number" value={agendaForm.tgl} onChange={e => setAgendaForm({ ...agendaForm, tgl: e.target.value })} placeholder="Tgl" className="w-16 border border-gray-200 rounded-xl px-3 py-3 focus:ring-2 focus:ring-amber-400 outline-none" />
                    <select value={agendaForm.bln} onChange={e => setAgendaForm({ ...agendaForm, bln: e.target.value })} className="flex-1 border border-gray-200 rounded-xl px-3 py-3 focus:ring-2 focus:ring-amber-400 outline-none">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'].map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <input required type="text" value={agendaForm.time} onChange={e => setAgendaForm({ ...agendaForm, time: e.target.value })} placeholder="Waktu (08:00)" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 outline-none" />
                  </div>
                  <div>
                    <input required type="text" value={agendaForm.penulis} onChange={e => setAgendaForm({ ...agendaForm, penulis: e.target.value })} placeholder="Penyelenggara" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi Detail Kegiatan *</label>
                  <textarea required rows={4} value={agendaForm.deskripsi} onChange={e => setAgendaForm({ ...agendaForm, deskripsi: e.target.value })} placeholder="Tulis rincian kegiatan di sini agar otomatis jadi landing page..." className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 outline-none resize-none" />
                </div>

                <div className="flex gap-4">
                  <button type="submit" className="flex-1 bg-amber-500 text-slate-900 font-black py-3 rounded-xl hover:bg-amber-400 transition-all">Publikasikan Agenda</button>
                  <button type="button" onClick={() => setShowForm(null)} className="px-8 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200">Batal</button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Agenda Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3">
            <Calendar size={28} className="text-amber-500" /> Agenda Desa Terjadwal
          </h2>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 overflow-hidden overflow-x-auto">
            <div className="flex gap-4 p-4 min-w-max">
              {agendaList.map((agenda) => (
                <motion.div 
                  key={agenda.id} 
                  whileHover={{ y: -5, borderColor: '#f59e0b' }}
                  onClick={() => setSelectedAgenda(agenda)}
                  className="w-64 flex gap-4 p-4 bg-gray-50 border border-gray-200 rounded-2xl transition-all cursor-pointer group"
                >
                  <div className="bg-white rounded-xl px-3 py-2 text-center shadow-sm border border-gray-100 h-fit min-w-[56px] group-hover:shadow-md transition-all">
                    <div className="text-2xl font-black text-amber-500 leading-none">{agenda.tgl}</div>
                    <div className="text-[10px] font-black text-gray-400 uppercase mt-1">{agenda.bln}</div>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="font-bold text-gray-800 text-sm leading-tight mb-2 truncate group-hover:text-amber-600 transition-colors">{agenda.title}</div>
                    <div className="space-y-1">
                      <div className="text-[10px] text-gray-500 flex items-center gap-1.5 font-medium">
                        <Clock size={10} className="text-amber-500" /> {agenda.time} WIB
                      </div>
                      <div className="text-[10px] text-gray-500 flex items-center gap-1.5 font-medium">
                        <MapPin size={10} className="text-amber-500" /> {agenda.loc}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Berita List */}
        <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3">
          <Newspaper size={28} className="text-slate-800" /> Berita Terkini Gumelar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {beritaList.map((berita) => (
            <motion.div
              key={berita.id}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
              onClick={() => setSelectedBerita(berita)}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 cursor-pointer overflow-hidden group transition-all"
            >
              {berita.gambar && <div className="h-48 overflow-hidden"><img src={berita.gambar} alt={berita.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /></div>}
              {!berita.gambar && berita.youtubeUrl && (
                <div className="h-48 overflow-hidden relative bg-black flex items-center justify-center">
                  <img src={`https://img.youtube.com/vi/${berita.youtubeUrl.split('/embed/')[1]}/hqdefault.jpg`} alt="YouTube" className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center"><div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform"><Play size={24} className="text-white ml-1" /></div></div>
                </div>
              )}
              <div className="p-7">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider ${kategoriWarna[berita.kategori] || 'bg-gray-100 text-gray-600'}`}>{berita.kategori}</span>
                  <span className="flex items-center gap-1 text-[10px] text-gray-400 font-bold"><Eye size={12} /> {berita.views}</span>
                </div>
                <h3 className="font-black text-gray-800 text-xl leading-tight mb-4 group-hover:text-amber-500 transition-colors">{berita.judul}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-6 leading-relaxed">{berita.konten}</p>
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-4"><span className="text-gray-700">✍️ {berita.penulis}</span><span className="flex items-center gap-1.5"><Clock size={12} /> {berita.tanggal}</span></div>
                  <ChevronRight size={20} className="text-amber-500 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
