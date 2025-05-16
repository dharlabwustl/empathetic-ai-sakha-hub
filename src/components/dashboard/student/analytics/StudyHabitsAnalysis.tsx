
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, BarChart as BarChartIcon } from 'lucide-react';

// Mock data for study patterns
const timeDistributionData = [
  { name: '6-9 AM', minutes: 120, productivity: 85 },
  { name: '9-12 PM', minutes: 180, productivity: 95 },
  { name: '12-3 PM', minutes: 90, productivity: 75 },
  { name: '3-6 PM', minutes: 60, productivity: 65 },
  { name: '6-9 PM', minutes: 150, productivity: 80 },
  { name: '9-12 AM', minutes: 120, productivity: 70 },
];

const dayWiseData = [
  { name: 'Monday', hours: 3.5, productivity: 85 },
  { name: 'Tuesday', hours: 4.2, productivity: 90 },
  { name: 'Wednesday', hours: 2.8, productivity: 75 },
  { name: 'Thursday', hours: 3.0, productivity: 80 },
  { name: 'Friday', hours: 2.5, productivity: 70 },
  { name: 'Saturday', hours: 5.0, productivity: 95 },
  { name: 'Sunday', hours: 4.5, productivity: 90 },
];

// Generate consistency data
const getConsistencyData = () => {
  const data = [];
  const today = new Date();

  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Generate some random consistency metrics
    const planned = Math.floor(Math.random() * 3) + 2; // 2-4 hours
    const actual = Math.random() > 0.2 
      ? planned - (Math.random() > 0.7 ? 0.5 : 0) 
      : planned - (Math.random() * 2); // Some days fail to meet target
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      planned: planned,
      actual: Math.max(0, actual)
    });
  }
  
  return data;
};

const consistencyData = getConsistencyData();

const StudyHabitsAnalysis = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Study Habits Analysis</h2>
      <p className="text-muted-foreground">
        Understand your study patterns to optimize your learning efficiency
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Current Streak
            </CardTitle>
            <CardDescription>Consecutive days studying</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7 Days</div>
            <p className="text-sm text-muted-foreground mt-1">
              Your longest streak was 14 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Weekly Consistency
            </CardTitle>
            <CardDescription>Study plan adherence</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">84%</div>
            <p className="text-sm text-muted-foreground mt-1">
              Up 7% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center gap-2">
              <BarChartIcon className="h-4 w-4" />
              Avg. Daily Study Time
            </CardTitle>
            <CardDescription>Hours invested per day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3.4 hrs</div>
            <p className="text-sm text-muted-foreground mt-1">
              Optimal time: 4-5 hours
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Time Distribution</CardTitle>
            <CardDescription>
              When you study the most and when you're most productive
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={timeDistributionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="minutes" name="Minutes" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="productivity" name="Productivity %" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm">
              <p className="font-medium">Key Insight:</p>
              <p className="text-muted-foreground">
                You're most productive during the morning hours (9AM-12PM). Consider scheduling difficult topics during this time.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Day-of-Week Patterns</CardTitle>
            <CardDescription>
              Your study hours and productivity by day of week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dayWiseData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="hours" name="Hours" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="productivity" name="Productivity %" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm">
              <p className="font-medium">Key Insight:</p>
              <p className="text-muted-foreground">
                You tend to study more and be more productive on weekends. Consider planning major topics for Saturday and Sunday.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Study Consistency</CardTitle>
          <CardDescription>
            Planned vs. actual study hours over the past month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={consistencyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="planned" name="Planned Hours" fill="#8884d8" />
                <Bar dataKey="actual" name="Actual Hours" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Personalized Recommendations:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="bg-blue-100 dark:bg-blue-800 p-1 rounded-full mt-0.5">
                  <Clock className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </div>
                <span>Schedule your most challenging topics between 9AM-12PM when your productivity peaks.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-blue-100 dark:bg-blue-800 p-1 rounded-full mt-0.5">
                  <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </div>
                <span>Leverage weekends more by planning comprehensive topic reviews and practice tests.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-blue-100 dark:bg-blue-800 p-1 rounded-full mt-0.5">
                  <BarChartIcon className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </div>
                <span>Consider shorter but more frequent study sessions on Wednesdays to improve consistency.</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyHabitsAnalysis;
