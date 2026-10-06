export interface TeamDirectoryEntry {
  teamId: string;
  portalName: string;
  organizationName: string;
  contactEmail: string;
  contactPhone: string;
  area: string;
  capabilities: string[];
  currentTask: string;
}

export interface DonorDirectoryEntry {
  portalName: string;
  organizationName: string;
  contactEmail: string;
  contactPhone: string;
  targetAreas: string[];
  contributionFocus: string;
}

export const TEAM_DIRECTORY: TeamDirectoryEntry[] = [
  { teamId: 'team-dadu-a', portalName: 'PRCS Dadu Field Team', organizationName: 'Pakistan Red Crescent Society', contactEmail: 'prcs.dadu.team.demo@gmail.com', contactPhone: '+92 300 111 8201', area: 'Dadu / Mehar', capabilities: ['Household survey', 'Biometric registration', 'Shelter kit delivery'], currentTask: 'Household verification round 2' },
  { teamId: 'team-dadu-b', portalName: 'PDMA Mehar Mobile Desk', organizationName: 'PDMA Sindh Relief Scheme', contactEmail: 'pdma.mehr.mobile.demo@gmail.com', contactPhone: '+92 301 222 1140', area: 'Dadu / Mehar', capabilities: ['Government scheme checks', 'CNIC validation', 'Cash grant approval'], currentTask: 'Pending cash grant verification' },
  { teamId: 'team-sohbatpur-a', portalName: 'Sohbatpur Shelter Dispatch', organizationName: 'Community Donor Operations', contactEmail: 'sohbatpur.dispatch.demo@gmail.com', contactPhone: '+92 302 333 7710', area: 'Sohbatpur', capabilities: ['Shelter sponsorship', 'Livestock support', 'Delivery confirmation'], currentTask: 'Stilt haven delivery confirmation' }
];

export const DONOR_DIRECTORY: DonorDirectoryEntry[] = [
  { portalName: 'Community Private Donors', organizationName: 'Community Private Donors', contactEmail: 'community.donors.demo@gmail.com', contactPhone: '+92 303 444 6500', targetAreas: ['Dadu / Mehar', 'Sohbatpur'], contributionFocus: 'Shelter and clean water' }
];