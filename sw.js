// Mon Coffre — service worker : garde l'application disponible hors connexion.
// Changer VERSION à chaque mise à jour des fichiers pour que l'iPhone récupère la nouvelle version.
const VERSION = 'moncoffre-v7';
const FILES = ['./', './index.html', './manifest.webmanifest', './icons/icon-180.png', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION)
    .then(cache => cache.addAll(FILES.map(f => new Request(f, { cache: 'reload' }))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Réseau d'abord, en redemandant toujours au serveur la dernière version (pas de copie de 10 min),
// sinon la copie gardée sur l'iPhone (hors connexion).
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(request, { cache: 'no-cache' }).then(response => {
      if (response.ok) { const copy = response.clone(); caches.open(VERSION).then(c => c.put(request, copy)); }
      return response;
    }).catch(() => caches.match(request, { ignoreSearch: true }).then(r => r || caches.match('./index.html')))
  );
});
