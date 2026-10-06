import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react';
import { AidApplication } from '../types/floodaids';

interface EmergencyAidRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyAidRequestModal: React.FC<EmergencyAidRequestModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [submittedApp, setSubmittedApp] = useState<AidApplication | null>(null);

  const [formData, setFormData] = useState({
    applicantName: '',
    cnic: '',
    phone: '',
    province: 'Sindh' as const,
    district: '',
    tehsil: '',
    gothVillage: '',
    familyMembers: '7',
    childrenCount: '3',
    elderlyCount: '1',
    livestockCount: '2',
    damageLevel: 'Completely Submerged Katcha Home' as const,
    immediateNeeds: [
      '48-Hour Rapid Chhappar & Tarpaulin Kit',
      'Elevated Bamboo Stilt Haven',
      'Clean Drinking Water & Tablets'
    ],
    notes: '',
  });

  if (!isOpen) return null;

  const handleToggleNeed = (need: string) => {
    setFormData(prev => ({
      ...prev,
      immediateNeeds: prev.immediateNeeds.includes(need)
        ? prev.immediateNeeds.filter(n => n !== need)
        : [...prev.immediateNeeds, need]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApp: AidApplication = {
      id: `PK-AID-${Math.floor(100000 + Math.random() * 900000)}`,
      applicantName: formData.applicantName || 'Rural Villager',
      cnic: formData.cnic || '45302-XXXXXXX-X',
      phone: formData.phone || '+92 300 0000000',
      province: formData.province,
      district: formData.district || 'Dadu',
      tehsil: formData.tehsil || 'Mehar',
      gothVillage: formData.gothVillage || 'Goth Ali Bux',
      familyMembers: parseInt(formData.familyMembers) || 7,
      childrenCount: parseInt(formData.childrenCount) || 3,
      elderlyCount: parseInt(formData.elderlyCount) || 1,
      livestockCount: parseInt(formData.livestockCount) || 2,
      damageLevel: formData.damageLevel,
      immediateNeeds: formData.immediateNeeds,
      notes: formData.notes,
      status: 'Assigned to Local Field Scout',
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setSubmittedApp(newApp);
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl hairline-box overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#0F3A5D] text-white p-6 sm:p-7 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Pakistan Rural Emergency Intake (امداد کی درخواست)</span>
            </div>
            <h3 className="text-2xl font-serif font-bold">
              Emergency Flood Rehousing Assistance
            </h3>
            <p className="text-xs text-stone-200">
              For rural villagers in Pakistan whose katcha homes have been destroyed by monsoon or hill torrent floods.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-300 hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Free Assistance Guarantee */}
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-3 text-xs text-emerald-900">
              <AlertCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong>تمام امداد بالکل مفت ہے۔ کوئی فیس نہیں ہے۔ (100% Free Humanitarian Aid).</strong> All emergency kits, bamboo stilt machans, and water purification are funded by humanitarian rehousing grants.
              </div>
            </div>

            {/* Applicant & CNIC Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                1. Head of Household / سرپرست کا نام اور شناختی کارڈ
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Applicant Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muhammad Ramzan"
                    value={formData.applicantName}
                    onChange={e => setFormData({ ...formData, applicantName: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3A5D]"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    CNIC No. / شناختی کارڈ *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 45302-1234567-1"
                    value={formData.cnic}
                    onChange={e => setFormData({ ...formData, cnic: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3A5D] font-mono"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Mobile Phone / رابطہ نمبر *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0300-1234567"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3A5D] font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Rural Location in Pakistan */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                2. Rural Village & District Location / علاقہ اور ضلع
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Province / صوبہ *
                  </label>
                  <select
                    value={formData.province}
                    onChange={e => setFormData({ ...formData, province: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3A5D]"
                  >
                    <option value="Sindh">Sindh (سندھ)</option>
                    <option value="Balochistan">Balochistan (بلوچستان)</option>
                    <option value="South Punjab">South Punjab (جنوبی پنجاب)</option>
                    <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa (خیبر پختونخوا)</option>
                    <option value="Gilgit-Baltistan">Gilgit-Baltistan (گلگت بلتستان)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    District / ضلع *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dadu / Rajanpur"
                    value={formData.district}
                    onChange={e => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3A5D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Tehsil / تعلقہ / تحصیل *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mehar / Fazilpur"
                    value={formData.tehsil}
                    onChange={e => setFormData({ ...formData, tehsil: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3A5D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Goth / Basti / گاؤں *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Goth Ali Bux"
                    value={formData.gothVillage}
                    onChange={e => setFormData({ ...formData, gothVillage: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3A5D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Katcha Mud Home Damage Status / نقصان کی نوعیت
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    'Completely Submerged Katcha Home',
                    'Washed Away by Hill Torrent',
                    'Uninhabitable Mud Wall Collapse'
                  ].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setFormData({ ...formData, damageLevel: lvl as any })}
                      className={`p-2.5 text-xs text-left rounded-xl border transition-colors cursor-pointer ${
                        formData.damageLevel === lvl
                          ? 'bg-[#0F3A5D] text-white border-[#0F3A5D] font-medium'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Family & Livestock Counts */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                3. Family Members & Livestock / افراد خانہ اور مال مویشی
              </h4>
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] text-stone-600 mb-1">Total Members</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.familyMembers}
                    onChange={e => setFormData({ ...formData, familyMembers: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl num-tabular"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-600 mb-1">Children (بچے)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.childrenCount}
                    onChange={e => setFormData({ ...formData, childrenCount: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl num-tabular"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-600 mb-1">Elderly (بزرگ)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.elderlyCount}
                    onChange={e => setFormData({ ...formData, elderlyCount: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl num-tabular"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-600 mb-1">Cattle / مویشی</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.livestockCount}
                    onChange={e => setFormData({ ...formData, livestockCount: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl num-tabular"
                  />
                </div>
              </div>
            </div>

            {/* Immediate Needs Checkboxes */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                4. Priority Aid Requested / فوری امدادی ضروریات
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  '48-Hour Rapid Chhappar & Tarpaulin Kit',
                  'Elevated Bamboo Stilt Haven',
                  'Clean Drinking Water & Tablets',
                  'Solar Lantern with Mobile Charger',
                  'Mosquito Netting (Anti-Malaria)',
                  'Livestock Elevated Fodder Pack'
                ].map((need) => (
                  <label
                    key={need}
                    onClick={() => handleToggleNeed(need)}
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 cursor-pointer text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={formData.immediateNeeds.includes(need)}
                      onChange={() => {}}
                      className="rounded text-[#0F3A5D] focus:ring-[#0F3A5D]"
                    />
                    <span className="text-stone-800">{need}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#0F3A5D] hover:bg-[#0a273f] rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Submit Emergency Request (درخواست جمع کروائیں)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        ) : (
          <div className="p-6 sm:p-10 space-y-6 text-center">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h4 className="text-2xl font-serif font-bold text-[#0F3A5D]">
                درخواست کامیابی سے درج ہوگئی ہے
              </h4>
              <div className="text-base font-semibold text-stone-800 font-serif">
                Assistance Request Registered
              </div>
              <p className="text-xs text-stone-500">
                Your emergency intake case has been routed to the District Disaster Coordination Desk.
              </p>
            </div>

            {/* Reference Box */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-stone-200 max-w-md mx-auto text-left space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">DISPATCH CASE ID:</span>
                <span className="font-bold text-[#0F3A5D]">{submittedApp?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Applicant:</span>
                <span className="text-stone-800">{submittedApp?.applicantName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">CNIC:</span>
                <span className="text-stone-800">{submittedApp?.cnic}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Location:</span>
                <span className="text-stone-800">{submittedApp?.gothVillage}, {submittedApp?.district}, {submittedApp?.province}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Status:</span>
                <span className="font-semibold text-amber-700">{submittedApp?.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Expected Local Scout Contact:</span>
                <span className="text-stone-800">Within 3 to 6 Hours</span>
              </div>
            </div>

            <p className="text-xs text-stone-600 max-w-sm mx-auto">
              Our regional field team in your district will coordinate emergency chhappar kit dispatch. In urgent danger, call National Helpline <strong className="text-[#0F3A5D]">1129</strong>.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#0F3A5D] hover:bg-[#0a273f] rounded-xl cursor-pointer"
            >
              Done & Return to Homepage
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
