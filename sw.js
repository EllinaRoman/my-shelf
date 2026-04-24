const CACHE_NAME = 'my-shelf-v1';
const ASSETS_TO_CACHE = [
  '/my-shelf/',
  '/my-shelf/index.html',
  '/my-shelf/css/style.css',
  '/my-shelf/manifest.json',
  '/my-shelf/img/icon-192.png',
  '/my-shelf/img/icon-512.png'
];


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});


self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});