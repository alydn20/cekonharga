# Cekon Harga - Bot WhatsApp Treasury

Bot WhatsApp untuk monitoring promo Treasury (ON/OFF) secara real-time.

---

## Fitur

- Cek status promo ON/OFF otomatis
- Notifikasi OFF→ON dikirim **langsung di detik itu juga** + mention semua member grup
- Notifikasi ON biasa: 1x per menit (tanpa mention ulang)
- Notifikasi OFF maksimal 5x lalu stop (sampai ON lagi)
- Tidak ada spam

---

## Command WhatsApp

| Command | Fungsi |
|---------|--------|
| `cekon` | Mulai terima notifikasi ON/OFF |
| `cekonmati` | Berhenti terima notifikasi |

---

## Alur Sistem

```
User kirim "cekon"
       |
       v
   Response: "Mulai"
       |
       v
+----------------------------------+
| BACKEND: Cek harga emas tiap 1s  |
| (tidak dikirim ke WhatsApp)      |
+----------------------------------+
       |
   Harga berubah?
       | Ya
       v
+----------------------------------+
| Cek API promo LANGSUNG           |
| (deteksi OFF→ON seketika)        |
+----------------------------------+
       |
   OFF→ON terdeteksi?
   |Ya                  |Tidak
   v                    v
Kirim SEKARANG      Tunggu 50 detik
+ mention grup          |
                        v
               +------------------+
               | Cek tiap 1 detik |
               | (sampai detik 57)|
               +------------------+
                        |
                        v
               +----------------------------------+
               | KIRIM KE WHATSAPP:               |
               | - ON: "✅ ON" (1x/menit)         |
               | - OFF: "❌ OFF" (1x/mnt, max 5x) |
               +----------------------------------+
```

---

## Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/alydn20/cekonharga.git
cd cekonharga
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Token
```bash
node get-token.js
```

### 4. Jalankan Bot
```bash
node index.js
```

### 5. Scan QR Code
Buka `http://localhost:8000/qr` dan scan dengan WhatsApp

---

## Konfigurasi

Edit `index.js` untuk mengubah credentials Treasury (email & password akun Treasury kamu).

---

## File Struktur

```
cekonharga/
  ├── index.js           # Bot utama
  ├── package.json       # Dependencies
  ├── token.txt          # Token Treasury API
  ├── get-token.js       # Script ambil token
  ├── refresh-token.js   # Script refresh token
  └── README.md          # Dokumentasi
```

---

## API yang Digunakan

| API | Kegunaan |
|-----|----------|
| `api.treasury.id/api/v1/antigrvty/gold/rate` | Harga emas (trigger) |
| `connect.treasury.id/nominal/suggestion` | Status ON/OFF promo |

---

## Pesan yang Dikirim

| Kondisi | Pesan | Mention | Kapan |
|---------|-------|---------|-------|
| OFF → ON | `✅ ON` | Ya (semua member grup) | Seketika saat terdeteksi |
| ON (rutin) | `✅ ON` | Tidak | 1x per menit |
| OFF | `❌ OFF` | Tidak | 1x per menit, max 5x lalu stop |

---

## Troubleshooting

### Token Expired (401)
```bash
node get-token.js
```

### Bot Tidak Kirim Pesan
1. Pastikan sudah ketik `cekon`
2. Cek console untuk error
3. Pastikan token valid

---

## License

Free untuk penggunaan pribadi.
