// ============================================================
// form.js – Modul 3: validasi formulir & pesan WhatsApp
// ============================================================



const form = document.querySelector("#form-pesan");
const hasilPesan = document.querySelector("#hasil-pesan");
const ringkasan = document.querySelector("#ringkasan");
const tautanWa = document.querySelector("#tautan-wa");

// Nomor WhatsApp toko (FIKTIF, hanya untuk Latihan)
const NOMOR_TOKO = "6281234567890";

// 1. Aturan validasi: fungsi pemeriksa + pesan kesalahan untuk tiap kolom
const aturan = {
  nama: {
    cek: (nilai) => nilai.trim().length >= 3,
    pesan: "Nama wajib diisi, minimal 3 huruf.",
  },
  wa: {
    cek: (nilai) => /^08\d{8,11}$/.test(nilai.trim()),
    pesan: "Nomor WhatsApp diawali 08 dan terdiri atas 10-13 digit angka.",
  },
  email: {
    // email boleh kosong; jika diisi, formatnya harus benar
    cek: (nilai) => nilai.trim() === "" || /^[\w@\s]+@[\w\s]+\.[\w\s]+/.test(nilai.trim()),
    pesan: "Format surel belum benar, contoh: nama@domain.com.",
  },
  produk: {
    cek: (nilai) => nilai !== "",
    pesan: "Silakan pilih produk.",
  },
  jumlah: {
    cek: (nilai) => Number.isInteger(Number(nilai)) && Number(nilai) >= 1 && Number(nilai) <= 50,
    pesan: "Jumlah harus bilangan bulat 1 sampai 50.",
  },
};

// 2. Menampilkan (atau menghapus) pesan kesalahan sebuah kolom
function tampilkanError(input, pesan) {
  const wadahError = document.querySelector(`#error-${input.id}`);
  wadahError.textContent = pesan;
  input.setAttribute("aria-invalid", pesan !== "" ? "true" : "false");
}

// 3. Memeriksa satu kolom; hasilnya true (valid) atau false
function validasiKolom(input) {
  if (input.type === "checkbox") {
    const dicentang = input.checked;
    tampilkanError(input, dicentang ? "" : "Centang persetujuan terlebih dahulu.");
    return dicentang;
  }

  const aturanKolom = aturan[input.name];
  const valid = aturanKolom.cek(input.value);
  tampilkanError(input, valid ? "" : aturanKolom.pesan);
  return valid;
}

// 4. Daftar kolom yang perlu diperiksa
const kolomDiperiksa = ["nama", "wa", "email", "produk", "jumlah", "setuju"].map(
  (nama) => form.elements[nama]
);

function isiPilihanProduk() {
  const selectProduk = document.querySelector("#produk");
  if (!selectProduk || typeof katalog === "undefined") return;

  const formatIDR = (angka) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);

  selectProduk.length = 1;
  const fragment = document.createDocumentFragment();

  katalog.forEach((produk) => {
    const option = document.createElement("option");
    option.value = produk.nama;
    option.textContent = `#${produk.id} - ${produk.nama} (${produk.kategori}) — ${formatIDR(produk.harga)}`;
    fragment.appendChild(option);
  });

  selectProduk.appendChild(fragment);
}

isiPilihanProduk();

// 5. Kolom yang sudah ditandai salah diperiksa ulang setiap kali isinya berubah,
//    sehingga pesan kesalahan langsung hilang begitu pengguna memperbaikinya
// Pastikan hanya elemen tunggal yang valid dan punya addEventListener
const daftarElemen = [
  document.querySelector("#nama"),
  document.querySelector("#wa"),
  document.querySelector("#email"),
  document.querySelector("#produk"),
  document.querySelector("#jumlah"),
  document.querySelector("#setuju"),
  ...document.querySelectorAll('input[name="pengambilan"]'),
  document.querySelector("#catatan"),
].filter((el) => el && typeof el.addEventListener === "function");

daftarElemen.forEach((input) => {
  const tipeEvent =
    input.type === "checkbox" || input.type === "radio" || input.tagName === "SELECT"
      ? "change"
      : "input";

  input.addEventListener(tipeEvent, () => {
    // Panggil fungsi validasi / update ringkasan kamu di sini
  });
});

// 6. Periksa semua kolom ketika formulir dikirim
form.addEventListener("submit", (event) => {
  event.preventDefault(); // cegah halaman dimuat ulang

  let kolomSalahPertama = null;
  kolomDiperiksa.forEach((input) => {
    const valid = validasiKolom(input);
    if (!valid && kolomSalahPertama === null) {
      kolomSalahPertama = input;
    }
  });

  if (kolomSalahPertama !== null) {
    hasilPesan.hidden = true;
    kolomSalahPertama.focus(); // arahkan pengguna ke kesalahan pertama
    return;
  }

  // 7. Semua valid: susun pesan WhatsApp dari data formulir
  const data = new FormData(form);
  const pesan = [
    "Assalamu'alaikum, saya ingin memesan:",
    `Nama: ${data.get("nama").trim()}`,
    `Produk: ${data.get("produk")}`,
    `Jumlah: ${data.get("jumlah")}`,
    `Pengambilan: ${data.get("pengambilan")}`,
    `Catatan: ${data.get("catatan").trim() || "-"}`,
  ].join("\n");

  ringkasan.textContent = pesan; // textContent aman dari XSS
  tautanWa.href = `https://wa.me/${NOMOR_TOKO}?text=${encodeURIComponent(pesan)}`;
  hasilPesan.hidden = false;
  hasilPesan.scrollIntoView({ behavior: "smooth" });
});

//New Line Added
// js/form.js
// Validasi dan penanganan pengiriman formulir pemesanan

const formPemesananEl = document.getElementById("form-pemesanan");
const hasilPemesananEl = document.getElementById("hasil-pemesanan");

function tampilkanFeedback(pesan, tipe = "info") {
  if (!hasilPemesananEl) return;

  hasilPemesananEl.textContent = pesan;
  hasilPemesananEl.dataset.status = tipe;

  if (tipe === "error") {
    hasilPemesananEl.style.color = "#b91c1c";
  } else if (tipe === "sukses") {
    hasilPemesananEl.style.color = "#047857";
  } else {
    hasilPemesananEl.style.color = "#334155";
  }
}

if (formPemesananEl) {
  formPemesananEl.addEventListener("submit", (event) => {
    event.preventDefault();

    const dataForm = new FormData(formPemesananEl);
    const nama = (dataForm.get("nama") || "").toString().trim();
    const email = (dataForm.get("email") || "").toString().trim();
    const produk = (dataForm.get("produk") || "").toString().trim();
    const jumlah = Number(dataForm.get("jumlah") || 0);
    const catatan = (dataForm.get("catatan") || "").toString().trim();

    if (!nama) {
      tampilkanFeedback("Nama pemesan wajib diisi.", "error");
      return;
    }

    if (!email || !email.includes("@")) {
      tampilkanFeedback("Masukkan alamat email yang valid.", "error");
      return;
    }

    if (!produk) {
      tampilkanFeedback("Pilih atau masukkan nama produk Sasirangan.", "error");
      return;
    }

    if (!Number.isInteger(jumlah) || jumlah < 1) {
      tampilkanFeedback("Jumlah pesanan minimal 1.", "error");
      return;
    }

    const ringkasan = catatan
      ? `Pesanan atas nama ${nama} (${jumlah}x ${produk}) tercatat. Catatan: ${catatan}.`
      : `Pesanan atas nama ${nama} (${jumlah}x ${produk}) tercatat.`;

    tampilkanFeedback(ringkasan, "sukses");
    formPemesananEl.reset();
  });
}