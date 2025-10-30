import { Habit } from '@/types/habit';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Flame, Target, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useHabitContext } from '@/contexts/HabitContext';
import { getCategoryColor } from '@/constants/categories';

interface HabitCardProps {
  habit: Habit;
  onUpdate: () => void;
  onClick?: () => void;
}

export const HabitCard = ({ habit, onUpdate, onClick }: HabitCardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { isCompletedToday, getCompletionRate, toggleCompletion } = useHabitContext();
  
  const isCompleted = isCompletedToday(habit.id);
  const completionRate = getCompletionRate(habit.id);

  const handleCheckIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);
    toggleCompletion(habit.id, new Date());
    onUpdate();
    
    setTimeout(() => setIsAnimating(false), 400);
  };

  return (
    <Card
      className={cn(
        "p-5 bg-gradient-card hover:shadow-md transition-all duration-300 cursor-pointer border-l-4",
        getCategoryColor(habit.category) || 'border-l-primary'
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-lg text-foreground truncate">
              {habit.name}
            </h3>
            {habit.currentStreak > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent/10 animate-streak-pulse">
                <Flame className="w-4 h-4 text-accent" />
                <span className="text-sm font-bold text-accent">
                  {habit.currentStreak}
                </span>
              </div>
            )}
          </div>
          
          {habit.description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {habit.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Target className="w-3.5 h-3.5" />
              <span>{completionRate}% complete</span>
            </div>
            {habit.longestStreak > 0 && (
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Best: {habit.longestStreak} days</span>
              </div>
            )}
          </div>
        </div>

        <Button
          size="lg"
          variant={isCompleted ? "default" : "outline"}
          className={cn(
            "rounded-full w-14 h-14 p-0 shrink-0 transition-all",
            isCompleted && "bg-gradient-success shadow-glow",
            isAnimating && "animate-check-in"
          )}
          onClick={handleCheckIn}
        >
          <Check className={cn(
            "w-6 h-6 transition-all",
            isCompleted ? "text-success-foreground" : "text-muted-foreground"
          )} />
        </Button>
      </div>
    </Card>
  );
};