let action = false;
let pustaka = [];
const DaftarBukuSelesai = "RakbukuSelesaibaca";
const DaftarBukuBelum = "RakbukuBelumbaca";
const daftarBuku = "Daftar";
const MyPustaka = "aplikasi-rakbukuonline";

function Rakpustaka(buku) {
  const judulPustaka = document.createElement("h5");
  judulPustaka.innerText = "Judul Buku: " + buku.title;

  const AuthorPustaka = document.createElement("h6");
  AuthorPustaka.innerText = "Penulis: " + buku.author;

  const TahunPustaka = document.createElement("h6");
  TahunPustaka.innerText = "Tahun: " + buku.year;

  const tampilkan = document.createElement("article");
  tampilkan.classList.add("item_pustaka");
  tampilkan.append(judulPustaka, AuthorPustaka, TahunPustaka);

  const tampilkanTombol = document.createElement("section");
  tampilkanTombol.classList.add("proses");

  if (buku.isComplete) {
    tampilkanTombol.append(togleKembalikan(), togleEdit(), togleHapus());
  } else {
    tampilkanTombol.append(toglelcek(), togleEdit(), togleHapus());
  }

  tampilkan.append(tampilkanTombol);

  return tampilkan;
}

function buatToggle(innerText, buttonTypeClass, eventListener) {
  const tgl = document.createElement("button");
  tgl.innerText = innerText;
  tgl.classList.add("tg");
  tgl.classList.add(buttonTypeClass);
  tgl.addEventListener("click", function (event) {
    eventListener(event);
    event.stopPropagation();
  });
  return tgl;
}

function inputPustaka() {
  const Mid = document.getElementById("IdBuku").value;
  const Mjudul = document.getElementById("inputJudulbuku").value;
  const Mpenulis = document.getElementById("inputPenulisbuku").value;
  const Mtahun = document.getElementById("inputTahunbuku").value;
  const centang = document.getElementById("SelesaiDibaca").checked;
  return objekpustaka(Mid, Mjudul, Mpenulis, Mtahun, centang);
}

function TambahBuku() {
  const unread = document.getElementById(DaftarBukuBelum);
  const reading = document.getElementById(DaftarBukuSelesai);

  const objekBuku = inputPustaka();
  const buku = Rakpustaka(objekBuku);

  buku[daftarBuku] = objekBuku.id;
  pustaka.push(objekBuku);

  if (objekBuku.isComplete) {
    reading.append(buku);
  } else {
    unread.append(buku);
  }
  updateDataPustaka();
  EditingObj();
}

function SaveBuku() {
  const objekBuku = inputPustaka();

  const indexpustaka = cariIndexpustaka(objekBuku.id);
  pustaka[indexpustaka] = objekBuku;

  updateDataPustaka();
  Loadted();
}

function CariObj() {
  const carijudul = document.getElementById("cariJudul").value.toLowerCase();
  const elemenPustaka = document.getElementsByTagName("article");
  let pencarianKosong = false;

  if (carijudul.trim() !== "") {
    pencarianKosong = true;
  }

  for (const pustakaElemen of elemenPustaka) {
    if (pencarianKosong) {
      const judulbuku = pustakaElemen.children[0].innerText.toLowerCase();

      if (judulbuku.includes(carijudul)) {
        pustakaElemen.style.display = "block";
      } else {
        pustakaElemen.style.display = "none";
      }
    } else {
      pustakaElemen.style.display = "block";
    }
  }
}

function togleKembalikan() {
  return buatToggle("Belum selesai ", "button1", function (event) {
    KembalikanPustaka(event.target.parentElement.parentElement);
  });
}

function KembalikanPustaka(PelemenPustaka) {
  const unread = document.getElementById(DaftarBukuBelum);

  const buku = cariPustaka(PelemenPustaka[daftarBuku]);
  buku.isComplete = false;

  const bukuBaru = Rakpustaka(buku);
  bukuBaru[daftarBuku] = buku.id;

  unread.append(bukuBaru);
  PelemenPustaka.remove();

  updateDataPustaka();
}

function toglelcek() {
  return buatToggle("Selesai baca", "button1", function (event) {
    SelesaikanPustaka(event.target.parentElement.parentElement);
  });
}

function SelesaikanPustaka(PelemenPustaka) {
  const reading = document.getElementById(DaftarBukuSelesai);

  const buku = cariPustaka(PelemenPustaka[daftarBuku]);
  buku.isComplete = true;

  const pustakaBaru = Rakpustaka(buku);
  pustakaBaru[daftarBuku] = buku.id;

  reading.append(pustakaBaru);
  PelemenPustaka.remove();

  updateDataPustaka();
}

const modal = document.getElementById("myModal");
const btn = document.getElementById("hapusButton");
const btnCancel = document.getElementById("batalButton");
const span = document.getElementsByClassName("close")[0];
function HapusPustaka(PelemenPustaka) {
  modal.style.display = "block";
  modal.classList.add("fadeIn");
  btn.onclick = function () {
    const peringatan = true;

    if (peringatan) {
      const posisiPustaka = cariIndexpustaka(PelemenPustaka[daftarBuku]);
      pustaka.splice(posisiPustaka, 1);

      PelemenPustaka.remove();
      updateDataPustaka();
      modal.classList.remove("fadeIn");
      modal.classList.add("fadeOut");
      setTimeout(() => {
        modal.style.display = "none";
        modal.classList.remove("fadeOut");
      }, 500);
    }
  };

  btnCancel.onclick = function () {
    modal.classList.remove("fadeIn");
    modal.classList.add("fadeOut");
    setTimeout(() => {
      modal.style.display = "none";
      modal.classList.remove("fadeOut");
    }, 500);
  };
}

span.onclick = function () {
  modal.classList.remove("fadeIn");
  modal.classList.add("fadeOut");
  setTimeout(() => {
    modal.style.display = "none";
    modal.classList.remove("fadeOut");
  }, 500);
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.classList.remove("fadeIn");
    modal.classList.add("fadeOut");
    setTimeout(() => {
      modal.style.display = "none";
      modal.classList.remove("fadeOut");
    }, 500);
  }
};

function togleEdit() {
  return buatToggle("Sunting buku", "button2", function (event) {
    SuntingPustaka(event.target.parentElement.parentElement);
  });
}

function SuntingPustaka(PelemenPustaka) {
  const buku = cariPustaka(PelemenPustaka[daftarBuku]);
  EditingObj(buku);
}

function togleHapus() {
  return buatToggle("Hapus buku", "button2", function (event) {
    HapusPustaka(event.target.parentElement.parentElement);
  });
}

function EditingObj(buku) {
  const judulKoleksi = document.getElementById("judul_koleksi");
  const IdBuku = document.getElementById("IdBuku");
  const inputJudulbuku = document.getElementById("inputJudulbuku");
  const inputPenulisbuku = document.getElementById("inputPenulisbuku");
  const inputTahunbuku = document.getElementById("inputTahunbuku");
  const SelesaiDibaca = document.getElementById("SelesaiDibaca");
  const submitBuku = document.getElementById("submitBuku");

  if (buku != null) {
    action = true;
    IdBuku.value = buku.id;
    inputJudulbuku.value = buku.title;
    inputPenulisbuku.value = buku.author;
    inputTahunbuku.value = buku.year;
    SelesaiDibaca.checked = buku.isComplete;
    submitBuku.innerHTML = "Save hasil edit";
    judulKoleksi.innerText = "Edit data buku";
  } else {
    action = false;
    IdBuku.value = "";
    inputJudulbuku.value = "";
    inputPenulisbuku.value = "";
    inputTahunbuku.value = "";
    SelesaiDibaca.checked = false;
    submitBuku.innerHTML =
      "<span><img src='image/belumbaca.png'> Masukkan ke RAK belum baca";
    judulKoleksi.innerText =
      "Silahkan masukkan data buku yang ingin di simpan!";
  }
}

function Loadted() {
  const unread = document.getElementById(DaftarBukuBelum);
  const reading = document.getElementById(DaftarBukuSelesai);

  unread.innerHTML = "";
  reading.innerHTML = "";

  for (const buku of pustaka) {
    const bukuBaru = Rakpustaka(buku);
    bukuBaru[daftarBuku] = buku.id;

    if (buku.isComplete) {
      reading.append(bukuBaru);
    } else {
      unread.append(bukuBaru);
    }
  }

  EditingObj();
}

function cekstorage() {
  if (typeof Storage === undefined) {
    alert("Maaf tidak support webstorage");
    return false;
  }
  return true;
}

function cariPustaka(Id_pustaka) {
  for (const buku of pustaka) {
    if (buku.id === Id_pustaka) return buku;
  }
  return null;
}

function cariIndexpustaka(Id_pustaka) {
  let index = 0;
  for (const buku of pustaka) {
    if (buku.id === Id_pustaka) return index;
    index++;
  }
  return -1;
}

function objekpustaka(id, title, author, year, isComplete) {
  if (id == "" || id == null) {
    id = +new Date();
  }
  id = Number(id);
  year = parseInt(year);
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
}

function simpanDataPustaka() {
  const save = JSON.stringify(pustaka);
  localStorage.setItem(MyPustaka, save);
  document.dispatchEvent(new Event("simpan"));
}

function updateDataPustaka() {
  if (cekstorage()) simpanDataPustaka();
}

function loadDataPustaka() {
  const ambil_data = localStorage.getItem(MyPustaka);
  let dapus = JSON.parse(ambil_data);
  if (dapus !== null) pustaka = dapus;
  document.dispatchEvent(new Event("load-data"));
}
