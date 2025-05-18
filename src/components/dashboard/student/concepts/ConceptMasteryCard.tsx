
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain } from 'lucide-react';

interface MasteryLevel {
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  percentage: number;
}

interface ConceptMasteryCardProps {
  mastery: MasteryLevel;
  onPractice: () => void;
}

const ConceptMasteryCard: React.FC<ConceptMasteryCardProps> = ({ mastery, onPractice }) => {
  // Get appropriate color based on mastery level
  const getMasteryColor = () => {
    if (mastery.percentage < 30) return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    if (mastery.percentage < 60) return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
    if (mastery.percentage < 90) return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Your Mastery</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mb-3">
          <div className={`rounded-full p-2 ${getMasteryColor()}`}>
            <Brain size={16} />
          </div>
          <div className="font-medium">{mastery.level}</div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Progress</span>
            <span>{mastery.percentage}%</span>
          </div>
          <Progress value={mastery.percentage} className="h-2" />
        </div>
        
        <div className="text-xs text-muted-foreground mt-3 mb-4">
          Practice questions to increase your mastery level.
        </div>
        
        <Button onClick={onPractice} className="w-full" variant="outline">
          Practice Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConceptMasteryCard;
