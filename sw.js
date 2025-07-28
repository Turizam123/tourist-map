
const CACHE_NAME = 'tourist-map-pwa-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './sw.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// Инсталиране
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Активиране
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// Обработка на заявки
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// Фонова синхронизация (примерен запис)
self.addEventListener('sync', function(event) {
  if (event.tag === 'sync-location') {
    event.waitUntil(syncLocation());
  }
});

async function syncLocation() {
  console.log('Фонова синхронизация на локация...');
}
