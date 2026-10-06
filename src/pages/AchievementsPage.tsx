import React, { useState, useEffect } from 'react';
import { INITIAL_ACHIEVEMENTS, AchievementItem } from '../data/achievementsData';
import { useLanguageStore } from '../store/languageStore';
import { 
  Award, 
  PlusCircle, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Upload, 
  X, 
  Image as ImageIcon,
  Sparkles,
  ArrowLeft,
  Filter
} from 'lucide-react';

interface AchievementsPageProps {
  onBackToHome: () => void;
}

export const AchievementsPage: React.FC<AchievementsPageProps> = ({ onBackToHome }) => {
  const { language, t } = useLanguageStore();
  const isUr = language === 'ur';

  // Load achievements from localStorage with fallback to INITIAL_ACHIEVEMENTS
  const [achievements, setAchievements] = useState<AchievementItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('floodaids_achievements');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved achievements:', e);
        }
      }
    }
    return INITIAL_ACHIEVEMENTS;
  });

  const [activeFilter, setActiveFilter] = useState<'all' | 'shelter' | 'water' | 'biometric' | 'recognition'>('all');
  const [modalOpen, setModalOpen] = useState(false);

  // New Achievement Form State
  const [titleEn, setTitleEn] = useState('');
  const [titleUr, setTitleUr] = useState('');
  const [category, setCategory] = useState<'shelter' | 'water' | 'biometric' | 'recognition'>('shelter');
  const [district, setDistrict] = useState('Dadu');
  const [province, setProvince] = useState('Sindh');
  const [metricVal, setMetricVal] = useState('500 Havens');
  const [metricLabelEn, setMetricLabelEn] = useState('Verified by PDMA');
  const [metricLabelUr, setMetricLabelUr] = useState('پی ڈی ایم اے سے تصدیق شدہ');
  const [verifiedBy, setVerifiedBy] = useState('PDMA Sindh & District Administration');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionUr, setDescriptionUr] = useState('');
  const [imageUrl, setImageUrl] = useState('/src/assets/images/hero_flood_relief_shelter_1790837231380.jpg');

  // Save to localStorage whenever achievements change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('floodaids_achievements', JSON.stringify(achievements));
    }
  }, [achievements]);

  const filteredItems = activeFilter === 'all'
    ? achievements
    : achievements.filter(a => a.category === activeFilter);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newItem: AchievementItem = {
      id: `ACH-${Date.now().toString().slice(-4)}`,
      titleEn: titleEn || 'New Field Rehousing Milestone',
      titleUr: titleUr || 'نیا فیلڈ کارنامہ و زمینی پیش رفت',
      category,
      district,
      province,
      metricVal,
      metricLabelEn,
      metricLabelUr,
      date: new Date().toLocaleDateString(isUr ? 'ur-PK' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      verifiedBy,
      descriptionEn: descriptionEn || 'Field team successfully completed rehousing milestone and delivered flood-proof elevated shelters.',
      descriptionUr: descriptionUr || 'فیلڈ ٹیم نے مچان گھروں کی تعمیر اور ریلیف کی فراہمی کامیابی سے مکمل کرلی۔',
      imageUrl,
      badge: category === 'shelter' ? 'Rehousing Milestone' : category === 'water' ? 'Clean Water' : category === 'biometric' ? 'P2P Technology' : 'Official Audit'
    };

    setAchievements([newItem, ...achievements]);
    setModalOpen(false);

    // Reset Form
    setTitleEn('');
    setTitleUr('');
    setDescriptionEn('');
    setDescriptionUr('');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="pb-16 space-y-8 font-sans">
      
      {/* Top Header Ribbon with Back Button */}
      <div className="bg-[#FAF8F5] border-b border-[#E8E4DA] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <button
            onClick={onBackToHome}
            className="text-xs font-semibold text-[#0F3A5D] hover:underline flex items-center gap-1.5 self-start cursor-pointer"
          >
            <ArrowLeft className={`w-3.5 h-3.5 ${isUr ? 'rotate-180' : ''}`} />
            <span>{isUr ? 'ہوم پیج پر واپس جائیں' : 'Back to Home'}</span>
          </button>

          <span className="text-xs font-mono text-stone-500">
            {isUr ? 'سرکاری ریکارڈ و تصدیق شدہ کارنامے' : 'Verified Humanitarian Milestones & Public Ledger'}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Editorial Section Hero */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E8E4DA] pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#0F3A5D] flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              <span>{t.achievements.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F3A5D]">
              {t.achievements.title}
            </h1>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {t.achievements.description}
            </p>
          </div>

          {/* Action to Upload New Achievement */}
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-3 text-xs font-bold text-white bg-[#0F3A5D] hover:bg-[#0a273f] rounded-xl shadow-xs transition-all flex items-center gap-2 self-start lg:self-end cursor-pointer whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4 text-amber-300" />
            <span>{t.achievements.uploadBtn}</span>
          </button>
        </div>

        {/* 4 Key Milestone Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl hairline-box shadow-2xs space-y-1">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#0F3A5D] num-tabular">
              {t.achievements.statHavens}
            </div>
            <div className="text-xs font-medium text-stone-600">
              {t.achievements.statHavensLabel}
            </div>
            <div className="text-[10px] text-emerald-700 font-mono">
              {isUr ? '100% سیلاب پروف' : 'Zero Breaches'}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl hairline-box shadow-2xs space-y-1">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#0F3A5D] num-tabular">
              {t.achievements.statFamilies}
            </div>
            <div className="text-xs font-medium text-stone-600">
              {t.achievements.statFamiliesLabel}
            </div>
            <div className="text-[10px] text-stone-400 font-mono">
              {isUr ? '114 دیہاتوں میں' : 'Across 114 Goths'}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl hairline-box shadow-2xs space-y-1">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#0284C7] num-tabular">
              {t.achievements.statWater}
            </div>
            <div className="text-xs font-medium text-stone-600">
              {t.achievements.statWaterLabel}
            </div>
            <div className="text-[10px] text-sky-700 font-mono">
              {isUr ? '14 سولر فلٹرز' : '14 Solar RO Units'}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl hairline-box shadow-2xs space-y-1">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-700 num-tabular">
              {t.achievements.statPrevented}
            </div>
            <div className="text-xs font-medium text-stone-600">
              {t.achievements.statPreventedLabel}
            </div>
            <div className="text-[10px] text-amber-800 font-mono">
              {isUr ? 'بائیومیٹرک فیس آئی ڈی میش' : 'P2P Biometric Hash'}
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-[#E8E4DA]">
          <span className="text-xs font-semibold text-stone-500 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>{isUr ? 'فلٹر کریں:' : 'Filter:'}</span>
          </span>

          {[
            { id: 'all', label: t.achievements.filterAll },
            { id: 'shelter', label: t.achievements.filterShelter },
            { id: 'water', label: t.achievements.filterWater },
            { id: 'biometric', label: t.achievements.filterBiometric },
            { id: 'recognition', label: t.achievements.filterRecognition }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-colors cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#0F3A5D] text-white font-semibold shadow-2xs'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Achievements Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl hairline-box shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-sm transition-all"
            >
              <div>
                {/* Photo & Badge */}
                <div className="relative aspect-[16/9] bg-stone-100 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.titleEn}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  
                  <div className="absolute top-3 right-3 bg-[#0F3A5D]/90 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-1 rounded-lg border border-white/20">
                    {item.badge}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-mono">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.district}, {item.province}</span>
                      <span>·</span>
                      <Calendar className="w-3.5 h-3.5 ml-1" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-3">
                  <h3 className="text-lg font-serif font-bold text-[#0F3A5D] leading-snug">
                    {isUr ? item.titleUr : item.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                    {isUr ? item.descriptionUr : item.descriptionEn}
                  </p>

                  <div className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-200/80 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-mono">
                        {isUr ? 'بڑا ہدف و کامیابی' : 'Impact Milestone'}
                      </span>
                      <span className="font-bold text-[#0F3A5D] text-sm num-tabular">
                        {item.metricVal}
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-800 font-medium">
                      {isUr ? item.metricLabelUr : item.metricLabelEn}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 sm:px-6 bg-[#F8F6F1] border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="truncate max-w-[220px]" title={item.verifiedBy}>
                    {t.achievements.verifiedBy}: {item.verifiedBy}
                  </span>
                </span>
                <span className="font-mono text-[10px] text-stone-400">{item.id}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Upload Modal (نیا کارنامہ اپ لوڈ کریں) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl hairline-box overflow-hidden my-6">
            
            {/* Modal Header */}
            <div className="bg-[#0F3A5D] text-white p-5 sm:p-6 flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>{isUr ? 'فیلڈ کارنامہ و رپورٹ شامل کریں' : 'Publish Ground Milestone & Achievement'}</span>
                </div>
                <h3 className="text-xl font-serif font-bold">
                  {isUr ? 'نیا ریلیف کارنامہ اپ لوڈ کریں' : 'Upload Verified Humanitarian Milestone'}
                </h3>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-stone-300 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4 text-xs">
              
              {/* Title Inputs (Urdu & English) */}
              <div className="space-y-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {isUr ? 'کارنامے کا عنوان (اردو میں)' : 'Achievement Title (Urdu)'} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثلاً: گوٹھ علی بخش میں 120 نئے مچان گھر مکمل"
                    value={titleUr}
                    onChange={(e) => setTitleUr(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3A5D]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Achievement Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 120 New Raised Stilt Havens Completed in Goth Ali Bux"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3A5D]"
                  />
                </div>
              </div>

              {/* Category & Region */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                  >
                    <option value="shelter">Shelters & Havens</option>
                    <option value="water">Clean Water</option>
                    <option value="biometric">P2P Biometrics</option>
                    <option value="recognition">Audits & Awards</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">District (ضلع)</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Province (صوبہ)</label>
                  <input
                    type="text"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Metric Value & Verifier */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Key Figure / Metric (مثلاً: 120 Havens / 50k Liters)
                  </label>
                  <input
                    type="text"
                    required
                    value={metricVal}
                    onChange={(e) => setMetricVal(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Verifying Entity (تصدیق کنندہ ادارہ)
                  </label>
                  <input
                    type="text"
                    required
                    value={verifiedBy}
                    onChange={(e) => setVerifiedBy(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Description / تفصیلات (Urdu or English)
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe the impact on displaced rural families..."
                  value={descriptionUr || descriptionEn}
                  onChange={(e) => {
                    setDescriptionUr(e.target.value);
                    setDescriptionEn(e.target.value);
                  }}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              {/* Image attachment / selection */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Field Photo Attachment (تصویر منتخب کریں)
                </label>
                <div className="flex items-center gap-3">
                  <img src={imageUrl} alt="Preview" className="w-14 h-14 rounded-xl object-cover border border-stone-300" />
                  <label className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 rounded-xl font-semibold text-stone-700 cursor-pointer flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Picture</span>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                  <span className="text-[11px] text-stone-400">JPG, PNG or Live Capture</span>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 font-bold text-white bg-[#0F3A5D] hover:bg-[#0a273f] rounded-xl shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Publish Milestone</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
