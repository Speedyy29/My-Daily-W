import { useState, useEffect, useCallback } from 'react';
import { StorageService } from '@/services/storageService';
import { Habit } from '@/types/habit';

interface UseHabitsReturn {
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

export const useHabits = (): UseHabitsReturn => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadHabits = useCallback(() => {
    try {
      setLoading(true);
      const allHabits = StorageService.getAll();
      setHabits(allHabits);
      setError(null);
    } catch (err) {
      setError('Failed to load habits');
      console.error('Error loading habits:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addHabit = useCallback((habit: Omit<Habit, 'id' | 'currentStreak' | 'longestStreak' | 'completions'>) => {
    const newHabit = StorageService.add(habit);
    loadHabits();
    return newHabit;
  }, [loadHabits]);

  const updateHabit = useCallback((id: string, updates: Partial<Habit>) => {
    const updatedHabit = StorageService.update(id, updates);
    loadHabits();
    return updatedHabit;
  }, [loadHabits]);

  const deleteHabit = useCallback((id: string) => {
    const result = StorageService.delete(id);
    loadHabits();
    return result;
  }, [loadHabits]);

  const toggleCompletion = useCallback((habitId: string, date: Date, note?: string) => {
    const result = StorageService.toggleCompletion(habitId, date, note);
    loadHabits();
    return result;
  }, [loadHabits]);

  const isCompletedToday = useCallback((habitId: string) => {
    return StorageService.isCompletedToday(habitId);
  }, []);

  const getCompletionRate = useCallback((habitId: string, days: number = 30) => {
    return StorageService.getCompletionRate(habitId, days);
  }, []);

  useEffect(() => {
    loadHabits();
  }, [loadHabits]);

  return {
    habits,
    loading,
    error,
    loadHabits,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleCompletion,
    isCompletedToday,
    getCompletionRate,
  };
};