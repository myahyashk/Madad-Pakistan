import { ReliefZone, ShelterModel, LedgerItem, FamilyStory } from '../types/floodaids';

export const HERO_IMAGE = '/src/assets/images/hero_flood_relief_shelter_1790837231380.jpg';
export const MODULAR_HAVEN_IMAGE = '/src/assets/images/modular_flood_haven_1790837249768.jpg';
export const AID_DISTRIBUTION_IMAGE = '/src/assets/images/emergency_aid_distribution_1790837265797.jpg';
export const FAMILY_STORY_IMAGE = '/src/assets/images/family_rebuilt_home_story_1790837286335.jpg';

export const RELIEF_ZONES: ReliefZone[] = [
  {
    id: 'zone-dadu-sindh',
    name: 'Khairpur Nathan Shah & Mehar Basins',
    province: 'Sindh',
    district: 'Dadu',
    tehsil: 'K.N. Shah & Mehar',
    severity: 'Critical',
    waterLevelStatus: 'Standing water 1.8m, draining slowly towards Indus River',
    familiesDisplaced: 6840,
    katchaHomesDestroyed: 5920,
    sheltersDelivered: 3120,
    targetShelters: 6000,
    cleanWaterLiters: 650000,
    urgencyDescription: 'Breach of Main Nara Valley (MNV) drain inundated 68 rural goths (villages). Thousands of agricultural laborers and families stranded on canal ring embankments with zero overhead shelter.',
    leadCoordinator: 'Eng. Zulfiqar Jamali (PDMA Sindh / UN Field Partner)',
    lastUpdated: 'Updated 22 mins ago',
    activeNeeds: ['Elevated Bamboo Stilt Frames', 'Anti-Malaria Bedding Nets', 'Solar Lanterns with Charging', 'Water Purification Sachets']
  },
  {
    id: 'zone-sohbatpur-balochistan',
    name: 'Jaffarabad & Sohbatpur Plain Lowlands',
    province: 'Balochistan',
    district: 'Sohbatpur',
    tehsil: 'Sohbatpur & Usta Mohammad',
    severity: 'Critical',
    waterLevelStatus: 'Submerged saucer topography 1.4m',
    familiesDisplaced: 4950,
    katchaHomesDestroyed: 4310,
    sheltersDelivered: 2480,
    targetShelters: 4500,
    cleanWaterLiters: 480000,
    urgencyDescription: 'Water accumulation trapped in bowl-shaped flat agricultural terrain. Hundreds of katcha mud-brick dwellings collapsed completely. Severe shortage of dry elevated living decks.',
    leadCoordinator: 'Mir Dostain Jamaldini (PDMA Balochistan Liaison)',
    lastUpdated: 'Updated 45 mins ago',
    activeNeeds: ['Treated Timber Pilings', 'Corrugated Galvanized Iron Sheets', 'Livestock Feed Platforms', 'Snake Antivenom Supplies']
  },
  {
    id: 'zone-rajanpur-punjab',
    name: 'Fazilpur & Jampur Hill Torrent Belt',
    province: 'South Punjab',
    district: 'Rajanpur',
    tehsil: 'Jampur & Rojhan',
    severity: 'Severe',
    waterLevelStatus: 'Hill torrent (Rod-Kohi) flash flood surge passed; silt deposit 0.8m',
    familiesDisplaced: 3820,
    katchaHomesDestroyed: 3140,
    sheltersDelivered: 2210,
    targetShelters: 3400,
    cleanWaterLiters: 390000,
    urgencyDescription: 'Violent water torrents rushing down Koh-e-Suleman mountains flattened traditional katcha mud compounds. Rural farmers lost stored wheat stocks and livestock shelters.',
    leadCoordinator: 'Malik Tariq Gorchani (District Disaster Cell)',
    lastUpdated: 'Updated 2 hours ago',
    activeNeeds: ['Elevated Stilt Machans', 'Emergency Dry Rations', 'Mobile Tubewell Filters', 'Rebar Concrete Column Kits']
  },
  {
    id: 'zone-nowshera-kp',
    name: 'Kabul & Swat River Confluence Delta',
    province: 'Khyber Pakhtunkhwa',
    district: 'Nowshera',
    tehsil: 'Nowshera & Pabbi',
    severity: 'Rebuilding',
    waterLevelStatus: 'River channel receded below danger mark',
    familiesDisplaced: 2890,
    katchaHomesDestroyed: 2150,
    sheltersDelivered: 1940,
    targetShelters: 2400,
    cleanWaterLiters: 310000,
    urgencyDescription: 'Riverbank erosion washed away riverine katcha hamlets. Transitioning families from relief camp schools into permanent raised timber and concrete homesteads on safe terraces.',
    leadCoordinator: 'Eng. Asad Khan Khattak (KP Relief Department)',
    lastUpdated: 'Updated 4 hours ago',
    activeNeeds: ['Foundation Cement Sacks', 'Treated Pine Timber Beams', 'Roof Rainwater Gutters', 'Masonry Toolsets']
  },
  {
    id: 'zone-lasbela-balochistan',
    name: 'Porali River Basin & Bela Valley',
    province: 'Balochistan',
    district: 'Lasbela',
    tehsil: 'Bela & Uthal',
    severity: 'Severe',
    waterLevelStatus: 'Seasonal nullah channels flooded',
    familiesDisplaced: 2180,
    katchaHomesDestroyed: 1890,
    sheltersDelivered: 1420,
    targetShelters: 2000,
    cleanWaterLiters: 260000,
    urgencyDescription: 'Remote pastoralist communities cut off due to washed-out earthen causeways. Urgent aerial and tractor-assisted transport of emergency chhappar and bamboo kits.',
    leadCoordinator: 'Abdul Qadir Sasoli (Red Crescent Balochistan)',
    lastUpdated: 'Updated 5 hours ago',
    activeNeeds: ['Heavy Canvas Tents', 'Bamboo Support Poles', 'Infant ORS Packets', 'Solar LED Lamps']
  },
  {
    id: 'zone-khairpur-sindh',
    name: 'Kot Diji & Kingri Date Palm Belt',
    province: 'Sindh',
    district: 'Khairpur',
    tehsil: 'Kot Diji & Sobhodero',
    severity: 'Stabilized',
    waterLevelStatus: 'Water pumped out from orchards; ground drying',
    familiesDisplaced: 1650,
    katchaHomesDestroyed: 1280,
    sheltersDelivered: 1220,
    targetShelters: 1280,
    cleanWaterLiters: 190000,
    urgencyDescription: 'Reconstruction of permanent raised burnt-brick cottages on elevated earthen mounds for agrarian tenant farm families.',
    leadCoordinator: 'Rasheed Wassan (Rural Development Guild)',
    lastUpdated: 'Updated 6 hours ago',
    activeNeeds: ['Burnt Clay Bricks', 'Roof Truss Brackets', 'Clean Water Hand-pumps']
  }
];

export const SHELTER_MODELS: ShelterModel[] = [
  {
    id: 'model-rapid-chhappar',
    name: '48-Hour Rapid Chhappar Kit',
    urduName: 'ہنگامی چھپر و ترپال پیکیج',
    tagline: 'Immediate dry envelope for families stranded on canal embankments and roadsides',
    timeToDeploy: '30 to 45 Minutes',
    lifespan: '4 to 6 Months',
    elevationAboveGround: '0.5m (Raised Wooden Bed & Pallet Frame)',
    capacity: 'Rural Joint Family (6 to 8 persons)',
    costPKR: 15000,
    materials: [
      'Heavy-duty 240 GSM UV-treated waterproof Pakistani tarpaulin',
      'Solid local bamboo structural ridgepoles and guy-stakes',
      'High-density thermal insulating EVA sleeping mats against damp ground',
      'Double-stitched fine mesh mosquito net (anti-malaria & dengue certified)'
    ],
    features: [
      'Can be erected by two villagers without specialized carpentry tools',
      'Wind-vented apex design prevents heat and humidity buildup in Sindh & Punjab summers',
      'Includes solar-powered LED emergency lamp with USB mobile phone charger',
      'High thermal underlay protects children and elderly from damp ground illness'
    ],
    suitableFor: 'Embankment encampments, highway edges, and immediate flood displacement sites'
  },
  {
    id: 'model-stilt-machan',
    name: 'Elevated Bamboo Stilt Haven (Machan)',
    urduName: 'بلند بانس و لکڑی مچان گھر',
    tagline: 'Raised rural transitional homestead built 3 meters above historic flood peaks',
    timeToDeploy: '24 to 36 Hours',
    lifespan: '3 to 5 Years',
    elevationAboveGround: '2.8m to 3.2m above high-flood contour',
    capacity: 'Family of 7 to 9 + small livestock pen',
    costPKR: 320000,
    materials: [
      'Pressure-treated termite-resistant local eucalyptus and deodar structural stilts',
      'Cross-braced seasoned moso bamboo flooring deck with non-slip cane slats',
      '26-gauge corrugated zinc-aluminum galvanized tin roofing sheets',
      'Deep augered soil anchors and galvanized steel hurricane tie brackets'
    ],
    features: [
      'Spacious elevated living veranda (baramda) keeping children safe above flood currents',
      'Secure elevated coop for livestock, preserving rural family livelihood assets',
      '200-liter rooftop rainwater harvesting barrel with dual-stage ceramic gravity filter',
      'Engineered to withstand 115 km/h monsoon winds and 2-meter deep flowing water'
    ],
    suitableFor: 'Riverine katcha areas, low-lying haors, and flat agricultural flood basins across Pakistan'
  },
  {
    id: 'model-permanent-pakka',
    name: 'Resilient Pakka Raised Cottage',
    urduName: 'مستقل پکا اونچا مکان',
    tagline: 'Permanent flood-proof homestead on reinforced concrete friction piles',
    timeToDeploy: '12 to 14 Days',
    lifespan: '30+ Years',
    elevationAboveGround: '3.5m reinforced concrete pilings with deep footings',
    capacity: 'Multi-generational rural family (up to 12 persons)',
    costPKR: 850000,
    materials: [
      'Cast-in-place reinforced concrete columns (RCC) with epoxy-coated steel rebar',
      'Kiln-dried hardwood structural truss with anti-fungal treatment',
      'Lime-stabilized compressed earth and burnt clay brick walls',
      '400W monocrystalline rooftop solar panel system with dry battery backup'
    ],
    features: [
      'Permanent ownership deed registered directly in the name of the female head of household',
      'Elevated twin-pit sanitary dry-composting latrine preventing ground water contamination',
      'Built in partnership with village youth guilds, providing paid local apprenticeship wages',
      'Tested and certified by Pakistan Council of Research in Water Resources (PCRWR)'
    ],
    suitableFor: 'Permanent village reconstruction on community safety plateaus and de-notified flood zones'
  }
];

export const TRANSPARENT_LEDGER: LedgerItem[] = [
  {
    id: 'PK-FTS-2026-9104',
    date: '2026-09-29',
    zone: 'Dadu & Mehar Basin',
    province: 'Sindh',
    category: 'Shelter Materials',
    amountPKR: 4850000,
    beneficiaryFamilies: 15,
    verifiedBy: 'PDMA Sindh & Pakistan Red Crescent Society Joint Audit',
    receiptHash: '0x7e8b91a2...c44d',
    status: 'Delivered On-Site'
  },
  {
    id: 'PK-FTS-2026-9082',
    date: '2026-09-27',
    zone: 'Sohbatpur & Jaffarabad',
    province: 'Balochistan',
    category: 'Water Purification',
    amountPKR: 1950000,
    beneficiaryFamilies: 260,
    verifiedBy: 'Al-Khidmat & Edhi Disaster Field Registry #781',
    receiptHash: '0x3a91f56b...8e12',
    status: 'Delivered On-Site'
  },
  {
    id: 'PK-FTS-2026-9041',
    date: '2026-09-25',
    zone: 'Rajanpur & Fazilpur',
    province: 'South Punjab',
    category: 'Direct Family Cash Grant',
    amountPKR: 3600000,
    beneficiaryFamilies: 120,
    verifiedBy: 'JazzCash / Raast Verified Biometric Disbursement Node',
    receiptHash: '0x99c2d4ea...1b77',
    status: 'Delivered On-Site'
  },
  {
    id: 'PK-FTS-2026-8995',
    date: '2026-09-23',
    zone: 'Swat & Nowshera Delta',
    province: 'Khyber Pakhtunkhwa',
    category: 'Shelter Materials',
    amountPKR: 6400000,
    beneficiaryFamilies: 20,
    verifiedBy: 'KP Provincial Disaster Cell Field Verification Certificate #504',
    receiptHash: '0x5c77e110...2f34',
    status: 'Delivered On-Site'
  },
  {
    id: 'PK-FTS-2026-8930',
    date: '2026-09-20',
    zone: 'Lasbela & Bela',
    province: 'Balochistan',
    category: 'Emergency Medical Kits',
    amountPKR: 1450000,
    beneficiaryFamilies: 310,
    verifiedBy: 'District Health Officer (DHO) Lasbela Registry',
    receiptHash: '0x15f8a002...93aa',
    status: 'Delivered On-Site'
  }
];

export const FAMILY_STORIES: FamilyStory[] = [
  {
    id: 'story-mai-jameela',
    familyName: 'Mai Jameela & Family',
    location: 'Mehar Taluka, Dadu',
    gothVillage: 'Goth Ali Bux Solangi',
    district: 'Dadu',
    province: 'Sindh',
    membersCount: 8,
    disasterDate: 'August 18, 2026',
    story: 'When the FP Bund canal levee cracked in the dead of night, the black torrent slammed through the village in twenty minutes. Mai Jameela clutched her 3-year-old grandson while her sons guided their two milking buffaloes through chest-deep water. Their katcha mud-walled home vanished completely under three feet of silt. For eleven days, the family lived under a ragged cloth on the burning highway embankment. Madad Pakistan dispatched treated bamboo and raised stilt frames within 48 hours.',
    quote: '"My grandchildren no longer wake up screaming that the flood is rising to their throats. We are three meters in the air on our sturdy stilt machan, and our buffaloes are safe on the raised earthen ramp beside us."',
    homeStatus: 'Rehoused in Stilt Machan',
    rebuildTimeDays: 3,
    image: FAMILY_STORY_IMAGE
  },
  {
    id: 'story-ghulam-rasool',
    familyName: 'Ghulam Rasool & Sons',
    location: 'Fazilpur Tehsil, Rajanpur',
    gothVillage: 'Basti Rind',
    district: 'Rajanpur',
    province: 'South Punjab',
    membersCount: 7,
    disasterDate: 'August 02, 2026',
    story: 'The ferocious flash hill torrent (Rod-Kohi) roared down from the Koh-e-Suleman range without warning, tearing down 40 mud compounds in Basti Rind. Ghulam Rasool lost his entire stored wheat crop and seeds for next season. Madad Pakistan deployed the 48-Hour Rapid Chhappar Kit followed by the Elevated Stilt Haven. Today, the family is dry and safe with clean drinking water provided by the solar filtration unit.',
    quote: '"In our village, when mud houses dissolve, you lose your dignity and your life. Having an elevated wooden home that stands above the mountain torrents gives our family our honor back."',
    homeStatus: 'Permanent Pakka Raised Cottage',
    rebuildTimeDays: 9,
    image: AID_DISTRIBUTION_IMAGE
  }
];
