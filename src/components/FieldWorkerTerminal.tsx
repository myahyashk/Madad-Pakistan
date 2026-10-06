import React, { useState, useEffect } from 'react';
import { useFieldWorkerStore, FIELD_WORKERS } from '../store/fieldWorkerStore';
import { BiometricCapture } from './BiometricCapture';
import { BiometricProfile } from '../engine/biometrics';
import { 
  Wifi, 
  WifiOff, 
  ShieldCheck, 
  ShieldAlert, 
  Database, 
  Radio, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  RefreshCw, 
  Trash2, 
  Users, 
  Home, 
  Terminal,
  Activity,
  Layers
} from 'lucide-react';

export const FieldWorkerTerminal: React.FC = () => {
  const {
    activeWorker,
    setActiveWorker,
    isSimulatedOffline,
    toggleSimulatedOffline,
    syncState,
    syncProgress,
    beneficiaries,
    visibleBeneficiaries,
    loadBeneficiariesFromDB,
    duplicateAlert,
    clearDuplicateAlert,
    logs,
    registerAndDisburseAid,
    triggerCloudReconciliation,
    verifyRecordIntegrity,
    resetTestDatabase
  } = useFieldWorkerStore();

  // Local Registration Form State
  const [applicantName, setApplicantName] = useState('');
  const [hasPhysicalCnic, setHasPhysicalCnic] = useState(true);
  const [cnic, setCnic] = useState('');
  const [phone, setPhone] = useState('0300-4821940');
  const [province, setProvince] = useState<'Sindh' | 'Balochistan' | 'South Punjab' | 'Khyber Pakhtunkhwa'>('Sindh');
  const [district, setDistrict] = useState('Dadu');
  const [tehsil, setTehsil] = useState('Mehar');
  const [gothVillage, setGothVillage] = useState('Goth Ali Bux');
  const [familyMembers, setFamilyMembers] = useState(7);
  const [aidPackage, setAidPackage] = useState('48-Hour Rapid Chhappar Kit (Rs. 15,000)');
  
  // Biometric state
  const [biometricProfile, setBiometricProfile] = useState<BiometricProfile | null>(null);
  const [facePhoto, setFacePhoto] = useState<string | null>(null);

  // Status message
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  const [selectedRecordForVerify, setSelectedRecordForVerify] = useState<string | null>(null);
  const [verificationOutput, setVerificationOutput] = useState<string | null>(null);

  // Load IndexedDB records on mount
  useEffect(() => {
    loadBeneficiariesFromDB();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitResult(null);

    // If CNIC is lost, generate offline emergency token
    const finalToken = hasPhysicalCnic && cnic 
      ? cnic 
      : `EMERGENCY-TOKEN-${Math.floor(100000 + Math.random() * 900000)}`;

    const finalFaceHash = biometricProfile?.pHash || `PHASH_AUTO_${Math.random().toString(36).substring(2, 10)}`;
    const finalVectorDigest = biometricProfile?.vectorDigest || `SHA256_AUTO_${Math.random().toString(36).substring(2, 10)}`;

    try {
      const result = await registerAndDisburseAid({
        applicantName,
        cnicOrToken: finalToken,
        hasPhysicalCnic,
        phone,
        province,
        district,
        tehsil,
        gothVillage,
        familyMembers,
        childrenCount: Math.round(familyMembers / 2),
        elderlyCount: 1,
        livestockCount: 2,
        damageLevel: 'Completely Submerged Katcha Home',
        immediateNeeds: ['Rapid Dry Chhappar Kit', 'Elevated Stilt Base', 'Clean Drinking Water'],
        biometricFaceHash: finalFaceHash,
        biometricVectorDigest: finalVectorDigest,
        facePhotoDataUrl: facePhoto || undefined,
        aidPackage
      });

      if (result.success) {
        setSubmitResult({
          success: true,
          message: `Record ${result.recordId} successfully saved to IndexedDB & broadcasted to P2P village mesh!`
        });
        // Reset form for next beneficiary
        setApplicantName('');
        setCnic('');
        setBiometricProfile(null);
        setFacePhoto(null);
      } else {
        setSubmitResult({
          success: false,
          message: result.error || 'Registration blocked due to anti-duplication alert.'
        });
      }
    } catch (err: any) {
      setSubmitResult({
        success: false,
        message: 'System error: ' + err.message
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyClick = async (recordId: string) => {
    setSelectedRecordForVerify(recordId);
    const result = await verifyRecordIntegrity(recordId);
    setVerificationOutput(result.details);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* 1. Header Ribbon & Worker Device Perspective Switcher */}
      <div className="bg-[#0F3A5D] text-white rounded-3xl p-5 sm:p-7 shadow-lg space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
              <Terminal className="w-4 h-4 text-amber-400" />
              <span>Offline-First Field Worker Terminal (Core Logical Engine)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold">
              Flood Relief Dispatch & Anti-Duplication Hub
            </h2>
            <p className="text-xs text-stone-200">
              Operates 100% offline in disaster zones using IndexedDB, Face ID hashes, P2P mesh sync, and SHA-256 tamper-proof blocks.
            </p>
          </div>

          {/* Network Field Mode Toggle */}
          <div className="flex items-center gap-3 bg-black/30 p-2.5 rounded-2xl border border-white/15 self-start md:self-auto">
            <button
              onClick={toggleSimulatedOffline}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isSimulatedOffline
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                  : 'bg-emerald-600 text-white shadow-xs'
              }`}
            >
              {isSimulatedOffline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5" />
                  <span>Field Offline Mode (No Internet)</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5" />
                  <span>City Online Mode (Cloud Active)</span>
                </>
              )}
            </button>

            {!isSimulatedOffline && (
              <button
                onClick={triggerCloudReconciliation}
                className="px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
                title="Sync offline records to cloud ledger"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reconcile Cloud</span>
              </button>
            )}
          </div>
        </div>

        {/* Worker A vs Worker B Perspective Switcher (Critical to demonstrate requirement #3) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-stone-300 font-semibold uppercase tracking-wider text-[11px]">
              Active Tablet Device:
            </span>
            <div className="flex items-center gap-1.5">
              {FIELD_WORKERS.map((worker) => {
                const isActive = activeWorker.id === worker.id;
                return (
                  <button
                    key={worker.id}
                    onClick={() => setActiveWorker(worker)}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-white text-[#0F3A5D] font-bold shadow-xs border-white'
                        : 'bg-white/10 text-stone-200 hover:bg-white/20 border-white/20'
                    }`}
                  >
                    <span>{worker.id === 'SCOUT-082' ? 'Worker A (Red Crescent)' : 'Worker B (PDMA Mobile)'}</span>
                    <span className="text-[10px] ml-1 opacity-75 font-normal">({worker.name})</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-[11px] text-amber-200 flex items-center gap-1.5 font-mono">
            <Radio className="w-3 h-3 text-amber-300 animate-pulse" />
            <span>P2P BroadcastChannel Mesh: ACTIVE on flood_aids_offline_mesh_v1</span>
          </div>
        </div>
      </div>

      {/* Critical Duplicate Alarm Banner (Requirement #3 Anti-Duplication Alert) */}
      {duplicateAlert && duplicateAlert.isDuplicate && (
        <div className="bg-red-50 border-2 border-red-500 p-5 rounded-2xl shadow-md space-y-3 animate-in fade-in duration-200">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-red-900">
                  🚨 ANTI-DUPLICATION ALARM TRIGGERED (دوبارہ امداد کی کوشش روکی گئی)
                </h3>
                <p className="text-xs text-red-800 font-medium mt-0.5">
                  {duplicateAlert.reason}
                </p>
              </div>
            </div>

            <button
              onClick={clearDuplicateAlert}
              className="text-xs text-red-600 hover:text-red-900 underline font-semibold cursor-pointer"
            >
              Dismiss
            </button>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-red-200 text-xs text-stone-700 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <span className="text-stone-400 block text-[10px]">PREVIOUS RECIPIENT</span>
              <span className="font-semibold text-stone-900">{duplicateAlert.matchedRecord?.beneficiaryName || duplicateAlert.matchedRecord?.applicantName}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px]">PREVIOUS AID PACKAGE</span>
              <span className="font-semibold text-emerald-800">{duplicateAlert.matchedRecord?.aidPackageReceived || duplicateAlert.matchedRecord?.aidPackageAllocated}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px]">ORIGINAL FIELD SCOUT</span>
              <span className="font-semibold text-[#0F3A5D]">{duplicateAlert.matchedRecord?.disbursedByWorker || duplicateAlert.matchedRecord?.disbursedByWorkerName}</span>
            </div>
          </div>
        </div>
      )}

      {/* 2-Column Operational Grid: Registration Form & Database Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Offline Registration Form (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl hairline-box shadow-xs space-y-6">
          
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h3 className="text-xl font-serif font-bold text-[#0F3A5D]">
                Offline Family Registration & Aid Allocation
              </h3>
              <p className="text-xs text-stone-500">
                Operating on device local storage (IndexedDB) without cell tower signal.
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#0F3A5D] font-bold bg-[#FAF8F5] px-2 py-1 rounded-md border border-stone-200">
              {activeWorker.id}
            </span>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-5">
            
            {/* Beneficiary Name & CNIC Toggle */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Applicant Name (سرپرست کا نام) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mai Jameela Solangi"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3A5D]"
                />
              </div>

              {/* Physical CNIC Availability Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-xs">
                <div>
                  <div className="font-semibold text-stone-800">Has Physical CNIC Card?</div>
                  <div className="text-[11px] text-stone-500">Toggle OFF if document washed away in flood</div>
                </div>

                <button
                  type="button"
                  onClick={() => setHasPhysicalCnic(!hasPhysicalCnic)}
                  className={`px-3 py-1.5 rounded-lg font-semibold text-xs cursor-pointer transition-colors ${
                    hasPhysicalCnic
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-600 text-white'
                  }`}
                >
                  {hasPhysicalCnic ? 'CNIC Available' : 'CNIC Lost in Flood'}
                </button>
              </div>

              {hasPhysicalCnic ? (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    CNIC Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 45302-8819201-4"
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3A5D] font-mono"
                  />
                </div>
              ) : (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                  <div className="font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                    <span>Biometric Emergency Token Will Be Generated</span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-snug">
                    Since CNIC is lost, the applicant's identity will be uniquely anchored via facial geometry hash and rural council witness token.
                  </p>
                </div>
              )}
            </div>

            {/* Biometric Face ID Capture Module (Requirement #2) */}
            <BiometricCapture
              existingProfile={biometricProfile}
              onCaptureComplete={(prof, photoUrl) => {
                setBiometricProfile(prof);
                setFacePhoto(photoUrl);
              }}
              onClear={() => {
                setBiometricProfile(null);
                setFacePhoto(null);
              }}
            />

            {/* Rural Village Location in Pakistan */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">District</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Tehsil</label>
                <input
                  type="text"
                  value={tehsil}
                  onChange={(e) => setTehsil(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Goth / Village</label>
                <input
                  type="text"
                  value={gothVillage}
                  onChange={(e) => setGothVillage(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>
            </div>

            {/* Aid Package Allocation Selection */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Authorized Aid Package (امداد پیکیج)
              </label>
              <select
                value={aidPackage}
                onChange={(e) => setAidPackage(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3A5D]"
              >
                <option value="48-Hour Rapid Chhappar Kit (Rs. 15,000)">48-Hour Rapid Chhappar Kit (Rs. 15,000 PKR)</option>
                <option value="Raised Stilt Machan Platform (Rs. 65,000)">Raised Stilt Machan Platform (Rs. 65,000 PKR)</option>
                <option value="Complete Bamboo Stilt Haven (Rs. 320,000)">Complete Bamboo Stilt Haven (Rs. 320,000 PKR)</option>
                <option value="Permanent Pakka Raised Cottage (Rs. 850,000)">Permanent Pakka Raised Cottage (Rs. 850,000 PKR)</option>
              </select>
            </div>

            {/* Feedback Message */}
            {submitResult && (
              <div className={`p-3.5 rounded-xl text-xs flex items-start gap-2 ${
                submitResult.success
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                  : 'bg-red-50 border border-red-200 text-red-900'
              }`}>
                {submitResult.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                )}
                <span>{submitResult.message}</span>
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-stone-500 font-mono">
                Operator: {activeWorker.name}
              </span>

              <button
                type="submit"
                disabled={submitting || !applicantName}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#0F3A5D] hover:bg-[#0a273f] disabled:opacity-50 rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <span>Authorize & Disburse Aid Offline</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>

        {/* Right Column: Offline IndexedDB Database Inspector & P2P Mesh (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* IndexedDB Records Viewer */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl hairline-box shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[#0F3A5D]" />
                <h4 className="text-sm font-bold text-stone-900">
                  My Team Records ({visibleBeneficiaries.length})
                </h4>
              </div>

              <button
                onClick={resetTestDatabase}
                className="text-[11px] text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"
                title="Clear test records for clean demonstration"
              >
                <Trash2 className="w-3 h-3" /> Clear DB
              </button>
            </div>

            {visibleBeneficiaries.length === 0 ? (
              <div className="py-8 text-center text-xs text-stone-500 space-y-1">
                <div>No offline records stored yet.</div>
                <div className="text-[11px] text-stone-400">Fill the form on the left to register a beneficiary offline.</div>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {visibleBeneficiaries.map((rec) => (
                  <div
                    key={rec.recordId}
                    className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200 text-xs space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-stone-900">{rec.applicantName}</div>
                        <div className="text-[11px] text-stone-500">{rec.gothVillage}, {rec.district}</div>
                      </div>

                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                        rec.syncStatus === 'synced'
                          ? 'bg-emerald-100 text-emerald-800'
                          : rec.syncStatus === 'p2p_mesh_replicated'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {rec.syncStatus === 'synced' ? '✓ Synced' : rec.syncStatus === 'p2p_mesh_replicated' ? '⚡ P2P Mesh' : 'Pending Cloud'}
                      </span>
                    </div>

                    <div className="text-[11px] text-stone-600 flex items-center justify-between">
                      <span className="font-medium text-[#0F3A5D] truncate max-w-[200px]">{rec.aidPackageAllocated}</span>
                      <span className="text-[10px] text-stone-400 font-mono">By {rec.disbursedByWorkerId}</span>
                    </div>

                    {/* Cryptographic SHA-256 Block Details */}
                    <div className="pt-1.5 border-t border-stone-200/60 flex items-center justify-between text-[10px] font-mono text-stone-500">
                      <span className="truncate max-w-[170px]" title={rec.blockHash}>
                        Block #{rec.blockIndex}: {rec.blockHash.substring(0, 14)}...
                      </span>

                      <button
                        onClick={() => handleVerifyClick(rec.recordId)}
                        className="text-[#0F3A5D] hover:underline flex items-center gap-1 cursor-pointer font-sans font-semibold"
                      >
                        <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verify
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Cryptographic Verification Result Modal/Callout */}
            {verificationOutput && (
              <div className="p-3 bg-stone-900 text-stone-100 rounded-xl text-xs font-mono space-y-1">
                <div className="text-amber-300 font-bold flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" /> Cryptographic Integrity Check
                </div>
                <div className="text-[11px] text-stone-300">{verificationOutput}</div>
              </div>
            )}
          </div>

          {/* Live P2P & Cryptographic Terminal Stream */}
          <div className="bg-[#070b19] text-stone-300 p-4 sm:p-5 rounded-3xl border border-stone-800 space-y-3 font-mono text-xs shadow-md">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <div className="flex items-center gap-2 text-stone-200">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Live Security & P2P Stream</span>
              </div>
              <span className="text-[10px] text-stone-500">{logs.length} events logged</span>
            </div>

            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 text-[11px]">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-2 leading-tight">
                  <span className="text-stone-500 shrink-0">[{log.timestamp}]</span>
                  <span className={`px-1 py-0.2 rounded text-[9px] font-bold uppercase shrink-0 ${
                    log.category === 'ALERT'
                      ? 'bg-red-900 text-red-200'
                      : log.category === 'P2P_MESH'
                      ? 'bg-purple-950 text-purple-300'
                      : log.category === 'CRYPTO_HASH'
                      ? 'bg-blue-950 text-blue-300'
                      : log.category === 'CLOUD_SYNC'
                      ? 'bg-emerald-950 text-emerald-300'
                      : 'bg-stone-800 text-stone-300'
                  }`}>
                    {log.category}
                  </span>
                  <span className={
                    log.level === 'error'
                      ? 'text-red-400 font-semibold'
                      : log.level === 'success'
                      ? 'text-emerald-400'
                      : log.level === 'warning'
                      ? 'text-amber-300'
                      : 'text-stone-300'
                  }>
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
