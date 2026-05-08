import { useState } from 'react';
import { Menu, X, Coffee, Home, Info, Newspaper, Palette, Briefcase, Star, LogIn, User, LogOut } from 'lucide-react';
import { ActivePage, User as UserType } from '../../types';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  user: UserType | null;
  onLogout: () => void;
}

const navItems = [
  { id: 'home' as ActivePage, label: 'Beranda', icon: Home },
  { id: 'tentang' as ActivePage, label: 'Tentang Kami', icon: Info },
  { id: 'informasi' as ActivePage, label: 'Informasi', icon: Newspaper },
  { id: 'kreatif' as ActivePage, label: 'Ruang Kreatif', icon: Palette },
  { id: 'jasa' as ActivePage, label: 'Info Jasa', icon: Briefcase },
  { id: 'layanan' as ActivePage, label: 'Layanan Member', icon: Star },
];

export default function Navbar({ activePage, setActivePage, user, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl">
      {/* Disclaimer Banner */}
      <div className="bg-amber-500 text-slate-900 text-center text-xs py-1 font-semibold tracking-wide">
        ⚠️ DISCLAIMER: NO POLITIK · NO SARA · Informasi menjadi tanggung jawab penulis
      </div>

      <div className="max-w-[90rem] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-white overflow-hidden shadow-md group-hover:scale-110 transition-transform flex items-center justify-center p-0.5">
              <img src="https://ik.imagekit.io/Gumelar/LogO/WhatsApp%20Image%202026-05-08%20at%2022.31.20.jpeg" alt="Logo Gumelar" className="w-full h-full object-contain" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-white font-black text-lg leading-none tracking-wide">GUMELAR.ID</div>
              <div className="text-slate-400 text-[10px] leading-none uppercase tracking-widest mt-0.5">Ruang Kreatif</div>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activePage === item.id
                      ? 'bg-amber-400 text-slate-900 shadow-md'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon size={14} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => handleNav('donasi')}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-slate-900 border border-amber-500/30 rounded-full text-xs font-bold transition-all duration-200"
            >
              <Coffee size={14} /> Sruput Kopi
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 pl-2 pr-4 py-1.5 bg-slate-800 text-white rounded-full border border-slate-700 hover:bg-slate-700 transition-all"
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${user.role === 'admin' ? 'bg-amber-500 text-slate-900' : 'bg-blue-600 text-white'}`}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-bold leading-none truncate max-w-[80px]">{user.name}</div>
                    <div className="text-[8px] text-slate-400 uppercase tracking-widest">{user.role}</div>
                  </div>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Akun Saya</p>
                      <p className="text-sm font-black text-gray-800 truncate">{user.name}</p>
                    </div>
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                      <User size={16} /> Profil Member
                    </button>
                    <button
                      onClick={() => { onLogout(); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} /> Keluar Aplikasi
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleNav('login')}
                className="flex items-center gap-1.5 px-6 py-2 bg-white text-slate-900 rounded-full text-xs font-black shadow-lg hover:shadow-xl hover:bg-slate-100 transition-all"
              >
                <LogIn size={14} /> MASUK
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
             {!user && (
              <button
                onClick={() => handleNav('login')}
                className="px-4 py-1.5 bg-amber-500 text-slate-900 rounded-full text-[10px] font-black shadow-md"
              >
                MASUK
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-700 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-5 space-y-2">
            {user && (
              <div className="flex items-center gap-4 p-4 bg-slate-800 rounded-2xl mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black ${user.role === 'admin' ? 'bg-amber-500 text-slate-900' : 'bg-blue-600 text-white'}`}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-white font-black">{user.name}</h3>
                  <p className="text-slate-400 text-xs uppercase tracking-widest">{user.role}</p>
                </div>
              </div>
            )}
            
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    activePage === item.id
                      ? 'bg-amber-400 text-slate-900'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
            
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <button
                onClick={() => handleNav('donasi')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 text-slate-900 rounded-xl font-black shadow-lg shadow-amber-500/20"
              >
                <Coffee size={18} /> Donasi Sruput Kopi
              </button>
              {user ? (
                 <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600/10 text-red-500 border border-red-600/30 rounded-xl font-black"
                >
                  <LogOut size={18} /> Keluar Aplikasi
                </button>
              ) : (
                <button
                  onClick={() => handleNav('daftar-member')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-slate-900 rounded-xl font-black shadow-lg"
                >
                  <User size={18} /> Daftar Member
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
