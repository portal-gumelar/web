import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Calculator, PenTool, IdCard, Megaphone, 
  ChevronRight, Save, Share2, Sparkles, Plus, 
  Trash2, TrendingUp, DollarSign, MessageSquare, Lock, X, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Toast, { ToastType } from '../components/ui/Toast';

type ToolType = 'calculator' | 'caption' | 'vcard' | 'notice';

export default function MemberToolsPage() {
  const navigate = useNavigate();
  const isMember = !!localStorage.getItem('currentUser');
  const [activeTool, setActiveTool] = useState<ToolType>('calculator');
  const [toast, setToast] = useState<{message: string, type: ToastType, visible: boolean}>({
    message: '', type: 'success', visible: false
  });

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ message, type, visible: true });
  };

  // --- Calculator Logic ---
  const [calc, setCalc] = useState({ modal: 0, ops: 0, margin: 20 });
  const marginAmount = (calc.modal + calc.ops) * (calc.margin / 100);
  const suggestedPrice = calc.modal + calc.ops + marginAmount;

  // --- Caption Logic ---
  const [captionInfo, setCaptionInfo] = useState({ product: '', promo: '', tone: 'Ceria' });
  const [generatedCaption, setGeneratedCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCaption = () => {
    if (!captionInfo.product) {
      showToast('Masukkan nama produk!', 'info');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const tones: any = {
        'Ceria': `Halo Kak! 😍 Cobain nih ${captionInfo.product}. Lagi ada promo ${captionInfo.promo || 'menarik'} lho! Yuk buruan diorder sebelum kehabisan! ✨ #UMKMGumelar`,
        'Profesional': `Tingkatkan kualitas harian Anda dengan ${captionInfo.product}. Manfaatkan penawaran khusus ${captionInfo.promo || 'hari ini'}. Hubungi kami untuk detail lebih lanjut.`,
        'Santai': `Lagi nyari ${captionInfo.product}? Pas banget, kita lagi ${captionInfo.promo || 'ada diskon'} nih sob. Langsung gas aja yuk ke WA! 🔥`
      };
      setGeneratedCaption(tones[captionInfo.tone] || '');
      setIsGenerating(false);
      showToast('Caption AI Berhasil Dibuat!');
    }, 1500);
  };

  // --- V-Card Logic ---
  const [vcard, setVcard] = useState({ name: '', biz: '', wa: '', ig: '' });

  // --- Notice Logic ---
  const [notices, setNotices] = useState([
    { id: 1, type: 'Jual', title: 'Mesin Cuci Bekas', price: 'Rp 800rb', user: 'Pak Agus' },
    { id: 2, type: 'Cari', title: 'Tukang Cat Harian', price: 'Nego', user: 'Bu Siti' },
  ]);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [newNotice, setNewNotice] = useState({ type: 'Jual', title: '', price: '', user: '' });

  const handleAddNotice = () => {
    if (!newNotice.title || !newNotice.price) return;
    setNotices([{ id: Date.now(), ...newNotice }, ...notices]);
    setNewNotice({ type: 'Jual', title: '', price: '', user: '' });
    setShowNoticeModal(false);
    showToast('Info Berhasil Dipasang!');
  };

  if (!isMember) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner"><Lock size={40} /></div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">Eksklusif Member</h2>
          <p className="text-slate-500 mb-10 leading-relaxed">Halaman Member Tools Hub hanya dapat diakses oleh warga terdaftar.</p>
          <button onClick={() => navigate('/login')} className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl">Masuk Sekarang</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCF9] pt-24 pb-20 px-4 md:px-8">
      <Toast message={toast.message} type={toast.type} isVisible={toast.visible} onClose={() => setToast({...toast, visible: false})} />
      
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/layanan')} className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-x-1 transition-all"><ArrowLeft size={20} className="text-slate-900" /></button>
            <div>
              <div className="flex items-center gap-2 mb-1"><Sparkles size={16} className="text-amber-500 animate-pulse" /><span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.3em]">Premium Facilities</span></div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Member <span className="text-amber-600">Tools</span> Hub</h1>
            </div>
          </div>

          <div className="flex bg-white p-1.5 rounded-[2rem] shadow-xl border border-slate-100 overflow-x-auto max-w-full no-scrollbar">
            {[
              { id: 'calculator', icon: <Calculator size={18} />, label: 'Kalkulator' },
              { id: 'caption', icon: <PenTool size={18} />, label: 'Caption AI' },
              { id: 'vcard', icon: <IdCard size={18} />, label: 'V-Card' },
              { id: 'notice', icon: <Megaphone size={18} />, label: 'Papan Info' },
            ].map(t => (
              <button key={t.id} onClick={() => setActiveTool(t.id as ToolType)} className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-sm font-black transition-all whitespace-nowrap ${activeTool === t.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'}`}>{t.icon} {t.label}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {activeTool === 'calculator' && (
                <motion.div key="calc" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100">
                  <div className="mb-10"><h3 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-3"><div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600"><Calculator size={20} /></div> Kalkulator Harga Jual</h3><p className="text-slate-500 text-sm">Hitung modal dan profit untuk setiap produk jualan Anda.</p></div>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Modal Bahan</label><div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span><input type="number" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold outline-none" value={calc.modal || ''} onChange={e => setCalc({...calc, modal: Number(e.target.value)})} /></div></div>
                      <div><label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Operasional</label><div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span><input type="number" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold outline-none" value={calc.ops || ''} onChange={e => setCalc({...calc, ops: Number(e.target.value)})} /></div></div>
                    </div>
                    <div><div className="flex justify-between items-center mb-4"><label className="text-[10px] font-black text-slate-400 uppercase">Margin Untung</label><span className="bg-amber-500 text-white px-3 py-1 rounded-lg font-black text-xs">{calc.margin}%</span></div><input type="range" min="5" max="100" step="5" className="w-full accent-amber-500 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer" value={calc.margin} onChange={e => setCalc({...calc, margin: Number(e.target.value)})} /></div>
                    <div className="mt-10 p-8 bg-[#1A1A1A] rounded-[2.5rem] text-white flex justify-between items-end">
                      <div><p className="text-[10px] font-black text-slate-500 uppercase mb-2">Saran Harga Jual</p><h4 className="text-4xl font-black text-amber-500">Rp {suggestedPrice.toLocaleString('id-ID')}</h4></div>
                      <div className="text-right"><p className="text-[10px] font-black text-slate-500 uppercase mb-1">Profit Bersih</p><p className="text-xl font-bold text-green-400">+Rp {marginAmount.toLocaleString('id-ID')}</p></div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTool === 'caption' && (
                <motion.div key="caption" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100">
                  <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3"><div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600"><PenTool size={20} /></div> Caption Generator AI</h3>
                  <div className="space-y-5">
                    <div><label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Nama Produk</label><input className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl font-bold outline-none" placeholder="Misal: Keripik Singkong" value={captionInfo.product} onChange={e => setCaptionInfo({...captionInfo, product: e.target.value})} /></div>
                    <div><label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Gaya Bahasa</label><div className="flex gap-2">{['Ceria', 'Profesional', 'Santai'].map(t => (<button key={t} onClick={() => setCaptionInfo({...captionInfo, tone: t})} className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all ${captionInfo.tone === t ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>{t}</button>))}</div></div>
                    <button onClick={handleGenerateCaption} disabled={isGenerating} className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl flex items-center justify-center gap-3 mt-4 disabled:bg-slate-300">
                      {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} className="text-amber-400" />} {isGenerating ? 'AI Sedang Berpikir...' : 'Buat Caption Sekarang'}
                    </button>
                    {generatedCaption && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 p-6 bg-indigo-50 rounded-3xl border border-indigo-100 relative group">
                        <p className="text-slate-800 text-sm leading-relaxed italic">"{generatedCaption}"</p>
                        <button onClick={() => { navigator.clipboard.writeText(generatedCaption); showToast('Caption Disalin!', 'success'); }} className="absolute top-4 right-4 p-2 bg-white rounded-lg shadow-sm text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"><Save size={16} /></button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTool === 'vcard' && (
                <motion.div key="vcard" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100">
                  <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3"><div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600"><IdCard size={20} /></div> Digital Business Card</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                    <div><label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Nama Bisnis</label><input className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-xl font-bold outline-none" value={vcard.biz} onChange={e => setVcard({...vcard, biz: e.target.value})} /></div>
                    <div><label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">WhatsApp</label><input className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-xl font-bold outline-none" value={vcard.wa} onChange={e => setVcard({...vcard, wa: e.target.value})} /></div>
                  </div>
                  <div className="bg-gradient-to-br from-green-600 to-teal-700 p-8 rounded-[2.5rem] text-white flex justify-between items-start">
                    <div><h4 className="text-2xl font-black">{vcard.name || 'Nama Anda'}</h4><p className="text-green-200 font-bold mb-8">{vcard.biz || 'Nama Bisnis'}</p><div className="flex items-center gap-2 text-xs font-bold bg-white/10 px-3 py-1.5 rounded-full"><MessageSquare size={12} /> {vcard.wa || '08xxxx'}</div></div>
                    <div className="w-16 h-16 bg-white rounded-2xl p-2"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://wa.me/${vcard.wa}`} alt="QR" className="w-full h-full" /></div>
                  </div>
                </motion.div>
              )}

              {activeTool === 'notice' && (
                <motion.div key="notice" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100">
                  <div className="flex items-center justify-between mb-8"><h3 className="text-2xl font-black text-slate-900 flex items-center gap-3"><div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center text-rose-600"><Megaphone size={20} /></div> Papan Info Warga</h3><button onClick={() => setShowNoticeModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 text-white font-bold text-xs rounded-xl hover:bg-rose-700 transition-all shadow-lg shadow-rose-200"><Plus size={16} /> PASANG INFO</button></div>
                  <div className="space-y-4">
                    {notices.map(n => (
                      <div key={n.id} className="p-5 bg-slate-50 rounded-2xl flex items-center justify-between group hover:bg-white hover:shadow-xl hover:translate-x-2 transition-all border border-transparent hover:border-rose-100">
                        <div className="flex items-center gap-5"><div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-[10px] ${n.type === 'Jual' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>{n.type}</div><div><h4 className="font-bold text-slate-800">{n.title}</h4><p className="text-xs text-slate-500">{n.user} · <span className="font-black text-rose-500">{n.price}</span></p></div></div>
                        <button className="p-3 text-slate-300 hover:text-rose-600"><ChevronRight size={20} /></button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <h4 className="text-xl font-black mb-6">Statistik <span className="text-amber-500">Member</span></h4>
              <div className="space-y-4">
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4"><div className="w-10 h-10 bg-green-500/20 text-green-500 rounded-xl flex items-center justify-center"><TrendingUp size={20} /></div><div><p className="text-[10px] font-black text-slate-500 uppercase">Terjual</p><p className="text-xl font-black">124 Unit</p></div></div>
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4"><div className="w-10 h-10 bg-amber-500/20 text-amber-500 rounded-xl flex items-center justify-center"><DollarSign size={20} /></div><div><p className="text-[10px] font-black text-slate-500 uppercase">Omzet</p><p className="text-xl font-black">Rp 4.250.000</p></div></div>
              </div>
              <button onClick={() => showToast('Laporan PDF Berhasil Dibuat!', 'success')} className="w-full py-4 mt-8 bg-amber-500 text-slate-950 font-black rounded-2xl shadow-xl hover:scale-105 transition-all">UNDUH LAPORAN (PDF)</button>
            </div>
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm"><div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4"><Sparkles size={20} /></div><p className="text-slate-600 text-sm italic leading-relaxed">"Kesuksesan bukan tentang seberapa banyak yang Anda jual, tapi seberapa besar manfaat yang Anda berikan bagi komunitas."</p></div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showNoticeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-8">
              <div className="flex justify-between items-center mb-6"><h3 className="font-black text-xl">Pasang Info Baru</h3><button onClick={() => setShowNoticeModal(false)}><X size={24} /></button></div>
              <div className="space-y-4">
                <div className="flex gap-2">{['Jual', 'Cari', 'Info'].map(t => (<button key={t} onClick={() => setNewNotice({...newNotice, type: t})} className={`flex-1 py-2.5 rounded-xl font-bold text-xs ${newNotice.type === t ? 'bg-slate-900 text-white' : 'bg-slate-100'}`}>{t}</button>))}</div>
                <input placeholder="Judul Info" className="w-full p-4 bg-slate-50 rounded-xl font-bold" value={newNotice.title} onChange={e => setNewNotice({...newNotice, title: e.target.value})} />
                <input placeholder="Harga/Keterangan" className="w-full p-4 bg-slate-50 rounded-xl font-bold" value={newNotice.price} onChange={e => setNewNotice({...newNotice, price: e.target.value})} />
                <button onClick={handleAddNotice} className="w-full py-4 bg-rose-600 text-white font-black rounded-2xl shadow-xl mt-4">TERBITKAN SEKARANG</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}
