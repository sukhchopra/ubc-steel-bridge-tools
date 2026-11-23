// Offline support: pages load from the network when there is one (so updates arrive), and from this cache when there isn't.
const CACHE='ubc-seq-tools-v1';
const FILES=['./','index.html','builder/','builder/index.html','studio/','studio/index.html','vendor/three.min.js','vendor/OrbitControls.js','icons/logo.png','icons/icon-192.png','icons/icon-512.png','manifest.webmanifest'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{ const r=e.request; if(r.method!=='GET') return;
  const url=new URL(r.url); const same=url.origin===location.origin;
  if(same&&(r.mode==='navigate'||url.pathname.endsWith('.html')||url.pathname.endsWith('/'))){
    e.respondWith(fetch(r).then(res=>{ const copy=res.clone(); caches.open(CACHE).then(c=>c.put(r,copy)); return res; }).catch(()=>caches.match(r).then(m=>m||caches.match('index.html')))); return; }
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{ if(res.ok&&(same||/fonts\.(googleapis|gstatic)\.com/.test(url.host))){ const copy=res.clone(); caches.open(CACHE).then(c=>c.put(r,copy)); } return res; })));
});
