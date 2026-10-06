import { Quest } from '../types';

export const PIRATE_QUESTS: Quest[] = [
  {
    id: 'fizzbuzz-buccaneer',
    title: 'The Cannon Salutes (Pirate FizzBuzz)',
    difficulty: 'Easy',
    bounty: 50,
    xp: 80,
    description: 'Output "Ahoy" if divisible by 3, "Matey" if divisible by 5, "Ahoy Matey!" if divisible by both 3 and 5, or the number as a string otherwise.',
    story: 'Before boarding a merchant vessel, Captain Redbeard requires his gunners to shout the battle cries in cadence. Help the crew get the cadence right!',
    starterCode: `function pirateSalute(num) {
  // Return "Ahoy", "Matey", "Ahoy Matey!", or String(num)
  if (num % 15 === 0) return "Ahoy Matey!";
  if (num % 3 === 0) return "Ahoy";
  if (num % 5 === 0) return "Matey";
  return String(num);
}`,
    solutionHint: 'Check divisible by 15 first (or both 3 and 5), then 3, then 5, else return String(num).',
    testCases: [
      { input: [3], expected: 'Ahoy', description: 'Divisible by 3 returns "Ahoy"' },
      { input: [5], expected: 'Matey', description: 'Divisible by 5 returns "Matey"' },
      { input: [15], expected: 'Ahoy Matey!', description: 'Divisible by 15 returns "Ahoy Matey!"' },
      { input: [30], expected: 'Ahoy Matey!', description: 'Divisible by 30 returns "Ahoy Matey!"' },
      { input: [7], expected: '7', description: 'Non-matching number returns string of number' },
    ]
  },
  {
    id: 'kraken-tentacles',
    title: 'Sever the Kraken Tentacles',
    difficulty: 'Easy',
    bounty: 75,
    xp: 120,
    description: 'Reverse an array of strings representing tentacles from tip to base, returning the reversed array.',
    story: 'A giant Kraken has wrapped its tentacles around your galleon! The only way to repel it is to slice through the tentacles in reverse order from tip to head.',
    starterCode: `function severTentacles(tentacles) {
  // Reverse the array of tentacles and return it
  const result = [];
  for (let i = tentacles.length - 1; i >= 0; i--) {
    result.push(tentacles[i]);
  }
  return result;
}`,
    solutionHint: 'Iterate backwards through the array or swap elements from ends towards the middle.',
    testCases: [
      { input: [['hook', 'sucker', 'beak']], expected: ['beak', 'sucker', 'hook'], description: 'Reverse 3 elements' },
      { input: [['north', 'east', 'south', 'west']], expected: ['west', 'south', 'east', 'north'], description: 'Reverse compass points' },
      { input: [['solo']], expected: ['solo'], description: 'Single element remains same' },
      { input: [[]], expected: [], description: 'Empty array returns empty array' },
    ]
  },
  {
    id: 'blackbeard-cipher',
    title: "Blackbeard's Secret Cipher",
    difficulty: 'Medium',
    bounty: 150,
    xp: 220,
    description: 'Encrypt a string by shifting each alphabetic letter by a given number of positions (Caesar cipher). Case must be preserved; non-alphabetic characters remain untouched.',
    story: 'Blackbeard left an encrypted treasure map in his bottle. Write an algorithm to encode messages with a custom shift key so rival privateers cannot read them.',
    starterCode: `function encryptMap(message, shift) {
  // Shift uppercase [A-Z] and lowercase [a-z] letters by shift amount
  // Wrap around using modulo 26. Leave symbols and spaces intact.
  return message.split('').map(char => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      return String.fromCharCode(((code - 65 + shift) % 26 + 26) % 26 + 65);
    }
    if (code >= 97 && code <= 122) {
      return String.fromCharCode(((code - 97 + shift) % 26 + 26) % 26 + 97);
    }
    return char;
  }).join('');
}`,
    solutionHint: 'Use charCodeAt to get ASCII. Check ranges 65-90 for uppercase and 97-122 for lowercase. Handle negative shifts with ((val % 26) + 26) % 26.',
    testCases: [
      { input: ['TREASURE', 3], expected: 'WUHDVXUH', description: 'Shift uppercase letters by 3' },
      { input: ['ahoy matey!', 1], expected: 'bipz nbufz!', description: 'Shift lowercase and preserve spaces & exclamation' },
      { input: ['Port Royal 1715', 5], expected: 'Utwy Wtdfq 1715', description: 'Preserve numbers and casing' },
      { input: ['Z', 1], expected: 'A', description: 'Wrap from Z to A' },
    ]
  },
  {
    id: 'dead-mans-shoals',
    title: "Navigating Dead Man's Shoals",
    difficulty: 'Medium',
    bounty: 180,
    xp: 260,
    description: 'Perform a binary search on a sorted array of depths to find the index of the specified safe channel target depth. Return -1 if not found.',
    story: 'Your ship is sailing through treacherous foggy reefs. Your navigator keeps a sorted log of underwater channel depths. Search through the soundings in O(log n) time to find safe passage.',
    starterCode: `function findSafeChannel(depths, target) {
  let low = 0;
  let high = depths.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (depths[mid] === target) {
      return mid;
    } else if (depths[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
}`,
    solutionHint: 'Use standard binary search with low and high pointers, checking mid index each step.',
    testCases: [
      { input: [[5, 12, 23, 45, 67, 89, 102], 45], expected: 3, description: 'Find element in middle of array' },
      { input: [[5, 12, 23, 45, 67, 89, 102], 5], expected: 0, description: 'Find first element' },
      { input: [[5, 12, 23, 45, 67, 89, 102], 102], expected: 6, description: 'Find last element' },
      { input: [[5, 12, 23, 45, 67, 89, 102], 50], expected: -1, description: 'Return -1 when depth is not present' },
    ]
  },
  {
    id: 'loot-apportioner',
    title: "The Quartermaster's Booty Split",
    difficulty: 'Hard',
    bounty: 250,
    xp: 350,
    description: 'Given an array of stolen chest coin values and number of crew members, return an object { perCrewMember: number, captainCut: number } where total coins are split equally among crew, and remainder goes into the captainCut.',
    story: 'Pirate code dictates that all plunder is pooled. The total doubloons are divided equally amongst all crew hands, and whatever spare coins cannot be split cleanly go straight into the Captain\'s secret locker.',
    starterCode: `function splitPlunder(chests, crewCount) {
  if (crewCount <= 0) return { perCrewMember: 0, captainCut: 0 };
  const total = chests.reduce((acc, curr) => acc + curr, 0);
  const perCrew = Math.floor(total / crewCount);
  const cut = total % crewCount;
  return {
    perCrewMember: perCrew,
    captainCut: cut
  };
}`,
    solutionHint: 'Sum the chests array, use Math.floor(total / crewCount) and total % crewCount.',
    testCases: [
      { input: [[100, 250, 50], 10], expected: { perCrewMember: 40, captainCut: 0 }, description: 'Clean split among 10 crew members' },
      { input: [[100, 205, 33], 7], expected: { perCrewMember: 48, captainCut: 2 }, description: 'Split with captain remainder' },
      { input: [[0, 50], 3], expected: { perCrewMember: 16, captainCut: 2 }, description: 'Handle low coin counts' },
    ]
  },
  {
    id: 'escape-sql-siren',
    title: 'Escape the SQL Siren Injection',
    difficulty: 'Legendary',
    bounty: 350,
    xp: 500,
    description: 'Sanitize a pirate ship log search query by escaping single quotes (\'), double quotes ("), semicolons (;), dashes (--), and stripping dangerous SQL keywords: DROP, DELETE, INSERT, UPDATE, UNION (case-insensitive). Return clean string.',
    story: 'A rogue naval hacker is singing SQL injection payloads through the radio waves hoping to drop your ship\'s inventory table! Purge the dangerous tokens before queries hit the database!',
    starterCode: `function sanitizePlunderQuery(query) {
  // 1. Remove dangerous keywords (case-insensitive): DROP, DELETE, INSERT, UPDATE, UNION
  // 2. Escape single quotes by doubling them ''
  // 3. Remove -- comments and semicolons ;
  let clean = query.replace(/\\b(drop|delete|insert|update|union)\\b/gi, '');
  clean = clean.replace(/;/g, '');
  clean = clean.replace(/--/g, '');
  clean = clean.replace(/'/g, "''");
  return clean.trim();
}`,
    solutionHint: 'Use regex with word boundaries \\b to eliminate keywords, remove comment marks and semicolons, and escape quotes.',
    testCases: [
      { input: ["' OR 1=1; -- DROP TABLE ships;"], expected: "'' OR 1=1   TABLE ships", description: 'Neutralize classic DROP and comment injection' },
      { input: ["SELECT * FROM booty WHERE name = 'Gold';"], expected: "SELECT * FROM booty WHERE name = ''Gold''", description: 'Escape legitimate quotes and remove semicolon' },
      { input: ["Blackbeard DELETE"], expected: "Blackbeard", description: 'Strip DELETE keyword' },
    ]
  }
];
