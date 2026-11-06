# Pedoman Pengembangan Bahasa Zenairi

Dokumen ini adalah usulan pengembangan baru. Kamus PDF awal tetap menjadi dasar kosakata inti; daftar di bawah ini menambah kosakata dan tidak mengubah entri awal.

## Sistem kata serapan

Kata serapan dipakai jika Zenairi membutuhkan nama benda, gagasan, bidang ilmu, atau istilah baru. Bentuk asal Indonesia dicatat bersama bentuk Zenairi agar pembelajar dapat melacak hubungan maknanya.

### Aturan ejaan usulan

1. Utamakan bunyi yang diucapkan. Jangan menyalin ejaan asing secara buta.
2. Gunakan ejaan sederhana tanpa tanda diakritik.
3. Jika gugus konsonan sulit diucapkan, sisipkan vokal `a` atau `i`. Contoh: `demokrasi → Demokarasi`, `struktur → Setarukutura`.
4. Jika ujung kata terasa berat, vokal `a` dapat ditambahkan. Contoh: `internet → Intereneta`, `musik → Musika`, `sistem → Sitema`.
5. Huruf akhir yang tidak terdengar boleh dihilangkan. Contoh: `sejarah → Sejara`.
6. Bentuk yang sudah mudah dibaca dapat dipertahankan: `kamera → Kamera`, `metode → Metode`, `biologi → Biologi`.
7. Kata serapan tetap mengikuti tata bahasa Zenairi: urutan Subjek + Kata Kerja + Objek serta partikel `pa`, `fu`, `ri`, `ne`, dan `ha`.
8. Awalan dan akhiran Bahasa Indonesia tidak otomatis disalin. Bentuk turunan perlu ditetapkan sebagai kosakata Zenairi tersendiri.

Bentuk-bentuk contoh adalah standar usulan untuk Zenairi, bukan klaim bahwa ejaannya sudah final. Bentuknya dapat disepakati dan diperbaiki oleh pengembang bahasa.

## Kosakata tambahan

### Kendaraan dan perjalanan
- **Kalora** — Mobil
- **Rikena** — Sepeda
- **Patora** — Bus
- **Zendi** — Kereta
- **Vayora** — Pesawat
- **Yavena** — Kapal
- **Deren** — Stasiun
- **Lakora** — Bandara
- **Tivara** — Tiket
- **Lorena** — Halte

### Tubuh dan indra
- **Kori** — Kepala
- **Nima** — Mata
- **Leni** — Telinga
- **Dava** — Tangan
- **Reni** — Kaki
- **Zeri** — Jantung
- **Pavina** — Kulit
- **Tavira** — Rambut
- **Soni** — Suara

### Teknologi dan komunikasi
- **Pikora** — Papan ketik
- **Koda** — Kode
- **Nerata** — Data
- **Vikora** — Video
- **Sonara** — Rekaman suara
- **Zimara** — Gambar digital
- **Sifara** — Sinyal
- **Netara** — Jaringan
- **Mavora** — Aplikasi
- **Kivora** — Kata sandi
- **Lokana** — Situs web

### Tempat umum
- **Pazora** — Pasar
- **Kedana** — Toko
- **Rovena** — Rumah sakit
- **Telara** — Taman
- **Sokara** — Perpustakaan
- **Kavora** — Kota
- **Nadora** — Desa
- **Varena** — Negara
- **Torena** — Pantai
- **Yumana** — Jembatan

### Pembelajaran dan bahasa
- **Dakira** — Latihan
- **Sovena** — Contoh
- **Neravi** — Arti
- **Vasena** — Bahasa
- **Kavina** — Bunyi
- **Morena** — Cerita
- **Pavari** — Sastra
- **Kirema** — Tata bahasa
- **Neroka** — Kata

### Sifat dan perasaan
- **Rima** — Tenang
- **Lera** — Bangga
- **Vani** — Penasaran
- **Keni** — Malu
- **Soria** — Ramah
- **Mavena** — Sopan
- **Zorin** — Cerdas
- **Fivara** — Sibuk
- **Nerima** — Aman
- **Zavena** — Berani

## Kata serapan tambahan

- **Tekonologi** — Teknologi (bentuk asal Indonesia: *teknologi*)
- **Demokarasi** — Demokrasi (bentuk asal Indonesia: *demokrasi*)
- **Komunikasi** — Komunikasi (bentuk asal Indonesia: *komunikasi*)
- **Inforamasi** — Informasi (bentuk asal Indonesia: *informasi*)
- **Universitas** — Universitas (bentuk asal Indonesia: *universitas*)
- **Organisasi** — Organisasi (bentuk asal Indonesia: *organisasi*)
- **Intereneta** — Internet (bentuk asal Indonesia: *internet*)
- **Kamera** — Kamera (bentuk asal Indonesia: *kamera*)
- **Radio** — Radio (bentuk asal Indonesia: *radio*)
- **Musika** — Musik (bentuk asal Indonesia: *musik*)
- **Metode** — Metode (bentuk asal Indonesia: *metode*)
- **Matematika** — Matematika (bentuk asal Indonesia: *matematika*)
- **Biologi** — Biologi (bentuk asal Indonesia: *biologi*)
- **Geografi** — Geografi (bentuk asal Indonesia: *geografi*)
- **Filosofi** — Filosofi (bentuk asal Indonesia: *filosofi*)
- **Sejara** — Sejarah (bentuk asal Indonesia: *sejarah*)
- **Akitivitas** — Aktivitas (bentuk asal Indonesia: *aktivitas*)
- **Kualitasa** — Kualitas (bentuk asal Indonesia: *kualitas*)
- **Karakatera** — Karakter (bentuk asal Indonesia: *karakter*)
- **Setarukutura** — Struktur (bentuk asal Indonesia: *struktur*)
- **Porogarama** — Program (bentuk asal Indonesia: *program*)
- **Paratiki** — Praktik (bentuk asal Indonesia: *praktik*)
- **Adiminisirasi** — Administrasi (bentuk asal Indonesia: *administrasi*)
- **Kontaka** — Kontak (bentuk asal Indonesia: *kontak*)
- **Aksesa** — Akses (bentuk asal Indonesia: *akses*)
- **Sitema** — Sistem (bentuk asal Indonesia: *sistem*)
- **Ekonomi** — Ekonomi (bentuk asal Indonesia: *ekonomi*)
- **Literasi** — Literasi (bentuk asal Indonesia: *literasi*)

## Catatan kompatibilitas

- Delapan ID pelajaran lama tetap sama; setiap pelajaran memperoleh tiga soal tambahan.
- Tidak ada perubahan tabel atau migrasi Supabase pada paket ini.
- Progres lama, XP, login, dan autentikasi tidak disentuh.
- Materi ini ditambahkan lewat modul terpisah `src/expansion.js` agar kode lama tetap utuh.
