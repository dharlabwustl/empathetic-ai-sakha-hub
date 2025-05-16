
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import { Brain, Gauge, Clock, BookOpen, AlertTriangle } from 'lucide-react';
import { MoodType } from '@/types/user/base';

// Mock data for mood-performance correlation
const moodPerformanceData = [
  { mood: MoodType.MOTIVATED, avgScore: 85, retention: 92, sessions: 12, productivity: 95 },
  { mood: MoodType.HAPPY, avgScore: 78, retention: 85, sessions: 8, productivity: 88 },
  { mood: MoodType.FOCUSED, avgScore: 90, retention: 95, sessions: 10, productivity: 98 },
  { mood: MoodType.CALM, avgScore: 82, retention: 88, sessions: 7, productivity: 90 },
  { mood: MoodType.NEUTRAL, avgScore: 75, retention: 80, sessions: 6, productivity: 82 },
  { mood: MoodType.TIRED, avgScore: 65, retention: 72, sessions: 4, productivity: 70 },
  { mood: MoodType.CONFUSED, avgScore: 60, retention: 68, sessions: 3, productivity: 65 },
  { mood: MoodType.ANXIOUS, avgScore: 72, retention: 75, sessions: 5, productivity: 78 },
  { mood: MoodType.STRESSED, avgScore: 68, retention: 70, sessions: 4, productivity: 72 },
];

// Generate mood timeline data (last 14 days)
const getMoodTimelineData = () => {
  const data = [];
  const today = new Date();
  const moods = Object.values(MoodType);
  
  for (let i = 13; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Generate random mood and performance for the day
    const mood = moods[Math.floor(Math.random() * moods.length)];
    const performance = 
      mood === MoodType.MOTIVATED || mood === MoodType.FOCUSED ? Math.floor(Math.random() * 15) + 80 :
      mood === MoodType.TIRED || mood === MoodType.CONFUSED ? Math.floor(Math.random() * 15) + 60 :
      Math.floor(Math.random() * 15) + 70;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood,
      performance
    });
  }
  
  return data;
};

const moodTimelineData = getMoodTimelineData();

// Helper function to convert enum to readable string
const formatMood = (mood: string) => {
  return mood.charAt(0) + mood.slice(1).toLowerCase();
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white shadow rounded border">
        <p className="font-medium">{`${formatMood(payload[0].payload.mood)}`}</p>
        <p className="text-sm">{`Performance: ${payload[0].payload.performance}%`}</p>
      </div>
    );
  }

  return null;
};

const MoodPerformanceCorrelation = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Mood-Performance Correlation</h2>
      <p className="text-muted-foreground">
        Understand how your emotional state affects your learning outcomes
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Top Mood for Learning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Focused</div>
            <p className="text-sm text-muted-foreground mt-1">
              90% average test score
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Challenging Mood
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Confused</div>
            <p className="text-sm text-muted-foreground mt-1">
              60% average test score
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              Mood Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">+30%</div>
            <p className="text-sm text-muted-foreground mt-1">
              Performance gap between best and worst moods
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Retention Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">27%</div>
            <p className="text-sm text-muted-foreground mt-1">
              Higher retention when motivated vs. tired
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Mood and Performance Timeline</CardTitle>
          <CardDescription>
            Your emotional state and test performance over the past 14 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={moodTimelineData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[50, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="performance" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }}
                  name="Test Performance" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mood Impact on Learning</CardTitle>
            <CardDescription>
              How different moods affect your test scores and retention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="category" 
                    dataKey="mood" 
                    name="Mood" 
                    tickFormatter={formatMood}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="avgScore" 
                    name="Average Score" 
                    unit="%" 
                  />
                  <ZAxis 
                    type="number" 
                    dataKey="sessions" 
                    range={[100, 500]} 
                    name="Study Sessions" 
                  />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter 
                    name="Mood Impact" 
                    data={moodPerformanceData} 
                    fill="#8884d8" 
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm">
              <p className="font-medium">Key Insight:</p>
              <p className="text-muted-foreground">
                Your test scores are significantly higher when you're in a focused or motivated mood compared to when you're confused or tired.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Adaptive Recommendations</CardTitle>
            <CardDescription>
              Optimize your study based on your emotional patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <div className="bg-green-100 dark:bg-green-800 p-1 rounded-full">
                    <BookOpen className="h-4 w-4 text-green-600 dark:text-green-300" />
                  </div>
                  When You're Focused/Motivated:
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Tackle the most challenging topics and concepts</li>
                  <li>• Take practice tests to maximize score potential</li>
                  <li>• Learn new formulas and complex theories</li>
                  <li>• Create summary notes for future review</li>
                </ul>
              </div>
              
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <div className="bg-yellow-100 dark:bg-yellow-800 p-1 rounded-full">
                    <Brain className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
                  </div>
                  When You're Tired/Confused:
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Review familiar material rather than learning new concepts</li>
                  <li>• Use visual aids and videos instead of text-heavy content</li>
                  <li>• Take short study sessions with frequent breaks</li>
                  <li>• Try mood-boosting activities before studying (walk, music)</li>
                </ul>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <div className="bg-blue-100 dark:bg-blue-800 p-1 rounded-full">
                    <Gauge className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                  </div>
                  Personalized Strategy:
                </h3>
                <p className="text-sm">
                  Based on your patterns, we recommend scheduling complex topics on days you typically 
                  feel motivated (often mornings and weekends), while using evenings when you're more tired for 
                  review sessions and lighter material.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MoodPerformanceCorrelation;
