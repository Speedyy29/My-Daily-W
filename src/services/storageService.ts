import { Habit, HabitCompletion } from '@/types/habit';
import { startOfDay, isToday, parseISO, differenceInDays, isSameDay } from 'date-fns';

const STORAGE_KEY = 'habit-tracker-data';

export class StorageService {
  static getAll(): Habit[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }

  static save(habits: Habit[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  static add(habit: Omit<Habit, 'id' | 'currentStreak' | 'longestStreak' | 'completions'>): Habit {
    const habits = this.getAll();
    const newHabit: Habit = {
      ...habit,
      id: crypto.randomUUID(),
      completions: [],
      currentStreak: 0,
      longestStreak: 0,
    };
    habits.push(newHabit);
    this.save(habits);
    return newHabit;
  }

  static update(id: string, updates: Partial<Habit>): Habit | null {
    const habits = this.getAll();
    const index = habits.findIndex(h => h.id === id);
    if (index === -1) return null;
    
    habits[index] = { ...habits[index], ...updates };
    this.save(habits);
    return habits[index];
  }

  static delete(id: string): boolean {
    const habits = this.getAll();
    const filtered = habits.filter(h => h.id !== id);
    if (filtered.length === habits.length) return false;
    
    this.save(filtered);
    return true;
  }

  static toggleCompletion(habitId: string, date: Date, note?: string): Habit | null {
    const habits = this.getAll();
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return null;

    const dateStr = startOfDay(date).toISOString();
    const completionIndex = habit.completions.findIndex(c => c.date === dateStr);

    if (completionIndex >= 0) {
      // Remove completion
      habit.completions.splice(completionIndex, 1);
    } else {
      // Add completion
      habit.completions.push({ date: dateStr, note });
    }

    // Recalculate streaks
    this.updateStreaks(habit);
    this.save(habits);
    return habit;
  }

  static updateStreaks(habit: Habit): void {
    if (habit.completions.length === 0) {
      habit.currentStreak = 0;
      habit.longestStreak = 0;
      return;
    }

    // Sort completions by date (newest first)
    const sortedDates = habit.completions
      .map(c => parseISO(c.date))
      .sort((a, b) => b.getTime() - a.getTime());

    // Calculate current streak
    let currentStreak = 0;
    const today = startOfDay(new Date());
    
    // Check if completed today or yesterday
    if (isSameDay(sortedDates[0], today) || differenceInDays(today, sortedDates[0]) === 1) {
      currentStreak = 1;
      
      for (let i = 1; i < sortedDates.length; i++) {
        const daysDiff = differenceInDays(sortedDates[i - 1], sortedDates[i]);
        if (daysDiff === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 1;
    
    for (let i = 1; i < sortedDates.length; i++) {
      const daysDiff = differenceInDays(sortedDates[i - 1], sortedDates[i]);
      if (daysDiff === 1) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak, currentStreak);

    habit.currentStreak = currentStreak;
    habit.longestStreak = longestStreak;
  }

  static isCompletedToday(habitId: string): boolean {
    const habits = this.getAll();
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return false;

    const today = startOfDay(new Date()).toISOString();
    return habit.completions.some(c => c.date === today);
  }

  static getCompletionRate(habitId: string, days: number = 30): number {
    const habits = this.getAll();
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return 0;

    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - days);
    
    const recentCompletions = habit.completions.filter(c => 
      parseISO(c.date) >= daysAgo
    );

    return Math.round((recentCompletions.length / days) * 100);
  }
}