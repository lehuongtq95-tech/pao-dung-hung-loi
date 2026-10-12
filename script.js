const oTimKiem = document.getElementById("tim-kiem");
    const cacBaiHat = document.querySelectorAll(".bai-hat");
    const tongSoBai = document.getElementById("tong-so-bai");
    const tongSoBaiThucTe = document.getElementById("tong-so-bai-thuc-te");
    const thongBao = document.getElementById("khong-tim-thay");
    const nutXoa = document.getElementById("xoa-tim-kiem");
    const boLocTrangThai = document.getElementById("loc-trang-thai");
    const nutDatLaiBoLoc = document.getElementById("dat-lai-bo-loc");
    const sapXep = document.getElementById("sap-xep");
const danhSachBai = document.getElementById("danh-sach-bai");
const tkTong = document.getElementById("tk-tong");
const tkDangKiemChung = document.getElementById("tk-dang-kiem-chung");
const tkDaKiemChung = document.getElementById("tk-da-kiem-chung");
const tomTatBoLoc = document.getElementById("tom-tat-bo-loc");
const nutXoaTatCaBoLoc = document.getElementById("xoa-tat-ca-bo-loc");
const cacAudio = document.querySelectorAll("audio");
function capNhatThongKeKho() {
    const tong = cacBaiHat.length;
    const dangKiemChung = Array.from(cacBaiHat).filter(function (baiHat) {
        return baiHat.dataset.trangThai === "dang-kiem-chung";
    }).length;
    const daKiemChung = Array.from(cacBaiHat).filter(function (baiHat) {
        return baiHat.dataset.trangThai === "da-kiem-chung";
    }).length;
    tkTong.textContent = tong;
    tkDangKiemChung.textContent = dangKiemChung;
    tkDaKiemChung.textContent = daKiemChung;
}
tongSoBaiThucTe.textContent = cacBaiHat.length;
    function chuanHoaVanBan(vanBan) {
        return vanBan
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d");
    }
    function capNhatDanhSach() {
        const tuKhoa = chuanHoaVanBan(oTimKiem.value).trim();
        const trangThaiDangChon = boLocTrangThai.value;
        let noiDungTomTat = "Đang xem: ";
if (trangThaiDangChon === "dang-kiem-chung") {
    noiDungTomTat += "Tư liệu đang cập nhật và kiểm chứng";
} else if (trangThaiDangChon === "da-kiem-chung") {
    noiDungTomTat += "Tư liệu đã kiểm chứng";
} else {
    noiDungTomTat += "Tất cả tư liệu";
}
if (oTimKiem.value.trim() !== "") {
    noiDungTomTat += ' | Từ khóa: "' + oTimKiem.value.trim() + '"';
}
if (sapXep.value === "giam-dan") {
    noiDungTomTat += " | Mã giảm dần";
} else {
    noiDungTomTat += " | Mã tăng dần";
}
tomTatBoLoc.textContent = noiDungTomTat;
        document.querySelectorAll(".o-thong-ke").forEach(function (oThongKe) {
    const dangDuocChon =
        oThongKe.dataset.loc === trangThaiDangChon;
    oThongKe.classList.toggle("dang-chon", dangDuocChon);
    oThongKe.setAttribute(
        "aria-pressed",
        dangDuocChon ? "true" : "false"
    );
});
        nutDatLaiBoLoc.disabled =
    tuKhoa === "" &&
    trangThaiDangChon === "tat-ca" &&
    sapXep.value === "tang-dan";
        let soBaiTimThay = 0;
        nutXoa.disabled = tuKhoa === "";
        cacBaiHat.forEach(function (baiHat) {
            const noiDung = chuanHoaVanBan(baiHat.textContent);
            const khopTuKhoa = noiDung.includes(tuKhoa);
            const trangThaiBai = baiHat.dataset.trangThai;
const khopTrangThai =
    trangThaiDangChon === "tat-ca" ||
    trangThaiBai === trangThaiDangChon;
            if (khopTuKhoa && khopTrangThai) {
                baiHat.style.display = "";
                soBaiTimThay++;
            } else {
                baiHat.style.display = "none";
            }
        });
        tongSoBai.textContent = soBaiTimThay;

        if (soBaiTimThay === 0) {
            thongBao.style.display = "block";
        } else {
            thongBao.style.display = "none";
        }
    }
    oTimKiem.addEventListener("input", capNhatDanhSach);
    boLocTrangThai.addEventListener("change", capNhatDanhSach);
    nutDatLaiBoLoc.addEventListener("click", function () {
    boLocTrangThai.value = "tat-ca";
    sapXep.value = "tang-dan";
    oTimKiem.value = "";
    sapXepBaiHat();
    capNhatDanhSach();
});
nutXoaTatCaBoLoc.addEventListener("click", function () {
    oTimKiem.value = "";
    boLocTrangThai.value = "tat-ca";
    sapXep.value = "tang-dan";
    sapXepBaiHat();
    capNhatDanhSach();
    oTimKiem.focus();
});
    nutXoa.addEventListener("click", function () {
        oTimKiem.value = "";
        capNhatDanhSach();
        oTimKiem.focus();
    });
    oTimKiem.addEventListener("keydown", function (suKien) {
        if (suKien.key === "Escape") {
            oTimKiem.value = "";
            capNhatDanhSach();
        }
    });
    function sapXepBaiHat() {
    const cacBai = Array.from(cacBaiHat);
    cacBai.sort(function (baiA, baiB) {
        const maA = baiA.dataset.ma;
const maB = baiB.dataset.ma;
        if (sapXep.value === "giam-dan") {
            return maB.localeCompare(maA);
        }
        return maA.localeCompare(maB);
    });
    cacBai.forEach(function (baiHat) {
        danhSachBai.appendChild(baiHat);
    });
}
sapXep.addEventListener("change", function () {
    sapXepBaiHat();
    capNhatDanhSach();
});
    capNhatDanhSach();
    capNhatThongKeKho();
    const cacONThongKe = document.querySelectorAll(".o-thong-ke");
cacONThongKe.forEach(function (oThongKe) {
    oThongKe.addEventListener("click", function () {
        boLocTrangThai.value = oThongKe.dataset.loc;
        capNhatDanhSach();
    });
});
cacAudio.forEach(function (audioDangPhat) {
    audioDangPhat.addEventListener("play", function () {
        cacAudio.forEach(function (audioKhac) {
            if (audioKhac !== audioDangPhat) {
                audioKhac.pause();
            }
        });
        document.querySelectorAll(".bai-hat").forEach(function (baiHat) {
            baiHat.classList.remove("dang-phat");
        });
        const baiDangPhat = audioDangPhat.closest(".bai-hat");
        if (baiDangPhat) {
            baiDangPhat.classList.add("dang-phat");
        }
    });
    audioDangPhat.addEventListener("pause", function () {
    const baiHat = audioDangPhat.closest(".bai-hat");
    if (baiHat) {
        baiHat.classList.remove("dang-phat");
    }
});
    audioDangPhat.addEventListener("ended", function () {
        const baiHat = audioDangPhat.closest(".bai-hat");
        if (baiHat) {
            baiHat.classList.remove("dang-phat");
        }
    });
});
const cacAnhTheBai = document.querySelectorAll(".anh-the-bai");
cacAnhTheBai.forEach(function (anh) {
    anh.addEventListener("error", function () {
        const lienKetAnh = anh.closest(".lien-ket-anh-bai");
        anh.style.display = "none";
        if (lienKetAnh) {
            lienKetAnh.classList.add("khong-co-anh");
        }
    });
    if (anh.complete && anh.naturalWidth === 0) {
        const lienKetAnh = anh.closest(".lien-ket-anh-bai");
        anh.style.display = "none";
        if (lienKetAnh) {
            lienKetAnh.classList.add("khong-co-anh");
        }
    }
});