
import React, { useState, useEffect } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Award,
  Calendar,
  CheckCircle,
  Clock,
  Trophy,
  Star,
  TrendingUp,
  BookOpen,
  Brain,
  Zap,
  LucideIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'problem' | 'activity' | 'streak';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  timeEstimate: number; // in minutes
  completionStatus: 'completed' | 'in-progress' | 'not-started';
  expiresAt?: Date;
  completedAt?: Date;
}

interface Streak {
  current: number;
  longest: number;
  lastCompletedDate: Date | null;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  completed: boolean;
  icon: LucideIcon;
}

const DailyChallengesPage = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [todaysChallenges, setTodaysChallenges] = useState<Challenge[]>([]);
  const [streak, setStreak] = useState<Streak>({ current: 0, longest: 0, lastCompletedDate: null });
  const [totalPoints, setTotalPoints] = useState(0);
  const [rank, setRank] = useState({ name: 'Bronze Scholar', level: 3, nextLevel: 'Silver Scholar' });
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock data
      setTodaysChallenges([
        {
          id: '1',
          title: 'Physics Quick Quiz',
          description: 'Test your knowledge with 5 questions on Newton\'s Laws',
          type: 'quiz',
          difficulty: 'medium',
          points: 50,
          timeEstimate: 10,
          completionStatus: 'completed',
          completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
          id: '2',
          title: 'Chemistry Puzzle',
          description: 'Balance these 3 chemical equations correctly',
          type: 'problem',
          difficulty: 'hard',
          points: 75,
          timeEstimate: 15,
          completionStatus: 'not-started'
        },
        {
          id: '3',
          title: 'Read and Summarize',
          description: 'Read the article on DNA structure and submit a 100-word summary',
          type: 'activity',
          difficulty: 'easy',
          points: 30,
          timeEstimate: 20,
          completionStatus: 'in-progress'
        },
        {
          id: '4',
          title: 'Daily Streak Challenge',
          description: 'Complete any challenge today to maintain your streak',
          type: 'streak',
          difficulty: 'easy',
          points: 10,
          timeEstimate: 5,
          completionStatus: 'completed',
          completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
        }
      ]);

      setStreak({
        current: 5,
        longest: 12,
        lastCompletedDate: new Date(Date.now() - 24 * 60 * 60 * 1000)
      });

      setTotalPoints(1250);

      setAchievements([
        {
          id: '1',
          title: 'Persistent Learner',
          description: 'Complete challenges for 7 days in a row',
          progress: 5,
          maxProgress: 7,
          completed: false,
          icon: Calendar
        },
        {
          id: '2',
          title: 'Quiz Master',
          description: 'Score 100% on 5 daily quizzes',
          progress: 3,
          maxProgress: 5,
          completed: false,
          icon: Brain
        },
        {
          id: '3',
          title: 'Early Bird',
          description: 'Complete challenges before 9 AM for 5 days',
          progress: 5,
          maxProgress: 5,
          completed: true,
          icon: Clock
        }
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  const getChallengeBadgeColor = (type: string) => {
    switch (type) {
      case 'quiz': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'problem': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'activity': return 'bg-green-100 text-green-800 border-green-200';
      case 'streak': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'not-started': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const completedChallenges = todaysChallenges.filter(c => c.completionStatus === 'completed');
  const progressPercentage = todaysChallenges.length > 0 
    ? Math.round((completedChallenges.length / todaysChallenges.length) * 100) 
    : 0;

  if (loading) {
    return (
      <SharedPageLayout
        title="Daily Challenges"
        subtitle="Loading your challenges..."
      >
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </SharedPageLayout>
    );
  }

  return (
    <SharedPageLayout
      title="Daily Challenges"
      subtitle="Complete daily challenges to earn points and track your progress"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-white">
              <Zap className="h-5 w-5" />
              Current Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">{streak.current}</span>
              <span className="text-lg ml-1">days</span>
            </div>
            <p className="text-sm opacity-90 mt-1">
              Longest streak: {streak.longest} days
            </p>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress to next reward</span>
                <span>5/7 days</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '71%' }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Total Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <span className="text-4xl font-bold">{totalPoints.toLocaleString()}</span>
              <span className="text-sm ml-2 text-green-500">+60 today</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Rank: {rank.name} (Level {rank.level})
            </p>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>To {rank.nextLevel}</span>
                <span>750/1000 points</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-purple-500" />
              Today's Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-medium">{completedChallenges.length} of {todaysChallenges.length} completed</span>
              <span className="text-2xl font-bold">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            
            <div className="flex justify-center mt-6">
              {completedChallenges.length === todaysChallenges.length ? (
                <Badge className="bg-green-100 text-green-800 border-green-200 py-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  All challenges completed!
                </Badge>
              ) : (
                <Badge variant="outline" className="py-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {todaysChallenges.length - completedChallenges.length} challenges remaining
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab as any} className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Today's Challenges</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todaysChallenges.map(challenge => (
              <Card key={challenge.id} className="overflow-hidden">
                <div 
                  className={`h-2 ${challenge.completionStatus === 'completed' ? 'bg-green-500' : 
                                   challenge.completionStatus === 'in-progress' ? 'bg-blue-500' : 
                                   'bg-gray-300'}`} 
                />
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap gap-2 mb-1">
                    <Badge variant="outline" className={getChallengeBadgeColor(challenge.type)}>
                      {challenge.type === 'quiz' ? 'Quiz' : 
                       challenge.type === 'problem' ? 'Problem' : 
                       challenge.type === 'activity' ? 'Activity' :
                       'Streak'}
                    </Badge>
                    <Badge variant="outline" className={getDifficultyBadgeColor(challenge.difficulty)}>
                      {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                    </Badge>
                    <Badge variant="outline" className={getStatusBadgeColor(challenge.completionStatus)}>
                      {challenge.completionStatus === 'completed' ? 'Completed' :
                       challenge.completionStatus === 'in-progress' ? 'In Progress' : 
                       'Not Started'}
                    </Badge>
                  </div>
                  <CardTitle>{challenge.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {challenge.timeEstimate} minutes
                    {challenge.completedAt && (
                      <>
                        <span className="mx-1">•</span>
                        <span>Completed {new Date(challenge.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm font-medium text-amber-600">
                      <Star className="h-4 w-4 fill-amber-500" />
                      <span>{challenge.points} points</span>
                    </div>
                    
                    {challenge.completionStatus === 'completed' ? (
                      <div className="flex items-center gap-1 text-green-600 text-sm">
                        <CheckCircle className="h-4 w-4" />
                        <span>Challenge completed</span>
                      </div>
                    ) : challenge.expiresAt ? (
                      <div className="flex items-center gap-1 text-red-500 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>Expires in {Math.floor((new Date(challenge.expiresAt).getTime() - Date.now()) / (60 * 60 * 1000))} hours</span>
                      </div>
                    ) : null}
                  </div>
                </CardContent>
                <CardFooter className="pt-3">
                  <Button 
                    className="w-full"
                    variant={challenge.completionStatus === 'completed' ? "outline" : "default"}
                    disabled={challenge.completionStatus === 'completed'}
                  >
                    {challenge.completionStatus === 'completed' ? 'View Results' : 
                     challenge.completionStatus === 'in-progress' ? 'Continue Challenge' : 
                     'Start Challenge'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map(achievement => (
              <Card key={achievement.id} className={`overflow-hidden ${achievement.completed ? 'border-yellow-300' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <div className={`p-2 rounded-full ${achievement.completed ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                      <achievement.icon className={`h-6 w-6 ${achievement.completed ? 'text-yellow-600' : 'text-gray-600'}`} />
                    </div>
                    {achievement.completed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, type: 'spring' }}
                      >
                        <Trophy className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                      </motion.div>
                    )}
                  </div>
                  <CardTitle className="text-base">{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.maxProgress}</span>
                    </div>
                    <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Weekly Points Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 5 }, (_, i) => ({
                  position: i + 1,
                  name: ['Amit Kumar', 'Priya Singh', 'Rahul Verma', 'Deepika Patel', 'You'][i],
                  points: [1520, 1475, 1385, 1290, 1250][i],
                  avatar: i === 4 ? '/avatar-placeholder.png' : `https://randomuser.me/api/portraits/${i % 2 ? 'women' : 'men'}/${i + 1}.jpg`
                })).map((user, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      user.name === 'You' 
                        ? 'bg-blue-50 border border-blue-200' 
                        : index === 0 
                          ? 'bg-yellow-50 border border-yellow-200' 
                          : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-amber-700 text-white' :
                        'bg-gray-200 text-gray-700'
                      }`}>
                        {user.position}
                      </div>
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        {index === 0 && (
                          <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800 border-yellow-200">
                            Leader
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{user.points.toLocaleString()}</span>
                      <Star className="h-4 w-4 text-yellow-500" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default DailyChallengesPage;
