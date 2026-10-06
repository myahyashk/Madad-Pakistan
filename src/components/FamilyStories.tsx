import React, { useState } from 'react';
import { FAMILY_STORIES } from '../data/floodaidsData';
import { Home, CheckCircle, Camera } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';
import { useImageStore } from '../store/imageStore';

export const FamilyStories: React.FC = () => {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const currentStory = FAMILY_STORIES[activeStoryIdx];
  const { language, t } = useLanguageStore();
  const isUr = language === 'ur';

  const { storyImage, setStoryImage } = useImageStore();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setStoryImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="family-stories" className="py-16 sm:py-24 bg-[#F4EFEA] border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E4DA] pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#0F3A5D]">
              {t.stories.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F3A5D]">
              {t.stories.title}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-sans">
              {t.stories.description}
            </p>
          </div>

          {/* Story Switcher Tabs */}
          <div className="flex items-center gap-2 p-1 bg-white rounded-xl hairline-box">
            {FAMILY_STORIES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveStoryIdx(idx)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeStoryIdx === idx
                    ? 'bg-[#0F3A5D] text-white font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {s.familyName} ({s.province})
              </button>
            ))}
          </div>
        </div>

        {/* Feature Story Editorial Canvas */}
        <div className="bg-white rounded-3xl hairline-box shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left: Documentary Image (lg:col-span-5) */}
            <div className="lg:col-span-5 relative bg-stone-100 min-h-[350px] lg:min-h-full group">
              <img
                src={activeStoryIdx === 0 ? storyImage : currentStory.image}
                alt={currentStory.familyName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              {/* Replace Image Button */}
              {activeStoryIdx === 0 && (
                <div className="absolute top-3 right-3">
                  <label className="px-2.5 py-1.5 bg-black/60 hover:bg-black/80 text-white rounded-lg text-[11px] font-medium flex items-center gap-1.5 cursor-pointer backdrop-blur-xs transition-colors border border-white/20 shadow-md">
                    <Camera className="w-3.5 h-3.5 text-amber-300" />
                    <span>{isUr ? 'تصویر بدلیں' : 'Change Photo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold font-mono">
                  {currentStory.gothVillage}, {isUr ? 'ضلع' : 'District'} {currentStory.district}
                </div>
                <div className="text-lg font-serif font-bold">
                  {currentStory.familyName} ({currentStory.membersCount} {isUr ? 'افرادِ خانہ' : 'Family Members'})
                </div>
                <div className="text-xs text-stone-200">
                  {currentStory.province}, Pakistan · {isUr ? 'آبادکاری کی مدت:' : 'Rehoused in'} {currentStory.rebuildTimeDays} {isUr ? 'دن' : 'days'}
                </div>
              </div>
            </div>

            {/* Right: Narrative Essay & Pull Quote (lg:col-span-7) */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-6">
                
                {/* Status Ribbon */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-4 text-xs text-stone-500">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-[#0F3A5D]" />
                    <span className="font-semibold text-stone-900">{currentStory.homeStatus}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <CheckCircle className="w-4 h-4" />
                    <span>{isUr ? 'زمین سے 3 میٹر اونچے مچان پر محفوظ' : 'Safe on Raised 3-Meter Stilts'}</span>
                  </div>
                </div>

                {/* Editorial Pull Quote */}
                <blockquote className={`relative ${isUr ? 'pr-6 border-r-2' : 'pl-6 border-l-2'} border-[#0F3A5D] text-lg sm:text-xl font-serif italic text-stone-800 leading-relaxed`}>
                  {currentStory.quote}
                </blockquote>

                {/* Narrative prose with initial drop cap */}
                <div className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans space-y-4">
                  <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-[#0F3A5D]">
                    {currentStory.story}
                  </p>
                </div>

                {/* Recovery Timeline Indicators */}
                <div className="grid grid-cols-2 gap-4 bg-[#FAF8F5] p-4 rounded-xl border border-stone-200/60 text-xs">
                  <div>
                    <div className="text-stone-400">{t.stories.rebuildTime}</div>
                    <div className="text-base font-serif font-bold text-[#0F3A5D] mt-0.5 num-tabular">
                      {currentStory.rebuildTimeDays} {isUr ? 'دنوں میں تعمیر مکمل' : 'Days from Evacuation'}
                    </div>
                  </div>
                  <div>
                    <div className="text-stone-400">{t.stories.cattleSafe}</div>
                    <div className="text-base font-semibold text-emerald-700 mt-0.5">
                      {isUr ? 'مویشی اور خاندان محفوظ' : 'Cattle & Family Safe & Sheltered'}
                    </div>
                  </div>
                </div>

              </div>

              {/* Attribution */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>{isUr ? 'یونین کونسل اور فیلڈ آفیسر سے تصدیق شدہ' : 'Field Case File verified by Local Union Council & Relief Officer'}</span>
                <span className="font-mono text-[11px] text-stone-400">{currentStory.id}</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
