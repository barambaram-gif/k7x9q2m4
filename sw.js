const V='tf-v5-4';
const FILES=['./','./index.html','./manifest.webmanifest','./apple-touch-icon.png','./icon-192.png','./icon-512.png',
'./fonts/saira-latin-400-normal.woff2','./fonts/saira-latin-500-normal.woff2','./fonts/saira-latin-600-normal.woff2','./fonts/saira-latin-700-normal.woff2',
'./fonts/saira-condensed-latin-400-normal.woff2','./fonts/saira-condensed-latin-500-normal.woff2','./fonts/saira-condensed-latin-600-normal.woff2','./fonts/saira-condensed-latin-700-normal.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.origin!==location.origin)return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(e.request,cp));return res;}).catch(()=>caches.match('./index.html'))));
});
