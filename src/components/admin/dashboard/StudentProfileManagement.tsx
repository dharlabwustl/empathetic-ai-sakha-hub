
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  User,
  BookOpen,
  TrendingUp,
  Clock,
  Target,
  Brain,
  Calendar
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ActionDialog from "@/components/admin/dialogs/ActionDialog";
import { useActionDialog } from "@/hooks/useActionDialog";

interface CompleteStudentProfile {
  // Basic Info
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;

  // Signup Data
  signupDate: string;
  signupType: 'email' | 'google' | 'phone';
  referralSource?: string;

  // Onboarding Data
  onboarding: {
    age: number;
    grade: string;
    location: string;
    city: string;
    institute: string;
    examGoal: string;
    examDate: string;
    personalityType: string;
    learningStyle: string;
    mood: string;
    studyEnvironment: string;
    studyPace: 'slow' | 'moderate' | 'fast';
    dailyStudyHours: number;
    preferredStudyTime: string;
    interests: string[];
    weakSubjects: string[];
    strongSubjects: string[];
  };

  // Study Plan
  studyPlan: {
    id: string;
    name: string;
    examGoal: string;
    examDate: string;
    status: 'active' | 'completed' | 'paused';
    progress: number;
    totalHours: number;
    completedHours: number;
    subjects: {
      name: string;
      priority: 'high' | 'medium' | 'low';
      proficiency: 'weak' | 'medium' | 'strong';
      progress: number;
      hoursAllocated: number;
      hoursCompleted: number;
    }[];
  };

  // Progress Tracking
  progress: {
    totalStudyTime: number;
    conceptsCompleted: number;
    flashcardsCompleted: number;
    practiceTestsCompleted: number;
    averageScore: number;
    currentStreak: number;
    longestStreak: number;
    weeklyGoal: number;
    monthlyProgress: number;
    subjectProgress: {
      subject: string;
      mastery: number;
      timeSpent: number;
      lastStudied: string;
    }[];
  };

  // Activity & Engagement
  activity: {
    lastActive: string;
    loginCount: number;
    sessionDuration: number;
    featuresUsed: string[];
    preferredDevices: string[];
    engagementScore: number;
  };

  // Performance Analytics
  analytics: {
    learningVelocity: number;
    retentionRate: number;
    accuracyTrend: number[];
    timeDistribution: {
      concepts: number;
      practice: number;
      revision: number;
    };
    weaknessPattern: string[];
    improvementAreas: string[];
  };

  // Subscription & Billing
  subscription: {
    plan: string;
    status: 'active' | 'expired' | 'trial';
    startDate: string;
    endDate: string;
    features: string[];
    billingHistory: {
      date: string;
      amount: number;
      status: string;
    }[];
  };
}

const StudentProfileManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  const { dialogState, openDialog, closeDialog } = useActionDialog();

  const mockProfiles: CompleteStudentProfile[] = [
    {
      id: 'student-001',
      name: 'Aryan Sharma',
      email: 'aryan.sharma@example.com',
      phone: '+91-9876543210',
      signupDate: '2023-09-15',
      signupType: 'email',
      onboarding: {
        age: 17,
        grade: '12th',
        location: 'Mumbai, Maharashtra',
        city: 'Mumbai',
        institute: 'ABC High School',
        examGoal: 'JEE Advanced',
        examDate: '2024-05-15',
        personalityType: 'Strategic Thinker',
        learningStyle: 'visual',
        mood: 'motivated',
        studyEnvironment: 'quiet',
        studyPace: 'moderate',
        dailyStudyHours: 6,
        preferredStudyTime: 'morning',
        interests: ['Physics', 'Problem Solving'],
        weakSubjects: ['Chemistry', 'Organic Chemistry'],
        strongSubjects: ['Physics', 'Mathematics']
      },
      studyPlan: {
        id: 'plan-001',
        name: 'JEE Advanced 2024 Preparation',
        examGoal: 'JEE Advanced',
        examDate: '2024-05-15',
        status: 'active',
        progress: 75,
        totalHours: 800,
        completedHours: 600,
        subjects: [
          {
            name: 'Physics',
            priority: 'high',
            proficiency: 'strong',
            progress: 85,
            hoursAllocated: 300,
            hoursCompleted: 255
          },
          {
            name: 'Chemistry',
            priority: 'high',
            proficiency: 'weak',
            progress: 60,
            hoursAllocated: 300,
            hoursCompleted: 180
          },
          {
            name: 'Mathematics',
            priority: 'medium',
            proficiency: 'strong',
            progress: 80,
            hoursAllocated: 200,
            hoursCompleted: 160
          }
        ]
      },
      progress: {
        totalStudyTime: 156,
        conceptsCompleted: 234,
        flashcardsCompleted: 456,
        practiceTestsCompleted: 23,
        averageScore: 82,
        currentStreak: 12,
        longestStreak: 25,
        weeklyGoal: 40,
        monthlyProgress: 85,
        subjectProgress: [
          {
            subject: 'Physics',
            mastery: 85,
            timeSpent: 60,
            lastStudied: '2024-01-15'
          },
          {
            subject: 'Chemistry',
            mastery: 60,
            timeSpent: 45,
            lastStudied: '2024-01-14'
          },
          {
            subject: 'Mathematics',
            mastery: 80,
            timeSpent: 51,
            lastStudied: '2024-01-15'
          }
        ]
      },
      activity: {
        lastActive: '2024-01-15',
        loginCount: 45,
        sessionDuration: 120,
        featuresUsed: ['Study Plan', 'Flashcards', 'Practice Tests', 'Progress Tracker'],
        preferredDevices: ['Desktop', 'Mobile'],
        engagementScore: 92
      },
      analytics: {
        learningVelocity: 85,
        retentionRate: 78,
        accuracyTrend: [75, 78, 82, 85, 87],
        timeDistribution: {
          concepts: 40,
          practice: 35,
          revision: 25
        },
        weaknessPattern: ['Organic Chemistry', 'Thermodynamics'],
        improvementAreas: ['Problem-solving speed', 'Concept retention']
      },
      subscription: {
        plan: 'Premium',
        status: 'active',
        startDate: '2023-09-15',
        endDate: '2024-09-15',
        features: ['AI Study Plans', 'Unlimited Practice', 'Progress Analytics'],
        billingHistory: [
          {
            date: '2023-09-15',
            amount: 2999,
            status: 'paid'
          }
        ]
      }
    }
  ];

  const filteredProfiles = mockProfiles.filter(profile => 
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.onboarding.examGoal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProfile = (profile: CompleteStudentProfile) => {
    openDialog('view', `${profile.name} - Complete Profile`, {
      basicInfo: profile,
      onboarding: profile.onboarding,
      studyPlan: profile.studyPlan,
      progress: profile.progress,
      activity: profile.activity,
      analytics: profile.analytics,
      subscription: profile.subscription
    });
  };

  const handleEditProfile = (profile: CompleteStudentProfile) => {
    openDialog('edit', `Edit ${profile.name}`, {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      examGoal: profile.onboarding.examGoal,
      examDate: profile.onboarding.examDate,
      weakSubjects: profile.onboarding.weakSubjects.join(', '),
      strongSubjects: profile.onboarding.strongSubjects.join(', ')
    });
  };

  const handleSave = (data: any) => {
    toast({
      title: "Profile Updated",
      description: `${data.name}'s profile has been updated successfully.`,
    });
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Student Profile Management</h2>
            <p className="text-muted-foreground">Complete student data with onboarding, study plans, and progress</p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export All Data
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Student Profiles</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="onboarding">Onboarding Data</TabsTrigger>
                <TabsTrigger value="study-plans">Study Plans</TabsTrigger>
                <TabsTrigger value="progress">Progress Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="space-y-4">
                  {filteredProfiles.map((profile) => (
                    <Card key={profile.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={profile.avatar} />
                              <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{profile.name}</h3>
                              <p className="text-sm text-muted-foreground">{profile.email}</p>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline">{profile.onboarding.examGoal}</Badge>
                                <Badge variant="outline">{profile.studyPlan.status}</Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-6 text-center">
                            <div>
                              <div className="text-lg font-semibold">{profile.progress.currentStreak}</div>
                              <div className="text-xs text-muted-foreground">Study Streak</div>
                            </div>
                            <div>
                              <div className="text-lg font-semibold">{profile.studyPlan.progress}%</div>
                              <div className="text-xs text-muted-foreground">Plan Progress</div>
                            </div>
                            <div>
                              <div className="text-lg font-semibold">{profile.progress.averageScore}%</div>
                              <div className="text-xs text-muted-foreground">Avg Score</div>
                            </div>
                            <div>
                              <div className="text-lg font-semibold">{profile.activity.engagementScore}</div>
                              <div className="text-xs text-muted-foreground">Engagement</div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleViewProfile(profile)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleEditProfile(profile)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="onboarding">
                <div className="space-y-4">
                  {filteredProfiles.map((profile) => (
                    <Card key={profile.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">{profile.name} - Onboarding Data</h3>
                          <Badge>{profile.onboarding.personalityType}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Age:</span> {profile.onboarding.age}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Grade:</span> {profile.onboarding.grade}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Location:</span> {profile.onboarding.location}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Study Pace:</span> {profile.onboarding.studyPace}
                          </div>
                          <div className="col-span-2">
                            <span className="text-muted-foreground">Weak Subjects:</span> {profile.onboarding.weakSubjects.join(', ')}
                          </div>
                          <div className="col-span-2">
                            <span className="text-muted-foreground">Strong Subjects:</span> {profile.onboarding.strongSubjects.join(', ')}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="study-plans">
                <div className="space-y-4">
                  {filteredProfiles.map((profile) => (
                    <Card key={profile.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">{profile.studyPlan.name}</h3>
                          <Badge className={profile.studyPlan.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {profile.studyPlan.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <span className="text-muted-foreground">Progress:</span> {profile.studyPlan.progress}%
                          </div>
                          <div>
                            <span className="text-muted-foreground">Hours Completed:</span> {profile.studyPlan.completedHours}/{profile.studyPlan.totalHours}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Exam Date:</span> {profile.studyPlan.examDate}
                          </div>
                        </div>
                        <div className="space-y-2">
                          {profile.studyPlan.subjects.map((subject, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded">
                              <span>{subject.name}</span>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{subject.proficiency}</Badge>
                                <span className="text-sm">{subject.progress}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="progress">
                <div className="space-y-4">
                  {filteredProfiles.map((profile) => (
                    <Card key={profile.id} className="border">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-4">{profile.name} - Progress Analytics</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="p-3 border rounded">
                            <div className="text-sm text-muted-foreground">Study Time</div>
                            <div className="text-lg font-bold">{profile.progress.totalStudyTime}h</div>
                          </div>
                          <div className="p-3 border rounded">
                            <div className="text-sm text-muted-foreground">Concepts</div>
                            <div className="text-lg font-bold">{profile.progress.conceptsCompleted}</div>
                          </div>
                          <div className="p-3 border rounded">
                            <div className="text-sm text-muted-foreground">Avg Score</div>
                            <div className="text-lg font-bold">{profile.progress.averageScore}%</div>
                          </div>
                          <div className="p-3 border rounded">
                            <div className="text-sm text-muted-foreground">Retention</div>
                            <div className="text-lg font-bold">{profile.analytics.retentionRate}%</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <ActionDialog
        type={dialogState.type!}
        title={dialogState.title}
        data={dialogState.data}
        isOpen={dialogState.isOpen}
        onClose={closeDialog}
        onSave={handleSave}
      />
    </>
  );
};

export default StudentProfileManagement;
