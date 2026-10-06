import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Camera, RefreshCw, Upload } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';
import { useImageStore } from '../store/imageStore';

interface HeroSectionProps {
  onOpenDonate: (amount?: number) => void;
  onOpenAidRequest: () => void;
  showDonationActions?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDonate, onOpenAidRequest, showDonationActions = true }) => {
  const { language, t } = useLanguageStore();
  const isUr = language === 'ur';

  const { heroImage, setHeroImage, resetDefaultImages } = useImageStore();

  const [selectedTier, setSelectedTier] = useState<number>(65000);
  const [customAmount, setCustomAmount] = useState<string>('');

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : selectedTier;
    onOpenDonate(isNaN(finalAmount) || finalAmount <= 0 ? selectedTier : finalAmount);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setHeroImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E8E4DA] bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5] to-[#F4EFEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Headline, Narrative & Direct Action */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed category / date metadata */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#0F3A5D]/90">
              <span className="text-emerald-800 font-bold">{isUr ? 'مدد پاکستان' : 'MADAD PAKISTAN'}</span>
              <span aria-hidden="true">·</span>
              <span>{isUr ? 'دیہی امداد اور تحفظ' : 'Relief Support & Protection'}</span>
              <span aria-hidden="true">·</span>
              <span>{isUr ? 'سندھ · بلوچستان · جنوبی پنجاب · کے پی کے' : 'Sindh · Balochistan · South Punjab · KP'}</span>
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F3A5D]/70">
              {isUr ? 'مدد لوگوں تک پہنچاتی ہے' : 'Connecting Help With People Who Need It'}
            </p>

            <h1 className="text-3xl sm:text-5xl lg:text-[3.2rem] font-serif font-bold text-[#0F3A5D] leading-[1.2] tracking-tight text-balance">
              {t.hero.title}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl font-sans">
              {t.hero.description}
            </p>

            {/* Quick Proof Pillars with Tabular Numerals */}
            <div className="grid grid-cols-3 gap-4 pt-2 pb-2 border-y border-[#E8E4DA]">
              <div className="space-y-0.5">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#0F3A5D] num-tabular">{t.hero.stat1Val}</div>
                <div className="text-xs text-stone-500">{t.hero.stat1Label}</div>
              </div>
              <div className={`space-y-0.5 ${isUr ? 'border-r border-[#E8E4DA] pr-4' : 'border-l border-[#E8E4DA] pl-4'}`}>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#0F3A5D] num-tabular">{t.hero.stat2Val}</div>
                <div className="text-xs text-stone-500">{t.hero.stat2Label}</div>
              </div>
              <div className={`space-y-0.5 ${isUr ? 'border-r border-[#E8E4DA] pr-4' : 'border-l border-[#E8E4DA] pl-4'}`}>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-700 num-tabular">{t.hero.stat3Val}</div>
                <div className="text-xs text-stone-500">{t.hero.stat3Label}</div>
              </div>
            </div>

            {/* Interactive Giving & Intake Hub in PKR */}
            <div className={`${showDonationActions ? '' : 'hidden'} bg-white/95 backdrop-blur-sm p-5 sm:p-6 rounded-2xl hairline-box shadow-xs space-y-4`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  {t.hero.packageTitle}
                </span>
                <span className="text-xs text-emerald-800 font-medium">
                  {t.hero.taxExempt}
                </span>
              </div>

              {/* Segmented Tier Selector in PKR */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { amount: 15000, title: isUr ? '15,000 روپے' : 'Rs. 15,000', subtitle: t.hero.tier1Title, desc: t.hero.tier1Desc },
                  { amount: 65000, title: isUr ? '65,000 روپے' : 'Rs. 65,000', subtitle: t.hero.tier2Title, desc: t.hero.tier2Desc },
                  { amount: 320000, title: isUr ? '320,000 روپے' : 'Rs. 320,000', subtitle: t.hero.tier3Title, desc: t.hero.tier3Desc }
                ].map((tier) => (
                  <button
                    key={tier.amount}
                    type="button"
                    onClick={() => {
                      setSelectedTier(tier.amount);
                      setCustomAmount('');
                    }}
                    className={`p-3 text-left rounded-xl transition-all cursor-pointer border ${
                      selectedTier === tier.amount && !customAmount
                        ? 'bg-[#0F3A5D] text-white border-[#0F3A5D] shadow-xs'
                        : 'bg-[#FAF8F5] text-stone-800 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <div className="font-semibold text-sm num-tabular">{tier.title}</div>
                    <div className={`text-[11px] font-medium mt-0.5 truncate ${
                      selectedTier === tier.amount && !customAmount ? 'text-amber-300' : 'text-[#0F3A5D]'
                    }`}>
                      {tier.desc}
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom PKR amount & submit button */}
              <form onSubmit={handleDonateSubmit} className="flex flex-col sm:flex-row gap-3 pt-1">
                <div className="relative flex-1">
                  <span className={`absolute ${isUr ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-stone-400 text-xs font-semibold font-mono`}>PKR Rs.</span>
                  <input
                    type="number"
                    min="500"
                    step="500"
                    placeholder={t.hero.customPlaceholder}
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className={`w-full ${isUr ? 'pr-20 pl-4' : 'pl-20 pr-4'} py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3A5D] num-tabular`}
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-[#0F3A5D] hover:bg-[#0a273f] rounded-xl shadow-xs transition-colors whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t.hero.sponsorBtn}</span>
                  <ArrowRight className={`w-4 h-4 ${isUr ? 'rotate-180' : ''}`} />
                </button>
              </form>

              {/* Secondary link for rural victims needing shelter */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-600 border-t border-stone-100 gap-2">
                <span>{t.hero.displacedQuestion}</span>
                <button
                  type="button"
                  onClick={onOpenAidRequest}
                  className="font-semibold text-[#C2410C] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                >
                  <span>{t.hero.requestRehousingBtn}</span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isUr ? 'rotate-180' : ''}`} />
                </button>
              </div>

            </div>

          </div>

          {/* Right Column: Hero High-Impact Documentary Image with Easy Upload / Replace */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-300/80 bg-stone-200 aspect-[4/3] lg:aspect-[16/11] group">
              <img
                src={heroImage}
                alt="Rural Pakistani builders and relief rescue team in flooded village"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              
              {/* Image Uploader & Replacer Button */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <label className="px-2.5 py-1.5 bg-black/60 hover:bg-black/80 text-white rounded-lg text-[11px] font-medium flex items-center gap-1.5 cursor-pointer backdrop-blur-xs transition-colors border border-white/20 shadow-md">
                  <Camera className="w-3.5 h-3.5 text-amber-300" />
                  <span>{isUr ? 'تصویر تبدیل کریں' : 'Change Image'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Bottom Documentary Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-amber-300 font-semibold font-mono">
                  <span>{isUr ? 'فیلڈ ڈسپیچ: گوٹھ علی بخش، سندھ' : 'Field Dispatch: Goth Ali Bux, Sindh'}</span>
                  <span aria-hidden="true">·</span>
                  <span>{isUr ? 'سیلاب ریلیف و ریسکیو مشن' : 'Pakistan Flood Rescue'}</span>
                </div>
                <p className="text-xs text-stone-200 leading-snug font-sans">
                  {isUr 
                    ? 'سیلابی پانی میں گھرے دیہی خاندانوں اور بزرگ خواتین کو ریلیف کشتی اور مچان گھروں میں محفوظ منتقلی'
                    : 'Rescue team and village builders assisting flood-displaced families from rescue boat to elevated stilt platforms.'}
                </p>
              </div>
            </div>

            {/* Curatorial Caption */}
            <div className="flex items-center justify-between text-xs text-stone-500 italic px-1">
              <span>{isUr ? 'شکل 1 — سندھ کے سیلاب زدہ علاقے میں ریلیف اور مچان گھروں کی تعمیر۔' : 'Fig. 1 — Community flood rescue and stilt haven deployment, Sindh.'}</span>
              <span className="not-italic text-[11px] text-stone-400">MADAD PAKISTAN Archives</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
