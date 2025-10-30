import React, { createContext, useContext } from 'react';
import { useHabits } from '@/features/habits/hooks/useHabits';
import { Habit } from '@/types/habit';

interface HabitContextType {
  habits: Habit[];
  loading: boolean;
  error: string | null;
  loadHabits: () => void;
  addHabit: (habit: Omit<Habit, 'id' | 'currentStreak' | 'longestStreak' | 'completions'>) => Habit;
  updateHabit: (id: string, updates: Partial<Habit>) => Habit | null;
  deleteHabit: (id: string) => boolean;
  toggleCompletion: (habitId: string, date: Date, note?: string) => Habit | null;
  isCompletedToday: (habitId: string) => boolean;
  getCompletionRate: (habitId: string, days?: number) => number;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const habitsHook = useHabits();
  
  return (
    <HabitContext.Provider value={habitsHook}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabitContext = () => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabitContext must be used within a HabitProvider');
  }
  return context;
};