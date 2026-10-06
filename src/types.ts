export type ActiveTab = 'chest' | 'quests' | 'vault' | 'log';

export type ChestToolId = 'json' | 'regex' | 'crypto' | 'git' | 'cron' | 'api' | 'colors';

export interface Quest {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legendary';
  bounty: number; // Gold doubloons
  xp: number;
  description: string;
  story: string;
  starterCode: string;
  solutionHint: string;
  testCases: {
    input: any[];
    expected: any;
    description: string;
  }[];
}

export interface PlunderResource {
  id: string;
  title: string;
  category: 'apis' | 'cheatsheets' | 'tools' | 'libraries';
  description: string;
  url: string;
  tags: string[];
  isCustom?: boolean;
}

export interface PirateProfile {
  name: string;
  avatarSeed: string;
  gold: number;
  xp: number;
  completedQuests: string[];
  unlockedTools: string[];
  customBookmarks: PlunderResource[];
}

export interface PirateRank {
  title: string;
  minXp: number;
  badge: string;
  description: string;
}

export const PIRATE_RANKS: PirateRank[] = [
  { title: 'Cabin Swab', minXp: 0, badge: '🧹', description: 'Fresh on deck. Learn not to drop the semicolon.' },
  { title: 'Deckhand Coder', minXp: 100, badge: '⚓', description: 'Can splice arrays and tie git branches.' },
  { title: 'Artillery Gunner', minXp: 300, badge: '💣', description: 'Fires queries that sink database bottlenecks.' },
  { title: 'Master Navigator', minXp: 600, badge: '🧭', description: 'Can chart a course through messy legacy repos.' },
  { title: 'Quartermaster', minXp: 1200, badge: '🗝️', description: 'Controls the keys and distributes the server bounties.' },
  { title: 'Dread Captain', minXp: 2200, badge: '⚔️', description: 'Commands the fleet of distributed microservices.' },
  { title: 'Pirate King of Code', minXp: 3800, badge: '👑', description: 'Legend of the Seven Seas of Software.' },
];
