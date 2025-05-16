
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Clock, Calendar, CheckCircle, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for study habits analysis
const weekdayStudyData = [
  { day: 'Mon', hours: 3.5, efficiency: 75 },
  { day: 'Tue', hours: 2.8, efficiency: 82 },
  { day: 'Wed', hours: 4.2, efficiency: 68 },
  { day: 'Thu', hours: 3.0, efficiency: 90 },
  { day: 'Fri', hours: 1.5, efficiency: 65 },
  { day: 'Sat', hours: 5.5, efficiency: 85 },
  { day: 'Sun', hours: 4.8, efficiency: 78 },
];

const timeDistributionData = [
  { time: '6-8 AM', hours: 5.5, sessions: 8 },
  { time: '8-10 AM', hours: 6.2, sessions: 10 },
  { time: '10-12 PM', hours: 2.8, sessions: 4 },
  { time: '12-2 PM', hours: 1.5, sessions: 3 },
  { time: '2-4 PM', hours: 3.0, sessions: 5 },
  { time: '4-6 PM', hours: 4.2, sessions: 7 },
  { time: '6-8 PM', hours: 7.5, sessions: 12 },
  { time: '8-10 PM', hours: 8.8, sessions: 14 },
  { time: '10-12 AM', hours: 4.5, sessions: 6 },
];

// Study streak data
const streakData = {
  currentStreak: 12,
  longestStreak: 21,
  weeklyConsistency: 85,
  planAdherence: 78,
};

const StudyHabitsAnalysis: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Day-of-Week Study Patterns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weekdayStudyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="hours" name="Hours Studied" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="efficiency" name="Efficiency %" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <div>
                  <span className="font-medium">Most Productive:</span> Saturday
                </div>
                <div>
                  <span className="font-medium">Least Productive:</span> Friday
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              Consistency Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                <div className="flex items-center">
                  <span className="text-3xl font-bold">{streakData.currentStreak}</span>
                  <span className="text-sm ml-1 text-muted-foreground">days</span>
                </div>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <Activity className="h-6 w-6 text-primary" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Longest Streak</p>
                <div className="flex items-center">
                  <span className="text-3xl font-bold">{streakData.longestStreak}</span>
                  <span className="text-sm ml-1 text-muted-foreground">days</span>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                Record
              </Badge>
            </div>

            <div className="pt-2 space-y-2">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Weekly Consistency</span>
                  <span className="font-medium">{streakData.weeklyConsistency}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full mt-1">
                  <div 
                    className="h-2 bg-blue-500 rounded-full" 
                    style={{ width: `${streakData.weeklyConsistency}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm">
                  <span>Plan Adherence</span>
                  <span className="font-medium">{streakData.planAdherence}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full mt-1">
                  <div 
                    className="h-2 bg-indigo-500 rounded-full" 
                    style={{ width: `${streakData.planAdherence}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Time Distribution Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={timeDistributionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="hours" name="Hours Studied" fill="#8884d8" />
                <Bar dataKey="sessions" name="Number of Sessions" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Personalized Recommendations</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white text-xs mr-2 mt-0.5">1</span>
                <span>Your data shows you're most productive in the evening (8-10 PM). Consider scheduling important study sessions during this time.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white text-xs mr-2 mt-0.5">2</span>
                <span>Friday shows a significant drop in productivity. Try incorporating shorter, more focused sessions on this day.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white text-xs mr-2 mt-0.5">3</span>
                <span>You're close to beating your longest streak! Maintain consistency for 10 more days to set a new record.</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyHabitsAnalysis;
