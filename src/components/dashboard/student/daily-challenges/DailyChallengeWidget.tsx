
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Clock, Flame, Check, Award, Medal, Star, Lightning } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Image from '@/components/common/Image';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'flashcard' | 'concept' | 'streak' | 'completion';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  completed: boolean;
  progress: number;
  timeRemaining?: string;
  subject?: string;
  icon?: 'trophy' | 'flame' | 'medal' | 'star' | 'award';
}

interface DailyChallengeWidgetProps {
  className?: string;
  variant?: 'default' | 'compact';
}

const DailyChallengeWidget: React.FC<DailyChallengeWidgetProps> = ({ 
  className,
  variant = 'default'
}) => {
  const [challenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Physics Streak',
      description: 'Complete 3 days in a row of physics practice',
      type: 'streak',
      difficulty: 'medium',
      points: 50,
      completed: false,
      progress: 66,
      timeRemaining: '1 day',
      subject: 'Physics',
      icon: 'flame'
    },
    {
      id: '2',
      title: 'Chemistry Quiz Master',
      description: 'Score 90% or higher on the daily chemistry quiz',
      type: 'quiz',
      difficulty: 'hard',
      points: 100,
      completed: true,
      progress: 100,
      subject: 'Chemistry',
      icon: 'trophy'
    },
    {
      id: '3',
      title: 'Biology Flashcard Challenge',
      description: 'Review 30 biology flashcards',
      type: 'flashcard',
      difficulty: 'easy',
      points: 25,
      completed: false,
      progress: 40,
      timeRemaining: '14 hours',
      subject: 'Biology',
      icon: 'medal'
    },
    {
      id: '4',
      title: 'Mathematics Mastery',
      description: 'Complete the algebra concept review',
      type: 'concept',
      difficulty: 'medium',
      points: 75,
      completed: false,
      progress: 20,
      timeRemaining: '2 days',
      subject: 'Mathematics',
      icon: 'star'
    }
  ]);
  
  const [currentStreak, setCurrentStreak] = useState(4);
  const [totalPoints, setTotalPoints] = useState(725);
  const [level, setLevel] = useState(3);
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-400';
    }
  };
  
  const getIconComponent = (iconName?: string) => {
    switch(iconName) {
      case 'flame':
        return <Flame className="h-5 w-5 text-orange-500" />;
      case 'trophy':
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 'medal':
        return <Medal className="h-5 w-5 text-blue-500" />;
      case 'star':
        return <Star className="h-5 w-5 text-purple-500" />;
      case 'award':
        return <Award className="h-5 w-5 text-green-500" />;
      default:
        return <Lightning className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-blue-500';
  };
  
  const completedChallenges = challenges.filter(c => c.completed).length;
  const progressPercentage = (completedChallenges / challenges.length) * 100;
  
  if (variant === 'compact') {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Daily Challenges
            </CardTitle>
            <Badge variant="outline" className="flex items-center gap-1">
              <Flame className="h-3.5 w-3.5 text-orange-500" />
              <span>Streak: {currentStreak}</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="mb-4">
            <div className="flex justify-between mb-1 text-xs">
              <span>{completedChallenges} of {challenges.length} completed</span>
              <span>{progressPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-1" />
          </div>
          <Button size="sm" className="w-full text-xs">
            View All Challenges
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="bg-gradient-to-r from-blue-500 to-violet-600 text-white p-4 pb-12 relative">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Daily Challenges
            </CardTitle>
            <CardDescription className="text-white/80 mt-1">
              Complete challenges to earn points and level up!
            </CardDescription>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-center">
              <div className="text-xs text-white/80">Streak</div>
              <div className="flex items-center justify-center gap-1 font-bold">
                <Flame className="h-4 w-4 text-orange-300" />
                {currentStreak}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-xs text-white/80">Level</div>
              <div className="font-bold">{level}</div>
            </div>
            
            <div className="text-center">
              <div className="text-xs text-white/80">Points</div>
              <div className="font-bold">{totalPoints}</div>
            </div>
          </div>
        </div>
        
        <div className="absolute -bottom-5 left-4 right-4 bg-white dark:bg-gray-900 rounded-lg shadow-md flex justify-between p-3">
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Today's Progress</div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">{progressPercentage.toFixed(0)}% Complete</div>
              <span className="text-xs text-gray-600 dark:text-gray-400">({completedChallenges}/{challenges.length})</span>
            </div>
          </div>
          <Progress value={progressPercentage} className="w-1/3 h-2 mt-1.5" />
        </div>
      </CardHeader>
      
      <CardContent className="pt-8 p-4">
        <div className="space-y-3 mt-4">
          {challenges.map((challenge) => (
            <div 
              key={challenge.id}
              className={cn(
                "border rounded-lg p-3 transition-all hover:shadow-md",
                challenge.completed ? "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50" : "border-blue-200 dark:border-blue-900"
              )}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className={cn(
                    "p-2 rounded-full",
                    challenge.completed ? "bg-green-100 dark:bg-green-900/20" : "bg-blue-100 dark:bg-blue-900/30"
                  )}>
                    {challenge.completed ? (
                      <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      getIconComponent(challenge.icon)
                    )}
                  </div>
                  
                  <div>
                    <div className="font-medium text-sm flex items-center gap-2">
                      {challenge.title}
                      {challenge.subject && (
                        <Badge variant="outline" className="text-xs py-0">
                          {challenge.subject}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                      {challenge.description}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center text-xs">
                        <Badge className={getDifficultyColor(challenge.difficulty)} variant="secondary">
                          {challenge.difficulty}
                        </Badge>
                      </div>
                      
                      {!challenge.completed && challenge.timeRemaining && (
                        <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {challenge.timeRemaining}
                        </div>
                      )}
                      
                      <div className="text-xs font-medium">
                        +{challenge.points} pts
                      </div>
                    </div>
                  </div>
                </div>
                
                {!challenge.completed && (
                  <div className="min-w-20 text-center">
                    <Button size="sm" className="text-xs">Start</Button>
                  </div>
                )}
              </div>
              
              {!challenge.completed && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{challenge.progress}%</span>
                  </div>
                  <Progress value={challenge.progress} className={cn("h-1", getProgressColor(challenge.progress))} />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button className="bg-gradient-to-r from-blue-600 to-violet-600">
            View All Challenges
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyChallengeWidget;
