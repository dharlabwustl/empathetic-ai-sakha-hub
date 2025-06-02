
import React, { useState, useEffect } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { User, Target, Calendar as CalendarIcon, Clock, Brain, TrendingUp, BookOpen, Settings, Award, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudentProfile {
  name: string;
  examGoal: string;
  targetDate: string;
  learningPace: 'slow' | 'medium' | 'fast';
  preferredTime: 'morning' | 'afternoon' | 'evening';
  studyHoursPerDay: number;
  availableDaysPerWeek: number;
  preferredSubjectsPerDay: number;
}

interface SubjectAnalysis {
  id: string;
  name: string;
  type: 'weak' | 'strong';
  confidence: number;
  color: string;
  topics: string[];
  progress: number;
}

interface StudyPlanItem {
  date: string;
  subject: string;
  topics: string[];
  studyHours: number;
  timeOfStudy: string;
  focusLevel: 'high' | 'medium' | 'low';
  status: 'done' | 'skipped' | 'pending';
}

const AdaptiveStudyPlanPage: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Student profile state
  const [profile, setProfile] = useState<StudentProfile>({
    name: 'Student',
    examGoal: 'NEET 2026',
    targetDate: '2026-05-03',
    learningPace: 'medium',
    preferredTime: 'morning',
    studyHoursPerDay: 6,
    availableDaysPerWeek: 6,
    preferredSubjectsPerDay: 2
  });

  // Subject analysis state
  const [subjects, setSubjects] = useState<SubjectAnalysis[]>([
    {
      id: 'physics',
      name: 'Physics',
      type: 'weak',
      confidence: 3,
      color: '#8B5CF6',
      topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism'],
      progress: 45
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      type: 'weak',
      confidence: 2,
      color: '#10B981',
      topics: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry'],
      progress: 35
    },
    {
      id: 'biology',
      name: 'Biology',
      type: 'strong',
      confidence: 4,
      color: '#F59E0B',
      topics: ['Botany', 'Zoology', 'Human Physiology'],
      progress: 65
    }
  ]);

  // Study plan items
  const [studyPlan, setStudyPlan] = useState<StudyPlanItem[]>([
    {
      date: '2024-12-03',
      subject: 'Physics',
      topics: ['Mechanics - Laws of Motion'],
      studyHours: 3,
      timeOfStudy: 'Morning',
      focusLevel: 'high',
      status: 'done'
    },
    {
      date: '2024-12-03',
      subject: 'Chemistry',
      topics: ['Physical Chemistry - Thermodynamics'],
      studyHours: 2,
      timeOfStudy: 'Afternoon',
      focusLevel: 'medium',
      status: 'pending'
    },
    {
      date: '2024-12-04',
      subject: 'Biology',
      topics: ['Botany - Plant Physiology'],
      studyHours: 2,
      timeOfStudy: 'Morning',
      focusLevel: 'high',
      status: 'pending'
    }
  ]);

  const [weekendOff, setWeekendOff] = useState(true);

  const daysLeft = Math.ceil((new Date(profile.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const overallProgress = Math.round(subjects.reduce((sum, s) => sum + s.progress, 0) / subjects.length);
  const weakSubjects = subjects.filter(s => s.type === 'weak');
  const strongSubjects = subjects.filter(s => s.type === 'strong');

  const updateProfile = (field: keyof StudentProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    toast({
      title: "Profile Updated",
      description: `${field} has been updated successfully.`,
    });
  };

  const updateSubjectConfidence = (subjectId: string, confidence: number) => {
    setSubjects(prev => prev.map(s => 
      s.id === subjectId ? { ...s, confidence } : s
    ));
  };

  const toggleSubjectType = (subjectId: string) => {
    setSubjects(prev => prev.map(s => 
      s.id === subjectId ? { 
        ...s, 
        type: s.type === 'weak' ? 'strong' : 'weak' 
      } : s
    ));
  };

  return (
    <SharedPageLayout
      title="Dynamic & Adaptive Study Plan"
      subtitle="AI-powered personalized study planning for NEET 2026"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="plan">Study Plan</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Student Profile Section */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Student Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Student Name</Label>
                    <Input 
                      value={profile.name}
                      onChange={(e) => updateProfile('name', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label>Exam Goal</Label>
                    <Select value={profile.examGoal} onValueChange={(value) => updateProfile('examGoal', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NEET 2026">NEET 2026</SelectItem>
                        <SelectItem value="JEE 2026">JEE 2026</SelectItem>
                        <SelectItem value="CAT 2026">CAT 2026</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Learning Pace</Label>
                    <Select value={profile.learningPace} onValueChange={(value: 'slow' | 'medium' | 'fast') => updateProfile('learningPace', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="slow">Slow & Steady</SelectItem>
                        <SelectItem value="medium">Moderate</SelectItem>
                        <SelectItem value="fast">Aggressive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Preferred Study Time</Label>
                    <Select value={profile.preferredTime} onValueChange={(value: 'morning' | 'afternoon' | 'evening') => updateProfile('preferredTime', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning</SelectItem>
                        <SelectItem value="afternoon">Afternoon</SelectItem>
                        <SelectItem value="evening">Evening</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Study Hours per Day: {profile.studyHoursPerDay}</Label>
                    <Slider
                      value={[profile.studyHoursPerDay]}
                      onValueChange={(value) => updateProfile('studyHoursPerDay', value[0])}
                      max={12}
                      min={2}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Available Days per Week: {profile.availableDaysPerWeek}</Label>
                    <Slider
                      value={[profile.availableDaysPerWeek]}
                      onValueChange={(value) => updateProfile('availableDaysPerWeek', value[0])}
                      max={7}
                      min={4}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Preferred Subjects per Day: {profile.preferredSubjectsPerDay}</Label>
                    <Slider
                      value={[profile.preferredSubjectsPerDay]}
                      onValueChange={(value) => updateProfile('preferredSubjectsPerDay', value[0])}
                      max={3}
                      min={1}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Exam Details</span>
                    </div>
                    <p className="text-sm text-blue-700">Target: {profile.examGoal}</p>
                    <p className="text-sm text-blue-700">Date: {new Date(profile.targetDate).toLocaleDateString()}</p>
                    <p className="text-sm text-blue-700">Days Left: {daysLeft}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subject Analysis Section */}
        <TabsContent value="subjects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Subject Analysis & Confidence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subjects.map((subject) => (
                  <Card key={subject.id} className="border-2" style={{ borderColor: subject.color + '40' }}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold" style={{ color: subject.color }}>{subject.name}</h3>
                        <Button
                          size="sm"
                          variant={subject.type === 'weak' ? 'destructive' : 'default'}
                          onClick={() => toggleSubjectType(subject.id)}
                        >
                          {subject.type === 'weak' ? 'Weak' : 'Strong'}
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm">Confidence Level: {subject.confidence}/5</Label>
                          <Slider
                            value={[subject.confidence]}
                            onValueChange={(value) => updateSubjectConfidence(subject.id, value[0])}
                            max={5}
                            min={1}
                            step={1}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-sm">Progress</Label>
                          <Progress value={subject.progress} className="mt-1" />
                          <span className="text-xs text-gray-500">{subject.progress}%</span>
                        </div>
                        
                        <div>
                          <Label className="text-sm">Key Topics</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {subject.topics.map((topic, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
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

        {/* Adaptive Study Plan Table */}
        <TabsContent value="plan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Adaptive Study Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 p-2 text-left">Date</th>
                      <th className="border border-gray-200 p-2 text-left">Subject</th>
                      <th className="border border-gray-200 p-2 text-left">Topics</th>
                      <th className="border border-gray-200 p-2 text-left">Hours</th>
                      <th className="border border-gray-200 p-2 text-left">Time</th>
                      <th className="border border-gray-200 p-2 text-left">Focus</th>
                      <th className="border border-gray-200 p-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studyPlan.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-200 p-2">{item.date}</td>
                        <td className="border border-gray-200 p-2">
                          <Badge variant="outline">{item.subject}</Badge>
                        </td>
                        <td className="border border-gray-200 p-2">
                          {item.topics.map((topic, i) => (
                            <div key={i} className="text-sm">{topic}</div>
                          ))}
                        </td>
                        <td className="border border-gray-200 p-2">{item.studyHours}h</td>
                        <td className="border border-gray-200 p-2">{item.timeOfStudy}</td>
                        <td className="border border-gray-200 p-2">
                          <Badge 
                            variant={item.focusLevel === 'high' ? 'default' : 'secondary'}
                          >
                            {item.focusLevel}
                          </Badge>
                        </td>
                        <td className="border border-gray-200 p-2">
                          <Badge
                            variant={
                              item.status === 'done' ? 'default' :
                              item.status === 'skipped' ? 'destructive' : 'secondary'
                            }
                          >
                            {item.status}
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
        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">{overallProgress}%</div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">{daysLeft}</div>
                <div className="text-sm text-gray-600">Days Left</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-600" />
                <div className="text-2xl font-bold">{weakSubjects.length}</div>
                <div className="text-sm text-gray-600">Weak Subjects</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Award className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">{strongSubjects.length}</div>
                <div className="text-sm text-gray-600">Strong Subjects</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Syllabus Progress</CardTitle>
              </CardHeader>
              <CardContent>
                {subjects.map((subject) => (
                  <div key={subject.id} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{subject.name}</span>
                      <span className="text-sm">{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">📚 Focus more on Chemistry - your weakest subject</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">⏰ Increase study hours to 7/day for better progress</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-800">🔄 Revise Biology topics from last week</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tracker */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Performance tracking will be available after taking mock tests</p>
                <Button className="mt-4">Take Your First Mock Test</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings & Customization */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Study Plan Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label>Weekend Off</Label>
                <Switch checked={weekendOff} onCheckedChange={setWeekendOff} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Auto-adjust difficulty based on performance</Label>
                  <Switch defaultChecked className="mt-2" />
                </div>
                <div>
                  <Label>Send daily study reminders</Label>
                  <Switch defaultChecked className="mt-2" />
                </div>
                <div>
                  <Label>Include revision days</Label>
                  <Switch defaultChecked className="mt-2" />
                </div>
                <div>
                  <Label>Smart subject rotation</Label>
                  <Switch defaultChecked className="mt-2" />
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full">Save Settings & Regenerate Plan</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default AdaptiveStudyPlanPage;
