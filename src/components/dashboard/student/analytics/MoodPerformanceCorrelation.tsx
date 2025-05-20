import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MoodType } from "@/types/user/base";
import { Download, ArrowRight, Check } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data for performance correlation analysis
const moodPerformanceData = [
  { date: '2023-06-01', performance: 88 },
  { date: '2023-06-02', performance: 82 },
  { date: '2023-06-03', performance: 90 },
  { date: '2023-06-04', performance: 73 },
  { date: '2023-06-05', performance: 69 },
  { date: '2023-06-06', performance: 85 },
  { date: '2023-06-07', performance: 80 },
  { date: '2023-06-08', performance: 86 },
  { date: '2023-06-09', performance: 71 },
  { date: '2023-06-10', performance: 92 },
  { date: '2023-06-11', performance: 89 },
  { date: '2023-06-12', performance: 75 },
  { date: '2023-06-13', performance: 87 },
  { date: '2023-06-14', performance: 83 }
];

// Mood ratings for different moods
const moodRatings = [
  { mood: 'MOTIVATED', rating: 90, color: '#4ade80' },
  { mood: 'FOCUSED', rating: 86, color: '#60a5fa' },
  { mood: 'HAPPY', rating: 82, color: '#fbbf24' },
  { mood: 'STRESSED', rating: 74, color: '#f87171' },
  { mood: 'TIRED', rating: 70, color: '#94a3b8' }
];

// Insights based on mood performance
const insights = [
  { title: 'Mood Impact on Performance', improvement: '23%', description: 'Your performance varies by up to 23% based on your emotional state' },
  { title: 'Typical Mood Duration', improvement: '4-5 hours', description: 'Your moods typically last for 4-5 hours before shifting' }
];

// Subject-mood correlation data
const subjectMoodData = [
  { subject: 'Biology', happy: 85, motivated: 90, focused: 80, neutral: 75, stressed: 65, tired: 55 },
  { subject: 'Mathematics', happy: 80, motivated: 85, focused: 90, neutral: 75, stressed: 65, tired: 55 },
  { subject: 'Physics', happy: 85, motivated: 90, focused: 80, neutral: 75, stressed: 65, tired: 55 },
  { subject: 'Chemistry', happy: 80, motivated: 85, focused: 90, neutral: 75, stressed: 65, tired: 55 }
];

// Time of day performance data
const moodTimeData = [
  { time: '9 AM - 12 PM', performance: 88 },
  { time: '12 PM - 3 PM', performance: 75 },
  { time: '3 PM - 6 PM', performance: 85 },
  { time: '6 PM - 9 PM', performance: 80 },
  { time: '9 PM - 12 AM', performance: 70 }
];

// Recommendations based on mood data
const recommendations = [
  'Leverage Your Motivated State',
  'Maximize Focus Periods',
  'Stress Management First',
  'Adapt to Low Energy'
];

const MoodPerformanceCorrelation: React.FC<MoodPerformanceCorrelationProps> = ({ userName = "Student" }) => {
  const [selectedTab, setSelectedTab] = useState("trend");
  const [selectedTimeRange, setSelectedTimeRange] = useState("week");
  const isMobile = useIsMobile();
  
  // Color mapping for different moods
  const moodColors = {
    'MOTIVATED': '#4ade80', // Green
    'FOCUSED': '#60a5fa', // Blue
    'HAPPY': '#fbbf24', // Yellow
    'STRESSED': '#f87171', // Red
    'TIRED': '#94a3b8' // Gray
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold`}>Mood & Performance Correlation</h2>
          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground mt-1`}>
            Analyze how your mood affects your study performance
          </p>
        </div>
        <div className="flex">
          <Button variant="outline" size={isMobile ? "sm" : "default"}>
            <Download className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
            <span className={isMobile ? 'text-xs' : ''}>Export</span>
          </Button>
        </div>
      </div>

      <Tabs 
        defaultValue="trend" 
        value={selectedTab} 
        onValueChange={setSelectedTab}
        className="space-y-4"
      >
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="trend" className={isMobile ? 'text-xs py-1.5 px-2.5' : ''}>Trend Analysis</TabsTrigger>
            <TabsTrigger value="subjects" className={isMobile ? 'text-xs py-1.5 px-2.5' : ''}>Subject Performance</TabsTrigger>
            <TabsTrigger value="times" className={isMobile ? 'text-xs py-1.5 px-2.5' : ''}>Time of Day</TabsTrigger>
          </TabsList>
          
          <div className="hidden sm:flex space-x-1">
            <Button 
              variant={selectedTimeRange === "week" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedTimeRange("week")}
            >
              Week
            </Button>
            <Button 
              variant={selectedTimeRange === "month" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedTimeRange("month")}
            >
              Month
            </Button>
            <Button 
              variant={selectedTimeRange === "semester" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedTimeRange("semester")}
            >
              Semester
            </Button>
          </div>
        </div>
        
        {/* Trend Analysis Tab */}
        <TabsContent value="trend" className="space-y-4">
          <Card>
            <CardHeader className={`${isMobile ? 'p-4 pb-0' : 'pb-0'}`}>
              <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'}`}>Mood-Performance Correlation</CardTitle>
              <CardDescription className={isMobile ? 'text-xs' : ''}>
                See how your moods correlate with performance over time
              </CardDescription>
            </CardHeader>
            <CardContent className={`${isMobile ? 'p-4' : ''} pt-4`}>
              <div className={`${isMobile ? 'h-56' : 'h-80'}`}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={moodPerformanceData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: isMobile ? 10 : 12 }} 
                    />
                    <YAxis 
                      tick={{ fontSize: isMobile ? 10 : 12 }} 
                      label={{ 
                        value: 'Score', 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { fontSize: isMobile ? 10 : 12 } 
                      }} 
                    />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="performance"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-4">
                {moodRatings.map((item) => (
                  <Card key={item.mood} className="overflow-hidden">
                    <div
                      className="h-1"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <CardContent className="p-3 text-center">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>{item.mood}</p>
                      <p className="text-lg font-bold">{item.rating}%</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <Card key={index}>
                <CardHeader className={`${isMobile ? 'p-4 pb-2' : 'pb-2'}`}>
                  <div className="flex justify-between">
                    <CardTitle className={`${isMobile ? 'text-sm' : 'text-base'}`}>{insight.title}</CardTitle>
                    <span className="text-green-600 font-bold">{insight.improvement}</span>
                  </div>
                </CardHeader>
                <CardContent className={`${isMobile ? 'p-4 pt-2 text-xs' : 'text-sm pt-2'}`}>
                  {insight.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Subject Performance Tab */}
        <TabsContent value="subjects" className="space-y-4">
          <Card>
            <CardHeader className={`${isMobile ? 'p-4 pb-0' : 'pb-0'}`}>
              <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'}`}>Subject-Mood Correlation</CardTitle>
              <CardDescription className={isMobile ? 'text-xs' : ''}>
                Analyze which moods are optimal for different subjects
              </CardDescription>
            </CardHeader>
            <CardContent className={`${isMobile ? 'p-4' : ''} pt-4`}>
              <div className={`${isMobile ? 'h-56' : 'h-80'}`}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={subjectMoodData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="subject" 
                      tick={{ fontSize: isMobile ? 10 : 12 }} 
                    />
                    <YAxis 
                      tick={{ fontSize: isMobile ? 10 : 12 }} 
                    />
                    <Tooltip />
                    <Bar dataKey="happy" stackId="a" fill={moodColors[MoodType.HAPPY]} />
                    <Bar dataKey="motivated" stackId="a" fill={moodColors[MoodType.MOTIVATED]} />
                    <Bar dataKey="focused" stackId="a" fill={moodColors[MoodType.FOCUSED]} />
                    <Bar dataKey="neutral" stackId="a" fill={moodColors[MoodType.OKAY]} />
                    <Bar dataKey="stressed" stackId="a" fill={moodColors[MoodType.STRESSED]} />
                    <Bar dataKey="tired" stackId="a" fill={moodColors[MoodType.TIRED]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 space-y-3">
                <h4 className={`${isMobile ? 'text-sm' : 'text-base'} font-medium`}>Optimal Mood-Subject Pairings</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-start gap-2 border rounded-md p-3">
                    <Check className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-green-500 mt-0.5`} />
                    <div>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Biology</p>
                      <p className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-muted-foreground`}>Best studied when happy or motivated</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 border rounded-md p-3">
                    <Check className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-green-500 mt-0.5`} />
                    <div>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Mathematics</p>
                      <p className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-muted-foreground`}>Best studied when focused</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 border rounded-md p-3">
                    <Check className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-green-500 mt-0.5`} />
                    <div>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Physics</p>
                      <p className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-muted-foreground`}>Best studied when motivated</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 border rounded-md p-3">
                    <Check className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-green-500 mt-0.5`} />
                    <div>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Chemistry</p>
                      <p className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-muted-foreground`}>Best studied when focused or neutral</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Time of Day Tab */}
        <TabsContent value="times" className="space-y-4">
          <Card>
            <CardHeader className={`${isMobile ? 'p-4 pb-0' : 'pb-0'}`}>
              <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'}`}>Time-Performance Correlation</CardTitle>
              <CardDescription className={isMobile ? 'text-xs' : ''}>
                Discover your optimal study times based on performance data
              </CardDescription>
            </CardHeader>
            <CardContent className={`${isMobile ? 'p-4' : ''} pt-4`}>
              <div className={`${isMobile ? 'h-56' : 'h-80'}`}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={moodTimeData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="time" 
                      tick={{ fontSize: isMobile ? 10 : 12 }} 
                    />
                    <YAxis 
                      tick={{ fontSize: isMobile ? 10 : 12 }} 
                      label={{ 
                        value: 'Performance', 
                        angle: -90, 
                        position: 'insideLeft' 
                      }} 
                    />
                    <Tooltip />
                    <Bar dataKey="performance" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <Card className="mt-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className={`${isMobile ? 'p-3 text-xs' : 'p-4 text-sm'}`}>
                  <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Personalized Time Recommendations</h4>
                  <ul className="space-y-2 text-blue-700 dark:text-blue-400">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span>Schedule critical study sessions between 9 AM - 12 PM when your performance is highest</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span>Use the 6-9 PM window for revision and practice as your retention is good</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span>Avoid complex topics during 12-3 PM when your performance dips</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span>Late night (9 PM-12 AM) sessions yield lower results; consider sleep instead</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader className={`${isMobile ? 'p-4 pb-2' : 'pb-2'}`}>
          <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'}`}>Personalized Recommendations</CardTitle>
        </CardHeader>
        <CardContent className={`${isMobile ? 'p-4 pt-2' : 'pt-2'}`}>
          <ul className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-green-500 mt-0.5 flex-shrink-0`} />
                <span className={isMobile ? 'text-xs' : 'text-sm'}>{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className={`${isMobile ? 'p-4 pt-2' : 'pt-2'}`}>
          <Button className="w-full" size={isMobile ? "sm" : "default"}>
            <span>Get Detailed Analysis Report</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MoodPerformanceCorrelation;
