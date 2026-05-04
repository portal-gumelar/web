# Gumelar Community Portal 🌾

![Gumelar Portal](public/images/hero-gumelar.jpg)

Portal interaktif digital untuk masyarakat Desa Gumelar dan sekitarnya. Aplikasi ini menyediakan informasi desa, direktori UMKM/jasa dengan integrasi WhatsApp langsung, layanan administrasi E-Surat, transparansi APBDesa, dan galeri karya kreatif.

## 🚀 Fitur Utama
1. **Beranda & Navigasi**: UI responsif dengan *state-based routing*.
2. **Informasi Desa**: Berita dan Kalender Kegiatan Desa.
3. **Info Jasa (UMKM)**: Direktori pelaku usaha dengan tombol pemesanan via WhatsApp.
4. **E-Surat Online**: Pengajuan administrasi desa mandiri langsung ke WhatsApp Admin.
5. **Transparansi**: Visualisasi interaktif APBDesa.
6. **Layanan Member**: Tools digital gratis seperti *Compress* PDF dan pembuat CV.

## 🛠️ Tech Stack
- **Frontend**: React (Vite), TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel

## 💻 Cara Menjalankan di Lokal (Development)

1. Clone repositori ini
2. Instal dependencies:
   ```bash
   npm install
   ```
3. Jalankan server lokal:
   ```bash
   npm run dev
   ```
4. Buka browser di `http://localhost:5173`

## 📦 Panduan Deployment (Vercel)
Aplikasi ini sudah dioptimasi untuk deployment ke Vercel. Telah disediakan file `vercel.json` untuk mencegah error *404 Not Found* saat *refresh* halaman (konfigurasi *Single Page Application*).

Langkah deploy:
1. Push proyek ini ke GitHub Anda.
2. Login ke [Vercel](https://vercel.com/) menggunakan akun GitHub.
3. Klik **"Add New"** > **"Project"** dan pilih repositori GitHub ini.
4. Framework Preset akan otomatis terdeteksi sebagai **Vite**.
5. Klik **"Deploy"** dan tunggu hingga selesai.

---
*Dikembangkan untuk kemajuan digital Desa Gumelar.*
