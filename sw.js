const CACHE_NAME = 'zenairi-learn-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/styles.css',
  './assets/zeni-mark.svg',
  './assets/zeni-avatar.webp',
  './assets/zeni-mascot.webp',
  './assets/fox.svg',
  './assets/pwa-icon-192.png',
  './assets/pwa-icon-512.png',
  './src/app.js',
  './src/dictionary.js',
  './src/supabase.js',
  './docs/Kamus_Bahasa_Zenairi.pdf'
];
const SUPABASE_SDK_URL = 'https://esm.sh/@supabase/supabase-js@2.119.0';

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(APP_SHELL.map(async path => {
      try { await cache.add(path); } catch { /* Satu aset gagal tidak membatalkan instalasi cache. */ }
    }));
    try { await cache.add(SUPABASE_SDK_URL); } catch { /* Login butuh koneksi bila SDK belum tercache. */ }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('zenairi-learn-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;
  const isSupabaseSdk = url.hostname === 'esm.sh';
  if (!sameOrigin && !isSupabaseSdk) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        const cache = await caches.open(CACHE_NAME);
        cache.put('./index.html', fresh.clone()).catch(() => {});
        return fresh;
      } catch {
        return (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) {
      // Perbarui aset di belakang layar saat jaringan tersedia.
      fetch(request).then(async response => {
        if (response && response.ok && response.type !== 'opaque') {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, response.clone());
        }
      }).catch(() => {});
      return cached;
    }
    try {
      const response = await fetch(request);
      if (response && response.ok && response.type !== 'opaque') {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    } catch {
      return Response.error();
    }
  })());
});
