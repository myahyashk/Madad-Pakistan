import React, { useState } from 'react';
import { SHELTER_MODELS, MODULAR_HAVEN_IMAGE } from '../data/floodaidsData';
import { ShelterModel } from '../types/floodaids';
import { Check, Hammer, Clock, ShieldCheck, Sun, Layers, ArrowRight } from 'lucide-react';

interface ShelterBlueprintProps {
  onFundModel: (costPKR: number, modelName: string) => void;
}

export const ShelterBlueprint: React.FC<ShelterBlueprintProps> = ({ onFundModel }) => {
  const [activeModel, setActiveModel] = useState<ShelterModel>(SHELTER_MODELS[1]); // Default to Phase 2 Stilt Machan
  const [activeLayer, setActiveLayer] = useState<'all' | 'foundation' | 'deck' | 'roof'>('all');

  return (
    <section id="shelter-models" className="py-16 sm:py-24 bg-[#F4EFEA] border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#0F3A5D]">
            Indigenous Flood Engineering for Rural Pakistan
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F3A5D]">
            The 3-Phase Rural Rehousing Blueprint
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
            Traditional mud (<em className="text-stone-900 font-medium not-italic">katcha</em>) houses liquefy into mud during flash deluges. FloodAids engineers elevated timber-and-bamboo <strong className="text-stone-900 font-semibold">Machan</strong> structures built 3 meters above historic high-water contours, keeping rural families, children, and livestock safe and dry.
          </p>
        </div>

        {/* Phase Model Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SHELTER_MODELS.map((model, idx) => {
            const isSelected = activeModel.id === model.id;
            return (
              <button
                key={model.id}
                type="button"
                onClick={() => setActiveModel(model)}
                className={`p-5 rounded-2xl text-left transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-white border-[#0F3A5D] shadow-md ring-1 ring-[#0F3A5D]/15'
                    : 'bg-[#FAF8F5]/80 hover:bg-white border-stone-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span className="font-mono uppercase tracking-wider font-semibold text-[#0F3A5D]">
                    Phase 0{idx + 1}
                  </span>
                  <span className="font-semibold text-stone-900 num-tabular">Rs. {model.costPKR.toLocaleString()} PKR</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-[#0F3A5D]">
                  {model.name}
                </h3>
                <div className="text-xs font-serif text-emerald-800 font-semibold mb-1">
                  {model.urduName}
                </div>
                <p className="text-xs text-stone-600 line-clamp-2">
                  {model.tagline}
                </p>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-stone-500 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Build time: {model.timeToDeploy}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Model Blueprint Presentation */}
        <div className="bg-white rounded-3xl hairline-box shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Visual Column: Architectural Image & Blueprint Overlays */}
            <div className="lg:col-span-6 p-6 sm:p-8 bg-[#FAF8F5] border-b lg:border-b-0 lg:border-r border-[#E8E4DA] flex flex-col justify-between space-y-6">
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-mono">
                    RURAL PAKISTAN ARCHITECTURAL SPECIFICATION
                  </span>
                  <span className="text-xs text-emerald-800 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Certified Flood-Safe
                  </span>
                </div>
                <h4 className="text-2xl font-serif font-bold text-[#0F3A5D]">
                  {activeModel.name} <span className="text-base text-emerald-700 font-normal">({activeModel.urduName})</span>
                </h4>
                <p className="text-xs text-stone-600">
                  {activeModel.suitableFor}
                </p>
              </div>

              {/* Architectural Image Box */}
              <div className="relative rounded-2xl overflow-hidden border border-stone-300 shadow-sm aspect-[4/3] bg-stone-100">
                <img
                  src={MODULAR_HAVEN_IMAGE}
                  alt="Elevated flood-resilient bamboo stilt shelter built in rural Pakistan"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {/* Elevation callout overlay */}
                <div className="absolute top-3 left-3 bg-[#0F3A5D]/90 backdrop-blur-xs text-white text-[11px] font-mono px-3 py-1.5 rounded-lg border border-white/20">
                  ELEVATION: {activeModel.elevationAboveGround}
                </div>

                {/* Capacity badge */}
                <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white text-[11px] px-3 py-1.5 rounded-lg">
                  Capacity: {activeModel.capacity}
                </div>
              </div>

              {/* Architectural Layer Selector */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <div className="flex items-center justify-between text-xs font-medium text-stone-600">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-stone-400" /> Structural Subsystems
                  </span>
                  <span className="text-[11px] text-stone-400">Click to inspect</span>
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { id: 'all', label: 'All Systems' },
                    { id: 'foundation', label: 'Treated Stilts' },
                    { id: 'deck', label: 'Bamboo Deck' },
                    { id: 'roof', label: 'GI Roof & Solar' },
                  ].map((layer) => (
                    <button
                      key={layer.id}
                      type="button"
                      onClick={() => setActiveLayer(layer.id as any)}
                      className={`py-1.5 px-2 text-[11px] font-medium rounded-lg text-center transition-colors cursor-pointer ${
                        activeLayer === layer.id
                          ? 'bg-[#0F3A5D] text-white font-semibold'
                          : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {layer.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Spec Column: Detailed Materials & Engineering Breakthroughs */}
            <div className="lg:col-span-6 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-6">
                
                {/* Key Technical Specs Grid */}
                <div className="grid grid-cols-3 gap-3 border-b border-stone-100 pb-5">
                  <div>
                    <div className="text-xs text-stone-500">Assembly Time</div>
                    <div className="text-base font-semibold text-stone-900 num-tabular mt-0.5">
                      {activeModel.timeToDeploy}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-stone-500">Lifespan</div>
                    <div className="text-base font-semibold text-stone-900 num-tabular mt-0.5">
                      {activeModel.lifespan}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-stone-500">Unit Cost (PKR)</div>
                    <div className="text-base font-bold text-[#0F3A5D] num-tabular mt-0.5">
                      Rs. {activeModel.costPKR.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Bill of Sustainable Materials */}
                <div className="space-y-2.5">
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                    <Hammer className="w-3.5 h-3.5 text-stone-400" /> Locally Procured Pakistani Materials
                  </h5>
                  <ul className="space-y-2 text-xs text-stone-600 font-sans">
                    {activeModel.materials.map((mat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] mt-1.5 shrink-0" />
                        <span>{mat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rural Protection Features */}
                <div className="space-y-2.5">
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-stone-400" /> Rural Protection & Dignity Features
                  </h5>
                  <ul className="space-y-2 text-xs text-stone-600 font-sans">
                    {activeModel.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-[#0F3A5D]">
                    FBR Tax-Exempt Humanitarian Rehousing Gift
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Provides direct daily wages to local village youth and carpenters.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onFundModel(activeModel.costPKR, activeModel.name)}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-white bg-[#0F3A5D] hover:bg-[#0a273f] rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <span>Sponsor Unit (Rs. {activeModel.costPKR.toLocaleString()} PKR)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
