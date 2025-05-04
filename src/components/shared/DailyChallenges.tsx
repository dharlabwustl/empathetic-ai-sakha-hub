
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Award, CheckCircle, Users, Flame, Clock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { useToast } from '@/hooks/use-toast';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'streak';
  deadline: string;
  progress: number;
  participants: number;
  reward?: string;
  completed?: boolean;
  joined?: boolean;
}

interface DailyChallengesProps {
  variant?: 'compact' | 'full';
  maxItems?: number;
}

const DailyChallenges: React.FC<DailyChallengesProps> = ({ 
  variant = 'full',
  maxItems = 3
}) => {
  const { toast } = useToast();
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 'daily-1',
      title: 'Daily Physics Challenge',
      description: 'Complete 5 practice problems in Thermodynamics',
      type: 'daily',
      deadline: 'Today',
      progress: 40,
      participants: 24,
      reward: '50 XP'
    },
    {
      id: 'daily-2',
      title: 'Biology Flashcard Master',
      description: 'Create or review 15 Biology flashcards',
      type: 'daily',
      deadline: 'Today',
      progress: 60,
      participants: 18,
      reward: '30 XP'
    },
    {
      id: 'weekly-1',
      title: 'Chemistry Champion',
      description: 'Score 80% or higher on 3 practice tests this week',
      type: 'weekly',
      deadline: '4 days left',
      progress: 33,
      participants: 45,
      reward: '200 XP + Chemistry Badge'
    },
    {
      id: 'streak-1',
      title: 'Study Streak',
      description: 'Maintain a 5-day study streak',
      type: 'streak',
      deadline: 'Ongoing',
      progress: 60,
      participants: 120,
      reward: '100 XP per 5 days'
    }
  ]);
  
  const handleJoinChallenge = (challengeId: string) => {
    toast({
      title: "Challenge joined!",
      description: "Track your progress in the Challenges section.",
    });
    
    // Update the challenge as joined (in real app, this would be an API call)
    setChallenges(prev => prev.map(c => 
      c.id === challengeId ? { ...c, joined: true } : c
    ));
  };
  
  const handleCompleteTask = (challengeId: string) => {
    // In a real app, this would update the progress via API
    setChallenges(prev => prev.map(c => 
      c.id === challengeId 
        ? { 
            ...c, 
            progress: Math.min(100, c.progress + 20),
            completed: c.progress + 20 >= 100
          } 
        : c
    ));
    
    toast({
      title: "Progress updated!",
      description: "Great job! Keep going with your challenge.",
    });
  };
  
  // Filter challenges to show based on maxItems
  const displayChallenges = challenges.slice(0, maxItems);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-amber-500" />
          <h3 className="font-medium">Daily Challenges</h3>
        </div>
        
        {variant === 'compact' && (
          <Button variant="link" size="sm" className="text-xs">
            View All
          </Button>
        )}
      </div>
      
      <div className={`grid gap-4 ${variant === 'compact' ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
        {displayChallenges.map(challenge => (
          <Card key={challenge.id} className={`overflow-hidden ${challenge.completed ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : ''}`}>
            <CardHeader className={`p-4 pb-2 ${
              challenge.type === 'daily' 
                ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30' 
                : challenge.type === 'weekly'
                  ? 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30'
                  : 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30'
            }`}>
              <div className="flex justify-between items-center">
                <Badge variant="outline" className={`mb-1 ${
                  challenge.type === 'daily' 
                    ? 'border-blue-200 text-blue-800' 
                    : challenge.type === 'weekly'
                      ? 'border-purple-200 text-purple-800'
                      : 'border-amber-200 text-amber-800'
                }`}>
                  <div className="flex items-center gap-1">
                    {challenge.type === 'daily' ? (
                      <Calendar className="h-3 w-3 mr-1" />
                    ) : challenge.type === 'weekly' ? (
                      <Calendar className="h-3 w-3 mr-1" />
                    ) : (
                      <Flame className="h-3 w-3 mr-1" />
                    )}
                    {challenge.deadline}
                  </div>
                </Badge>
                
                {challenge.reward && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="secondary" className="text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          {challenge.reward}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Reward for completing this challenge</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <CardTitle className="text-base">{challenge.title}</CardTitle>
            </CardHeader>
            
            <CardContent className="p-4 pt-2">
              <p className="text-sm mb-3">{challenge.description}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{challenge.progress}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <motion.div 
                    className={`h-2.5 rounded-full ${
                      challenge.completed 
                        ? 'bg-green-500' 
                        : challenge.type === 'daily' 
                          ? 'bg-blue-600' 
                          : challenge.type === 'weekly'
                            ? 'bg-purple-600'
                            : 'bg-amber-600'
                    }`}
                    style={{ width: '0%' }}
                    animate={{ width: `${challenge.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  ></motion.div>
                </div>
                
                {variant !== 'compact' && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{challenge.participants} participants</span>
                    </div>
                    
                    {challenge.type === 'streak' && (
                      <div className="flex items-center gap-1 text-xs text-amber-600">
                        <Flame className="h-3 w-3" />
                        <span>3-day streak</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="p-4 pt-0 flex justify-between">
              {challenge.completed ? (
                <Button 
                  variant="ghost" 
                  className="flex items-center w-full border border-green-200 text-green-700 hover:bg-green-50"
                  disabled
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Completed
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                    onClick={() => handleCompleteTask(challenge.id)}
                  >
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {challenge.progress > 0 ? 'Continue' : 'Start Task'}
                  </Button>
                  <Button
                    size="sm"
                    className={`${
                      challenge.type === 'daily' 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : challenge.type === 'weekly'
                          ? 'bg-purple-600 hover:bg-purple-700'
                          : 'bg-amber-600 hover:bg-amber-700'
                    }`}
                    onClick={() => handleJoinChallenge(challenge.id)}
                    disabled={challenge.joined}
                  >
                    {challenge.joined ? 'Joined' : 'Join Challenge'}
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DailyChallenges;
