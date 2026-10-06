import React from 'react';
import { Radio, ShieldCheck, PhoneCall } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';

export const OperationalRibbon: React.FC = () => {
  const { t } = useLanguageStore();

  return (
    <div className="bg-[#0F3A5D] text-stone-100 text-[11px] py-1 px-4 border-b border-[#0a273f]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-x-4">
        
        {/* Left: Dispatch indicator */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 font-semibold text-amber-300">
            <Radio className="w-3 h-3 animate-pulse text-amber-400" />
            <span className="uppercase tracking-wider text-[10px]">{t.ribbon.dispatch}</span>
          </span>
          <span className="hidden sm:inline text-stone-400" aria-hidden="true">·</span>
          <span className="text-stone-200 truncate">
            {t.ribbon.hubs}
          </span>
        </div>

        {/* Right: Operational trust & helpline */}
        <div className="flex items-center gap-3 text-stone-300 shrink-0">
          <span className="hidden md:flex items-center gap-1 text-[11px]">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>{t.ribbon.partner}</span>
          </span>
          <span className="hidden md:inline text-stone-500" aria-hidden="true">·</span>
          <a href="tel:1129" className="flex items-center gap-1 text-stone-200 hover:text-white font-mono num-tabular font-bold">
            <PhoneCall className="w-3 h-3 text-amber-300" />
            <span>1129</span>
          </a>
        </div>

      </div>
    </div>
  );
};
