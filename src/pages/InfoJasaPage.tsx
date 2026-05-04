import { useState } from 'react';
import { Briefcase, Phone, MapPin, ExternalLink, Search, Globe } from 'lucide-react';
import { mockMembers } from '../data/mockData';
import { Member } from '../types';

const kategoriLabel = {
  produksi: 'Produksi',
  jasa: 'Jasa',
  pjtki: 'PJTKI / Tenaga Kerja LN',
};

const subKategoriLabel: Record<string, string> = {
  makanan: '🍱 Makanan',
  minuman: '🥤 Minuman',
  tekstil: '👕 Tekstil',
  bengkel: '🔧 Bengkel',
  sablon: '🖨️ Sablon / Digital Printing',
  'pertukangan-kayu': '🪵 Pertukangan Kayu',
  'pertukangan-besi': '⚙️ Pertukangan Besi',
  'pertukangan-aluminium': '🔩 Pertukangan Aluminium',
  'tukang-traktor': '🚜 Tukang Traktor',
  'tenaga-lepas-bedog': '🌾 Tukang Bedog',
  'tenaga-lepas-tandur': '🌱 Tukang Tandur',
  'tenaga-lepas-kebun': '🌿 Tukang Kebun',
  'tenaga-lepas-matun': '🧹 Tukang Matun',
  'tenaga-lepas-ngarit': '🌾 Tukang Ngarit Pari',
  taiwan: '🇹🇼 Taiwan',
  hongkong: '🇭🇰 Hong Kong',
  jepang: '🇯🇵 Jepang',
  eropa: '🇪🇺 Eropa',
  australia: '🇦🇺 Australia',
  dll: '🌍 Negara Lain',
};

const warnaBadge: Record<string, string> = {
  produksi: 'bg-green-100 text-green-700',
  jasa: 'bg-blue-100 text-blue-700',
  pjtki: 'bg-purple-100 text-purple-700',
};

export default function InfoJasaPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'semua' | 'produksi' | 'jasa' | 'pjtki'>('semua');

  const filtered = mockMembers.filter(m => {
    const matchSearch = m.nama.toLowerCase().includes(search.toLowerCase()) ||
      m.deskripsi.toLowerCase().includes(search.toLowerCase()) ||
      m.subKategori.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'semua' || m.kategori === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Briefcase size={14} />
            INFORMASI JASA & USAHA
          </div>
          <h1 className="text-4xl font-black text-gray-800 mb-3">
            Direktori <span className="text-orange-600">Usaha & Jasa</span>
          </h1>
          <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full mb-4" />
          <p className="text-gray-500">Temukan pelaku usaha, UMKM, dan penyedia jasa terpercaya di Gumelar</p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama, jenis usaha, atau layanan..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {(['semua', 'produksi', 'jasa', 'pjtki'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                    filter === f
                      ? 'bg-orange-500 text-white shadow'
                      : 'bg-gray-100 text-gray-600 hover:bg-orange-50'
                  }`}
                >
                  {f === 'semua' ? 'Semua' :
                   f === 'produksi' ? '🏭 Produksi' :
                   f === 'jasa' ? '🔧 Jasa' : '✈️ PJTKI'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-4">{filtered.length} usaha/jasa ditemukan</p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((member: Member) => (
            <div key={member.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center text-white font-black text-lg shadow-md">
                    {member.nama.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{member.nama}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${warnaBadge[member.kategori]}`}>
                      {kategoriLabel[member.kategori]}
                    </span>
                  </div>
                </div>
                {member.kategori === 'pjtki' && (
                  <Globe size={20} className="text-purple-500 flex-shrink-0" />
                )}
              </div>

              <div className="mb-3">
                <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                  {subKategoriLabel[member.subKategori] || member.subKategori}
                </span>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">{member.deskripsi}</p>

              <div className="space-y-2 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MapPin size={12} className="text-gray-400" />
                  {member.alamat}
                </div>
                {member.kontak && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Phone size={12} className="text-green-500" />
                      <a href={`tel:${member.kontak}`} className="hover:text-green-600 font-medium">
                        {member.kontak}
                      </a>
                    </div>
                    <a 
                      href={`https://wa.me/${member.kontak.replace(/\D/g, '')}?text=Halo%20${encodeURIComponent(member.nama)},%20saya%20melihat%20info%20usaha%20Anda%20di%20Portal%20Gumelar...`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-lg text-xs font-bold transition-all"
                    >
                      Pesan via WA
                    </a>
                  </div>
                )}
                {member.linkUrl && (
                  <div className="flex items-center gap-2 text-xs">
                    <ExternalLink size={12} className="text-blue-500" />
                    <a href={member.linkUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      Kunjungi Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">Tidak ada hasil yang ditemukan</p>
            <p className="text-gray-400 text-sm">Coba dengan kata kunci lain</p>
          </div>
        )}

        {/* Tenaga Lepas Section */}
        <div className="mt-12 bg-gradient-to-br from-green-700 to-green-900 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-black mb-3">🌾 Tenaga Lepas Pertanian</h3>
          <p className="text-green-200 mb-6">Cari dan temukan tenaga lepas pertanian yang berpengalaman di Gumelar</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: 'Tukang Bedog', emoji: '🔪', desc: 'Ahli pangkas dan olah lahan' },
              { label: 'Tukang Tandur', emoji: '🌱', desc: 'Penanaman padi & palawija' },
              { label: 'Tukang Kebun', emoji: '🌿', desc: 'Perawatan kebun & tanaman' },
              { label: 'Tukang Matun', emoji: '🧹', desc: 'Pembersihan gulma sawah' },
              { label: 'Tukang Ngarit Pari', emoji: '🌾', desc: 'Panen padi tradisional' },
              { label: 'Tukang Traktor', emoji: '🚜', desc: 'Olah tanah mekanis' },
            ].map(t => (
              <div key={t.label} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
                <div className="text-2xl mb-1">{t.emoji}</div>
                <div className="font-bold text-sm">{t.label}</div>
                <div className="text-xs text-green-200">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PJTKI Section */}
        <div className="mt-6 bg-gradient-to-br from-purple-700 to-purple-900 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-black mb-2">✈️ Penyalur Tenaga Kerja (PJTKI)</h3>
          <p className="text-purple-200 mb-6">Informasi penempatan tenaga kerja ke luar negeri melalui PJTKI resmi</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { flag: '🇹🇼', negara: 'Taiwan' },
              { flag: '🇭🇰', negara: 'Hong Kong' },
              { flag: '🇯🇵', negara: 'Jepang' },
              { flag: '🇪🇺', negara: 'Eropa' },
              { flag: '🇦🇺', negara: 'Australia' },
              { flag: '🌍', negara: 'Negara Lain' },
            ].map(n => (
              <div key={n.negara} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20 text-center">
                <div className="text-3xl mb-1">{n.flag}</div>
                <div className="font-bold text-sm">{n.negara}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-purple-300">⚠️ Pastikan menggunakan PJTKI resmi dan terdaftar. Waspada penipuan.</p>
        </div>
      </div>
    </div>
  );
}
