# 🏛️ CIDATAR Bank Sampah - KKN Project

Aplikasi Bank Sampah modern untuk mengelola sistem tabungan sampah di tingkat RT/RW dengan antarmuka yang user-friendly dan penyimpanan lokal.

## 🌟 Features

### 📊 Dashboard Real-time
- Statistik total RT terdaftar
- Setoran sampah hari ini
- Total tabungan keseluruhan
- Transaksi bulan berjalan
- Riwayat transaksi terbaru

### 🏘️ Manajemen RT
- CRUD data Rukun Tetangga
- Informasi ketua RT dan jumlah KK
- Tracking saldo tabungan per RT
- Riwayat transaksi per RT

### ♻️ Sistem Setoran Sampah
- Input setoran dengan berbagai jenis sampah
- Kalkulasi otomatis nilai tabungan
- Harga sampah yang dapat dikonfigurasi
- Update real-time saldo RT

### 💰 Manajemen Tabungan
- Saldo tabungan per RT
- Sistem penarikan dengan validasi
- Riwayat transaksi lengkap
- Summary statistik tabungan

### 📈 Laporan & Analitik
- Laporan berdasarkan periode tanggal
- Distribusi jenis sampah
- Ranking performa RT
- Tren setoran harian
- Export ke JSON/CSV

### ⚙️ Pengaturan Sistem
- Konfigurasi harga sampah
- Backup & restore data
- Informasi sistem real-time
- Reset data dengan konfirmasi

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Icons**: Lucide React
- **Storage**: localStorage (Client-side)
- **State Management**: React Hooks + Custom Storage Utilities

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ atau Bun
- Git

### Clone Repository
```bash
git clone https://github.com/mohyasrul/CIDATAR-KKN.git
cd CIDATAR-KKN
```

### Install Dependencies
```bash
# Using npm
npm install

# Using bun
bun install
```

### Run Development Server
```bash
# Using npm
npm run dev

# Using bun
bun dev
```

Aplikasi akan berjalan di `http://localhost:8080`

### Build for Production
```bash
# Using npm
npm run build

# Using bun
bun run build
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components (Shadcn)
│   ├── Dashboard.tsx    # Dashboard utama
│   ├── RTManagement.tsx # Manajemen RT
│   ├── WasteDeposit.tsx # Input setoran sampah
│   ├── Savings.tsx      # Manajemen tabungan
│   ├── Reports.tsx      # Laporan & analitik
│   └── Settings.tsx     # Pengaturan sistem
├── lib/
│   ├── localStorage.ts  # Utilities untuk localStorage
│   └── utils.ts        # Helper utilities
├── hooks/              # Custom React hooks
├── pages/              # Page components
└── main.tsx           # Entry point
```

## 💾 Data Storage

Aplikasi menggunakan **localStorage** untuk penyimpanan data client-side dengan fitur:
- ✅ Auto-save semua perubahan
- ✅ Real-time synchronization antar komponen
- ✅ Backup & restore functionality
- ✅ Data persistence antar session
- ✅ No database required

## 🔄 Workflow

1. **Setup RT** → Tambah data RT di menu RT Management
2. **Input Setoran** → Catat setoran sampah per RT
3. **Auto-Update** → Tabungan RT otomatis bertambah
4. **Penarikan** → Proses penarikan tabungan dengan validasi
5. **Monitoring** → Pantau via Dashboard dan Laporan

## 🎯 Key Features

- **Real-time Updates**: Semua perubahan langsung ter-sync
- **Responsive Design**: Mobile-friendly interface
- **Data Validation**: Input validation untuk semua form
- **Export Functionality**: Export laporan ke JSON/CSV
- **Backup System**: Backup dan restore seluruh data
- **User-friendly**: Interface intuitif dan mudah digunakan

## 👥 Target Users

- Pengurus Bank Sampah RT/RW
- Admin komunitas lingkungan
- Koordinator program kebersihan
- Tim KKN/mahasiswa

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

**CIDATAR KKN Team**
- GitHub: [@mohyasrul](https://github.com/mohyasrul)
- Repository: [CIDATAR-KKN](https://github.com/mohyasrul/CIDATAR-KKN)

---

### 🌱 Developed for Environmental Sustainability
*Mendukung program pengelolaan sampah berkelanjutan di tingkat komunitas*
