const staticCache="Static-cache-v1";
const dynamicCache="Dynamic-cache-v1";

const assets = [
    "/",
    "public/index.html",
    "public/js/app.js",
    "public/js/ui.js",
    "public/js/materialize.min.js",
    "public/css/materialize.min.css",
    "public/css/app.css",
    "public/img/task.png",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
  ];

//Limit cache size
const limitCacheSize=(name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if(keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

self.addEventListener("install", function (event) {
    console.log(`SW: Event fired: ${event.type}`);
    event.waitUntil(
      caches.open("static").then(function (cache) {
        console.log("SW: Precaching App shell");
        cache.addAll(assets);
      })
    );
  });
  
  self.addEventListener("activate", function (event) {
    event.waitUntil(
      catches.keys().then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !==staticCache)
            .map((key)=>caches.delete(key))
        );
      })
    );
  });
  
  self.addEventListener("fetch", function (event) {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          return (
            response ||
            fetch(event.request).then((fetchRes) => {
              return caches.open(dynamicCache).then((cache) => {
              cache.put(event.request.url, fetchRes.clone());
              return fetchRes;
            });
          })
        );
        })
        .catch(() => caches.match("pages.fallback.html"))
  );
      });