/* ============================================================
   Fasahar Al'umma — Service Worker
   Offline-first PWA for community digital literacy
   ============================================================ */

const CACHE_VERSION = "fasahar-alumma-v1";
const RUNTIME_CACHE = "fasahar-alumma-runtime-v1";

/* ---------- Files to pre-cache on install ---------- */
const PRE_CACHE = [
  "/",
  "/index.html",
  "/home.html",
  "/module.html",
  "/lesson.html",
  "/exam.html",
  "/opportunities.html",
  "/certificate.html",
  "/about.html",
  "/app.js",
  "/offline.html",
  "/css/style.css",

  "/data.js",
  "/storage.js",

  "/manifest.json",

  "/images",

  "/images/logo.png",
];

/* ============================================================
   INSTALL — pre-cache the app shell
   ============================================================ */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => {
        return cache.addAll(PRE_CACHE);
      })
      .then(() => self.skipWaiting()),
  );
});

/* ============================================================
   ACTIVATE — clean up old caches
   ============================================================ */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== CACHE_VERSION && key !== RUNTIME_CACHE)
            .map((key) => caches.delete(key)),
        );
      })
      .then(() => self.clients.claim()),
  );
});

/* ============================================================
   FETCH — serve from cache, fall back to network, then offline
   ============================================================ */
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== "GET") return;

  // Skip cross-origin requests we don't control
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    // YouTube embeds, external opportunity links, etc — just pass through
    return;
  }

  // ---- HTML navigation requests: network first, cache fallback, offline page ----
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache a fresh copy
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            return cached || caches.match("/offline.html");
          });
        }),
    );
    return;
  }

  // ---- Static assets (CSS, JS, icons, manifest): cache first ----
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request)
        .then((response) => {
          // Don't cache bad responses
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => {
          // If it's an image, fall back to a placeholder if available
          if (request.destination === "image") {
            return caches.match("/icons/icon-192.png");
          }
          return new Response("", { status: 503, statusText: "Offline" });
        });
    }),
  );
});

/* ============================================================
   MESSAGE — allow pages to trigger cache updates or skip waiting
   ============================================================ */
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data === "CLEAR_CACHE") {
    caches.keys().then((keys) => {
      keys.forEach((key) => caches.delete(key));
    });
  }
});
