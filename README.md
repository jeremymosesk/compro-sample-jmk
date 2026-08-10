# PT JMK Chemical Solutions

Website company profile berbasis **Astro SSR**, **Tailwind CSS**, **PostgreSQL**, dan **Drizzle ORM** untuk perusahaan distribusi bahan kimia.

## Fitur

- Halaman publik lengkap: Beranda, Tentang, Produk, Detail Produk, Layanan, dan Kontak
- Tombol WhatsApp mengambang di semua halaman
- Dashboard admin terlindungi cookie session (`/admin`)
- CRUD produk dan layanan
- Form untuk memperbarui informasi perusahaan
- Penyimpanan lead dari formulir kontak
- Seed data produk, layanan, kategori, dan company info dalam Bahasa Indonesia

## Teknologi

- Astro SSR + Node adapter
- Tailwind CSS
- PostgreSQL
- Drizzle ORM / Drizzle Kit
- TypeScript

## Menjalankan Proyek

1. Install dependency:

   ```bash
   npm install
   ```

2. Salin environment file:

   ```bash
   cp .env.example .env
   ```

3. Isi `DATABASE_URL` dan `SESSION_SECRET` pada file `.env`.

4. Siapkan tabel database:

   ```bash
   npm run db:push
   ```

5. Isi data awal:

   ```bash
   npm run db:seed
   ```

6. Jalankan server development:

   ```bash
   npm run dev
   ```

7. Buka `http://localhost:4321`.

## Login Admin

- URL: `/admin/login`
- Username: `admin`
- Password: `admin123`

## Script Penting

- `npm run dev` — menjalankan development server
- `npm run build` — build produksi Astro SSR
- `npm run check` — validasi tipe Astro
- `npm run db:generate` — generate migration Drizzle
- `npm run db:push` — sinkronkan schema ke PostgreSQL
- `npm run db:seed` — isi data awal company profile

## Catatan

- Semua konten ditulis dalam Bahasa Indonesia.
- Bila database belum dikonfigurasi, halaman publik tetap menampilkan data seed agar proses pengembangan frontend tetap dapat berjalan.
- Untuk fitur admin CRUD dan penyimpanan lead kontak, pastikan PostgreSQL aktif dan migrasi sudah dijalankan.
