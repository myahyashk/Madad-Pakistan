import React, { useState, useEffect } from 'react';
import { useLanguageStore } from '../store/languageStore';
import { useAuthStore } from '../store/authStore';
import { 
  HeartHandshake, 
  Menu, 
  X, 
  ShieldAlert, 
  PhoneCall, 
  MapPin, 
  Home, 
  FileText, 
  Users, 
  ChevronRight,
  Compass,
  Cpu,
  Languages,
  Award,
  ShieldCheck,
  ClipboardList
} from 'lucide-react';

interface TopNavProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onOpenDonate: (amount?: number) => void;
  onOpenAidRequest: () => void;
  onOpenLogin?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ 
  activePage, 
  onNavigate, 
  onOpenDonate, 
  onOpenAidRequest,
  onOpenLogin
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguageStore();
  const isUr = language === 'ur';
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [drawerOpen]);

  const handleNavClick = (pageId: string) => {
    setDrawerOpen(false);
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: t.nav.home, icon: Compass, desc: isUr ? 'تعارف اور مشن' : 'Overview & Mission' },
    { id: 'achievements', label: t.nav.achievements, icon: Award, desc: isUr ? 'فیلڈ کارنامے اور رپورٹس' : 'Field Milestones & Reports', isNew: true },
    { id: 'zones', label: t.nav.zones, icon: MapPin, desc: isUr ? 'سندھ، بلوچستان، پنجاب اور کے پی کے' : 'Sindh, Balochistan & Punjab' },
    { id: 'shelters', label: t.nav.shelters, icon: Home, desc: isUr ? '3 میٹر بلند لکڑی و بانس مچان' : 'Elevated Stilt Machans' },
    { id: 'ledger', label: t.nav.ledger, icon: FileText, desc: isUr ? '100% تصدیق شدہ عوامی کھاتہ' : '100% Verified PKR Audit' },
    { id: 'stories', label: t.nav.stories, icon: Users, desc: isUr ? 'دیہی متاثرین کے احوال' : 'Field Impact Chronicles' },
    { id: 'field-worker', label: t.nav.fieldApp, icon: Cpu, desc: isUr ? 'بائیومیٹرک فیس آئی ڈی اور پی ٹو پی' : 'Biometric Face ID & Anti-Duplication', isP2p: true }
    ,{ id: 'admin', label: isUr ? 'ایڈمن کنٹرول روم' : 'Admin Control Room', icon: ShieldCheck, desc: isUr ? 'گھروں، ٹیموں اور تصدیق کا ریکارڈ' : 'Household verification & team dispatch' }
    ,{ id: 'team', label: isUr ? 'ٹیم ورک اسپیس' : 'Team Workspace', icon: ClipboardList, desc: 'Upload surveys and aid provided' }
  ];

  return (
    <>
      {/* Clean, Minimal, Shortest Top Navigation Bar (h-14 / 56px) */}
      {/* Links are kept inside the slide-over menu drawer as requested */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E4DA] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">
          
          {/* Brand Logo & Wordmark */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#0F3A5D] hover:opacity-90 transition-opacity flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <span className="text-[#0284C7] text-xl" aria-hidden="true">≋</span>
              <span>{isUr ? 'مدد پاکستان' : 'MADAD PAKISTAN'}</span>
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 ml-0.5">
                {isUr ? 'پیشہ ورانہ' : 'PRO' }
              </span>
            </button>
          </div>

          {/* Minimal Controls: Language Switcher + Donate PKR + Menu Button */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Global Language Switcher Toggle */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-800 hover:text-[#0F3A5D] bg-stone-100 hover:bg-stone-200/80 rounded-xl transition-all border border-stone-200/80 cursor-pointer"
              title={isUr ? 'Switch to English' : 'اردو زبان میں تبدیل کریں'}
            >
              <Languages className="w-3.5 h-3.5 text-[#0F3A5D]" />
              <span className="font-bold">{t.nav.switchLang}</span>
            </button>

            {/* Organization dashboard shortcut */}
            <button
              onClick={() => onNavigate(user?.role === 'admin' ? 'admin' : 'organization')}
              className="hidden max-w-[180px] truncate rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-900 sm:inline-flex"
              title="Open your scoped dashboard"
            >
              {user?.organizationName}
            </button>

            {(!user || (user.role !== 'admin' && user.organizationType !== 'private_donor')) && (
              <button
                onClick={() => onOpenDonate()}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0F3A5D] hover:bg-[#0a273f] rounded-xl shadow-2xs hover:shadow-xs transition-all whitespace-nowrap cursor-pointer"
              >
                <HeartHandshake className="w-3.5 h-3.5 text-amber-300" />
                <span>{t.nav.donatePKR}</span>
              </button>
            )}

            {/* Menu Drawer Toggle Button */}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="px-3 py-1.5 text-stone-800 hover:text-stone-950 bg-white hover:bg-stone-100 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer border border-stone-300 shadow-2xs"
              aria-label="Open Navigation Menu"
            >
              {drawerOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4 text-[#0F3A5D]" />}
              <span>{t.nav.menu}</span>
            </button>

            {user ? <button onClick={logout} className="hidden rounded-xl border border-stone-300 bg-white px-3 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-100 sm:inline-flex">Sign out</button> : <button onClick={onOpenLogin} className="hidden rounded-xl border border-[#0F3A5D] bg-white px-3 py-1.5 text-xs font-bold text-[#0F3A5D] hover:bg-stone-100 sm:inline-flex">Team login</button>}

          </div>
        </div>
      </header>

      {/* Modern Slide-Over Menu Drawer (Housing all navigation links & pages) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          
          {/* Backdrop Blur */}
          <div 
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
          />

          {/* Slide-in Drawer Container */}
          <aside className="relative w-full max-w-sm sm:max-w-md bg-[#FAF8F5] h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto border-l border-[#E8E4DA] animate-in slide-in-from-right duration-200">
            
            {/* Drawer Header with Language Switch & Close */}
            <div>
              <div className="p-4 sm:p-5 border-b border-[#E8E4DA] flex items-center justify-between bg-white/70">
                <div className="flex items-center gap-2">
                  <span className="text-[#0284C7] text-xl" aria-hidden="true">≋</span>
                  <div className="flex flex-col">
                    <div className="font-serif font-bold text-lg text-[#0F3A5D]">
                      {isUr ? 'مدد پاکستان' : 'MADAD PAKISTAN'}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.16em] text-stone-500">
                      {isUr ? 'مدد لوگوں تک پہنچاتی ہے' : 'Connecting Help With People Who Need It'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleLanguage}
                    className="px-2.5 py-1 text-xs font-bold text-[#0F3A5D] bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer"
                  >
                    {t.nav.switchLang}
                  </button>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Priority Action Tiles */}
              <div className="p-4 sm:p-5 space-y-2.5 border-b border-[#E8E4DA]">
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenAidRequest();
                  }}
                  className="w-full p-3.5 bg-white hover:bg-stone-50 border border-[#0F3A5D]/20 rounded-2xl text-left transition-colors flex items-center justify-between group cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#C2410C] flex items-center justify-center shrink-0">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900">
                        {isUr ? 'ہنگامی امداد کی درخواست' : 'Request Emergency Rehousing'}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {isUr ? 'سیلاب متاثرین کے لیے مفت چھت' : '100% Free Shelter Assistance'}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-stone-400 group-hover:text-stone-700 transition-colors ${isUr ? 'rotate-180' : ''}`} />
                </button>

                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenDonate();
                  }}
                  className="w-full p-3.5 bg-[#0F3A5D] hover:bg-[#0a273f] text-white rounded-2xl text-left transition-colors flex items-center justify-between group cursor-pointer shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 text-amber-300 flex items-center justify-center shrink-0">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">
                        {isUr ? 'مچان گھر عطیہ کریں (پاکستانی روپے)' : 'Donate Rehousing Unit (PKR)'}
                      </div>
                      <div className="text-[11px] text-stone-300">
                        {isUr ? 'ایف بی آر ٹیکس کٹوتی کی سہولت' : 'Sponsor Stilt Homes · FBR Tax Deductible'}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-stone-300 group-hover:text-white transition-colors ${isUr ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Navigation Pages List (Cleanly organized in menu drawer) */}
              <div className="p-4 sm:p-5 space-y-1">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 px-3 pb-2 font-mono">
                  {t.nav.menuTitle}
                </div>

                {navItems.filter(item => (item.id !== 'admin' || user?.role === 'admin') && (item.id !== 'team' || user?.role === 'team') && (item.id !== 'field-worker' || user?.organizationType !== 'private_donor')).map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full px-3 py-2.5 rounded-xl text-left transition-colors flex items-center justify-between cursor-pointer group ${
                        isActive
                          ? 'bg-[#0F3A5D] text-white shadow-2xs font-semibold'
                          : 'hover:bg-stone-200/60 text-stone-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-[#0F3A5D]'}`} />
                        <div>
                          <div className={`text-xs font-bold flex items-center gap-1.5 ${isActive ? 'text-white' : 'text-stone-900'}`}>
                            <span>{item.label}</span>
                            {item.isNew && (
                              <span className="text-[9px] px-1.5 py-0.2 bg-amber-400 text-stone-950 font-bold rounded">
                                NEW
                              </span>
                            )}
                            {item.isP2p && (
                              <span className="text-[9px] px-1.5 py-0.2 bg-emerald-200 text-emerald-950 font-mono font-bold rounded">
                                P2P
                              </span>
                            )}
                          </div>
                          <div className={`text-[11px] ${isActive ? 'text-stone-200' : 'text-stone-500'}`}>
                            {item.desc}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-stone-300 group-hover:text-stone-600'} transition-colors ${isUr ? 'rotate-180' : ''}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drawer Footer with National Emergency Helpline */}
            <div className="p-4 sm:p-5 border-t border-[#E8E4DA] bg-white/60 space-y-3">
              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-200 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase text-stone-500 flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
                    {isUr ? 'قومی سیلاب ہیلپ لائن' : 'National Flood Emergency'}
                  </span>
                  <span className="font-mono font-bold text-[#0F3A5D]">1129</span>
                </div>
                <div className="text-[11px] text-stone-600 mt-1">
                  {isUr ? 'سندھ، بلوچستان، پنجاب اور کے پی کے کے لیے 24 گھنٹے فعال' : '24/7 Disaster Helpline for Sindh, Balochistan, Punjab & KP.'}
                </div>
              </div>

              <div className="text-[10px] text-stone-400 text-center font-mono">
                MADAD PAKISTAN · Connecting Help With People Who Need It
              </div>
            </div>

          </aside>
        </div>
      )}
    </>
  );
};
