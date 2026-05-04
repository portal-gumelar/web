import { Coffee } from 'lucide-react';
import { ActivePage } from '../../types';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  return (
    <footer className="bg-green-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-3xl font-black mb-2">
              GUMELAR<span className="text-yellow-400">.ID</span>
            </div>
            <p className="text-green-300 text-sm leading-relaxed">
              Ruang Kreatif Masyarakat Gumelar dan Sekitarnya — portal digital komunitas yang lahir dari semangat gotong royong.
            </p>
            <button
              onClick={() => setActivePage('donasi')}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white text-sm font-bold rounded-xl transition-all"
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
                    className="text-green-300 hover:text-yellow-400 text-sm transition-colors"
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
                <button onClick={() => setActivePage('compress-pdf')} className="text-green-300 hover:text-yellow-400 text-sm transition-colors">
                  → 📄 Compress PDF
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('buat-cv')} className="text-green-300 hover:text-yellow-400 text-sm transition-colors">
                  → 📝 Buat CV Lamaran Kerja
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('daftar-member')} className="text-green-300 hover:text-yellow-400 text-sm transition-colors">
                  → 🎉 Daftar Jadi Member
                </button>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-green-800 rounded-xl border border-green-700">
              <p className="text-xs text-green-300 italic">
                ☕ <strong className="text-white">"Sruput kopi siji,</strong><br />
                <strong className="text-white">website terus mlaku!"</strong><br />
                <span className="text-green-400">— Tim Gumelar.ID · Sarilane</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-green-400 text-xs">
            ⚠️ <strong>Disclaimer:</strong> No Politik · No SARA · Semua informasi menjadi tanggung jawab penulis
          </p>
          <p className="text-green-500 text-xs">© 2025 Gumelar.ID · Sarilane · All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
