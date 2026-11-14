// Service worker mínimo: permite instalar la web como app. No guarda datos de jugadores.
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>self.clients.claim());
self.addEventListener('fetch',()=>{});
