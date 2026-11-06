import { supabase } from './supabase.js';
import { dictionary, dictionaryGroups, lessons, grammarRules, sampleSentences } from './dictionary.js';

const app = document.querySelector('#app');
const toastRoot = document.querySelector('#toast-root');
const readThemePreference = () => {
  try {
    const value = localStorage.getItem('zenairi-theme');
    return ['light', 'dark'].includes(value) ? value : 'system';
  } catch { return 'system'; }
};
let themePreference = readThemePreference();
const systemThemeQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
function applyTheme() {
  const effectiveTheme = themePreference === 'system'
    ? (systemThemeQuery?.matches ? 'dark' : 'light')
    : themePreference;
  document.documentElement.dataset.theme = effectiveTheme;
  document.documentElement.dataset.themePreference = themePreference;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = effectiveTheme === 'dark' ? '#151f38' : '#2864e8';
}
function setThemePreference(preference) {
  if (!['system', 'light', 'dark'].includes(preference)) return;
  themePreference = preference;
  try { localStorage.setItem('zenairi-theme', preference); } catch { /* Tema tetap berlaku untuk sesi ini. */ }
  applyTheme();
}
applyTheme();
systemThemeQuery?.addEventListener?.('change', () => {
  if (themePreference === 'system') {
    applyTheme();
    render();
  }
});

const state = {
  session: null, user: null, profile: null,
  progress: { xp: 0, level: 1, streak: 0, last_activity_date: null, completed_lessons: [] },
  attempts: [], page: 'home', authMode: 'login', authBusy: false,
  dictionarySearch: '', dictionaryGroup: 'Semua kategori', lesson: null,
  quizIndex: 0, quizAnswers: [], quizChecked: false, quizSubmitted: false, busy: false
};

const todayJakarta = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const yesterdayJakarta = () => {
  const [year, month, day] = todayJakarta().split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day - 1));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
};
const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const initials = name => (name || 'Z').trim().split(/\s+/).slice(0,2).map(x => x[0]).join('').toUpperCase();
const completedCount = () => state.progress.completed_lessons?.length || 0;
const percent = () => Math.round((completedCount() / lessons.length) * 100);
const xpToNextLevel = () => state.progress.xp % 100;
const isComplete = id => (state.progress.completed_lessons || []).includes(id);

function toast(message, type = 'info') {
  const node = document.createElement('div');
  node.className = `toast toast-${type}`;
  node.textContent = message;
  toastRoot.append(node);
  requestAnimationFrame(() => node.classList.add('show'));
  setTimeout(() => { node.classList.remove('show'); setTimeout(() => node.remove(), 220); }, 3200);
}

function setPage(page) { state.page = page; state.lesson = null; render(); }

let accountLoadVersion = 0;
let accountLoadPendingFor = null;
let accountLoadedFor = null;
async function loadAccount(session) {
  const nextUser = session?.user || null;
  // Hindari query ganda bila INITIAL_SESSION dan SIGNED_IN tiba untuk akun yang sama.
  if (nextUser && (accountLoadPendingFor === nextUser.id || accountLoadedFor === nextUser.id)) {
    state.session = session;
    state.user = nextUser;
    return;
  }

  const requestVersion = ++accountLoadVersion;
  state.session = session;
  state.user = nextUser;
  if (!state.user) {
    accountLoadPendingFor = null;
    accountLoadedFor = null;
    state.progress = { xp: 0, level: 1, streak: 0, last_activity_date: null, completed_lessons: [] };
    state.attempts = [];
    state.page = 'home';
    render();
    return;
  }

  // Jangan bawa progres akun sebelumnya ketika pengguna berganti akun.
  if (accountLoadedFor !== state.user.id) {
    state.progress = { xp: 0, level: 1, streak: 0, last_activity_date: null, completed_lessons: [] };
    state.attempts = [];
  }
  accountLoadPendingFor = state.user.id;

  // Dashboard hanya mengambil progres yang benar-benar dibutuhkan.
  // Riwayat kuis tidak diminta pada dashboard karena belum ada layar yang memerlukannya.
  const { data, error } = await supabase.from('user_progress')
    .select('user_id, xp, level, streak, last_activity_date, completed_lessons')
    .eq('user_id', state.user.id)
    .maybeSingle();

  if (requestVersion !== accountLoadVersion) return;
  accountLoadPendingFor = null;
  accountLoadedFor = error ? null : state.user.id;
  if (error) {
    if (!navigator.onLine) {
      toast('Sedang offline. Materi yang tersimpan di perangkat tetap dapat dibuka; progres dan XP perlu internet untuk disimpan.', 'info');
    } else {
      toast(`Gagal memuat progres: ${error.message}`, 'error');
    }
  } else if (data) {
    state.progress = data;
    try { localStorage.setItem(`zenairi-progress-${state.user.id}`, JSON.stringify(data)); } catch { /* Cache progres lokal bersifat opsional. */ }
  } else {
    state.progress = { xp: 0, level: 1, streak: 0, last_activity_date: null, completed_lessons: [] };
  }
  if (error && !navigator.onLine) {
    try {
      const cachedProgress = localStorage.getItem(`zenairi-progress-${state.user.id}`);
      if (cachedProgress) state.progress = JSON.parse(cachedProgress);
    } catch { /* Gunakan nilai awal bila cache tidak tersedia atau rusak. */ }
  }
  state.page = 'home';
  render();
}
async function completeLesson(score, total) {
  if (!state.user || !state.lesson) return;
  if (!navigator.onLine) {
    toast('Hasil kuis belum bisa disimpan saat offline. Sambungkan internet lalu tekan Selesaikan lagi.', 'error');
    return;
  }
  state.busy = true;
  render();
  try {
    const { data, error } = await supabase.rpc('complete_zenairi_lesson', {
      p_lesson_id: state.lesson.id,
      p_score: score,
      p_total_questions: total
    });
    if (error) throw error;
    state.progress = data.progress;
    state.attempts = [data.attempt, ...state.attempts].slice(0, 8);
    state.quizSubmitted = true;
    state.busy = false;
    render();
    const xpGain = Number(data.xp_gain) || 0;
    toast(xpGain > 0 ? `Mantap! +${xpGain} XP masuk ke akunmu.` : 'Kuis tersimpan. Materi ini sudah pernah memberi XP.', 'success');
  } catch (error) {
    state.busy = false;
    render();
    toast(`Belum berhasil menyimpan hasil: ${error.message}`, 'error');
  }
}

function showAuth(mode = 'login') {
  state.authMode = mode;
  app.innerHTML = `
    <main class="auth-shell">
      <section class="auth-art">
        <div class="brand brand-light"><span class="brand-mark">Z</span><span>zenairi<span class="brand-thin"> learn</span></span></div>
        <div class="auth-art-copy"><p class="eyebrow light-eyebrow">SATU BAHASA, SATU IDENTITAS</p><h1>Temukan cara baru<br>untuk berkata.</h1><p>Belajar Bahasa Zenairi sedikit demi sedikit, dengan latihan yang terasa ringan dan menyenangkan.</p></div>
        <div class="fox-stage"><div class="fox-orbit orbit-one"></div><div class="fox-orbit orbit-two"></div><img class="fox-emoji-image" src="./assets/zeni-mascot.webp" alt="Zeni, maskot Zenairi Learn" loading="eager"><span class="float-word word-one">Sava!</span><span class="float-word word-two">Leya!</span><span class="float-star star-one">✦</span><span class="float-star star-two">✧</span></div>
        <div class="auth-art-foot"><span>Ruang belajar Bahasa Zenairi</span><span>01 / ZENAIRI</span></div>
      </section>
      <section class="auth-panel"><button class="theme-toggle auth-theme-toggle" data-action="toggle-theme" aria-label="Ganti tema" title="Ganti tema">${document.documentElement.dataset.theme === 'dark' ? '☀️' : '🌙'}</button><div class="auth-card">
        <div class="mobile-brand brand"><span class="brand-mark">Z</span><span>zenairi<span class="brand-thin"> learn</span></span></div>
        <p class="eyebrow">MULAI PERJALANANMU</p>
        <h2>${state.authMode === 'login' ? 'Selamat datang kembali' : 'Buat akun Zenairi'}</h2>
        <p class="muted">${state.authMode === 'login' ? 'Masuk untuk melanjutkan progres belajarmu.' : 'Daftar gratis dan simpan progres belajarmu.'}</p>
        <div class="social-auth" aria-label="Pilihan masuk dengan akun lain">
          <button class="social-btn google-btn" type="button" data-action="oauth" data-provider="google" ${state.authBusy ? 'disabled' : ''}><span class="google-g" aria-hidden="true">G</span><span>Lanjutkan dengan Google</span></button>
        </div>
        <div class="auth-divider"><span>atau gunakan email</span></div>
        <form id="auth-form" class="auth-form">
          ${state.authMode === 'register' ? '<label>Nama panggilan<input name="name" autocomplete="name" placeholder="Nama kamu" minlength="2" required></label>' : ''}
          <label>Email<input name="email" type="email" autocomplete="email" placeholder="nama@email.com" required></label>
          <label>Kata sandi<input name="password" type="password" autocomplete="${state.authMode === 'login' ? 'current-password' : 'new-password'}" minlength="6" placeholder="Minimal 6 karakter" required></label>
          <button class="btn btn-primary btn-full" type="submit" ${state.authBusy ? 'disabled' : ''}>${state.authBusy ? 'Memproses…' : state.authMode === 'login' ? 'Masuk ke Zenairi' : 'Buat akun'}</button>
        </form>
        <p class="auth-switch">${state.authMode === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'} <button class="text-button" data-action="switch-auth" data-mode="${state.authMode === 'login' ? 'register' : 'login'}">${state.authMode === 'login' ? 'Daftar di sini' : 'Masuk'}</button></p>
        <div class="auth-note"><span>🔒</span><span>${navigator.onLine ? 'Progres tersimpan privat di akunmu.' : 'Kamu sedang offline. Login perlu internet; sesi yang masih tersimpan dapat membuka materi lokal.'}</span></div>
      </div><p class="auth-copyright">© 2026 Zenairi Learn</p></section>
    </main>`;
  document.querySelector('#auth-form').addEventListener('submit', handleAuthSubmit);
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  if (state.authBusy) return;
  const form = new FormData(event.currentTarget);
  const email = String(form.get('email') || '').trim();
  const password = String(form.get('password') || '');
  const name = String(form.get('name') || '').trim();
  let authCompleted = false;
  state.authBusy = true; showAuth(state.authMode);
  try {
    if (state.authMode === 'register') {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { display_name: name } } });
      if (error) throw error;
      if (!data.session) {
        toast('Akun dibuat. Periksa email untuk konfirmasi, lalu masuk.', 'success');
        state.authMode = 'login'; showAuth('login'); return;
      }
      toast('Akun berhasil dibuat. Selamat belajar!', 'success');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast('Berhasil masuk. Selamat belajar!', 'success');
    }
    authCompleted = true;
  } catch (error) {
    toast(error.message || 'Terjadi kesalahan saat autentikasi.', 'error');
  } finally {
    state.authBusy = false;
    if (!authCompleted && !state.user) showAuth(state.authMode);
  }
}

function shell(content) {
  const name = state.user?.user_metadata?.display_name || state.user?.email?.split('@')[0] || 'Pelajar';
  return `
    <div class="app-shell">
      <aside class="sidebar">
        <a class="brand sidebar-brand" href="#home" data-action="navigate" data-page="home"><span class="brand-mark">Z</span><span>zenairi<span class="brand-thin"> learn</span></span></a>
        <div class="side-label">MENU BELAJAR</div>
        <nav class="side-nav">
          ${navItem('home','⌂','Beranda')}${navItem('learn','▤','Belajar')}${navItem('dictionary','⌕','Kamus')}${navItem('achievements','✦','Prestasi')}
        </nav>
        <div class="sidebar-bottom"><div class="side-quote"><span class="quote-mark">“</span><p>Satu bahasa,<br>satu identitas.</p><span class="quote-flower">✳</span></div><button class="profile-mini" data-action="navigate" data-page="profile"><span class="avatar">${escapeHTML(initials(name))}</span><span class="profile-mini-copy"><b>${escapeHTML(name)}</b><small>Pelajar Zenairi</small></span><span class="mini-chevron">›</span></button></div>
      </aside>
      <main class="main-area">
        <header class="topbar"><div class="mobile-brand brand"><span class="brand-mark">Z</span><span>zenairi<span class="brand-thin"> learn</span></span></div><div class="topbar-right"><button class="theme-toggle" data-action="toggle-theme" aria-label="Ganti tema" title="Ganti tema">${document.documentElement.dataset.theme === 'dark' ? '☀️' : '🌙'}</button><span class="connection-status" data-connection-status ${navigator.onLine ? 'hidden' : ''} role="status">Offline · progres belum tersinkron</span><div class="top-stat"><span>🔥</span><b>${state.progress.streak || 0}</b><small>hari</small></div><div class="top-stat xp-stat"><span>✦</span><b>${state.progress.xp || 0}</b><small>XP</small></div><button class="avatar top-avatar" data-action="navigate" data-page="profile">${escapeHTML(initials(name))}</button></div></header>
        <div class="page-content">${content}</div>
        <nav class="mobile-nav">${navItem('home','⌂','Home')}${navItem('learn','▤','Belajar')}${navItem('dictionary','⌕','Kamus')}${navItem('achievements','✦','Prestasi')}${navItem('profile','◉','Profil')}</nav>
      </main>
    </div>
    ${state.lesson ? lessonDialog() : ''}`;
}
function navItem(id, icon, label) { return `<button class="nav-item ${state.page === id ? 'active' : ''}" data-action="navigate" data-page="${id}"><span class="nav-icon">${icon}</span><span>${label}</span></button>`; }

function homePage() {
  const name = state.user?.user_metadata?.display_name || state.user?.email?.split('@')[0] || 'Pelajar';
  const nextLesson = lessons.find(l => !isComplete(l.id)) || lessons[0];
  const completed = completedCount();
  return `
    <section class="welcome-row"><div><p class="eyebrow">RUANG BELAJAR ZENAIRI</p><h1>Halo, ${escapeHTML(name)} <span class="wave">✦</span></h1><p class="muted">Satu langkah kecil hari ini, satu kemajuan baru.</p></div><div class="welcome-date"><span class="date-dot"></span> TERUS BERTUMBUH</div></section>
    <section class="hero-banner"><div class="hero-copy"><span class="hero-kicker">PETUALANGAN BAHASAMU</span><h2>Bahasa baru,<br>cerita baru.</h2><p>Pelajari Zenairi lewat kata, kalimat, dan latihan singkat.</p><button class="btn btn-cream" data-action="open-lesson" data-lesson="${nextLesson.id}">${completed ? 'Lanjutkan belajar' : 'Mulai belajar'} <span>→</span></button></div><div class="hero-art"><div class="sun-disc"></div><div class="hero-fox"><img src="./assets/zeni-mascot.webp" alt="Zeni si rubah-merak" loading="eager"></div><div class="hero-note note-a">Sava!</div><div class="hero-note note-b">Leya!</div><span class="hero-sparkle sparkle-a">✦</span><span class="hero-sparkle sparkle-b">✧</span></div><div class="hero-vertical">ZENAIRI · LEARN · GROW</div></section>
    <section class="stats-grid"><article class="stat-card"><div class="stat-icon stat-green">✦</div><div><span>Total XP</span><strong>${state.progress.xp || 0}</strong><small>Level ${state.progress.level || 1}</small></div><div class="stat-decoration">✧</div></article><article class="stat-card"><div class="stat-icon stat-orange">🔥</div><div><span>Streak</span><strong>${state.progress.streak || 0} hari</strong><small>Jaga ritmemu</small></div><div class="stat-decoration">✧</div></article><article class="stat-card"><div class="stat-icon stat-purple">▤</div><div><span>Materi selesai</span><strong>${completed}/${lessons.length}</strong><small>${percent()}% perjalanan</small></div><div class="stat-decoration">✧</div></article></section>
    <section class="home-lower"><div class="panel progress-panel"><div class="panel-heading"><div><p class="eyebrow">PROGRES BELAJAR</p><h3>Terus melangkah</h3></div><span class="progress-percent">${percent()}%</span></div><div class="progress-track"><span style="width:${percent()}%"></span></div><div class="progress-meta"><span>${completed} materi selesai</span><span>${lessons.length - completed} materi tersisa</span></div><div class="level-row"><div class="level-badge">${state.progress.level || 1}</div><div class="level-copy"><b>Level ${state.progress.level || 1}</b><small>${xpToNextLevel()} / 100 XP menuju level berikutnya</small><div class="level-track"><span style="width:${xpToNextLevel()}%"></span></div></div></div></div>
      <div class="panel next-panel"><div class="next-top"><span class="next-label">REKOMENDASI HARI INI</span><span class="next-icon">${nextLesson.icon}</span></div><h3>${nextLesson.title}</h3><p>${nextLesson.subtitle}</p><div class="next-bottom"><span>⏱ 5 menit · + XP</span><button class="icon-button" data-action="open-lesson" data-lesson="${nextLesson.id}">→</button></div></div></section>
    <section class="section-head"><div><p class="eyebrow">JALUR PEMBELAJARAN</p><h3>Mulai dari sini</h3></div><button class="link-button" data-action="navigate" data-page="learn">Lihat semua <span>→</span></button></section>
    <section class="lesson-preview-grid">${lessons.slice(0,3).map(lessonCard).join('')}</section>`;
}

function lessonCard(lesson, index) {
  const done = isComplete(lesson.id);
  const idx = lessons.findIndex(l => l.id === lesson.id);
  return `<article class="lesson-card ${lesson.color} ${done ? 'lesson-done' : ''}"><div class="lesson-card-top"><span class="lesson-number">${String(idx + 1).padStart(2,'0')}</span><span class="lesson-icon">${lesson.icon}</span></div><h3>${lesson.title}</h3><p>${lesson.subtitle}</p><div class="lesson-card-bottom"><span>${done ? '<span class="done-check">✓</span> Selesai' : `4 latihan · 5 menit`}</span><button class="round-arrow" data-action="open-lesson" data-lesson="${lesson.id}" aria-label="Buka ${lesson.title}">→</button></div></article>`;
}

function learnPage() {
  return `<section class="page-intro"><p class="eyebrow">KURIKULUM BERTAHAP</p><h1>Jalur belajar</h1><p class="muted">Pilih materi, pahami kosakata, lalu uji kemampuanmu.</p></section><section class="learn-summary"><div class="learn-summary-icon"><img src="./assets/zeni-avatar.webp" alt="Zeni" loading="lazy"></div><div><b>${completedCount()} dari ${lessons.length} materi selesai</b><p>Setiap materi yang diselesaikan menambah XP dan progres akunmu.</p></div><div class="learn-summary-progress"><strong>${percent()}%</strong><div class="progress-track"><span style="width:${percent()}%"></span></div></div></section><div class="lesson-path">${lessons.map((l,i)=>`<div class="path-line"><div class="path-node ${isComplete(l.id) ? 'path-complete' : ''}">${isComplete(l.id) ? '✓' : String(i+1).padStart(2,'0')}</div><div class="path-card">${lessonCard(l,i)}</div></div>`).join('')}</div><section class="grammar-callout"><span class="grammar-icon">✎</span><div><b>Ingat aturan dasarnya</b><p>Subjek + Kata Kerja + Objek. Kata sifat ditulis setelah kata benda.</p></div><button class="text-button" data-action="show-grammar">Lihat aturan →</button></section>`;
}

function csvCell(value) {
  return `"${String(value ?? '').replace(/"/g, '""')}"`;
}

function downloadDictionary() {
  const rows = [
    ['Kata Zenairi', 'Arti Bahasa Indonesia', 'Kelompok'],
    ...dictionary.map(item => [item.word, item.meaning, item.group])
  ];
  // BOM membantu Excel mengenali UTF-8; titik koma cocok untuk setelan regional Indonesia.
  const csv = '\uFEFF' + rows.map(row => row.map(csvCell).join(';')).join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'kamus-zenairi.csv';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast(`Kamus berhasil disiapkan: ${dictionary.length} entri.`, 'success');
}

function dictionaryPage() {
  const search = state.dictionarySearch.toLowerCase().trim();
  const filtered = dictionary.filter(item => (state.dictionaryGroup === 'Semua kategori' || item.group === state.dictionaryGroup) && (!search || item.word.toLowerCase().includes(search) || item.meaning.toLowerCase().includes(search)));
  return `<section class="page-intro"><p class="eyebrow">RUJUKAN KOSAKATA</p><h1>Kamus Zenairi</h1><p class="muted">Cari kata berdasarkan ejaan, arti, atau kelompok kata.</p></section><section class="dictionary-toolbar"><label class="search-box"><span>⌕</span><input id="dictionary-search" type="search" placeholder="Cari kata Zenairi atau arti…" value="${escapeHTML(state.dictionarySearch)}"></label><label class="select-wrap"><span>Kategori</span><select id="dictionary-group"><option>Semua kategori</option>${dictionaryGroups.map(g=>`<option ${state.dictionaryGroup===g?'selected':''}>${g}</option>`).join('')}</select></label><button class="btn btn-outline dictionary-download" data-action="download-dictionary" type="button">↓ Unduh kamus CSV</button></section><div class="dictionary-count">Menampilkan <b>${filtered.length}</b> entri dari ${dictionary.length} kosakata</div><section class="dictionary-table-wrap"><table class="dictionary-table"><thead><tr><th>KATA ZENAIRI</th><th>ARTI BAHASA INDONESIA</th><th>KELOMPOK</th></tr></thead><tbody>${filtered.map(item=>`<tr><td><span class="word-pill">${escapeHTML(item.word)}</span></td><td>${escapeHTML(item.meaning)}</td><td><span class="group-tag">${escapeHTML(item.group)}</span></td></tr>`).join('') || '<tr><td class="empty-table" colspan="3">Kata tidak ditemukan. Coba kata lain.</td></tr>'}</tbody></table></section><p class="dictionary-footnote">Catatan: kata yang memiliki bentuk sama tetapi arti berbeda ditampilkan terpisah mengikuti konteks kamus.</p>`;
}

function achievementPage() {
  const achievements = [
    ['🌱','Langkah Pertama','Selesaikan 1 materi',completedCount() >= 1],
    ['📚','Pencinta Kata','Selesaikan 3 materi',completedCount() >= 3],
    ['🏅','Penjelajah Zenairi','Selesaikan 6 materi',completedCount() >= 6],
    ['🔥','Ritme Terjaga','Capai streak 3 hari',(state.progress.streak || 0) >= 3],
    ['✨','Pengumpul XP','Kumpulkan 100 XP',(state.progress.xp || 0) >= 100],
    ['🎓','Lancar Bertahap','Selesaikan semua materi',completedCount() >= lessons.length]
  ];
  return `<section class="page-intro"><p class="eyebrow">APRESIASI PERJALANANMU</p><h1>Ruang prestasi</h1><p class="muted">Setiap langkah layak dirayakan. Kumpulkan lencana dari perjalanan belajarmu.</p></section><section class="achievement-hero"><div class="achievement-medal">✦</div><div><p class="eyebrow">KOLEKSI LENCANA</p><h2>${achievements.filter(a=>a[3]).length} / ${achievements.length} diperoleh</h2><p>Terus belajar untuk membuka pencapaian berikutnya.</p></div><div class="achievement-fox"><img src="./assets/zeni-avatar.webp" alt="Zeni" loading="lazy"></div></section><section class="achievement-grid">${achievements.map(a=>`<article class="achievement-card ${a[3]?'unlocked':''}"><div class="achievement-symbol">${a[0]}</div><div><h3>${a[1]}</h3><p>${a[2]}</p><span class="achievement-status">${a[3]?'✓ Diperoleh':'Terkunci'}</span></div><span class="achievement-spark">✧</span></article>`).join('')}</section>`;
}

function profilePage() {
  const name = state.user?.user_metadata?.display_name || state.user?.email?.split('@')[0] || 'Pelajar';
  return `<section class="page-intro"><p class="eyebrow">AKUN DAN PERJALANAN</p><h1>Profil pelajar</h1><p class="muted">Informasi akun dan ringkasan perjalanan Zenairi-mu.</p></section><section class="profile-hero"><div class="profile-avatar-large">${escapeHTML(initials(name))}</div><div class="profile-main"><span class="profile-role">PELAJAR ZENAIRI</span><h2>${escapeHTML(name)}</h2><p>${escapeHTML(state.user?.email || '')}</p></div><div class="profile-level">LEVEL<strong>${state.progress.level || 1}</strong></div></section><section class="profile-stats"><div><span>Total XP</span><b>${state.progress.xp || 0}</b></div><div><span>Streak</span><b>${state.progress.streak || 0} hari</b></div><div><span>Materi selesai</span><b>${completedCount()} / ${lessons.length}</b></div></section><section class="panel settings-panel"><div><p class="eyebrow">PENGATURAN TAMPILAN</p><h3>Tema yang nyaman</h3><p class="muted">Ikuti pengaturan perangkat atau pilih tema sendiri. Pilihan tersimpan di perangkat ini.</p><div class="theme-options"><button class="btn btn-outline ${themePreference === 'system' ? 'is-selected' : ''}" data-action="set-theme" data-theme="system" aria-pressed="${themePreference === 'system'}">◐ Otomatis</button><button class="btn btn-outline ${themePreference === 'light' ? 'is-selected' : ''}" data-action="set-theme" data-theme="light" aria-pressed="${themePreference === 'light'}">☀️ Terang</button><button class="btn btn-outline ${themePreference === 'dark' ? 'is-selected' : ''}" data-action="set-theme" data-theme="dark" aria-pressed="${themePreference === 'dark'}">🌙 Gelap</button></div></div><div class="account-settings"><p class="eyebrow">PENGATURAN AKUN</p><h3>Kelola sesi belajarmu</h3><p class="muted">Progres belajar ditautkan ke akun Supabase dan hanya dapat dibaca oleh pemilik akun.</p><button class="btn btn-outline" data-action="logout">Keluar dari akun ↗</button></div></section><section class="profile-footnote">Bergabung dalam perjalanan Zenairi · Satu bahasa, satu identitas.</section>`;
}

function questionExplanation(question) {
  const correct = question[1];
  const found = dictionary.find(item => item.meaning.toLowerCase() === String(correct).toLowerCase());
  if (found) return `${found.word} berarti “${found.meaning}”.`;
  if (String(question[0]).includes('pola dasar')) return 'Pola dasar kalimat Zenairi adalah Subjek + Kata Kerja + Objek.';
  if (String(question[0]).includes('kata sifat')) return 'Dalam Zenairi, kata sifat ditulis setelah kata benda.';
  return `Ingat kembali materi ini: jawaban yang tepat adalah “${correct}”.`;
}

function lessonDialog() {
  const l = state.lesson;
  if (!l) return '';
  const questions = l.questions;
  if (state.quizSubmitted) {
    const score = questions.reduce((sum,q,i)=>sum + (state.quizAnswers[i] === q[1] ? 1 : 0),0);
    return `<div class="modal-backdrop"><section class="lesson-modal result-modal"><button class="modal-close" data-action="close-lesson">×</button><div class="result-confetti">✦</div><div class="result-icon">${score === questions.length ? '🏆' : '🌟'}</div><p class="eyebrow">LATIHAN SELESAI</p><h2>${score === questions.length ? 'Luar biasa!' : 'Kerja bagus!'}</h2><p class="muted">Kamu menjawab ${score} dari ${questions.length} pertanyaan dengan benar.</p><div class="result-score"><strong>${score}/${questions.length}</strong><span>jawaban benar</span></div><button class="btn btn-primary btn-full" data-action="close-lesson">Kembali ke perjalanan</button></section></div>`;
  }
  const index = state.quizIndex;
  const q = questions[index];
  const selected = state.quizAnswers[index];
  return `<div class="modal-backdrop"><section class="lesson-modal"><div class="modal-top"><span class="lesson-modal-icon">${l.icon}</span><div class="modal-title"><p class="eyebrow">${l.title.toUpperCase()}</p><h2>${state.quizIndex === -1 ? 'Kenali kosakatanya' : 'Uji pemahamanmu'}</h2></div><button class="modal-close" data-action="close-lesson">×</button></div>
    <div class="quiz-progress"><div class="quiz-progress-track"><span style="width:${((index+1)/questions.length)*100}%"></span></div><span>${index+1} / ${questions.length}</span></div>
    <div class="lesson-word-strip">${l.words.map(w=>{const item=dictionary.find(d=>d.word.toLowerCase()===w.toLowerCase());return `<span><b>${escapeHTML(w)}</b><small>${escapeHTML(item?.meaning || 'Contoh kalimat')}</small></span>`}).join('')}</div>
    <div class="quiz-question"><span class="question-label">PERTANYAAN ${index+1}</span><h3>${escapeHTML(q[0])}</h3></div>
    <div class="quiz-options">${q[2].map((option,i)=>{const isCorrect=option===q[1];const isSelected=selected===option;return `<button class="quiz-option ${isSelected?'selected':''} ${state.quizChecked && isCorrect?'answer-correct':''} ${state.quizChecked && isSelected && !isCorrect?'answer-wrong':''}" data-action="choose-answer" data-answer="${escapeHTML(option)}" ${state.quizChecked?'disabled':''}><span class="option-letter">${state.quizChecked && isCorrect?'✓':String.fromCharCode(65+i)}</span>${escapeHTML(option)}</button>`}).join('')}</div>
    ${state.quizChecked ? `<section class="answer-feedback ${selected===q[1]?'feedback-correct':'feedback-wrong'}"><div class="feedback-title">${selected===q[1]?'✓ Tepat sekali!':'✕ Jawaban belum tepat'}</div><p>${selected===q[1]?'Bagus! Jawabanmu benar.':`Jawaban yang benar: <strong>${escapeHTML(q[1])}</strong>`}</p><small>${escapeHTML(questionExplanation(q))}</small></section>` : ''}
    <div class="quiz-footer"><span class="quiz-tip">${state.quizChecked?'Perhatikan pembahasannya sebelum lanjut.':'Pilih satu jawaban, lalu periksa hasilnya.'}</span><button class="btn btn-primary" data-action="${state.quizChecked?'next-question':'check-answer'}" ${!selected || state.busy ? 'disabled' : ''}>${state.quizChecked ? (index === questions.length-1 ? 'Selesaikan' : 'Lanjut') : 'Periksa jawaban'} <span>→</span></button></div>
  </section></div>`;
}

function render() {
  if (!state.user) { showAuth(state.authMode); return; }
  const pages = { home: homePage, learn: learnPage, dictionary: dictionaryPage, achievements: achievementPage, profile: profilePage };
  app.innerHTML = shell((pages[state.page] || homePage)());
  if (state.page === 'dictionary') {
    const search = document.querySelector('#dictionary-search');
    search?.addEventListener('input', e => { state.dictionarySearch = e.target.value; const pos=e.target.selectionStart; render(); const input=document.querySelector('#dictionary-search'); input?.focus(); input?.setSelectionRange(pos,pos); });
    document.querySelector('#dictionary-group')?.addEventListener('change', e => { state.dictionaryGroup = e.target.value; render(); });
  }
}

function openLesson(id) {
  const lesson = lessons.find(l => l.id === id);
  if (!lesson) return;
  state.lesson = lesson; state.quizIndex = 0; state.quizAnswers = []; state.quizChecked = false; state.quizSubmitted = false; state.busy = false; render();
}

app.addEventListener('click', async (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;
  if (action === 'navigate') setPage(target.dataset.page);
  if (action === 'switch-auth') { state.authBusy=false; showAuth(target.dataset.mode); }
  if (action === 'oauth') {
    const provider = target.dataset.provider;
    if (provider !== 'google' || state.authBusy) return;
    state.authBusy = true;
    showAuth(state.authMode);
    try {
      const redirectTo = `${window.location.origin}${window.location.pathname}`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo, queryParams: { prompt: 'select_account' } }
      });
      if (error) throw error;
    } catch (error) {
      state.authBusy = false;
      showAuth(state.authMode);
      toast(error.message || `Login ${provider} belum bisa dimulai. Periksa konfigurasi provider di Supabase.`, 'error');
    }
  }
  if (action === 'open-lesson') openLesson(target.dataset.lesson);
  if (action === 'close-lesson') { state.lesson=null; state.quizChecked=false; state.quizSubmitted=false; render(); }
  if (action === 'choose-answer') {
    if (state.quizChecked) return;
    state.quizAnswers[state.quizIndex] = target.dataset.answer;
    render();
  }
  if (action === 'check-answer') {
    if (!state.quizAnswers[state.quizIndex]) return;
    state.quizChecked = true;
    render();
  }
  if (action === 'next-question') {
    if (!state.quizChecked || !state.quizAnswers[state.quizIndex]) return;
    if (state.quizIndex < state.lesson.questions.length - 1) { state.quizIndex++; state.quizChecked = false; render(); }
    else { const score=state.lesson.questions.reduce((sum,q,i)=>sum + (state.quizAnswers[i]===q[1]?1:0),0); await completeLesson(score,state.lesson.questions.length); }
  }
  if (action === 'toggle-theme') {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setThemePreference(nextTheme);
    render();
  }
  if (action === 'set-theme') {
    setThemePreference(target.dataset.theme);
    render();
  }
  if (action === 'download-dictionary') downloadDictionary();
  if (action === 'logout') {
    const { error } = await supabase.auth.signOut();
    if (error) toast(error.message,'error'); else { state.user=null; state.session=null; state.page='home'; toast('Kamu sudah keluar. Sampai jumpa!','success'); render(); }
  }
  if (action === 'show-grammar') {
    const html = `<div class="modal-backdrop"><section class="lesson-modal grammar-modal"><button class="modal-close" data-action="close-grammar">×</button><p class="eyebrow">PEDOMAN BAHASA</p><h2>Aturan dasar Zenairi</h2><ol>${grammarRules.map(r=>`<li>${escapeHTML(r)}</li>`).join('')}</ol><div class="sample-sentences"><b>Contoh kalimat</b>${sampleSentences.slice(0,5).map(s=>`<p><strong>${escapeHTML(s[0])}</strong><span>${escapeHTML(s[1])}</span></p>`).join('')}</div></section></div>`;
    app.insertAdjacentHTML('beforeend', html);
  }
  if (action === 'close-grammar') target.closest('.modal-backdrop')?.remove();
});

supabase.auth.onAuthStateChange((event, session) => {
  // INITIAL_SESSION menjadi satu-satunya pemuatan awal; SIGNED_IN / SIGNED_OUT menangani perubahan sesi.
  // Callback ditunda agar tidak menjalankan query Supabase secara re-entrant.
  if (['INITIAL_SESSION', 'SIGNED_IN', 'SIGNED_OUT'].includes(event)) {
    setTimeout(() => loadAccount(session), 0);
  }
});

// Daftarkan cache offline untuk shell dan modul statis aplikasi.
if ('serviceWorker' in navigator && window.isSecureContext) {
  navigator.serviceWorker.register('./sw.js').catch(() => {
    // Aplikasi tetap berjalan normal tanpa dukungan service worker.
  });
}

function updateConnectionStatus() {
  const indicator = document.querySelector('[data-connection-status]');
  if (indicator) indicator.hidden = navigator.onLine;
}
window.addEventListener('online', () => {
  updateConnectionStatus();
  toast('Koneksi kembali. Kamu bisa menyimpan hasil belajar.', 'success');
  if (state.user && !accountLoadedFor) setTimeout(() => loadAccount(state.session), 0);
});
window.addEventListener('offline', () => {
  updateConnectionStatus();
  toast('Kamu sedang offline. Materi tersimpan tetap bisa dibuka; penyimpanan progres membutuhkan internet.', 'info');
});
