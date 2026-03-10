# Command WhatsApp

## Command Aktif

| Command | Fungsi | Response |
|---------|--------|----------|
| `cekon` | Subscribe notifikasi ON/OFF | `Mulai` |
| `cekonmati` | Unsubscribe notifikasi | `Berhenti` |

---

## Notifikasi yang Diterima

| Status | Pesan | Mention |
|--------|-------|---------|
| ON | `ON` | Ya (semua member grup) |
| OFF | `OFF` | Tidak |

---

## Aturan Pengiriman

- **ON**: Dikirim 1x per menit
- **OFF**: Dikirim 1x per menit, maksimal 5x total
- Setelah 5x OFF, tidak ada pesan lagi sampai ON
- Saat ON, counter OFF di-reset

---

## Alur Sistem

```
1. User kirim "cekon"
2. Bot reply "Mulai"
3. Backend cek harga emas tiap 1 detik
4. Saat harga berubah → tunggu 5 detik
5. Mulai cek API promo tiap 1 detik (sampai detik 57)
6. Kirim ON/OFF sesuai aturan di atas
7. Stop di detik 57, tunggu harga berubah lagi
```

---

## API yang Digunakan

| Endpoint | Kegunaan |
|----------|----------|
| `api.treasury.id/api/v1/antigrvty/gold/rate` | Harga emas (trigger) |
| `connect.treasury.id/nominal/suggestion` | Status ON/OFF promo |

---

## Command Tidak Aktif (Disabled)

- ~~`aktif`~~ - gunakan `cekon`
- ~~`nonaktif`~~ - gunakan `cekonmati`
- ~~`emas`~~ - disabled
- ~~`cekpromo`~~ - disabled
- ~~`telpon`~~ - disabled
- ~~`ceklistpromoaktif`~~ - disabled
- ~~`ceklistpromononaktif`~~ - disabled
