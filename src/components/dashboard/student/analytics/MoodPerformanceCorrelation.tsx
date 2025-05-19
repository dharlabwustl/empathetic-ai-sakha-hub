
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis, Cell } from 'recharts';
import { Brain, Smile, TrendingUp, Clock, Lightbulb } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { Badge } from '@/components/ui/badge';

// Mock data for mood-performance correlation
const moodImpactData = [
  { date: '2023-06-01', mood: 'MOTIVATED', quizScore: 88, studyTime: 120, efficiency: 85, retention: 82 },
  { date: '2023-06-02', mood: 'HAPPY', quizScore: 82, studyTime: 110, efficiency: 80, retention: 78 },
  { date: '2023-06-03', mood: 'MOTIVATED', quizScore: 90, studyTime: 130, efficiency: 88, retention: 85 },
  { date: '2023-06-04', mood: 'STRESSED', quizScore: 73, studyTime: 90, efficiency: 65, retention: 60 },
  { date: '2023-06-05', mood: 'TIRED', quizScore: 69, studyTime: 60, efficiency: 55, retention: 52 },
  { date: '2023-06-06', mood: 'FOCUSED', quizScore: 85, studyTime: 140, efficiency: 82, retention: 79 },
  { date: '2023-06-07', mood: 'HAPPY', quizScore: 80, studyTime: 100, efficiency: 75, retention: 73 },
  { date: '2023-06-08', mood: 'FOCUSED', quizScore: 86, studyTime: 125, efficiency: 84, retention: 80 },
  { date: '2023-06-09', mood: 'TIRED', quizScore: 71, studyTime: 70, efficiency: 60, retention: 58 },
  { date: '2023-06-10', mood: 'MOTIVATED', quizScore: 92, studyTime: 135, efficiency: 90, retention: 88 },
  { date: '2023-06-11', mood: 'MOTIVATED', quizScore: 89, studyTime: 140, efficiency: 88, retention: 86 },
  { date: '2023-06-12', mood: 'STRESSED', quizScore: 75, studyTime: 80, efficiency: 68, retention: 63 },
  { date: '2023-06-13', mood: 'FOCUSED', quizScore: 87, studyTime: 130, efficiency: 85, retention: 82 },
  { date: '2023-06-14', mood: 'HAPPY', quizScore: 83, studyTime: 115, efficiency: 81, retention: 79 }
];

// Aggregated data by mood
const aggregatedMoodData = [
  { mood: 'MOTIVATED', avgQuizScore: 90, avgEfficiency: 88, avgRetention: 85, avgTime: 131 },
  { mood: 'FOCUSED', avgQuizScore: 86, avgEfficiency: 84, avgRetention: 80, avgTime: 128 },
  { mood: 'HAPPY', avgQuizScore: 82, avgEfficiency: 79, avgRetention: 77, avgTime: 108 },
  { mood: 'STRESSED', avgQuizScore: 74, avgEfficiency: 67, avgRetention: 62, avgTime: 85 },
  { mood: 'TIRED', avgQuizScore: 70, avgEfficiency: 58, avgRetention: 55, avgTime: 65 }
];

// Scatter data for correlation analysis
const moodCorrelationData = moodImpactData.map((data) => ({
  efficiency: data.efficiency,
  retention: data.retention,
  mood: data.mood,
  studyTime: data.studyTime
}));

// Mood colors
const moodColors = {
  'MOTIVATED': '#4ade80', // Green
  'FOCUSED': '#60a5fa', // Blue
  'HAPPY': '#fbbf24', // Yellow
  'STRESSED': '#f87171', // Red
  'TIRED': '#94a3b8' // Gray
};

// Time-series data for mood and performance
const timeSeriesData = moodImpactData.map((data) => ({
  date: data.date,
  quizScore: data.quizScore,
  efficiency: data.efficiency,
  mood: data.mood
}));

// Personalized recommendations based on mood data
const moodRecommendations = [
  {
    id: 1,
    mood: 'MOTIVATED',
    title: 'Leverage Your Motivated State',
    description: 'When motivated, focus on challenging topics and complex problems. Your data shows a 15% better retention rate in this state.',
  },
  {
    id: 2,
    mood: 'FOCUSED',
    title: 'Maximize Focus Periods',
    description: 'Your focused sessions yield excellent results. Schedule deep work during these times and minimize distractions.',
  },
  {
    id: 3,
    mood: 'STRESSED',
    title: 'Stress Management First',
    description: 'When stressed, your performance drops significantly. Take 10-15 minutes for deep breathing or meditation before studying.',
  },
  {
    id: 4,
    mood: 'TIRED',
    title: 'Adapt to Low Energy',
    description: 'During tired periods, switch to active learning methods like quizzing rather than passive reading to boost retention by 23%.',
  }
];

const MoodPerformanceCorrelation = () => {
  const [activeTab, setActiveTab] = useState('mood-impact');
  const [timeRange, setTimeRange] = useState('month');
  
  // Calculate best and worst moods for performance
  const sortedMoods = [...aggregatedMoodData].sort((a, b) => b.avgQuizScore - a.avgQuizScore);
  const bestMood = sortedMoods[0].mood;
  const worstMood = sortedMoods[sortedMoods.length - 1].mood;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Mood-Performance Correlation</h2>
          <p className="text-muted-foreground">See how your emotional state impacts your academic performance</p>
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
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Smile className="h-4 w-4 mr-2 text-green-500" />
              Optimal Mood
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-baseline">
              <div className="text-2xl font-bold capitalize">{bestMood.toLowerCase()}</div>
              <div className="text-sm text-green-600">
                +{Math.round(aggregatedMoodData[0].avgEfficiency - aggregatedMoodData[3].avgEfficiency)}% efficiency
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              When {bestMood.toLowerCase()}, your quiz scores are {Math.round(sortedMoods[0].avgQuizScore)}% on average
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
              Mood-Performance Variance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-baseline">
              <div className="text-2xl font-bold">23%</div>
              <div className="flex items-center text-sm text-amber-600">
                Significant impact
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Your performance varies by up to 23% based on your emotional state
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Clock className="h-4 w-4 mr-2 text-purple-500" />
              Typical Mood Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-baseline">
              <div className="text-2xl font-bold">~4.5 hrs</div>
              <div className="text-sm text-amber-600">Can be influenced</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Your moods typically last for 4-5 hours before shifting
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="mood-impact" className="flex items-center gap-2">
            <Smile className="h-4 w-4" />
            <span>Mood Impact</span>
          </TabsTrigger>
          <TabsTrigger value="correlation" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>Correlation</span>
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span>Adapt & Improve</span>
          </TabsTrigger>
        </TabsList>

        {/* Mood Impact Tab */}
        <TabsContent value="mood-impact">
          <Card>
            <CardHeader>
              <CardTitle>Mood Impact on Performance</CardTitle>
              <CardDescription>
                How different emotional states affect your learning metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={aggregatedMoodData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mood" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="avgQuizScore" name="Quiz Score (%)" fill="#8884d8" />
                    <Bar dataKey="avgEfficiency" name="Study Efficiency (%)" fill="#82ca9d" />
                    <Bar dataKey="avgRetention" name="Information Retention (%)" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Mood Performance Rankings</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    {sortedMoods.map((mood) => (
                      <li key={mood.mood} className="flex items-center justify-between">
                        <span className="capitalize">{mood.mood.toLowerCase()}</span>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                            Score: {Math.round(mood.avgQuizScore)}%
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            Efficiency: {Math.round(mood.avgEfficiency)}%
                          </Badge>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Key Insights</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500 mt-1"></div>
                      <span>Your <strong className="capitalize">{bestMood.toLowerCase()}</strong> days show {Math.round(sortedMoods[0].avgQuizScore - sortedMoods[sortedMoods.length - 1].avgQuizScore)}% higher quiz scores than <strong className="capitalize">{worstMood.toLowerCase()}</strong> days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500 mt-1"></div>
                      <span>Study efficiency varies by {Math.round(sortedMoods[0].avgEfficiency - sortedMoods[sortedMoods.length - 1].avgEfficiency)}% between your best and worst moods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-3 w-3 rounded-full bg-amber-500 mt-1"></div>
                      <span>Information retention is most affected by mood, with a {Math.round(sortedMoods[0].avgRetention - sortedMoods[sortedMoods.length - 1].avgRetention)}% difference</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Correlation Analysis Tab */}
        <TabsContent value="correlation">
          <Card>
            <CardHeader>
              <CardTitle>Correlation Analysis</CardTitle>
              <CardDescription>
                Relationship between mood, study time, and learning outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" dataKey="efficiency" name="Efficiency" unit="%" />
                    <YAxis type="number" dataKey="retention" name="Retention" unit="%" />
                    <ZAxis type="number" dataKey="studyTime" name="Study Time" unit=" min" range={[50, 400]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter name="Study Sessions" data={moodCorrelationData}>
                      {moodCorrelationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={moodColors[entry.mood as keyof typeof moodColors] || '#8884d8'} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 border-t pt-4">
                <h4 className="font-medium mb-3">Mood to Performance Correlation</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {Object.entries(moodColors).map(([mood, color]) => (
                    <div key={mood} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }}></div>
                      <span className="text-sm capitalize">{mood.toLowerCase()}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Time Series Analysis</h4>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={timeSeriesData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="quizScore" name="Quiz Score" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="efficiency" name="Efficiency" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Adaptive Recommendations</CardTitle>
              <CardDescription>
                Personalized suggestions to optimize study based on your emotional patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {moodRecommendations.map((rec) => (
                    <div 
                      key={rec.id}
                      className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm"
                      style={{ borderLeftColor: moodColors[rec.mood as keyof typeof moodColors], borderLeftWidth: '4px' }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{rec.title}</h4>
                        <Badge className="capitalize" variant="outline">
                          {rec.mood.toLowerCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="text-lg font-medium mb-4">General Mood-Optimization Strategy</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800/30">
                      <h5 className="font-medium text-green-800 dark:text-green-300 mb-2">Mood Enhancement Techniques</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 bg-green-100 text-green-700 rounded-full p-0.5">
                            <CheckCircle className="h-3 w-3" />
                          </div>
                          <span>5-minute meditation before study sessions increased your motivation by 28%</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 bg-green-100 text-green-700 rounded-full p-0.5">
                            <CheckCircle className="h-3 w-3" />
                          </div>
                          <span>Brief exercise breaks improved focus during long study sessions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 bg-green-100 text-green-700 rounded-full p-0.5">
                            <CheckCircle className="h-3 w-3" />
                          </div>
                          <span>Background instrumental music boosted efficiency for analytical tasks</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border rounded-lg p-4 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/30">
                      <h5 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Mood-Based Study Planning</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 bg-blue-100 text-blue-700 rounded-full p-0.5">
                            <CheckCircle className="h-3 w-3" />
                          </div>
                          <span>Reserve creative and complex topics for motivated/focused states</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 bg-blue-100 text-blue-700 rounded-full p-0.5">
                            <CheckCircle className="h-3 w-3" />
                          </div>
                          <span>Use tired/stressed states for review and simple practice</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 bg-blue-100 text-blue-700 rounded-full p-0.5">
                            <CheckCircle className="h-3 w-3" />
                          </div>
                          <span>Assess mood at beginning of study session and adjust plan accordingly</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MoodPerformanceCorrelation;
