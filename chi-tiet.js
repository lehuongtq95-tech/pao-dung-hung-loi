function saoChepLienKet(nut) {
    navigator.clipboard.writeText(window.location.href);
    nut.textContent = "Đã sao chép!";
    setTimeout(function () {
        nut.textContent = "Sao chép liên kết";
    }, 2000);
}
function saoChepTrichDan(nut) {
    const khungTrichDan = nut.closest(".trich-dan-tu-lieu");
    const noiDung = khungTrichDan.querySelector("p").textContent.trim();
    navigator.clipboard.writeText(noiDung);
    nut.textContent = "Đã sao chép!";
    setTimeout(function () {
        nut.textContent = "Sao chép trích dẫn";
    }, 2000);
}
const audioChiTiet = document.querySelector("audio");
const hienThiThoiLuong = document.querySelector(".thoi-luong-tu-dong");
function dinhDangThoiLuong(soGiay) {
    const phut = Math.floor(soGiay / 60);
    const giay = Math.floor(soGiay % 60)
        .toString()
        .padStart(2, "0");
    return phut + " phút " + giay + " giây";
}
if (audioChiTiet && hienThiThoiLuong) {
    audioChiTiet.addEventListener("loadedmetadata", function () {
        hienThiThoiLuong.textContent =
            dinhDangThoiLuong(audioChiTiet.duration);
    });
    const nguonAudio = audioChiTiet.querySelector("source");
    if (nguonAudio) {
    nguonAudio.addEventListener("error", function () {
        hienThiThoiLuong.textContent = "chưa có bản ghi";
        audioChiTiet.style.display = "none";

        if (!document.querySelector(".thong-bao-audio")) {
            const thongBaoAudio = document.createElement("p");

            thongBaoAudio.className = "thong-bao-audio";
            thongBaoAudio.textContent = "Bản ghi âm: đang bổ sung";

            audioChiTiet.insertAdjacentElement(
                "afterend",
                thongBaoAudio
            );
        }
    });
}
}
const anhTuLieu = document.querySelector(".anh-tu-lieu-bai img");
function xuLyAnhBiThieu() {
    if (!anhTuLieu) {
        return;
    }
    anhTuLieu.style.display = "none";
    const khungAnh = anhTuLieu.closest(".anh-tu-lieu-bai");
    if (khungAnh) {
        khungAnh.classList.add("khong-co-anh");
    }
}
if (anhTuLieu) {
    anhTuLieu.addEventListener("error", xuLyAnhBiThieu);
    if (anhTuLieu.complete && anhTuLieu.naturalWidth === 0) {
        xuLyAnhBiThieu();
    }
}