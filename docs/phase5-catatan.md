# Zenairi Learn — Phase 5

## Perubahan
- Kamus aplikasi bertambah 110 entri baru (256 entri sebelumnya menjadi 366 entri).
- Ditambahkan empat materi: Tubuh Manusia, Alam & Cuaca, Perjalanan, serta Sifat & Perasaan.
- Ditambahkan aturan tata bahasa dan contoh kalimat.
- Ditambahkan migrasi Supabase untuk mengizinkan empat ID materi baru dan memvalidasi rentang nilai kuis.

## Catatan kebahasaan
110 entri baru dicatat sebagai **usulan ekspansi Phase 5**, bukan sebagai kutipan dari kamus PDF awal. Pengembang bahasa Zenairi perlu meninjau dan mengesahkan ejaan serta maknanya agar konsisten dengan kanon bahasa.

## Keamanan
RPC penyelesaian pelajaran tetap memerlukan sesi pengguna terautentikasi, membatasi ID pelajaran, memvalidasi rentang skor, mengunci pembaruan progres per pengguna, dan memberikan XP satu kali per pelajaran. Skor masih dikirim oleh klien, sehingga belum boleh dipakai untuk hadiah atau peringkat bernilai nyata.
