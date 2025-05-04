import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card } from '@/components/ui/card';
import { Trophy, Flame, Medal, Award, Star, Calendar, CheckCircle, Zap, Clock, ArrowUp } from 'lucide-react';
import DailyChallengeWidget from '@/components/dashboard/student/daily-challenges/DailyChallengeWidget';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const DailyChallengesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('daily');
  
  const stats = {
    totalPoints: 2450,
    weeklyPoints: 320,
    currentStreak: 6,
    longestStreak: 14,
    completedToday: 2,
    totalToday: 4,
    level: 7,
    progressToNextLevel: 65
  };
  
  const recentAchievements = [
    {
      id: '1',
      title: 'Perfect Week',
      description: 'Complete all daily challenges for 7 consecutive days',
      icon: 'flame',
      date: '2 days ago',
      points: 300
    },
    {
      id: '2',
      title: 'Quiz Master',
      description: 'Score 100% on 5 different quizzes',
      icon: 'trophy',
      date: '1 week ago',
      points: 250
    },
    {
      id: '3',
      title: 'Concept Champion',
      description: 'Master 50 different concepts',
      icon: 'medal',
      date: '2 weeks ago',
      points: 500
    }
  ];
  
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
        return <Trophy className="h-5 w-5 text-yellow-500" />;
    }
  };
  
  return (
    <SharedPageLayout
      title="Challenges & Achievements"
      subtitle="Complete daily challenges and earn achievements to track your progress"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 flex items-center">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full mr-4">
            <Trophy className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Points</div>
            <div className="text-2xl font-bold">{stats.totalPoints}</div>
          </div>
        </Card>
        <Card className="p-4 flex items-center">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full mr-4">
            <Flame className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Current Streak</div>
            <div className="text-2xl font-bold">{stats.currentStreak} days</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Longest: {stats.longestStreak} days</div>
          </div>
        </Card>
        <Card className="p-4 flex items-center">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
            <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Current Level</div>
            <div className="text-2xl font-bold">{stats.level}</div>
            <div className="w-24 mt-1">
              <div className="flex justify-between text-xs mb-1">
                <span>Next</span>
                <span>{stats.progressToNextLevel}%</span>
              </div>
              <Progress value={stats.progressToNextLevel} className="h-1" />
            </div>
          </div>
        </Card>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="daily" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> Daily Challenges
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-1">
            <Medal className="h-4 w-4" /> Achievements
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center gap-1">
            <Zap className="h-4 w-4" /> Weekly Goals
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily">
          <DailyChallengeWidget />
        </TabsContent>
        
        <TabsContent value="achievements">
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">Recent Achievements</h3>
              <div className="space-y-4">
                {recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="border rounded-lg p-4 flex items-start">
                    <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mr-4 flex-shrink-0">
                      {getIconComponent(achievement.icon)}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-semibold">{achievement.title}</h4>
                        <Badge variant="secondary" className="flex items-center">
                          <Trophy className="h-3 w-3 mr-1" />
                          +{achievement.points} points
                        </Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {achievement.description}
                      </p>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Earned {achievement.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Achievement Categories</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { title: 'Study Habits', progress: 60, icon: <Calendar className="h-5 w-5" /> },
                  { title: 'Subject Mastery', progress: 45, icon: <CheckCircle className="h-5 w-5" /> },
                  { title: 'Quiz Performance', progress: 75, icon: <FileText className="h-5 w-5" /> },
                  { title: 'Daily Challenges', progress: 80, icon: <Zap className="h-5 w-5" /> },
                  { title: 'Streaks', progress: 90, icon: <Flame className="h-5 w-5" /> },
                  { title: 'Community', progress: 30, icon: <Medal className="h-5 w-5" /> }
                ].map((category, idx) => (
                  <Card key={idx} className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-2">
                        {category.icon}
                      </div>
                      <h4 className="font-medium">{category.title}</h4>
                    </div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{category.progress}%</span>
                    </div>
                    <Progress value={category.progress} className="h-1.5" />
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="weekly">
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Weekly Goals</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Track your progress on longer-term weekly goals</p>
            </div>
            
            <div className="space-y-4">
              {[
                { title: 'Complete 20 Concept Reviews', progress: 65, points: 250, daysLeft: 3, type: 'concepts' },
                { title: 'Score 80% or higher on 5 practice exams', progress: 40, points: 300, daysLeft: 3, type: 'exams' },
                { title: 'Study for at least 14 hours this week', progress: 85, points: 200, daysLeft: 3, type: 'time' },
                { title: 'Review 100 flashcards', progress: 50, points: 150, daysLeft: 3, type: 'flashcards' }
              ].map((goal, idx) => (
                <div key={idx} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{goal.title}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="text-sm text-green-600 dark:text-green-400 flex items-center">
                          <Trophy className="h-4 w-4 mr-1" />
                          {goal.points} points
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {goal.daysLeft} days left
                        </div>
                      </div>
                    </div>
                    
                    <Badge variant="outline" className="flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                      {goal.progress}% Complete
                    </Badge>
                  </div>
                  
                  <div className="mt-3">
                    <Progress value={goal.progress} className="h-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default DailyChallengesPage;
