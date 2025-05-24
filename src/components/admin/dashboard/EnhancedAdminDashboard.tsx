
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  BookOpen, 
  Brain, 
  Settings, 
  TrendingUp, 
  Database,
  Shield,
  Zap,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ActionDialog from "@/components/admin/dialogs/ActionDialog";
import { useActionDialog } from "@/hooks/useActionDialog";

interface Feature {
  id: string;
  name: string;
  category: 'Student' | 'AI' | 'Content' | 'Analytics' | 'System';
  status: 'active' | 'inactive' | 'development';
  description: string;
  lastUpdated: string;
  version: string;
  dependencies: string[];
  apiEndpoint?: string;
  flaskBackend?: string;
  aiModel?: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  examGoal: string;
  examDate: string;
  personalityType: string;
  studyPreferences: {
    pace: string;
    time: string;
    environment: string;
  };
  weakSubjects: string[];
  strongSubjects: string[];
  studyPlan: {
    id: string;
    name: string;
    progress: number;
    subjects: any[];
  };
  progress: {
    totalStudyTime: number;
    conceptsCompleted: number;
    averageScore: number;
    streak: number;
  };
  onboardingData: {
    age: number;
    grade: string;
    location: string;
    interests: string[];
    mood: string;
  };
}

const EnhancedAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("features");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const { dialogState, openDialog, closeDialog } = useActionDialog();

  const mockFeatures: Feature[] = [
    {
      id: "feat-001",
      name: "AI Study Plan Generator",
      category: "AI",
      status: "active",
      description: "Generates personalized study plans using AI",
      lastUpdated: "2024-01-15",
      version: "2.1.0",
      dependencies: ["OpenAI API", "Flask Backend"],
      apiEndpoint: "/api/generate-study-plan",
      flaskBackend: "study_plan_service.py",
      aiModel: "GPT-4"
    },
    {
      id: "feat-002",
      name: "Mood-Based Learning",
      category: "Student",
      status: "active",
      description: "Adapts content based on student mood",
      lastUpdated: "2024-01-14",
      version: "1.5.0",
      dependencies: ["Sentiment Analysis API"],
      apiEndpoint: "/api/mood-analysis",
      flaskBackend: "mood_service.py",
      aiModel: "Claude-3"
    },
    {
      id: "feat-003",
      name: "3D Model Viewer",
      category: "Content",
      status: "development",
      description: "Interactive 3D models for complex concepts",
      lastUpdated: "2024-01-10",
      version: "0.8.0",
      dependencies: ["Three.js", "WebGL"],
      apiEndpoint: "/api/3d-models"
    },
    {
      id: "feat-004",
      name: "Batch Management",
      category: "Student",
      status: "active",
      description: "Group learning and collaboration tools",
      lastUpdated: "2024-01-12",
      version: "1.3.0",
      dependencies: ["WebSocket", "Redis"],
      apiEndpoint: "/api/batch-management",
      flaskBackend: "batch_service.py"
    },
    {
      id: "feat-005",
      name: "Subscription Management",
      category: "System",
      status: "active",
      description: "Handles billing and subscription tiers",
      lastUpdated: "2024-01-13",
      version: "2.0.0",
      dependencies: ["Stripe API", "Payment Gateway"],
      apiEndpoint: "/api/subscriptions",
      flaskBackend: "billing_service.py"
    }
  ];

  const mockUserProfiles: UserProfile[] = [
    {
      id: "user-001",
      name: "Aryan Sharma",
      email: "aryan.sharma@example.com",
      phone: "+91-9876543210",
      examGoal: "JEE Advanced",
      examDate: "2024-05-15",
      personalityType: "Strategic Thinker",
      studyPreferences: {
        pace: "Aggressive",
        time: "Morning",
        environment: "Quiet"
      },
      weakSubjects: ["Chemistry", "Organic Chemistry"],
      strongSubjects: ["Physics", "Mathematics"],
      studyPlan: {
        id: "plan-001",
        name: "JEE Advanced 2024",
        progress: 75,
        subjects: [
          { name: "Physics", progress: 85, priority: "high" },
          { name: "Chemistry", progress: 60, priority: "high" },
          { name: "Mathematics", progress: 80, priority: "medium" }
        ]
      },
      progress: {
        totalStudyTime: 156,
        conceptsCompleted: 234,
        averageScore: 82,
        streak: 12
      },
      onboardingData: {
        age: 17,
        grade: "12th",
        location: "Mumbai, Maharashtra",
        interests: ["Problem Solving", "Physics Experiments"],
        mood: "Motivated"
      }
    }
  ];

  const filteredFeatures = mockFeatures.filter(feature => 
    feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feature.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = mockUserProfiles.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddFeature = () => {
    openDialog('create', 'New Feature', {
      name: '',
      category: 'Student',
      description: '',
      apiEndpoint: '',
      flaskBackend: '',
      aiModel: '',
      dependencies: ''
    });
  };

  const handleViewFeature = (feature: Feature) => {
    openDialog('view', feature.name, {
      id: feature.id,
      name: feature.name,
      category: feature.category,
      status: feature.status,
      description: feature.description,
      lastUpdated: feature.lastUpdated,
      version: feature.version,
      dependencies: feature.dependencies.join(', '),
      apiEndpoint: feature.apiEndpoint,
      flaskBackend: feature.flaskBackend,
      aiModel: feature.aiModel
    });
  };

  const handleEditFeature = (feature: Feature) => {
    openDialog('edit', feature.name, {
      name: feature.name,
      category: feature.category,
      description: feature.description,
      apiEndpoint: feature.apiEndpoint,
      flaskBackend: feature.flaskBackend,
      aiModel: feature.aiModel,
      dependencies: feature.dependencies.join(', ')
    });
  };

  const handleViewUserProfile = (user: UserProfile) => {
    openDialog('view', user.name, {
      personalInfo: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        age: user.onboardingData.age,
        grade: user.onboardingData.grade,
        location: user.onboardingData.location
      },
      examInfo: {
        examGoal: user.examGoal,
        examDate: user.examDate,
        personalityType: user.personalityType
      },
      studyProfile: {
        pace: user.studyPreferences.pace,
        time: user.studyPreferences.time,
        environment: user.studyPreferences.environment,
        weakSubjects: user.weakSubjects.join(', '),
        strongSubjects: user.strongSubjects.join(', ')
      },
      studyPlan: {
        name: user.studyPlan.name,
        progress: `${user.studyPlan.progress}%`,
        subjects: user.studyPlan.subjects.length
      },
      progress: {
        totalStudyTime: `${user.progress.totalStudyTime} hours`,
        conceptsCompleted: user.progress.conceptsCompleted,
        averageScore: `${user.progress.averageScore}%`,
        streak: `${user.progress.streak} days`
      }
    });
  };

  const handleSave = (data: any) => {
    toast({
      title: "Success",
      description: `${data.name} has been saved successfully.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'development':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Student': return <Users className="h-4 w-4" />;
      case 'AI': return <Brain className="h-4 w-4" />;
      case 'Content': return <BookOpen className="h-4 w-4" />;
      case 'Analytics': return <TrendingUp className="h-4 w-4" />;
      case 'System': return <Settings className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Enhanced Admin Dashboard</h2>
            <p className="text-muted-foreground">Complete management with end-to-end connectivity</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="users">User Profiles</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="connectivity">Connectivity</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Unified Features Management
                  </CardTitle>
                  <Button onClick={handleAddFeature}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Feature
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search features..." 
                      className="pl-8" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid gap-4">
                  {filteredFeatures.map((feature) => (
                    <Card key={feature.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {getCategoryIcon(feature.category)}
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{feature.name}</h3>
                                <Badge className={getStatusColor(feature.status)}>
                                  {feature.status}
                                </Badge>
                                <Badge variant="outline">{feature.category}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{feature.description}</p>
                              <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                                <span>Version: {feature.version}</span>
                                <span>Updated: {feature.lastUpdated}</span>
                                {feature.aiModel && <span>AI: {feature.aiModel}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleViewFeature(feature)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEditFeature(feature)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Complete User Profiles
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search users..." 
                      className="pl-8" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <Card key={user.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{user.name}</h3>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                              <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                                <span>{user.examGoal}</span>
                                <span>Progress: {user.studyPlan.progress}%</span>
                                <span>Streak: {user.progress.streak} days</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleViewUserProfile(user)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold">1,234</div>
                      <div className="text-sm text-muted-foreground">Active Users</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="text-2xl font-bold">98.5%</div>
                      <div className="text-sm text-muted-foreground">AI Uptime</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                    <div>
                      <div className="text-2xl font-bold">5,678</div>
                      <div className="text-sm text-muted-foreground">Content Items</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="connectivity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Connectivity Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      <span>Flask Backend</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      <span>AI Model APIs</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      <span>Security Layer</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Secure</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">CPU Usage</div>
                    <div className="text-2xl font-bold">42%</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">Memory Usage</div>
                    <div className="text-2xl font-bold">68%</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">API Calls/min</div>
                    <div className="text-2xl font-bold">1,247</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">Error Rate</div>
                    <div className="text-2xl font-bold">0.3%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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

export default EnhancedAdminDashboard;
