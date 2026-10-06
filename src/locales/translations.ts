// Bilingual Translation Dictionary for FloodAids Pakistan (English & Urdu)

export type Language = 'en' | 'ur';

export interface Translations {
  ribbon: {
    dispatch: string;
    hubs: string;
    partner: string;
    helpline: string;
  };
  nav: {
    home: string;
    achievements: string;
    zones: string;
    shelters: string;
    ledger: string;
    stories: string;
    fieldApp: string;
    fieldAppBadge: string;
    requestAid: string;
    donatePKR: string;
    menu: string;
    menuTitle: string;
    switchLang: string;
  };
  hero: {
    tag: string;
    title: string;
    description: string;
    stat1Val: string;
    stat1Label: string;
    stat2Val: string;
    stat2Label: string;
    stat3Val: string;
    stat3Label: string;
    packageTitle: string;
    taxExempt: string;
    tier1Title: string;
    tier1Desc: string;
    tier2Title: string;
    tier2Desc: string;
    tier3Title: string;
    tier3Desc: string;
    customPlaceholder: string;
    sponsorBtn: string;
    displacedQuestion: string;
    requestRehousingBtn: string;
    caption: string;
  };
  achievements: {
    badge: string;
    title: string;
    description: string;
    uploadBtn: string;
    statHavens: string;
    statHavensLabel: string;
    statFamilies: string;
    statFamiliesLabel: string;
    statWater: string;
    statWaterLabel: string;
    statPrevented: string;
    statPreventedLabel: string;
    filterAll: string;
    filterShelter: string;
    filterWater: string;
    filterBiometric: string;
    filterRecognition: string;
    verifiedBy: string;
    date: string;
    district: string;
  };
  zones: {
    badge: string;
    title: string;
    description: string;
    filterAll: string;
    displacedLabel: string;
    katchaLabel: string;
    shelteredLabel: string;
    cleanWaterLabel: string;
    groundAssessment: string;
    urgentNeeds: string;
    sponsorZoneBtn: string;
  };
  shelters: {
    badge: string;
    title: string;
    description: string;
    phase1: string;
    phase2: string;
    phase3: string;
    buildTime: string;
    lifespan: string;
    unitCost: string;
    materials: string;
    features: string;
    sponsorBtn: string;
  };
  ledger: {
    badge: string;
    title: string;
    description: string;
    allocation: string;
    searchPlaceholder: string;
    disbursed: string;
    beneficiaries: string;
    auditor: string;
    status: string;
  };
  stories: {
    badge: string;
    title: string;
    description: string;
    rebuildTime: string;
    cattleSafe: string;
  };
  fieldApp: {
    badge: string;
    title: string;
    desc: string;
    launchBtn: string;
    offlineMode: string;
    onlineMode: string;
    reconcileBtn: string;
    activeTablet: string;
    workerA: string;
    workerB: string;
  };
  footer: {
    desc: string;
    quickLinks: string;
    fieldDesks: string;
    subscribeTitle: string;
    subscribeDesc: string;
    subscribeBtn: string;
    rights: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    ribbon: {
      dispatch: 'Pakistan Field Dispatch',
      hubs: '18 Emergency Hubs Active Across Sindh, Balochistan, South Punjab & KP',
      partner: 'PDMA & Pakistan Red Crescent Partner',
      helpline: '1129 (Toll-Free Helpline)'
    },
    nav: {
      home: 'Home',
      achievements: 'Achievements',
      zones: 'Disaster Zones',
      shelters: 'Rural Shelters',
      ledger: 'Aid Ledger',
      stories: 'Villager Stories',
      fieldApp: 'Field App Engine',
      fieldAppBadge: 'P2P MESH',
      requestAid: 'Request Aid',
      donatePKR: 'Donate PKR',
      menu: 'Menu',
      menuTitle: 'Navigation & Operations',
      switchLang: 'اردو'
    },
    hero: {
      tag: 'Pakistan Emergency Relief · Rural Rehousing & Flood Protection',
      title: 'Rebuilding Dignified, Elevated Homes for Rural Families Across Flood-Hit Pakistan.',
      description: 'When monsoon deluges and mountain hill torrents (Rod-Kohi) strike, thousands of rural mud-brick (katcha) homes dissolve in hours, leaving agrarian families stranded on canal embankments with their livestock. FloodAids Pakistan rapidly builds 3-meter elevated timber and bamboo stilt shelters to keep rural children, elders, and cattle safe above the water.',
      stat1Val: '48,200+',
      stat1Label: 'Villagers Rehoused',
      stat2Val: '8,450',
      stat2Label: 'Raised Havens Built',
      stat3Val: '100%',
      stat3Label: 'Direct Rural Impact',
      packageTitle: 'Select Rehousing Shelter Package (PKR)',
      taxExempt: 'FBR / Section 61 Tax Exempted',
      tier1Title: 'Rs. 15,000',
      tier1Desc: '48-Hour Rapid Chhappar Kit',
      tier2Title: 'Rs. 65,000',
      tier2Desc: 'Raised Stilt Deck Platform',
      tier3Title: 'Rs. 320,000',
      tier3Desc: 'Complete Bamboo Stilt Haven',
      customPlaceholder: 'Other amount in Rupees (e.g. 50000)...',
      sponsorBtn: 'Sponsor Rural Shelter',
      displacedQuestion: 'Has your home been destroyed by recent rains or floods?',
      requestRehousingBtn: 'Request Emergency Rehousing (امداد کی درخواست)',
      caption: 'Fig. 1 — Community construction of raised rural bamboo shelters, Sindh. FloodAids Archives.'
    },
    achievements: {
      badge: 'Field Milestones & Ground Impact',
      title: 'Major Achievements in Pakistan Flood Rehousing',
      description: 'Documented milestones, verified rehousing completions, clean water deployments, and anti-duplication breakthroughs across rural Sindh, Balochistan, South Punjab, and Khyber Pakhtunkhwa.',
      uploadBtn: 'Upload New Achievement / Report',
      statHavens: '8,450',
      statHavensLabel: 'Stilt Havens Erected',
      statFamilies: '48,200+',
      statFamiliesLabel: 'Displaced Villagers Rehoused',
      statWater: '3.2M Liters',
      statWaterLabel: 'Clean Water Purified',
      statPrevented: '1,420',
      statPreventedLabel: 'Duplicate Aid Attempts Blocked',
      filterAll: 'All Milestones',
      filterShelter: 'Shelters & Havens',
      filterWater: 'Clean Water',
      filterBiometric: 'P2P Biometrics',
      filterRecognition: 'Audits & Awards',
      verifiedBy: 'Verified by',
      date: 'Date',
      district: 'District'
    },
    zones: {
      badge: 'Pakistan Provincial Disaster Radar',
      title: 'Active Flood Disaster Zones in Pakistan',
      description: 'Live situation reports from rural agrarian communities across Sindh, Balochistan, South Punjab, and Khyber Pakhtunkhwa.',
      filterAll: 'All Provinces',
      displacedLabel: 'Displaced Families',
      katchaLabel: 'Lost Katcha Homes',
      shelteredLabel: 'Sheltered Progress',
      cleanWaterLabel: 'Clean Water Delivered',
      groundAssessment: 'Ground Situation Assessment',
      urgentNeeds: 'Priority Village Needs on the Ground',
      sponsorZoneBtn: 'Sponsor Shelters for this District'
    },
    shelters: {
      badge: 'Indigenous Flood Engineering for Rural Pakistan',
      title: 'The 3-Phase Rural Rehousing Blueprint',
      description: 'Traditional mud (katcha) houses liquefy into mud during flash deluges. FloodAids engineers elevated timber-and-bamboo Machan structures built 3 meters above historic high-water contours.',
      phase1: 'Phase 01: 48-Hour Rapid Chhappar Kit',
      phase2: 'Phase 02: Elevated Bamboo Stilt Haven (Machan)',
      phase3: 'Phase 03: Resilient Pakka Raised Cottage',
      buildTime: 'Build time',
      lifespan: 'Lifespan',
      unitCost: 'Unit Cost (PKR)',
      materials: 'Locally Procured Pakistani Materials',
      features: 'Rural Protection & Dignity Features',
      sponsorBtn: 'Sponsor This Rehousing Unit'
    },
    ledger: {
      badge: 'Public Financial Accountability (Pakistan)',
      title: 'Public Aid Disbursement & Material Ledger',
      description: 'Every Pakistani Rupee (PKR) contributed to FloodAids is itemized and linked to verified field delivery manifests audited by Provincial Disaster Management Authorities (PDMAs) and humanitarian partners.',
      allocation: '88% Direct Rehousing Materials & Local Village Wages',
      searchPlaceholder: 'Search by Pakistan district, receipt, auditor...',
      disbursed: 'Disbursed (PKR)',
      beneficiaries: 'Beneficiary Families',
      auditor: 'Verification Entity',
      status: 'Status'
    },
    stories: {
      badge: 'Rural Pakistan Field Chronicles',
      title: 'From Drowned Silt to Elevated Dignity',
      description: 'Authentic accounts of rural agrarian families whose mud compounds collapsed in floods, and who now sleep safely above water level on raised stilt machans.',
      rebuildTime: 'Total Structural Rebuild Time',
      cattleSafe: 'Current Health & Livestock Status'
    },
    fieldApp: {
      badge: 'Offline-First Field Worker Terminal',
      title: 'Flood Relief Dispatch & Anti-Duplication Hub',
      desc: 'Operates 100% offline in disaster zones using IndexedDB, Face ID hashes, P2P mesh sync, and SHA-256 tamper-proof blocks.',
      launchBtn: 'Launch Field Worker App Engine',
      offlineMode: 'Field Offline Mode (No Internet)',
      onlineMode: 'City Online Mode (Cloud Active)',
      reconcileBtn: 'Reconcile Cloud',
      activeTablet: 'Active Tablet Device',
      workerA: 'Worker A (Red Crescent)',
      workerB: 'Worker B (PDMA Mobile)'
    },
    footer: {
      desc: 'FloodAids Pakistan is a dedicated humanitarian disaster relief and flood-resilient rehousing foundation. We construct elevated bamboo and timber stilt homes for rural families displaced by monsoon floods across rural Pakistan.',
      quickLinks: 'Navigation Pages',
      fieldDesks: 'Pakistan Field Desks',
      subscribeTitle: 'Pakistan Flood Bulletins',
      subscribeDesc: 'Receive verified situation bulletins and monsoon water drainage reports from rural field coordinators.',
      subscribeBtn: 'Subscribe to Relief Updates',
      rights: '© 2026 FloodAids Pakistan Foundation. All rights reserved. Relief distributed strictly on merit without discrimination.'
    }
  },
  ur: {
    ribbon: {
      dispatch: 'پاکستان فیلڈ ایمرجنسی ڈسپیچ',
      hubs: 'سندھ، بلوچستان، جنوبی پنجاب اور کے پی کے میں 18 ایمرجنسی ریلیف مراکز فعال',
      partner: 'پی ڈی ایم اے اور پاکستان ہلالِ احمر فیلڈ پارٹنر',
      helpline: 'ٹول فری ہیلپ لائن: 1129'
    },
    nav: {
      home: 'ہوم پیج',
      achievements: 'کارنامے و کامیابیاں',
      zones: 'متاثرہ علاقے',
      shelters: 'مچان گھر و ماڈلز',
      ledger: 'مالی کھاتہ و آڈٹ',
      stories: 'متاثرین کی کہانیاں',
      fieldApp: 'فیلڈ ورکر ایپ',
      fieldAppBadge: 'آف لائن میش',
      requestAid: 'امداد کی درخواست',
      donatePKR: 'امداد دیں (روپے)',
      menu: 'مینو',
      menuTitle: 'ویب سائٹ کے صفحات و مینو',
      switchLang: 'English'
    },
    hero: {
      tag: 'پاکستان ایمرجنسی فلڈ ریلیف · دیہی آبادکاری اور چھت کی فراہمی',
      title: 'سیلاب سے متاثرہ پاکستان کے دیہی خاندانوں کے لیے اونچے اور محفوظ گھروں کی تعمیر۔',
      description: 'جب مون سون کی طوفانی بارشیں اور کوہِ سلیمان کے روڈ کوہی سیلاب آتے ہیں، تو دیہی علاقوں کے ہزاروں کچے مٹی کے مکانات منٹوں میں مٹی کا ڈھیر بن جاتے ہیں، اور کسان اپنے مال مویشیوں کے ساتھ سڑکوں اور نہری پشتوں پر بے آسرا ہو جاتے ہیں۔ فلڈ ایڈز پاکستان زمین سے 3 میٹر اونچے بانس اور لکڑی کے مچان گھر تیار کرتا ہے تاکہ بچوں، بزرگوں اور مویشیوں کو پانی کی سطح سے اوپر محفوظ رکھا جا سکے۔',
      stat1Val: '+48,200',
      stat1Label: 'دیہی افراد دوبارہ آباد',
      stat2Val: '8,450',
      stat2Label: 'بلند مچان گھر تعمیر',
      stat3Val: '100%',
      stat3Label: 'براہِ راست فیلڈ امداد',
      packageTitle: 'دیہی آبادکاری پیکیج منتخب کریں (پاکستانی روپے)',
      taxExempt: 'ایف بی آر سیکشن 61 کے تحت ٹیکس سے مستثنیٰ',
      tier1Title: '15,000 روپے',
      tier1Desc: '48 گھنٹے ہنگامی چھپر و ترپال کٹ',
      tier2Title: '65,000 روپے',
      tier2Desc: 'لکڑی کا بلند مچان پلیٹ فارم',
      tier3Title: '320,000 روپے',
      tier3Desc: 'مکمل بانس و لکڑی مچان گھر',
      customPlaceholder: 'دیگر رقم درج کریں (مثلاً 50,000 روپے)...',
      sponsorBtn: 'دیہی گھر اسپانسر کریں',
      displacedQuestion: 'کیا حالیہ بارشوں یا سیلاب سے آپ کا گھر تباہ ہوا ہے؟',
      requestRehousingBtn: 'مفت ہنگامی چھت کی درخواست دیں',
      caption: 'تصویر 1 — گوٹھ علی بخش، ضلع دادو، سندھ میں بانس کے بلند مچان گھر کی تیاری۔ فلڈ ایڈز آرکائیو۔'
    },
    achievements: {
      badge: 'فیلڈ کارنامے اور زمینی پیش رفت',
      title: 'پاکستان فلڈ ریلیف کے اہم کارنامے اور کامیابیاں',
      description: 'سندھ، بلوچستان، جنوبی پنجاب اور خیبر پختونخوا کے دیہی متاثرین کے لیے تعمیر کیے گئے اونچے گھر، پینے کا صاف پانی، اور بائیومیٹرک فیس آئی ڈی کے ذریعے بغیر انٹرنیٹ کے شفاف امداد کے تصدیق شدہ ریکارڈز۔',
      uploadBtn: 'نیا کارنامہ / فیلڈ رپورٹ اپ لوڈ کریں',
      statHavens: '8,450',
      statHavensLabel: 'بلند مچان گھر مکمل',
      statFamilies: '+48,200',
      statFamiliesLabel: 'دیہی افراد کو چھت فراہم',
      statWater: '3.2 ملین لیٹر',
      statWaterLabel: 'پینے کا صاف پانی فراہم',
      statPrevented: '1,420',
      statPreventedLabel: 'دوبارہ امداد کی کوششیں ناکام',
      filterAll: 'تمام کارنامے',
      filterShelter: 'گھر اور شیلٹرز',
      filterWater: 'صاف پانی پراجیکٹس',
      filterBiometric: 'بائیومیٹرک اور ٹیکنالوجی',
      filterRecognition: 'سرکاری اسناد اور آڈٹ',
      verifiedBy: 'تصدیق کنندہ',
      date: 'تاریخ',
      district: 'ضلع'
    },
    zones: {
      badge: 'پاکستان صوبائی ڈیزاسٹر ریڈار',
      title: 'پاکستان کے فعال سیلاب زدہ علاقے',
      description: 'سندھ، بلوچستان، جنوبی پنجاب اور کے پی کے کے دیہی زرعی علاقوں سے تازہ ترین زمینی صورتحال کی لائیو رپورٹ۔',
      filterAll: 'تمام صوبے',
      displacedLabel: 'بے گھر خاندان',
      katchaLabel: 'تباہ شدہ کچے مکانات',
      shelteredLabel: 'آبادکاری کی پیش رفت',
      cleanWaterLabel: 'صاف پانی کی فراہمی',
      groundAssessment: 'زمینی صورتحال کا تفصیلی جائزہ',
      urgentNeeds: 'علاقے میں فوری درکار اشیاء',
      sponsorZoneBtn: 'اس ضلع کے لیے مچان گھر اسپانسر کریں'
    },
    shelters: {
      badge: 'دیہی پاکستان کے لیے دیسی سیلاب انجینئرنگ',
      title: '3 مراحل پر مشتمل دیہی آبادکاری کا منصوبہ',
      description: 'روایتی کچے مکانات پانی لگنے سے گھل جاتے ہیں۔ فلڈ ایڈز کے انجینئرز نے پاکستان کی تاریخ کے سب سے بلند سیلابی پانی سے 3 میٹر اونچے بانس اور لکڑی کے مچان گھر ڈیزائن کیے ہیں۔',
      phase1: 'مرحلہ 1: 48 گھنٹے ہنگامی چھپر کٹ',
      phase2: 'مرحلہ 2: بلند بانس و لکڑی مچان گھر',
      phase3: 'مرحلہ 3: مستقل پکا اونچا مکان',
      buildTime: 'تعمیر کا وقت',
      lifespan: 'پائیداری و مدت',
      unitCost: 'لاگت (روپے)',
      materials: 'مقامی پاکستانی مٹیریل',
      features: 'حفاظتی و وقار کی خصوصیات',
      sponsorBtn: 'یہ مچان گھر اسپانسر کریں'
    },
    ledger: {
      badge: 'عوامی مالی احتساب اور مکمل شفافیت (پاکستان)',
      title: 'امدادی رقوم کی ترسیل اور سامان کا پبلک کھاتہ',
      description: 'فلڈ ایڈز کو عطیہ کیا جانے والا ہر ایک روپیہ پی ڈی ایم اے اور پاکستان ہلالِ احمر کے تصدیق شدہ ڈیلیوری واؤچرز اور بائیومیٹرک رسیدوں کے ساتھ منسلک ہے۔',
      allocation: '88% رقم براہِ راست گھروں کی لکڑی، بانس اور مقامی مزدوروں پر خرچ ہوتی ہے',
      searchPlaceholder: 'ضلع، رسید، یا آڈیٹر کے نام سے تلاش کریں...',
      disbursed: 'ادا شدہ رقم (روپے)',
      beneficiaries: 'مستفید ہونے والے خاندان',
      auditor: 'تصدیق کنندہ ادارہ',
      status: 'حالت'
    },
    stories: {
      badge: 'دیہی پاکستان کی زمینی داستانیں',
      title: 'ڈوبتی ہوئی مٹی سے بلندی اور وقار کا سفر',
      description: 'سیلاب سے متاثرہ غریب کسانوں اور خاندانوں کے سچے احوال جن کے کچے مکانات بہہ گئے اور اب وہ 3 میٹر اونچے مچان گھروں میں سکون سے سوتے ہیں۔',
      rebuildTime: 'تعمیر کی مدت',
      cattleSafe: 'مال مویشی اور صحت کی حالت'
    },
    fieldApp: {
      badge: 'آف لائن فیلڈ ورکر ٹرمینل و انجن',
      title: 'سیلاب ریلیف ڈسپیچ و انسدادِ نقل (اینٹی ڈپلیکیشن) مرکز',
      desc: 'بغیر انٹرنیٹ کے انڈیکسڈ ڈی بی (IndexedDB)، فیس آئی ڈی ہیشز، پی ٹو پی میش سنک، اور ایس ایچ اے 256 بلاک چین کے ساتھ کام کرتا ہے۔',
      launchBtn: 'فیلڈ ورکر ایپ انجن کھولیں',
      offlineMode: 'فیلڈ آف لائن موڈ (انٹرنیٹ بند)',
      onlineMode: 'آن لائن موڈ (کلاؤڈ فعال)',
      reconcileBtn: 'کلاؤڈ پر منتقل کریں',
      activeTablet: 'فعال فیلڈ ٹیبلٹ',
      workerA: 'ورکر اے (ہلالِ احمر)',
      workerB: 'ورکر بی (پی ڈی ایم اے)'
    },
    footer: {
      desc: 'فلڈ ایڈز پاکستان ایک رجسٹرڈ فلاحی ادارہ ہے جو سیلاب سے متاثرہ غریب دیہی عوام کو اونچے اور محفوظ مچان گھر فراہم کرتا ہے۔',
      quickLinks: 'ویب سائٹ کے صفحات',
      fieldDesks: 'پاکستان فیلڈ ڈیسک',
      subscribeTitle: 'پاکستان سیلاب بلیٹن',
      subscribeDesc: 'فیلڈ کوآرڈینیٹرز کی طرف سے پانی کی سطح اور امدادی کاموں کی تصدیق شدہ رپورٹس حاصل کریں۔',
      subscribeBtn: 'رپورٹس سبسکرائب کریں',
      rights: '© 2026 فلڈ ایڈز پاکستان فاؤنڈیشن۔ تمام حقوق محفوظ ہیں۔ امداد مکمل میرٹ پر بغیر کسی تفریق کے دی جاتی ہے۔'
    }
  }
};
