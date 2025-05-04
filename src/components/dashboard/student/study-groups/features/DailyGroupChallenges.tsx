
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Award, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Star, 
  TrendingUp, 
  Users,
  CheckCheck,
  ArrowRight 
} from 'lucide-react';
import { useStudyGroups } from '../hooks/useStudyGroups';

interface DailyGroupChallengesProps {
  groupId: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'problem' | 'activity' | 'reading';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  dueDate: Date;
  status: 'active' | 'completed' | 'expired';
  completedBy: Array<{
    userId: string;
    name: string;
    avatar?: string;
    completedAt: Date;
    points: number;
  }>;
  totalParticipants: number;
  successRate: number;
}

const DailyGroupChallenges: React.FC<DailyGroupChallengesProps> = ({ groupId }) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const { fetchGroupChallenges } = useStudyGroups();

  useEffect(() => {
    const loadChallenges = async () => {
      try {
        setLoading(true);
        const fetchedChallenges = await fetchGroupChallenges(groupId);
        setChallenges(fetchedChallenges);
      } catch (error) {
        console.error('Failed to load challenges:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChallenges();
  }, [groupId, fetchGroupChallenges]);

  const getChallengeBadgeColor = (type: string) => {
    switch (type) {
      case 'quiz': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'problem': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'activity': return 'bg-green-100 text-green-800 border-green-200';
      case 'reading': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
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
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'expired': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const activeChallenges = challenges.filter(c => c.status === 'active');
  const completedChallenges = challenges.filter(c => c.status === 'completed');

  const groupLeaderboard = challenges
    .flatMap(c => c.completedBy)
    .reduce((acc, user) => {
      const existingUser = acc.find(u => u.userId === user.userId);
      if (existingUser) {
        existingUser.points += user.points;
        existingUser.challengesCompleted += 1;
      } else {
        acc.push({
          userId: user.userId,
          name: user.name,
          avatar: user.avatar,
          points: user.points,
          challengesCompleted: 1
        });
      }
      return acc;
    }, [] as Array<{
      userId: string;
      name: string;
      avatar?: string;
      points: number;
      challengesCompleted: number;
    }>)
    .sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-6">
      {activeChallenges.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Active Challenges
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeChallenges.map(challenge => (
              <Card key={challenge.id} className="overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2" />
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap gap-2 mb-1">
                    <Badge variant="outline" className={getChallengeBadgeColor(challenge.type)}>
                      {challenge.type.charAt(0).toUpperCase() + challenge.type.slice(1)}
                    </Badge>
                    <Badge variant="outline" className={getDifficultyBadgeColor(challenge.difficulty)}>
                      {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                    </Badge>
                    <Badge variant="outline" className={getStatusBadgeColor(challenge.status)}>
                      Active
                    </Badge>
                  </div>
                  <CardTitle>{challenge.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Due: {new Date(challenge.dueDate).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Completion Rate</span>
                    </div>
                    <span>{Math.round(challenge.successRate * 100)}%</span>
                  </div>
                  <Progress value={challenge.successRate * 100} className="h-1" />
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      <span>{challenge.completedBy.length} of {challenge.totalParticipants} completed</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-amber-600">
                      <Star className="h-4 w-4 fill-amber-500" />
                      <span>{challenge.points} points</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 pt-3">
                  <Button className="w-full flex items-center justify-center gap-1">
                    <Award className="h-4 w-4 mr-1" />
                    Take Challenge
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <CheckCheck className="h-5 w-5" />
            Recent Completed Challenges
          </h3>
          {completedChallenges.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-100">
              <h4 className="font-medium text-gray-900">No completed challenges yet</h4>
              <p className="text-sm text-gray-500 mt-1">
                Complete challenges to see them here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {completedChallenges.slice(0, 3).map(challenge => (
                <Card key={challenge.id} className="overflow-hidden">
                  <div className="flex">
                    <div className="bg-green-500 w-2" />
                    <div className="p-4 flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{challenge.title}</h4>
                          <p className="text-sm text-gray-500">{new Date(challenge.dueDate).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-1 font-medium text-amber-600">
                          <Star className="h-4 w-4 fill-amber-500" />
                          <span>{challenge.points} points</span>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="flex -space-x-2 overflow-hidden">
                          {challenge.completedBy.slice(0, 5).map((user, i) => (
                            <Avatar key={i} className="h-6 w-6 border-2 border-white">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                          ))}
                          {challenge.completedBy.length > 5 && (
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 border-2 border-white text-xs">
                              +{challenge.completedBy.length - 5}
                            </div>
                          )}
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs flex items-center">
                          View Results
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Leaderboard
          </h3>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Group Rankings</CardTitle>
              <CardDescription>Based on challenge points</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              {groupLeaderboard.length === 0 ? (
                <p className="text-sm text-gray-500 py-4 text-center">
                  Complete challenges to appear on the leaderboard
                </p>
              ) : (
                <div className="space-y-3">
                  {groupLeaderboard.slice(0, 5).map((user, index) => (
                    <div key={user.userId} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 text-center font-medium text-sm">{index + 1}</div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.challengesCompleted} challenges</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-600 font-medium">
                        <span>{user.points}</span>
                        <Star className="h-4 w-4 fill-amber-500" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DailyGroupChallenges;
