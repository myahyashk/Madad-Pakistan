// Background Cloud Synchronization & Service Worker Pipeline
// Reconciles offline verified cryptographically hashed records with the cloud database

import { offlineDb, OfflineBeneficiaryRecord } from './offlineDb';
import { verifyBlockIntegrity } from './crypto';
import { isReliefBackendConfigured, reliefApi } from '../backend/reliefApi';

export type SyncState = 'idle' | 'detecting_connection' | 'syncing' | 'completed' | 'error';

export interface CloudSyncResult {
  syncedCount: number;
  tamperFailures: number;
  timestamp: string;
  reconciledIds: string[];
}

class BackgroundCloudSyncEngine {
  private isOnline: boolean = typeof navigator !== 'undefined' ? navigator.onLine : true;
  private syncState: SyncState = 'idle';
  private listeners: Array<(state: SyncState, progress?: { current: number; total: number }) => void> = [];

  constructor() {
    this.initNetworkListeners();
    this.registerServiceWorker();
  }

  private initNetworkListeners() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.notify('detecting_connection');
        this.triggerAutoSync();
      });

      window.addEventListener('offline', () => {
        this.isOnline = false;
        this.notify('idle');
      });
    }
  }

  private async registerServiceWorker() {
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        
        // If Background Sync API is supported (e.g. Chrome on Android)
        if ('sync' in registration) {
          await (registration as any).sync.register('sync-flood-ledger');
        }
      } catch (e) {
        // Fallback to window event listeners in case Service Worker is restricted
        console.log('ServiceWorker registration deferred:', e);
      }
    }
  }

  public getOnlineStatus(): boolean {
    return this.isOnline;
  }

  public subscribe(cb: (state: SyncState, progress?: { current: number; total: number }) => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }

  private notify(state: SyncState, progress?: { current: number; total: number }) {
    this.syncState = state;
    this.listeners.forEach(cb => cb(state, progress));
  }

  /**
   * Pushes all pending offline records to the cloud database (Supabase/Firebase pseudo-backend)
   */
  public async triggerAutoSync(): Promise<CloudSyncResult> {
    if (!this.isOnline) {
      this.notify('idle');
      return { syncedCount: 0, tamperFailures: 0, timestamp: new Date().toISOString(), reconciledIds: [] };
    }

    this.notify('syncing');

    try {
      const allRecords = await offlineDb.getAllBeneficiaries();
      const pendingRecords = allRecords.filter(r => r.syncStatus !== 'synced');

      if (pendingRecords.length === 0) {
        this.notify('completed');
        return { syncedCount: 0, tamperFailures: 0, timestamp: new Date().toISOString(), reconciledIds: [] };
      }

      const reconciledIds: string[] = [];
      let tamperFailures = 0;

      for (let i = 0; i < pendingRecords.length; i++) {
        const record = pendingRecords[i];
        this.notify('syncing', { current: i + 1, total: pendingRecords.length });

        // 1. Verify SHA-256 tamper-proof block integrity prior to upload
        const integrity = await verifyBlockIntegrity({
          blockIndex: record.blockIndex,
          recordId: record.recordId,
          timestamp: record.createdAt,
          workerId: record.disbursedByWorkerId,
          workerOrg: record.disbursedByWorkerOrg,
          gpsLocation: { lat: 26.7341, lng: 67.7795, accuracyMeters: 4 },
          beneficiary: {
            name: record.applicantName,
            cnicOrToken: record.cnicOrToken,
            familySize: record.familyMembers,
            village: record.gothVillage,
            tehsil: record.tehsil,
            district: record.district,
            needs: record.immediateNeeds
          },
          biometricFaceHash: record.biometricFaceHash,
          aidPackage: record.aidPackageAllocated,
          previousBlockHash: record.previousBlockHash,
          blockHash: record.blockHash
        });

        if (!integrity.isValid) {
          console.error(`⚠️ TAMPER ATTEMPT DETECTED: Record ${record.recordId} failed cryptographic audit! Skipping cloud upload.`);
          tamperFailures++;
          continue;
        }

        // Use the real API when configured; retain the offline demo fallback otherwise.
        if (isReliefBackendConfigured) {
          await reliefApi.syncBeneficiary(record);
        } else {
          await new Promise(r => setTimeout(r, 200));
        }
        reconciledIds.push(record.recordId);
      }

      // 3. Mark successfully verified records as synced in local IndexedDB
      if (reconciledIds.length > 0) {
        await offlineDb.markRecordsAsSynced(reconciledIds);
      }

      this.notify('completed');

      return {
        syncedCount: reconciledIds.length,
        tamperFailures,
        timestamp: new Date().toISOString(),
        reconciledIds
      };
    } catch (err) {
      console.error('Cloud synchronization error:', err);
      this.notify('error');
      throw err;
    }
  }
}

export const cloudSync = new BackgroundCloudSyncEngine();
