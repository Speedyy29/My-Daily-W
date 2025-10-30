export type HabitCategory = 'health' | 'productivity' | 'learning' | 'fitness' | 'mindfulness' | 'social';

export type FrequencyType = 'daily' | 'weekly' | 'custom';

export interface HabitCompletion {
  date: string; // ISO date string
  note?: string;
}

export interface Habit {
  id: string;
  name: string;
  description?: string;
  category: HabitCategory;
  color: string;
  frequency: FrequencyType;
  customDays?: number[]; // 0-6 for Sunday-Saturday
  createdDate: string;
  targetDays?: number;
  completions: HabitCompletion[];
  currentStreak: number;
  longestStreak: number;
  reminderTime?: string; // HH:mm format
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress?: number;
  target?: number;
}

export interface UserStats {
  totalHabits: number;
  totalCompletions: number;
  currentStreaks: number;
  longestStreak: number;
  level: number;
  points: number;
  achievements: Achievement[];
}
