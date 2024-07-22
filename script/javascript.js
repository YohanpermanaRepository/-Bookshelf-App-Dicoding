document.addEventListener("simpan", () => {
  console.log("Proses Berhasil Dilakukan");
});

document.addEventListener("load-data", () => {
  Loadted();
});

document.addEventListener("DOMContentLoaded", function () {
  const bukuSubmision = document.getElementById("inputanBuku");
  const centang = document.getElementById("SelesaiDibaca");
  const SubmisionCari = document.getElementById("cariBuku");

  bukuSubmision.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!action) {
      TambahBuku();
    } else {
      SaveBuku();
    }
  });

  centang.addEventListener("change", function (event) {
    event.preventDefault();
    switch (!action) {
      case true:
        const TombolSubmit = document.getElementById("submitBuku");
        if (centang.checked) {
          TombolSubmit.children[0].innerHTML =
            "<img src='image/ic_sudahbaca.png'><span>Masukkan ke RAK sudah baca</span>";
        } else {
          TombolSubmit.children[0].innerHTML =
            "<img src='image/belumbaca.png'><span>Masukkan ke RAK belum baca</span>";
        }
        break;
      default:
        break;
    }
  });

  if (cekstorage()) {
    loadDataPustaka();
  }

  SubmisionCari.addEventListener("submit", function (event) {
    event.preventDefault();
    CariObj();
  });

  bukuSubmision.addEventListener("reset", function (event) {
    event.preventDefault();
    EditingObj();
  });
});
