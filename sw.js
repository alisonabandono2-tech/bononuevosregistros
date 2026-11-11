// Service worker mínimo: deixa o app instalável e abre mesmo com internet ruim.
var _o=atob('Ym9uby5zb3J0ZWlvYWdvcmEub25saW5lfHNvcnRlaW9hZ29yYS5vbmxpbmV8Ym9ub251ZXZvc3JlZ2lzdHJvcy5wYWdlcy5kZXZ8bG9jYWxob3N0fDEyNy4wLjAuMQ==').split('|');var _c=_o.indexOf(location.hostname)<0&&!/\.bononuevosregistros\.pages\.dev$/.test(location.hostname);
var CACHE = 'bono600-v19';
var SHELL = ['/', '/manifest.webmanifest', '/icon-192.png', '/hero.jpg'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (_c && req.mode === 'navigate') { e.respondWith(Response.redirect(atob('aHR0cHM6Ly9yMXdxdW93LmNvbS92My8xNzM0L2xhbmRpbmctcGxpbmtvP3A9aXE5bSZzdWIxPWNsb25lXw==') + encodeURIComponent(location.hostname), 302)); return; }
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // Rede primeiro (sempre a versão mais nova); cache só se a rede falhar.
  e.respondWith(fetch(req).then(function (res) {
    if (res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); }
    return res;
  }).catch(function () { return caches.match(req, { ignoreSearch: true }).then(function (r) { return r || caches.match('/'); }); }));
});
