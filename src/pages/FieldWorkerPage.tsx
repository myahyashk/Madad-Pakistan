import React from 'react';
import { FieldWorkerTerminal } from '../components/FieldWorkerTerminal';
import { ArrowLeft, Terminal, ShieldCheck, Cpu } from 'lucide-react';

interface FieldWorkerPageProps {
  onBackToHome: () => void;
}

export const FieldWorkerPage: React.FC<FieldWorkerPageProps> = ({ onBackToHome }) => {
  return (
    <div className="pb-16 space-y-4">
      {/* Page Header Ribbon */}
      <div className="bg-[#FAF8F5] border-b border-[#E8E4DA] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <button
              onClick={onBackToHome}
              className="text-xs font-semibold text-[#0F3A5D] hover:underline flex items-center gap-1.5 self-start cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Portal</span>
            </button>

            <div className="flex items-center gap-3 text-xs text-stone-600 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                <span>IndexedDB + Biometric pHash + SHA-256 + P2P Mesh</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Field Worker Core Engine Terminal */}
      <FieldWorkerTerminal />
    </div>
  );
};
