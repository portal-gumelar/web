import { useState } from 'react';
import { Menu, X, Coffee, Home, Info, Newspaper, Palette, Briefcase, Star, PieChart } from 'lucide-react';
import { ActivePage } from '../../types';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

const navItems = [
  { id: 'home' as ActivePage, label: 'Beranda', icon: Home },
  { id: 'tentang' as ActivePage, label: 'Tentang Kami', icon: Info },
  { id: 'informasi' as ActivePage, label: 'Informasi', icon: Newspaper },
  { id: 'transparansi' as ActivePage, label: 'Transparansi', icon: PieChart },
  { id: 'kreatif' as ActivePage, label: 'Ruang Kreatif', icon: Palette },
  { id: 'jasa' as ActivePage, label: 'Info Jasa', icon: Briefcase },
  { id: 'layanan' as ActivePage, label: 'Layanan Member', icon: Star },
];

export default function Navbar({ activePage, setActivePage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-800 via-green-700 to-emerald-700 shadow-xl">
      {/* Disclaimer Banner */}
      <div className="bg-red-600 text-white text-center text-xs py-1 font-semibold tracking-wide animate-pulse">
        ⚠️ DISCLAIMER: NO POLITIK · NO SARA · Informasi menjadi tanggung jawab penulis
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <span className="text-green-800 font-black text-sm">G</span>
            </div>
            <div className="text-left">
              <div className="text-white font-black text-lg leading-none tracking-wide">GUMELAR.ID</div>
              <div className="text-green-200 text-xs leading-none">Ruang Kreatif Masyarakat</div>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activePage === item.id
                      ? 'bg-yellow-400 text-green-800 shadow-md'
                      : 'text-green-100 hover:bg-green-600 hover:text-white'
                  }`}
                >
                  <Icon size={14} />
                  {item.label}
                </button>
              );
            })}

            {/* Donasi Button */}
            <button
              onClick={() => handleNav('donasi')}
              className="ml-2 flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white rounded-full text-sm font-bold shadow-md transition-all duration-200 hover:scale-105"
            >
              <Coffee size={14} />
              Sruput Kopi
            </button>

            {/* Daftar Member */}
            <button
              onClick={() => handleNav('daftar-member')}
              className="ml-1 flex items-center gap-1.5 px-4 py-2 bg-white text-green-800 rounded-full text-sm font-bold shadow-md transition-all duration-200 hover:scale-105 hover:bg-green-50"
            >
              Daftar Member
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-green-900 border-t border-green-600 shadow-xl">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activePage === item.id
                      ? 'bg-yellow-400 text-green-800'
                      : 'text-green-100 hover:bg-green-700'
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => handleNav('donasi')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 text-white rounded-xl font-bold"
              >
                <Coffee size={16} />
                Donasi Sruput Kopi
              </button>
              <button
                onClick={() => handleNav('daftar-member')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-green-800 rounded-xl font-bold"
              >
                Daftar Member
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
