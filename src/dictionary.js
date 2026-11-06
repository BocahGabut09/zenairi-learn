// Kosakata diambil dari Kamus Bahasa Zenairi.pdf yang diberikan pengguna.
// Kata yang sama dengan arti berbeda sengaja dipertahankan sebagai entri terpisah.
export const dictionary = [
  // A. Kata Ganti
  ['Ka','Aku','Kata ganti'],['Ta','Kamu','Kata ganti'],['Lu','Dia (laki-laki)','Kata ganti'],['Ni','Dia (perempuan)','Kata ganti'],['Kana','Kita','Kata ganti'],['Kama','Kami','Kata ganti'],['Tana','Kalian','Kata ganti'],['Lana','Mereka','Kata ganti'],
  // B. Kata Tanya
  ['Naka','Apa','Kata tanya'],['Sina','Siapa','Kata tanya'],['Vano','Di mana','Kata tanya'],['Kira','Kenapa','Kata tanya'],['Temo','Kapan','Kata tanya'],['Zema','Bagaimana','Kata tanya'],
  // C. Keluarga dan Manusia
  ['Kava','Orang','Keluarga dan manusia'],['Mava','Ibu','Keluarga dan manusia'],['Pava','Ayah','Keluarga dan manusia'],['Noru','Anak','Keluarga dan manusia'],['Sini','Teman','Keluarga dan manusia'],['Raku','Guru','Keluarga dan manusia'],['Savi','Murid','Keluarga dan manusia'],['Mena','Perempuan','Keluarga dan manusia'],['Danu','Laki-laki','Keluarga dan manusia'],['Numa','Keluarga','Keluarga dan manusia'],['Sera','Saudara','Keluarga dan manusia'],['Yuma','Bayi','Keluarga dan manusia'],['Kanu','Sahabat','Keluarga dan manusia'],['Rena','Tetangga','Keluarga dan manusia'],['Luma','Nama','Keluarga dan manusia'],
  // D. Rumah dan Peralatan
  ['Toka','Rumah','Rumah dan peralatan'],['Selu','Kursi','Rumah dan peralatan'],['Talu','Meja','Rumah dan peralatan'],['Davi','Buku','Rumah dan peralatan'],['Fona','Ponsel','Rumah dan peralatan'],['Komu','Komputer','Rumah dan peralatan'],['Penu','Pulpen','Rumah dan peralatan'],['Kavi','Kunci','Rumah dan peralatan'],['Mura','Jendela','Rumah dan peralatan'],['Tomi','Kamar','Rumah dan peralatan'],['Pora','Pintu','Rumah dan peralatan'],['Suma','Kasur','Rumah dan peralatan'],['Leka','Lampu','Rumah dan peralatan'],['Doma','Lantai','Rumah dan peralatan'],['Ruma','Atap','Rumah dan peralatan'],['Veka','Lemari','Rumah dan peralatan'],['Sela','Cermin','Rumah dan peralatan'],['Banu','Tas','Rumah dan peralatan'],['Tiva','Jam','Rumah dan peralatan'],['Noka','Dinding','Rumah dan peralatan'],
  // E. Sekolah dan Pendidikan
  ['Soka','Sekolah','Sekolah dan pendidikan'],['Rava','Pelajaran','Sekolah dan pendidikan'],['Dena','Ilmu','Sekolah dan pendidikan'],['Siva','Tulisan','Sekolah dan pendidikan'],['Ravi','Bacaan','Sekolah dan pendidikan'],['Keta','Pertanyaan','Sekolah dan pendidikan'],['Zena','Jawaban','Sekolah dan pendidikan'],['Pira','Kertas','Sekolah dan pendidikan'],['Lavi','Catatan','Sekolah dan pendidikan'],['Veta','Pengajaran','Sekolah dan pendidikan'],['Sena','Pembelajaran','Sekolah dan pendidikan'],['Nari','Ujian','Sekolah dan pendidikan'],['Tera','Kelas','Sekolah dan pendidikan'],['Kora','Papan tulis','Sekolah dan pendidikan'],
  // F. Makanan dan Minuman
  ['Rina','Nasi','Makanan dan minuman'],['Bora','Roti','Makanan dan minuman'],['Vala','Air','Makanan dan minuman'],['Mela','Susu','Makanan dan minuman'],['Fara','Buah','Makanan dan minuman'],['Saku','Sayuran','Makanan dan minuman'],['Sapa','Telur','Makanan dan minuman'],['Pusa','Sup','Makanan dan minuman'],['Mavi','Daging','Makanan dan minuman'],['Sumi','Ikan','Makanan dan minuman'],['Kena','Garam','Makanan dan minuman'],['Zavi','Gula','Makanan dan minuman'],['Roka','Kue','Makanan dan minuman'],['Pala','Makanan','Makanan dan minuman'],['Nema','Minuman','Makanan dan minuman'],['Tami','Teh','Makanan dan minuman'],['Kafi','Kopi','Makanan dan minuman'],['Yara','Madu','Makanan dan minuman'],['Dura','Keju','Makanan dan minuman'],['Fumi','Apel','Makanan dan minuman'],
  // G. Alam dan Lingkungan
  ['Sora','Matahari','Alam dan lingkungan'],['Luna','Bulan','Alam dan lingkungan'],['Tavi','Bintang','Alam dan lingkungan'],['Vema','Langit','Alam dan lingkungan'],['Doma','Bumi','Alam dan lingkungan'],['Fira','Api','Alam dan lingkungan'],['Vanu','Angin','Alam dan lingkungan'],['Rava','Hujan','Alam dan lingkungan'],['Tora','Pohon','Alam dan lingkungan'],['Nela','Bunga','Alam dan lingkungan'],['Kuma','Hewan','Alam dan lingkungan'],['Zura','Gunung','Alam dan lingkungan'],['Lora','Jalan','Alam dan lingkungan'],['Yumi','Laut','Alam dan lingkungan'],['Sava','Sungai','Alam dan lingkungan'],['Pira','Batu','Alam dan lingkungan'],['Kela','Tanah','Alam dan lingkungan'],['Fena','Awan','Alam dan lingkungan'],['Mura','Hutan','Alam dan lingkungan'],['Zema','Cuaca','Alam dan lingkungan'],
  // H. Hewan
  ['Mimi','Kucing','Hewan'],['Baku','Anjing','Hewan'],['Zavi','Burung','Hewan'],['Sumi','Ikan','Hewan'],['Naku','Kuda','Hewan'],['Pumi','Kelinci','Hewan'],['Kumi','Sapi','Hewan'],['Daku','Kambing','Hewan'],['Moku','Ayam','Hewan'],['Rumi','Bebek','Hewan'],['Faku','Harimau','Hewan'],['Tumi','Gajah','Hewan'],['Yaku','Ular','Hewan'],['Laku','Kupu-kupu','Hewan'],['Vumi','Kura-kura','Hewan'],
  // I. Waktu
  ['Nemo','Sekarang','Waktu'],['Dema','Hari ini','Waktu'],['Pema','Kemarin','Waktu'],['Fema','Besok','Waktu'],['Soma','Pagi','Waktu'],['Sori','Siang atau sore','Waktu'],['Noku','Malam','Waktu'],['Nadu','Hari','Waktu'],['Veka','Minggu','Waktu'],['Mora','Bulan','Waktu'],['Yara','Tahun','Waktu'],['Temo','Waktu','Waktu'],['Nema','Menit','Waktu'],['Tiva','Jam','Waktu'],
  // J. Kata Kerja
  ['Mako','Makan','Kata kerja'],['Meka','Minum','Kata kerja'],['Lima','Tidur','Kata kerja'],['Dora','Pergi','Kata kerja'],['Nuka','Duduk','Kata kerja'],['Saro','Berbicara','Kata kerja'],['Vena','Melihat','Kata kerja'],['Ravi','Membaca','Kata kerja'],['Siva','Menulis','Kata kerja'],['Ruma','Mendengar','Kata kerja'],['Koma','Datang','Kata kerja'],['Lari','Berlari','Kata kerja'],['Pila','Bermain','Kata kerja'],['Kera','Membuat','Kata kerja'],['Veta','Mengajar','Kata kerja'],['Sena','Belajar','Kata kerja'],['Nava','Memberi','Kata kerja'],['Tuma','Menutup','Kata kerja'],['Supa','Membuka','Kata kerja'],['Zali','Membantu','Kata kerja'],['Pavi','Bekerja','Kata kerja'],['Mira','Berpikir','Kata kerja'],['Nari','Mencari','Kata kerja'],['Fari','Menemukan','Kata kerja'],['Yuma','Membawa','Kata kerja'],['Davi','Membeli','Kata kerja'],['Suma','Menjual','Kata kerja'],['Kira','Mengetahui','Kata kerja'],['Zora','Memahami','Kata kerja'],['Miri','Mengingat','Kata kerja'],['Pera','Melupakan','Kata kerja'],['Tavi','Menunggu','Kata kerja'],['Rena','Berjalan','Kata kerja'],['Kalu','Memanggil','Kata kerja'],['Fena','Menjawab','Kata kerja'],['Zuna','Memasak','Kata kerja'],['Luma','Mendengarkan','Kata kerja'],['Niva','Menolong','Kata kerja'],['Pora','Mengirim','Kata kerja'],['Duma','Mengambil','Kata kerja'],
  // K. Kata Sifat
  ['Gava','Besar','Kata sifat'],['Mili','Kecil','Kata sifat'],['Vilo','Cepat','Kata sifat'],['Duma','Lambat','Kata sifat'],['Tera','Panas','Kata sifat'],['Kelo','Dingin','Kata sifat'],['Nira','Cantik','Kata sifat'],['Lavi','Bagus','Kata sifat'],['Zuri','Buruk','Kata sifat'],['Sava','Bahagia','Kata sifat'],['Dira','Sedih','Kata sifat'],['Zaka','Marah','Kata sifat'],['Nema','Takut','Kata sifat'],['Lenu','Lelah','Kata sifat'],['Suni','Baru','Kata sifat'],['Tori','Tua','Kata sifat'],['Sela','Bersih','Kata sifat'],['Zuma','Kotor','Kata sifat'],['Favi','Mudah','Kata sifat'],['Zami','Sulit','Kata sifat'],['Kava','Kuat','Kata sifat'],['Mena','Lemah','Kata sifat'],['Vira','Tinggi','Kata sifat'],['Dori','Rendah','Kata sifat'],['Rena','Panjang','Kata sifat'],['Piri','Pendek','Kata sifat'],['Yavi','Indah','Kata sifat'],['Keri','Jelek','Kata sifat'],['Nori','Baik','Kata sifat'],['Fura','Buruk rupa','Kata sifat'],
  // L. Warna
  ['Kora','Hitam','Warna'],['Vila','Putih','Warna'],['Ruda','Merah','Warna'],['Zela','Hijau','Warna'],['Luma','Biru','Warna'],['Yela','Kuning','Warna'],['Pura','Ungu','Warna'],['Sira','Oranye','Warna'],['Mura','Cokelat','Warna'],['Niva','Abu-abu','Warna'],['Fela','Merah muda','Warna'],
  // M. Kata Bilangan
  ['Ena','Satu','Kata bilangan'],['Dulo','Dua','Kata bilangan'],['Tira','Tiga','Kata bilangan'],['Qina','Empat','Kata bilangan'],['Pala','Lima','Kata bilangan'],['Seta','Enam','Kata bilangan'],['Neka','Tujuh','Kata bilangan'],['Olta','Delapan','Kata bilangan'],['Niva','Sembilan','Kata bilangan'],['Daka','Sepuluh','Kata bilangan'],['Saka','Seratus','Kata bilangan'],['Mika','Seribu','Kata bilangan'],
  // N. Kata Depan
  ['No','Di','Kata depan'],['Fi','Ke','Kata depan'],['Ve','Dari','Kata depan'],['Su','Dengan','Kata depan'],
  // O. Kata Penghubung dan Partikel
  ['Ne','Tidak / bukan','Kata penghubung dan partikel'],['A','Dan','Kata penghubung dan partikel'],['O','Atau','Kata penghubung dan partikel'],['Ma','Tetapi','Kata penghubung dan partikel'],['Kar','Karena','Kata penghubung dan partikel'],['Se','Jika','Kata penghubung dan partikel'],['De','Milik','Kata penghubung dan partikel'],['Ha','Partikel pertanyaan','Kata penghubung dan partikel'],['Ye','Ya','Kata penghubung dan partikel'],['Na','Tidak','Kata penghubung dan partikel'],['Ima','Ini','Kata penghubung dan partikel'],['Uma','Itu','Kata penghubung dan partikel'],['Lena','Sangat','Kata penghubung dan partikel'],['Muna','Banyak','Kata penghubung dan partikel'],['Piri','Sedikit','Kata penghubung dan partikel'],['Ala','Semua','Kata penghubung dan partikel'],
  // Penanda waktu/aktivitas yang dijelaskan pada bagian Aturan Bahasa
  ['pa','Penanda masa lalu','Aturan bahasa'],['fu','Penanda masa depan','Aturan bahasa'],['ri','Penanda kegiatan yang sedang berlangsung','Aturan bahasa'],
  // P. Kata Seru dan Sapaan
  ['Sava!','Halo!','Kata seru dan sapaan'],['Yena!','Selamat!','Kata seru dan sapaan'],['Ayo!','Ayo!','Kata seru dan sapaan'],['Nara!','Aduh!','Kata seru dan sapaan'],['Zena!','Wah!','Kata seru dan sapaan'],['Leya!','Terima kasih!','Kata seru dan sapaan'],['Meya!','Maaf!','Kata seru dan sapaan'],['Seya!','Sampai jumpa!','Kata seru dan sapaan'],
].map(([word, meaning, group], index) => ({ id: `${word.toLowerCase().replace(/[^a-z]/g,'')}-${index}`, word, meaning, group }));

export const grammarRules = [
  'Kalimat disusun dengan pola Subjek + Kata Kerja + Objek.',
  'Kata sifat ditulis setelah kata benda.',
  'Kata kerja tidak berubah mengikuti subjek.',
  'pa digunakan untuk masa lalu.',
  'fu digunakan untuk masa depan.',
  'ri digunakan untuk kegiatan yang sedang berlangsung.',
  'ne digunakan untuk menyatakan tidak.',
  'ha digunakan untuk pertanyaan ya atau tidak.',
  'Kata dibaca sesuai dengan tulisannya.'
];

export const sampleSentences = [
  ['Ka mako rina.','Aku makan nasi.'],
  ['Ta meka vala.','Kamu minum air.'],
  ['Lu dora fi toka.','Dia pergi ke rumah.'],
  ['Ni lima no toka.','Dia tidur di rumah.'],
  ['Ka fu dora fi soka.','Aku akan pergi ke sekolah.'],
  ['Ta pa mako bora.','Kamu sudah makan roti.'],
  ['Kana ri saro.','Kita sedang berbicara.'],
  ['Ka ne lima.','Aku tidak tidur.'],
  ['Toka gava.','Rumah besar.'],
  ['Davi mili.','Buku kecil.']
];

export const lessons = [
  {
    id:'sapaan', title:'Salam & Sapaan', subtitle:'Mulai percakapan dalam Zenairi', icon:'👋', color:'mint',
    words:['Sava!','Yena!','Leya!','Meya!','Seya!'],
    questions:[
      ['Sava! berarti …','Halo!',['Maaf!','Halo!','Sampai jumpa!','Terima kasih!']],
      ['Leya! berarti …','Terima kasih!',['Terima kasih!','Selamat!','Aduh!','Wah!']],
      ['Seya! berarti …','Sampai jumpa!',['Halo!','Ayo!','Sampai jumpa!','Maaf!']],
      ['Meya! berarti …','Maaf!',['Wah!','Maaf!','Selamat!','Halo!']],
    ]
  },
  {
    id:'kata-ganti', title:'Kata Ganti', subtitle:'Kenali aku, kamu, dan mereka', icon:'🧑‍🤝‍🧑', color:'gold',
    words:['Ka','Ta','Lu','Ni','Kana','Kama','Tana','Lana'],
    questions:[
      ['Ka berarti …','Aku',['Kamu','Aku','Kita','Mereka']],
      ['Kana berarti …','Kita',['Kami','Kalian','Kita','Dia']],
      ['Tana berarti …','Kalian',['Mereka','Kalian','Kami','Aku']],
      ['Ni berarti …','Dia (perempuan)',['Dia (laki-laki)','Dia (perempuan)','Kamu','Aku']],
    ]
  },
  {
    id:'rumah', title:'Rumah & Benda', subtitle:'Sebut benda di sekitarmu', icon:'🏡', color:'lavender',
    words:['Toka','Selu','Talu','Fona','Komu','Pora'],
    questions:[
      ['Toka berarti …','Rumah',['Kamar','Rumah','Meja','Kursi']],
      ['Fona berarti …','Ponsel',['Komputer','Buku','Ponsel','Pulpen']],
      ['Selu berarti …','Kursi',['Meja','Kunci','Kursi','Lampu']],
      ['Pora berarti …','Pintu',['Atap','Pintu','Lemari','Jendela']],
    ]
  },
  {
    id:'makanan', title:'Makanan & Minuman', subtitle:'Kosakata untuk makan sehari-hari', icon:'🍚', color:'peach',
    words:['Rina','Bora','Vala','Mela','Fara','Kafi'],
    questions:[
      ['Rina berarti …','Nasi',['Roti','Nasi','Sup','Buah']],
      ['Vala berarti …','Air',['Susu','Kopi','Air','Teh']],
      ['Bora berarti …','Roti',['Keju','Telur','Roti','Daging']],
      ['Kafi berarti …','Kopi',['Teh','Kopi','Madu','Susu']],
    ]
  },
  {
    id:'kata-kerja', title:'Kata Kerja', subtitle:'Ungkapkan kegiatan sehari-hari', icon:'🏃', color:'mint',
    words:['Mako','Meka','Lima','Dora','Saro','Sena'],
    questions:[
      ['Mako berarti …','Makan',['Minum','Tidur','Makan','Pergi']],
      ['Meka berarti …','Minum',['Makan','Minum','Berjalan','Datang']],
      ['Lima berarti …','Tidur',['Duduk','Tidur','Berlari','Melihat']],
      ['Sena berarti …','Belajar',['Mengajar','Menulis','Belajar','Membaca']],
    ]
  },
  {
    id:'waktu-partikel', title:'Waktu & Partikel', subtitle:'Ceritakan kapan sesuatu terjadi', icon:'⏳', color:'gold',
    words:['Nemo','Dema','Pema','Fema','pa','fu','ri','ne'],
    questions:[
      ['fu digunakan untuk …','Masa depan',['Masa lalu','Masa depan','Kegiatan sedang berlangsung','Pertanyaan']],
      ['pa digunakan untuk …','Masa lalu',['Masa lalu','Masa depan','Menyatakan tidak','Menyatakan milik']],
      ['ri digunakan untuk …','Kegiatan yang sedang berlangsung',['Masa lalu','Masa depan','Kegiatan yang sedang berlangsung','Kata tanya']],
      ['ne berarti …','Tidak / bukan',['Ya','Dan','Tidak / bukan','Atau']],
    ]
  },
  {
    id:'kalimat', title:'Susun Kalimat', subtitle:'Gunakan pola kalimat Zenairi', icon:'🧩', color:'lavender',
    words:['Ka mako rina.','Ta meka vala.','Ka fu dora fi soka.','Toka gava.'],
    questions:[
      ['“Ka mako rina.” artinya …','Aku makan nasi.',['Aku minum air.','Aku makan nasi.','Kamu makan roti.','Aku pergi ke rumah.']],
      ['Pola dasar kalimat Zenairi adalah …','Subjek + Kata Kerja + Objek',['Objek + Subjek + Kata Kerja','Kata Kerja + Objek + Subjek','Subjek + Kata Kerja + Objek','Subjek + Objek + Kata Sifat']],
      ['Kata sifat ditulis …','Setelah kata benda',['Sebelum kata benda','Setelah kata benda','Di awal kalimat','Hanya di akhir paragraf']],
      ['“Toka gava.” artinya …','Rumah besar.',['Rumah besar.','Rumah kecil.','Buku kecil.','Pintu besar.']],
    ]
  },
  {
    id:'pertanyaan', title:'Kata Tanya', subtitle:'Tanyakan apa, siapa, di mana, dan kapan', icon:'❓', color:'peach',
    words:['Naka','Sina','Vano','Kira','Temo','Zema','ha'],
    questions:[
      ['Naka berarti …','Apa',['Apa','Siapa','Kapan','Bagaimana']],
      ['Sina berarti …','Siapa',['Di mana','Kenapa','Siapa','Apa']],
      ['Vano berarti …','Di mana',['Kapan','Di mana','Bagaimana','Siapa']],
      ['ha digunakan untuk …','Pertanyaan ya atau tidak',['Masa depan','Pertanyaan ya atau tidak','Masa lalu','Menyatakan milik']],
    ]
  }
];

export const dictionaryGroups = [...new Set(dictionary.map(item => item.group))];
