import React, { useState } from 'react';
import { RELIEF_ZONES } from '../data/floodaidsData';
import { ReliefZone } from '../types/floodaids';
import { Users, Home, MapPin, ArrowUpRight, Droplet, CheckCircle2 } from 'lucide-react';

interface ActiveReliefZonesProps {
  onSponsorZone: (zoneName: string) => void;
}

export const ActiveReliefZones: React.FC<ActiveReliefZonesProps> = ({ onSponsorZone }) => {
  const [selectedProvince, setSelectedProvince] = useState<string>('All');
  const [activeZone, setActiveZone] = useState<ReliefZone>(RELIEF_ZONES[0]);

  const filteredZones = selectedProvince === 'All'
    ? RELIEF_ZONES
    : RELIEF_ZONES.filter(z => z.province === selectedProvince);

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'text-[#C2410C] font-semibold';
      case 'Severe':
        return 'text-amber-700 font-semibold';
      case 'Rebuilding':
        return 'text-[#0284C7] font-semibold';
      case 'Stabilized':
        return 'text-emerald-700 font-semibold';
      default:
        return 'text-stone-600';
    }
  };

  return (
    <section id="active-zones" className="py-16 sm:py-20 bg-[#FAF8F5] border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8E4DA] pb-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#0F3A5D]">
              Pakistan Provincial Disaster Radar
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F3A5D]">
              Active Flood Disaster Zones in Pakistan
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-2xl font-sans">
              Live situation reports from rural agrarian communities across Sindh, Balochistan, South Punjab, and Khyber Pakhtunkhwa.
            </p>
          </div>

          {/* Pakistan Province Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EFECE6] rounded-xl self-start md:self-end">
            {['All', 'Sindh', 'Balochistan', 'South Punjab', 'Khyber Pakhtunkhwa'].map((prov) => (
              <button
                key={prov}
                type="button"
                onClick={() => setSelectedProvince(prov)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedProvince === prov
                    ? 'bg-white text-[#0F3A5D] shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {prov}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Institutional Layout: Pakistani Zones & Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Pakistani Zone Cards (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-3">
            {filteredZones.map((zone) => {
              const isSelected = activeZone.id === zone.id;
              const percentCovered = Math.round((zone.sheltersDelivered / zone.targetShelters) * 100);

              return (
                <div
                  key={zone.id}
                  onClick={() => setActiveZone(zone)}
                  className={`p-4 sm:p-5 rounded-2xl transition-all cursor-pointer border text-left ${
                    isSelected
                      ? 'bg-white border-[#0F3A5D] shadow-sm ring-1 ring-[#0F3A5D]/20'
                      : 'bg-white/60 hover:bg-white border-stone-200/80 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>District {zone.district}, {zone.province}, Pakistan</span>
                      </div>
                      <h3 className="text-base font-serif font-bold text-[#0F3A5D]">
                        {zone.name}
                      </h3>
                      <div className="text-[11px] text-stone-500 mt-0.5">Tehsil: {zone.tehsil}</div>
                    </div>

                    <div className={`text-xs ${getSeverityBadgeClass(zone.severity)}`}>
                      {zone.severity}
                    </div>
                  </div>

                  {/* Clean unboxed stats with typographic separators */}
                  <div className="mt-3 flex items-center gap-2 text-xs text-stone-600 num-tabular">
                    <span>{zone.familiesDisplaced.toLocaleString()} families</span>
                    <span aria-hidden="true">·</span>
                    <span>{zone.katchaHomesDestroyed.toLocaleString()} katcha homes</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-[#0F3A5D]">{percentCovered}% sheltered</span>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-2.5 w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        zone.severity === 'Critical' ? 'bg-[#C2410C]' : 'bg-[#0284C7]'
                      }`}
                      style={{ width: `${percentCovered}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Field Dossier for Selected Pakistan Zone (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl hairline-box shadow-xs space-y-6">
            
            {/* Dossier Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-5">
              <div>
                <div className="text-xs text-stone-500 flex items-center gap-2 font-mono">
                  <span>PAKISTAN DISPATCH DOSSIER</span>
                  <span>·</span>
                  <span>{activeZone.lastUpdated}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#0F3A5D] mt-1">
                  {activeZone.name}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  District: {activeZone.district} · Province: {activeZone.province} · Lead: {activeZone.leadCoordinator}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className={`text-xs uppercase tracking-wider font-semibold ${getSeverityBadgeClass(activeZone.severity)}`}>
                  {activeZone.severity} Severity
                </span>
                <div className="text-xs text-stone-600 font-mono mt-0.5 num-tabular">
                  {activeZone.waterLevelStatus}
                </div>
              </div>
            </div>

            {/* Narrative Urgent Situation */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                Ground Situation Assessment
              </h4>
              <p className="text-sm text-stone-700 leading-relaxed bg-[#FAF8F5] p-4 rounded-xl border border-stone-200/60 font-sans">
                {activeZone.urgencyDescription}
              </p>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-stone-200/60">
                <div className="text-xs text-stone-500 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-stone-400" /> Displaced
                </div>
                <div className="text-xl font-serif font-bold text-[#0F3A5D] mt-1 num-tabular">
                  {activeZone.familiesDisplaced.toLocaleString()}
                </div>
                <div className="text-[11px] text-stone-400 mt-0.5">Rural families</div>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-stone-200/60">
                <div className="text-xs text-stone-500 flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-stone-400" /> Lost Katcha Homes
                </div>
                <div className="text-xl font-serif font-bold text-[#C2410C] mt-1 num-tabular">
                  {activeZone.katchaHomesDestroyed.toLocaleString()}
                </div>
                <div className="text-[11px] text-stone-400 mt-0.5">Mud structures</div>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-stone-200/60">
                <div className="text-xs text-stone-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Sheltered
                </div>
                <div className="text-xl font-serif font-bold text-[#0F3A5D] mt-1 num-tabular">
                  {activeZone.sheltersDelivered.toLocaleString()}
                </div>
                <div className="text-[11px] text-stone-400 mt-0.5">Target: {activeZone.targetShelters.toLocaleString()}</div>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-stone-200/60">
                <div className="text-xs text-stone-500 flex items-center gap-1.5">
                  <Droplet className="w-3.5 h-3.5 text-[#0284C7]" /> Clean Water
                </div>
                <div className="text-xl font-serif font-bold text-[#0284C7] mt-1 num-tabular">
                  {(activeZone.cleanWaterLiters / 1000).toLocaleString()}k L
                </div>
                <div className="text-[11px] text-stone-400 mt-0.5">Purified & tubewells</div>
              </div>
            </div>

            {/* Critical Urgent Supply Needs List */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                Priority Village Needs on the Ground
              </h4>
              <div className="flex flex-wrap gap-2 text-xs text-stone-700">
                {activeZone.activeNeeds.map((need, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 rounded-lg text-stone-800 font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C2410C]" />
                    {need}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-500">
                Coordinated with PDMA {activeZone.province} & local district commissioners.
              </div>

              <button
                type="button"
                onClick={() => onSponsorZone(activeZone.name)}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#0F3A5D] hover:bg-[#0a273f] rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs whitespace-nowrap"
              >
                <span>Sponsor Shelters for {activeZone.district}, {activeZone.province}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
