
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Calendar, CheckCircle, Clock, Flame, Trophy, Users } from 'lucide-react';
import DailyChallenges from '@/components/shared/DailyChallenges';
import { Progress } from '@/components/ui/progress';

const DailyChallengesPage = () => {
  const [activeTab, setActiveTab] = useState('current');
  
  const achievements = [
    { 
      id: 'ach-1', 
      title: '7-Day Streak', 
      description: 'Complete challenges for 7 consecutive days', 
      progress: 71, 
      icon: <Flame className="h-5 w-5 text-orange-500" />,
      reward: '100 XP + Badge' 
    },
    { 
      id: 'ach-2', 
      title: 'Physics Master', 
      description: 'Complete 10 physics challenges', 
      progress: 60, 
      icon: <Award className="h-5 w-5 text-indigo-500" />,
      reward: '150 XP + Physics Mastery Badge' 
    },
    { 
      id: 'ach-3', 
      title: 'Perfect Score', 
      description: 'Get 100% on 5 daily quizzes', 
      progress: 40, 
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      reward: '200 XP + Quiz Champion Badge' 
    },
    { 
      id: 'ach-4', 
      title: 'Early Bird', 
      description: 'Complete challenges before 9 AM for 5 days', 
      progress: 20, 
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      reward: '75 XP + Morning Person Badge' 
    }
  ];
  
  const userStats = {
    totalXP: 1250,
    currentStreak: 5,
    longestStreak: 14,
    completedChallenges: 37,
    totalBadges: 8,
    level: 6,
    nextLevelXP: 1500
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Award className="h-8 w-8 text-amber-500" />
          Daily Challenges
        </h1>
        <p className="text-muted-foreground mt-1">Complete challenges to earn points and build consistent study habits</p>
      </div>
      
      {/* User Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-800/20 border-amber-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-amber-600" />
                <h3 className="font-medium">Current Streak</h3>
              </div>
              <span className="text-3xl font-bold text-amber-700">{userStats.currentStreak}</span>
            </div>
            <p className="text-sm text-amber-700">days in a row</p>
            <div className="flex justify-between text-xs text-amber-600 mt-2">
              <span>Best: {userStats.longestStreak} days</span>
              <span>Keep it up!</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/30 dark:to-indigo-800/20 border-indigo-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-indigo-600" />
                <h3 className="font-medium">Total XP</h3>
              </div>
              <span className="text-3xl font-bold text-indigo-700">{userStats.totalXP}</span>
            </div>
            <p className="text-sm text-indigo-700">points earned</p>
            <div className="mt-2">
              <div className="flex justify-between text-xs text-indigo-600 mb-1">
                <span>Level {userStats.level}</span>
                <span>{userStats.totalXP}/{userStats.nextLevelXP} XP</span>
              </div>
              <Progress 
                value={(userStats.totalXP / userStats.nextLevelXP) * 100} 
                className="h-1.5 bg-indigo-200" 
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-800/20 border-green-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h3 className="font-medium">Completed</h3>
              </div>
              <span className="text-3xl font-bold text-green-700">{userStats.completedChallenges}</span>
            </div>
            <p className="text-sm text-green-700">challenges completed</p>
            <div className="flex justify-between text-xs text-green-600 mt-2">
              <span>Weekly: 12</span>
              <span>Monthly: 37</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-800/20 border-purple-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                <h3 className="font-medium">Badges</h3>
              </div>
              <span className="text-3xl font-bold text-purple-700">{userStats.totalBadges}</span>
            </div>
            <p className="text-sm text-purple-700">badges earned</p>
            <div className="flex justify-between text-xs text-purple-600 mt-2">
              <span>Common: 5</span>
              <span>Rare: 3</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Challenges Tabs */}
      <Tabs defaultValue="current" onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Challenges</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Challenges</CardTitle>
              <CardDescription>Complete these challenges today to maintain your streak</CardDescription>
            </CardHeader>
            <CardContent>
              <DailyChallenges variant="full" maxItems={3} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Weekly Challenges</CardTitle>
              <CardDescription>Complete these before the end of the week</CardDescription>
            </CardHeader>
            <CardContent>
              <DailyChallenges variant="full" maxItems={2} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Coming Tomorrow</CardTitle>
              <CardDescription>Preview tomorrow's challenges</CardDescription>
            </CardHeader>
            <CardContent>
              <DailyChallenges variant="full" maxItems={2} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Weekend Challenge</CardTitle>
              <CardDescription>Special weekend challenges with bonus rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Card className="border border-amber-200">
                  <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">Complete Study Marathon</CardTitle>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-amber-600" />
                        <span className="text-xs text-amber-700">Weekend</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-sm mb-3">Complete 3 hours of continuous study with mini-breaks</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Award className="h-3.5 w-3.5" />
                        <span>200 XP + Marathon Badge</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        <span>28 students enrolled</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Completed</CardTitle>
              <CardDescription>Challenges you've completed in the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <DailyChallenges variant="full" maxItems={3} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>In Progress</CardTitle>
              <CardDescription>Achievements you're working toward</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map(achievement => (
                  <Card key={achievement.id} className="border-muted">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center">
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Progress</span>
                              <span>{achievement.progress}%</span>
                            </div>
                            <Progress value={achievement.progress} className="h-1.5" />
                            <div className="text-xs text-muted-foreground">
                              <span>Reward: {achievement.reward}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Earned Badges</CardTitle>
              <CardDescription>Achievements you've completed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <Card className="border-green-200 bg-green-50/50">
                  <CardContent className="p-4 text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                      <Award className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="font-medium">First Steps</h4>
                    <p className="text-xs text-muted-foreground">Complete your first challenge</p>
                  </CardContent>
                </Card>
                
                <Card className="border-blue-200 bg-blue-50/50">
                  <CardContent className="p-4 text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                      <Flame className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-medium">3-Day Streak</h4>
                    <p className="text-xs text-muted-foreground">Complete challenges for 3 days in a row</p>
                  </CardContent>
                </Card>
                
                <Card className="border-purple-200 bg-purple-50/50">
                  <CardContent className="p-4 text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                      <CheckCircle className="h-8 w-8 text-purple-600" />
                    </div>
                    <h4 className="font-medium">Quick Learner</h4>
                    <p className="text-xs text-muted-foreground">Complete 5 challenges in a day</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DailyChallengesPage;
