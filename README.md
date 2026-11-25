# web1-2510010432
Proyek Praktikum Pemrograman Web 1 UNISKA

# Sasirangan Banua

Situs web katalog UMKM kain sasirangan (fiktif untuk praktikum) khas Banjarmasin, Kalimantan Selatan.

***Demo langsung:*** https://github.com/BiejieQ/web1-2510010432

## Fitur
- Katalog produk dimuat secara asinkron dari `data/katalog.json` menggunakan `fetch()` dan `async/await`
- Pencarian kata kunci dan filter kategori (`Semua`, `Kain`, `Pakaian`, `Aksesoris`) dengan penanganan 4 keadaan data (memuat, berhasil, kosong, gagal)
- Formulir pemesanan (`kontak.html`) dengan validasi JavaScript dan pembuatan ringkasan pesan ke WhatsApp
- Widget Jadwal Salat Banjarmasin harian dari API publik MyQuran (`https://api.myquran.com`)
- Desain responsif untuk ponsel dan desktop serta audit mutu menggunakan Lighthouse

## Teknologi
- HTML5 semantik & aksesibel
- CSS3 (CSS Grid, Flexbox, Custom Properties / variabel)
- JavaScript murni (ES6+, Fetch API, DOM manipulation)
- GitHub Pages

## Cara Menjalankan
1. Kloning repositori ini ke komputer lokal.
2. Buka folder proyek di VS Code dan jalankan melalui ***Live Server*** (jangan dibuka langsung via `file://` agar `fetch()` berjalan normal).

## Sumber Data & Aset
- Data katalog: berkas lokal `data/katalog.json` (data latihan fiktif)
- Jadwal salat: API MyQuran (`https://api.myquran.com/v2/sholat/...`) berdasarkan data Kemenag RI
- Grafik kartu & ikon: generator SVG lokal dan `img/favicon.svg`

## Penggunaan AI
Dicatat secara rinci di `LOG-AI.md` dan ditandai dengan komentar `// dibantu AI` pada bagian kode terkait.

## Penulis
- ***Nama:*** Aril Ajib Misbah
- ***NPM:*** 2510010432
- ***Program Studi:*** Teknik Informatika, FTI UNISKA MAB
