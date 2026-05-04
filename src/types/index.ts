export interface Member {
  id: string;
  nama: string;
  alamat: string;
  kategori: 'produksi' | 'jasa' | 'pjtki';
  subKategori: string;
  deskripsi: string;
  kontak?: string;
  linkUrl?: string;
  destinasiPJTKI?: string;
  tanggalDaftar: string;
  avatar?: string;
}

export interface BeritaItem {
  id: string;
  judul: string;
  konten: string;
  penulis: string;
  tanggal: string;
  kategori: string;
  gambar?: string;
  views: number;
}

export interface KaryaItem {
  id: string;
  judul: string;
  deskripsi: string;
  penulis: string;
  tanggal: string;
  jenis: string;
  gambar?: string;
  likes: number;
}

export type ActivePage = 
  | 'home' 
  | 'tentang' 
  | 'informasi' 
  | 'kreatif' 
  | 'jasa' 
  | 'layanan' 
  | 'daftar-member'
  | 'compress-pdf'
  | 'buat-cv'
  | 'donasi'
  | 'surat-online'
  | 'transparansi';
