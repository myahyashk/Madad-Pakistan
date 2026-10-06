import { create } from 'zustand';

interface ImageState {
  heroImage: string;
  havenImage: string;
  distributionImage: string;
  storyImage: string;
  setHeroImage: (url: string) => void;
  setHavenImage: (url: string) => void;
  setDistributionImage: (url: string) => void;
  setStoryImage: (url: string) => void;
  resetDefaultImages: () => void;
}

const DEFAULT_HERO = '/src/assets/images/hero_flood_relief_shelter_1790837231380.jpg';
const DEFAULT_HAVEN = '/src/assets/images/modular_flood_haven_1790837249768.jpg';
const DEFAULT_DISTRIBUTION = '/src/assets/images/emergency_aid_distribution_1790837265797.jpg';
const DEFAULT_STORY = '/src/assets/images/family_rebuilt_home_story_1790837286335.jpg';

export const useImageStore = create<ImageState>((set) => {
  const savedHero = typeof window !== 'undefined' ? localStorage.getItem('floodaids_img_hero') : null;
  const savedHaven = typeof window !== 'undefined' ? localStorage.getItem('floodaids_img_haven') : null;
  const savedDist = typeof window !== 'undefined' ? localStorage.getItem('floodaids_img_dist') : null;
  const savedStory = typeof window !== 'undefined' ? localStorage.getItem('floodaids_img_story') : null;

  return {
    heroImage: savedHero || DEFAULT_HERO,
    havenImage: savedHaven || DEFAULT_HAVEN,
    distributionImage: savedDist || DEFAULT_DISTRIBUTION,
    storyImage: savedStory || DEFAULT_STORY,

    setHeroImage: (url: string) => {
      if (typeof window !== 'undefined') localStorage.setItem('floodaids_img_hero', url);
      set({ heroImage: url });
    },
    setHavenImage: (url: string) => {
      if (typeof window !== 'undefined') localStorage.setItem('floodaids_img_haven', url);
      set({ havenImage: url });
    },
    setDistributionImage: (url: string) => {
      if (typeof window !== 'undefined') localStorage.setItem('floodaids_img_dist', url);
      set({ distributionImage: url });
    },
    setStoryImage: (url: string) => {
      if (typeof window !== 'undefined') localStorage.setItem('floodaids_img_story', url);
      set({ storyImage: url });
    },
    resetDefaultImages: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('floodaids_img_hero');
        localStorage.removeItem('floodaids_img_haven');
        localStorage.removeItem('floodaids_img_dist');
        localStorage.removeItem('floodaids_img_story');
      }
      set({
        heroImage: DEFAULT_HERO,
        havenImage: DEFAULT_HAVEN,
        distributionImage: DEFAULT_DISTRIBUTION,
        storyImage: DEFAULT_STORY
      });
    }
  };
});
