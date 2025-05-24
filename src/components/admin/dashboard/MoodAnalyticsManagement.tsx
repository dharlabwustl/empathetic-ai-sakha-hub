
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, TrendingUp, AlertTriangle, Settings, Brain, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const MoodAnalyticsManagement = () => {
  const [alertSettings, setAlertSettings] = useState({
    enableMoodAlerts: true,
    lowMoodThreshold: 3,
    interventionEnabled: true,
    notifyTeachers: false
  });

  const moodTrendData = [
    { date: '2024-01-01', happy: 45, stressed: 20, motivated: 35, tired: 15, anxious: 10 },
    { date: '2024-01-02', happy: 52, stressed: 18, motivated: 38, tired: 12, anxious: 8 },
    { date: '2024-01-03', happy: 48, stressed: 25, motivated: 32, tired: 18, anxious: 15 },
    { date: '2024-01-04', happy: 55, stressed: 15, motivated: 42, tired: 10, anxious: 6 },
    { date: '2024-01-05', happy: 60, stressed: 12, motivated: 45, tired: 8, anxious: 5 }
  ];

  const moodDistribution = [
    { name: 'Happy', value: 35, color: '#10B981' },
    { name: 'Motivated', value: 25, color: '#3B82F6' },
    { name: 'Focused', value: 20, color: '#8B5CF6' },
    { name: 'Stressed', value: 12, color: '#EF4444' },
    { name: 'Tired', value: 8, color: '#F59E0B' }
  ];

  const studyPlanEffectiveness = [
    { plan: 'Visual Learning', moodImprovement: 78, completionRate: 85, satisfaction: 4.6 },
    { plan: 'Auditory Learning', moodImprovement: 72, completionRate: 78, satisfaction: 4.3 },
    { plan: 'Kinesthetic Learning', moodImprovement: 80, completionRate: 90, satisfaction: 4.8 },
    { plan: 'Mixed Approach', moodImprovement: 75, completionRate: 82, satisfaction: 4.5 }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Mood Score</CardTitle>
            <Heart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.2</div>
            <p className="text-xs text-green-600">+0.5 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mood Interventions</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students at Risk</CardTitle>
            <Users className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-red-600">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Improvement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-green-600">Students improved</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Mood Trends</TabsTrigger>
          <TabsTrigger value="effectiveness">Plan Effectiveness</TabsTrigger>
          <TabsTrigger value="alerts">Alert Settings</TabsTrigger>
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mood Trends Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={moodTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="happy" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="motivated" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="stressed" stroke="#EF4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Mood Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={moodDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {moodDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mood Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {moodDistribution.map((mood, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: mood.color }}
                        />
                        <span className="text-sm">{mood.name}</span>
                      </div>
                      <Badge variant="secondary">{mood.value}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="effectiveness" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Study Plan Effectiveness by Mood Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studyPlanEffectiveness.map((plan, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{plan.plan}</h3>
                      <Badge className="bg-green-100 text-green-800">
                        {plan.satisfaction}/5 ⭐
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Mood Improvement:</span>
                        <div className="font-medium text-green-600">{plan.moodImprovement}%</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Completion Rate:</span>
                        <div className="font-medium text-blue-600">{plan.completionRate}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mood Alert Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Enable Mood Alerts</label>
                  <p className="text-xs text-gray-500">Get notified when students report low mood</p>
                </div>
                <Switch 
                  checked={alertSettings.enableMoodAlerts}
                  onCheckedChange={(checked) => 
                    setAlertSettings(prev => ({ ...prev, enableMoodAlerts: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Auto Interventions</label>
                  <p className="text-xs text-gray-500">Automatically suggest interventions</p>
                </div>
                <Switch 
                  checked={alertSettings.interventionEnabled}
                  onCheckedChange={(checked) => 
                    setAlertSettings(prev => ({ ...prev, interventionEnabled: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Notify Teachers</label>
                  <p className="text-xs text-gray-500">Alert teachers about student mood changes</p>
                </div>
                <Switch 
                  checked={alertSettings.notifyTeachers}
                  onCheckedChange={(checked) => 
                    setAlertSettings(prev => ({ ...prev, notifyTeachers: checked }))
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Low Mood Threshold</label>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={alertSettings.lowMoodThreshold}
                  onChange={(e) => 
                    setAlertSettings(prev => ({ ...prev, lowMoodThreshold: parseInt(e.target.value) }))
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Very Low (1)</span>
                  <span>Current: {alertSettings.lowMoodThreshold}</span>
                  <span>High (10)</span>
                </div>
              </div>

              <Button className="w-full">Save Alert Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interventions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Mood Interventions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { student: "Ravi Kumar", mood: "Stressed", intervention: "Breathing exercise suggested", time: "2 hours ago", status: "Completed" },
                  { student: "Priya Sharma", mood: "Anxious", intervention: "Feel-good content recommended", time: "4 hours ago", status: "In Progress" },
                  { student: "Amit Singh", mood: "Tired", intervention: "Study break reminder sent", time: "6 hours ago", status: "Completed" },
                  { student: "Sneha Patel", mood: "Overwhelmed", intervention: "Study plan adjusted", time: "1 day ago", status: "Completed" }
                ].map((intervention, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{intervention.student}</h3>
                        <p className="text-sm text-gray-600">
                          Mood: <Badge variant="outline">{intervention.mood}</Badge>
                        </p>
                        <p className="text-sm mt-1">{intervention.intervention}</p>
                      </div>
                      <div className="text-right">
                        <Badge 
                          className={intervention.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
                        >
                          {intervention.status}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{intervention.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MoodAnalyticsManagement;
