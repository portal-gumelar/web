import { PieChart, TrendingUp, Users, Activity, CheckCircle2 } from 'lucide-react';

export default function TransparansiPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <PieChart size={14} />
            TRANSPARANSI DANA DESA
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-800 mb-3">
            Keterbukaan <span className="text-indigo-600">Informasi Publik</span>
          </h1>
          <div className="w-16 h-1 bg-indigo-500 mx-auto rounded-full mb-4" />
          <p className="text-gray-500 max-w-2xl mx-auto">
            Wujud komitmen Pemerintah Desa Gumelar dalam mengelola APBDesa secara transparan, akuntabel, dan partisipatif demi kesejahteraan warga.
          </p>
        </div>

        {/* Ringkasan APBDesa */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="text-sm font-semibold text-gray-500 mb-1">Total Pendapatan (2025)</div>
            <div className="text-3xl font-black text-gray-800 mb-2">Rp 1.85 M</div>
            <div className="text-xs text-green-600 font-medium flex items-center gap-1">
              <TrendingUp size={12} /> Naik 5% dari tahun lalu
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="text-sm font-semibold text-gray-500 mb-1">Total Belanja (2025)</div>
            <div className="text-3xl font-black text-gray-800 mb-2">Rp 1.80 M</div>
            <div className="text-xs text-blue-600 font-medium flex items-center gap-1">
              <Activity size={12} /> Sesuai target RAPBDesa
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="text-sm font-semibold text-gray-500 mb-1">SiLPA / Sisa Lebih</div>
            <div className="text-3xl font-black text-gray-800 mb-2">Rp 50 Jt</div>
            <div className="text-xs text-gray-500 font-medium">
              Dialokasikan untuk dana cadangan darurat
            </div>
          </div>
        </div>

        {/* Grafik Alokasi */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <PieChart className="text-indigo-600" />
            Alokasi Belanja Desa 2025
          </h2>

          <div className="space-y-6">
            {/* Bidang 1 */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <div className="font-bold text-gray-800 flex items-center gap-2">
                    Bidang Pembangunan Desa
                  </div>
                  <div className="text-xs text-gray-500">Infrastruktur, jalan, fasilitas publik</div>
                </div>
                <div className="font-black text-indigo-700">45%</div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 h-4 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            {/* Bidang 2 */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <div className="font-bold text-gray-800 flex items-center gap-2">
                    Bidang Pemberdayaan Masyarakat
                  </div>
                  <div className="text-xs text-gray-500">Pelatihan UMKM, Pertanian, Posyandu</div>
                </div>
                <div className="font-black text-green-600">30%</div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                <div className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>

            {/* Bidang 3 */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <div className="font-bold text-gray-800 flex items-center gap-2">
                    Penyelenggaraan Pemerintahan
                  </div>
                  <div className="text-xs text-gray-500">Operasional desa, gaji perangkat, pelayanan RT/RW</div>
                </div>
                <div className="font-black text-blue-500">20%</div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-4 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>

            {/* Bidang 4 */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <div className="font-bold text-gray-800 flex items-center gap-2">
                    Pembinaan Kemasyarakatan
                  </div>
                  <div className="text-xs text-gray-500">Karang taruna, keagamaan, olahraga</div>
                </div>
                <div className="font-black text-orange-500">5%</div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-4 rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Proyek Berjalan */}
        <div className="bg-indigo-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-6">Proyek Unggulan 2025</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-5 border border-white/20 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg">Betonisasi Jalan Dusun II</h4>
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">Selesai</span>
                </div>
                <p className="text-indigo-200 text-sm mb-3">Panjang: 500m. Anggaran: Rp 150.000.000</p>
                <div className="flex items-center gap-2 text-xs font-semibold text-green-300">
                  <CheckCircle2 size={14} /> Tepat waktu & sesuai RAB
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-5 border border-white/20 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg">Rehab Balai Pertemuan</h4>
                  <span className="bg-yellow-500 text-indigo-900 text-xs px-2 py-1 rounded-full font-bold">75% Berjalan</span>
                </div>
                <p className="text-indigo-200 text-sm mb-3">Perbaikan atap dan lantai. Anggaran: Rp 80.000.000</p>
                <div className="w-full bg-indigo-950/50 rounded-full h-2 overflow-hidden">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative icons */}
          <Users className="absolute -bottom-10 -right-10 text-white/5" size={200} />
        </div>

      </div>
    </div>
  );
}
