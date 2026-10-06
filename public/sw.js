// FloodAids Service Worker — Background Sync & Offline PWA Caching
const CACHE_NAME = 'floodaids-field-cache-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Background Sync Event Listener
// Triggered by the browser when network connectivity is restored even if user closed tab
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-flood-ledger') {
    event.waitUntil(syncPendingLedgerRecords());
  }
});

async function syncPendingLedgerRecords() {
  console.log('[ServiceWorker] Background sync event triggered. Reconciling verified records with cloud ledger...');
  // Post message to client windows
  const clients = await self.clients.matchAll();
  clients.forEach(client => {
    client.postMessage({
      type: 'BACKGROUND_SYNC_TRIGGERED',
      timestamp: new Date().toISOString()
    });
  });
}
