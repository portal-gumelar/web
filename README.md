# GUMELAR.ID — Community Creative Portal 🌾

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/tech-React-61DAFB)
![Vite](https://img.shields.io/badge/tech-Vite-646CFF)

**GUMELAR.ID** adalah portal interaktif digital yang dirancang untuk memberdayakan masyarakat dan UMKM di Desa Gumelar. Aplikasi ini bukan sekadar website informasi, melainkan sebuah ekosistem digital mandiri untuk kolaborasi, kreativitas, dan efisiensi layanan masyarakat.

---

## ✨ Fitur Unggulan

### 🛍️ Layanan UMKM & Ekonomi
*   **Kasir Gumelar (POS)**: Aplikasi kasir sederhana untuk UMKM mencatat penjualan, hitung kembalian, dan cetak struk (Tersimpan di LocalStorage).
*   **Galeri Portofolio Web**: Showcase contoh desain website untuk UMKM yang bisa langsung dipesan oleh member.
*   **Info Jasa & Usaha**: Direktori terpusat untuk mempromosikan produk lokal langsung terhubung ke WhatsApp.

### 📄 Layanan Mandiri Member
*   **E-Surat Online**: Pengajuan administrasi (Domisili, SKU, SKTM, dll) yang langsung diteruskan ke Admin.
*   **Image Optimizer**: Kompres foto hingga 90% secara instan untuk kebutuhan upload web atau kirim chat.
*   **QR Code Generator**: Buat kode QR untuk WhatsApp, Lokasi Toko, atau Menu Produk secara gratis.

### 📰 Pusat Informasi
*   **Informasi Gumelar**: Berita terkini dan jadwal kegiatan masyarakat.
*   **Ruang Kreatif**: Wadah publikasi karya, inovasi, dan aspirasi warga.

---

## 🛠️ Tech Stack & Architecture

Aplikasi ini dibangun dengan standar industri modern:

*   **Core**: React 18 + TypeScript
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS & Framer Motion (Animations)
*   **Icons**: Lucide React
*   **Persistence**: Browser LocalStorage & (Planned) Laravel API + PostgreSQL
*   **Deployment**: Vercel (SPA Optimized)

---

## 📂 Struktur Proyek (Standard Industry)

```text
src/
├── assets/         # Aset statis (Gambar, Ikon, Logo)
├── components/     # Komponen UI Reusable
│   ├── layout/     # Navbar, Footer
│   └── ui/         # Komponen atomik (Buttons, Modals, Cards)
├── data/           # Data mock dan konstanta
├── hooks/          # Custom React Hooks
├── pages/          # Komponen Halaman Utama
├── services/       # Integrasi API & Logic Backend
├── types/          # TypeScript Definitions
└── utils/          # Helper functions & Konfigurasi API
```

---

## 💻 Panduan Pengembangan

### Instalasi
```bash
# Clone repository
git clone https://github.com/portal-gumelar/web.git

# Masuk ke folder
cd gumelar-portal

# Instal dependencies
npm install

# Jalankan server development
npm run dev
```

---

## 🛡️ Keamanan & Privasi
*   Pemisahan jalur login Admin (`/portal-admin`) dan Member (`/login`).
*   Proteksi layanan eksklusif member dengan sistem Lock Gate.
*   Pesan "No Politik & No SARA" terintegrasi di seluruh platform.

---

## 👨‍💻 Developer
Dikelola dan dikembangkan oleh **[LacosDev.com](https://lacosdev.com)**.

---
*Membangun Komunitas Digital yang Mandiri dan Kreatif.*
