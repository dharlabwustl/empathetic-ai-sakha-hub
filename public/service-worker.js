
// PREPZR Service Worker
const CACHE_NAME = 'prepzr-app-v1';

// Assets to cache for offline usage
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/img/app-icon-192.png',
  '/img/app-icon-512.png',
  '/css/main.css',
  '/js/main.js'
];

// Install service worker and cache all essential assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  // Force activation of new service worker if an update is available
  self.skipWaiting();
});

// Activate service worker and clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Handle fetch requests with a network-first strategy
self.addEventListener('fetch', event => {
  // Skip requests to browser-sync endpoints in development
  if (event.request.url.includes('/browser-sync/')) {
    return;
  }

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // If online, return the fresh content and update cache
        const responseClone = response.clone();
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseClone);
          });
        return response;
      })
      .catch(() => {
        // If offline, look for content in cache
        return caches.match(event.request)
          .then(cachedResponse => {
            // Return cached content or offline page as fallback
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // For HTML document requests, serve offline page
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/offline.html');
            }
            
            // Return a default response for other assets
            return new Response(
              'Network error, resource unavailable offline',
              {
                status: 408,
                headers: { 'Content-Type': 'text/plain' }
              }
            );
          });
      })
  );
});

// Handle background sync for offline actions
self.addEventListener('sync', function(event) {
  if (event.tag === 'syncMoodUpdate') {
    event.waitUntil(syncMoodData());
  }
});

// Sync mood data when coming back online
async function syncMoodData() {
  try {
    // Check for any pending mood updates
    const pendingMoodUpdates = await localforage.getItem('pendingMoodUpdates');
    
    if (pendingMoodUpdates && pendingMoodUpdates.length) {
      // Process each pending update
      for (const update of pendingMoodUpdates) {
        // Send to server
        await fetch('/api/mood-tracking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(update)
        });
      }
      
      // Clear pending updates after successful sync
      await localforage.setItem('pendingMoodUpdates', []);
      
      // Notify any open clients that sync is complete
      const clients = await self.clients.matchAll();
      clients.forEach(client => {
        client.postMessage({
          type: 'SYNC_COMPLETE',
          message: 'Mood data synchronized successfully.'
        });
      });
    }
    
    return true;
  } catch (error) {
    console.error('Sync failed:', error);
    return false;
  }
}

// Listen for push notifications
self.addEventListener('push', event => {
  const data = event.data.json();
  
  const title = data.title || 'PREPZR Update';
  const options = {
    body: data.body || 'New update available',
    icon: '/img/app-icon-192.png',
    badge: '/img/notification-badge.png',
    data: {
      url: data.url || '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});
