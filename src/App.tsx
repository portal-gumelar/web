import { useState, useEffect } from 'react';
import { User, ActivePage } from './types';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
import LoginPage from './pages/LoginPage';
import Footer from './components/layout/Footer';
import FomoNotification from './components/ui/FomoNotification';
import ErrorBoundary from './components/ui/ErrorBoundary';
import PortfolioWebPage from './pages/PortfolioWebPage';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);

  // Derive active page from path
  const path = location.pathname.split('/')[1] || 'home';
  const activePage = path as ActivePage;

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('gumelar_user');
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch (e) {
      console.error("Gagal memuat session user:", e);
      localStorage.removeItem('gumelar_user');
    }
  }, []);

  const handleLogin = (role: 'admin' | 'member', name: string) => {
    const newUser: User = { name, role };
    setUser(newUser);
    localStorage.setItem('gumelar_user', JSON.stringify(newUser));
    navigate('/home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('gumelar_user');
    navigate('/home');
  };

  const hasOwnFooter = activePage === 'home';

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Navbar 
        activePage={activePage} 
        setActivePage={(page) => navigate(`/${page}`)} 
        user={user} 
        onLogout={handleLogout} 
      />
      <main>
        <Routes>
          <Route path="/" element={<HomePage setActivePage={(page) => navigate(`/${page}`)} />} />
          <Route path="/home" element={<HomePage setActivePage={(page) => navigate(`/${page}`)} />} />
          <Route path="/tentang" element={<TentangPage />} />
          <Route path="/informasi" element={<InformasiPage />} />
          <Route path="/kreatif" element={<RuangKreatifPage />} />
          <Route path="/jasa" element={<InfoJasaPage />} />
          <Route path="/layanan" element={<LayananPage setActivePage={(page) => navigate(`/${page}`)} />} />
          <Route path="/compress-pdf" element={<CompressPdfPage />} />
          <Route path="/buat-cv" element={<BuatCVPage />} />
          <Route path="/qr-code" element={<QRCodePage />} />
          <Route path="/image-optimizer" element={<ImageOptimizerPage />} />
          <Route path="/donasi" element={<DonasiPage />} />
          <Route path="/daftar-member" element={<DaftarMemberPage />} />
          <Route path="/surat-online" element={<SuratOnlinePage setActivePage={(page) => navigate(`/${page}`)} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/portfolio" element={<PortfolioWebPage />} />
          <Route path="*" element={<HomePage setActivePage={(page) => navigate(`/${page}`)} />} />
        </Routes>
      </main>
      {!hasOwnFooter && (
        <Footer setActivePage={(page) => navigate(`/${page}`)} />
      )}
      <FomoNotification />
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
