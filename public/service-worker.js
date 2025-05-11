// Service Worker for PREPZR app

const CACHE_NAME = 'prepzr-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/img/app-icon-192.png',
  '/img/app-icon-512.png',
  '/img/logo.png',
  '/img/grid.svg',
  // Add essential CSS and JS files
  '/assets/index.css',
  '/assets/index.js'
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // Skip API requests
  if (event.request.url.includes('/api/')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response from cache
        if (response) {
          return response;
        }
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        // Make network request and cache the response
        return fetch(fetchRequest).then(
          (response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            // Open cache and store response
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          }
        ).catch(() => {
          // If fetch fails, return offline page for HTML requests
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/offline.html');
          }
        });
      })
  );
});

// Handle push notifications
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/img/app-icon-192.png',
      badge: '/img/notification-badge.png',
      data: {
        url: data.url || '/'
      }
    };
    
    event.waitUntil(
      self.registration.showNotification('PREPZR', options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      const url = event.notification.data?.url || '/dashboard/student';
      
      // Check if a window is already open and navigate to it
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      
      // Otherwise, open a new window
      return clients.openWindow(url);
    })
  );
});

// Handle sync events for offline updates
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-mood-logs') {
    event.waitUntil(syncMoodLogs());
  }
  
  if (event.tag === 'sync-study-progress') {
    event.waitUntil(syncStudyProgress());
  }
});

// Function to sync mood logs
async function syncMoodLogs() {
  try {
    // Get pending mood logs from IndexedDB
    const pendingLogs = await getPendingMoodLogs();
    
    if (pendingLogs.length === 0) {
      return;
    }
    
    // Send each log to server
    await Promise.all(pendingLogs.map(async (log) => {
      const response = await fetch('/api/mood-logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(log)
      });
      
      if (response.ok) {
        await markMoodLogSynced(log.id);
      }
    }));
  } catch (error) {
    console.error('Error syncing mood logs:', error);
  }
}

// Function to sync study progress
async function syncStudyProgress() {
  // Similar implementation as syncMoodLogs
  console.log('Syncing study progress...');
}

// Placeholder functions for IndexedDB operations
async function getPendingMoodLogs() {
  // In a real implementation, this would get data from IndexedDB
  return [];
}

async function markMoodLogSynced(id) {
  // In a real implementation, this would update IndexedDB
  console.log(`Marked mood log ${id} as synced`);
}
