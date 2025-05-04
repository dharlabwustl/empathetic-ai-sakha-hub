
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, Flame, Trophy, Star, Clock, Calendar, Users, CheckCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import BackButton from '@/components/dashboard/student/BackButton';

// Define challenge types
interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'streak' | 'special';
  category: 'quiz' | 'practice' | 'reading' | 'social';
  difficulty: 'easy' | 'medium' | 'hard';
  deadline: string;
  progress: number;
  participants: number;
  reward: string;
  xp: number;
  completed?: boolean;
  joined?: boolean;
}

// Define achievement types
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  completed: boolean;
  dateCompleted?: string;
  reward?: string;
}

const DailyChallengesView: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("active");
  
  // Mock data for challenges
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 'daily-1',
      title: 'Physics Quiz Challenge',
      description: 'Complete today\'s physics quiz on thermodynamics concepts',
      type: 'daily',
      category: 'quiz',
      difficulty: 'medium',
      deadline: 'Today',
      progress: 0,
      participants: 42,
      reward: '50 XP + Physics Badge',
      xp: 50,
    },
    {
      id: 'daily-2',
      title: 'Chemistry Flashcard Review',
      description: 'Review 20 organic chemistry flashcards',
      type: 'daily',
      category: 'practice',
      difficulty: 'easy',
      deadline: 'Today',
      progress: 35,
      participants: 28,
      reward: '30 XP',
      xp: 30,
    },
    {
      id: 'weekly-1',
      title: 'Biology Master Challenge',
      description: 'Score 80% or higher on the comprehensive biology practice test',
      type: 'weekly',
      category: 'practice',
      difficulty: 'hard',
      deadline: '4 days left',
      progress: 0,
      participants: 56,
      reward: '200 XP + Biology Expert Badge',
      xp: 200,
    },
    {
      id: 'streak-1',
      title: 'Study Streak',
      description: 'Maintain a 7-day study streak',
      type: 'streak',
      category: 'social',
      difficulty: 'medium',
      deadline: 'Ongoing',
      progress: 57,
      participants: 124,
      reward: '100 XP per 7 days',
      xp: 100,
    },
    {
      id: 'special-1',
      title: 'NEET Special Challenge',
      description: 'Complete all 5 NEET practice exams this month',
      type: 'special',
      category: 'practice',
      difficulty: 'hard',
      deadline: '21 days left',
      progress: 20,
      participants: 78,
      reward: '500 XP + NEET Champion Badge',
      xp: 500,
    }
  ]);
  
  // Mock data for achievements
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'ach-1',
      title: 'Quiz Master',
      description: 'Complete 10 daily quizzes',
      icon: <Award className="h-6 w-6 text-amber-500" />,
      progress: 70,
      completed: false,
      reward: 'Quiz Master Badge + 200 XP'
    },
    {
      id: 'ach-2',
      title: 'Consistent Learner',
      description: 'Maintain a 14-day study streak',
      icon: <Flame className="h-6 w-6 text-orange-500" />,
      progress: 50,
      completed: false,
      reward: 'Consistent Learner Badge + 300 XP'
    },
    {
      id: 'ach-3',
      title: 'Speed Reader',
      description: 'Complete 20 reading assignments',
      icon: <Star className="h-6 w-6 text-indigo-500" />,
      progress: 25,
      completed: false,
      reward: 'Speed Reader Badge + 150 XP'
    },
    {
      id: 'ach-4',
      title: 'First Quiz Completion',
      description: 'Complete your first daily quiz',
      icon: <Trophy className="h-6 w-6 text-yellow-500" />,
      progress: 100,
      completed: true,
      dateCompleted: '2023-04-28',
      reward: 'Beginner Badge + 50 XP'
    },
    {
      id: 'ach-5',
      title: 'Study Group Leader',
      description: 'Successfully host 3 study group sessions',
      icon: <Users className="h-6 w-6 text-blue-500" />,
      progress: 33,
      completed: false,
      reward: 'Leadership Badge + 250 XP'
    }
  ]);
  
  // Mock user stats
  const userStats = {
    totalXP: 1250,
    level: 5,
    nextLevelXP: 2000,
    completedChallenges: 12,
    currentStreak: 4,
    longestStreak: 9,
    rank: 'Rising Star',
  };
  
  const handleJoinChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(c => 
      c.id === challengeId ? { ...c, joined: true } : c
    ));
    
    toast({
      title: "Challenge joined!",
      description: "Good luck! Track your progress in the Challenges tab.",
    });
  };
  
  const handleStartChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(c => 
      c.id === challengeId 
        ? { ...c, progress: c.progress > 0 ? c.progress : 5 } 
        : c
    ));
    
    toast({
      title: "Challenge started!",
      description: "You've taken the first step. Keep going!",
    });
  };
  
  const handleCompleteChallengeTask = (challengeId: string) => {
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
      description: "Great job! Keep making progress on your challenge.",
    });
  };

  // Filter challenges based on active tab
  const activeChallenges = challenges.filter(c => !c.completed);
  const completedChallenges = challenges.filter(c => c.completed);
  const dailyChallenges = challenges.filter(c => c.type === 'daily');
  const weeklyAndSpecialChallenges = challenges.filter(c => c.type === 'weekly' || c.type === 'special');
  
  return (
    <div className="container py-6">
      <BackButton to="/dashboard/student" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 mt-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Trophy className="h-8 w-8 text-amber-500" />
            Daily Challenges
          </h1>
          <p className="text-muted-foreground">Complete challenges, earn rewards, and track your progress</p>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800">
              <Star className="h-3.5 w-3.5 mr-1" />
              Level {userStats.level} • {userStats.rank}
            </Badge>
          </div>
          <div className="text-sm text-right text-muted-foreground mt-2">
            <div className="flex justify-between w-full mb-1">
              <span>{userStats.totalXP} XP</span>
              <span>{userStats.nextLevelXP} XP</span>
            </div>
            <Progress value={(userStats.totalXP / userStats.nextLevelXP) * 100} className="h-1.5 w-40" />
          </div>
        </div>
      </div>
      
      {/* User Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-2.5">
              <Trophy className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed Challenges</p>
              <p className="text-2xl font-bold">{userStats.completedChallenges}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-full bg-orange-100 dark:bg-orange-900/30 p-2.5">
              <Flame className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-2xl font-bold">{userStats.currentStreak} days</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2.5">
              <Star className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total XP</p>
              <p className="text-2xl font-bold">{userStats.totalXP}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-2.5">
              <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Longest Streak</p>
              <p className="text-2xl font-bold">{userStats.longestStreak} days</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Challenges Section */}
      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly & Special</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeChallenges.length > 0 ? activeChallenges.map(challenge => (
              <ChallengeCard 
                key={challenge.id}
                challenge={challenge}
                onJoin={handleJoinChallenge}
                onStart={handleStartChallenge}
                onComplete={handleCompleteChallengeTask}
              />
            )) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No active challenges. Join one to start earning rewards!</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="daily" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailyChallenges.length > 0 ? dailyChallenges.map(challenge => (
              <ChallengeCard 
                key={challenge.id}
                challenge={challenge}
                onJoin={handleJoinChallenge}
                onStart={handleStartChallenge}
                onComplete={handleCompleteChallengeTask}
              />
            )) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No daily challenges available at the moment.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="weekly" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weeklyAndSpecialChallenges.length > 0 ? weeklyAndSpecialChallenges.map(challenge => (
              <ChallengeCard 
                key={challenge.id}
                challenge={challenge}
                onJoin={handleJoinChallenge}
                onStart={handleStartChallenge}
                onComplete={handleCompleteChallengeTask}
              />
            )) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No weekly or special challenges available at the moment.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedChallenges.length > 0 ? completedChallenges.map(challenge => (
              <ChallengeCard 
                key={challenge.id}
                challenge={challenge}
                onJoin={handleJoinChallenge}
                onStart={handleStartChallenge}
                onComplete={handleCompleteChallengeTask}
              />
            )) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">You haven't completed any challenges yet.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Achievements Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Award className="h-6 w-6 text-amber-500" />
          Achievements
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map(achievement => (
            <Card key={achievement.id} className={`overflow-hidden ${achievement.completed ? 'border-amber-200 dark:border-amber-800' : ''}`}>
              <CardHeader className={`p-4 ${achievement.completed ? 'bg-amber-50 dark:bg-amber-900/20' : ''}`}>
                <CardTitle className="text-base flex justify-between">
                  <span className="flex items-center gap-2">
                    {achievement.icon}
                    {achievement.title}
                  </span>
                  {achievement.completed && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </CardTitle>
                <CardDescription>{achievement.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="p-4 pt-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{achievement.progress}%</span>
                  </div>
                  <Progress value={achievement.progress} className="h-2" />
                  
                  {achievement.dateCompleted && (
                    <div className="text-xs text-muted-foreground mt-2">
                      <span>Completed on {achievement.dateCompleted}</span>
                    </div>
                  )}
                  
                  {achievement.reward && (
                    <div className="flex items-center gap-1 text-xs text-amber-600 mt-2">
                      <Trophy className="h-3.5 w-3.5" />
                      <span>{achievement.reward}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              
              {!achievement.completed && (
                <CardFooter className="p-4 pt-0">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="w-full"
                    disabled
                  >
                    In Progress
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Challenge Card Component
interface ChallengeCardProps {
  challenge: Challenge;
  onJoin: (id: string) => void;
  onStart: (id: string) => void;
  onComplete: (id: string) => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onJoin, onStart, onComplete }) => {
  const getChallengeTypeStyles = () => {
    switch(challenge.type) {
      case 'daily':
        return { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-800' };
      case 'weekly':
        return { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-800' };
      case 'streak':
        return { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-200 dark:border-orange-800' };
      case 'special':
        return { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-800' };
      default:
        return { bg: 'bg-gray-50 dark:bg-gray-800', text: 'text-gray-700 dark:text-gray-300', border: 'border-gray-200 dark:border-gray-700' };
    }
  };
  
  const getDifficultyBadge = () => {
    switch(challenge.difficulty) {
      case 'easy':
        return <Badge variant="outline" className="border-green-200 text-green-700 dark:text-green-300">Easy</Badge>;
      case 'medium':
        return <Badge variant="outline" className="border-amber-200 text-amber-700 dark:text-amber-300">Medium</Badge>;
      case 'hard':
        return <Badge variant="outline" className="border-red-200 text-red-700 dark:text-red-300">Hard</Badge>;
      default:
        return null;
    }
  };
  
  const typeStyles = getChallengeTypeStyles();
  
  return (
    <Card className={`overflow-hidden ${challenge.completed ? 'bg-green-50/50 dark:bg-green-900/10' : ''}`}>
      <CardHeader className={`p-4 ${challenge.completed ? '' : typeStyles.bg}`}>
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={`mb-2 ${typeStyles.border} ${typeStyles.text}`}>
            <div className="flex items-center gap-1 text-xs">
              {challenge.type === 'daily' ? (
                <Calendar className="h-3 w-3 mr-1" />
              ) : challenge.type === 'weekly' ? (
                <Calendar className="h-3 w-3 mr-1" />
              ) : challenge.type === 'special' ? (
                <Star className="h-3 w-3 mr-1" />
              ) : (
                <Flame className="h-3 w-3 mr-1" />
              )}
              {challenge.deadline}
            </div>
          </Badge>
          {getDifficultyBadge()}
        </div>
        <CardTitle className="text-base">{challenge.title}</CardTitle>
        <CardDescription>{challenge.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-muted-foreground mt-3">
            <span>Progress</span>
            <span>{challenge.progress}%</span>
          </div>
          <motion.div
            className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className={`h-2.5 rounded-full ${
                challenge.completed 
                  ? 'bg-green-500' 
                  : challenge.type === 'daily' 
                    ? 'bg-blue-600' 
                    : challenge.type === 'weekly'
                      ? 'bg-purple-600'
                      : challenge.type === 'special'
                        ? 'bg-amber-600'
                        : 'bg-orange-500'
              }`}
              style={{ width: '0%' }}
              animate={{ width: `${challenge.progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </motion.div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{challenge.participants} participants</span>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-amber-600">
              <Trophy className="h-3 w-3" />
              <span>{challenge.xp} XP</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {challenge.completed ? (
          <Button 
            variant="ghost" 
            className="w-full border border-green-200 text-green-700 hover:bg-green-50"
            disabled
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Completed
          </Button>
        ) : (
          <div className="flex w-full gap-2">
            {challenge.progress > 0 ? (
              <Button 
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onComplete(challenge.id)}
              >
                Continue
              </Button>
            ) : (
              <Button 
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onStart(challenge.id)}
              >
                <Clock className="h-3.5 w-3.5 mr-1" />
                Start
              </Button>
            )}
            
            <Button
              size="sm"
              className={`flex-1 ${
                challenge.type === 'daily' 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : challenge.type === 'weekly'
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : challenge.type === 'special'
                      ? 'bg-amber-600 hover:bg-amber-700'
                      : 'bg-orange-500 hover:bg-orange-600'
              }`}
              onClick={() => onJoin(challenge.id)}
              disabled={challenge.joined}
            >
              {challenge.joined ? 'Joined' : 'Join Challenge'}
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default DailyChallengesView;
