
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Flame as FlameIcon } from "lucide-react"; // Corrected import

interface Challenge {
  id: string;
  title: string;
  progress: number;
  category: string;
  icon?: string;
  reward?: string;
  days?: number;
}

interface ChallengesWidgetProps {
  challenges?: Challenge[];
  showTitle?: boolean;
}

const ChallengesWidget: React.FC<ChallengesWidgetProps> = ({ 
  challenges = defaultChallenges,
  showTitle = true
}) => {
  return (
    <Card>
      {showTitle && (
        <CardHeader className="pb-3">
          <CardTitle className="font-semibold text-lg">Challenges</CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {challenge.icon === 'flame' ? (
                  <FlameIcon className="h-4 w-4 text-orange-500" />
                ) : (
                  <div className="h-4 w-4 bg-primary rounded-full" />
                )}
                <span className="text-sm font-medium">{challenge.title}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {challenge.progress}%
              </span>
            </div>
            <Progress value={challenge.progress} className="h-2" />
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>{challenge.category}</span>
              {challenge.days && <span>{challenge.days} days left</span>}
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-full mt-2">View All Challenges</Button>
      </CardContent>
    </Card>
  );
};

// Default challenges data
const defaultChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Study Streak',
    progress: 80,
    category: 'Daily Login',
    icon: 'flame',
    days: 3
  },
  {
    id: '2',
    title: 'Concept Master',
    progress: 45,
    category: 'Learning',
    days: 7
  }
];

export default ChallengesWidget;
