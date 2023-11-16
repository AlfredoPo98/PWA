const CACHE_NAME = 'v1_Alfredito_bch_pwa'

//Agregar los archivos y carpetas
var urlIsToCache = [
    './',
    'main.js',
    'js/scrollIt.min.js',
    'sw.js',
    'js/wow.min.js',
    'css/animate.css',
    'images/android-icon-36x36.png',
    'images/android-icon-48x48.png',
    'images/android-icon-72x72.png',
    'images/android-icon-96x96.png',
    'images/android-icon-144x144.png',
    'images/android-icon-192x192.png',
    'images/fondo.jpg'
]

//Instala el service worker 
self.addEventListener('install', e=> {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlIsToCache)
            .then(() => {
                self.skipWaiting()
            })

            .catch(err => {
                console.log('No se registro el cache', err);
            })
        })
    )
})

self.addEventListener('activate', e=>{
    const cacheWhiteList = [CACHE_NAME]
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName =>{
                    if(cacheWhiteList.indexOf(cacheName) === -1){
                        //Borrar elementos que no se necesitan
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {self.clients.claim();})
    );
})

self.addEventListener
('fetch', e =>{
    e.respondWith(
        caches.match(e.request)
        .then(res=>{
            if(res){
                return res;
            }
            return fetch(e.request);
        })
    );
});



