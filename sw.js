const CACHE = 'legacybuilt-dual-tracker-v1';
const FILES = ['./', './index.html', './manifest.json'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(key => key !== CACHE ? caches.delete(key) : null))).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request).catch(() => caches.match('./index.html'))));
});
