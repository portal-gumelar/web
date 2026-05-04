import { useState, useEffect } from 'react';
import { ActivePage } from './types';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import TentangPage from './pages/TentangPage';
import InformasiPage from './pages/InformasiPage';
import RuangKreatifPage from './pages/RuangKreatifPage';
import InfoJasaPage from './pages/InfoJasaPage';
import LayananPage from './pages/LayananPage';
import CompressPdfPage from './pages/CompressPdfPage';
import BuatCVPage from './pages/BuatCVPage';
import DonasiPage from './pages/DonasiPage';
import DaftarMemberPage from './pages/DaftarMemberPage';
import SuratOnlinePage from './pages/SuratOnlinePage';
import TransparansiPage from './pages/TransparansiPage';
import Footer from './components/layout/Footer';
import FomoNotification from './components/ui/FomoNotification';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

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
      case 'donasi':
        return <DonasiPage />;
      case 'daftar-member':
        return <DaftarMemberPage />;
      case 'surat-online':
        return <SuratOnlinePage setActivePage={setActivePage} />;
      case 'transparansi':
        return <TransparansiPage />;
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  // Pages that have their own footer (homepage)
  const hasOwnFooter = activePage === 'home';

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Navbar activePage={activePage} setActivePage={setActivePage} />
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
