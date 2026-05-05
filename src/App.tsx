import { useState, useEffect } from 'react';
import { ActivePage, User } from './types';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import TentangPage from './pages/TentangPage';
import InformasiPage from './pages/InformasiPage';
import RuangKreatifPage from './pages/RuangKreatifPage';
import InfoJasaPage from './pages/InfoJasaPage';
import LayananPage from './pages/LayananPage';
import CompressPdfPage from './pages/CompressPdfPage';
import BuatCVPage from './pages/BuatCVPage';
import QRCodePage from './pages/QRCodePage';
import ImageOptimizerPage from './pages/ImageOptimizerPage';
import DonasiPage from './pages/DonasiPage';
import DaftarMemberPage from './pages/DaftarMemberPage';
import SuratOnlinePage from './pages/SuratOnlinePage';
import TransparansiPage from './pages/TransparansiPage';
import LoginPage from './pages/LoginPage';
import Footer from './components/layout/Footer';
import FomoNotification from './components/ui/FomoNotification';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [user, setUser] = useState<User | null>(null);

  // Load state on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('gumelar_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    const savedPage = localStorage.getItem('gumelar_active_page');
    if (savedPage) setActivePage(savedPage as ActivePage);
  }, []);

  // Save page state on change
  useEffect(() => {
    localStorage.setItem('gumelar_active_page', activePage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const handleLogin = (role: 'admin' | 'member', name: string) => {
    const newUser: User = { name, role };
    setUser(newUser);
    localStorage.setItem('gumelar_user', JSON.stringify(newUser));
    setActivePage('home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('gumelar_user');
    setActivePage('home');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage setActivePage={setActivePage} />;
      case 'tentang':
        return <TentangPage />;
      case 'informasi':
        return <InformasiPage />;
      case 'kreatif':
        return <RuangKreatifPage />;
      case 'jasa':
        return <InfoJasaPage />;
      case 'layanan':
        return <LayananPage setActivePage={setActivePage} />;
      case 'compress-pdf':
        return <CompressPdfPage />;
      case 'buat-cv':
        return <BuatCVPage />;
      case 'qr-code':
        return <QRCodePage />;
      case 'image-optimizer':
        return <ImageOptimizerPage />;
      case 'donasi':
        return <DonasiPage />;
      case 'daftar-member':
        return <DaftarMemberPage />;
      case 'surat-online':
        return <SuratOnlinePage setActivePage={setActivePage} />;
      case 'transparansi':
        return <TransparansiPage />;
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  // Pages that have their own footer (homepage)
  const hasOwnFooter = activePage === 'home';

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        user={user} 
        onLogout={handleLogout} 
      />
      <main>
        {renderPage()}
      </main>
      {!hasOwnFooter && (
        <Footer setActivePage={setActivePage} />
      )}
      <FomoNotification />
    </div>
  );
}
