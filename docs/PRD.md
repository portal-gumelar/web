# Product Requirements Document (PRD)
**Project Name:** Gumelar Community Portal
**Version:** 1.0.0
**Last Updated:** May 2026

---

## 1. Visi & Latar Belakang Produk
**Gumelar.ID** adalah portal digital yang dirancang sebagai ruang interaktif dan kreatif bagi masyarakat Desa Gumelar dan sekitarnya. Portal ini bertujuan untuk mempermudah akses informasi desa, memperkenalkan potensi lokal (UMKM & Jasa), memamerkan karya kreatif warga, dan menyediakan layanan administrasi serta fasilitas digital gratis secara terpadu.

## 2. Target Pengguna (User Personas)
1. **Warga Masyarakat Gumelar:** Mencari informasi desa, jadwal kegiatan, dan menggunakan layanan administrasi (E-Surat).
2. **Pelaku UMKM & Penyedia Jasa:** Ingin mempromosikan produk/jasa mereka agar mudah dihubungi oleh warga secara langsung melalui WhatsApp.
3. **Kreator Lokal:** Membutuhkan wadah (galeri digital) untuk memamerkan karya seni, tulisan, maupun produk kreatif lainnya.
4. **Perangkat Desa (Admin):** Menerima permohonan surat warga melalui WhatsApp dan memberikan informasi transparansi dana desa.

## 3. Ruang Lingkup Fitur (Features Scope)

### Fase 1: Prototype & Fungsionalitas Dasar (Saat Ini)
- **Beranda (Home):** Navigasi ke semua layanan utama dan statistik singkat.
- **Informasi & Berita:** Menampilkan artikel berita, pengumuman, dan *Kalender Kegiatan Desa* (Posyandu, Kerja Bakti, dll).
- **Ruang Kreatif:** Galeri karya digital masyarakat (foto, ilustrasi, tulisan).
- **Info Jasa (UMKM):** Direktori usaha lokal yang dilengkapi dengan tombol **"Pesan via WA"** untuk pemesanan instan.
- **Layanan Administrasi (E-Surat):** Formulir pengajuan surat administrasi (Pengantar, SKU, SKTM, dll) yang langsung diformat ke pesan WhatsApp Admin Desa.
- **Transparansi Dana Desa:** Visualisasi APBDesa menggunakan grafik responsif untuk alokasi dan realisasi anggaran pembangunan desa.
- **Layanan Gratis Member:** Tools digital seperti "Compress PDF" dan "Buat CV Lamaran Kerja".
- **Daftar Member & Donasi:** Form pendaftaran untuk komunitas dan halaman apresiasi "Sruput Kopi".

### Fase 2: Integrasi Backend & Database (Mendatang)
- **Autentikasi (Login/Register):** Sistem akun menggunakan Firebase Auth / Supabase.
- **Database Dinamis:** Migrasi dari `mockData.ts` ke database NoSQL/SQL (Firestore / PostgreSQL).
- **Dashboard Admin:** Panel khusus untuk perangkat desa untuk menyetujui E-Surat, menambah berita, dan memverifikasi member UMKM.

### Fase 3: Fitur Lanjutan (Masa Depan)
- **E-Commerce Lokal:** Sistem keranjang belanja (cart) ringan untuk produk UMKM desa.
- **Notifikasi Push/WhatsApp API:** Pemberitahuan otomatis status surat atau acara desa.
- **Integrasi Peta (GIS):** Pemetaan lokasi UMKM dan potensi pariwisata desa Gumelar.

## 4. Arsitektur & Teknologi (Tech Stack)
- **Frontend Framework:** React 18+ (dengan Vite)
- **Bahasa Pemrograman:** TypeScript
- **Styling:** Tailwind CSS
- **Icons & UI:** Lucide React
- **Charting/Visualisasi:** Recharts (atau Tailwind custom bars)
- **Routing:** State-based routing sederhana (akan ditingkatkan ke React Router v6 pada Fase 2)
- **Hosting / Deployment:** Vercel (direkomendasikan) / Netlify

## 5. Struktur Direktori Proyek
Proyek ini mengadopsi standar struktur React profesional:
- `/src/components/layout`: Komponen persisten seperti Navbar dan Footer.
- `/src/pages`: Komponen level halaman (Mis: `HomePage.tsx`, `SuratOnlinePage.tsx`).
- `/src/data`: Data statis (`mockData.ts`).
- `/src/types`: Definisi antarmuka TypeScript.
- `/src/utils`: Fungsi *helper* tambahan.
- `/docs`: Dokumen pendukung seperti PRD.

## 6. Kriteria Keberhasilan (Success Metrics)
- Peningkatan jumlah UMKM yang terdaftar di direktori.
- Penggunaan aktif fitur E-Surat oleh warga, yang mengurangi antrean fisik di balai desa.
- Keterlibatan warga (klik tombol "Pesan via WA") pada profil usaha lokal.
- Tidak adanya *downtime* atau *broken links* selama operasional standar.

---
*Dokumen ini merupakan "living document" yang akan terus diperbarui seiring berjalannya fase pengembangan produk.*
