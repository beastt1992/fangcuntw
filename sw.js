/* 方寸 — service worker
   整個 app（含 3MB 字庫）第一次載入就快取起來，之後完全離線可用。 */
const CACHE = "fangcun-v162-glyph-size";   /* 換版本號 → 舊快取會被清掉，使用者不用重整兩次 */
const CORE_ASSETS = ["./", "./index.html", "./manifest.webmanifest"];
const OPTIONAL_ASSETS = [
  "./icon.svg", "./icon-192.png", "./icon-512.png",
  "./icon-mask-192.png", "./icon-mask-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(async c => {
        await c.addAll(CORE_ASSETS);
        await Promise.allSettled(OPTIONAL_ASSETS.map(asset => c.add(asset)));
      })
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  const url = new URL(req.url);
  const isPage = req.mode === "navigate" || url.pathname.endsWith("/") ||
                 url.pathname.endsWith("/index.html");

  if (isPage) {
    /* app 本體走「網路優先」：一上線就拿到新版，離線才退回快取 */
    e.respondWith(
      fetch(req).then(res => {
        if (res && res.ok) { const c = res.clone(); caches.open(CACHE).then(k => k.put(req, c)); }
        return res;
      }).catch(() => caches.match(req).then(hit => hit || caches.match("./index.html")))
    );
    return;
  }
  /* 圖示等靜態檔走「快取優先」，開啟比較快 */
  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        if (res && res.ok) { const c = res.clone(); caches.open(CACHE).then(k => k.put(req, c)); }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
