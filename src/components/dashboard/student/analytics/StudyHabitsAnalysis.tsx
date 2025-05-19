
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Clock, Calendar, CheckCircle, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for study habits
const timeDistributionData = [
  { hour: '6-8 AM', minutes: 45, efficiency: 85 },
  { hour: '8-10 AM', minutes: 120, efficiency: 90 },
  { hour: '10-12 PM', minutes: 90, efficiency: 80 },
  { hour: '12-2 PM', minutes: 30, efficiency: 65 },
  { hour: '2-4 PM', minutes: 60, efficiency: 75 },
  { hour: '4-6 PM', minutes: 80, efficiency: 85 },
  { hour: '6-8 PM', minutes: 150, efficiency: 95 },
  { hour: '8-10 PM', minutes: 120, efficiency: 90 },
  { hour: '10-12 AM', minutes: 45, efficiency: 70 }
];

const weekdayData = [
  { day: 'Monday', minutes: 190, retention: 75 },
  { day: 'Tuesday', minutes: 220, retention: 82 },
  { day: 'Wednesday', minutes: 200, retention: 78 },
  { day: 'Thursday', minutes: 180, retention: 80 },
  { day: 'Friday', minutes: 130, retention: 72 },
  { day: 'Saturday', minutes: 240, retention: 88 },
  { day: 'Sunday', minutes: 210, retention: 85 }
];

const consistencyData = [
  { name: 'Completed', value: 18, color: '#4ade80' },
  { name: 'Missed', value: 3, color: '#f87171' }
];

const weeklyProgressData = [
  { week: 'Week 1', completed: 65, target: 80 },
  { week: 'Week 2', completed: 72, target: 80 },
  { week: 'Week 3', completed: 78, target: 80 },
  { week: 'Week 4', completed: 85, target: 80 },
  { week: 'Week 5', completed: 82, target: 80 },
  { week: 'Week 6', completed: 88, target: 80 },
  { week: 'Week 7', completed: 92, target: 80 }
];

const COLORS = ['#4ade80', '#f87171'];

const recommendations = [
  {
    id: 1,
    title: 'Optimize Your Morning Sessions',
    description: 'Your data shows high efficiency between 8-10 AM. Consider scheduling complex topics during this peak performance time.',
    type: 'optimization'
  },
  {
    id: 2,
    title: 'Leverage Weekend Productivity',
    description: 'You show excellent retention on Saturdays and Sundays. Use these days for challenging material and comprehensive reviews.',
    type: 'schedule'
  },
  {
    id: 3,
    title: 'Short Break Improvement',
    description: 'Try the 50/10 rule: 50 minutes of focused study followed by a 10-minute break to maintain your high efficiency scores.',
    type: 'technique'
  },
  {
    id: 4,
    title: 'Evening Revision Strategy',
    description: 'Your 6-8 PM window shows peak efficiency. Schedule revision sessions during this time for better retention.',
    type: 'optimization'
  }
];

const StudyHabitsAnalysis = () => {
  const [activeTab, setActiveTab] = useState('time-distribution');
  const [timeRange, setTimeRange] = useState('month');

  // Calculate best and worst study times
  const sortedEfficiency = [...timeDistributionData].sort((a, b) => b.efficiency - a.efficiency);
  const bestTime = sortedEfficiency[0].hour;
  const worstTime = sortedEfficiency[sortedEfficiency.length - 1].hour;

  // Calculate best and worst days
  const sortedDays = [...weekdayData].sort((a, b) => b.retention - a.retention);
  const bestDay = sortedDays[0].day;
  const worstDay = sortedDays[sortedDays.length - 1].day;

  // Calculate streak and consistency metrics
  const currentStreak = 12; // Mock data
  const bestStreak = 15; // Mock data
  const consistencyScore = 86; // Mock data

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Study Habits Analysis</h2>
          <p className="text-muted-foreground">Unlock insights into your study patterns and optimize your learning</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={timeRange === 'week' ? 'default' : 'outline'}
            onClick={() => setTimeRange('week')}
          >
            Week
          </Button>
          <Button
            size="sm"
            variant={timeRange === 'month' ? 'default' : 'outline'}
            onClick={() => setTimeRange('month')}
          >
            Month
          </Button>
          <Button
            size="sm"
            variant={timeRange === 'quarter' ? 'default' : 'outline'}
            onClick={() => setTimeRange('quarter')}
          >
            Quarter
          </Button>
        </div>
      </div>

      {/* Key metrics row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Current Study Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-baseline">
              <div className="text-3xl font-bold flex items-baseline">
                {currentStreak} <span className="text-sm text-muted-foreground ml-1">days</span>
              </div>
              <div className="text-sm text-green-600">
                Best: {bestStreak} days
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Consistency Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-baseline">
              <div className="text-3xl font-bold">{consistencyScore}%</div>
              <div className="flex items-center text-sm text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                Strong habit formation
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Plan Adherence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-baseline">
              <div className="text-3xl font-bold flex items-baseline">
                18 / 21 <span className="text-sm text-muted-foreground ml-1">tasks</span>
              </div>
              <div className="text-sm text-green-600">86% completed</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="time-distribution" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Time Patterns</span>
          </TabsTrigger>
          <TabsTrigger value="weekday-patterns" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Day Patterns</span>
          </TabsTrigger>
          <TabsTrigger value="consistency" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Consistency</span>
          </TabsTrigger>
        </TabsList>

        {/* Time Distribution Tab */}
        <TabsContent value="time-distribution">
          <Card>
            <CardHeader>
              <CardTitle>Daily Time Distribution</CardTitle>
              <CardDescription>
                When you study and how efficient your sessions are
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={timeDistributionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="minutes" name="Study Time (minutes)" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="efficiency" name="Efficiency Score (%)" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Key Insights</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Most productive time: <strong>{bestTime}</strong> ({sortedEfficiency[0].efficiency}% efficiency)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <span>Least productive time: <strong>{worstTime}</strong> ({sortedEfficiency[sortedEfficiency.length - 1].efficiency}% efficiency)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <span>Evening study sessions tend to be longer and more efficient</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Recommendations</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5" />
                      <span>Schedule challenging topics during your peak times (6-8 PM)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5" />
                      <span>Use afternoon slots for revision instead of learning new concepts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5" />
                      <span>Consider shifting some study time from 12-2 PM to more productive hours</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Weekday Patterns Tab */}
        <TabsContent value="weekday-patterns">
          <Card>
            <CardHeader>
              <CardTitle>Day of Week Patterns</CardTitle>
              <CardDescription>
                Your study habits across different days of the week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weekdayData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="minutes" name="Study Time (minutes)" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="retention" name="Retention Score (%)" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Weekly Distribution</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Most productive day: <strong>{bestDay}</strong> ({sortedDays[0].retention}% retention)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <span>Least productive day: <strong>{worstDay}</strong> ({sortedDays[sortedDays.length - 1].retention}% retention)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <span>Weekends show higher study time and better retention</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Optimization Tips</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5" />
                      <span>Schedule complex topics on Saturdays when your retention is highest</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5" />
                      <span>Use Fridays for lighter reviewing before weekend deep dives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5" />
                      <span>Add 30 more minutes to your Wednesday sessions to balance your week</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Consistency Tab */}
        <TabsContent value="consistency">
          <Card>
            <CardHeader>
              <CardTitle>Consistency Metrics</CardTitle>
              <CardDescription>
                Your adherence to study plans and consistency over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm text-muted-foreground mb-4">Study Plan Adherence</h4>
                  <div className="h-[250px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={consistencyData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {consistencyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-center mt-4">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                      86% Plan Completion
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-muted-foreground mb-4">Weekly Progress Tracking</h4>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={weeklyProgressData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="completed" name="Completed (%)" fill="#4ade80" />
                        <Bar dataKey="target" name="Target (%)" fill="#94a3b8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-center mt-4">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      Improving Week-over-Week
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/30">
                <h4 className="font-medium flex items-center gap-2 text-amber-800 dark:text-amber-300">
                  <Lightbulb className="h-5 w-5" />
                  Personalized Recommendations
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {recommendations.map((rec) => (
                    <div 
                      key={rec.id}
                      className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-amber-100 dark:border-amber-800/30"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{rec.title}</h5>
                        <Badge variant="outline" className="text-xs">
                          {rec.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyHabitsAnalysis;
