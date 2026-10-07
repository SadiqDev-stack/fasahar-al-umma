/* ============================================================
   Fasahar Al'umma — Service Worker
   Offline-first PWA for community digital literacy
   ============================================================

   CACHE VERSIONS:
   Bump CACHE_VERSION when you change any cached file so browsers
   fetch the new copies on next load.

   VERSION HISTORY:
   v1 — initial
   v2 — added audio, images, profile page
   v3 — added download endpoints, files folder check, final polish
   ============================================================ */

const CACHE_VERSION = "fasahar-alumma-v4";
const RUNTIME_CACHE = "fasahar-alumma-runtime-v4";

/* ============================================================
   PRE-CACHE — every file the app needs to work offline
   ============================================================ */
const PRE_CACHE = [
  /* Root + pages */
  "/",
  "/index.html",
  "/home.html",
  "/module.html",
  "/lesson.html",
  "/exam.html",
  "/opportunities.html",
  "/certificate.html",
  "/profile.html",
  "/about.html",
  "/offline.html",

  /* Styles */
  "/css/style.css",

  /* Scripts */
  "/data.js",
  "/storage.js",
  "/app.js",

  /* PWA manifest */
  "/manifest.json",

  /* Logo + icons */
  "/images/logo.png",

  /* Audio — UI feedback sounds */
  "/audio/tap.mp3",
  "/audio/correct.mp3",
  "/audio/incorrect.mp3",
  "/audio/unlock.mp3",
  "/audio/success.mp3",
  "/audio/levelup.mp3",
  "/audio/page.mp3",
  "/audio/notify.mp3",
  "/audio/offline.mp3"
];

/* ============================================================
   INSTALL — pre-cache the app shell
   ============================================================ */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => {
        /* Use individual adds so a single 404 doesn't break install */
        return Promise.all(
          PRE_CACHE.map((url) =>
            cache.add(url).catch((err) => {
              console.warn("[SW] Failed to cache:", url, err);
            })
          )
        );
      })
      .then(() => self.skipWaiting())
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
            .map((key) => caches.delete(key))
        );
      })
      .then(() => self.clients.claim())
  );
});

/* ============================================================
   FETCH — serve from cache, fall back to network, then offline
   ============================================================ */
self.addEventListener("fetch", (event) => {
  const { request } = event;

  /* Only handle GET */
  if (request.method !== "GET") return;

  /* Skip cross-origin (YouTube embeds, Font Awesome CDN, external links) */
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  /* ---- Skip the download endpoints from caching ----
     APK/IPA files are large and shouldn't be auto-cached. */
  if (url.pathname.startsWith("/files/")) {
    return;
  }

  /* ---- HTML navigation: network-first, then cache, then offline page ---- */
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            return cached || caches.match("/offline.html");
          });
        })
    );
    return;
  }

  /* ---- Static assets: cache-first, then network ---- */
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request)
        .then((response) => {
          /* Don't cache bad responses */
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }

          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => {
          /* Fallback for missing images */
          if (request.destination === "image") {
            return caches.match("/images/logo.png");
          }
          return new Response("", { status: 503, statusText: "Offline" });
        });
    })
  );
});

/* ============================================================
   MESSAGE — allow pages to trigger updates
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