import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { SHELTER_MODELS, RELIEF_ZONES, FAMILY_STORIES } from '../data/floodaidsData';
import { 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  ShieldAlert,
  ChevronRight,
  Cpu,
  Database,
  Scan,
  Radio,
  Lock,
  WifiOff
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenDonate: (amount?: number) => void;
  onOpenAidRequest: () => void;
  showDonationActions?: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenDonate,
  onOpenAidRequest,
  showDonationActions = true
}) => {
  const criticalZones = RELIEF_ZONES.slice(0, 3);
  const featuredStory = FAMILY_STORIES[0];

  return (
    <div className="space-y-14 sm:space-y-20 pb-16">
      
      {/* 1. Curated Hero Section with PKR Rehousing Calculator */}
      <HeroSection
        onOpenDonate={onOpenDonate}
        onOpenAidRequest={onOpenAidRequest}
        showDonationActions={showDonationActions}
      />

      {/* 2. Core Logical Engine Teaser: Field Worker App & Anti-Duplication */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0F3A5D] via-[#0b273e] to-[#071725] text-white rounded-3xl p-6 sm:p-9 shadow-lg border border-[#0F3A5D]/60 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Critical Humanitarian Solution Architecture</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                Solving Trust Collapse, Duplication & Zero-Internet in Flood Basins
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 font-sans max-w-2xl leading-relaxed">
                When flood waters rise, cell towers drop and paper IDs wash away. Our Field Worker Engine equips relief scouts with offline-first biometric hashing, peer-to-peer anti-duplication mesh, and cryptographic audit chains.
              </p>
            </div>

            <button
              onClick={() => onNavigate('field-worker')}
              className="px-5 py-3 text-xs font-bold text-stone-900 bg-amber-300 hover:bg-amber-400 rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0 self-start md:self-auto cursor-pointer"
            >
              <span>Launch Field Worker App Engine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 5 Engine Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 pt-1">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <Database className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-white">1. Offline IndexedDB</div>
              <div className="text-[11px] text-stone-300 leading-snug">
                Stores thousands of registrations locally on device storage without internet.
              </div>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
                <Scan className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-white">2. Biometric Face ID</div>
              <div className="text-[11px] text-stone-300 leading-snug">
                Generates 64-bit perceptual hashes for victims whose CNICs washed away.
              </div>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center">
                <Radio className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-white">3. P2P Mesh Sync</div>
              <div className="text-[11px] text-stone-300 leading-snug">
                Syncs Worker A & B offline via local mesh to block duplicate aid requests.
              </div>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-white">4. Tamper-Proof SHA-256</div>
              <div className="text-[11px] text-stone-300 leading-snug">
                Immutable hash chaining prevents politicians or workers altering beneficiary lists.
              </div>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center">
                <WifiOff className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-white">5. Background Sync</div>
              <div className="text-[11px] text-stone-300 leading-snug">
                Service Worker auto-detects city connectivity and reconciles data into Public Ledger.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Three Rehousing Solutions Preview (Clean & Crisp) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8E4DA] pb-5">
          <div className="space-y-1.5">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#0F3A5D]">
              Indigenous Flood Engineering
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F3A5D]">
              How FloodAids Rebuilds Rural Pakistan
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm max-w-xl font-sans">
              Replacing fragile mud-brick katcha dwellings with 3-meter elevated bamboo and timber stilt homes that withstand torrential flash floods.
            </p>
          </div>

          <button
            onClick={() => onNavigate('shelters')}
            className="text-xs font-semibold text-[#0F3A5D] hover:text-[#0a273f] flex items-center gap-1.5 self-start md:self-end group cursor-pointer"
          >
            <span>View Full Architectural Specs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Solution Teaser Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {SHELTER_MODELS.map((model, idx) => (
            <div
              key={model.id}
              className="bg-white p-5 sm:p-6 rounded-2xl hairline-box shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-mono text-[#0F3A5D] font-bold">Phase 0{idx + 1}</span>
                  <span className="font-bold text-stone-900 num-tabular">Rs. {model.costPKR.toLocaleString()} PKR</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-[#0F3A5D]">
                  {model.name}
                </h3>
                <div className="text-xs text-emerald-800 font-semibold font-serif">
                  {model.urduName}
                </div>
                <p className="text-xs text-stone-600 line-clamp-2">
                  {model.tagline}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" /> {model.timeToDeploy}
                </span>
                {showDonationActions && <button
                  onClick={() => onOpenDonate(model.costPKR)}
                  className="text-xs font-semibold text-[#0F3A5D] hover:underline cursor-pointer"
                >
                  Sponsor Unit →
                </button>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Live Critical Pakistan Flood Zones Snapshot */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] border border-[#E8E4DA] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E4DA] pb-4">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C2410C] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C2410C] animate-ping" />
                Live Provincial Situation
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0F3A5D]">
                High-Urgency Flood Disaster Basins
              </h3>
            </div>

            <button
              onClick={() => onNavigate('zones')}
              className="px-4 py-2 text-xs font-semibold text-[#0F3A5D] bg-white hover:bg-stone-50 border border-stone-200 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>Explore All Disaster Zones ({RELIEF_ZONES.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Critical Zones Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {criticalZones.map((zone) => {
              const percent = Math.round((zone.sheltersDelivered / zone.targetShelters) * 100);
              return (
                <div
                  key={zone.id}
                  onClick={() => onNavigate('zones')}
                  className="bg-white p-4 sm:p-5 rounded-2xl hairline-box hover:border-[#0F3A5D] transition-all cursor-pointer space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[11px] text-stone-500 flex items-center gap-1 mb-0.5">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        <span>District {zone.district}, {zone.province}</span>
                      </div>
                      <h4 className="text-sm font-serif font-bold text-[#0F3A5D]">
                        {zone.name}
                      </h4>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-orange-50 text-[#C2410C]">
                      {zone.severity}
                    </span>
                  </div>

                  <div className="text-xs text-stone-600 num-tabular flex justify-between">
                    <span>{zone.familiesDisplaced.toLocaleString()} displaced</span>
                    <span className="font-semibold text-[#0F3A5D]">{percent}% rehoused</span>
                  </div>

                  <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full bg-[#0284C7] rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Trust & 100% Audit Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F3A5D] text-white rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Full Financial Transparency</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">
              88% of Funds Directly Buy Rehousing Timber & Bamboo
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 font-sans leading-relaxed">
              Every Pakistani Rupee is tied to verified biometric field receipts audited by PDMA Sindh, Balochistan, and the Pakistan Red Crescent Society.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('ledger')}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors cursor-pointer"
            >
              Inspect Public Ledger
            </button>
            {showDonationActions && <button
              onClick={() => onOpenDonate()}
              className="px-5 py-2.5 text-xs font-semibold text-[#0F3A5D] bg-white hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            >
              Donate in PKR
            </button>}
          </div>
        </div>
      </section>

      {/* 6. Featured Rural Impact Story Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl hairline-box shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            <div className="lg:col-span-5 relative bg-stone-100 min-h-[280px]">
              <img
                src={featuredStory.image}
                alt={featuredStory.familyName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-[11px] font-mono text-amber-300 uppercase">
                  {featuredStory.gothVillage}, District {featuredStory.district}, {featuredStory.province}
                </div>
                <div className="text-base font-serif font-bold">{featuredStory.familyName}</div>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-mono">
                  FIELD IMPACT SPOTLIGHT
                </div>
                <blockquote className="text-base sm:text-lg font-serif italic text-stone-800 leading-snug border-l-2 border-[#0F3A5D] pl-4">
                  {featuredStory.quote}
                </blockquote>
                <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 font-sans">
                  {featuredStory.story}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-medium text-emerald-800">
                  ✓ Rehoused in {featuredStory.rebuildTimeDays} days on 3m stilts
                </span>
                <button
                  onClick={() => onNavigate('stories')}
                  className="text-xs font-semibold text-[#0F3A5D] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Read All Villager Stories</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Direct Rural Relief Intake Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] border-2 border-dashed border-[#0F3A5D]/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#C2410C] flex items-center justify-center shrink-0 mx-auto sm:mx-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-serif font-bold text-[#0F3A5D]">
                Are you or your village displaced by floods?
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Apply directly for emergency dry kits, bamboo stilt frames, or solar lighting. Free of charge.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenAidRequest()}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0F3A5D] hover:bg-[#0a273f] rounded-xl transition-colors cursor-pointer whitespace-nowrap shadow-xs"
            >
              Request Aid (امداد کی درخواست)
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
