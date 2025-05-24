
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Trophy, Settings, TrendingUp, Users, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StudyPlanManagement = () => {
  const [templates, setTemplates] = useState([
    { id: 1, name: 'JEE Advanced 2025', subjects: 3, users: 450, effectiveness: 85 },
    { id: 2, name: 'NEET 2025', subjects: 4, users: 380, effectiveness: 78 },
    { id: 3, name: 'CAT 2025', subjects: 3, users: 200, effectiveness: 82 },
    { id: 4, name: 'GATE CS 2025', subjects: 5, users: 150, effectiveness: 90 }
  ]);

  const progressData = [
    { week: 'Week 1', completed: 85, target: 100 },
    { week: 'Week 2', completed: 92, target: 100 },
    { week: 'Week 3', completed: 78, target: 100 },
    { week: 'Week 4', completed: 95, target: 100 },
    { week: 'Week 5', completed: 88, target: 100 }
  ];

  const streakSettings = {
    minimumStreak: 7,
    rewardPoints: 100,
    badgeThresholds: [7, 14, 30, 60, 100],
    resetGracePeriod: 2
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Templates</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.length}</div>
            <p className="text-xs text-muted-foreground">Study plan templates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,180</div>
            <p className="text-xs text-green-600">+8% this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-purple-600">Weekly average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Streaks</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-yellow-600">Active streaks 7+ days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Plan Templates</TabsTrigger>
          <TabsTrigger value="analytics">Progress Analytics</TabsTrigger>
          <TabsTrigger value="streaks">Streak Management</TabsTrigger>
          <TabsTrigger value="benchmarks">Performance Benchmarks</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Study Plan Templates</h3>
            <Button>Create New Template</Button>
          </div>

          <div className="grid gap-4">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span>{template.subjects} subjects</span>
                        <span>{template.users} active users</span>
                        <Badge className="bg-green-100 text-green-800">
                          {template.effectiveness}% effective
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Duplicate</Button>
                      <Button variant="outline" size="sm">Analytics</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress Completion Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#3B82F6" />
                  <Bar dataKey="target" fill="#E5E7EB" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {templates.sort((a, b) => b.effectiveness - a.effectiveness).map((plan, index) => (
                    <div key={plan.id} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{plan.name}</span>
                        <div className="text-sm text-gray-500">{plan.users} users</div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {plan.effectiveness}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subject Completion Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { subject: 'Mathematics', completion: 89 },
                    { subject: 'Physics', completion: 82 },
                    { subject: 'Chemistry', completion: 85 },
                    { subject: 'Biology', completion: 78 }
                  ].map((subject) => (
                    <div key={subject.subject} className="flex justify-between items-center">
                      <span className="font-medium">{subject.subject}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${subject.completion}%` }}
                          />
                        </div>
                        <span className="text-sm">{subject.completion}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="streaks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Study Streak Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium">Minimum Streak for Reward</label>
                  <input 
                    type="number" 
                    value={streakSettings.minimumStreak}
                    className="w-full mt-1 p-2 border rounded-md"
                  />
                  <p className="text-xs text-gray-500 mt-1">Days required for first reward</p>
                </div>

                <div>
                  <label className="text-sm font-medium">Reward Points</label>
                  <input 
                    type="number" 
                    value={streakSettings.rewardPoints}
                    className="w-full mt-1 p-2 border rounded-md"
                  />
                  <p className="text-xs text-gray-500 mt-1">Points awarded per streak milestone</p>
                </div>

                <div>
                  <label className="text-sm font-medium">Grace Period (Days)</label>
                  <input 
                    type="number" 
                    value={streakSettings.resetGracePeriod}
                    className="w-full mt-1 p-2 border rounded-md"
                  />
                  <p className="text-xs text-gray-500 mt-1">Days before streak resets</p>
                </div>

                <div>
                  <label className="text-sm font-medium">Badge Thresholds</label>
                  <input 
                    type="text" 
                    value={streakSettings.badgeThresholds.join(', ')}
                    className="w-full mt-1 p-2 border rounded-md"
                  />
                  <p className="text-xs text-gray-500 mt-1">Comma-separated streak days for badges</p>
                </div>
              </div>

              <Button className="w-full">Save Streak Settings</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Streak Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Ravi Kumar", streak: 45, points: 450 },
                  { name: "Priya Sharma", streak: 38, points: 380 },
                  { name: "Amit Singh", streak: 32, points: 320 },
                  { name: "Sneha Patel", streak: 28, points: 280 },
                  { name: "Raj Gupta", streak: 25, points: 250 }
                ].map((student, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">#{index + 1}</Badge>
                      <span className="font-medium">{student.name}</span>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span>🔥 {student.streak} days</span>
                      <span>⭐ {student.points} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Benchmark Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { exam: 'JEE Advanced', target: 85, current: 78 },
                  { exam: 'NEET', target: 80, current: 75 },
                  { exam: 'CAT', target: 90, current: 85 },
                  { exam: 'GATE', target: 75, current: 82 }
                ].map((benchmark, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-3">{benchmark.exam}</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm">Target Score (%)</label>
                        <input 
                          type="number" 
                          value={benchmark.target}
                          className="w-full mt-1 p-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm">Current Average</label>
                        <div className="text-lg font-medium text-blue-600">{benchmark.current}%</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(benchmark.current / benchmark.target) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full">Update Benchmarks</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyPlanManagement;
