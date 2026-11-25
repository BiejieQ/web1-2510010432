// ============================================================
// katalog.js – Modul 3: menampilkan 500 katalog professional dengan DOM
// Praktikum Pemrograman Web 1 · Sasirangan Banua
// ============================================================

// Generator SVG profesional dengan ID unik, variasi warna, & pola geometris berbeda
function buatGambarSVG(idUnik, judulMotif, kategori, warnaBg, warnaAksen, tipePola) {
  const safeId = `item-${idUnik}`;

  // Variasi 5 pola geometris khas wastra agar visual tiap edisi unik & tidak duplikat
  let elemenPola = "";
  switch (tipePola % 5) {
    case 0: // Pola Belah Ketupat (Wajik)
      elemenPola = `
        <path d="M25 0 L50 25 L25 50 L0 25 Z" fill="none" stroke="${warnaAksen}" stroke-width="1.5" opacity="0.3"/>
        <circle cx="25" cy="25" r="4" fill="${warnaAksen}" opacity="0.4"/>`;
      break;
    case 1: // Pola Garis Gelombang (Ombak Sinapur)
      elemenPola = `
        <path d="M0 25 Q 12.5 10, 25 25 T 50 25" fill="none" stroke="${warnaAksen}" stroke-width="2" opacity="0.35"/>
        <path d="M0 40 Q 12.5 25, 25 40 T 50 40" fill="none" stroke="${warnaAksen}" stroke-width="1" opacity="0.2"/>`;
      break;
    case 2: // Pola Gigi Haruan (Zig-zag Tajam)
      elemenPola = `
        <polyline points="0,35 12.5,15 25,35 37.5,15 50,35" fill="none" stroke="${warnaAksen}" stroke-width="1.8" opacity="0.35"/>
        <circle cx="12.5" cy="28" r="2" fill="${warnaAksen}" opacity="0.4"/>
        <circle cx="37.5" cy="28" r="2" fill="${warnaAksen}" opacity="0.4"/>`;
      break;
    case 3: // Pola Bintang Bahambur (Titik & Silang)
      elemenPola = `
        <path d="M25 12 L25 38 M12 25 L38 25" stroke="${warnaAksen}" stroke-width="1.5" opacity="0.3"/>
        <circle cx="10" cy="10" r="2.5" fill="${warnaAksen}" opacity="0.35"/>
        <circle cx="40" cy="40" r="2.5" fill="${warnaAksen}" opacity="0.35"/>`;
      break;
    default: // Pola Lingkaran Konsentris (Tampuk Manggis)
      elemenPola = `
        <circle cx="25" cy="25" r="16" fill="none" stroke="${warnaAksen}" stroke-width="1.5" opacity="0.3"/>
        <circle cx="25" cy="25" r="7" fill="none" stroke="${warnaAksen}" stroke-width="1.5" opacity="0.4"/>`;
      break;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <defs>
      <linearGradient id="grad-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${warnaBg}"/>
        <stop offset="100%" stop-color="#111111"/>
      </linearGradient>
      <pattern id="pola-${safeId}" width="50" height="50" patternUnits="userSpaceOnUse">
        <rect width="50" height="50" fill="url(#grad-${safeId})"/>
        ${elemenPola}
      </pattern>
    </defs>
    <rect width="600" height="400" fill="url(#pola-${safeId})"/>
    <rect x="40" y="40" width="520" height="320" rx="12" fill="none" stroke="${warnaAksen}" stroke-width="2" opacity="0.45"/>
    <rect x="75" y="130" width="450" height="140" rx="10" fill="#ffffff" fill-opacity="0.95"/>
    <rect x="210" y="95" width="180" height="30" rx="15" fill="${warnaAksen}"/>
    <text x="300" y="115" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#1a1a1a" text-anchor="middle" letter-spacing="1.5">${kategori.toUpperCase()}</text>
    <text x="300" y="185" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="700" fill="#1a1a1a" text-anchor="middle">${judulMotif}</text>
    <text x="300" y="218" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#666666" text-anchor="middle">Sasirangan Banua · Seri #${String(idUnik).padStart(3, "0")}</text>
  </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

// 1. Array Database 500 Produk Otomatis
const basisMotif = [
  { nama: "Gigi Haruan", kat: "kain", harga: 185000, bg: "#7c1d2e", aksen: "#f1c40f" },
  { nama: "Kambang Kacang", kat: "kain", harga: 175000, bg: "#1d5b54", aksen: "#f39c12" },
  { nama: "Iris Pudak", kat: "aksesoris", harga: 120000, bg: "#49296b", aksen: "#bb8fce" },
  { nama: "Bayam Raja", kat: "kain", harga: 190000, bg: "#2e5421", aksen: "#82e0aa" },
  { nama: "Jarum Karang", kat: "kain", harga: 180000, bg: "#1e3a5f", aksen: "#5dade2" },
  { nama: "Ikat Kepala Banjar", kat: "aksesoris", harga: 75000, bg: "#6e2c00", aksen: "#f8c471" },
  { nama: "Tampuk Manggis", kat: "kain", harga: 195000, bg: "#512e5f", aksen: "#d7bde2" },
  { nama: "Kulit Taratak", kat: "aksesoris", harga: 135000, bg: "#78281f", aksen: "#f5b7b1" },
  { nama: "Ombak Sinapur", kat: "kain", harga: 200000, bg: "#154360", aksen: "#85c1e9" },
  { nama: "Bintang Bahambur", kat: "kain", harga: 210000, bg: "#1b2631", aksen: "#f4d03f" },
  { nama: "Kemeja Eksekutif", kat: "pakaian", harga: 275000, bg: "#641e16", aksen: "#f1948a" },
  { nama: "Blouse Modern", kat: "pakaian", harga: 240000, bg: "#0e6251", aksen: "#48c9b0" },
  { nama: "Hiris Gagatas", kat: "kain", harga: 185000, bg: "#7e5109", aksen: "#f9e79f" },
  { nama: "Kulat Karikit", kat: "kain", harga: 175000, bg: "#4d5656", aksen: "#d5dbdb" },
  { nama: "Syal Etnik", kat: "aksesoris", harga: 95000, bg: "#5b2c6f", aksen: "#d2b4de" }
];

// Palet warna variasi tambahan agar tiap edisi memiliki kombinasi warna unik
const paletWarna = [
  { bg: "#7c1d2e", aksen: "#f1c40f" },
  { bg: "#1d5b54", aksen: "#f39c12" },
  { bg: "#49296b", aksen: "#bb8fce" },
  { bg: "#2e5421", aksen: "#82e0aa" },
  { bg: "#1e3a5f", aksen: "#5dade2" },
  { bg: "#6e2c00", aksen: "#f8c471" },
  { bg: "#154360", aksen: "#85c1e9" },
  { bg: "#641e16", aksen: "#f1948a" },
  { bg: "#0e6251", aksen: "#48c9b0" },
  { bg: "#7e5109", aksen: "#f9e79f" },
  { bg: "#2c3e50", aksen: "#e67e22" },
  { bg: "#4a235a", aksen: "#f5b041" },
  { bg: "#145a32", aksen: "#abebc6" }
];

const variasiAdjektif = ["Eksklusif", "Klasik", "Premium", "Deluks", "Modern", "Royal", "Koleksi Utama", "Pesona", "Khas Borneo", "Wastra Nusantara"];

// Generate 500 data produk secara sistematis
const katalog = [];
let idCounter = 1;

while (katalog.length < 500) {
  for (let i = 0; i < basisMotif.length && katalog.length < 500; i++) {
    const item = basisMotif[i];
    const indexSaatIni = katalog.length;
    const adj = variasiAdjektif[indexSaatIni % variasiAdjektif.length];
    const nomorSeri = Math.floor(indexSaatIni / basisMotif.length) + 1;
    
    // Tentukan warna unik berdasarkan perpaduan indeks dan nomor seri
    const warnaTerpilih = nomorSeri === 1 
      ? { bg: item.bg, aksen: item.aksen } 
      : paletWarna[(i + nomorSeri * 3) % paletWarna.length];

    const awalan = item.kat === 'pakaian' ? 'Busana' : item.kat === 'aksesoris' ? 'Aksesori' : 'Kain';
    const namaProduk = nomorSeri === 1 
      ? `${awalan} Motif ${item.nama}` 
      : `${awalan} ${item.nama} ${adj} Ed.${nomorSeri}`;
      
    const hargaFinal = item.harga + ((nomorSeri - 1) * 15000);
    const idProduk = idCounter++;

    katalog.push({
      id: idProduk,
      nama: namaProduk,
      kategori: item.kat,
      harga: hargaFinal,
      gambar: buatGambarSVG(
        idProduk, 
        `${item.nama} #${nomorSeri}`, 
        item.kat, 
        warnaTerpilih.bg, 
        warnaTerpilih.aksen, 
        indexSaatIni
      ),
      deskripsi: `Koleksi ${item.nama.toLowerCase()} seri #${String(idProduk).padStart(3, '0')} pilihan dengan kualitas tenun terbaik, dirancang khusus untuk kenyamanan dan keindahan gaya etnik Anda.`
    });
  }
}

// 2. Ambil elemen-elemen HTML yang akan dimanipulasi
const daftarKatalog = document.querySelector("#daftar-katalog");
const inputCari = document.querySelector("#cari");
const tombolFilter = document.querySelectorAll(".tombol-filter");
const infoJumlah = document.querySelector("#info-jumlah");

// 3. Status filter yang sedang aktif
let kategoriAktif = "semua";

// 4. Mengubah angka menjadi format Rupiah
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

// 6. Menampilkan sekumpulan produk ke dalam #daftar-katalog (menggunakan DocumentFragment untuk performa mulus)
function tampilkanKatalog(daftarProduk) {
  if (!daftarKatalog) return;
  daftarKatalog.replaceChildren();

  if (daftarProduk.length === 0) {
    const kosong = document.createElement("p");
    kosong.textContent = "Produk tidak ditemukan. Coba kata kunci lain.";
    daftarKatalog.append(kosong);
  } else {
    const fragment = document.createDocumentFragment();
    daftarProduk.forEach((produk) => {
      fragment.append(buatKartu(produk));
    });
    daftarKatalog.append(fragment);
  }

  if (infoJumlah) {
    infoJumlah.textContent = `Menampilkan ${daftarProduk.length} dari ${katalog.length} produk`;
  }
}

// 7. Menyaring katalog berdasarkan kata kunci DAN kategori aktif
function saringKatalog() {
  const kataKunci = inputCari ? inputCari.value.trim().toLowerCase() : "";

  const hasil = katalog.filter((produk) => {
    const cocokKategori = kategoriAktif === "semua" || produk.kategori === kategoriAktif;
    const cocokKata =
      produk.nama.toLowerCase().includes(kataKunci) ||
      produk.deskripsi.toLowerCase().includes(kataKunci);
    return cocokKategori && cocokKata;
  });

  tampilkanKatalog(hasil);
}

// 8. Event: setiap kali pengguna mengetik di kotak pencarian
if (inputCari) {
  inputCari.addEventListener("input", saringKatalog);
}

// 9. Event: tombol filter kategori
tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", (e) => {
    tombolFilter.forEach((t) => {
      t.classList.remove("aktif");
      t.setAttribute("aria-pressed", "false");
    });
    e.currentTarget.classList.add("aktif");
    e.currentTarget.setAttribute("aria-pressed", "true");
    kategoriAktif = e.currentTarget.dataset.kategori;
    saringKatalog();
  });
});

// 10. Tampilkan semua produk ketika halaman pertama kali dibuka
tampilkanKatalog(katalog);

//New added Line
// js/katalog.js
// Memuat data katalog Sasirangan secara asinkron menggunakan Fetch API

const daftarProdukEl = document.getElementById("daftar-produk");
const filterKategoriEl = document.getElementById("filter-kategori");
const statusKatalogEl = document.getElementById("status-katalog");
const modalProdukEl = document.getElementById("modal-produk");
const detailProdukEl = document.getElementById("detail-produk");
const tutupModalBtn = document.getElementById("tutup-modal");

let semuaProduk = [];

function formatRupiah(angka) {
  return "Rp " + Number(angka || 0).toLocaleString("id-ID");
}

function buatIlustrasiSvg(item) {
  const palet = {
    kain: ["#7c2d12", "#f59e0b", "#fef3c7"],
    aksesoris: ["#1e3a8a", "#38bdf8", "#e0f2fe"],
    pakaian: ["#064e3b", "#34d399", "#d1fae5"]
  };
  const [bg, aksen, teks] = palet[item.kategori] || ["#334155", "#cbd5e1", "#f8fafc"];
  const label = encodeURIComponent(item.nama || "Sasirangan");

  return (
    "data:image/svg+xml;utf8," +
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='260' viewBox='0 0 400 260'>` +
    `<rect width='400' height='260' fill='${bg}'/>` +
    `<path d='M0 40 Q50 10 100 40 T200 40 T300 40 T400 40' fill='none' stroke='${aksen}' stroke-width='4'/>` +
    `<path d='M0 220 Q50 190 100 220 T200 220 T300 220 T400 220' fill='none' stroke='${aksen}' stroke-width='4'/>` +
    `<circle cx='200' cy='125' r='42' fill='none' stroke='${aksen}' stroke-width='3'/>` +
    `<text x='200' y='130' text-anchor='middle' fill='${teks}' font-family='Arial, sans-serif' font-size='14' font-weight='bold'>SASIRANGAN</text>` +
    `</svg>` +
    `<!-- ${label} -->`
  );
}

function tampilkanPesanStatus(pesan, isError = false) {
  if (!statusKatalogEl) return;
  statusKatalogEl.textContent = pesan;
  statusKatalogEl.style.color = isError ? "#b91c1c" : "#334155";
}

function renderKatalog(items) {
  if (!daftarProdukEl) return;

  if (!Array.isArray(items) || items.length === 0) {
    daftarProdukEl.innerHTML = "<p>Tidak ada produk yang sesuai dengan filter.</p>";
    return;
  }

  daftarProdukEl.innerHTML = items
    .map((item) => {
      const sumberGambar =
        item.gambar && item.gambar.trim() !== "" ? item.gambar : buatIlustrasiSvg(item);

      return `
        <article class="kartu-produk" data-id="${item.id}">
          <img
            src="${sumberGambar}"
            alt="${item.nama}"
            loading="lazy"
            width="400"
            height="260"
          />
          <div class="info-produk">
            <span class="badge-kategori">${item.kategori}</span>
            <h3>${item.nama}</h3>
            <p class="harga-produk">${formatRupiah(item.harga)}</p>
            <p class="deskripsi-produk">${item.deskripsi}</p>
            <button type="button" class="btn-detail" data-id="${item.id}">
              Lihat Detail
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function bukaModalDetail(idProduk) {
  const produk = semuaProduk.find((item) => Number(item.id) === Number(idProduk));
  if (!produk || !modalProdukEl || !detailProdukEl) return;

  const sumberGambar =
    produk.gambar && produk.gambar.trim() !== ""
      ? produk.gambar
      : buatIlustrasiSvg(produk);

  detailProdukEl.innerHTML = `
    <img src="${sumberGambar}" alt="${produk.nama}" />
    <h3>${produk.nama}</h3>
    <p><strong>Kategori:</strong> ${produk.kategori}</p>
    <p><strong>Harga:</strong> ${formatRupiah(produk.harga)}</p>
    <p>${produk.deskripsi}</p>
  `;

  modalProdukEl.classList.add("aktif");
  modalProdukEl.setAttribute("aria-hidden", "false");
}

function tutupModalDetail() {
  if (!modalProdukEl) return;
  modalProdukEl.classList.remove("aktif");
  modalProdukEl.setAttribute("aria-hidden", "true");
}

async function muatKatalog() {
  tampilkanPesanStatus("Memuat data katalog...");

  try {
    const response = await fetch("data/katalog.json");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - Gagal mengambil data/katalog.json`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("Format data katalog tidak valid (bukan array).");
    }

    semuaProduk = data;
    renderKatalog(semuaProduk);
    tampilkanPesanStatus(`Menampilkan ${semuaProduk.length} produk katalog.`);
  } catch (error) {
    console.error("Error memuat katalog:", error);
    if (daftarProdukEl) {
      daftarProdukEl.innerHTML = "";
    }
    tampilkanPesanStatus(
      "Gagal memuat katalog produk. Pastikan situs dijalankan lewat lokal server (bukan file://) dan berkas data/katalog.json tersedia.",
      true
    );
  }
}

if (filterKategoriEl) {
  filterKategoriEl.addEventListener("change", (event) => {
    const kategoriDipilih = event.target.value;
    const hasilFilter =
      kategoriDipilih === "semua"
        ? semuaProduk
        : semuaProduk.filter((item) => item.kategori === kategoriDipilih);

    renderKatalog(hasilFilter);
    tampilkanPesanStatus(
      `Menampilkan ${hasilFilter.length} produk (kategori: ${kategoriDipilih}).`
    );
  });
}

if (daftarProdukEl) {
  daftarProdukEl.addEventListener("click", (event) => {
    const tombol = event.target.closest(".btn-detail");
    if (!tombol) return;
    bukaModalDetail(tombol.dataset.id);
  });
}

if (tutupModalBtn) {
  tutupModalBtn.addEventListener("click", tutupModalDetail);
}

if (modalProdukEl) {
  modalProdukEl.addEventListener("click", (event) => {
    if (event.target === modalProdukEl) {
      tutupModalDetail();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    tutupModalDetail();
  }
});

document.addEventListener("DOMContentLoaded", muatKatalog);