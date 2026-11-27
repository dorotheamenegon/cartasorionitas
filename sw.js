const CACHE_NAME = 'dom-orione-pwa-v19';
const APP_BASE = new URL('./', self.registration.scope);
const INDEX_URL = new URL('index.html', APP_BASE).href;
const CORE_URLS = [
  INDEX_URL,
  new URL('manifest.webmanifest', APP_BASE).href,
  new URL('offline.html', APP_BASE).href,
  new URL('icons/icon.svg', APP_BASE).href,
  new URL('icons/icon-192.png', APP_BASE).href,
  new URL('icons/icon-512.png', APP_BASE).href,
  new URL('icons/icon-512-maskable.png', APP_BASE).href,
  new URL('icons/apple-touch-icon.png', APP_BASE).href
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(key => key.startsWith('dom-orione-pwa-') && key !== CACHE_NAME)
        .map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(INDEX_URL, copy));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(INDEX_URL);
          if (cached) return cached;
          return caches.match(new URL('offline.html', APP_BASE).href);
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response && response.ok && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
