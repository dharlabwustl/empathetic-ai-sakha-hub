
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Target, Clock, TrendingUp, Users, Award, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StudyPlanManagementTab = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const studyPlanTemplates = [
    { id: 1, name: 'JEE Advanced Intensive', duration: '12 months', subjects: ['Physics', 'Chemistry', 'Mathematics'], difficulty: 'High', users: 234 },
    { id: 2, name: 'NEET Preparation', duration: '18 months', subjects: ['Physics', 'Chemistry', 'Biology'], difficulty: 'Medium', users: 456 },
    { id: 3, name: 'Foundation Course', duration: '6 months', subjects: ['Mathematics', 'Science'], difficulty: 'Low', users: 178 }
  ];

  const performanceMetrics = [
    { metric: 'Average Completion Rate', value: '78%', change: '+5%' },
    { metric: 'Study Streak Average', value: '12.3 days', change: '+2.1' },
    { metric: 'Goal Achievement Rate', value: '67%', change: '+8%' },
    { metric: 'Time Efficiency', value: '85%', change: '+3%' }
  ];

  const gamificationSettings = [
    { feature: 'Study Streaks', enabled: true, points: 10 },
    { feature: 'Daily Goals', enabled: true, points: 25 },
    { feature: 'Weekly Challenges', enabled: false, points: 100 },
    { feature: 'Subject Mastery', enabled: true, points: 500 }
  ];

  const handleCreateTemplate = () => {
    toast({
      title: "Template Created",
      description: "New study plan template has been created successfully"
    });
  };

  const handleUpdateGamification = (feature: string, enabled: boolean) => {
    toast({
      title: "Settings Updated",
      description: `${feature} has been ${enabled ? 'enabled' : 'disabled'}`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Study Plan & Progress Management</h2>
          <p className="text-muted-foreground">Manage study plan templates and track user progress</p>
        </div>
        <Button onClick={handleCreateTemplate}>
          <BookOpen className="w-4 h-4 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Study Plans</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,543</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+5% improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Streak Average</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.3</div>
            <p className="text-xs text-muted-foreground">days per user</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates Created</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">across all subjects</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="progress">Progress Analytics</TabsTrigger>
          <TabsTrigger value="gamification">Gamification</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Study Plan Templates</CardTitle>
                <CardDescription>Manage and create study plan templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studyPlanTemplates.map((template) => (
                    <div key={template.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{template.name}</h4>
                        <Badge variant={template.difficulty === 'High' ? 'destructive' : template.difficulty === 'Medium' ? 'default' : 'secondary'}>
                          {template.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Duration: {template.duration}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {template.subjects.map((subject) => (
                          <Badge key={subject} variant="outline" className="text-xs">{subject}</Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{template.users} users</span>
                        <div className="space-x-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">Clone</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Create New Template</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input id="template-name" placeholder="Enter template name" />
                  </div>
                  
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3m">3 months</SelectItem>
                        <SelectItem value="6m">6 months</SelectItem>
                        <SelectItem value="12m">12 months</SelectItem>
                        <SelectItem value="18m">18 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full" onClick={handleCreateTemplate}>
                    Create Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Progress Analytics</CardTitle>
              <CardDescription>Track user progress across all study plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.metric}</div>
                    <div className="text-xs text-green-600">{metric.change}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gamification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gamification Settings</CardTitle>
              <CardDescription>Configure gamification features and point system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gamificationSettings.map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{setting.feature}</div>
                      <div className="text-sm text-muted-foreground">{setting.points} points</div>
                    </div>
                    <Button 
                      variant={setting.enabled ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleUpdateGamification(setting.feature, !setting.enabled)}
                    >
                      {setting.enabled ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Benchmarks</CardTitle>
              <CardDescription>Set and manage performance benchmarks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Minimum Completion Rate</Label>
                    <Input type="number" placeholder="70" />
                  </div>
                  <div>
                    <Label>Target Study Hours/Day</Label>
                    <Input type="number" placeholder="4" />
                  </div>
                  <div>
                    <Label>Streak Milestone</Label>
                    <Input type="number" placeholder="30" />
                  </div>
                  <div>
                    <Label>Achievement Threshold</Label>
                    <Input type="number" placeholder="80" />
                  </div>
                </div>
                <Button>Update Benchmarks</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyPlanManagementTab;
