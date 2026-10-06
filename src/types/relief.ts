export type ReliefOrganizationType = 'ngo' | 'government' | 'private_donor';

export type HouseholdStatus = 'occupied' | 'destroyed' | 'temporarily_displaced' | 'unknown';

export type VerificationStatus = 'pending' | 'verified' | 'rejected' | 'needs_review';

export const ORGANIZATION_LABELS: Record<ReliefOrganizationType, string> = {
  ngo: 'NGO / Relief Partner',
  government: 'Government Scheme',
  private_donor: 'Private Donor'
};

export interface DonorContribution {
  id: string;
  donorOrganizationId: string;
  donorEmail: string;
  donorName: string;
  amountPKR: number;
  targetArea: string;
  purpose: 'shelter' | 'water' | 'food' | 'medical';
  status: 'pledged' | 'received' | 'allocated';
  createdAt: string;
}

export interface TeamFieldSubmission {
  id: string;
  teamId: string;
  organizationId: string;
  areaId: string;
  submittedBy: string;
  type: 'survey' | 'aid_provided';
  householdName: string;
  village: string;
  familyMembers: number;
  homeStatus: HouseholdStatus;
  itemsProvided: string;
  notes: string;
  createdAt: string;
}