
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Award, Star } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Challenge {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  type: 'daily' | 'weekly' | 'achievement';
  reward: string;
  isNew?: boolean;
  expiresIn?: string;
  category?: string;
}

interface ChallengesWidgetProps {
  challenges: Challenge[];
}

const ChallengesWidget: React.FC<ChallengesWidgetProps> = ({ challenges }) => {
  const getIconForChallenge = (type: string) => {
    switch (type) {
      case 'daily':
        return <Award className="h-5 w-5 text-amber-500" />;
      case 'weekly':
        return <Trophy className="h-5 w-5 text-violet-500" />;
      case 'achievement':
        return <Star className="h-5 w-5 text-blue-500" />;
      default:
        return <Award className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <TooltipProvider>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-amber-500" />
            Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getIconForChallenge(challenge.type)}
                    <div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <h4 className="text-sm font-medium">
                            {challenge.title}
                            {challenge.isNew && (
                              <Badge variant="secondary" className="ml-2 py-0 h-5">New</Badge>
                            )}
                          </h4>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{challenge.description}</p>
                        </TooltipContent>
                      </Tooltip>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {challenge.progress} / {challenge.total} completed
                      </p>
                    </div>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" variant="outline" className="h-7">
                        View
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>See challenge details</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                  <div
                    className="bg-green-500 h-1.5 rounded-full"
                    style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View All Challenges
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>See all available challenges</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default ChallengesWidget;
