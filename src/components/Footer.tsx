import React, { useState } from 'react';
import { ShieldCheck, PhoneCall } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenDonate: () => void;
  onOpenAidRequest: () => void;
  showDonationActions?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDonate, onOpenAidRequest, showDonationActions = true }) => {
  const { language, t } = useLanguageStore();
  const isUr = language === 'ur';

  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneOrEmail) {
      setSubscribed(true);
      setPhoneOrEmail('');
    }
  };

  const handlePageClick = (pageId: string) => {
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A1926] text-stone-300 pt-16 pb-12 border-t border-[#0F3A5D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Mandate (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <button 
              onClick={() => handlePageClick('home')}
              className="flex items-center gap-2 cursor-pointer text-left"
            >
              <span className="text-[#38BDF8] text-2xl" aria-hidden="true">≋</span>
              <span className="text-2xl font-serif font-bold text-white tracking-tight">
                {isUr ? 'مدد پاکستان' : 'MADAD PAKISTAN'}
              </span>
            </button>
            
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-md font-sans">
              {t.footer.desc}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-stone-400 font-mono">
              <span>FBR NTN #4928172-1</span>
              <span aria-hidden="true">·</span>
              <span>SECP Non-Profit Reg. #019284</span>
              <span aria-hidden="true">·</span>
              <span>Section 61 Tax Exempted</span>
            </div>
          </div>

          {/* Dedicated Page Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => handlePageClick('home')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('achievements')}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span>{t.nav.achievements}</span>
                  <span className="text-[9px] px-1 py-0.2 bg-amber-400 text-stone-950 font-bold rounded">NEW</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('zones')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.nav.zones}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('shelters')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.nav.shelters}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('ledger')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.nav.ledger}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('stories')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.nav.stories}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('field-worker')}
                  className="hover:text-white transition-colors cursor-pointer text-left text-emerald-400 font-semibold"
                >
                  {t.nav.fieldApp}
                </button>
              </li>
            </ul>
          </div>

          {/* Pakistan Provincial Field Desks (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              {t.footer.fieldDesks}
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div>
                <span className="text-stone-200 block font-medium">{isUr ? 'اسلام آباد ہیڈ کوارٹر:' : 'Islamabad HQ:'}</span>
                <span className="font-mono text-[11px]">+92 51 9205037</span>
              </div>
              <div>
                <span className="text-stone-200 block font-medium">{isUr ? 'کراچی (سندھ ڈیسک):' : 'Karachi Desk:'}</span>
                <span className="font-mono text-[11px]">+92 21 35832041</span>
              </div>
              <div>
                <span className="text-stone-200 block font-medium">{isUr ? 'کوئٹہ (بلوچستان ڈیسک):' : 'Quetta Desk:'}</span>
                <span className="font-mono text-[11px]">+92 81 2831092</span>
              </div>
              <div>
                <span className="text-stone-200 block font-medium">{isUr ? 'قومی فلڈ ہیلپ لائن:' : 'National Helpline:'}</span>
                <span className="font-mono text-[11px] text-amber-300 font-bold">1129 ({isUr ? 'ٹول فری' : 'Toll-Free'})</span>
              </div>
            </div>
          </div>

          {/* Pakistan Rural Situation Reports (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              {t.footer.subscribeTitle}
            </h4>
            <p className="text-xs text-stone-400">
              {t.footer.subscribeDesc}
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#0F3A5D] text-white text-xs rounded-xl flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isUr ? 'شکریہ! آپ کو فیلڈ اپ ڈیٹس بذریعہ ایس ایم ایس موصول ہوں گی۔' : 'Thank you! You will receive field dispatch updates.'}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder={isUr ? 'موبائل نمبر یا ای میل درج کریں...' : 'Enter mobile (03xx) or email...'}
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-[#132A3E] border border-stone-700 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-400 font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 text-xs font-medium text-white bg-[#0284C7] hover:bg-[#0369a1] rounded-xl transition-colors cursor-pointer"
                >
                  {t.footer.subscribeBtn}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Institutional Ribbon */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            {t.footer.rights}
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenAidRequest}
              className="hover:text-stone-300 cursor-pointer"
            >
              {isUr ? 'درخواست برائے امداد' : 'Victim Intake'}
            </button>
            {showDonationActions && <button
              onClick={onOpenDonate}
              className="hover:text-stone-300 cursor-pointer text-amber-300"
            >
              {isUr ? 'امداد دیں (روپے)' : 'Donate in PKR'}
            </button>}
            <button 
              onClick={() => handlePageClick('ledger')}
              className="hover:text-stone-300 cursor-pointer"
            >
              {isUr ? 'شفافیت کا آڈٹ' : 'Audit Transparency'}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
