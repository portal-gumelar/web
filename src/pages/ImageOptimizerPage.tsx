import { useState, useRef } from 'react';
import { Image as ImageIcon, Upload, Download, CheckCircle, AlertCircle, Trash2, Zap } from 'lucide-react';
import imageCompression from 'browser-image-compression';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageOptimizerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFile = async (f: File) => {
    if (!f.type.startsWith('image/')) {
      alert('Tolong pilih file gambar (JPG/PNG)!');
      return;
    }
    setFile(f);
    setOriginalSize(f.size);
    setPreview(URL.createObjectURL(f));
    setStatus('idle');
  };

  const compressImage = async () => {
    if (!file) return;
    setStatus('loading');
    
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };

    try {
      const result = await imageCompression(file, options);
      setCompressedFile(result);
      setCompressedSize(result.size);
      setStatus('done');
    } catch (error) {
      console.error(error);
      setStatus('idle');
    }
  };

  const handleDownload = () => {
    if (!compressedFile) return;
    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = `optimized_${file?.name}`;
    a.click();
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setCompressedFile(null);
    setStatus('idle');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="text-green-600" size={36} />
          </div>
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            ✨ LAYANAN GRATIS MEMBER
          </div>
          <h1 className="text-4xl font-black text-gray-800 mb-2">Image Optimizer</h1>
          <p className="text-gray-500">Mengecilkan ukuran foto hingga 90% tanpa mengurangi kualitas secara drastis</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 sm:p-10">
          {!file ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-4 border-dashed border-gray-100 rounded-[2rem] p-16 text-center hover:border-green-400 hover:bg-green-50 transition-all cursor-pointer group"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Upload size={32} className="text-gray-400 group-hover:text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Pilih atau Seret Foto</h3>
              <p className="text-gray-400 text-sm">Mendukung JPG, PNG, WEBP (Maks 10MB)</p>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2 aspect-square rounded-3xl overflow-hidden bg-gray-100 border border-gray-100">
                  <img src={preview!} alt="Original" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-center space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-500 font-medium">Ukuran Asli</span>
                      <span className="font-bold text-gray-800">{formatSize(originalSize)}</span>
                    </div>
                    {status === 'done' && (
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="text-green-600 font-bold">Ukuran Baru</span>
                        <div className="text-right">
                          <span className="font-bold text-green-700">{formatSize(compressedSize)}</span>
                          <span className="block text-[10px] text-green-500 font-black uppercase">Hemat {Math.round((1 - compressedSize/originalSize) * 100)}%</span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {status === 'idle' && (
                    <button 
                      onClick={compressImage}
                      className="w-full py-4 bg-slate-900 text-white font-black text-lg rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                    >
                      <Zap size={20} className="text-amber-400" /> Optimasi Sekarang
                    </button>
                  )}

                  {status === 'loading' && (
                    <div className="text-center p-6 bg-gray-50 rounded-2xl">
                      <RefreshCw className="animate-spin text-green-500 mx-auto mb-2" size={32} />
                      <p className="font-bold text-gray-600">Sedang Mengecilkan...</p>
                    </div>
                  )}

                  {status === 'done' && (
                    <div className="space-y-3">
                      <button 
                        onClick={handleDownload}
                        className="w-full py-4 bg-green-600 text-white font-black text-lg rounded-2xl shadow-xl hover:bg-green-500 transition-all flex items-center justify-center gap-2"
                      >
                        <Download size={20} /> Unduh Hasil
                      </button>
                      <button onClick={reset} className="w-full py-3 text-gray-400 font-bold hover:text-red-500 transition-colors flex items-center justify-center gap-2">
                        <Trash2 size={16} /> Hapus & Mulai Lagi
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-100 rounded-3xl p-6 flex items-start gap-4">
          <AlertCircle className="text-amber-500 flex-shrink-0" size={24} />
          <div>
            <h4 className="font-bold text-amber-800 mb-1">Kenapa Harus Mengecilkan Foto?</h4>
            <p className="text-sm text-amber-700 leading-relaxed">
              Foto dari HP biasanya berukuran 3MB - 5MB. Jika diupload ke website atau dikirim via chat, kuota cepat habis dan loading jadi lambat. Alat ini membuat foto Anda jadi sekitar 300KB (10x lebih kecil) dengan kualitas yang tetap tajam!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
