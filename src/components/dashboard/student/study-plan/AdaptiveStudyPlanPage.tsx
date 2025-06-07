
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Target, 
  Calendar, 
  Clock, 
  BookOpen, 
  Brain, 
  TrendingUp,
  Settings,
  BarChart3,
  Award,
  Download,
  Bell,
  Plus,
  Edit,
  Star,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { SharedPageLayout } from '../SharedPageLayout';
import { useToast } from '@/hooks/use-toast';

const AdaptiveStudyPlanPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');

  // Student Profile State
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    examGoal: "NEET 2026",
    targetDate: "2026-05-03",
    learningPace: "moderate",
    preferredStudyTime: "evening",
    studyHoursPerDay: 6,
    availableDaysPerWeek: 6,
    preferredSubjectsPerDay: 2,
    weekendOff: true
  });

  // Subject Analysis State
  const [subjects, setSubjects] = useState([
    {
      id: 'physics',
      name: 'Physics',
      color: '#8B5CF6',
      strength: 'weak',
      confidence: 3,
      topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Modern Physics']
    },
    {
      id: 'chemistry',
      name: 'Chemistry', 
      color: '#10B981',
      strength: 'medium',
      confidence: 4,
      topics: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry']
    },
    {
      id: 'biology',
      name: 'Biology',
      color: '#F59E0B',
      strength: 'strong',
      confidence: 5,
      topics: ['Botany', 'Zoology', 'Human Physiology', 'Genetics', 'Ecology']
    }
  ]);

  // Adaptive Plan Table State
  const [planData, setPlanData] = useState([
    {
      id: 1,
      date: '2024-06-07',
      subject: 'Physics',
      topics: ['Mechanics - Newton\'s Laws', 'Work & Energy'],
      studyHours: 2.5,
      timeOfStudy: 'Evening',
      focusLevel: 'High',
      status: 'Pending'
    },
    {
      id: 2,
      date: '2024-06-08',
      subject: 'Chemistry',
      topics: ['Organic Chemistry - Hydrocarbons'],
      studyHours: 2,
      timeOfStudy: 'Evening',
      focusLevel: 'Medium',
      status: 'Pending'
    },
    {
      id: 3,
      date: '2024-06-09',
      subject: 'Biology',
      topics: ['Cell Biology', 'Photosynthesis'],
      studyHours: 3,
      timeOfStudy: 'Evening',
      focusLevel: 'High',
      status: 'Pending'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Done':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Skipped':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const updatePlanItem = (id: number, field: string, value: string) => {
    setPlanData(planData.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const updateSubjectStrength = (subjectId: string, strength: string) => {
    setSubjects(subjects.map(s => 
      s.id === subjectId ? { ...s, strength } : s
    ));
  };

  const updateConfidence = (subjectId: string, confidence: number) => {
    setSubjects(subjects.map(s => 
      s.id === subjectId ? { ...s, confidence } : s
    ));
  };

  return (
    <SharedPageLayout
      title="AI-Powered Study Plan"
      subtitle="Personalized & Adaptive Learning Journey for NEET 2026"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Reminders
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Plan
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Settings className="h-4 w-4 mr-2" />
            Customize
          </Button>
        </div>
      }
    >
      {/* Quick Stats Header */}
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Calendar className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <div className="text-xs text-gray-600 mb-1">Days Left</div>
              <div className="text-2xl font-bold text-blue-600">497</div>
              <div className="text-xs text-gray-500">Till NEET 2026</div>
            </div>
            <div className="text-center">
              <Target className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <div className="text-xs text-gray-600 mb-1">Progress</div>
              <div className="text-2xl font-bold text-green-600">45%</div>
              <Progress value={45} className="h-2 mt-1" />
            </div>
            <div className="text-center">
              <Clock className="h-6 w-6 mx-auto mb-2 text-orange-600" />
              <div className="text-xs text-gray-600 mb-1">Today</div>
              <div className="text-2xl font-bold text-orange-600">3.5h</div>
              <div className="text-xs text-gray-500">of 6h target</div>
            </div>
            <div className="text-center">
              <Award className="h-6 w-6 mx-auto mb-2 text-purple-600" />
              <div className="text-xs text-gray-600 mb-1">Streak</div>
              <div className="text-2xl font-bold text-purple-600">15</div>
              <div className="text-xs text-gray-500">days</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6">
          <TabsTrigger value="profile">🧑‍🎓 Profile</TabsTrigger>
          <TabsTrigger value="analysis">📊 Analysis</TabsTrigger>
          <TabsTrigger value="plan">📅 Plan</TabsTrigger>
          <TabsTrigger value="dashboard">📆 Dashboard</TabsTrigger>
          <TabsTrigger value="ai">🤖 AI</TabsTrigger>
          <TabsTrigger value="performance">📈 Performance</TabsTrigger>
          <TabsTrigger value="resources">📚 Resources</TabsTrigger>
          <TabsTrigger value="settings">⚙️ Settings</TabsTrigger>
        </TabsList>

        {/* Student Profile Section */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                🧑‍🎓 Student Profile Section
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
                  </div>
                  
                  <div>
                    <Label>Exam Goal</Label>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {profile.examGoal}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Target Exam Date</Label>
                    <Input type="date" value={profile.targetDate} onChange={(e) => setProfile({...profile, targetDate: e.target.value})} />
                  </div>
                  
                  <div>
                    <Label>Learning Pace</Label>
                    <Select value={profile.learningPace} onValueChange={(value) => setProfile({...profile, learningPace: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="slow">Slow</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="aggressive">Aggressive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label>Preferred Study Time</Label>
                    <Select value={profile.preferredStudyTime} onValueChange={(value) => setProfile({...profile, preferredStudyTime: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning</SelectItem>
                        <SelectItem value="afternoon">Afternoon</SelectItem>
                        <SelectItem value="evening">Evening</SelectItem>
                        <SelectItem value="night">Night</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Total Study Hours per Day</Label>
                    <Input 
                      type="number" 
                      value={profile.studyHoursPerDay}
                      onChange={(e) => setProfile({...profile, studyHoursPerDay: parseInt(e.target.value)})}
                    />
                  </div>
                  
                  <div>
                    <Label>Available Days per Week</Label>
                    <Input 
                      type="number" 
                      max="7" 
                      value={profile.availableDaysPerWeek}
                      onChange={(e) => setProfile({...profile, availableDaysPerWeek: parseInt(e.target.value)})}
                    />
                  </div>
                  
                  <div>
                    <Label>Preferred Subjects per Day</Label>
                    <Input 
                      type="number" 
                      max="3" 
                      value={profile.preferredSubjectsPerDay}
                      onChange={(e) => setProfile({...profile, preferredSubjectsPerDay: parseInt(e.target.value)})}
                    />
                  </div>
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
                📊 Subject Analysis Input
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {subjects.map((subject) => (
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
                        <div className="flex gap-2">
                          {['weak', 'medium', 'strong'].map((strength) => (
                            <Button
                              key={strength}
                              variant={subject.strength === strength ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => updateSubjectStrength(subject.id, strength)}
                            >
                              {strength.charAt(0).toUpperCase() + strength.slice(1)}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Confidence Level (1-5)</span>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 cursor-pointer ${
                                    star <= subject.confidence ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                  }`}
                                  onClick={() => updateConfidence(subject.id, star)}
                                />
                              ))}
                              <span className="ml-2 text-sm text-gray-600">{subject.confidence}/5</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium mb-2 block">Topics</span>
                          <div className="flex flex-wrap gap-1">
                            {subject.topics.map((topic, index) => (
                              <Badge 
                                key={index} 
                                variant="outline" 
                                className="text-xs"
                                style={{ borderColor: subject.color }}
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
        </TabsContent>

        {/* Adaptive Plan Table */}
        <TabsContent value="plan">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                📅 Adaptive Study Plan Table (Dynamic Grid)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Date</th>
                      <th className="text-left p-3 font-medium">Subject</th>
                      <th className="text-left p-3 font-medium">Topics Planned</th>
                      <th className="text-left p-3 font-medium">Study Hours</th>
                      <th className="text-left p-3 font-medium">Time of Study</th>
                      <th className="text-left p-3 font-medium">Focus Level</th>
                      <th className="text-left p-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {planData.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">
                              {new Date(item.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline">{item.subject}</Badge>
                        </td>
                        <td className="p-3">
                          <div className="space-y-1">
                            {item.topics.map((topic, index) => (
                              <div key={index} className="text-sm text-gray-700">
                                • {topic}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-orange-600" />
                            <span className="font-medium">{item.studyHours}h</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <Select 
                            value={item.timeOfStudy} 
                            onValueChange={(value) => updatePlanItem(item.id, 'timeOfStudy', value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Morning">Morning</SelectItem>
                              <SelectItem value="Afternoon">Afternoon</SelectItem>
                              <SelectItem value="Evening">Evening</SelectItem>
                              <SelectItem value="Night">Night</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="p-3">
                          <Select 
                            value={item.focusLevel} 
                            onValueChange={(value) => updatePlanItem(item.id, 'focusLevel', value)}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="High">High</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(item.status)}
                            <Select 
                              value={item.status} 
                              onValueChange={(value) => updatePlanItem(item.id, 'status', value)}
                            >
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Done">Done</SelectItem>
                                <SelectItem value="Skipped">Skipped</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">Auto-Adjustment Features</h4>
                <p className="text-sm text-gray-700">Plan automatically adjusts based on your learning performance and mood tracking.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dashboard Tab - Placeholder for now */}
        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>📆 Weekly & Monthly Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Weekly and monthly dashboard with study calendar will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Recommendations Tab - Placeholder */}
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>🤖 AI-Powered Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <p>AI recommendations will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab - Placeholder */}
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>📈 Performance Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Performance tracking will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab - Placeholder */}
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>📚 Resources & Notes Section</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Resources and notes section will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>⚙️ Settings & Customization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Weekend Off</Label>
                  <Switch
                    checked={profile.weekendOff}
                    onCheckedChange={(checked) => setProfile({...profile, weekendOff: checked})}
                  />
                </div>
                <Button onClick={() => toast({title: "Settings saved successfully!"})}>
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default AdaptiveStudyPlanPage;
