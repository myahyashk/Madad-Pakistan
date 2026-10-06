import { create } from 'zustand';
import { ReliefOrganizationType } from '../types/relief';

export type AppRole = 'admin' | 'partner' | 'team';

export interface AuthUser {
  email: string;
  role: AppRole;
  organizationType?: ReliefOrganizationType;
  organizationId?: string;
  organizationName: string;
  teamId?: string;
  areaId?: string;
}

export const DEMO_ACCOUNTS: Array<AuthUser & { password: string }> = [
  { email: 'admin@madadpk.local', password: 'admin123', role: 'admin', organizationName: 'Madad Pakistan Admin' },
  { email: 'ngo@prcs.local', password: 'ngo123', role: 'partner', organizationType: 'ngo', organizationId: 'prcs', organizationName: 'Pakistan Red Crescent Society' },
  { email: 'government@pdma.local', password: 'gov123', role: 'partner', organizationType: 'government', organizationId: 'pdma-sindh', organizationName: 'PDMA Sindh Relief Scheme' },
  { email: 'donor@community.local', password: 'donor123', role: 'partner', organizationType: 'private_donor', organizationId: 'community-donors', organizationName: 'Community Private Donors' }
  ,{ email: 'team.dadu@prcs.local', password: 'team123', role: 'team', organizationType: 'ngo', organizationId: 'prcs', organizationName: 'PRCS Dadu Field Team', teamId: 'team-dadu-a', areaId: 'dadu-mehar' }
];

interface AuthState {
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const savedUser = typeof localStorage !== 'undefined' ? localStorage.getItem('floodaids-demo-session') : null;

export const useAuthStore = create<AuthState>((set) => ({
  user: savedUser ? JSON.parse(savedUser) as AuthUser : null,
  login: (email, password) => {
    const account = DEMO_ACCOUNTS.find(item => item.email === email.trim().toLowerCase() && item.password === password);
    if (!account) return false;
    const { password: _password, ...user } = account;
    localStorage.setItem('floodaids-demo-session', JSON.stringify(user));
    set({ user });
    return true;
  },
  logout: () => {
    localStorage.removeItem('floodaids-demo-session');
    set({ user: null });
  }
}));