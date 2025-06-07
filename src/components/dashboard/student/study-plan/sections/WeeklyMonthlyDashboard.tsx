
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, TrendingUp, Target, BookOpen } from 'lucide-react';

export const WeeklyMonthlyDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const weeklyData = {
    totalHours: 28,
    targetHours: 35,
    completedSessions: 12,
    totalSessions: 15,
    subjects: [
      { name: 'Physics', hours: 10, target: 12, progress: 83 },
      { name: 'Chemistry', hours: 8, target: 10, progress: 80 },
      { name: 'Biology', hours: 10, target: 13, progress: 77 }
    ],
    dailyProgress: [
      { day: 'Mon', hours: 4, target: 5 },
      { day: 'Tue', hours: 5, target: 5 },
      { day: 'Wed', hours: 3, target: 5 },
      { day: 'Thu', hours: 6, target: 5 },
      { day: 'Fri', hours: 4, target: 5 },
      { day: 'Sat', hours: 6, target: 5 },
      { day: 'Sun', hours: 0, target: 5 }
    ]
  };

  const monthlyData = {
    totalHours: 120,
    targetHours: 140,
    completedSessions: 48,
    totalSessions: 60,
    weeklyProgress: [
      { week: 'Week 1', hours: 32, target: 35 },
      { week: 'Week 2', hours: 28, target: 35 },
      { week: 'Week 3', hours: 35, target: 35 },
      { week: 'Week 4', hours: 25, target: 35 }
    ]
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly & Monthly Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
            </TabsList>

            <TabsContent value="week">
              <div className="space-y-6">
                {/* Weekly Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">Total Hours</span>
                      </div>
                      <div className="text-2xl font-bold">{weeklyData.totalHours}h</div>
                      <div className="text-xs text-gray-500">Target: {weeklyData.targetHours}h</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-600">Sessions</span>
                      </div>
                      <div className="text-2xl font-bold">{weeklyData.completedSessions}/{weeklyData.totalSessions}</div>
                      <div className="text-xs text-gray-500">Completed</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                        <span className="text-sm text-gray-600">Progress</span>
                      </div>
                      <div className="text-2xl font-bold">{Math.round((weeklyData.totalHours / weeklyData.targetHours) * 100)}%</div>
                      <div className="text-xs text-gray-500">of target</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-orange-600" />
                        <span className="text-sm text-gray-600">Avg/Day</span>
                      </div>
                      <div className="text-2xl font-bold">{(weeklyData.totalHours / 7).toFixed(1)}h</div>
                      <div className="text-xs text-gray-500">Daily average</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Subject Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Subject-wise Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {weeklyData.subjects.map((subject, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{subject.name}</span>
                            <div className="text-sm text-gray-600">
                              {subject.hours}h / {subject.target}h
                            </div>
                          </div>
                          <Progress value={subject.progress} className="h-2" />
                          <div className="text-xs text-gray-500">
                            {subject.progress}% completed
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Daily Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Daily Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-2">
                      {weeklyData.dailyProgress.map((day, index) => (
                        <div key={index} className="text-center">
                          <div className="text-xs font-medium mb-2">{day.day}</div>
                          <div className="h-20 bg-gray-100 rounded-lg flex flex-col justify-end p-1">
                            <div 
                              className="bg-blue-500 rounded" 
                              style={{ 
                                height: `${(day.hours / day.target) * 100}%`,
                                minHeight: day.hours > 0 ? '8px' : '0'
                              }}
                            />
                          </div>
                          <div className="text-xs mt-1">{day.hours}h</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="month">
              <div className="space-y-6">
                {/* Monthly Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">Total Hours</span>
                      </div>
                      <div className="text-2xl font-bold">{monthlyData.totalHours}h</div>
                      <div className="text-xs text-gray-500">Target: {monthlyData.targetHours}h</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-600">Sessions</span>
                      </div>
                      <div className="text-2xl font-bold">{monthlyData.completedSessions}/{monthlyData.totalSessions}</div>
                      <div className="text-xs text-gray-500">Completed</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                        <span className="text-sm text-gray-600">Progress</span>
                      </div>
                      <div className="text-2xl font-bold">{Math.round((monthlyData.totalHours / monthlyData.targetHours) * 100)}%</div>
                      <div className="text-xs text-gray-500">of target</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-orange-600" />
                        <span className="text-sm text-gray-600">Avg/Week</span>
                      </div>
                      <div className="text-2xl font-bold">{(monthlyData.totalHours / 4).toFixed(1)}h</div>
                      <div className="text-xs text-gray-500">Weekly average</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Weekly Progress Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Weekly Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {monthlyData.weeklyProgress.map((week, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{week.week}</span>
                            <div className="text-sm text-gray-600">
                              {week.hours}h / {week.target}h
                            </div>
                          </div>
                          <Progress value={(week.hours / week.target) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
