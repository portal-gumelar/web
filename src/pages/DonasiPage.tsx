import { Coffee, Heart, CreditCard, Smartphone, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const donasiNominal = [5000, 10000, 15000, 20000, 25000, 50000];

export default function DonasiPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedNominal, setSelectedNominal] = useState<number | null>(null);
  const [customNominal, setCustomNominal] = useState('');
  const [showThanks, setShowThanks] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const rekening = [
    { bank: 'BRI', no: '1234-5678-9012-345', nama: 'Gumelar Community', logo: '🏦' },
    { bank: 'BCA', no: '0987-6543-2100', nama: 'Gumelar Community', logo: '🏦' },
    { bank: 'DANA', no: '0812-3456-7890', nama: 'Sarilane - Gumelar.ID', logo: '💳' },
    { bank: 'GoPay', no: '0812-3456-7890', nama: 'Sarilane - Gumelar.ID', logo: '💚' },
    { bank: 'OVO', no: '0812-3456-7890', nama: 'Sarilane - Gumelar.ID', logo: '💜' },
  ];

  return (
    <div className="min-h-screen bg-amber-50 pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Coffee className="text-amber-600" size={44} />
          </div>
          <h1 className="text-4xl font-black text-gray-800 mb-2">
            Donasi <span className="text-amber-600">Sruput Kopi</span>
          </h1>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full mb-4" />
          <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
            Bantu kami menjaga Gumelar.ID tetap berjalan dengan berdonasi senilai
            "<em>sruput kopi bareng</em>" untuk biaya perawatan dan update website 🙏
          </p>
        </div>

        {/* Impact Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-200 p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Heart className="text-red-500" size={18} />
            Donasi Anda Digunakan Untuk:
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { emoji: '🌐', label: 'Biaya Domain & Hosting', desc: 'Agar website tetap online' },
              { emoji: '🔧', label: 'Pemeliharaan Server', desc: 'Kecepatan & keamanan data' },
              { emoji: '✨', label: 'Fitur Baru', desc: 'Pengembangan layanan member' },
              { emoji: '📱', label: 'Update Konten', desc: 'Informasi yang selalu fresh' },
            ].map(item => (
              <div key={item.label} className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                <div className="text-xl mb-1">{item.emoji}</div>
                <div className="text-xs font-bold text-gray-700">{item.label}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Nominal Selection */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">☕ Pilih Nominal Donasi</h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {donasiNominal.map(n => (
              <button
                key={n}
                onClick={() => { setSelectedNominal(n); setCustomNominal(''); }}
                className={`py-3 px-2 rounded-xl text-sm font-bold border-2 transition-all ${
                  selectedNominal === n && !customNominal
                    ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-md'
                    : 'border-gray-200 hover:border-amber-300 text-gray-700'
                }`}
              >
                Rp {n.toLocaleString('id-ID')}
              </button>
            ))}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Atau masukkan nominal lain:</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-semibold">Rp</span>
              <input
                type="number"
                value={customNominal}
                onChange={e => { setCustomNominal(e.target.value); setSelectedNominal(null); }}
                className="w-full border-2 border-gray-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                placeholder="Nominal bebas..."
              />
            </div>
          </div>
        </div>

        {/* Rekening */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
            <CreditCard size={18} className="text-blue-500" />
            Transfer ke Rekening Berikut:
          </h3>
          <p className="text-xs text-gray-500 mb-4">a/n <strong>Sarilane</strong> · Pengelola Gumelar.ID</p>
          <div className="space-y-3">
            {rekening.map(rek => (
              <div key={rek.bank} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-amber-200 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl shadow flex items-center justify-center text-lg border border-gray-200">
                    {rek.logo}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-sm">{rek.bank}</div>
                    <div className="text-gray-600 text-sm font-mono">{rek.no}</div>
                    <div className="text-xs text-gray-400">{rek.nama}</div>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(rek.no, rek.bank)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    copied === rek.bank
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                  }`}
                >
                  {copied === rek.bank ? (
                    <><CheckCircle size={12} /> Tersalin!</>
                  ) : (
                    <><Copy size={12} /> Salin</>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Konfirmasi */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Smartphone size={18} className="text-green-500" />
            Konfirmasi Donasi
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Setelah transfer, konfirmasi via WhatsApp ke nomor berikut agar kami bisa mencatat donasi Anda:
          </p>
          <a
            href="https://wa.me/6281234567890?text=Halo,%20saya%20sudah%20berdonasi%20ke%20Gumelar.ID%20%F0%9F%99%8F"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all shadow"
          >
            <span className="text-xl">💬</span>
            Konfirmasi via WhatsApp
          </a>
        </div>

        {/* Thanks */}
        {showThanks && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-10 text-center max-w-sm shadow-2xl">
              <div className="text-6xl mb-4">☕</div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">Matur Nuwun!</h3>
              <p className="text-gray-600 mb-6">Terima kasih atas dukungan Anda untuk Gumelar.ID. Donasi Anda sangat berarti! 🙏</p>
              <button onClick={() => setShowThanks(false)} className="px-8 py-3 bg-amber-500 text-white font-bold rounded-xl">
                Tutup
              </button>
            </div>
          </div>
        )}

        {/* Note */}
        <div className="bg-amber-100 border border-amber-300 rounded-2xl p-5 text-center">
          <p className="text-amber-800 text-sm font-medium">
            ☕ "<em>Sruput kopi siji, website terus mlaku!</em>"<br />
            <span className="text-xs text-amber-700 mt-1 block">Tidak ada nominal minimum. Berapapun kontribusi Anda sangat kami hargai.</span>
          </p>
          <p className="text-amber-600 text-xs mt-2 font-bold">— Tim Gumelar.ID · Sarilane</p>
        </div>

      </div>
    </div>
  );
}
