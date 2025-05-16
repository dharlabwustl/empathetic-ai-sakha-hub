
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Clock, Calendar, Award, TrendingUp } from 'lucide-react';

// Mock data for study sessions
const weekdayData = [
  { day: 'Mon', hours: 3.5, efficiency: 85 },
  { day: 'Tue', hours: 2.8, efficiency: 75 },
  { day: 'Wed', hours: 4.2, efficiency: 90 },
  { day: 'Thu', hours: 3.0, efficiency: 80 },
  { day: 'Fri', hours: 1.5, efficiency: 65 },
  { day: 'Sat', hours: 5.0, efficiency: 95 },
  { day: 'Sun', hours: 3.7, efficiency: 87 },
];

const timeOfDayData = [
  { time: '6-9 AM', hours: 4.2, efficiency: 95 },
  { time: '9-12 PM', hours: 3.0, efficiency: 85 },
  { time: '12-3 PM', hours: 1.5, efficiency: 70 },
  { time: '3-6 PM', hours: 2.8, efficiency: 75 },
  { time: '6-9 PM', hours: 3.5, efficiency: 90 },
  { time: '9-12 AM', hours: 2.0, efficiency: 65 },
];

const consistencyData = [
  { week: 'W1', planned: 20, actual: 18 },
  { week: 'W2', planned: 22, actual: 20 },
  { week: 'W3', planned: 25, actual: 19 },
  { week: 'W4', planned: 23, actual: 22 },
  { week: 'W5', planned: 24, actual: 23 },
  { week: 'W6', planned: 25, actual: 24 },
  { week: 'W7', planned: 26, actual: 25 },
  { week: 'W8', planned: 27, actual: 26 },
];

const StudyHabitsAnalysis: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Clock className="mr-2 h-5 w-5 text-primary" />
          Study Habits Analysis
        </CardTitle>
        <CardDescription>
          Understanding your study patterns for optimal productivity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="time" className="w-full">
          <TabsList className="grid grid-cols-3 gap-2 mb-4">
            <TabsTrigger value="time">Time Distribution</TabsTrigger>
            <TabsTrigger value="weekday">Day Patterns</TabsTrigger>
            <TabsTrigger value="consistency">Consistency</TabsTrigger>
          </TabsList>
          
          <TabsContent value="time" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeOfDayData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="hours" fill="#8884d8" name="Hours" />
                  <Bar yAxisId="right" dataKey="efficiency" fill="#82ca9d" name="Efficiency (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h4 className="font-medium text-md mb-2">Insights:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Your most productive study hours are between 6-9 AM with 95% efficiency</li>
                <li>Consider scheduling difficult topics during your high-efficiency time blocks</li>
                <li>Try to avoid studying between 12-3 PM as your efficiency drops significantly</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="weekday" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekdayData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="hours" fill="#8884d8" name="Hours" />
                  <Bar yAxisId="right" dataKey="efficiency" fill="#82ca9d" name="Efficiency (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h4 className="font-medium text-md mb-2">Insights:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Saturday is your most productive day with 5 hours of high-efficiency study</li>
                <li>Wednesday shows strong performance for mid-week studying</li>
                <li>Consider rescheduling Friday study sessions or changing your approach</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="consistency" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={consistencyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="planned" stroke="#8884d8" name="Planned Hours" />
                  <Line type="monotone" dataKey="actual" stroke="#82ca9d" name="Actual Hours" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h4 className="font-medium text-md mb-2">Consistency Metrics:</h4>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-primary/5 p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground">Current Study Streak</div>
                  <div className="text-2xl font-bold flex items-center">
                    <Award className="h-5 w-5 mr-1 text-primary" /> 12 Days
                  </div>
                </div>
                <div className="bg-primary/5 p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground">Plan Adherence</div>
                  <div className="text-2xl font-bold flex items-center">
                    <TrendingUp className="h-5 w-5 mr-1 text-emerald-500" /> 92%
                  </div>
                </div>
              </div>
              <h4 className="font-medium text-md mt-4 mb-2">Recommendations:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Your consistency has improved significantly over the last 8 weeks</li>
                <li>Try to maintain your current study streak for best results</li>
                <li>Consider using the pomodoro technique to improve focus during study sessions</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StudyHabitsAnalysis;
