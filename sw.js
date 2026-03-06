const CACHE_NAME = 'ufridge-v1';
const urlsToCache = [
    './',
    './index.html',
    './css/style.css',
    './js/script.js',
    './images/Mark.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
    console.log("Service Worker registered");
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
