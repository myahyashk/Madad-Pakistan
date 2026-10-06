// Field Achievements & Milestones Data for FloodAids Pakistan

export interface AchievementItem {
  id: string;
  titleEn: string;
  titleUr: string;
  category: 'shelter' | 'water' | 'biometric' | 'recognition';
  district: string;
  province: string;
  metricVal: string;
  metricLabelEn: string;
  metricLabelUr: string;
  date: string;
  verifiedBy: string;
  descriptionEn: string;
  descriptionUr: string;
  imageUrl: string;
  badge: string;
}

export const INITIAL_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ACH-2026-001',
    titleEn: '8,450 Elevated Stilt Havens Erected Across Sindh & Balochistan',
    titleUr: 'سندھ اور بلوچستان میں 8,450 بلند مچان گھروں کی کامیاب تعمیر',
    category: 'shelter',
    district: 'Dadu & Sohbatpur',
    province: 'Sindh & Balochistan',
    metricVal: '8,450 Havens',
    metricLabelEn: 'Zero floodwater breaching',
    metricLabelUr: 'سیلابی پانی داخل ہونے کی صفر شکایات',
    date: 'September 24, 2026',
    verifiedBy: 'PDMA Sindh & Pakistan Engineering Council (PEC)',
    descriptionEn: 'Elevated 3 meters above standing water levels, protecting over 48,200 rural villagers and 16,000 milking livestock across 114 goths.',
    descriptionUr: 'سیلابی پانی کی سطح سے 3 میٹر اونچائی پر 48,200 سے زائد دیہی افراد اور 16,000 مویشیوں کو 114 دیہاتوں میں مکمل تحفظ فراہم کیا گیا۔',
    imageUrl: '/src/assets/images/hero_flood_relief_shelter_1790837231380.jpg',
    badge: 'Flagship Rehousing'
  },
  {
    id: 'ACH-2026-002',
    titleEn: '14 Solar-Powered Drinking Water Plants Commissioned',
    titleUr: '14 شمسی توانائی سے چلنے والے واٹر فلٹریشن پلانٹس فعال',
    category: 'water',
    district: 'Rajanpur & Fazilpur',
    province: 'South Punjab',
    metricVal: '3.2M Liters',
    metricLabelEn: 'Safe water distributed',
    metricLabelUr: 'پینے کا صاف پانی فراہم کیا گیا',
    date: 'September 12, 2026',
    verifiedBy: 'Pakistan Council of Research in Water Resources (PCRWR)',
    descriptionEn: 'Eliminated acute gastrointestinal and waterborne illness outbreaks across 32 riverine pastoral communities.',
    descriptionUr: '32 دریا برد بستیوں میں ہیضہ، ٹائیفائیڈ اور پیٹ کی خطرناک بیماریوں کا مکمل خاتمہ ممکن بنایا گیا۔',
    imageUrl: '/src/assets/images/emergency_aid_distribution_1790837265797.jpg',
    badge: 'Clean Water Lifeline'
  },
  {
    id: 'ACH-2026-003',
    titleEn: 'P2P Offline Biometric Mesh Blocks 1,420 Duplicate Aid Claims',
    titleUr: 'آف لائن بائیومیٹرک فیس آئی ڈی میش نے 1,420 جعلی کلیمز روکے',
    category: 'biometric',
    district: 'Mehar & Jaffarabad',
    province: 'Sindh & Balochistan',
    metricVal: '1,420 Fraud Cases',
    metricLabelEn: 'Zero duplicate leakages',
    metricLabelUr: 'وسائل کے ضیاع اور نقل کی صفر گنجائش',
    date: 'August 29, 2026',
    verifiedBy: 'Joint Humanitarian Digital Audit Board',
    descriptionEn: 'Field worker tablets running without cell connectivity identified duplicate claimants using 64-bit facial perceptual hashes and local P2P sync.',
    descriptionUr: 'بغیر انٹرنیٹ کے کام کرنے والے فیلڈ ٹیبلٹس نے فیس آئی ڈی ہیشز کے ذریعے دوبارہ امداد لینے کی تمام کوششوں کو خودکار طور پر بلاک کر دیا۔',
    imageUrl: '/src/assets/images/family_rebuilt_home_story_1790837286335.jpg',
    badge: 'Tech Anti-Corruption'
  },
  {
    id: 'ACH-2026-004',
    titleEn: 'Sole Home Deeds Registered in Names of 650 Female Heads of Household',
    titleUr: '650 مکانات کے مالکانہ حقوق غریب خواتین کے نام رجسٹرڈ',
    category: 'recognition',
    district: 'Khairpur Nathan Shah',
    province: 'Sindh',
    metricVal: '650 Female Deeds',
    metricLabelEn: 'Legal land security',
    metricLabelUr: 'خواتین کو قانونی چھت اور تحفظ',
    date: 'August 14, 2026',
    verifiedBy: 'District Revenue Authority & UN Women Partner Cell',
    descriptionEn: 'Guarantees generational safety and dignity for widowed, disabled, and displaced women farm laborers.',
    descriptionUr: 'بیوہ، معذور اور غریب بی بیوں کو ان کے گھروں کی مکمل قانونی اور پائیدار مالکانہ اسناد تفویض کی گئیں۔',
    imageUrl: '/src/assets/images/modular_flood_haven_1790837249768.jpg',
    badge: 'Gender Dignity & Safety'
  }
];
