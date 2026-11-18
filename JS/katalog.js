// ============================================================
// katalog.js – Modul 3: menampilkan katalog dengan DOM[cite: 4]
// Praktikum Pemrograman Web 1 · Sasirangan Banua[cite: 4]
// ============================================================

// 1. Data katalog: array yang berisi objek-objek produk[cite: 4]
const katalog = [
  {
    id: 1,
    nama: "Kain Motif Gigi Haruan",
    kategori: "kain",
    harga: 185000,
    gambar: "img/gigi-haruan.svg",
    deskripsi: "Kain katun 2 meter bermotif zig-zag menyerupai gigi ikan haruan.",
  },
  {
    id: 2,
    nama: "Kain Motif Kambang Kacang",
    kategori: "kain",
    harga: 175000,
    gambar: "img/kambang-kacang.svg",
    deskripsi: "Motif bunga kacang yang melambangkan keakraban dan kerukunan.",
  },
  {
    id: 3,
    nama: "Selendang Iris Pudak",
    kategori: "aksesoris",
    harga: 120000,
    gambar: "img/iris-pudak.svg",
    deskripsi: "Selendang ringan bermotif irisan daun pudak (pandan).",
  },
  {
    id: 4,
    nama: "Kain Motif Bayam Raja",
    kategori: "kain",
    harga: 190000,
    gambar: "img/bayam-raja.svg",
    deskripsi: "Kain sasirangan klasik dengan motif daun bayam raja yang melambangkan kemakmuran.",
  },
  {
    id: 5,
    nama: "Kain Motif Jarum Karang",
    kategori: "kain",
    harga: 180000,
    gambar: "img/jarum-karang.svg",
    deskripsi: "Motif titik-titik tajam menyerupai karang tajam di perairan.",
  },
  {
    id: 6,
    nama: "Ikat Kepala Sasirangan",
    kategori: "aksesoris",
    harga: 75000,
    gambar: "img/ikat-kepala.svg",
    deskripsi: "Ikat kepala atau odeng khas Banjar dengan corak sasirangan.",
  },
  {
    id: 7,
    nama: "Kain Motif Tampuk Manggis",
    kategori: "kain",
    harga: 195000,
    gambar: "img/tampuk-manggis.svg",
    deskripsi: "Motif geometris melingkar yang melambangkan kejujuran dan ketulusan.",
  },
  {
    id: 8,
    nama: "Selendang Kulit Taratak",
    kategori: "aksesoris",
    harga: 135000,
    gambar: "img/kulit-taratak.svg",
    deskripsi: "Selendang elegan dengan kombinasi warna khas tradisi Banjar.",
  }

];

// 2. Ambil elemen-elemen HTML yang akan dimanipulasi
const daftarKatalog = document.querySelector("#daftar-katalog");
const inputCari = document.querySelector("#cari");
const tombolFilter = document.querySelectorAll(".tombol-filter");
const infoJumlah = document.querySelector("#info-jumlah");
// 3. Status filter yang sedang aktif
let kategoriAktif = "semua";
// 4. Mengubah angka menjadi format Rupiah, contoh: 185000 -> "Rp 185.000"
function formatRupiah(angka) {
 return new Intl.NumberFormat("id-ID", {
 style: "currency",
 currency: "IDR",
 minimumFractionDigits: 0,
 }).format(angka);
}

// 5. Membuat elemen <article> untuk satu produk
function buatKartu(produk) {
    const kartu = document.createElement("article");
    kartu.className = "kartu";

    const gambar = document.createElement("img");
    gambar.src = produk.gambar;
    gambar.alt = produk.nama;
    gambar.width = 600;
    gambar.height = 400;
    gambar.loading = "lazy";

    const isi = document.createElement("div");
    isi.className = "kartu-isi";

    const label = document.createElement("span");
    label.className = "label-kategori";
    label.textContent = produk.kategori;

    const judul = document.createElement("h3");
    judul.textContent = produk.nama;

    const deskripsi = document.createElement("p");
    deskripsi.textContent = produk.deskripsi;

    const harga = document.createElement("p");
    harga.className = "harga";
    harga.textContent = formatRupiah(produk.harga);

    isi.append(label, judul, deskripsi, harga);
    kartu.append(gambar, isi);
    return kartu;
}

// 6. Menampilkan sekumpulan produk ke dalam #daftar-katalog
function tampilkanKatalog(daftarProduk) {
 daftarKatalog.replaceChildren(); // kosongkan isi sebelumnya
 if (daftarProduk.length === 0) {
 const kosong = document.createElement("p");
 kosong.textContent = "Produk tidak ditemukan. Coba kata kunci lain.";
 daftarKatalog.append(kosong);
 }
 daftarProduk.forEach((produk) => {
 daftarKatalog.append(buatKartu(produk));
 });
 infoJumlah.textContent = `Menampilkan ${daftarProduk.length} dari ${katalog.length} produk`;

 // 10. Tampilkan semua produk ketika halaman pertama kali dibuka
tampilkanKatalog(katalog);

}
