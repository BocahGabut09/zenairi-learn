# Zenairi Learn

Website pembelajaran Bahasa Zenairi dengan Supabase Auth dan penyimpanan progres.

## Fitur yang dipertahankan

- Daftar, masuk, dan keluar menggunakan Supabase Auth.
- Dashboard XP, level, streak, dan persentase materi selesai.
- Delapan materi bertahap, latihan pilihan ganda, hasil kuis, dan riwayat percobaan.
- Kamus yang dapat dicari dan difilter; entri dengan bentuk kata sama tetapi arti berbeda tetap ditampilkan terpisah.
- Pencapaian dan halaman profil.
- Layout responsif untuk ponsel dan desktop.

## Pembaruan visual dan pengalaman belajar

- Desain minimalis modern dengan palet biru, putih, dan cyan mengikuti mockup.
- Maskot Zeni (rubah-merak) tersedia sebagai ilustrasi WebP dan ikon identitas.
- Tema otomatis mengikuti pengaturan terang/gelap perangkat, dengan pilihan manual Terang/Gelap; preferensi disimpan di perangkat.
- Kuis memiliki langkah **Periksa jawaban**. Jawaban benar/salah ditandai, jawaban yang benar ditampilkan, dan pembahasan singkat muncul sebelum pengguna dapat melanjutkan.
- Ilustrasi dioptimalkan ke WebP dan dimuat secara lazy saat sesuai.
- Header `_headers` menambahkan cache untuk aset statis pada Cloudflare Pages.
- Kamus dapat diunduh sebagai CSV UTF-8 untuk dibuka di spreadsheet.
- PWA/service worker menyimpan shell aplikasi, materi, kamus, gambar, dan PDF agar dapat dibuka kembali saat offline pada perangkat yang sudah pernah memuatnya.
- Status koneksi ditampilkan; hasil kuis dan progres tetap memerlukan internet untuk disimpan ke Supabase.

## Konfigurasi Supabase

Aplikasi tetap memakai proyek Supabase Zenairi yang sudah dikonfigurasi di `src/supabase.js`. Client menggunakan URL proyek dan publishable key yang aman untuk frontend. Jangan pernah memasukkan `service_role` atau secret key ke browser.

Database yang digunakan: `public.user_progress` dan `public.quiz_attempts`. Keduanya memakai Row Level Security (RLS) agar pengguna hanya dapat mengakses data miliknya sendiri. Pembaruan ini tidak mengubah skema database dan tidak mereset progres.

Pendaftaran dapat mengharuskan pengguna mengonfirmasi email, bergantung pada pengaturan Authentication di Supabase.

## Menjalankan lokal

Aplikasi adalah situs statis berbasis JavaScript module. Jalankan server lokal dari folder proyek (jangan buka `index.html` langsung dengan `file://`):

```bash
python -m http.server 4173
```

Lalu buka `http://localhost:4173`.

## Deploy ke Cloudflare Pages

- Framework preset: **None** (static site).
- Build command: kosongkan / tidak diperlukan.
- Build output directory: `/` (root proyek).
- Hubungkan repository GitHub atau unggah aset statis melalui alur Pages yang tersedia.

`_headers` sudah disertakan untuk caching aset gambar.

## Berkas acuan

- `docs/Kamus_Bahasa_Zenairi.pdf`: sumber kamus.
- `docs/design-reference.webp`: mockup visual yang dijadikan acuan tampilan.
- `assets/zeni-mascot.webp`: ilustrasi maskot untuk antarmuka.
- `assets/zeni-mark.svg`: ikon/favikon brand.

## Catatan

Materi, kosakata, aturan bahasa, autentikasi, dan penyimpanan progres dari proyek awal dipertahankan. Perubahan kali ini berfokus pada tampilan, aset, tema, dan pengalaman koreksi kuis.


## Login dengan Google (OAuth)

Halaman login dan daftar menyediakan tombol **Lanjutkan dengan Google** melalui Supabase Auth. Login email/kata sandi tetap tersedia. Provider Apple tidak disertakan pada versi ini.

Agar Google Login berfungsi:
1. Buat OAuth Client ID bertipe **Web application** di Google Cloud Console. Tambahkan domain website pada Authorized JavaScript origins.
2. Tambahkan callback berikut pada Authorized redirect URIs Google: `https://fbrtzbojkmvachywwcno.supabase.co/auth/v1/callback`.
3. Masukkan Google Client ID dan Client Secret ke Supabase Dashboard → Authentication → Sign In / Providers → Google.
4. Di Supabase → Authentication → URL Configuration, atur Site URL ke alamat produksi website dan tambahkan alamat website ke Redirect URLs.

**Keamanan:** jangan menaruh Client Secret atau `service_role` key di file frontend atau ZIP. Masukkan Client Secret langsung ke dashboard Supabase.


## Pembaruan keamanan (6 November 2026)

Versi ini memindahkan pemberian XP dan pencatatan penyelesaian materi ke fungsi database `complete_zenairi_lesson`. Browser tidak lagi boleh menulis langsung ke tabel progres/riwayat. XP diberikan tetap **20 XP satu kali per materi**; mengulang kuis tetap mencatat percobaan tetapi tidak menambah XP lagi. Fungsi juga memvalidasi ID materi, rentang skor, dan menjaga update progres tetap atomik.

### Wajib dilakukan sebelum deploy versi ini

1. Buka Supabase Dashboard → **SQL Editor**.
2. Buka file `supabase/migrations/202611060001_secure_lesson_progress.sql`, salin seluruh SQL, lalu jalankan sekali. Ini mengubah izin tulis tabel agar sesuai dengan aplikasi baru.
3. Buka Authentication → Settings / Password Security, lalu aktifkan **Leaked password protection** jika tersedia pada paket/proyekmu. Ini pengaturan dashboard dan tidak dapat diaktifkan dari file frontend.
4. Deploy folder proyek ini ke Cloudflare Pages.
5. Uji login, selesaikan satu materi, refresh halaman, lalu pastikan XP dan materi selesai tetap tersimpan. Ulangi materi yang sama: XP tidak boleh bertambah lagi.

**Catatan audit:** skor kuis tetap merupakan hasil yang dikirim browser dan tidak dipakai untuk menghitung XP. Untuk materi berisiko rendah seperti kuis pembelajaran, ini mencegah manipulasi saldo XP berulang; bila kelak XP dipakai untuk hadiah/kompetisi bernilai, jawaban kuis harus diverifikasi server-side.

### Temuan yang diperbaiki dalam paket ini

- Menutup hak eksekusi `public.rls_auto_enable()` untuk `PUBLIC`, `anon`, dan `authenticated`; event trigger tetap dapat menjalankan fungsinya saat DDL.
- Fungsi RPC `complete_zenairi_lesson` sengaja tetap `SECURITY DEFINER` dan hanya dapat dipanggil role `authenticated`; Supabase Advisor menandai pola ini sebagai peringatan karena fungsi privileged memang harus tersedia untuk login. Fungsi memeriksa `auth.uid()`, membatasi ID materi, memvalidasi rentang skor, dan hanya menulis progres milik pemanggil.
- Menghapus kebijakan tulis langsung pengguna pada tabel progres dan percobaan kuis; pembacaan tetap dilindungi RLS.
- Menambahkan RPC terautentikasi untuk mencatat hasil kuis dan menghitung XP/streak secara atomik.
- Menghindari pembuatan baris progres dari browser saat akun baru dimuat.
- Memperbaiki perhitungan tanggal kemarin berdasarkan kalender Jakarta tanpa parsing tanggal melalui zona waktu perangkat.
- Menambahkan header keamanan dasar pada Cloudflare Pages.

Peringatan password bocor tidak bisa diperbaiki melalui SQL atau ZIP; aktifkan dari pengaturan Auth Supabase.


## Phase 4 — pengalaman belajar dan offline

- Tema awal mengikuti pengaturan sistem operasi (`system`); pengguna tetap dapat memilih Terang atau Gelap dari halaman Profil.
- Pemuatan awal hanya mengambil data progres yang dibutuhkan dashboard. Riwayat kuis tidak lagi diminta pada setiap login.
- PWA menggunakan `manifest.webmanifest` dan `sw.js` untuk menyimpan aset aplikasi, modul pembelajaran, kamus, gambar, dan PDF.
- Tombol **Unduh kamus CSV** mengekspor seluruh entri, termasuk kata yang memiliki ejaan sama tetapi makna berbeda.
- Saat offline, materi yang sudah tersimpan dapat dibuka pada perangkat dengan sesi login yang masih tersedia. Penyimpanan hasil kuis dan sinkronisasi progres tetap memerlukan koneksi internet; tidak ada antrean sinkronisasi offline pada versi ini.

### Catatan deploy

Deploy seluruh isi folder proyek ke Cloudflare Pages. Service worker hanya aktif pada HTTPS atau localhost. Setelah deploy, buka website sekali saat online agar browser mengunduh dan memasang cache; buka ulang halaman supaya semua permintaan berikutnya berada di bawah kendali service worker.
