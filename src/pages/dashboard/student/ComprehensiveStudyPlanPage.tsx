
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  Target, 
  Calendar, 
  Clock, 
  BookOpen, 
  Brain, 
  TrendingUp,
  Settings,
  FileText,
  BarChart3,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Star,
  Award,
  Edit,
  Save
} from 'lucide-react';

const ComprehensiveStudyPlanPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  // Mock student profile data
  const [studentProfile, setStudentProfile] = useState({
    name: "Priya Sharma",
    examGoal: "NEET 2026",
    targetExamDate: "2026-05-03",
    learningPace: "Moderate",
    preferredStudyTime: "Morning",
    totalStudyHours: 6,
    availableDays: 6,
    preferredSubjectsPerDay: 2
  });

  // Mock subject analysis data
  const subjects = [
    { name: "Physics", status: "weak", confidence: 2, progress: 35 },
    { name: "Chemistry", status: "medium", confidence: 3, progress: 55 },
    { name: "Biology", status: "strong", confidence: 4, progress: 75 }
  ];

  // Mock study plan data
  const weeklyPlan = [
    { day: "Monday", subject: "Physics", topics: "Mechanics", hours: 3, timeSlot: "9:00 AM - 12:00 PM", focus: "High", status: "Done" },
    { day: "Tuesday", subject: "Chemistry", topics: "Organic", hours: 2, timeSlot: "9:00 AM - 11:00 AM", focus: "Medium", status: "Pending" },
    { day: "Wednesday", subject: "Biology", topics: "Botany", hours: 2.5, timeSlot: "9:00 AM - 11:30 AM", focus: "Low", status: "Pending" },
  ];

  const quickStats = {
    examDate: '2026-05-03',
    daysLeft: 497,
    totalProgress: 55,
    todayProgress: 3.5,
    weeklyTarget: 40
  };

  return (
    <SharedPageLayout
      title="Comprehensive Study Plan"
      subtitle="NEET 2026 - AI-Powered Dynamic Study Strategy"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export Plan
          </Button>
          <Button 
            size="sm" 
            onClick={() => setIsEditing(!isEditing)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
            {isEditing ? "Save Changes" : "Edit Plan"}
          </Button>
        </div>
      }
    >
      {/* Quick Overview Header */}
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <Calendar className="h-5 w-5 mx-auto mb-1 text-blue-600" />
              <div className="text-xs text-gray-600">Exam Date</div>
              <div className="font-bold text-blue-600">May 3, 2026</div>
            </div>
            <div className="text-center">
              <Clock className="h-5 w-5 mx-auto mb-1 text-red-600" />
              <div className="text-xs text-gray-600">Days Left</div>
              <div className="font-bold text-red-600">{quickStats.daysLeft}</div>
            </div>
            <div className="text-center">
              <TrendingUp className="h-5 w-5 mx-auto mb-1 text-green-600" />
              <div className="text-xs text-gray-600">Overall Progress</div>
              <div className="font-bold text-green-600">{quickStats.totalProgress}%</div>
            </div>
            <div className="text-center">
              <BookOpen className="h-5 w-5 mx-auto mb-1 text-orange-600" />
              <div className="text-xs text-gray-600">Today's Hours</div>
              <div className="font-bold text-orange-600">{quickStats.todayProgress}h</div>
            </div>
            <div className="text-center">
              <Target className="h-5 w-5 mx-auto mb-1 text-purple-600" />
              <div className="text-xs text-gray-600">Weekly Target</div>
              <div className="font-bold text-purple-600">{quickStats.weeklyTarget}h</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6">
          <TabsTrigger value="profile" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="plan" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Plan</span>
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-1">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">AI</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            <span className="hidden sm:inline">Performance</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Resources</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        {/* Student Profile Section */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Student Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={studentProfile.name} readOnly={!isEditing} />
                </div>
                <div>
                  <Label htmlFor="examGoal">Exam Goal</Label>
                  <Input id="examGoal" value={studentProfile.examGoal} readOnly={!isEditing} />
                </div>
                <div>
                  <Label htmlFor="examDate">Target Exam Date</Label>
                  <Input id="examDate" type="date" value={studentProfile.targetExamDate} readOnly={!isEditing} />
                </div>
                <div>
                  <Label htmlFor="learningPace">Learning Pace</Label>
                  <Input id="learningPace" value={studentProfile.learningPace} readOnly={!isEditing} />
                </div>
                <div>
                  <Label htmlFor="studyTime">Preferred Study Time</Label>
                  <Input id="studyTime" value={studentProfile.preferredStudyTime} readOnly={!isEditing} />
                </div>
                <div>
                  <Label htmlFor="studyHours">Total Study Hours per Day</Label>
                  <Input id="studyHours" type="number" value={studentProfile.totalStudyHours} readOnly={!isEditing} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subject Analysis Section */}
        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Subject Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjects.map((subject, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{subject.name}</h3>
                      <Badge variant={subject.status === 'weak' ? 'destructive' : subject.status === 'strong' ? 'default' : 'secondary'}>
                        {subject.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>Confidence Level</span>
                        <span>{subject.confidence}/5</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Study Plan Table */}
        <TabsContent value="plan">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Adaptive Study Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 p-2 text-left">Day</th>
                      <th className="border border-gray-200 p-2 text-left">Subject</th>
                      <th className="border border-gray-200 p-2 text-left">Topics</th>
                      <th className="border border-gray-200 p-2 text-left">Hours</th>
                      <th className="border border-gray-200 p-2 text-left">Time Slot</th>
                      <th className="border border-gray-200 p-2 text-left">Focus</th>
                      <th className="border border-gray-200 p-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyPlan.map((day, index) => (
                      <tr key={index}>
                        <td className="border border-gray-200 p-2">{day.day}</td>
                        <td className="border border-gray-200 p-2">{day.subject}</td>
                        <td className="border border-gray-200 p-2">{day.topics}</td>
                        <td className="border border-gray-200 p-2">{day.hours}h</td>
                        <td className="border border-gray-200 p-2">{day.timeSlot}</td>
                        <td className="border border-gray-200 p-2">
                          <Badge variant={day.focus === 'High' ? 'destructive' : day.focus === 'Medium' ? 'secondary' : 'outline'}>
                            {day.focus}
                          </Badge>
                        </td>
                        <td className="border border-gray-200 p-2">
                          <Badge variant={day.status === 'Done' ? 'default' : 'outline'}>
                            {day.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Weekly & Monthly Dashboard */}
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map((subject, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{subject.name}</span>
                        <span>{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Monthly Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">15</div>
                    <div className="text-sm text-gray-600">Days Studied</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">120</div>
                    <div className="text-sm text-gray-600">Hours Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">85%</div>
                    <div className="text-sm text-gray-600">Goal Achievement</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Recommendations */}
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI-Powered Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-blue-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Focus Recommendation</span>
                    <Badge variant="destructive" className="text-xs">High Priority</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Increase Physics study time by 30% this week. Your recent performance shows weakness in Mechanics and Thermodynamics.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg bg-green-50">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Achievement</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Great progress in Biology! You're ahead of schedule. Consider dedicating more time to weaker subjects.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tracker */}
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Performance Tracker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <div className="text-2xl font-bold">78%</div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">+12%</div>
                  <div className="text-sm text-gray-600">Improvement</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Target className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">92%</div>
                  <div className="text-sm text-gray-600">Goal Progress</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources & Notes */}
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Resources & Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Today's Study Material</h3>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-lg flex justify-between items-center">
                      <span>Physics - Mechanics Chapter 5</span>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                    <div className="p-3 border rounded-lg flex justify-between items-center">
                      <span>Chemistry - Organic Reactions</span>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Personal Notes</h3>
                  <Textarea placeholder="Add your study notes here..." className="min-h-[100px]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings & Customization */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Settings & Customization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="studyHoursSettings">Daily Study Hours</Label>
                  <Input id="studyHoursSettings" type="number" defaultValue="6" className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="weekendMode">Weekend Study Mode</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <input type="checkbox" id="weekendMode" />
                    <span className="text-sm">Enable weekend study sessions</span>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="revisionDays">Revision Frequency (days)</Label>
                  <Input id="revisionDays" type="number" defaultValue="7" className="mt-1" />
                </div>
                
                <Button className="w-full">Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default ComprehensiveStudyPlanPage;
