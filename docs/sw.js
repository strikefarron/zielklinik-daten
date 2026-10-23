/* Zielklinik-Matrix – Offline-Speicher (automatisch erzeugt) */
const CACHE = 'zkm-f36e9eb8e7cb';
const FILES = ["./","index.html","manifest.webmanifest","icon-180.png","icon-192.png","icon-512.png","icon-maskable-512.png"];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('zkm-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Nur eigene Dateien werden gespeichert. Routing, Team-Sync usw. gehen immer direkt ins Netz.
// Strategie: sofort aus dem Speicher starten, im Hintergrund aktualisieren.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const key = req.mode === 'navigate' ? 'index.html' : req;
  event.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(key, { ignoreSearch: true }).then((hit) => {
        const fresh = fetch(req, { cache: 'no-cache' })
          .then((res) => {
            if (res && res.ok && res.type === 'basic') cache.put(key, res.clone());
            return res;
          })
          .catch(() => hit);
        return hit || fresh;
      })
    )
  );
});
