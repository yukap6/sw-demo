// this event callback is executing before sw installed
this.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('v2').then((cache) => {
      return cache.addAll([
        '/sw-test/',
        '/sw-test/style.css',
      ]);
    })
  );
});

// fetch intercept, then we can cached
this.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res !== undefined) {
        return res;
      }

      // chrome extension file can't to be cached
      if (/^chrome-extension:/.test(e.request.url)) {
        return fetch(e.request).then((response) => {
          return response;
        });
      }

      // not cached files to be chached
      return fetch(e.request).then(response => {
        return caches.open('v2').then(cache => {
          cache.put(e.request, response.clone());
          return response;
        });
      });
    }).catch((error) => {
      return caches.match('/sw-test/offline.png');
    })
  );
});

// execute after registration succeeded only once
this.addEventListener('activate', (e) => {
  var cacheWhitelist = ['v1'];
  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
this.addEventListener('message', (e) => {
  console.log('message callback');
});
this.addEventListener('sync', (e) => {
  console.log('sync callback');
});
this.addEventListener('push', (e) => {
  console.log('push callback');
});
