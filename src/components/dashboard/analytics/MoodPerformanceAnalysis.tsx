
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell } from 'recharts';
import { Brain, Brain as BrainIcon, Smile } from 'lucide-react';
import { MoodType } from '@/types/user/base';

// Mock data for mood-performance correlation
const moodPerformanceData = [
  { mood: MoodType.MOTIVATED, score: 92, retention: 88, hours: 3.5 },
  { mood: MoodType.HAPPY, score: 85, retention: 80, hours: 3.2 },
  { mood: MoodType.FOCUSED, score: 89, retention: 85, hours: 4.0 },
  { mood: MoodType.CURIOUS, score: 82, retention: 79, hours: 3.8 },
  { mood: MoodType.TIRED, score: 68, retention: 60, hours: 2.5 },
  { mood: MoodType.STRESSED, score: 72, retention: 65, hours: 2.8 },
  { mood: MoodType.ANXIOUS, score: 74, retention: 68, hours: 3.0 },
  { mood: MoodType.OVERWHELMED, score: 65, retention: 58, hours: 2.2 },
];

const moodDistributionData = [
  { name: MoodType.MOTIVATED, value: 25, color: '#4CAF50' },
  { name: MoodType.HAPPY, value: 20, color: '#2196F3' },
  { name: MoodType.FOCUSED, value: 18, color: '#9C27B0' },
  { name: MoodType.CURIOUS, value: 15, color: '#FF9800' },
  { name: MoodType.TIRED, value: 8, color: '#607D8B' },
  { name: MoodType.STRESSED, value: 7, color: '#F44336' },
  { name: MoodType.ANXIOUS, value: 5, color: '#FF5722' },
  { name: MoodType.OVERWHELMED, value: 2, color: '#795548' },
];

// Efficiency by time window
const moodEfficiencyData = [
  { mood: MoodType.MOTIVATED, morning: 95, afternoon: 85, evening: 88 },
  { mood: MoodType.HAPPY, morning: 90, afternoon: 82, evening: 85 },
  { mood: MoodType.FOCUSED, morning: 92, afternoon: 80, evening: 75 },
  { mood: MoodType.TIRED, morning: 70, afternoon: 65, evening: 60 },
  { mood: MoodType.STRESSED, morning: 75, afternoon: 72, evening: 70 },
  { mood: MoodType.ANXIOUS, morning: 78, afternoon: 70, evening: 68 },
];

const MoodPerformanceAnalysis: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Smile className="mr-2 h-5 w-5 text-primary" />
          Mood-Performance Correlation
        </CardTitle>
        <CardDescription>
          How your emotional state impacts your study effectiveness
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="impact" className="w-full">
          <TabsList className="grid grid-cols-3 gap-2 mb-4">
            <TabsTrigger value="impact">Mood Impact</TabsTrigger>
            <TabsTrigger value="efficiency">Efficiency Metrics</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="impact" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis type="category" dataKey="mood" name="Mood" />
                    <YAxis type="number" dataKey="score" name="Test Score" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Mood vs Score" data={moodPerformanceData} fill="#8884d8" />
                  </ScatterChart>
                </ResponsiveContainer>
                <p className="text-xs text-center text-muted-foreground mt-2">Mood vs. Test Performance</p>
              </div>
              
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={moodDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {moodDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <p className="text-xs text-center text-muted-foreground mt-2">Your Study Mood Distribution</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-md mb-2">Key Insights:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>You perform best when in a <span className="font-semibold text-emerald-600">Motivated</span> or <span className="font-semibold text-purple-600">Focused</span> state</li>
                <li>There's a 28% performance drop when studying while feeling overwhelmed</li>
                <li>Material retention is most affected by your emotional state</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="efficiency" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodEfficiencyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="mood" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="morning" stroke="#8884d8" name="Morning Efficiency" />
                  <Line type="monotone" dataKey="afternoon" stroke="#82ca9d" name="Afternoon Efficiency" />
                  <Line type="monotone" dataKey="evening" stroke="#ffc658" name="Evening Efficiency" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h4 className="font-medium text-md mb-2">Efficiency Analysis:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Morning studying is most effective across all mood states</li>
                <li>When motivated, your efficiency remains high throughout the day</li>
                <li>Afternoon slumps are most pronounced when you're tired or anxious</li>
                <li>Your efficiency drops by an average of 15% in the evening when stressed</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-primary/5 p-4 rounded-lg">
                <h4 className="font-medium flex items-center mb-2">
                  <Brain className="mr-2 h-4 w-4 text-primary" />
                  Schedule Optimization
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Schedule your most challenging topics during morning hours when you're typically more motivated</li>
                  <li>Use afternoon sessions for review rather than learning new material</li>
                  <li>Consider 5-minute mindfulness exercises before evening study sessions</li>
                </ul>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-lg">
                <h4 className="font-medium flex items-center mb-2">
                  <BrainIcon className="mr-2 h-4 w-4 text-primary" />
                  Mood Management
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Begin study sessions with 2-minute breathing exercises</li>
                  <li>Use the Pomodoro technique with mood check-ins between sessions</li>
                  <li>Try switching subjects when feeling stressed with one topic</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800 p-4 rounded-lg mt-4">
              <h4 className="font-semibold text-sky-800 dark:text-sky-300">Personalized Recommendation</h4>
              <p className="text-sm mt-2">Based on your patterns, we recommend starting your day with a 25-minute focused study session on Biology topics when your motivation is highest, followed by Physics in the afternoon. Reserve Chemistry for your weekend sessions when you report being most focused.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MoodPerformanceAnalysis;
