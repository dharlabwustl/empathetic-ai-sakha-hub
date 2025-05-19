
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const StudyHabitsAnalysis: React.FC = () => {
  // Mock data for study time distribution by hour
  const timeDistributionData = [
    { hour: '6 AM', minutes: 15 },
    { hour: '7 AM', minutes: 30 },
    { hour: '8 AM', minutes: 45 },
    { hour: '9 AM', minutes: 60 },
    { hour: '10 AM', minutes: 75 },
    { hour: '11 AM', minutes: 60 },
    { hour: '12 PM', minutes: 30 },
    { hour: '1 PM', minutes: 15 },
    { hour: '2 PM', minutes: 30 },
    { hour: '3 PM', minutes: 45 },
    { hour: '4 PM', minutes: 60 },
    { hour: '5 PM', minutes: 75 },
    { hour: '6 PM', minutes: 90 },
    { hour: '7 PM', minutes: 75 },
    { hour: '8 PM', minutes: 60 },
    { hour: '9 PM', minutes: 45 },
    { hour: '10 PM', minutes: 30 },
    { hour: '11 PM', minutes: 15 },
  ];

  // Mock data for day of week patterns
  const dayOfWeekData = [
    { day: 'Monday', hours: 3.5, sessions: 4 },
    { day: 'Tuesday', hours: 4.2, sessions: 5 },
    { day: 'Wednesday', hours: 2.8, sessions: 3 },
    { day: 'Thursday', hours: 3.9, sessions: 4 },
    { day: 'Friday', hours: 3.0, sessions: 3 },
    { day: 'Saturday', hours: 5.5, sessions: 6 },
    { day: 'Sunday', hours: 4.8, sessions: 5 },
  ];

  // Mock data for consistency metrics
  const consistencyData = [
    { name: 'Completed', value: 24 },
    { name: 'Missed', value: 6 },
  ];
  
  const COLORS = ['#8884d8', '#DDDDDD'];

  // Mock data for recommendations
  const recommendations = [
    "Your peak productivity is between 5-7 PM. Consider scheduling challenging topics during this time.",
    "You're most consistent on Saturdays. Consider using this day for reviewing concepts.",
    "Your study sessions are more productive when broken into 45-minute blocks with 10-minute breaks.",
    "Morning sessions (9-11 AM) show higher retention rates for biology topics."
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Study Time Distribution by Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} label={{ value: 'Minutes', angle: -90, position: 'insideLeft', dy: 30 }} />
                  <Tooltip formatter={(value) => [`${value} min`, 'Study Time']} />
                  <Bar dataKey="minutes" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Your peak study hours are between 5-7 PM, with an average of 82 minutes per session.</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Day of Week Patterns Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Day-of-Week Study Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dayOfWeekData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 12 }} label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="hours" name="Total Hours" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="sessions" name="Study Sessions" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Saturday is your most productive day, with an average of 5.5 hours of study time.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consistency Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Consistency Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={consistencyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {consistencyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4 mt-4 md:mt-0">
                <div>
                  <p className="text-lg font-semibold">80%</p>
                  <p className="text-sm text-muted-foreground">Plan Adherence</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">12 Days</p>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">24/30</p>
                  <p className="text-sm text-muted-foreground">Tasks Completed This Month</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personalized Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Personalized Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 mr-2 mt-0.5">
                    <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 w-5 h-5 flex items-center justify-center text-purple-700 dark:text-purple-300 font-medium">
                      {index + 1}
                    </div>
                  </div>
                  <p className="text-sm">{recommendation}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudyHabitsAnalysis;
