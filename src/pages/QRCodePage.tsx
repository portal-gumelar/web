import { useState } from 'react';
import { QrCode, Download, RefreshCw } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';

export default function QRCodePage() {
  const [text, setText] = useState('');

  const downloadQR = () => {
    const svg = document.getElementById('qr-svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'QR_GumelarID.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <QrCode className="text-amber-600" size={36} />
          </div>
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            ✨ LAYANAN GRATIS MEMBER
          </div>
          <h1 className="text-4xl font-black text-gray-800 mb-2">QR Code Generator</h1>
          <p className="text-gray-500">Buat kode QR untuk WhatsApp, Lokasi, atau Website UMKM Anda</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 sm:p-12">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1 w-full space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Masukkan Link / Teks</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Contoh: https://wa.me/628123456789 atau Nama Toko Anda"
                  className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-amber-100 focus:border-amber-400 outline-none resize-none h-32 transition-all"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setText('')}
                  className="px-5 py-3 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200 transition-all"
                >
                  <RefreshCw size={20} />
                </button>
                <button
                  onClick={downloadQR}
                  disabled={!text}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 disabled:bg-gray-300 transition-all shadow-lg"
                >
                  <Download size={18} /> Unduh PNG
                </button>
              </div>
            </div>

            <div className="w-64 h-64 bg-amber-50 rounded-[2rem] border-2 border-dashed border-amber-200 flex items-center justify-center p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
              {text ? (
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                  <QRCodeSVG
                    id="qr-svg"
                    value={text}
                    size={200}
                    level="H"
                    includeMargin={true}
                    imageSettings={{
                      src: "https://ik.imagekit.io/Gumelar/LogO/WhatsApp%20Image%202026-05-08%20at%2022.31.20.jpeg",
                      x: undefined,
                      y: undefined,
                      height: 40,
                      width: 40,
                      excavate: true,
                    }}
                  />
                </motion.div>
              ) : (
                <div className="text-center text-amber-300">
                  <QrCode size={48} className="mx-auto mb-2 opacity-30" />
                  <p className="text-xs font-bold uppercase tracking-widest">QR Preview</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Toko Online', desc: 'Link jualan Anda', icon: '🛍️' },
            { title: 'WhatsApp', desc: 'Chat otomatis', icon: '💬' },
            { title: 'Alamat', desc: 'Google Maps desa', icon: '📍' }
          ].map((item, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h4 className="font-bold text-gray-800 text-sm">{item.title}</h4>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
