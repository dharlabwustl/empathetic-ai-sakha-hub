
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Heart, TrendingUp, Brain, Users, Activity, Smile } from 'lucide-react';

const MoodAnalytics: React.FC = () => {
  const moodStats = {
    totalEntries: 45680,
    avgMoodScore: 7.2,
    moodImpactOnPerformance: 23.4,
    studentsUsingMood: 12340
  };

  const moodDistribution = [
    { mood: 'Motivated', count: 15420, percentage: 33.8, color: 'bg-green-500' },
    { mood: 'Confident', count: 12890, percentage: 28.2, color: 'bg-blue-500' },
    { mood: 'Neutral', count: 8760, percentage: 19.2, color: 'bg-gray-500' },
    { mood: 'Stressed', count: 5420, percentage: 11.9, color: 'bg-orange-500' },
    { mood: 'Overwhelmed', count: 3190, percentage: 6.9, color: 'bg-red-500' }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Mood Trends</TabsTrigger>
          <TabsTrigger value="impact">Performance Impact</TabsTrigger>
          <TabsTrigger value="interventions">AI Interventions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Mood Entries</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{moodStats.totalEntries.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+18.3% this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Mood Score</CardTitle>
                <Smile className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{moodStats.avgMoodScore}/10</div>
                <p className="text-xs text-muted-foreground">+0.4 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{moodStats.studentsUsingMood.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">80.1% of students</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Performance Impact</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{moodStats.moodImpactOnPerformance}%</div>
                <p className="text-xs text-muted-foreground">Better when mood tracked</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Mood Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {moodDistribution.map((item) => (
                  <div key={item.mood} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{item.mood}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.count.toLocaleString()} ({item.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mood-Based Adaptations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Study Plans Adjusted</span>
                    <span className="font-bold">5,420</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Content Difficulty Modified</span>
                    <span className="font-bold">8,930</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Break Recommendations</span>
                    <span className="font-bold">12,560</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Motivational Content Shown</span>
                    <span className="font-bold">15,780</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mood Intervention Success</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Stress Reduction</span>
                    <span className="font-medium">82.3%</span>
                  </div>
                  <Progress value={82.3} className="h-2" />
                  
                  <div className="flex justify-between">
                    <span>Motivation Boost</span>
                    <span className="font-medium">76.8%</span>
                  </div>
                  <Progress value={76.8} className="h-2" />
                  
                  <div className="flex justify-between">
                    <span>Confidence Building</span>
                    <span className="font-medium">71.4%</span>
                  </div>
                  <Progress value={71.4} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Mood Trends Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Detailed mood trends over time with seasonal and daily patterns.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact">
          <Card>
            <CardHeader>
              <CardTitle>Mood Impact on Learning Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Analysis of how different moods affect learning outcomes and study performance.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interventions">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Mood Interventions</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Configure and monitor AI interventions based on mood detection and analysis.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MoodAnalytics;
