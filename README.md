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
- Dark mode dan light mode; pilihan tema disimpan di perangkat menggunakan localStorage.
- Kuis memiliki langkah **Periksa jawaban**. Jawaban benar/salah ditandai, jawaban yang benar ditampilkan, dan pembahasan singkat muncul sebelum pengguna dapat melanjutkan.
- Ilustrasi dioptimalkan ke WebP dan dimuat secara lazy saat sesuai.
- Header `_headers` menambahkan cache untuk aset statis pada Cloudflare Pages.

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
