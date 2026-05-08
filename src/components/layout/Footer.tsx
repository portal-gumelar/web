import { Coffee, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-slate-950 text-white py-16 px-6 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand & About */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-white overflow-hidden p-1 shadow-2xl transform -rotate-3">
                <img 
                  src="https://ik.imagekit.io/Gumelar/LogO/WhatsApp%20Image%202026-05-08%20at%2022.31.20.jpeg" 
                  alt="Logo Gumelar" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <div>
                <div className="text-3xl font-black tracking-tighter">
                  GUMELAR<span className="text-amber-500">.ID</span>
                </div>
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">Masyarakat Kreatif</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              Platform pemberdayaan digital masyarakat Gumelar. Wadah kolaborasi UMKM, jasa, dan kreativitas lokal untuk tumbuh bersama di era digital.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/donasi')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl transition-all shadow-lg shadow-amber-500/10"
              >
                <Coffee size={14} />
                DONASI SRUPUT KOPI
              </button>
            </div>
          </div>

          {/* Quick Menu */}
          <div>
            <h4 className="font-black text-white text-sm uppercase tracking-widest mb-6">Navigasi</h4>
            <ul className="space-y-3">
              {[
                { path: '/', label: 'Beranda' },
                { path: '/informasi', label: 'Informasi Gumelar' },
                { path: '/kreatif', label: 'Ruang Kreatif' },
                { path: '/jasa', label: 'Info Jasa & Usaha' },
                { path: '/layanan', label: 'Layanan Member' },
              ].map(m => (
                <li key={m.path}>
                  <button
                    onClick={() => navigate(m.path)}
                    className="text-slate-500 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-amber-500 transition-all" />
                    {m.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Member Services */}
          <div>
            <h4 className="font-black text-white text-sm uppercase tracking-widest mb-6">Layanan Member</h4>
            <ul className="space-y-3">
              {[
                { path: '/kasir', label: 'Kasir Sederhana UMKM' },
                { path: '/portfolio', label: 'Galeri Portofolio Web' },
                { path: '/qr-code', label: 'Generator QR Code' },
                { path: '/image-optimizer', label: 'Image Optimizer' },
                { path: '/daftar-member', label: 'Daftar Member Baru' },
              ].map(m => (
                <li key={m.path}>
                  <button
                    onClick={() => navigate(m.path)}
                    className="text-slate-500 hover:text-amber-500 text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-amber-500 transition-all" />
                    {m.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quotes Section */}
        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-2xl">☕</div>
            <p className="text-slate-400 italic text-sm">
              <span className="text-white font-bold">"Sruput kopi siji, website terus mlaku!"</span><br />
              Visi GUMELAR.ID mendukung digitalisasi UMKM Desa.
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Developer Team</p>
            <p className="text-amber-500 font-bold text-sm">LacosDev.com</p>
          </div>
        </div>

        {/* Bottom Copyright & Secret Admin Access */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
              © 2025 GUMELAR.ID · ALL RIGHTS RESERVED
            </p>
            <div className="w-1 h-1 bg-slate-800 rounded-full hidden md:block" />
            <p className="text-slate-700 text-[10px] font-medium hidden md:block italic">
              No Politik · No SARA
            </p>
          </div>
          
          {/* THE SECRET ADMIN ACCESS */}
          <button 
            onClick={() => navigate('/portal-admin')}
            className="group flex items-center gap-2 text-slate-800 hover:text-slate-600 transition-all"
            title="Administrator Access"
          >
            <Shield size={10} className="opacity-20 group-hover:opacity-100" />
            <span className="text-[10px] font-black tracking-[0.2em] opacity-20 group-hover:opacity-100">SYSTEM ACCESS</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
