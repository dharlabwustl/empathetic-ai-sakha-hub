
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Download,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const ComprehensiveStudyPlanPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');

  // Mock data for NEET 2026
  const [studentData, setStudentData] = useState({
    name: 'NEET Aspirant',
    examDate: '2026-05-03',
    daysLeft: 497,
    totalProgress: 45,
    todayProgress: 3.5,
    weeklyTarget: 40,
    subjects: [
      { 
        id: 'physics', 
        name: 'Physics', 
        color: '#8B5CF6', 
        progress: 45, 
        strength: 'weak',
        confidence: 3,
        topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Modern Physics']
      },
      { 
        id: 'chemistry', 
        name: 'Chemistry', 
        color: '#10B981', 
        progress: 35, 
        strength: 'medium',
        confidence: 4,
        topics: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry']
      },
      { 
        id: 'biology', 
        name: 'Biology', 
        color: '#F59E0B', 
        progress: 60, 
        strength: 'strong',
        confidence: 5,
        topics: ['Botany', 'Zoology', 'Human Physiology', 'Genetics', 'Ecology']
      }
    ]
  });

  const StudentProfileSection = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Student Profile & Goals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Personal Information</h3>
            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium">Name</label>
                <p className="text-lg">{studentData.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Exam Target</label>
                <p className="text-lg font-semibold text-blue-600">NEET 2026</p>
              </div>
              <div>
                <label className="text-sm font-medium">Exam Date</label>
                <p className="text-lg">{new Date(studentData.examDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Study Preferences</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Learning Pace</span>
                <Badge variant="outline">Medium</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Preferred Study Time</span>
                <Badge variant="outline">Morning</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Weekly Study Hours</span>
                <Badge variant="outline">{studentData.weeklyTarget}h</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const SubjectAnalysisSection = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Subject Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {studentData.subjects.map((subject) => (
            <Card key={subject.id} className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: subject.color }}
                    />
                    <h3 className="font-semibold">{subject.name}</h3>
                  </div>
                  <Badge variant={
                    subject.strength === 'weak' ? 'destructive' :
                    subject.strength === 'medium' ? 'secondary' : 'default'
                  }>
                    {subject.strength}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Progress</span>
                      <span className="text-sm font-medium">{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Confidence Level</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= subject.confidence ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">{subject.confidence}/5</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium mb-2 block">Key Topics</span>
                    <div className="flex flex-wrap gap-1">
                      {subject.topics.map((topic, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const AdaptivePlanTable = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Adaptive Study Plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-3 text-left">Date</th>
                  <th className="border border-gray-200 p-3 text-left">Subject</th>
                  <th className="border border-gray-200 p-3 text-left">Topic</th>
                  <th className="border border-gray-200 p-3 text-left">Duration</th>
                  <th className="border border-gray-200 p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 7 }, (_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() + i);
                  return (
                    <tr key={i}>
                      <td className="border border-gray-200 p-3">
                        {date.toLocaleDateString()}
                      </td>
                      <td className="border border-gray-200 p-3">
                        {['Physics', 'Chemistry', 'Biology'][i % 3]}
                      </td>
                      <td className="border border-gray-200 p-3">
                        {['Mechanics', 'Organic Chemistry', 'Botany'][i % 3]}
                      </td>
                      <td className="border border-gray-200 p-3">2h</td>
                      <td className="border border-gray-200 p-3">
                        <Badge variant={i === 0 ? 'default' : 'outline'}>
                          {i === 0 ? 'Current' : 'Upcoming'}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const WeeklyMonthlyDashboard = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Progress Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800">This Week</h4>
            <div className="text-2xl font-bold text-blue-600">28h</div>
            <div className="text-sm text-blue-600">Study Time</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800">This Month</h4>
            <div className="text-2xl font-bold text-green-600">120h</div>
            <div className="text-sm text-green-600">Total Progress</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-800">Streak</h4>
            <div className="text-2xl font-bold text-purple-600">15</div>
            <div className="text-sm text-purple-600">Days</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const AIRecommendationsSection = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { type: 'Focus', message: 'Increase Chemistry study time by 2 hours this week', priority: 'high' },
            { type: 'Strategy', message: 'Review Physics formulas before attempting problems', priority: 'medium' },
            { type: 'Revision', message: 'Schedule Biology revision for upcoming topics', priority: 'low' }
          ].map((rec, index) => (
            <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
              <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{rec.type}</span>
                  <Badge variant={
                    rec.priority === 'high' ? 'destructive' :
                    rec.priority === 'medium' ? 'secondary' : 'outline'
                  }>
                    {rec.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{rec.message}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const PerformanceTrackerSection = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Performance Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-3">Study Streaks</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Current Streak</span>
                  <span className="font-medium">15 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Longest Streak</span>
                  <span className="font-medium">23 days</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Achievements</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Completed 100 concepts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">7-day study streak</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ResourcesNotesSection = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Resources & Notes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-3">Quick Access</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Study Notes
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Reference Materials
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Bookmarks</h4>
              <div className="space-y-2">
                <div className="text-sm p-2 bg-gray-50 rounded">
                  Physics - Kinematics Formula Sheet
                </div>
                <div className="text-sm p-2 bg-gray-50 rounded">
                  Chemistry - Periodic Table Trends
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const SettingsCustomizationSection = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Settings & Customization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">Study Preferences</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Daily Study Goal</span>
                <Button variant="outline" size="sm">6 hours</Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Preferred Study Time</span>
                <Button variant="outline" size="sm">Morning</Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Difficulty Level</span>
                <Button variant="outline" size="sm">Medium</Button>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Notifications</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Study Reminders</span>
                <Badge variant="default">On</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Progress Updates</span>
                <Badge variant="default">On</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/dashboard/student')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dynamic & Adaptive Study Plan</h1>
          <p className="text-muted-foreground">NEET 2026 - Personalized AI-Powered Study Strategy</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export Plan
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

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
              <div className="font-bold text-red-600">{studentData.daysLeft}</div>
            </div>
            <div className="text-center">
              <TrendingUp className="h-5 w-5 mx-auto mb-1 text-green-600" />
              <div className="text-xs text-gray-600">Overall Progress</div>
              <div className="font-bold text-green-600">{studentData.totalProgress}%</div>
            </div>
            <div className="text-center">
              <BookOpen className="h-5 w-5 mx-auto mb-1 text-orange-600" />
              <div className="text-xs text-gray-600">Today's Hours</div>
              <div className="font-bold text-orange-600">{studentData.todayProgress}h</div>
            </div>
            <div className="text-center">
              <Target className="h-5 w-5 mx-auto mb-1 text-purple-600" />
              <div className="text-xs text-gray-600">Weekly Target</div>
              <div className="font-bold text-purple-600">{studentData.weeklyTarget}h</div>
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

        <TabsContent value="profile">
          <StudentProfileSection />
        </TabsContent>

        <TabsContent value="analysis">
          <SubjectAnalysisSection />
        </TabsContent>

        <TabsContent value="plan">
          <AdaptivePlanTable />
        </TabsContent>

        <TabsContent value="dashboard">
          <WeeklyMonthlyDashboard />
        </TabsContent>

        <TabsContent value="ai">
          <AIRecommendationsSection />
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceTrackerSection />
        </TabsContent>

        <TabsContent value="resources">
          <ResourcesNotesSection />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsCustomizationSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComprehensiveStudyPlanPage;
