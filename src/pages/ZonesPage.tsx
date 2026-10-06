import React from 'react';
import { ActiveReliefZones } from '../components/ActiveReliefZones';
import { ArrowLeft, MapPin, Radio, ShieldCheck } from 'lucide-react';

interface ZonesPageProps {
  onBackToHome: () => void;
  onSponsorZone: (zoneName: string) => void;
}

export const ZonesPage: React.FC<ZonesPageProps> = ({ onBackToHome, onSponsorZone }) => {
  return (
    <div className="pb-16 space-y-6">
      {/* Page Header Ribbon */}
      <div className="bg-[#FAF8F5] border-b border-[#E8E4DA] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              onClick={onBackToHome}
              className="text-xs font-semibold text-[#0F3A5D] hover:underline flex items-center gap-1.5 self-start cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>

            <div className="flex items-center gap-3 text-xs text-stone-600">
              <span className="flex items-center gap-1.5 text-amber-700 font-medium">
                <Radio className="w-3.5 h-3.5 animate-pulse text-amber-600" />
                <span>6 High-Priority Disaster Basins Monitored</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>Updated Hourly with PDMA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Active Zones Component */}
      <ActiveReliefZones onSponsorZone={onSponsorZone} />
    </div>
  );
};
