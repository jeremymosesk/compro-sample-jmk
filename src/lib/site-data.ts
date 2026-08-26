export const heroImage = 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1600';
export const aboutImage = 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800';
export const whatsappNumber = '+62 812-8414-6656';
export const whatsappMessage = 'Halo, saya ingin mengetahui lebih lanjut tentang produk Anda.';

export const seededCategories = [
  { name: 'Bahan Kimia Industri', slug: 'bahan-kimia-industri' },
  { name: 'Bahan Kimia Laboratorium', slug: 'bahan-kimia-laboratorium' },
  { name: 'Bahan Kimia Pertanian', slug: 'bahan-kimia-pertanian' },
  { name: 'Bahan Kimia Water Treatment', slug: 'bahan-kimia-water-treatment' },
] as const;

export const seededProducts = [
  {
    name: 'Asam Sulfat',
    slug: 'asam-sulfat',
    description: 'Bahan kimia industri berkualitas tinggi untuk kebutuhan manufaktur, pengolahan logam, dan proses produksi skala besar.',
    category: 'Bahan Kimia Industri',
    imageUrl: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=800',
    isFeatured: true,
  },
  {
    name: 'Natrium Hidroksida',
    slug: 'natrium-hidroksida',
    description: 'Digunakan untuk aplikasi pengolahan air, pembuatan sabun, tekstil, serta penyesuaian pH pada proses industri.',
    category: 'Bahan Kimia Industri',
    imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800',
    isFeatured: false,
  },
  {
    name: 'Asam Klorida',
    slug: 'asam-klorida',
    description: 'Solusi asam dengan kemurnian stabil yang cocok untuk kebutuhan pembersihan, pengolahan, dan reaksi kimia terukur.',
    category: 'Bahan Kimia Industri',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    isFeatured: false,
  },
  {
    name: 'Hidrogen Peroksida',
    slug: 'hidrogen-peroksida',
    description: 'Produk oksidator serbaguna untuk bleaching, disinfeksi, dan berbagai kebutuhan proses di sektor industri.',
    category: 'Bahan Kimia Industri',
    imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800',
    isFeatured: true,
  },
  {
    name: 'Amonium Nitrat',
    slug: 'amonium-nitrat',
    description: 'Bahan pendukung penting untuk sektor manufaktur dan agrikultur dengan pengemasan yang aman dan rapi.',
    category: 'Bahan Kimia Industri',
    imageUrl: 'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?w=800',
    isFeatured: false,
  },
  {
    name: 'Etanol',
    slug: 'etanol',
    description: 'Pelarut laboratorium yang ideal untuk riset, formulasi, dan pengujian dengan standar kualitas konsisten.',
    category: 'Bahan Kimia Laboratorium',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
    isFeatured: true,
  },
  {
    name: 'Methanol',
    slug: 'methanol',
    description: 'Bahan kimia laboratorium yang cocok untuk sintesis, analisis, dan aplikasi industri presisi.',
    category: 'Bahan Kimia Laboratorium',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800',
    isFeatured: false,
  },
  {
    name: 'Asam Asetat',
    slug: 'asam-asetat',
    description: 'Digunakan untuk keperluan laboratorium, formulasi, dan penyesuaian pH pada proses penelitian dan produksi.',
    category: 'Bahan Kimia Laboratorium',
    imageUrl: 'https://images.unsplash.com/photo-1516727003284-a96541e51e9c?w=800',
    isFeatured: false,
  },
  {
    name: 'Natrium Klorida',
    slug: 'natrium-klorida',
    description: 'Bahan baku laboratorium serbaguna untuk analisis, preparasi larutan, dan kebutuhan pengujian rutin.',
    category: 'Bahan Kimia Laboratorium',
    imageUrl: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800',
    isFeatured: false,
  },
  {
    name: 'Kalium Permanganat',
    slug: 'kalium-permanganat',
    description: 'Oksidator kuat yang lazim digunakan untuk pengujian laboratorium, pengolahan air, dan proses industri tertentu.',
    category: 'Bahan Kimia Laboratorium',
    imageUrl: 'https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=800',
    isFeatured: false,
  },
  {
    name: 'Urea',
    slug: 'urea',
    description: 'Produk pendukung pertanian untuk meningkatkan ketersediaan nitrogen dan mendukung produktivitas lahan.',
    category: 'Bahan Kimia Pertanian',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
    isFeatured: true,
  },
  {
    name: 'Pupuk NPK',
    slug: 'pupuk-npk',
    description: 'Formulasi nutrisi seimbang untuk mendukung pertumbuhan tanaman, hasil panen, dan ketahanan tanaman.',
    category: 'Bahan Kimia Pertanian',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
    isFeatured: false,
  },
  {
    name: 'Kalsium Nitrat',
    slug: 'kalsium-nitrat',
    description: 'Pupuk larut air yang membantu pembentukan jaringan tanaman dan menjaga kualitas hasil budidaya.',
    category: 'Bahan Kimia Pertanian',
    imageUrl: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=800',
    isFeatured: false,
  },
  {
    name: 'Magnesium Sulfat',
    slug: 'magnesium-sulfat',
    description: 'Membantu pemenuhan unsur hara penting untuk menunjang fotosintesis dan pertumbuhan tanaman yang sehat.',
    category: 'Bahan Kimia Pertanian',
    imageUrl: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800',
    isFeatured: false,
  },
  {
    name: 'Klorin',
    slug: 'klorin',
    description: 'Solusi desinfeksi andal untuk sistem pengolahan air bersih, kolam, dan instalasi industri.',
    category: 'Bahan Kimia Water Treatment',
    imageUrl: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800',
    isFeatured: true,
  },
  {
    name: 'Aluminium Sulfat',
    slug: 'aluminium-sulfat',
    description: 'Koagulan untuk kebutuhan pengolahan air yang membantu proses klarifikasi dan penurunan kekeruhan.',
    category: 'Bahan Kimia Water Treatment',
    imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800',
    isFeatured: false,
  },
  {
    name: 'Polielektrolit',
    slug: 'polielektrolit',
    description: 'Meningkatkan efisiensi flokulasi dan sedimentasi dalam sistem water treatment skala industri.',
    category: 'Bahan Kimia Water Treatment',
    imageUrl: 'https://images.unsplash.com/photo-1516728778615-2d590ea1856f?w=800',
    isFeatured: false,
  },
  {
    name: 'PAC (Poly Aluminium Chloride)',
    slug: 'pac-poly-aluminium-chloride',
    description: 'Koagulan premium untuk menghasilkan performa pengolahan air yang stabil dan efisien.',
    category: 'Bahan Kimia Water Treatment',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800',
    isFeatured: false,
  },
] as const;

export const seededServices = [
  {
    name: 'Distribusi Bahan Kimia',
    description: 'Pengiriman bahan kimia industri, laboratorium, dan agrikultur ke berbagai wilayah dengan sistem logistik yang aman dan terjadwal.',
    icon: '🚚',
  },
  {
    name: 'Konsultasi Produk',
    description: 'Tim kami membantu memilih spesifikasi bahan kimia yang sesuai dengan kebutuhan operasional, kualitas, dan standar keselamatan Anda.',
    icon: '🧪',
  },
  {
    name: 'Solusi Water Treatment',
    description: 'Pendampingan untuk kebutuhan pengolahan air industri mulai dari pemilihan bahan kimia hingga rekomendasi aplikasi lapangan.',
    icon: '💧',
  },
  {
    name: 'Dukungan Pengadaan Rutin',
    description: 'Program pasokan berkala untuk memastikan ketersediaan stok bahan kimia penting bagi proses produksi perusahaan Anda.',
    icon: '📦',
  },
] as const;

export const seededCompanyInfo = [
  { key: 'company_name', value: 'PT JMK Chemical Solutions' },
  { key: 'tagline', value: 'Mitra terpercaya untuk kebutuhan bahan kimia industri, laboratorium, pertanian, dan water treatment.' },
  { key: 'address', value: 'Jl. Industri Raya No. 88, Cikarang, Jawa Barat 17530' },
  { key: 'phone', value: '+62 21 5555 8899' },
  { key: 'email', value: 'info@jmkchemical.co.id' },
  { key: 'whatsapp', value: whatsappNumber },
  { key: 'vision', value: 'Menjadi perusahaan distribusi bahan kimia nasional yang unggul, terpercaya, dan berorientasi pada solusi jangka panjang.' },
  { key: 'mission', value: 'Menyediakan produk berkualitas, layanan responsif, dan dukungan teknis yang membantu pelanggan mencapai efisiensi operasional.' },
] as const;

export const whyChooseUs = [
  'Produk berkualitas dengan pemasok terkurasi dan proses pengadaan yang konsisten.',
  'Tim berpengalaman dalam distribusi bahan kimia untuk kebutuhan B2B lintas sektor.',
  'Respon cepat untuk konsultasi teknis, permintaan penawaran, dan pengiriman rutin.',
  'Komitmen pada keamanan, ketepatan dokumen, dan dukungan pelanggan jangka panjang.',
] as const;

export const companyHistory = [
  {
    year: '2012',
    title: 'Berdiri sebagai distributor bahan kimia industri',
    description: 'Kami memulai layanan dengan fokus pada kebutuhan bahan kimia dasar untuk manufaktur dan pengolahan air.',
  },
  {
    year: '2017',
    title: 'Ekspansi ke sektor laboratorium dan pertanian',
    description: 'Portofolio produk bertambah untuk melayani institusi riset, laboratorium, dan kebutuhan agrikultur modern.',
  },
  {
    year: '2023',
    title: 'Memperkuat layanan solusi dan konsultasi',
    description: 'Kami memperluas dukungan teknis agar pelanggan mendapatkan solusi yang lebih tepat, aman, dan efisien.',
  },
] as const;

export const leadershipTeam = [
  {
    name: 'Budi Santoso',
    role: 'Direktur Utama',
    description: 'Memimpin strategi perusahaan dan kemitraan distribusi nasional dengan pengalaman lebih dari 15 tahun di industri kimia.',
  },
  {
    name: 'Dewi Lestari',
    role: 'Head of Commercial',
    description: 'Berfokus pada pengembangan relasi pelanggan B2B, pengadaan, dan pertumbuhan akun korporat utama.',
  },
  {
    name: 'Rizky Pratama',
    role: 'Manajer Operasional',
    description: 'Mengawal kualitas layanan, alur logistik, dan kelancaran pemenuhan pesanan agar tetap tepat waktu.',
  },
] as const;
