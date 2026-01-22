# Treasury WhatsApp Bot

Bot WhatsApp untuk monitoring harga emas Treasury secara real-time dengan fitur auto-broadcast dan promo subscription.

## 🚀 Features

### 📊 Harga Emas Real-Time
- Auto-update setiap 1 detik
- Broadcast saat harga berubah (min ±Rp1)
- Broadcast setiap ganti menit atau per 50 detik
- Include USD/IDR rate dari Google Finance
- Include XAU/USD rate
- Economic calendar USD (High-Impact events)

### 🎁 Promo Treasury
- Auto-broadcast promo setiap 1 menit
- List promo aktif dengan expiry countdown
- Nominal promo dengan perhitungan hemat otomatis
- Subscribe/unsubscribe broadcast promo

---

## 📋 Available Commands

| Command | Fungsi | Type |
|---------|--------|------|
| `emas` | Cek harga emas (manual) | Manual |
| `aktif` | Subscribe broadcast harga | Subscription |
| `nonaktif` | Unsubscribe broadcast harga | Subscription |
| `cekpromo` | Lihat promo aktif lengkap (ON/OFF + List) | Manual |
| `cekon` / `cekpromoaktif` | Subscribe broadcast ON/OFF status 20jt | Subscription |
| `cekonnonaktif` / `cekpromononaktif` | Unsubscribe broadcast promo | Subscription |

---

## ⚙️ Installation

### 1. Clone Repository
```bash
git clone https://github.com/alydn20/tscek.git
cd tscek
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Token File

**⚡ OTOMATIS (Recommended):**
```bash
# Run script untuk auto-login dan dapat token baru
node get-token.js
```

Script akan otomatis:
- Login ke Treasury API
- Ambil token baru
- Save ke `token.txt`
- ✅ Token siap dipakai!

**🔧 MANUAL (Jika perlu):**
1. Install [HTTP Toolkit](https://httptoolkit.com/)
2. Intercept aplikasi Treasury di HP
3. Copy header `Authorization` dari request ke `connect.treasury.id`
4. Paste ke `token.txt` (tanpa kata "Bearer")

### 4. Run Bot
```bash
node index.js
```

---

## 🔧 Configuration

Edit `index.js` untuk custom settings:

```javascript
// Broadcast settings
const PRICE_CHECK_INTERVAL = 1000 // Check harga setiap 1 detik
const MIN_PRICE_CHANGE = 1 // Min perubahan harga untuk broadcast (Rp)
const BROADCAST_COOLDOWN = 50000 // Cooldown antar broadcast (50 detik)

// Promo broadcast
const PROMO_BROADCAST_INTERVAL = 60000 // Broadcast promo setiap 1 menit

// Anti-spam
const COOLDOWN_PER_CHAT = 60000 // Cooldown per chat
const GLOBAL_THROTTLE = 3000 // Global throttle
```

---

## 📱 Usage

### Subscribe Harga Emas:
1. Chat bot di WhatsApp
2. Ketik: `aktif`
3. Bot akan broadcast update harga setiap 1 menit / 50 detik

### Subscribe Promo ON/OFF:
1. Chat bot di WhatsApp
2. Ketik: `cekon` atau `cekpromoaktif`
3. Bot akan broadcast status ON/OFF promo 20jt setiap 1 menit

### Manual Check:
- Ketik: `emas` → Lihat harga real-time
- Ketik: `cekpromo` → Lihat detail promo (ON/OFF + List lengkap)

---

## 🐳 Docker Deployment

### Build Image:
```bash
docker build -t treasury-bot .
```

### Run Container:
```bash
docker run -d --name treasury-bot treasury-bot
```

---

## 📁 File Structure

```
ts-main/
  ├── index.js              # Main bot file
  ├── package.json          # Dependencies
  ├── package-lock.json     # Lock file
  ├── Dockerfile            # Docker config
  ├── .dockerignore         # Docker ignore
  ├── .gitignore            # Git ignore
  ├── COMMANDS.md           # Command documentation
  └── README.md             # This file

cekmemru/ (parent directory)
  └── token.txt             # Treasury API token (required!)
```

---

## 🔐 Security Notes

⚠️ **IMPORTANT:**
- **NEVER** commit `token.txt` to git
- **NEVER** share your token with others
- Token = full access to your Treasury account
- Token akan expired setelah beberapa waktu (update di `token.txt`)

---

## 🛠️ Troubleshooting

### Error: Token expired (401)
**Solusi CEPAT:**
```bash
# Run script auto refresh token
node get-token.js

# Restart bot
node index.js
```

**Solusi Manual:**
1. Ambil token baru dari aplikasi Treasury (via HTTP Toolkit)
2. Edit file `token.txt`
3. Paste token baru
4. Restart bot

### Error: File token.txt not found
**Solusi:**
Pastikan file `token.txt` ada di parent directory:
```
cekmemru/token.txt  ← Harus ada di sini
cekmemru/ts-main/index.js
```

### Bot tidak kirim broadcast
**Cek:**
1. Apakah ada subscriber? (ketik `aktif` atau `cekpromoaktif`)
2. Lihat console log untuk error
3. Pastikan token masih valid

---

## 📊 API Endpoints Used

| Endpoint | Usage |
|----------|-------|
| `api.treasury.id/api/v1/antigrvty/gold/rate` | Harga emas beli/jual |
| `connect.treasury.id/promotion/suggestion` | List promo aktif |
| `connect.treasury.id/nominal/suggestion` | Nominal promo |
| `www.google.com/finance/quote/USD-IDR` | Kurs USD/IDR |
| Economic Calendar API | USD High-Impact events |

---

## 📝 License

Free to use untuk keperluan pribadi.

---

## 🤝 Contributing

Pull requests are welcome!

---

## 📧 Support

Jika ada pertanyaan atau bug report, silakan buat issue di GitHub.

---

**Made with ❤️ for Treasury users**
