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

export interface Comment {
  id: string;
  penulis: string;
  konten: string;
  tanggal: string;
  isAdmin?: boolean;
  balasan?: Comment[];
}

export interface BeritaItem {
  id: string;
  judul: string;
  konten: string;
  penulis: string;
  tanggal: string;
  kategori: string;
  gambar?: string;
  youtubeUrl?: string;
  views: number;
  komentar?: Comment[];
}

export interface AgendaItem {
  id: string;
  title: string;
  tgl: string;
  bln: string;
  time: string;
  loc: string;
  deskripsi: string;
  penulis: string;
  gambar?: string;
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

export interface User {
  name: string;
  role: 'admin' | 'member' | 'guest';
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
  | 'qr-code'
  | 'image-optimizer'
  | 'portfolio'
  | 'kasir'
  | 'member-tools'
  | 'login';
