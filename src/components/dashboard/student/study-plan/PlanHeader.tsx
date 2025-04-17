
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Flame } from "lucide-react";

interface PlanHeaderProps {
  date: Date;
  completedConcepts: number;
  totalConcepts: number;
  timeSpent: number;
  streak: number;
}

export const PlanHeader = ({
  date,
  completedConcepts,
  totalConcepts,
  timeSpent,
  streak
}: PlanHeaderProps) => {
  // Calculate progress percentage
  const progressPercentage = Math.round((completedConcepts / totalConcepts) * 100);
  
  return (
    <CardHeader className="bg-gradient-to-r from-sky-50 to-indigo-50 pb-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle className="text-xl flex items-center gap-2">
            <Calendar className="text-sky-500" size={20} />
            Today's Study Plan
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        
        <div className="mt-2 md:mt-0 flex gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-indigo-500" />
            <span>Time spent: <span className="font-medium">{timeSpent} min</span></span>
          </div>
          <div className="flex items-center gap-1">
            <Flame size={16} className="text-amber-500" />
            <span>Streak: <span className="font-medium">{streak} days</span></span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 space-y-1">
        <div className="flex items-center justify-between text-sm">
          <span>Progress: {progressPercentage}%</span>
          <span>{completedConcepts}/{totalConcepts} Concepts</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
    </CardHeader>
  );
};
