import { Coffee } from 'lucide-react';
import { ActivePage } from '../../types';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white overflow-hidden p-0.5 shadow-lg">
                <img src="/logo.png" alt="Logo Gumelar" className="w-full h-full object-contain" />
              </div>
              <div className="text-3xl font-black">
                GUMELAR<span className="text-amber-400">.ID</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Ruang Kreatif Masyarakat Gumelar dan Sekitarnya — portal digital komunitas yang lahir dari semangat gotong royong.
            </p>
            <button
              onClick={() => setActivePage('donasi')}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 text-sm font-bold rounded-xl transition-all"
            >
              <Coffee size={14} />
              Donasi Sruput Kopi
            </button>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-bold text-white mb-3">Menu Utama</h4>
            <ul className="space-y-2">
              {[
                { id: 'tentang' as ActivePage, label: 'Tentang Kami' },
                { id: 'informasi' as ActivePage, label: 'Informasi Gumelar' },
                { id: 'kreatif' as ActivePage, label: 'Ruang Kreatif' },
                { id: 'jasa' as ActivePage, label: 'Info Jasa & Usaha' },
                { id: 'layanan' as ActivePage, label: 'Layanan Member' },
              ].map(m => (
                <li key={m.id}>
                  <button
                    onClick={() => setActivePage(m.id)}
                    className="text-slate-400 hover:text-amber-400 text-sm transition-colors"
                  >
                    → {m.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="font-bold text-white mb-3">Layanan Gratis Member</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActivePage('compress-pdf')} className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                  → 📄 Compress PDF
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('buat-cv')} className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                  → 📝 Buat CV Lamaran Kerja
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('daftar-member')} className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                  → 🎉 Daftar Jadi Member
                </button>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-slate-800 rounded-xl border border-slate-700">
              <p className="text-xs text-slate-400 italic">
                ☕ <strong className="text-white">"Sruput kopi siji,</strong><br />
                <strong className="text-white">website terus mlaku!"</strong><br />
                <span className="text-amber-400">— Tim Gumelar.ID · Sarilane</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            ⚠️ <strong>Disclaimer:</strong> No Politik · No SARA · Semua informasi menjadi tanggung jawab penulis
          </p>
          <p className="text-slate-600 text-xs">© 2025 Gumelar.ID · Sarilane · All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
