// Resilient IndexedDB Offline Storage Engine for Remote Flood Relief Operations

import { TamperProofBlock } from './crypto';
import { HouseholdStatus, ReliefOrganizationType, VerificationStatus } from '../types/relief';

export interface OfflineBeneficiaryRecord {
  recordId: string;
  applicantName: string;
  cnicOrToken: string; // Real CNIC or Biometric Emergency Token
  hasPhysicalCnic: boolean;
  phone: string;
  province: 'Sindh' | 'Balochistan' | 'South Punjab' | 'Khyber Pakhtunkhwa';
  district: string;
  tehsil: string;
  gothVillage: string;
  familyMembers: number;
  childrenCount: number;
  elderlyCount: number;
  livestockCount: number;
  damageLevel: string;
  immediateNeeds: string[];
  
  // Biometric details
  biometricFaceHash: string;
  biometricVectorDigest: string;
  facePhotoDataUrl?: string; // Stored offline on field tablet
  
  // Aid disbursement status
  aidPackageAllocated: string;
  aidDisbursed: boolean;
  disbursedAt?: string;
  disbursedByWorkerId: string;
  disbursedByWorkerName: string;
  disbursedByWorkerOrg: string;
  
  // Cryptographic Tamper-Proof Block
  blockIndex: number;
  blockHash: string;
  previousBlockHash: string;
  
  // Sync state
  syncStatus: 'synced' | 'pending_cloud_sync' | 'p2p_mesh_replicated';
  createdAt: string;
  updatedAt: string;

  organizationType?: ReliefOrganizationType;
  organizationId?: string;
  teamId?: string;
  areaId?: string;
  householdStatus?: HouseholdStatus;
  verificationStatus?: VerificationStatus;
}

const DB_NAME = 'FloodAidsFieldDB_v1';
const DB_VERSION = 1;

class OfflineDatabase {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private async getDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        reject(new Error('IndexedDB is not supported on this environment'));
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Store 1: Beneficiary Registrations & Allocations
        if (!db.objectStoreNames.contains('beneficiaries')) {
          const store = db.createObjectStore('beneficiaries', { keyPath: 'recordId' });
          store.createIndex('faceHash', 'biometricFaceHash', { unique: false });
          store.createIndex('cnic', 'cnicOrToken', { unique: false });
          store.createIndex('village', 'gothVillage', { unique: false });
          store.createIndex('syncStatus', 'syncStatus', { unique: false });
          store.createIndex('blockHash', 'blockHash', { unique: true });
        }

        // Store 2: Immutable Tamper-Proof Blocks (Cryptographic Chain)
        if (!db.objectStoreNames.contains('tamperBlocks')) {
          const blockStore = db.createObjectStore('tamperBlocks', { keyPath: 'blockIndex' });
          blockStore.createIndex('blockHash', 'blockHash', { unique: true });
          blockStore.createIndex('recordId', 'recordId', { unique: false });
        }

        // Store 3: Background Cloud Sync Queue
        if (!db.objectStoreNames.contains('syncQueue')) {
          const queueStore = db.createObjectStore('syncQueue', { keyPath: 'queueId', autoIncrement: true });
          queueStore.createIndex('status', 'status', { unique: false });
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });

    return this.dbPromise;
  }

  /**
   * Save or update beneficiary record in offline IndexedDB
   */
  public async saveBeneficiary(record: OfflineBeneficiaryRecord): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(['beneficiaries', 'syncQueue'], 'readwrite');
      const store = tx.objectStore('beneficiaries');
      const queueStore = tx.objectStore('syncQueue');

      store.put(record);

      // Enqueue for background sync if not yet cloud synced
      if (record.syncStatus === 'pending_cloud_sync') {
        queueStore.add({
          recordId: record.recordId,
          type: 'BENEFICIARY_DISBURSEMENT',
          payload: record,
          timestamp: new Date().toISOString(),
          status: 'pending'
        });
      }

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  /**
   * Retrieve all offline beneficiaries
   */
  public async getAllBeneficiaries(): Promise<OfflineBeneficiaryRecord[]> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('beneficiaries', 'readonly');
      const store = tx.objectStore('beneficiaries');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Look up beneficiary by biometric face hash
   */
  public async findByFaceHash(faceHash: string): Promise<OfflineBeneficiaryRecord | null> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('beneficiaries', 'readonly');
      const store = tx.objectStore('beneficiaries');
      const index = store.index('faceHash');
      const request = index.get(faceHash);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Look up beneficiary by CNIC / Token
   */
  public async findByCNIC(cnic: string): Promise<OfflineBeneficiaryRecord | null> {
    if (!cnic || cnic.includes('TOKEN')) return null;
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('beneficiaries', 'readonly');
      const store = tx.objectStore('beneficiaries');
      const index = store.index('cnic');
      const request = index.get(cnic);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Save immutable tamper-proof cryptographic block
   */
  public async saveTamperBlock(block: TamperProofBlock): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('tamperBlocks', 'readwrite');
      const store = tx.objectStore('tamperBlocks');
      store.put(block);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  /**
   * Get all cryptographic blocks in chain
   */
  public async getAllTamperBlocks(): Promise<TamperProofBlock[]> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('tamperBlocks', 'readonly');
      const store = tx.objectStore('tamperBlocks');
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Mark records as synced with Cloud Ledger
   */
  public async markRecordsAsSynced(recordIds: string[]): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(['beneficiaries', 'syncQueue'], 'readwrite');
      const store = tx.objectStore('beneficiaries');
      const queue = tx.objectStore('syncQueue');

      for (const id of recordIds) {
        const getReq = store.get(id);
        getReq.onsuccess = () => {
          if (getReq.result) {
            const updated = { ...getReq.result, syncStatus: 'synced', updatedAt: new Date().toISOString() };
            store.put(updated);
          }
        };
      }

      // Clear pending queue items
      const queueReq = queue.getAll();
      queueReq.onsuccess = () => {
        const items = queueReq.result || [];
        for (const item of items) {
          if (recordIds.includes(item.recordId)) {
            queue.delete(item.queueId);
          }
        }
      };

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  /**
   * Clear all offline database contents (for clean testing)
   */
  public async clearAll(): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(['beneficiaries', 'tamperBlocks', 'syncQueue'], 'readwrite');
      tx.objectStore('beneficiaries').clear();
      tx.objectStore('tamperBlocks').clear();
      tx.objectStore('syncQueue').clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }
}

export const offlineDb = new OfflineDatabase();
