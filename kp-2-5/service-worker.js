const CACHE_NAME = "matrix-chat-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./styles/global.css",
  "./login/login.html",
  "./login/login.js",
  "./sidebar/sidebar.html",
  "./sidebar/sidebar.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(cacheNames.map((cache) => {
        if (cache !== CACHE_NAME) return caches.delete(cache);
      }))
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)));
});
