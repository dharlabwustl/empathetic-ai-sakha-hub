
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Clock, Calendar, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data
const weekdayData = [
  { name: 'Sun', hours: 1.5 },
  { name: 'Mon', hours: 3.2 },
  { name: 'Tue', hours: 2.8 },
  { name: 'Wed', hours: 3.5 },
  { name: 'Thu', hours: 2.1 },
  { name: 'Fri', hours: 1.2 },
  { name: 'Sat', hours: 2.9 },
];

const timeDistributionData = [
  { time: '6-8 AM', hours: 0.8, efficiency: 75 },
  { time: '8-10 AM', hours: 1.3, efficiency: 85 },
  { time: '10-12 PM', hours: 0.9, efficiency: 80 },
  { time: '12-2 PM', hours: 0.3, efficiency: 65 },
  { time: '2-4 PM', hours: 0.7, efficiency: 70 },
  { time: '4-6 PM', hours: 1.2, efficiency: 75 },
  { time: '6-8 PM', hours: 1.8, efficiency: 90 },
  { time: '8-10 PM', hours: 1.5, efficiency: 85 },
  { time: '10-12 AM', hours: 0.5, efficiency: 60 },
];

const consistencyData = [
  { week: 'Week 1', planned: 20, actual: 17, streak: 4 },
  { week: 'Week 2', planned: 20, actual: 18, streak: 5 },
  { week: 'Week 3', planned: 22, actual: 20, streak: 6 },
  { week: 'Week 4', planned: 22, actual: 15, streak: 3 },
  { week: 'Week 5', planned: 24, actual: 22, streak: 4 },
  { week: 'Week 6', planned: 24, actual: 23, streak: 7 },
];

const StudyHabitsAnalysis: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-500" />
              Day of Week Patterns
            </CardTitle>
            <CardDescription>
              Your study time distribution across the week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weekdayData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  formatter={(value) => [`${value} hours`, 'Study Time']}
                  labelFormatter={(label) => `${label}`}
                />
                <Bar dataKey="hours" fill="#8884d8" name="Study Hours" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4">
              <h4 className="font-medium text-sm mb-2">Insights:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Wednesday is your most productive day (3.5 hours)</li>
                <li>• Friday is your least productive day (1.2 hours)</li>
                <li>• You study more on weekends than average students</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-500" />
              Time Distribution
            </CardTitle>
            <CardDescription>
              When you study throughout the day and efficiency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={timeDistributionData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Efficiency %', angle: 90, position: 'insideRight' }} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="hours" fill="#8884d8" name="Study Hours" />
                <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#82ca9d" name="Efficiency %" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4">
              <h4 className="font-medium text-sm mb-2">Peak Performance Time:</h4>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800 border-green-200">6-8 PM</Badge>
                <span className="text-sm">90% efficiency</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-5 w-5 text-indigo-500" />
            Consistency Metrics
          </CardTitle>
          <CardDescription>
            Your study plan adherence and consistency over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
              <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-300">85%</h3>
              <p className="text-sm text-muted-foreground">Plan Adherence</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
              <h3 className="text-3xl font-bold text-green-700 dark:text-green-300">7 Days</h3>
              <p className="text-sm text-muted-foreground">Current Streak</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
              <h3 className="text-3xl font-bold text-purple-700 dark:text-purple-300">4.8</h3>
              <p className="text-sm text-muted-foreground">Weekly Consistency Score</p>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={consistencyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="planned" fill="#8884d8" name="Planned Hours" />
              <Bar yAxisId="left" dataKey="actual" fill="#82ca9d" name="Actual Hours" />
              <Line yAxisId="right" type="monotone" dataKey="streak" stroke="#ff7300" name="Max Streak" />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="mt-6">
            <h4 className="font-medium mb-2">AI Recommendations:</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0 mt-0.5">1</div>
                <p>Schedule consistent study blocks at 6-8 PM when your efficiency peaks.</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0 mt-0.5">2</div>
                <p>Add more study time on Fridays to maintain momentum throughout the week.</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0 mt-0.5">3</div>
                <p>Break your study sessions into 50-minute blocks with 10-minute breaks to optimize retention.</p>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyHabitsAnalysis;
