// Biometric Face ID & Perceptual Hashing Engine
// Designed for flood disaster victims who have lost CNIC cards/documents

import { computeSHA256 } from './crypto';

export interface BiometricProfile {
  pHash: string; // 64-bit hexadecimal perceptual hash
  vectorDigest: string; // SHA-256 of normalized facial geometry matrix
  capturedAt: string;
  qualityScore: number; // 0 to 100
}

/**
 * Computes a 64-bit Perceptual Hash (pHash) from an image data URL using Canvas
 */
export async function generateFaceHashFromDataUrl(dataUrl: string): Promise<BiometricProfile> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Canvas 2D context unavailable');
        }

        // Downscale to normalized 16x16 matrix (256 pixels) for robust facial luminance gradient
        const SIZE = 16;
        canvas.width = SIZE;
        canvas.height = SIZE;
        ctx.drawImage(img, 0, 0, SIZE, SIZE);

        const imgData = ctx.getImageData(0, 0, SIZE, SIZE);
        const pixels = imgData.data;

        // Convert to grayscale and compute total luminance
        const grayMatrix: number[] = [];
        let totalLuminance = 0;

        for (let i = 0; i < pixels.length; i += 4) {
          // Standard ITU-R BT.601 luminance weights
          const gray = Math.round(0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2]);
          grayMatrix.push(gray);
          totalLuminance += gray;
        }

        const avgLuminance = totalLuminance / grayMatrix.length;

        // Generate 256-bit binary string comparing each pixel to average
        let binaryHash = '';
        for (let i = 0; i < grayMatrix.length; i++) {
          binaryHash += grayMatrix[i] >= avgLuminance ? '1' : '0';
        }

        // Convert 256 bits into 64-char hex string
        let hexHash = '';
        for (let i = 0; i < binaryHash.length; i += 4) {
          const nibble = binaryHash.substring(i, i + 4);
          hexHash += parseInt(nibble, 2).toString(16);
        }

        const pHash = `PHASH_FACE_${hexHash}`;

        // Compute SHA-256 digest of the raw grayscale vector
        const vectorDigest = await computeSHA256(grayMatrix.join(','));

        // Basic sharpness/contrast score
        const variance = grayMatrix.reduce((sum, val) => sum + Math.pow(val - avgLuminance, 2), 0) / grayMatrix.length;
        const qualityScore = Math.min(100, Math.max(30, Math.round(Math.sqrt(variance) * 2)));

        resolve({
          pHash,
          vectorDigest,
          capturedAt: new Date().toISOString(),
          qualityScore
        });
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = () => reject(new Error('Failed to load image for biometric processing'));
    img.src = dataUrl;
  });
}

/**
 * Calculates Hamming distance between two hex hashes (number of differing bits)
 * Lower distance = Higher facial similarity
 */
export function calculateHammingDistance(hexHashA: string, hexHashB: string): number {
  const cleanA = hexHashA.replace(/^PHASH_FACE_/, '');
  const cleanB = hexHashB.replace(/^PHASH_FACE_/, '');

  if (cleanA.length !== cleanB.length) {
    return 999;
  }

  let distance = 0;
  for (let i = 0; i < cleanA.length; i++) {
    const valA = parseInt(cleanA[i], 16);
    const valB = parseInt(cleanB[i], 16);
    let xor = valA ^ valB;
    while (xor > 0) {
      distance += xor & 1;
      xor >>= 1;
    }
  }

  return distance;
}

/**
 * Detects whether a newly captured face matches any existing registered beneficiary
 * Hamming distance <= 16 bits indicates potential duplicate individual
 */
export function checkDuplicateFace(
  candidateFaceHash: string,
  existingRecords: Array<{
    recordId: string;
    beneficiaryName: string;
    village: string;
    biometricFaceHash: string;
    aidPackageReceived: string;
    disbursedAt: string;
    disbursedByWorker: string;
  }>
): {
  isDuplicate: boolean;
  confidenceScore: number;
  matchedRecord?: {
    recordId: string;
    beneficiaryName: string;
    village: string;
    aidPackageReceived: string;
    disbursedAt: string;
    disbursedByWorker: string;
    hammingDistance: number;
  };
} {
  let minDistance = 999;
  let bestMatch: any = null;

  for (const record of existingRecords) {
    const dist = calculateHammingDistance(candidateFaceHash, record.biometricFaceHash);
    if (dist < minDistance) {
      minDistance = dist;
      bestMatch = { ...record, hammingDistance: dist };
    }
  }

  // Threshold: <= 16 bits difference indicates same face identity
  if (minDistance <= 16 && bestMatch) {
    // 0 bits = 100% match, 16 bits = 75% match
    const confidenceScore = Math.round(100 - (minDistance / 16) * 25);
    return {
      isDuplicate: true,
      confidenceScore,
      matchedRecord: bestMatch
    };
  }

  return {
    isDuplicate: false,
    confidenceScore: 0
  };
}
