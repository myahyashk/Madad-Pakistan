import { OfflineBeneficiaryRecord } from '../engine/offlineDb';
import { DonorContribution, TeamFieldSubmission } from '../types/relief';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '');
const MOCK_STORAGE_KEY = 'floodaids-demo-beneficiaries-v1';
const MOCK_DONATIONS_KEY = 'floodaids-demo-donations-v1';
const MOCK_TEAM_SUBMISSIONS_KEY = 'floodaids-demo-team-submissions-v1';

export const isReliefBackendConfigured = true;

const DEMO_RECORDS: OfflineBeneficiaryRecord[] = [
  {
    recordId: 'DEMO-PRCS-001', applicantName: 'Mai Jameela Solangi', cnicOrToken: 'DEMO-CNIC-001', hasPhysicalCnic: true,
    phone: '0300-0000001', province: 'Sindh', district: 'Dadu', tehsil: 'Mehar', gothVillage: 'Goth Ali Bux', familyMembers: 7,
    childrenCount: 3, elderlyCount: 1, livestockCount: 2, damageLevel: 'Completely Submerged Katcha Home',
    immediateNeeds: ['Shelter kit', 'Clean water'], biometricFaceHash: 'PHASH_DEMO_001', biometricVectorDigest: 'DEMO_VECTOR_001',
    aidPackageAllocated: '48-Hour Rapid Chhappar Kit', aidDisbursed: true, disbursedAt: '2026-09-30T08:00:00.000Z',
    disbursedByWorkerId: 'SCOUT-082', disbursedByWorkerName: 'Eng. Zulfiqar Jamali', disbursedByWorkerOrg: 'PRCS', blockIndex: 1,
    blockHash: 'DEMO_BLOCK_001', previousBlockHash: '0'.repeat(64), syncStatus: 'synced', createdAt: '2026-09-30T08:00:00.000Z', updatedAt: '2026-09-30T08:00:00.000Z',
    organizationType: 'ngo', organizationId: 'prcs', teamId: 'team-dadu-a', areaId: 'dadu-mehar', householdStatus: 'destroyed', verificationStatus: 'verified'
  },
  {
    recordId: 'DEMO-PDMA-002', applicantName: 'Haji Ghulam Rasool', cnicOrToken: 'DEMO-CNIC-002', hasPhysicalCnic: false,
    phone: '0300-0000002', province: 'Sindh', district: 'Dadu', tehsil: 'Mehar', gothVillage: 'Goth Sain Dad', familyMembers: 5,
    childrenCount: 2, elderlyCount: 2, livestockCount: 1, damageLevel: 'Uninhabitable Mud Wall Collapse', immediateNeeds: ['Cash grant', 'Medicine'],
    biometricFaceHash: 'PHASH_DEMO_002', biometricVectorDigest: 'DEMO_VECTOR_002', aidPackageAllocated: 'Emergency Cash Grant', aidDisbursed: true,
    disbursedAt: '2026-09-29T10:30:00.000Z', disbursedByWorkerId: 'SCOUT-114', disbursedByWorkerName: 'Dr. Tariq Gorchani', disbursedByWorkerOrg: 'PDMA Sindh', blockIndex: 2,
    blockHash: 'DEMO_BLOCK_002', previousBlockHash: 'DEMO_BLOCK_001', syncStatus: 'synced', createdAt: '2026-09-29T10:30:00.000Z', updatedAt: '2026-09-29T10:30:00.000Z',
    organizationType: 'government', organizationId: 'pdma-sindh', teamId: 'team-dadu-b', areaId: 'dadu-mehar', householdStatus: 'temporarily_displaced', verificationStatus: 'needs_review'
  },
  {
    recordId: 'DEMO-DONOR-003', applicantName: 'Shazia Bibi Magsi', cnicOrToken: 'DEMO-CNIC-003', hasPhysicalCnic: true,
    phone: '0300-0000003', province: 'Balochistan', district: 'Sohbatpur', tehsil: 'Sohbatpur', gothVillage: 'Goth Magsi', familyMembers: 6,
    childrenCount: 4, elderlyCount: 0, livestockCount: 3, damageLevel: 'Washed Away by Hill Torrent', immediateNeeds: ['Raised shelter', 'Livestock feed'],
    biometricFaceHash: 'PHASH_DEMO_003', biometricVectorDigest: 'DEMO_VECTOR_003', aidPackageAllocated: 'Elevated Stilt Haven Sponsorship', aidDisbursed: true,
    disbursedAt: '2026-09-28T12:00:00.000Z', disbursedByWorkerId: 'DEMO-DONOR', disbursedByWorkerName: 'Private Donor Desk', disbursedByWorkerOrg: 'Community Donors', blockIndex: 3,
    blockHash: 'DEMO_BLOCK_003', previousBlockHash: 'DEMO_BLOCK_002', syncStatus: 'synced', createdAt: '2026-09-28T12:00:00.000Z', updatedAt: '2026-09-28T12:00:00.000Z',
    organizationType: 'private_donor', organizationId: 'community-donors', teamId: 'team-sohbatpur-a', areaId: 'sohbatpur-sohbatpur', householdStatus: 'occupied', verificationStatus: 'pending'
  }
];

function mockRecords(): OfflineBeneficiaryRecord[] {
  if (typeof localStorage === 'undefined') return [...DEMO_RECORDS];
  const stored = localStorage.getItem(MOCK_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(DEMO_RECORDS));
    return [...DEMO_RECORDS];
  }
  try { return JSON.parse(stored) as OfflineBeneficiaryRecord[]; } catch { return [...DEMO_RECORDS]; }
}

function saveMockRecords(records: OfflineBeneficiaryRecord[]) {
  localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(records));
}

const DEMO_DONATIONS: DonorContribution[] = [
  { id: 'DONATION-DEMO-001', donorOrganizationId: 'community-donors', donorEmail: 'donor@community.local', donorName: 'Community Private Donors', amountPKR: 65000, targetArea: 'Dadu / Mehar', purpose: 'shelter', status: 'allocated', createdAt: '2026-09-30T09:15:00.000Z' },
  { id: 'DONATION-DEMO-002', donorOrganizationId: 'community-donors', donorEmail: 'donor@community.local', donorName: 'Community Private Donors', amountPKR: 25000, targetArea: 'Sohbatpur', purpose: 'water', status: 'received', createdAt: '2026-09-28T14:00:00.000Z' }
];

function mockDonations(): DonorContribution[] {
  const stored = localStorage.getItem(MOCK_DONATIONS_KEY);
  if (!stored) {
    localStorage.setItem(MOCK_DONATIONS_KEY, JSON.stringify(DEMO_DONATIONS));
    return [...DEMO_DONATIONS];
  }
  try { return JSON.parse(stored) as DonorContribution[]; } catch { return [...DEMO_DONATIONS]; }
}

function mockTeamSubmissions(): TeamFieldSubmission[] {
  const stored = localStorage.getItem(MOCK_TEAM_SUBMISSIONS_KEY);
  if (!stored) {
    const seed: TeamFieldSubmission[] = [{ id: 'TEAM-DEMO-001', teamId: 'team-dadu-a', organizationId: 'prcs', areaId: 'dadu-mehar', submittedBy: 'team.dadu@prcs.local', type: 'survey', householdName: 'Mai Jameela Solangi', village: 'Goth Ali Bux', familyMembers: 7, homeStatus: 'destroyed', itemsProvided: 'Chhappar kit, clean water', notes: 'Follow-up visit required in 7 days.', createdAt: '2026-09-30T08:30:00.000Z' }];
    localStorage.setItem(MOCK_TEAM_SUBMISSIONS_KEY, JSON.stringify(seed));
    return seed;
  }
  try { return JSON.parse(stored) as TeamFieldSubmission[]; } catch { return []; }
}

async function request<T>(path: string, options: RequestInit): Promise<T> {
  if (!API_BASE_URL) throw new Error('mock');

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  });

  if (!response.ok) throw new Error(`Relief backend request failed (${response.status})`);
  return response.json() as Promise<T>;
}

export const reliefApi = {
  async syncBeneficiary(record: OfflineBeneficiaryRecord): Promise<void> {
    if (!API_BASE_URL) {
      const records = mockRecords().filter(item => item.recordId !== record.recordId);
      saveMockRecords([...records, { ...record, syncStatus: 'synced' }]);
      return;
    }
    await request('/api/beneficiaries', { method: 'POST', body: JSON.stringify(record) });
  },

  async getAdminBeneficiaries(): Promise<OfflineBeneficiaryRecord[]> {
    if (!API_BASE_URL) return mockRecords();
    return request<OfflineBeneficiaryRecord[]>('/api/admin/beneficiaries', { method: 'GET' });
  },

  async updateHouseholdStatus(recordId: string, householdStatus: string, verificationStatus: string): Promise<void> {
    if (!API_BASE_URL) {
      saveMockRecords(mockRecords().map(record => record.recordId === recordId ? { ...record, householdStatus: householdStatus as OfflineBeneficiaryRecord['householdStatus'], verificationStatus: verificationStatus as OfflineBeneficiaryRecord['verificationStatus'], updatedAt: new Date().toISOString() } : record));
      return;
    }
    await request(`/api/admin/beneficiaries/${recordId}/verification`, {
      method: 'PATCH',
      body: JSON.stringify({ householdStatus, verificationStatus })
    });
  },

  async getDonorContributions(organizationId: string): Promise<DonorContribution[]> {
    if (!API_BASE_URL) return mockDonations().filter(item => item.donorOrganizationId === organizationId);
    return request<DonorContribution[]>(`/api/donors/${organizationId}/contributions`, { method: 'GET' });
  },

  async createDonorContribution(contribution: Omit<DonorContribution, 'id' | 'createdAt' | 'status'>): Promise<DonorContribution> {
    if (!API_BASE_URL) {
      const created: DonorContribution = { ...contribution, id: `DONATION-${Date.now()}`, status: 'pledged', createdAt: new Date().toISOString() };
      saveMockRecords(mockRecords());
      const donations = [created, ...mockDonations()];
      localStorage.setItem(MOCK_DONATIONS_KEY, JSON.stringify(donations));
      return created;
    }
    return request<DonorContribution>('/api/donations', { method: 'POST', body: JSON.stringify(contribution) });
  },

  async getTeamSubmissions(teamId: string): Promise<TeamFieldSubmission[]> {
    if (!API_BASE_URL) return mockTeamSubmissions().filter(item => item.teamId === teamId);
    return request<TeamFieldSubmission[]>(`/api/teams/${teamId}/submissions`, { method: 'GET' });
  },

  async createTeamSubmission(submission: Omit<TeamFieldSubmission, 'id' | 'createdAt'>): Promise<TeamFieldSubmission> {
    if (!API_BASE_URL) {
      const created = { ...submission, id: `TEAM-${Date.now()}`, createdAt: new Date().toISOString() };
      localStorage.setItem(MOCK_TEAM_SUBMISSIONS_KEY, JSON.stringify([created, ...mockTeamSubmissions()]));
      return created;
    }
    return request<TeamFieldSubmission>('/api/team-submissions', { method: 'POST', body: JSON.stringify(submission) });
  }
};