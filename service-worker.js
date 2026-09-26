// Sirf app ka dhaancha cache hota he - Supabase ka DATA kabhi cache nahi (privacy + taaza data).
const CACHE='sandip-dash-b204bf3ec4';
const SHELL=['./','index.html','manifest-ecom.json','ecom-192.png','ecom-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin!==location.origin||e.request.method!=='GET')return;
  e.respondWith(fetch(e.request,{cache:e.request.mode==='navigate'||/\.(html|json)(\?|$)|\/$/.test(u.pathname)?'no-store':'default'}).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r;})
    .catch(()=>caches.match(e.request).then(m=>m||caches.match('index.html'))));
});
