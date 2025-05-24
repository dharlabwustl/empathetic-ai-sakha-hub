
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Award, Trophy, Target, Star, Users, TrendingUp, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GamificationManagementTab = () => {
  const { toast } = useToast();

  const achievements = [
    { id: 1, name: 'First Study Session', description: 'Complete your first study session', icon: '🎯', points: 50, unlocked: 1247 },
    { id: 2, name: 'Week Warrior', description: 'Study for 7 consecutive days', icon: '🔥', points: 200, unlocked: 456 },
    { id: 3, name: 'Subject Master', description: 'Complete all topics in a subject', icon: '🏆', points: 500, unlocked: 189 },
    { id: 4, name: 'Speed Learner', description: 'Complete 10 lessons in one day', icon: '⚡', points: 300, unlocked: 234 }
  ];

  const pointsSystem = [
    { action: 'Daily Login', points: 10, frequency: 'Daily' },
    { action: 'Complete Lesson', points: 25, frequency: 'Per lesson' },
    { action: 'Practice Test', points: 50, frequency: 'Per test' },
    { action: 'Study Streak (7 days)', points: 100, frequency: 'Weekly' },
    { action: 'Perfect Score', points: 200, frequency: 'Per achievement' }
  ];

  const activeCompetitions = [
    { id: 1, name: 'February Study Challenge', participants: 1234, duration: '28 days', prize: 'Premium subscription', status: 'Active' },
    { id: 2, name: 'Physics Quiz Contest', participants: 567, duration: '7 days', prize: 'Study materials', status: 'Active' },
    { id: 3, name: 'Top Performer Monthly', participants: 2341, duration: '30 days', prize: 'Mentorship session', status: 'Upcoming' }
  ];

  const leaderboards = [
    { name: 'Global Study Points', type: 'Points', participants: 2543, leader: 'Aryan S.' },
    { name: 'Weekly Streaks', type: 'Streaks', participants: 1876, leader: 'Priya P.' },
    { name: 'Subject Mastery', type: 'Subjects', participants: 1234, leader: 'Rahul K.' },
    { name: 'Practice Tests', type: 'Tests', participants: 987, leader: 'Ananya D.' }
  ];

  const handleCreateAchievement = () => {
    toast({
      title: "Achievement Created",
      description: "New achievement has been added to the system"
    });
  };

  const handleLaunchCompetition = () => {
    toast({
      title: "Competition Launched",
      description: "New competition is now live for all users"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gamification & Motivation</h2>
          <p className="text-muted-foreground">Manage achievements, competitions, and reward systems</p>
        </div>
        <Button onClick={handleCreateAchievement}>
          <Award className="w-4 h-4 mr-2" />
          Create Achievement
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points Awarded</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4M</div>
            <p className="text-xs text-muted-foreground">+15% this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Competitions</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 ending soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements Unlocked</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,420</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Boost</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+42%</div>
            <p className="text-xs text-muted-foreground">vs non-gamified</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="achievements" className="space-y-4">
        <TabsList>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="points">Points System</TabsTrigger>
          <TabsTrigger value="competitions">Competitions</TabsTrigger>
          <TabsTrigger value="leaderboards">Leaderboards</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Achievement Management</CardTitle>
                <CardDescription>Create and manage user achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div>
                          <div className="font-medium">{achievement.name}</div>
                          <div className="text-sm text-muted-foreground">{achievement.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{achievement.points} pts</Badge>
                        <div className="text-sm text-muted-foreground">{achievement.unlocked} unlocked</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Create New Achievement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="achievement-name">Achievement Name</Label>
                    <Input id="achievement-name" placeholder="Enter achievement name" />
                  </div>
                  
                  <div>
                    <Label htmlFor="achievement-description">Description</Label>
                    <Textarea id="achievement-description" placeholder="Describe the achievement" />
                  </div>

                  <div>
                    <Label htmlFor="achievement-points">Points Value</Label>
                    <Input id="achievement-points" type="number" placeholder="100" />
                  </div>

                  <div>
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="study">Study</SelectItem>
                        <SelectItem value="streak">Streak</SelectItem>
                        <SelectItem value="mastery">Mastery</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full" onClick={handleCreateAchievement}>
                    Create Achievement
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="points" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Points System Configuration</CardTitle>
              <CardDescription>Manage how users earn points for different actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pointsSystem.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{item.action}</div>
                      <div className="text-sm text-muted-foreground">{item.frequency}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input className="w-20" value={item.points} />
                      <span className="text-sm text-muted-foreground">points</span>
                      <Button size="sm" variant="outline">Update</Button>
                    </div>
                  </div>
                ))}
                <Button className="w-full" variant="outline">Add New Action</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Competitions</CardTitle>
                <CardDescription>Manage ongoing and upcoming competitions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeCompetitions.map((competition) => (
                    <div key={competition.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{competition.name}</h4>
                        <Badge variant={competition.status === 'Active' ? 'default' : 'secondary'}>
                          {competition.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {competition.participants} participants • {competition.duration}
                      </div>
                      <div className="text-sm font-medium text-green-600 mb-3">
                        Prize: {competition.prize}
                      </div>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Create Competition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="competition-name">Competition Name</Label>
                    <Input id="competition-name" placeholder="Enter competition name" />
                  </div>
                  
                  <div>
                    <Label htmlFor="competition-duration">Duration</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1week">1 Week</SelectItem>
                        <SelectItem value="2weeks">2 Weeks</SelectItem>
                        <SelectItem value="1month">1 Month</SelectItem>
                        <SelectItem value="3months">3 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="competition-prize">Prize</Label>
                    <Input id="competition-prize" placeholder="Enter prize description" />
                  </div>

                  <Button className="w-full" onClick={handleLaunchCompetition}>
                    Launch Competition
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leaderboards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leaderboard Management</CardTitle>
              <CardDescription>Configure and monitor different leaderboards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {leaderboards.map((board, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{board.name}</h4>
                      <Badge variant="outline">{board.type}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {board.participants} participants
                    </div>
                    <div className="text-sm font-medium mb-3">
                      Current Leader: {board.leader}
                    </div>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline">View Full Board</Button>
                      <Button size="sm" variant="outline">Settings</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GamificationManagementTab;
