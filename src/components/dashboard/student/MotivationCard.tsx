
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input as FormInput } from '@/components/ui/input'; // Rename to FormInput to avoid confusion
import { Flame, BookOpen, BrainCircuit } from 'lucide-react'; // Replaced Fire with Flame

interface MotivationCardProps {
  streak: number;
  target: string;
  progress: number;
  lastActivity?: string;
}

const MotivationCard: React.FC<MotivationCardProps> = ({
  streak,
  target,
  progress,
  lastActivity
}) => {
  const [goal, setGoal] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle goal submission
    setGoal("");
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" /> 
          Daily Motivation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Current Streak</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{streak} Days</span>
              <Flame className="h-5 w-5 text-orange-500" />
            </div>
          </div>
          
          <div>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span>Progress towards: {target}</span>
              <span className="font-semibold">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {lastActivity && (
            <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-800/50">
              <p className="text-xs text-gray-500 dark:text-gray-400">Last Activity</p>
              <p className="text-sm font-medium">{lastActivity}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="pt-2">
            <p className="mb-2 text-sm font-medium">Set a mini-goal for today:</p>
            <div className="flex gap-2">
              <FormInput
                placeholder="E.g., Complete 5 practice problems"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="sm">Set</Button>
            </div>
          </form>
          
          <div className="flex justify-between pt-2">
            <Button variant="ghost" size="sm" className="text-purple-600 gap-1">
              <BookOpen className="h-4 w-4" />
              <span>Study Tips</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-blue-600 gap-1">
              <BrainCircuit className="h-4 w-4" />
              <span>Focus Mode</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationCard;
