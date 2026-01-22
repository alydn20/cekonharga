# Available Commands

## 1. Command: `aktif`
**Fungsi:** Aktifkan notifikasi auto-update harga emas
**Output:** Konfirmasi aktivasi + info broadcast settings
**Broadcast:** Setiap 1 menit / 50 detik (saat harga berubah)

## 2. Command: `nonaktif`
**Fungsi:** Matikan notifikasi auto-update harga emas
**Output:** Konfirmasi nonaktif

## 3. Command: `emas`
**Fungsi:** Cek harga emas real-time (manual)
**Output:**
- Harga beli/jual Treasury
- Kurs USD/IDR
- Harga XAU/USD
- Economic calendar USD

## 4. Command: `cekpromo`
**Fungsi:** Lihat semua promo aktif Treasury (manual)
**Output:**
```
================================================================================
[1] PROMO LIST (AKTIF)
================================================================================
[1] Promo Pengguna Baru
    Kode     : COBANABUNGEMAS
    Berlaku  : 2025-12-31 (8 hari)
    Min      : Rp 5.000
    Deskripsi: Disc. 99%* Khusus Pengguna Baru

[2] Fiesta Danamon!
    Kode     : FIESTADANAMON
    Berlaku  : 2025-12-31 (8 hari)
    Min      : Rp 100.000
    Deskripsi: Terima Diskon s.d 5jt Dengan VA Danamon.
...
```

## 5. Command: `cekpromoaktif` ⭐ NEW
**Fungsi:** Aktifkan broadcast promo otomatis
**Output:** Konfirmasi aktivasi
**Broadcast:** Setiap 1 menit (auto-update promo + nominal)

**Output broadcast:**
```
================================================================================
🎁 PROMO TREASURY UPDATE
================================================================================

[1] PROMO LIST (AKTIF)
================================================================================
[1] Promo Pengguna Baru
    Kode     : COBANABUNGEMAS
    Berlaku  : 2025-12-31 (8 hari)
    Min      : Rp 5.000
    Deskripsi: Disc. 99%* Khusus Pengguna Baru
...

================================================================================
[2] NOMINAL PROMO
================================================================================

[1] Promo terbatas FESTIVE
    Asli     : Rp 250.000
    Diskon   : Rp 242.500
    Hemat    : Rp 7,500 (3%)
...
Total: 5 nominal | Potensi hemat: Rp 2,227,500
```

## 6. Command: `cekpromononaktif` ⭐ NEW
**Fungsi:** Matikan broadcast promo otomatis
**Output:** Konfirmasi nonaktif

---

## Requirements

### File Token
Pastikan file `token.txt` ada di folder parent:
```
cekmemru/
  ├── token.txt          ← Token Treasury API
  └── ts-main/
      └── index.js
```

### Update Token
Jika token expired (Error 401):
1. Edit file: `../token.txt`
2. Paste token baru (tanpa kata "Bearer")
3. Save
4. Restart bot

---

## API Endpoints

| Command | Endpoint |
|---------|----------|
| cekpromo | `https://connect.treasury.id/promotion/suggestion` |
| cekpromolangganan | `https://connect.treasury.id/nominal/suggestion` |

---

**Status:** ✅ Ready to use
**Version:** 1.0
