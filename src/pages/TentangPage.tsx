import { Heart, Target, Eye, Users, MapPin, Phone, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Users size={14} />
            TENTANG KAMI
          </div>
          <h1 className="text-4xl font-black text-gray-800 mb-3">
            Mengenal <span className="text-green-700">Gumelar.ID</span>
          </h1>
          <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full mb-4" />
          <p className="text-gray-500 max-w-xl mx-auto">
            Portal digital yang lahir dari semangat kebersamaan masyarakat Gumelar
          </p>
        </motion.div>

        {/* About Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 text-white mb-8 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="relative z-10">
            <div className="text-5xl font-black mb-3">GUMELAR<span className="text-yellow-400">.ID</span></div>
            <p className="text-green-200 text-lg leading-relaxed mb-6">
              <strong className="text-white">Gumelar.ID</strong> adalah portal komunitas digital yang dibangun untuk
              dan oleh masyarakat Gumelar, Banyumas, Jawa Tengah. Kami hadir sebagai jembatan
              antara warga lokal, pelaku UMKM, dan diaspora Gumelar di seluruh dunia.
            </p>
            <p className="text-green-200 leading-relaxed">
              Dengan semangat gotong royong yang telah menjadi jiwa masyarakat Gumelar,
              portal ini menjadi ruang bersama untuk berbagi informasi, menampilkan karya,
              dan memajukan perekonomian lokal secara digital.
            </p>
          </div>
        </motion.div>

        {/* Sejarah Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
              <BookOpen className="text-amber-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-800">Sejarah & Asal Usul</h2>
              <p className="text-sm text-gray-500">Legenda Adipati Munding Wilis & Makna Gumelar</p>
            </div>
          </div>

          <div className="prose prose-green max-w-none text-gray-600 leading-relaxed space-y-4 text-sm md:text-base">
            <p>
              Nama <strong className="text-green-700 font-bold">Gumelar</strong> tidak lepas dari cerita rakyat yang melegenda di wilayah Banyumas Barat, khususnya berkaitan dengan masa Kerajaan Galuh Pakuan.
            </p>
            
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-xl italic">
              "Kisah ini bermula saat istri Adipati Munding Wilis mengidam daging kijang berkaki putih, yang membawa rombongan Adipati berburu hingga ke pedalaman hutan Gumelar."
            </div>

            <p>
              Dalam perjalanan perburuannya menunggangi kuda <em className="text-gray-800">Dawuk Mruyung</em>, rombongan sempat tersesat dan berhadapan dengan kelompok perampok Abulawang. Namun, di balik rintangan tersebut, mereka menemukan sebuah dataran yang sangat indah.
            </p>

            <p>
              Nama <strong>Gumelar</strong> sendiri berasal dari bahasa Jawa yang berarti <span className="text-amber-700 font-semibold italic">"terhampar"</span> atau <span className="text-amber-700 font-semibold italic">"digelar"</span>. Konon, saat rombongan sampai di wilayah ini, mereka melihat pemandangan alam yang sangat luas dan hijau, tampak seolah-olah seperti permadani raksasa yang sedang <strong>digelar</strong> di permukaan bumi.
            </p>
            
            <p>
              Sejak saat itulah, wilayah yang subur dan asri ini dikenal dengan nama Gumelar, yang hingga kini terus berkembang menjadi pusat kreativitas dan kebersamaan masyarakatnya.
            </p>
          </div>
        </motion.div>

        {/* Visi Misi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Eye className="text-blue-600" size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Visi</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Menjadi portal digital terdepan yang memperkuat identitas, kreativitas,
              dan perekonomian masyarakat Gumelar di era digital.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Target className="text-green-600" size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Misi</h3>
            </div>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Menyediakan platform informasi lokal yang terpercaya</li>
              <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Mendukung pertumbuhan UMKM dan kreator lokal</li>
              <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Menjadi wadah ekspresi budaya dan kreativitas</li>
              <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Menghubungkan warga Gumelar di seluruh penjuru dunia</li>
            </ul>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Heart className="text-red-500" size={20} />
            Nilai-Nilai Kami
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { emoji: '🤝', title: 'Gotong Royong', desc: 'Semangat kebersamaan dalam membangun komunitas' },
              { emoji: '🛡️', title: 'Netral & Aman', desc: 'Bebas dari politik dan SARA demi harmoni bersama' },
              { emoji: '🌱', title: 'Inklusif', desc: 'Terbuka untuk semua warga tanpa terkecuali' },
            ].map((v) => (
              <div key={v.title} className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-3xl mb-2">{v.emoji}</div>
                <div className="font-bold text-gray-800 mb-1">{v.title}</div>
                <div className="text-xs text-gray-500">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer Box */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-black text-red-700 mb-3 flex items-center gap-2">
            ⚠️ DISCLAIMER PENTING
          </h3>
          <div className="space-y-3 text-sm text-red-700">
            <div className="flex items-start gap-3 bg-red-100 rounded-xl p-3">
              <span className="text-xl">🚫</span>
              <div>
                <strong>NO POLITIK</strong> — Konten yang bermuatan politik praktis, kampanye, atau provokasi politik <em>tidak diperkenankan</em> di platform ini.
              </div>
            </div>
            <div className="flex items-start gap-3 bg-red-100 rounded-xl p-3">
              <span className="text-xl">🚫</span>
              <div>
                <strong>NO SARA</strong> — Konten yang mengandung unsur Suku, Agama, Ras, dan Antargolongan yang bersifat provokatif <em>dilarang keras</em>.
              </div>
            </div>
            <div className="flex items-start gap-3 bg-red-100 rounded-xl p-3">
              <span className="text-xl">📋</span>
              <div>
                <strong>TANGGUNG JAWAB PENULIS</strong> — Semua informasi yang disampaikan melalui platform ini menjadi tanggung jawab penuh penulis/pengirim.
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-green-700 text-white rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4">Hubungi Kami</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-green-300" />
              <span className="text-green-100">Kecamatan Gumelar, Banyumas, Jawa Tengah</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-green-300" />
              <span className="text-green-100">Hubungi via Member Portal</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
