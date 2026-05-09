import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
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
import LoginPage from './pages/LoginPage';
import PortfolioWebPage from './pages/PortfolioWebPage';
import KasirPage from './pages/KasirPage';
import AdminLoginPage from './pages/AdminLoginPage';
import MemberToolsPage from './pages/MemberToolsPage';
import FomoNotification from './components/ui/FomoNotification';
import ErrorBoundary from './components/ui/ErrorBoundary';
import PWAInstallBanner from './components/ui/PWAInstallBanner';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) setUser(JSON.parse(savedUser));
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/');
  };

  const hasOwnFooter = ['/login', '/portal-admin'].includes(location.pathname);

  const handlePageChange = (page: string) => {
    navigate(`/${page}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        activePage={location.pathname.substring(1) as any || 'home'} 
        setActivePage={handlePageChange as any} 
        user={user} 
        onLogout={handleLogout} 
      />
      <main>
        <Routes>
          <Route path="/" element={<HomePage setActivePage={handlePageChange as any} />} />
          <Route path="/home" element={<HomePage setActivePage={handlePageChange as any} />} />
          <Route path="/tentang" element={<TentangPage />} />
          <Route path="/informasi" element={<InformasiPage />} />
          <Route path="/kreatif" element={<RuangKreatifPage />} />
          <Route path="/jasa" element={<InfoJasaPage />} />
          <Route path="/layanan" element={<LayananPage setActivePage={handlePageChange as any} />} />
          <Route path="/compress-pdf" element={<CompressPdfPage />} />
          <Route path="/buat-cv" element={<BuatCVPage />} />
          <Route path="/qr-code" element={<QRCodePage />} />
          <Route path="/image-optimizer" element={<ImageOptimizerPage />} />
          <Route path="/donasi" element={<DonasiPage />} />
          <Route path="/daftar-member" element={<DaftarMemberPage />} />
          <Route path="/surat-online" element={<SuratOnlinePage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/portal-admin" element={<AdminLoginPage onLogin={handleLogin} />} />
          <Route path="/portfolio" element={<PortfolioWebPage />} />
          <Route path="/kasir" element={<KasirPage />} />
          <Route path="/member-tools" element={<MemberToolsPage />} />
          <Route path="*" element={<HomePage setActivePage={handlePageChange} />} />
        </Routes>
      </main>
      {!hasOwnFooter && (
        <Footer />
      )}
      <FomoNotification />
      <PWAInstallBanner />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}
