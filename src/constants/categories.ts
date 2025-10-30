import { HabitCategory } from "@/types/habit";

export const CATEGORIES: { value: HabitCategory; label: string; color: string }[] = [
  { value: 'health', label: 'Health', color: 'bg-category-health' },
  { value: 'productivity', label: 'Productivity', color: 'bg-category-productivity' },
  { value: 'learning', label: 'Learning', color: 'bg-category-learning' },
  { value: 'fitness', label: 'Fitness', color: 'bg-category-fitness' },
  { value: 'mindfulness', label: 'Mindfulness', color: 'bg-category-mindfulness' },
  { value: 'social', label: 'Social', color: 'bg-category-social' },
];

export const getCategoryColor = (category: HabitCategory): string => {
  const cat = CATEGORIES.find(c => c.value === category);
  return cat ? cat.color : 'bg-category-health';
};