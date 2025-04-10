
import { useState } from "react";
import { Activity, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Habit } from "./types";

export function HabitTracker() {
  const { toast } = useToast();
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "habit-1",
      name: "Study Focus Time",
      icon: <Activity size={16} />,
      streak: 5,
      target: 120,
      unit: "minutes",
      progress: 75,
    },
    {
      id: "habit-2",
      name: "Sleep Schedule",
      icon: <Calendar size={16} />,
      streak: 7,
      target: 8,
      unit: "hours",
      progress: 90,
    },
  ]);
  
  const handleHabitProgress = (habitId: string, increment: boolean) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const newProgress = Math.min(
          100, 
          Math.max(0, habit.progress + (increment ? 5 : -5))
        );
        return { ...habit, progress: newProgress };
      }
      return habit;
    }));
    
    toast({
      title: "Habit progress updated",
      description: `Your habit progress has been ${increment ? "increased" : "decreased"}.`,
    });
  };
  
  return (
    <div>
      <h3 className="font-medium mb-3">Habit Tracker</h3>
      <div className="space-y-4">
        {habits.map((habit) => (
          <div key={habit.id} className="border rounded-lg p-3 space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-1.5 rounded">
                  {habit.icon}
                </div>
                <span className="text-sm font-medium">{habit.name}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star size={14} className="text-amber-500" /> 
                <span>{habit.streak} day streak</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>Target: {habit.target} {habit.unit}</span>
              </div>
              <Progress value={habit.progress} />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleHabitProgress(habit.id, false)}
              >
                -
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleHabitProgress(habit.id, true)}
              >
                +
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
