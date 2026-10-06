export interface ReliefZone {
  id: string;
  name: string;
  province: 'Sindh' | 'Balochistan' | 'South Punjab' | 'Khyber Pakhtunkhwa' | 'Gilgit-Baltistan';
  district: string;
  tehsil: string;
  severity: 'Critical' | 'Severe' | 'Rebuilding' | 'Stabilized';
  waterLevelStatus: string;
  familiesDisplaced: number;
  katchaHomesDestroyed: number;
  sheltersDelivered: number;
  targetShelters: number;
  cleanWaterLiters: number;
  urgencyDescription: string;
  leadCoordinator: string;
  lastUpdated: string;
  activeNeeds: string[];
}

export interface ShelterModel {
  id: string;
  name: string;
  urduName: string;
  tagline: string;
  timeToDeploy: string;
  lifespan: string;
  elevationAboveGround: string;
  capacity: string;
  costPKR: number;
  materials: string[];
  features: string[];
  suitableFor: string;
}

export interface LedgerItem {
  id: string;
  date: string;
  zone: string;
  province: string;
  category: 'Shelter Materials' | 'Water Purification' | 'Field Logistics' | 'Direct Family Cash Grant' | 'Emergency Medical Kits';
  amountPKR: number;
  beneficiaryFamilies: number;
  verifiedBy: string;
  receiptHash: string;
  status: 'Verified Dispatched' | 'Delivered On-Site' | 'Under Audit';
}

export interface FamilyStory {
  id: string;
  familyName: string;
  location: string;
  gothVillage: string;
  district: string;
  province: string;
  membersCount: number;
  disasterDate: string;
  story: string;
  quote: string;
  homeStatus: 'Rehoused in Stilt Machan' | 'Transitional Bamboo Haven' | 'Permanent Pakka Raised Cottage';
  rebuildTimeDays: number;
  image: string;
}

export interface AidApplication {
  id: string;
  applicantName: string;
  cnic: string;
  phone: string;
  province: 'Sindh' | 'Balochistan' | 'South Punjab' | 'Khyber Pakhtunkhwa' | 'Gilgit-Baltistan';
  district: string;
  tehsil: string;
  gothVillage: string;
  familyMembers: number;
  childrenCount: number;
  elderlyCount: number;
  livestockCount: number;
  damageLevel: 'Completely Submerged Katcha Home' | 'Washed Away by Hill Torrent' | 'Uninhabitable Mud Wall Collapse';
  immediateNeeds: string[];
  notes?: string;
  status: 'Registered' | 'Assigned to Local Field Scout' | 'Dispatch Approved';
  submittedAt: string;
}
