// Service worker: guarda solo la «carcasa» de la app (HTML, librerías, logos) para que abra sin cobertura.
// No guarda datos de jugadores: esos solo se quedan en el móvil si la persona activa «Usar sin cobertura» en su perfil.
const C='kzapp-v42';
const SHELL=['./','index.html','config.js','manifest.webmanifest','logo.png','logo_blanco.png','icon-192.png','icon-512.png','lib/jspdf.umd.min.js'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(K=>Promise.all(K.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  // nunca se guardan las llamadas a Firebase (datos)
  if(/firestore\.googleapis|identitytoolkit|securetoken|googleapis\.com\/(?!.*firebasejs)/.test(u.href))return;
  const shell=u.origin===location.origin||/gstatic\.com\/firebasejs\//.test(u.href)||/fonts\.(googleapis|gstatic)\.com/.test(u.href);if(!shell)return;
  if(r.mode==='navigate'||u.pathname.endsWith('/index.html')||u.pathname.endsWith('/')){
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put('index.html',cp));return res}).catch(()=>caches.match('index.html')));return}
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res})))});
