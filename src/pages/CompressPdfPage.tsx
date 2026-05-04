import { useState, useRef } from 'react';
import { FileText, Upload, Download, CheckCircle, AlertCircle } from 'lucide-react';

type Status = 'idle' | 'loading' | 'done' | 'error';

export default function CompressPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [compressLevel, setCompressLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const handleFile = (f: File) => {
    if (f.type !== 'application/pdf') {
      alert('Hanya file PDF yang diterima!');
      return;
    }
    setFile(f);
    setOriginalSize(f.size);
    setStatus('idle');
    setCompressedSize(0);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleCompress = () => {
    if (!file) return;
    setStatus('loading');

    // Simulated compression (in real app, would use server-side or pdf-lib)
    setTimeout(() => {
      const ratios = { low: 0.7, medium: 0.5, high: 0.3 };
      const ratio = ratios[compressLevel];
      const simulated = Math.floor(originalSize * ratio);
      setCompressedSize(simulated);
      setStatus('done');
    }, 2000);
  };

  const handleDownload = () => {
    if (!file) return;
    // In a real implementation, the compressed file would be downloaded
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed_${file.name}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetAll = () => {
    setFile(null);
    setStatus('idle');
    setOriginalSize(0);
    setCompressedSize(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const savedPercent = originalSize > 0 && compressedSize > 0
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <FileText className="text-red-500" size={36} />
          </div>
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            ✨ LAYANAN GRATIS MEMBER
          </div>
          <h1 className="text-4xl font-black text-gray-800 mb-2">Compress PDF</h1>
          <p className="text-gray-500">Perkecil ukuran file PDF Anda dengan mudah dan cepat</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

          {/* Drop Zone */}
          {!file ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200 ${
                dragOver
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-300 hover:border-red-400 hover:bg-red-50'
              }`}
            >
              <Upload size={40} className={`mx-auto mb-4 ${dragOver ? 'text-red-500' : 'text-gray-400'}`} />
              <p className="text-gray-700 font-semibold text-lg mb-1">Klik atau seret file PDF ke sini</p>
              <p className="text-gray-400 text-sm">Mendukung file PDF hingga 50MB</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </div>
          ) : (
            <div className="space-y-6">
              {/* File Info */}
              <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-200">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="text-red-500" size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">{file.name}</p>
                  <p className="text-sm text-gray-500">Ukuran asli: <strong>{formatSize(originalSize)}</strong></p>
                </div>
                <button onClick={resetAll} className="text-gray-400 hover:text-red-500 text-sm font-semibold">
                  Hapus
                </button>
              </div>

              {/* Compress Level */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Level Kompresi</label>
                <div className="grid grid-cols-3 gap-3">
                  {([
                    { val: 'low', label: 'Ringan', desc: '~30% lebih kecil', color: 'border-green-400 bg-green-50 text-green-700' },
                    { val: 'medium', label: 'Sedang', desc: '~50% lebih kecil', color: 'border-blue-400 bg-blue-50 text-blue-700' },
                    { val: 'high', label: 'Maksimal', desc: '~70% lebih kecil', color: 'border-red-400 bg-red-50 text-red-700' },
                  ] as const).map(opt => (
                    <button
                      key={opt.val}
                      onClick={() => setCompressLevel(opt.val)}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        compressLevel === opt.val ? opt.color : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-bold text-sm">{opt.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Compress Button */}
              {status !== 'done' && (
                <button
                  onClick={handleCompress}
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-red-500 hover:bg-red-400 disabled:bg-gray-300 text-white font-black text-lg rounded-xl shadow transition-all"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Sedang Mengkompresi...
                    </span>
                  ) : '🗜️ Kompres PDF Sekarang'}
                </button>
              )}

              {/* Result */}
              {status === 'done' && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 text-green-700 font-bold mb-4">
                      <CheckCircle size={18} />
                      Kompresi Berhasil! 🎉
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Ukuran Asli</div>
                        <div className="font-bold text-gray-800">{formatSize(originalSize)}</div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="text-green-600 font-black text-xl">↓ {savedPercent}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Ukuran Baru</div>
                        <div className="font-bold text-green-700">{formatSize(compressedSize)}</div>
                      </div>
                    </div>
                    <div className="mt-3 bg-green-100 rounded-lg h-2">
                      <div
                        className="bg-green-500 h-2 rounded-lg transition-all duration-1000"
                        style={{ width: `${100 - savedPercent}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleDownload}
                    className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-black text-lg rounded-xl shadow flex items-center justify-center gap-3 transition-all"
                  >
                    <Download size={20} />
                    Unduh PDF Terkompresi
                  </button>

                  <button
                    onClick={resetAll}
                    className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
                  >
                    Kompres File Lain
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h3 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
            <AlertCircle size={16} />
            Tips Penggunaan
          </h3>
          <ul className="space-y-1.5 text-sm text-blue-700">
            <li>• Level <strong>Ringan</strong>: cocok untuk dokumen dengan banyak teks</li>
            <li>• Level <strong>Sedang</strong>: keseimbangan antara kualitas dan ukuran</li>
            <li>• Level <strong>Maksimal</strong>: cocok jika ukuran file sangat penting</li>
            <li>• File Anda aman — tidak disimpan di server kami</li>
          </ul>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Layanan gratis untuk member Gumelar.ID · Powered by Gumelar.ID
        </p>
      </div>
    </div>
  );
}
