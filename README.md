# Cekon Harga - Bot WhatsApp Treasury

Bot WhatsApp untuk monitoring promo Treasury (ON/OFF) secara real-time.

---

## Fitur

- Cek status promo ON/OFF otomatis
- Notifikasi ON dengan mention semua member grup
- Notifikasi OFF maksimal 5x lalu stop (sampai ON lagi)
- Tidak ada spam - hanya 1 pesan per menit

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
   Tunggu 5 detik
       |
       v
+----------------------------------+
| Cek API promo tiap 1 detik       |
| (sampai detik 57)                |
+----------------------------------+
       |
       v
+----------------------------------+
| KIRIM KE WHATSAPP:               |
| - ON: "ON" + mention (1x/menit)  |
| - OFF: "OFF" (1x/mnt, max 5x)    |
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

Edit `index.js` untuk mengubah credentials Treasury:

```javascript
"email": "083898584984",
"password": "@Facebook20",
```

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

| Status | Pesan | Mention | Frekuensi |
|--------|-------|---------|-----------|
| ON | `ON` | Ya (semua member) | 1x per menit |
| OFF | `OFF` | Tidak | 1x per menit, max 5x |

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
