import { useState, useEffect } from 'react';
import { HabitCard } from '@/components/HabitCard';
import { StatsCard } from '@/components/StatsCard';
import { AddHabitDialog } from '@/components/AddHabitDialog';
import { useHabitContext } from '@/contexts/HabitContext';
import { Habit } from '@/types/habit';
import { Flame, Target, TrendingUp, Award } from 'lucide-react';
import { format } from 'date-fns';

export default function Dashboard() {
  const { habits, loadHabits, isCompletedToday } = useHabitContext();
  const [stats, setStats] = useState({
    totalHabits: 0,
    todayCompleted: 0,
    activeStreaks: 0,
    longestStreak: 0,
  });

  // Calculate stats when habits change
  useEffect(() => {
    const todayCompleted = habits.filter(habit => isCompletedToday(habit.id)).length;
    const activeStreaks = habits.filter(h => h.currentStreak > 0).length;
    const longestStreak = Math.max(0, ...habits.map(h => h.longestStreak));

    setStats({
      totalHabits: habits.length,
      todayCompleted,
      activeStreaks,
      longestStreak,
    });
  }, [habits, isCompletedToday]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                My Daily W 🏆
              </h1>
              <p className="text-muted-foreground mt-1">
                {format(new Date(), 'EEEE, MMMM d, yyyy')}
              </p>
            </div>
            <AddHabitDialog onHabitAdded={loadHabits} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Habits"
            value={stats.totalHabits}
            icon={Target}
            gradient="bg-gradient-primary"
          />
          <StatsCard
            title="Completed Today"
            value={`${stats.todayCompleted}/${stats.totalHabits}`}
            icon={Award}
            gradient="bg-gradient-success"
            description={stats.totalHabits > 0 ? `${Math.round((stats.todayCompleted / stats.totalHabits) * 100)}%` : '0%'}
          />
          <StatsCard
            title="Active Streaks"
            value={stats.activeStreaks}
            icon={Flame}
            gradient="bg-gradient-accent"
          />
          <StatsCard
            title="Longest Streak"
            value={`${stats.longestStreak} days`}
            icon={TrendingUp}
            gradient="bg-gradient-primary"
          />
        </div>

        {/* Habits List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-foreground">Today's Habits</h2>
            {habits.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {stats.todayCompleted} of {stats.totalHabits} completed
              </p>
            )}
          </div>

          {habits.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                <Target className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Start Your Journey
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Create your first habit and begin building consistent daily routines that lead to lasting change.
              </p>
              <AddHabitDialog onHabitAdded={loadHabits} />
            </div>
          ) : (
            <div className="grid gap-4">
              {habits.map(habit => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onUpdate={loadHabits}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}