// Field Worker State Management Store using Zustand
// Controls Offline-First flow, Biometric verification, P2P mesh coordination, and Tamper-Proof blockchain generation

import { create } from 'zustand';
import { offlineDb, OfflineBeneficiaryRecord } from '../engine/offlineDb';
import { createTamperProofBlock, verifyBlockIntegrity } from '../engine/crypto';
import { checkDuplicateFace } from '../engine/biometrics';
import { p2pMesh } from '../engine/p2pSync';
import { cloudSync, SyncState } from '../engine/cloudSync';
import { HouseholdStatus, ReliefOrganizationType, VerificationStatus } from '../types/relief';
import { isReliefBackendConfigured, reliefApi } from '../backend/reliefApi';

export interface FieldWorkerProfile {
  id: string;
  name: string;
  org: string;
  assignedBasin: string;
  deviceFingerprint: string;
  organizationType: ReliefOrganizationType;
  organizationId: string;
  teamId: string;
  areaIds: string[];
}

export const FIELD_WORKERS: FieldWorkerProfile[] = [
  {
    id: 'SCOUT-082',
    name: 'Eng. Zulfiqar Jamali',
    org: 'Pakistan Red Crescent Society (PRCS)',
    assignedBasin: 'Dadu & Mehar Basin (Sindh)',
    deviceFingerprint: 'DEV-TAB-SINDH-082',
    organizationType: 'ngo',
    organizationId: 'prcs',
    teamId: 'team-dadu-a',
    areaIds: ['dadu-mehar']
  },
  {
    id: 'SCOUT-114',
    name: 'Dr. Tariq Gorchani',
    org: 'PDMA Relief Mobile Desk',
    assignedBasin: 'Dadu & Mehar Basin (Sindh)',
    deviceFingerprint: 'DEV-TAB-PDMA-114',
    organizationType: 'government',
    organizationId: 'pdma-sindh',
    teamId: 'team-dadu-b',
    areaIds: ['dadu-mehar']
  }
];

export interface FieldLogEntry {
  id: string;
  timestamp: string;
  category: 'BIOMETRIC' | 'P2P_MESH' | 'INDEXED_DB' | 'CRYPTO_HASH' | 'CLOUD_SYNC' | 'ALERT';
  message: string;
  level: 'info' | 'success' | 'warning' | 'error';
}

interface FieldWorkerState {
  // Active Worker Session
  activeWorker: FieldWorkerProfile;
  setActiveWorker: (worker: FieldWorkerProfile) => void;

  // Network & Connectivity State
  isSimulatedOffline: boolean;
  toggleSimulatedOffline: () => void;
  syncState: SyncState;
  syncProgress: { current: number; total: number } | null;

  // Stored Records
  beneficiaries: OfflineBeneficiaryRecord[];
  visibleBeneficiaries: OfflineBeneficiaryRecord[];
  loadBeneficiariesFromDB: () => Promise<void>;

  // Anti-Duplication Alert
  duplicateAlert: {
    isDuplicate: boolean;
    confidenceScore: number;
    matchedRecord?: any;
    reason?: string;
  } | null;
  clearDuplicateAlert: () => void;

  // Console Logs
  logs: FieldLogEntry[];
  addLog: (category: FieldLogEntry['category'], message: string, level?: FieldLogEntry['level']) => void;
  clearLogs: () => void;

  // Core Actions
  registerAndDisburseAid: (params: {
    applicantName: string;
    cnicOrToken: string;
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
    biometricFaceHash: string;
    biometricVectorDigest: string;
    facePhotoDataUrl?: string;
    aidPackage: string;
  }) => Promise<{ success: boolean; recordId?: string; error?: string }>;

  triggerCloudReconciliation: () => Promise<void>;
  updateVerificationStatus: (recordId: string, householdStatus: HouseholdStatus, verificationStatus: VerificationStatus) => Promise<void>;
  verifyRecordIntegrity: (recordId: string) => Promise<{ isValid: boolean; details: string }>;
  resetTestDatabase: () => Promise<void>;
}

export const useFieldWorkerStore = create<FieldWorkerState>((set, get) => {
  // Initialize P2P event listening
  if (typeof window !== 'undefined') {
    p2pMesh.onDisbursementReceived((record) => {
      get().addLog('P2P_MESH', `⚡ P2P SYNC: Received offline disbursement from ${record.disbursedByWorkerName} (${record.disbursedByWorkerOrg}) for ${record.applicantName} in ${record.gothVillage}`, 'success');
      get().loadBeneficiariesFromDB();
    });

    cloudSync.subscribe((state, progress) => {
      set({ syncState: state, syncProgress: progress || null });
      if (state === 'completed') {
        get().addLog('CLOUD_SYNC', '✓ Background cloud sync complete. Offline records reconciled with Public Ledger.', 'success');
        get().loadBeneficiariesFromDB();
      }
    });
  }

  return {
    activeWorker: FIELD_WORKERS[0],
    setActiveWorker: (worker) => {
      const visibleBeneficiaries = get().beneficiaries.filter(record =>
        record.organizationId === worker.organizationId && record.teamId === worker.teamId
      );
      set({ activeWorker: worker, visibleBeneficiaries, duplicateAlert: null });
      get().addLog('P2P_MESH', `Switched active worker device to: ${worker.name} (${worker.org})`, 'info');
    },

    isSimulatedOffline: true, // Default to field offline condition to demonstrate resilience!
    toggleSimulatedOffline: () => {
      const next = !get().isSimulatedOffline;
      set({ isSimulatedOffline: next });
      get().addLog(
        'CLOUD_SYNC',
        next ? 'Field mode set to OFFLINE (Operating on local IndexedDB & P2P mesh).' : 'Network restored (Connected to city 4G/Cloud).',
        next ? 'warning' : 'success'
      );
      if (!next) {
        get().triggerCloudReconciliation();
      }
    },

    syncState: 'idle',
    syncProgress: null,
    beneficiaries: [],
    visibleBeneficiaries: [],
    duplicateAlert: null,
    clearDuplicateAlert: () => set({ duplicateAlert: null }),

    logs: [
      {
        id: '1',
        timestamp: new Date().toLocaleTimeString(),
        category: 'INDEXED_DB',
        message: 'IndexedDB initialized (FloodAidsFieldDB_v1). Storage quota: 2.4 GB available offline.',
        level: 'info'
      },
      {
        id: '2',
        timestamp: new Date().toLocaleTimeString(),
        category: 'P2P_MESH',
        message: 'Local mesh channel active on flood_aids_offline_mesh_v1. Listening for nearby worker packets.',
        level: 'info'
      }
    ],

    addLog: (category, message, level = 'info') => {
      const newEntry: FieldLogEntry = {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toLocaleTimeString(),
        category,
        message,
        level
      };
      set(state => ({ logs: [newEntry, ...state.logs.slice(0, 49)] }));
    },

    clearLogs: () => set({ logs: [] }),

    loadBeneficiariesFromDB: async () => {
      try {
        const records = await offlineDb.getAllBeneficiaries();
        const worker = get().activeWorker;
        set({
          beneficiaries: records,
          visibleBeneficiaries: records.filter(record =>
            record.organizationId === worker.organizationId && record.teamId === worker.teamId
          )
        });
      } catch (err) {
        console.error('Error loading beneficiaries from IndexedDB:', err);
      }
    },

    registerAndDisburseAid: async (params) => {
      const state = get();
      const worker = state.activeWorker;

      state.addLog('BIOMETRIC', `Initiating anti-duplication scan for candidate: "${params.applicantName}"`, 'info');

      // 1. Anti-Duplication Check: Query current local database (including P2P synced records)
      const existing = state.beneficiaries.map(b => ({
        recordId: b.recordId,
        beneficiaryName: b.applicantName,
        village: b.gothVillage,
        biometricFaceHash: b.biometricFaceHash,
        aidPackageReceived: b.aidPackageAllocated,
        disbursedAt: b.disbursedAt || b.createdAt,
        disbursedByWorker: `${b.disbursedByWorkerName} (${b.disbursedByWorkerOrg})`
      }));

      // Check CNIC duplicate if available
      if (params.hasPhysicalCnic && params.cnicOrToken) {
        const cnicMatch = state.beneficiaries.find(b => b.cnicOrToken === params.cnicOrToken);
        if (cnicMatch) {
          const alert = {
            isDuplicate: true,
            confidenceScore: 100,
            matchedRecord: cnicMatch,
            reason: `CNIC MATCH: This citizen already received aid (${cnicMatch.aidPackageAllocated}) from ${cnicMatch.disbursedByWorkerName} on ${new Date(cnicMatch.createdAt).toLocaleDateString()}`
          };
          set({ duplicateAlert: alert });
          state.addLog('ALERT', `🚨 DUPLICATION BLOCKED: CNIC ${params.cnicOrToken} already registered!`, 'error');
          return { success: false, error: alert.reason };
        }
      }

      // Check Biometric Face Hash duplicate
      if (params.biometricFaceHash) {
        const faceMatch = checkDuplicateFace(params.biometricFaceHash, existing);
        if (faceMatch.isDuplicate && faceMatch.matchedRecord) {
          const alert = {
            isDuplicate: true,
            confidenceScore: faceMatch.confidenceScore,
            matchedRecord: faceMatch.matchedRecord,
            reason: `BIOMETRIC FACE MATCH (${faceMatch.confidenceScore}% confidence): Person already received ${faceMatch.matchedRecord.aidPackageReceived} from ${faceMatch.matchedRecord.disbursedByWorker} in ${faceMatch.matchedRecord.village}`
          };
          set({ duplicateAlert: alert });
          state.addLog('ALERT', `🚨 DUPLICATION BLOCKED: Biometric Face Hash matched existing beneficiary with ${faceMatch.confidenceScore}% confidence!`, 'error');
          return { success: false, error: alert.reason };
        }
      }

      // 2. Cryptographic Block Chain Generation (Anti-Corruption)
      const blockIndex = state.beneficiaries.length + 1;
      const recordId = `PK-REC-${Math.floor(100000 + Math.random() * 900000)}`;
      const previousBlock = state.beneficiaries[state.beneficiaries.length - 1];
      const previousBlockHash = previousBlock?.blockHash || '0000000000000000000000000000000000000000000000000000000000000000';

      state.addLog('CRYPTO_HASH', `Creating tamper-proof SHA-256 block #${blockIndex}...`, 'info');

      const tamperBlock = await createTamperProofBlock(
        blockIndex,
        recordId,
        worker.id,
        worker.org,
        { lat: 26.7341, lng: 67.7795, accuracyMeters: 4 },
        {
          name: params.applicantName,
          cnicOrToken: params.cnicOrToken,
          familySize: params.familyMembers,
          village: params.gothVillage,
          tehsil: params.tehsil,
          district: params.district,
          needs: params.immediateNeeds
        },
        params.biometricFaceHash,
        params.aidPackage,
        previousBlockHash
      );

      state.addLog('CRYPTO_HASH', `✓ Generated Block Hash: ${tamperBlock.blockHash.substring(0, 18)}...`, 'success');

      // 3. Store locally in IndexedDB
      const now = new Date().toISOString();
      const record: OfflineBeneficiaryRecord = {
        recordId,
        applicantName: params.applicantName,
        cnicOrToken: params.cnicOrToken,
        hasPhysicalCnic: params.hasPhysicalCnic,
        phone: params.phone,
        province: params.province,
        district: params.district,
        tehsil: params.tehsil,
        gothVillage: params.gothVillage,
        familyMembers: params.familyMembers,
        childrenCount: params.childrenCount,
        elderlyCount: params.elderlyCount,
        livestockCount: params.livestockCount,
        damageLevel: params.damageLevel,
        immediateNeeds: params.immediateNeeds,
        biometricFaceHash: params.biometricFaceHash,
        biometricVectorDigest: params.biometricVectorDigest,
        facePhotoDataUrl: params.facePhotoDataUrl,
        aidPackageAllocated: params.aidPackage,
        aidDisbursed: true,
        disbursedAt: now,
        disbursedByWorkerId: worker.id,
        disbursedByWorkerName: worker.name,
        disbursedByWorkerOrg: worker.org,
        blockIndex,
        blockHash: tamperBlock.blockHash,
        previousBlockHash,
        syncStatus: 'pending_cloud_sync',
        createdAt: now,
        updatedAt: now,
        organizationType: worker.organizationType,
        organizationId: worker.organizationId,
        teamId: worker.teamId,
        areaId: `${params.district.toLowerCase()}-${params.tehsil.toLowerCase()}`,
        householdStatus: 'unknown',
        verificationStatus: 'pending'
      };

      await offlineDb.saveBeneficiary(record);
      await offlineDb.saveTamperBlock(tamperBlock);
      state.addLog('INDEXED_DB', `✓ Saved record ${recordId} to IndexedDB store. Sync status: ${record.syncStatus}`, 'success');

      // 4. P2P Mesh Broadcast (Local Anti-Duplication Relay)
      p2pMesh.broadcastDisbursement(record);
      state.addLog('P2P_MESH', `📡 Broadcasted packet to local village mesh via BroadcastChannel / P2P transport.`, 'info');

      // Reload database
      await state.loadBeneficiariesFromDB();
      if (!state.isSimulatedOffline) {
        await state.triggerCloudReconciliation();
      }

      return { success: true, recordId };
    },

    triggerCloudReconciliation: async () => {
      const state = get();
      if (state.isSimulatedOffline) {
        state.addLog('CLOUD_SYNC', 'Cannot sync with cloud: Device is currently in Simulated Offline Field Mode.', 'warning');
        return;
      }

      state.addLog('CLOUD_SYNC', 'Starting background cloud reconciliation with Public Ledger...', 'info');
      try {
        const result = await cloudSync.triggerAutoSync();
        state.addLog('CLOUD_SYNC', `✓ Successfully uploaded & verified ${result.syncedCount} records to cloud ledger.`, 'success');
        await state.loadBeneficiariesFromDB();
      } catch (err: any) {
        state.addLog('CLOUD_SYNC', `Sync failed: ${err.message}`, 'error');
      }
    },

    updateVerificationStatus: async (recordId, householdStatus, verificationStatus) => {
      const record = get().beneficiaries.find(item => item.recordId === recordId);
      if (!record) return;

      await offlineDb.saveBeneficiary({
        ...record,
        householdStatus,
        verificationStatus,
        updatedAt: new Date().toISOString()
      });

      if (isReliefBackendConfigured) {
        await reliefApi.updateHouseholdStatus(recordId, householdStatus, verificationStatus);
      }

      await get().loadBeneficiariesFromDB();
    },

    verifyRecordIntegrity: async (recordId: string) => {
      const record = get().beneficiaries.find(b => b.recordId === recordId);
      if (!record) return { isValid: false, details: 'Record not found in database' };

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

      return {
        isValid: integrity.isValid,
        details: integrity.isValid
          ? `✓ 100% Cryptographically Verified! Calculated SHA-256 (${integrity.computedHash.substring(0, 16)}...) matches stored blockchain hash exactly.`
          : `⚠️ CORRUPTION DETECTED: Computed hash does not match stored block hash!`
      };
    },

    resetTestDatabase: async () => {
      await offlineDb.clearAll();
      set({ beneficiaries: [], duplicateAlert: null });
        set({ beneficiaries: [], visibleBeneficiaries: [], duplicateAlert: null });
      get().addLog('INDEXED_DB', 'IndexedDB tables cleared for fresh demonstration.', 'info');
    }
  };
});
