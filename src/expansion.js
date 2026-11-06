import { dictionary, dictionaryGroups, lessons, grammarRules, sampleSentences } from './dictionary.js';

/*
 * Zenairi Learn — paket pengembangan kurikulum yang bersifat aditif.
 * Delapan ID materi lama sengaja tidak diubah, supaya completed_lessons di Supabase tetap cocok.
 */
const nativeWords = [
  [
    "Kalora",
    "Mobil",
    "Kendaraan dan perjalanan"
  ],
  [
    "Rikena",
    "Sepeda",
    "Kendaraan dan perjalanan"
  ],
  [
    "Patora",
    "Bus",
    "Kendaraan dan perjalanan"
  ],
  [
    "Zendi",
    "Kereta",
    "Kendaraan dan perjalanan"
  ],
  [
    "Vayora",
    "Pesawat",
    "Kendaraan dan perjalanan"
  ],
  [
    "Yavena",
    "Kapal",
    "Kendaraan dan perjalanan"
  ],
  [
    "Deren",
    "Stasiun",
    "Kendaraan dan perjalanan"
  ],
  [
    "Lakora",
    "Bandara",
    "Kendaraan dan perjalanan"
  ],
  [
    "Tivara",
    "Tiket",
    "Kendaraan dan perjalanan"
  ],
  [
    "Lorena",
    "Halte",
    "Kendaraan dan perjalanan"
  ],
  [
    "Kori",
    "Kepala",
    "Tubuh dan indra"
  ],
  [
    "Nima",
    "Mata",
    "Tubuh dan indra"
  ],
  [
    "Leni",
    "Telinga",
    "Tubuh dan indra"
  ],
  [
    "Dava",
    "Tangan",
    "Tubuh dan indra"
  ],
  [
    "Reni",
    "Kaki",
    "Tubuh dan indra"
  ],
  [
    "Zeri",
    "Jantung",
    "Tubuh dan indra"
  ],
  [
    "Pavina",
    "Kulit",
    "Tubuh dan indra"
  ],
  [
    "Tavira",
    "Rambut",
    "Tubuh dan indra"
  ],
  [
    "Soni",
    "Suara",
    "Tubuh dan indra"
  ],
  [
    "Pikora",
    "Papan ketik",
    "Teknologi dan komunikasi"
  ],
  [
    "Koda",
    "Kode",
    "Teknologi dan komunikasi"
  ],
  [
    "Nerata",
    "Data",
    "Teknologi dan komunikasi"
  ],
  [
    "Vikora",
    "Video",
    "Teknologi dan komunikasi"
  ],
  [
    "Sonara",
    "Rekaman suara",
    "Teknologi dan komunikasi"
  ],
  [
    "Zimara",
    "Gambar digital",
    "Teknologi dan komunikasi"
  ],
  [
    "Sifara",
    "Sinyal",
    "Teknologi dan komunikasi"
  ],
  [
    "Netara",
    "Jaringan",
    "Teknologi dan komunikasi"
  ],
  [
    "Mavora",
    "Aplikasi",
    "Teknologi dan komunikasi"
  ],
  [
    "Kivora",
    "Kata sandi",
    "Teknologi dan komunikasi"
  ],
  [
    "Lokana",
    "Situs web",
    "Teknologi dan komunikasi"
  ],
  [
    "Pazora",
    "Pasar",
    "Tempat umum"
  ],
  [
    "Kedana",
    "Toko",
    "Tempat umum"
  ],
  [
    "Rovena",
    "Rumah sakit",
    "Tempat umum"
  ],
  [
    "Telara",
    "Taman",
    "Tempat umum"
  ],
  [
    "Sokara",
    "Perpustakaan",
    "Tempat umum"
  ],
  [
    "Kavora",
    "Kota",
    "Tempat umum"
  ],
  [
    "Nadora",
    "Desa",
    "Tempat umum"
  ],
  [
    "Varena",
    "Negara",
    "Tempat umum"
  ],
  [
    "Torena",
    "Pantai",
    "Tempat umum"
  ],
  [
    "Yumana",
    "Jembatan",
    "Tempat umum"
  ],
  [
    "Dakira",
    "Latihan",
    "Pembelajaran dan bahasa"
  ],
  [
    "Sovena",
    "Contoh",
    "Pembelajaran dan bahasa"
  ],
  [
    "Neravi",
    "Arti",
    "Pembelajaran dan bahasa"
  ],
  [
    "Vasena",
    "Bahasa",
    "Pembelajaran dan bahasa"
  ],
  [
    "Kavina",
    "Bunyi",
    "Pembelajaran dan bahasa"
  ],
  [
    "Morena",
    "Cerita",
    "Pembelajaran dan bahasa"
  ],
  [
    "Pavari",
    "Sastra",
    "Pembelajaran dan bahasa"
  ],
  [
    "Kirema",
    "Tata bahasa",
    "Pembelajaran dan bahasa"
  ],
  [
    "Neroka",
    "Kata",
    "Pembelajaran dan bahasa"
  ],
  [
    "Rima",
    "Tenang",
    "Sifat dan perasaan"
  ],
  [
    "Lera",
    "Bangga",
    "Sifat dan perasaan"
  ],
  [
    "Vani",
    "Penasaran",
    "Sifat dan perasaan"
  ],
  [
    "Keni",
    "Malu",
    "Sifat dan perasaan"
  ],
  [
    "Soria",
    "Ramah",
    "Sifat dan perasaan"
  ],
  [
    "Mavena",
    "Sopan",
    "Sifat dan perasaan"
  ],
  [
    "Zorin",
    "Cerdas",
    "Sifat dan perasaan"
  ],
  [
    "Fivara",
    "Sibuk",
    "Sifat dan perasaan"
  ],
  [
    "Nerima",
    "Aman",
    "Sifat dan perasaan"
  ],
  [
    "Zavena",
    "Berani",
    "Sifat dan perasaan"
  ]
];
const borrowedWords = [
  [
    "Tekonologi",
    "Teknologi",
    "teknologi"
  ],
  [
    "Demokarasi",
    "Demokrasi",
    "demokrasi"
  ],
  [
    "Komunikasi",
    "Komunikasi",
    "komunikasi"
  ],
  [
    "Inforamasi",
    "Informasi",
    "informasi"
  ],
  [
    "Universitas",
    "Universitas",
    "universitas"
  ],
  [
    "Organisasi",
    "Organisasi",
    "organisasi"
  ],
  [
    "Intereneta",
    "Internet",
    "internet"
  ],
  [
    "Kamera",
    "Kamera",
    "kamera"
  ],
  [
    "Radio",
    "Radio",
    "radio"
  ],
  [
    "Musika",
    "Musik",
    "musik"
  ],
  [
    "Metode",
    "Metode",
    "metode"
  ],
  [
    "Matematika",
    "Matematika",
    "matematika"
  ],
  [
    "Biologi",
    "Biologi",
    "biologi"
  ],
  [
    "Geografi",
    "Geografi",
    "geografi"
  ],
  [
    "Filosofi",
    "Filosofi",
    "filosofi"
  ],
  [
    "Sejara",
    "Sejarah",
    "sejarah"
  ],
  [
    "Akitivitas",
    "Aktivitas",
    "aktivitas"
  ],
  [
    "Kualitasa",
    "Kualitas",
    "kualitas"
  ],
  [
    "Karakatera",
    "Karakter",
    "karakter"
  ],
  [
    "Setarukutura",
    "Struktur",
    "struktur"
  ],
  [
    "Porogarama",
    "Program",
    "program"
  ],
  [
    "Paratiki",
    "Praktik",
    "praktik"
  ],
  [
    "Adiminisirasi",
    "Administrasi",
    "administrasi"
  ],
  [
    "Kontaka",
    "Kontak",
    "kontak"
  ],
  [
    "Aksesa",
    "Akses",
    "akses"
  ],
  [
    "Sitema",
    "Sistem",
    "sistem"
  ],
  [
    "Ekonomi",
    "Ekonomi",
    "ekonomi"
  ],
  [
    "Literasi",
    "Literasi",
    "literasi"
  ]
];
const loanwordRules = [
  "Kata serapan dipakai ketika Zenairi memerlukan istilah baru atau istilah khusus; bentuk asal dicatat agar hubungan maknanya jelas.",
  "Utamakan bunyi saat kata diucapkan, bukan menyalin ejaan asing secara buta. Tulis dengan huruf biasa tanpa tanda diakritik.",
  "Jika dua konsonan berurutan sulit diucapkan, sisipkan vokal a atau i untuk memisahkannya: demokrasi → Demokarasi; struktur → Setarukutura.",
  "Jika kata berakhir dengan konsonan yang terasa berat, vokal a boleh ditambahkan: internet → Intereneta; musik → Musika; sistem → Sitema.",
  "Huruf h akhir yang tidak terdengar boleh dihilangkan: sejarah → Sejara.",
  "Kata yang sudah mudah dibaca dapat dipertahankan: kamera → Kamera; metode → Metode; biologi → Biologi.",
  "Kata serapan tidak mengubah tata bahasa Zenairi. Gunakan kata tersebut dalam pola Subjek + Kata Kerja + Objek dan tetap gunakan partikel pa, fu, ri, serta ne.",
  "Awalan dan akhiran Bahasa Indonesia tidak otomatis dipindahkan. Bentuk turunan baru harus ditetapkan sebagai kosakata Zenairi tersendiri agar maknanya konsisten."
];

const existingWords = new Set(dictionary.map(item => item.word.toLocaleLowerCase('id')));
for (const [word] of [...nativeWords, ...borrowedWords]) {
  const key = word.toLocaleLowerCase('id');
  if (existingWords.has(key)) {
    console.warn('[Zenairi] Kosakata tambahan dilewati karena sudah ada:', word);
    continue;
  }
  existingWords.add(key);
}
nativeWords.forEach(([word, meaning, group], index) => {
  if (!dictionary.some(item => item.word.toLocaleLowerCase('id') === word.toLocaleLowerCase('id'))) {
    dictionary.push({ id: `exp-native-${index}`, word, meaning, group, borrowed: false });
  }
});
borrowedWords.forEach(([word, meaning, sourceWord], index) => {
  if (!dictionary.some(item => item.word.toLocaleLowerCase('id') === word.toLocaleLowerCase('id'))) {
    dictionary.push({ id: `exp-loan-${index}`, word, meaning, group: 'Kata serapan', sourceWord, borrowed: true });
  }
});

const newGroups = [...new Set([...nativeWords.map(item => item[2]), 'Kata serapan'])];
newGroups.forEach(group => {
  if (!dictionaryGroups.includes(group)) dictionaryGroups.push(group);
});

// Aturan serapan ditambahkan ke pedoman yang sudah ada; tidak menggantikan aturan lama.
loanwordRules.forEach(rule => {
  const line = `Kata serapan: ${rule}`;
  if (!grammarRules.includes(line)) grammarRules.push(line);
});

const additionsByLesson = {
  "sapaan": {
    "words": [
      "Yena!",
      "Nara!",
      "Zena!"
    ],
    "questions": [
      [
        "Yena! berarti …",
        "Selamat!",
        [
          "Terima kasih!",
          "Selamat!",
          "Halo!",
          "Maaf!"
        ]
      ],
      [
        "Nara! berarti …",
        "Aduh!",
        [
          "Wah!",
          "Aduh!",
          "Ayo!",
          "Sampai jumpa!"
        ]
      ],
      [
        "Zena! berarti …",
        "Wah!",
        [
          "Wah!",
          "Halo!",
          "Maaf!",
          "Selamat!"
        ]
      ]
    ]
  },
  "kata-ganti": {
    "words": [
      "Kama",
      "Lana",
      "Lu"
    ],
    "questions": [
      [
        "Kama berarti …",
        "Kami",
        [
          "Kita",
          "Kami",
          "Kalian",
          "Mereka"
        ]
      ],
      [
        "Lana berarti …",
        "Mereka",
        [
          "Dia",
          "Kalian",
          "Mereka",
          "Kami"
        ]
      ],
      [
        "Lu berarti …",
        "Dia (laki-laki)",
        [
          "Dia (perempuan)",
          "Aku",
          "Dia (laki-laki)",
          "Kamu"
        ]
      ]
    ]
  },
  "rumah": {
    "words": [
      "Talu",
      "Kavi",
      "Mura",
      "Noka"
    ],
    "questions": [
      [
        "Talu berarti …",
        "Meja",
        [
          "Kursi",
          "Meja",
          "Jendela",
          "Pintu"
        ]
      ],
      [
        "Kavi berarti …",
        "Kunci",
        [
          "Lampu",
          "Atap",
          "Kunci",
          "Lemari"
        ]
      ],
      [
        "Mura berarti …",
        "Jendela",
        [
          "Dinding",
          "Jendela",
          "Kamar",
          "Kasur"
        ]
      ]
    ]
  },
  "makanan": {
    "words": [
      "Saku",
      "Sapa",
      "Pusa",
      "Mavi"
    ],
    "questions": [
      [
        "Saku berarti …",
        "Sayuran",
        [
          "Buah",
          "Sayuran",
          "Nasi",
          "Roti"
        ]
      ],
      [
        "Sapa berarti …",
        "Telur",
        [
          "Susu",
          "Keju",
          "Telur",
          "Sup"
        ]
      ],
      [
        "Pusa berarti …",
        "Sup",
        [
          "Kue",
          "Ikan",
          "Sup",
          "Garam"
        ]
      ]
    ]
  },
  "kata-kerja": {
    "words": [
      "Kera",
      "Zali",
      "Fari",
      "Kalu"
    ],
    "questions": [
      [
        "Kera berarti …",
        "Membuat",
        [
          "Mencari",
          "Membuat",
          "Membeli",
          "Menjual"
        ]
      ],
      [
        "Zali berarti …",
        "Membantu",
        [
          "Menutup",
          "Membantu",
          "Mengirim",
          "Mengambil"
        ]
      ],
      [
        "Fari berarti …",
        "Menemukan",
        [
          "Melupakan",
          "Mengingat",
          "Menemukan",
          "Menunggu"
        ]
      ]
    ]
  },
  "waktu-partikel": {
    "words": [
      "Dema",
      "Pema",
      "Fema"
    ],
    "questions": [
      [
        "Dema berarti …",
        "Hari ini",
        [
          "Besok",
          "Hari ini",
          "Kemarin",
          "Malam"
        ]
      ],
      [
        "Pema berarti …",
        "Kemarin",
        [
          "Sekarang",
          "Pagi",
          "Kemarin",
          "Besok"
        ]
      ],
      [
        "Fema berarti …",
        "Besok",
        [
          "Hari ini",
          "Besok",
          "Kemarin",
          "Malam"
        ]
      ]
    ]
  },
  "kalimat": {
    "words": [
      "Tekonologi",
      "Demokarasi",
      "Intereneta",
      "Setarukutura",
      "Porogarama"
    ],
    "questions": [
      [
        "Kata serapan adalah …",
        "Kata yang diadopsi dari bahasa lain dan disesuaikan",
        [
          "Kata yang hanya dipakai untuk bertanya",
          "Kata yang diadopsi dari bahasa lain dan disesuaikan",
          "Kata yang selalu menunjukkan masa lalu",
          "Kata yang tidak memiliki arti"
        ]
      ],
      [
        "Demokarasi diadaptasi dari bentuk Indonesia …",
        "demokrasi",
        [
          "demografi",
          "demokrasi",
          "demonstrasi",
          "demarkasi"
        ]
      ],
      [
        "Kata serapan dalam Zenairi …",
        "Tetap mengikuti tata bahasa Zenairi",
        [
          "Harus memakai awalan Indonesia",
          "Selalu ditulis dengan huruf asing",
          "Tetap mengikuti tata bahasa Zenairi",
          "Mengubah urutan kalimat"
        ]
      ]
    ]
  },
  "pertanyaan": {
    "words": [
      "Temo",
      "Kira",
      "Zema"
    ],
    "questions": [
      [
        "Temo berarti …",
        "Kapan",
        [
          "Bagaimana",
          "Apa",
          "Kapan",
          "Siapa"
        ]
      ],
      [
        "Kira sebagai kata tanya berarti …",
        "Kenapa",
        [
          "Di mana",
          "Kenapa",
          "Siapa",
          "Apa"
        ]
      ],
      [
        "Zema berarti …",
        "Bagaimana",
        [
          "Kapan",
          "Siapa",
          "Bagaimana",
          "Apa"
        ]
      ]
    ]
  }
};
for (const [lessonId, addition] of Object.entries(additionsByLesson)) {
  const lesson = lessons.find(item => item.id === lessonId);
  if (!lesson) {
    console.warn('[Zenairi] ID materi tidak ditemukan; penambahan dilewati:', lessonId);
    continue;
  }
  for (const word of addition.words) {
    if (!lesson.words.includes(word)) lesson.words.push(word);
  }
  for (const question of addition.questions) {
    const signature = question[0].toLowerCase();
    if (!lesson.questions.some(existing => existing[0].toLowerCase() === signature)) {
      lesson.questions.push(question);
    }
  }
}

// Contoh kalimat tambahan ditaruh di depan agar terlihat di ringkasan aturan, contoh lama tetap ada.
for (const sentence of [...[
  [
    "Ka ri sena Tekonologi.",
    "Aku sedang belajar teknologi."
  ],
  [
    "Ka sena Demokarasi.",
    "Aku mempelajari demokrasi."
  ],
  [
    "Ta pa kera Porogarama.",
    "Kamu sudah membuat program."
  ],
  [
    "Ka ri vena Vikora.",
    "Aku sedang melihat video."
  ],
  [
    "Ta fu dora fi Kavora.",
    "Kamu akan pergi ke kota."
  ],
  [
    "Davi suni.",
    "Buku baru."
  ],
  [
    "Ka ne mako Pala.",
    "Aku tidak makan makanan."
  ]
]].reverse()) {
  const signature = sentence[0].toLowerCase();
  if (!sampleSentences.some(existing => existing[0].toLowerCase() === signature)) {
    sampleSentences.unshift(sentence);
  }
}

// Tambah tampilan sumber kata serapan dan kartu materi tanpa mengubah app.js.
const style = document.createElement('style');
style.id = 'zenairi-expansion-style';
style.textContent = `
.loanword-guide{display:flex;align-items:flex-start;gap:16px;padding:20px;margin:18px 0 20px;border:1px solid #dceaff;border-radius:17px;background:linear-gradient(115deg,#edf8ff,#f3f2ff)}
.loanword-guide-icon{width:46px;height:46px;flex:0 0 46px;display:grid;place-items:center;border-radius:14px;background:#fff;color:#326bd5;font-weight:850;font-size:16px}
.loanword-guide h3{margin:0 0 6px;color:#1e3977;font-size:16px}
.loanword-guide p:not(.eyebrow){margin:0 0 8px;color:#5d7198;font-size:12px;line-height:1.65}
.learn-loanword-guide{margin-top:24px}
.origin-note{display:block;margin-top:5px;color:#7184a8;font-size:10px}
:root[data-theme="dark"] .loanword-guide{background:#202f50;border-color:#35476d}
:root[data-theme="dark"] .loanword-guide h3{color:#edf3ff}
:root[data-theme="dark"] .loanword-guide p:not(.eyebrow),:root[data-theme="dark"] .origin-note{color:#a9bad9}
@media(max-width:600px){.loanword-guide{padding:15px;gap:12px}.loanword-guide-icon{width:40px;height:40px;flex-basis:40px}}
`;
document.head.append(style);

function makeGuide(className, eyebrow, title, description, buttonLabel, action) {
  const section = document.createElement('section');
  section.className = className;
  const icon = document.createElement('div');
  icon.className = 'loanword-guide-icon';
  icon.textContent = 'Aa';
  const content = document.createElement('div');
  const label = document.createElement('p');
  label.className = 'eyebrow';
  label.textContent = eyebrow;
  const heading = document.createElement('h3');
  heading.textContent = title;
  const body = document.createElement('p');
  body.textContent = description;
  const button = document.createElement('button');
  button.className = 'text-button';
  button.type = 'button';
  button.dataset.action = action;
  if (action === 'navigate') button.dataset.page = 'dictionary';
  button.textContent = buttonLabel;
  content.append(label, heading, body, button);
  section.append(icon, content);
  return section;
}

function enhancePage() {
  const page = document.querySelector('.page-content');
  const heading = page?.querySelector('h1')?.textContent?.trim();
  if (!page || !heading) return;

  if (heading === 'Kamus Zenairi') {
    const toolbar = page.querySelector('.dictionary-toolbar');
    if (toolbar && !page.querySelector('.loanword-guide')) {
      toolbar.before(makeGuide(
        'loanword-guide',
        'PENGEMBANGAN KOSAKATA',
        'Kata serapan Zenairi',
        'Istilah baru dapat diadopsi dari Bahasa Indonesia atau bahasa lain. Ejaan dapat disesuaikan agar mudah dibaca, sementara tata bahasa Zenairi tetap dipakai.',
        'Pelajari aturan serapan →',
        'show-grammar'
      ));
    }
    page.querySelectorAll('.dictionary-table tbody tr').forEach(row => {
      const word = row.querySelector('td:first-child')?.textContent?.trim();
      const item = dictionary.find(entry => entry.sourceWord && entry.word.toLocaleLowerCase('id') === (word || '').toLocaleLowerCase('id'));
      const meaningCell = row.querySelector('td:nth-child(2)');
      if (item && meaningCell && !meaningCell.querySelector('.origin-note')) {
        const note = document.createElement('small');
        note.className = 'origin-note';
        note.textContent = `Bentuk asal Bahasa Indonesia: ${item.sourceWord}`;
        meaningCell.append(note);
      }
    });
  }

  if (heading === 'Jalur belajar') {
    const callout = page.querySelector('.grammar-callout');
    if (callout && !page.querySelector('.learn-loanword-guide')) {
      callout.before(makeGuide(
        'loanword-guide learn-loanword-guide',
        'MATERI TAMBAHAN',
        'Penyerapan kata',
        'Pelajari cara Zenairi menerima istilah baru tanpa mengubah pola kalimat dan partikel waktunya.',
        'Buka kamus serapan →',
        'navigate'
      ));
    }
  }

  // Label latihan mengikuti jumlah soal baru; kartu yang sudah selesai tetap menampilkan status selesai.
  page.querySelectorAll('.lesson-card').forEach(card => {
    if (card.classList.contains('lesson-done')) return;
    const button = card.querySelector('[data-action="open-lesson"]');
    const lesson = lessons.find(item => item.id === button?.dataset.lesson);
    const label = card.querySelector('.lesson-card-bottom > span');
    if (lesson && label) label.textContent = `${lesson.questions.length} latihan · 5–8 menit`;
  });
}

const appRoot = document.querySelector('#app');
if (appRoot) {
  const observer = new MutationObserver(() => enhancePage());
  observer.observe(appRoot, { childList: true, subtree: true });
  enhancePage();
}
