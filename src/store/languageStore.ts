import { create } from 'zustand';
import { Language, translations, Translations } from '../locales/translations';

interface LanguageState {
  language: Language;
  t: Translations;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>((set, get) => {
  const initialLang: Language = typeof window !== 'undefined' && localStorage.getItem('floodaids_lang') === 'ur' ? 'ur' : 'en';

  if (typeof document !== 'undefined') {
    document.documentElement.dir = initialLang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = initialLang;
  }

  return {
    language: initialLang,
    t: translations[initialLang],
    toggleLanguage: () => {
      const nextLang = get().language === 'en' ? 'ur' : 'en';
      if (typeof window !== 'undefined') {
        localStorage.setItem('floodaids_lang', nextLang);
      }
      if (typeof document !== 'undefined') {
        document.documentElement.dir = nextLang === 'ur' ? 'rtl' : 'ltr';
        document.documentElement.lang = nextLang;
      }
      set({
        language: nextLang,
        t: translations[nextLang]
      });
    },
    setLanguage: (lang) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('floodaids_lang', lang);
      }
      if (typeof document !== 'undefined') {
        document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
      }
      set({
        language: lang,
        t: translations[lang]
      });
    }
  };
});
