import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, CheckCircle2, ShieldCheck, Upload, AlertCircle, Scan } from 'lucide-react';
import { generateFaceHashFromDataUrl, BiometricProfile } from '../engine/biometrics';

interface BiometricCaptureProps {
  onCaptureComplete: (profile: BiometricProfile, photoDataUrl: string) => void;
  onClear: () => void;
  existingProfile?: BiometricProfile | null;
}

// Sample photographic faces for one-click testing in case webcam is blocked in sandboxes
const DEMO_FACES = [
  {
    name: 'Rural Beneficiary 1 (Mai Jameela)',
    url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" fill="%23c28e67"/><circle cx="80" cy="65" r="35" fill="%238c5836"/><ellipse cx="80" cy="130" rx="55" ry="35" fill="%232b5042"/><circle cx="70" cy="60" r="4" fill="%231a0e05"/><circle cx="90" cy="60" r="4" fill="%231a0e05"/><path d="M 72 80 Q 80 88 88 80" stroke="%231a0e05" stroke-width="2.5" fill="none"/></svg>'
  },
  {
    name: 'Rural Beneficiary 2 (Ghulam Rasool)',
    url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" fill="%239c6b45"/><circle cx="80" cy="65" r="36" fill="%236e4020"/><ellipse cx="80" cy="130" rx="50" ry="35" fill="%230f3a5d"/><circle cx="68" cy="60" r="4" fill="%23000"/><circle cx="92" cy="60" r="4" fill="%23000"/><path d="M 65 75 Q 80 82 95 75" stroke="%23000" stroke-width="3" fill="none"/></svg>'
  }
];

export const BiometricCapture: React.FC<BiometricCaptureProps> = ({
  onCaptureComplete,
  onClear,
  existingProfile
}) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [profile, setProfile] = useState<BiometricProfile | null>(existingProfile || null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera device access not available in this browser');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 480 }, height: { ideal: 480 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err: any) {
      console.warn('Webcam stream unavailable:', err);
      setCameraError(err.message || 'Webcam permission denied. You can select a test photo or upload an image below.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const captureFrame = async () => {
    if (!videoRef.current) return;
    setProcessing(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 240;
      canvas.height = 240;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas unavailable');

      ctx.drawImage(videoRef.current, 0, 0, 240, 240);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

      await processCapturedImage(dataUrl);
      stopCamera();
    } catch (err: any) {
      setCameraError('Failed to capture frame: ' + err.message);
    } finally {
      setProcessing(false);
    }
  };

  const processCapturedImage = async (dataUrl: string) => {
    setProcessing(true);
    try {
      const bioProfile = await generateFaceHashFromDataUrl(dataUrl);
      setCapturedPhoto(dataUrl);
      setProfile(bioProfile);
      onCaptureComplete(bioProfile, dataUrl);
    } catch (err: any) {
      setCameraError('Biometric processing error: ' + err.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const result = event.target?.result as string;
      if (result) {
        await processCapturedImage(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setCapturedPhoto(null);
    setProfile(null);
    setCameraError(null);
    stopCamera();
    onClear();
  };

  return (
    <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-4 sm:p-5 space-y-4">
      
      {/* Biometric Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2">
          <Scan className="w-4 h-4 text-[#0F3A5D]" />
          <div>
            <div className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Biometric Face ID Fallback (شناختی چہرہ اسکین)
            </div>
            <div className="text-[11px] text-stone-500">
              For flood victims who lost CNIC in the water. Generates offline 64-bit perceptual hash.
            </div>
          </div>
        </div>

        {profile && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
            <CheckCircle2 className="w-3.5 h-3.5" /> Verified
          </span>
        )}
      </div>

      {/* Main View Area */}
      {!capturedPhoto && !cameraActive && (
        <div className="space-y-3">
          <div className="border-2 border-dashed border-stone-300 rounded-xl p-6 text-center space-y-3 bg-white">
            <div className="w-12 h-12 rounded-full bg-stone-100 text-[#0F3A5D] mx-auto flex items-center justify-center">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-stone-900">
                Capture Beneficiary Facial Geometry
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">
                Takes 2 seconds offline. No internet required.
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={startCamera}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0F3A5D] hover:bg-[#0a273f] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Launch Tablet Camera</span>
              </button>

              <label className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photo</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* Quick Demo Faces (For testing duplicate detection without real camera) */}
          <div className="bg-stone-100/70 p-3 rounded-xl border border-stone-200/80 space-y-2">
            <div className="text-[11px] font-semibold text-stone-600">
              ⚡ Instant Field Test Avatars (Click to load sample biometric profile):
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_FACES.map((demo, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => processCapturedImage(demo.url)}
                  className="p-2 text-left bg-white hover:bg-stone-50 rounded-lg border border-stone-200 text-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <img src={demo.url} alt={demo.name} className="w-8 h-8 rounded-full border border-stone-300 shrink-0" />
                  <span className="truncate text-[11px] font-medium text-stone-800">{demo.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Live Camera View */}
      {cameraActive && (
        <div className="relative rounded-2xl overflow-hidden bg-black aspect-square max-w-xs mx-auto shadow-md">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          
          {/* Target alignment crosshairs */}
          <div className="absolute inset-8 border-2 border-dashed border-amber-300/80 rounded-full pointer-events-none flex items-center justify-center">
            <span className="text-[10px] text-amber-200 font-mono bg-black/60 px-2 py-0.5 rounded">Align Face</span>
          </div>

          {/* Camera controls */}
          <div className="absolute bottom-3 inset-x-3 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={stopCamera}
              className="px-3 py-1.5 text-xs font-medium text-stone-200 bg-black/60 hover:bg-black/80 rounded-lg backdrop-blur-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={processing}
              onClick={captureFrame}
              className="px-4 py-1.5 text-xs font-bold text-[#0F3A5D] bg-amber-300 hover:bg-amber-400 rounded-lg shadow-md cursor-pointer transition-colors"
            >
              {processing ? 'Hashing...' : 'Capture & Hash'}
            </button>
          </div>
        </div>
      )}

      {/* Error notification if webcam fails */}
      {cameraError && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>{cameraError}</span>
        </div>
      )}

      {/* Successful Biometric Result Card */}
      {capturedPhoto && profile && (
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={capturedPhoto}
              alt="Beneficiary Face"
              className="w-16 h-16 rounded-xl object-cover border-2 border-[#0F3A5D]/20 shadow-xs"
            />
            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900">Unique Biometric Face ID</span>
                <span className="text-[10px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  Score: {profile.qualityScore}% Quality
                </span>
              </div>
              <div className="text-[11px] font-mono text-stone-600 truncate bg-stone-100 px-2 py-1 rounded">
                {profile.pHash}
              </div>
              <div className="text-[10px] text-stone-400 font-mono truncate">
                SHA-256 Digest: {profile.vectorDigest.substring(0, 24)}...
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-emerald-800 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Ready for anti-duplication mesh comparison
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="text-stone-500 hover:text-stone-900 text-[11px] underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Rescan Face
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
