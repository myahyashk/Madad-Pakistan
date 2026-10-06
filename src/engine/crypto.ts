// Tamper-Proof Cryptographic Engine (SHA-256 Merkle Chain for Anti-Corruption)

export interface TamperProofBlock {
  blockIndex: number;
  recordId: string;
  timestamp: string;
  workerId: string;
  workerOrg: string;
  gpsLocation: {
    lat: number;
    lng: number;
    accuracyMeters: number;
  };
  beneficiary: {
    name: string;
    cnicOrToken: string;
    familySize: number;
    village: string;
    tehsil: string;
    district: string;
    needs: string[];
  };
  biometricFaceHash: string;
  aidPackage: string;
  previousBlockHash: string;
  blockHash: string;
}

/**
 * Computes standard SHA-256 hex string using native Web Crypto API
 */
export async function computeSHA256(dataString: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(dataString);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Creates an immutable cryptographic block linking to the previous block hash
 */
export async function createTamperProofBlock(
  blockIndex: number,
  recordId: string,
  workerId: string,
  workerOrg: string,
  gpsLocation: { lat: number; lng: number; accuracyMeters: number },
  beneficiary: {
    name: string;
    cnicOrToken: string;
    familySize: number;
    village: string;
    tehsil: string;
    district: string;
    needs: string[];
  },
  biometricFaceHash: string,
  aidPackage: string,
  previousBlockHash: string = '0000000000000000000000000000000000000000000000000000000000000000'
): Promise<TamperProofBlock> {
  const timestamp = new Date().toISOString();

  // Canonical string representation to ensure exact hash reproduction
  const canonicalPayload = JSON.stringify({
    blockIndex,
    recordId,
    timestamp,
    workerId,
    workerOrg,
    gpsLocation,
    beneficiary,
    biometricFaceHash,
    aidPackage,
    previousBlockHash
  });

  const blockHash = await computeSHA256(canonicalPayload);

  return {
    blockIndex,
    recordId,
    timestamp,
    workerId,
    workerOrg,
    gpsLocation,
    beneficiary,
    biometricFaceHash,
    aidPackage,
    previousBlockHash,
    blockHash
  };
}

/**
 * Verifies if a block has been tampered with by recalculating its SHA-256
 */
export async function verifyBlockIntegrity(block: TamperProofBlock): Promise<{
  isValid: boolean;
  computedHash: string;
  expectedHash: string;
}> {
  const canonicalPayload = JSON.stringify({
    blockIndex: block.blockIndex,
    recordId: block.recordId,
    timestamp: block.timestamp,
    workerId: block.workerId,
    workerOrg: block.workerOrg,
    gpsLocation: block.gpsLocation,
    beneficiary: block.beneficiary,
    biometricFaceHash: block.biometricFaceHash,
    aidPackage: block.aidPackage,
    previousBlockHash: block.previousBlockHash
  });

  const computedHash = await computeSHA256(canonicalPayload);
  return {
    isValid: computedHash === block.blockHash,
    computedHash,
    expectedHash: block.blockHash
  };
}
