# 📚 Manual Pengguna Sistem Bank Sampah

## Daftar Isi
1. [Pengenalan Sistem](#1-pengenalan-sistem)
2. [Cara Login dan Akses](#2-cara-login-dan-akses)
3. [Navigasi Antarmuka](#3-navigasi-antarmuka)
4. [Dashboard Utama](#4-dashboard-utama)
5. [Manajemen Data Setoran](#5-manajemen-data-setoran)
6. [Manajemen Tabungan](#6-manajemen-tabungan)
7. [Laporan dan Analitik](#7-laporan-dan-analitik)
8. [Pengaturan Sistem](#8-pengaturan-sistem)
9. [Tips dan Troubleshooting](#9-tips-dan-troubleshooting)
10. [FAQ (Pertanyaan Umum)](#10-faq-pertanyaan-umum)
11. [Instalasi Aplikasi Mobile (PWA)](#11-instalasi-aplikasi-mobile-pwa)

---

## 1. Pengenalan Sistem

### Tentang Aplikasi
Sistem Bank Sampah adalah aplikasi web yang dirancang untuk membantu pengelola bank sampah dalam:
- Mencatat setoran sampah dari RT
- Mengelola tabungan setiap RT
- Memantau transaksi penarikan
- Membuat laporan komprehensif
- Mengatur harga sampah per kilogram

### Fitur Utama
- ✅ **Dashboard Monitoring**: Pantau aktivitas harian dan statistik
- ✅ **Input Setoran**: Catat setoran sampah dengan mudah
- ✅ **Manajemen Tabungan**: Kelola saldo dan penarikan RT
- ✅ **Laporan Excel**: Export laporan profesional
- ✅ **Multi-User**: Sistem login dengan peran Admin dan Operator
- ✅ **Responsive**: Dapat digunakan di desktop dan mobile

---

## 2. Cara Login dan Akses

### Akun Default
Sistem menyediakan akun default untuk memulai:

**Admin:**
- Username: `admin`
- Password: `admin123`

**Operator:**
- Username: `operator`
- Password: `operator123`

### Langkah Login
1. Buka aplikasi di browser
2. Masukkan username dan password
3. Klik tombol "Masuk"
4. Sistem akan mengarahkan ke dashboard utama

### Perbedaan Peran
- **Admin**: Akses penuh ke semua fitur termasuk pengaturan sistem
- **Operator**: Akses terbatas untuk input data dan laporan

⚠️ **Penting**: Segera ganti password default setelah login pertama untuk keamanan!

---

## 3. Navigasi Antarmuka

### Desktop (Layar Besar)
- **Sidebar Kiri**: Menu navigasi utama yang dapat disembunyikan
- **Header**: Informasi user dan tombol logout
- **Area Konten**: Tampilan utama aplikasi

### Mobile (Smartphone/Tablet)
- **Bottom Navigation**: 4 tab utama di bagian bawah
  - 🏠 Dashboard
  - 📦 Setoran
  - 💰 Tabungan
  - 📊 Laporan
- **Menu Hamburger**: Akses ke Settings dan fitur lainnya

### Menu Utama
1. **Dashboard** - Ringkasan dan statistik
2. **Setoran** - Input data setoran sampah
3. **Tabungan** - Kelola tabungan RT
4. **Laporan** - Lihat dan export laporan
5. **Settings** - Pengaturan sistem

---

## 4. Dashboard Utama

### Statistik Utama
Dashboard menampilkan 4 kartu statistik penting:

1. **Total RT**
   - Jumlah RT yang terdaftar dalam sistem
   - Status: Data tersedia/Belum ada data

2. **Setoran Hari Ini**
   - Total berat sampah yang disetor hari ini (kg)
   - Status: Ada aktivitas/Belum ada data

3. **Total Tabungan**
   - Jumlah saldo keseluruhan semua RT
   - Format: Rupiah dengan pemisah ribuan

4. **Transaksi Bulan Ini**
   - Jumlah transaksi setoran dan penarikan bulan berjalan
   - Status: Ada aktivitas/Belum ada data

### Informasi Tambahan

#### Transaksi Terbaru
- Menampilkan 5 transaksi terakhir
- Ikon hijau (↗️) untuk setoran
- Ikon kuning (↘️) untuk penarikan
- Informasi: RT, tanggal, jumlah, nilai

#### Tabungan RT
- Menampilkan 5 RT dengan saldo tertinggi
- Informasi: Nama RT, jumlah transaksi, saldo

### Tips Dashboard
- Dashboard diperbarui secara otomatis saat ada perubahan data
- Kartu statistik berubah warna sesuai status
- Klik refresh browser jika data tidak update

---

## 5. Manajemen Data Setoran

### Cara Input Setoran Baru

1. **Pilih Menu Setoran**
   - Klik "Setoran" di sidebar atau bottom navigation

2. **Isi Form Setoran**
   - **RT**: Pilih RT dari dropdown (otomatis dimuat dari data)
   - **Jenis Sampah**: Pilih jenis sampah yang disetor
   - **Berat**: Masukkan berat dalam kilogram
   - **Tanggal**: Pilih tanggal setoran (default hari ini)

3. **Simpan Data**
   - Klik tombol "Simpan Setoran"
   - Sistem akan menghitung nilai otomatis berdasarkan harga
   - Konfirmasi akan muncul jika berhasil

### Jenis Sampah yang Tersedia
- **Plastik**: Rp 2.000/kg
- **Kertas**: Rp 1.500/kg
- **Logam**: Rp 5.000/kg
- **Kaca**: Rp 1.000/kg

*Harga dapat diubah di menu Settings*

### Fitur Tambahan
- **Riwayat Setoran**: Lihat history setoran yang sudah diinput
- **Edit Data**: Modifikasi setoran yang salah (jika diperlukan)
- **Validasi**: Sistem mencegah input data yang tidak valid

### Tips Input Setoran
- Pastikan RT sudah terdaftar sebelum input setoran
- Cek kembali berat dan jenis sampah sebelum menyimpan
- Gunakan format angka desimal dengan titik (.) bukan koma (,)

---

## 6. Manajemen Tabungan

### Dashboard Tabungan
Halaman tabungan menampilkan:
- **Total Tabungan**: Saldo keseluruhan RW
- **Total Setoran**: Akumulasi nilai setoran
- **Total Penarikan**: Jumlah yang sudah ditarik

### Cara Melakukan Penarikan

1. **Akses Menu Tabungan**
   - Klik "Tabungan" di navigation

2. **Klik Tombol Penarikan**
   - Klik tombol "Penarikan" di pojok kanan atas

3. **Isi Form Penarikan**
   - **Pilih RT**: Dropdown menampilkan RT yang memiliki saldo
   - **Lihat Saldo**: Saldo tersedia akan ditampilkan
   - **Jumlah Penarikan**: Masukkan nominal yang ingin ditarik

4. **Proses Penarikan**
   - Klik "Proses Penarikan"
   - Sistem akan memvalidasi saldo mencukupi
   - Konfirmasi transaksi akan muncul

### Informasi Tabungan per RT
Sistem menampilkan:
- **Nama RT**: Identifikasi RT
- **Saldo Saat Ini**: Jumlah tabungan tersedia
- **Jumlah Transaksi**: Total aktivitas setoran/penarikan
- **Tanggal Terakhir**: Aktivitas terakhir RT

### Riwayat Transaksi
Lihat history lengkap:
- Tanggal dan waktu transaksi
- Jenis transaksi (setoran/penarikan)
- Jumlah dan nilai
- RT yang terlibat

### Tips Manajemen Tabungan
- Selalu verifikasi identitas RT sebelum penarikan
- Catat penarikan secara manual sebagai backup
- Monitor saldo secara berkala untuk transparansi

---

## 7. Laporan dan Analitik

### Filter Laporan
Sebelum generate laporan, atur filter:

1. **Jenis Laporan**
   - Harian: Data per hari
   - Mingguan: Data per minggu
   - Bulanan: Data per bulan (default)
   - Tahunan: Data per tahun

2. **Rentang Tanggal**
   - Tanggal Mulai: Pilih tanggal awal periode
   - Tanggal Selesai: Pilih tanggal akhir periode

3. **Generate Laporan**
   - Klik tombol "Generate" untuk memproses data

### Komponen Laporan

#### Metrik Utama
- **Total Setoran**: Berat sampah dalam kg
- **Total Nilai**: Nilai dalam Rupiah
- **RT Aktif**: Jumlah RT yang melakukan setoran
- **Total Transaksi**: Jumlah semua aktivitas

#### Distribusi Jenis Sampah
- Breakdown per jenis sampah
- Persentase dari total setoran
- Visualisasi progress bar
- Nilai ekonomis per jenis

#### Ranking RT
- Peringkat RT berdasarkan setoran
- Badge peringkat (1-3 mendapat highlight)
- Detail: berat, nilai, jumlah transaksi

#### Tren Harian
- Grafik batang 7 hari terakhir
- Visualisasi pola setoran harian
- Hover untuk detail per hari

### Export Laporan Excel

1. **Klik Tombol Export Excel**
   - Berada di pojok kanan atas halaman laporan

2. **File Excel Otomatis Terdownload**
   - Format: `laporan-banksampah-YYYY-MM-DD.xlsx`
   - Tersimpan di folder Download

3. **Struktur File Excel**
   - **Sheet 1 - Ringkasan**: Statistik utama dan periode laporan
   - **Sheet 2 - Ranking RT**: Tabel lengkap performa RT
   - **Sheet 3 - Distribusi Sampah**: Breakdown jenis sampah
   - **Sheet 4 - Tren Harian**: Data harian 7 hari terakhir

### Fitur Excel
- **Format Profesional**: Header berwarna, border, font yang rapi
- **Format Rupiah**: Angka sudah diformat dengan pemisah ribuan
- **Auto-width**: Lebar kolom otomatis menyesuaikan
- **Data Lengkap**: Semua informasi tersedia untuk analisis lanjut

### Tips Laporan
- Generate laporan secara berkala untuk monitoring
- Simpan file Excel sebagai arsip bulanan
- Gunakan filter yang tepat sesuai kebutuhan analisis
- Share laporan dengan stakeholder untuk transparansi

---

## 8. Pengaturan Sistem

### Harga Sampah
Kelola harga per kilogram setiap jenis sampah:

1. **Akses Settings → Harga Sampah**
2. **Edit Harga**: Ubah angka di kolom input
3. **Simpan**: Klik "Simpan Harga" untuk konfirmasi

**Harga Default:**
- Plastik: Rp 2.000/kg
- Kertas: Rp 1.500/kg
- Logam: Rp 5.000/kg
- Kaca: Rp 1.000/kg

### Konfigurasi Aplikasi
Atur informasi umum sistem:

- **Nama RW**: Identitas RW pengelola
- **Penanggung Jawab**: Nama admin/koordinator
- **No. Telepon**: Kontak yang bisa dihubungi
- **Alamat**: Lokasi bank sampah

### Pengaturan Notifikasi
Kontrol pemberitahuan sistem:

- ✅ **Notifikasi Push**: Pemberitahuan dalam aplikasi
- ✅ **WhatsApp Notifikasi**: Notifikasi via WhatsApp
- ❌ **Laporan Email**: Kirim laporan via email
- ✅ **Auto Backup**: Backup otomatis harian

### Manajemen Data

#### Backup Data
- **Fungsi**: Download semua data sistem dalam format JSON
- **Cara**: Klik tombol "Backup Data"
- **File**: Tersimpan sebagai `banksampah-backup-YYYY-MM-DD.json`

#### Restore Data
- **Fungsi**: Pulihkan data dari file backup
- **Cara**: Klik "Restore Data" → Pilih file JSON
- **Penting**: Proses ini akan menimpa data yang ada

#### Reset Data
- **Fungsi**: Hapus semua data dan kembali ke pengaturan awal
- **Peringatan**: ⚠️ **Tidak dapat dibatalkan!**
- **Konfirmasi**: Sistem meminta konfirmasi sebelum reset

#### Retensi Data
- **Pengaturan**: Tentukan berapa hari data disimpan
- **Default**: 365 hari
- **Otomatis**: Sistem akan hapus data lama secara otomatis

### Informasi Sistem
Monitor status sistem:
- **Versi Aplikasi**: v1.0.0
- **Database**: IndexedDB (local storage)
- **Status**: Online/Offline
- **Total RT**: Jumlah RT terdaftar
- **Total Transaksi**: Semua aktivitas
- **Ukuran Database**: Space yang digunakan (KB)

---

## 9. Tips dan Troubleshooting

### Tips Penggunaan Optimal

#### Untuk Input Data
- **Konsistensi**: Selalu gunakan format yang sama untuk nama RT
- **Verifikasi**: Double-check data sebelum menyimpan
- **Backup Rutin**: Lakukan backup minimal seminggu sekali
- **Update Harga**: Sesuaikan harga sampah dengan kondisi pasar

#### Untuk Laporan
- **Periode Tetap**: Gunakan periode laporan yang konsisten
- **Analisis Tren**: Bandingkan laporan bulanan untuk melihat tren
- **Dokumentasi**: Simpan laporan Excel sebagai arsip
- **Sharing**: Bagikan laporan dengan pengurus RW untuk transparansi

#### Untuk Keamanan
- **Ganti Password**: Ubah password default segera
- **Logout**: Selalu logout setelah selesai menggunakan
- **Browser**: Gunakan browser modern (Chrome, Firefox, Safari)
- **Update**: Pastikan aplikasi selalu versi terbaru

### Troubleshooting Umum

#### Masalah Login
**Gejala**: Tidak bisa masuk ke sistem
**Solusi**:
1. Pastikan username dan password benar
2. Clear cache browser
3. Coba browser lain
4. Periksa koneksi internet

#### Data Tidak Muncul
**Gejala**: Dashboard atau data kosong
**Solusi**:
1. Refresh browser (F5 atau Ctrl+R)
2. Clear browser cache
3. Periksa apakah data sudah diinput
4. Coba logout dan login kembali

#### Export Excel Gagal
**Gejala**: File Excel tidak terdownload
**Solusi**:
1. Pastikan browser mengizinkan download
2. Cek ruang disk yang tersedia
3. Disable popup blocker
4. Coba browser lain

#### Aplikasi Lambat
**Gejala**: Loading lama atau hang
**Solusi**:
1. Close tab browser lain
2. Restart browser
3. Clear cache dan cookies
4. Periksa koneksi internet
5. Restart komputer/device

#### Error Saat Input
**Gejala**: Gagal menyimpan data
**Solusi**:
1. Periksa format input (angka vs teks)
2. Pastikan semua field wajib diisi
3. Coba refresh dan input ulang
4. Periksa apakah RT sudah terdaftar

### Pemeliharaan Berkala

#### Harian
- ✅ Input setoran sampah
- ✅ Monitor dashboard
- ✅ Backup data penting

#### Mingguan
- ✅ Generate laporan mingguan
- ✅ Cek saldo tabungan RT
- ✅ Backup sistem lengkap

#### Bulanan
- ✅ Export laporan Excel bulanan
- ✅ Review dan update harga sampah
- ✅ Bersihkan data lama (jika perlu)
- ✅ Update password (rekomendasi)

---

## 10. FAQ (Pertanyaan Umum)

### Q: Bagaimana cara menambah RT baru?
**A**: Saat input setoran pertama kali untuk RT baru, sistem akan otomatis menambahkan RT tersebut ke database. Pastikan nama RT ditulis konsisten.

### Q: Bisa ubah data setoran yang sudah diinput?
**A**: Untuk versi saat ini, data yang sudah tersimpan tidak bisa diedit langsung. Jika ada kesalahan, hubungi admin untuk koreksi manual atau gunakan fitur reset (dengan backup terlebih dahulu).

### Q: Kenapa RT tidak muncul di dropdown?
**A**: RT baru akan muncul di dropdown setelah melakukan setoran pertama. Pastikan nama RT ditulis dengan benar dan konsisten.

### Q: Data hilang setelah refresh browser?
**A**: Data tersimpan di local storage browser. Jika hilang, kemungkinan:
- Browser cache di-clear
- Menggunakan browser/device lain
- Private/incognito mode
Solusi: Restore dari backup atau input ulang.

### Q: Bagaimana cara backup data secara otomatis?
**A**: Aktifkan "Auto Backup" di Settings. Namun, tetap disarankan backup manual secara berkala untuk keamanan ekstra.

### Q: Bisa digunakan offline?
**A**: Aplikasi ini memerlukan koneksi internet minimal saat pertama kali loading. Setelah itu, sebagian fungsi bisa bekerja offline, tapi sync data memerlukan internet.

### Q: Format angka untuk input berat?
**A**: Gunakan titik (.) untuk desimal, bukan koma (,). Contoh: 2.5 untuk dua setengah kilogram.

### Q: Laporan Excel tidak sesuai periode?
**A**: Pastikan:
1. Filter tanggal sudah benar
2. Sudah klik "Generate" sebelum export
3. Data periode tersebut memang ada

### Q: Forgot password admin?
**A**: Untuk reset password admin, gunakan fitur "Reset Data" di Settings (akan menghapus semua data) atau hubungi developer untuk solusi khusus.

### Q: Sistem support multi-RW?
**A**: Versi saat ini dirancang untuk satu RW. Untuk multi-RW, perlu instalasi terpisah atau upgrade ke versi enterprise.

---

## 📞 Dukungan Teknis

Jika mengalami masalah yang tidak tercantum dalam manual ini:

1. **Cek Manual**: Baca ulang bagian yang relevan
2. **Restart**: Coba restart browser/aplikasi
3. **Backup**: Selalu backup data sebelum troubleshooting
4. **Dokumentasi**: Catat error message yang muncul
5. **Kontak**: Hubungi tim teknis dengan detail masalah

---

## 📝 Catatan Versi

**Versi 1.0.0** (Current)
- ✅ Sistem login multi-user
- ✅ Dashboard monitoring
- ✅ Input setoran sampah
- ✅ Manajemen tabungan RT
- ✅ Export laporan Excel
- ✅ Responsive design (mobile + desktop)
- ✅ Backup/restore data

**Fitur Mendatang**:
- 🔄 Edit data setoran
- 📱 Notifikasi push real-time
- 📧 Email laporan otomatis
- 👥 Manajemen user advanced
- 📊 Dashboard analitik lebih detail

---

## 11. Instalasi Aplikasi Mobile (PWA)

### Tentang Progressive Web App
Sistem Bank Sampah mendukung teknologi Progressive Web App (PWA) yang memungkinkan:
- **Instalasi seperti aplikasi native** di smartphone dan desktop
- **Bekerja secara offline** untuk akses tanpa internet
- **Notifikasi push** untuk update penting
- **Sinkronisasi otomatis** saat kembali online
- **Akses cepat** tanpa membuka browser

### Cara Install di Android
1. Buka aplikasi di browser Chrome
2. Tunggu hingga muncul notifikasi "Install Aplikasi" di bagian bawah layar
3. Klik tombol **"Install"**
4. Konfirmasi instalasi
5. Aplikasi akan muncul di home screen seperti aplikasi biasa

### Cara Install di iPhone/iPad
1. Buka aplikasi di browser Safari
2. Tap ikon **Share** (kotak dengan panah ke atas)
3. Pilih **"Add to Home Screen"**
4. Ubah nama jika diperlukan
5. Tap **"Add"**

### Cara Install di Desktop
1. Buka aplikasi di browser Chrome/Edge
2. Klik ikon **install** di address bar (biasanya sebelah bookmark)
3. Klik **"Install"** di dialog yang muncul
4. Aplikasi akan tersedia di Start Menu/Applications

### Mengaktifkan Notifikasi
1. Setelah install, buka **Menu Settings**
2. Scroll ke bagian **"Aplikasi Mobile (PWA)"**
3. Klik tombol **"Aktifkan"** di bagian Notifikasi Push
4. Izinkan notifikasi saat browser meminta permission
5. Anda akan menerima notifikasi test untuk konfirmasi

### Fitur Offline
Aplikasi dapat bekerja secara offline untuk:
- ✅ Melihat data yang sudah dimuat sebelumnya
- ✅ Input setoran baru (akan disinkronkan saat online)
- ✅ Lihat tabungan dan transaksi tersimpan
- ❌ Download laporan Excel (memerlukan koneksi)
- ❌ Backup/restore data (memerlukan koneksi)

### Status Aplikasi PWA
Di **Menu Settings > Aplikasi Mobile (PWA)** Anda dapat melihat:
- **Status Instalasi**: Apakah aplikasi sudah terinstall
- **Notifikasi Push**: Status aktif/nonaktif notifikasi
- **Status Koneksi**: Online/offline
- **Fitur PWA**: Daftar fitur yang tersedia

### Tips Penggunaan PWA
1. **Update Otomatis**: Aplikasi akan update otomatis saat online
2. **Refresh Data**: Buka aplikasi saat online untuk sinkronisasi
3. **Storage**: Data offline disimpan di perangkat, pastikan storage cukup
4. **Battery**: Mode offline menghemat battery karena tidak perlu koneksi

---

*Manual ini dibuat untuk membantu pengelola bank sampah menggunakan sistem dengan optimal. Pastikan selalu menggunakan versi manual yang sesuai dengan versi aplikasi.*

**Terakhir diperbarui**: 15 Agustus 2025  
**Versi Manual**: 1.1.0  
**Kompatibel dengan**: Sistem Bank Sampah v1.1.0 (PWA Ready)
