import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Users,
  FileText,
  Clock,
  TrendingUp,
  Activity,
  ArrowUpRight,
  AlertCircle,
  Brain,
  Book,
  Settings,
  MessageSquare,
  Eye
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { adminService } from "@/services/adminService";
import { AdminDashboardStats, StudentData, SystemLog } from "@/types/admin";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

const AdminDashboard = () => {
  const { adminUser, isAuthenticated, loading: authLoading } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [recentStudents, setRecentStudents] = useState<StudentData[]>([]);
  const [recentLogs, setRecentLogs] = useState<SystemLog[]>([]);

  useEffect(() => {
    console.log("AdminDashboard - Auth state:", { 
      isAuthenticated, 
      authLoading, 
      user: adminUser?.name, 
      role: adminUser?.role 
    });
  }, [isAuthenticated, authLoading, adminUser]);

  useEffect(() => {
    if (!authLoading && isAuthenticated && adminUser) {
      console.log("Admin authenticated, fetching dashboard data");
      fetchDashboardData();
    } else if (!authLoading && !isAuthenticated) {
      console.log("Not authenticated, redirecting to login");
      navigate('/admin/login');
    }
  }, [isAuthenticated, authLoading, adminUser, navigate]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      console.log("Fetching dashboard data...");
      const dashboardStats = await adminService.getDashboardStats();
      setStats(dashboardStats);
      
      const studentsRes = await adminService.getStudents(1, 5);
      setRecentStudents(studentsRes.data);
      
      const logsRes = await adminService.getSystemLogs('', 1, 5);
      setRecentLogs(logsRes.data);
      
      toast({
        title: "Dashboard Loaded",
        description: "Admin dashboard data has been loaded successfully"
      });
      console.log("Dashboard data loaded successfully");
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-t-indigo-500 border-indigo-200 rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-medium">Loading dashboard data...</h2>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const StatCard = ({ title, value, icon, trend = '', route = '' }) => (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => route && navigate(route)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h4 className="text-2xl font-bold mt-1">{value}</h4>
            {trend && (
              <p className="flex items-center text-xs mt-2 text-green-500">
                <ArrowUpRight className="mr-1" size={12} />
                {trend} from last week
              </p>
            )}
          </div>
          <div className="bg-indigo-100 p-3 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimeSince = (date: Date) => {
    const now = new Date().getTime();
    const past = new Date(date).getTime();
    const diff = now - past;
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">Welcome back, {adminUser?.name || 'Admin'}. Here's an overview of your system.</p>
      </div>
      
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Students" 
            value={stats.totalStudents} 
            icon={<Users size={24} className="text-indigo-500" />}
            trend="+5.2%"
            route="/admin/students"
          />
          <StatCard 
            title="Active Students" 
            value={stats.activeStudents} 
            icon={<Activity size={24} className="text-indigo-500" />}
            trend="+3.1%"
          />
          <StatCard 
            title="Content Items" 
            value={stats.totalQuestions + stats.totalConcepts + stats.totalFlashcards} 
            icon={<Book size={24} className="text-indigo-500" />}
            trend="+8.3%"
            route="/admin/content"
          />
          <StatCard 
            title="Avg. Mood Score" 
            value={stats.averageMoodScore.toFixed(1) + "/10"} 
            icon={<Brain size={24} className="text-indigo-500" />}
            trend="+0.7"
          />
        </div>
      )}
      
      <Tabs defaultValue="personalization" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="personalization" className="flex items-center gap-2">
            <Brain size={14} />
            <span>AI Personalization</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <FileText size={14} />
            <span>Content & Insights</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users size={14} />
            <span>Students</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Settings size={14} />
            <span>System & Logs</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="personalization">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Learning Style Detection</span>
                  <Button variant="outline" size="sm">Configure</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Learning Style Distribution</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-primary/10 p-3 rounded-md">
                        <span className="text-sm text-gray-600">Visual:</span>
                        <div className="flex items-center justify-between">
                          <span className="font-bold">42%</span>
                          <span className="text-xs text-green-600">+5%</span>
                        </div>
                      </div>
                      <div className="bg-primary/10 p-3 rounded-md">
                        <span className="text-sm text-gray-600">Auditory:</span>
                        <div className="flex items-center justify-between">
                          <span className="font-bold">28%</span>
                          <span className="text-xs text-red-600">-2%</span>
                        </div>
                      </div>
                      <div className="bg-primary/10 p-3 rounded-md">
                        <span className="text-sm text-gray-600">Reading:</span>
                        <div className="flex items-center justify-between">
                          <span className="font-bold">15%</span>
                          <span className="text-xs text-green-600">+1%</span>
                        </div>
                      </div>
                      <div className="bg-primary/10 p-3 rounded-md">
                        <span className="text-sm text-gray-600">Kinesthetic:</span>
                        <div className="flex items-center justify-between">
                          <span className="font-bold">15%</span>
                          <span className="text-xs text-red-600">-4%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm">View Clusters</Button>
                    <Button variant="outline" size="sm">Adjust Questions</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Adaptive Difficulty Engine</span>
                  <Button variant="outline" size="sm">Tune</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-medium">Current Model</h3>
                      <p className="text-sm text-gray-600 mt-1">GPT-4 + Reinforcement</p>
                      <div className="mt-2 text-sm">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Active</span>
                      </div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-medium">Performance</h3>
                      <p className="text-2xl font-bold text-primary mt-1">92%</p>
                      <p className="text-sm text-gray-600">Target accuracy</p>
                    </div>
                  </div>
                  <Button size="sm">Adjust Thresholds</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Study Plan Generator</span>
                  <Button variant="outline" size="sm">View Plans</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Plan Generation Stats</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-primary/10 p-3 rounded-md">
                        <span className="text-sm text-gray-600">Plans Generated:</span>
                        <p className="font-bold">845</p>
                      </div>
                      <div className="bg-primary/10 p-3 rounded-md">
                        <span className="text-sm text-gray-600">Adherence:</span>
                        <p className="font-bold">74%</p>
                      </div>
                      <div className="bg-primary/10 p-3 rounded-md">
                        <span className="text-sm text-gray-600">Modifications:</span>
                        <p className="font-bold">186</p>
                      </div>
                      <div className="bg-primary/10 p-3 rounded-md">
                        <span className="text-sm text-gray-600">Avg Rating:</span>
                        <p className="font-bold">4.2/5</p>
                      </div>
                    </div>
                  </div>
                  <Button size="sm">Adjust Plan Templates</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Feel-Good Corner</span>
                  <Button variant="outline" size="sm">Manage</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Content Engagement</h3>
                      <span className="text-sm text-green-600">+12% this week</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <div className="text-xl font-bold">285</div>
                        <div className="text-xs text-gray-600">Memes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">142</div>
                        <div className="text-xs text-gray-600">Puzzles</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">364</div>
                        <div className="text-xs text-gray-600">Jokes</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm">Upload Content</Button>
                    <Button variant="outline" size="sm">Review Flagged</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>AI Model Configuration</span>
                <Button variant="outline" size="sm">Advanced Settings</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">AI Module</th>
                      <th className="text-left py-3 px-4 font-medium">Current Model</th>
                      <th className="text-left py-3 px-4 font-medium">Accuracy</th>
                      <th className="text-left py-3 px-4 font-medium">Latency</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">Learning Style Detector</td>
                      <td className="py-3 px-4">GPT-4 + Custom Classifier</td>
                      <td className="py-3 px-4">92%</td>
                      <td className="py-3 px-4">1.2s</td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">Configure</Button>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">Study Planner</td>
                      <td className="py-3 px-4">GPT-4 + Scheduling Algorithm</td>
                      <td className="py-3 px-4">86%</td>
                      <td className="py-3 px-4">2.4s</td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">Configure</Button>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">Mood Analysis</td>
                      <td className="py-3 px-4">Sentiment Model v2</td>
                      <td className="py-3 px-4">78%</td>
                      <td className="py-3 px-4">0.8s</td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">Needs Tuning</span>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">Tune Model</Button>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">Doubt Resolver</td>
                      <td className="py-3 px-4">GPT-4 + KB Integration</td>
                      <td className="py-3 px-4">94%</td>
                      <td className="py-3 px-4">1.8s</td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">Configure</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <h3 className="text-xl font-bold">{stats?.totalConcepts || 0}</h3>
                    <p className="text-sm text-gray-500">Concept Cards</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <h3 className="text-xl font-bold">{stats?.totalFlashcards || 0}</h3>
                    <p className="text-sm text-gray-500">Flashcards</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <h3 className="text-xl font-bold">{stats?.totalQuestions || 0}</h3>
                    <p className="text-sm text-gray-500">Practice Questions</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <h3 className="text-xl font-bold">{Math.floor(Math.random() * 100) + 50}</h3>
                    <p className="text-sm text-gray-500">Full Exams</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-6" onClick={() => navigate('/admin/content')}>
                  Manage Content
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Generation Stats (Last 7 days)</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-primary/10 p-3 rounded-md">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">AI Generated:</span>
                          <span className="font-bold">1,245</span>
                        </div>
                      </div>
                      <div className="bg-primary/10 p-3 rounded-md">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Approved:</span>
                          <span className="font-bold">967</span>
                        </div>
                      </div>
                      <div className="bg-primary/10 p-3 rounded-md">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Pending Review:</span>
                          <span className="font-bold">85</span>
                        </div>
                      </div>
                      <div className="bg-primary/10 p-3 rounded-md">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Rejected:</span>
                          <span className="font-bold">193</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm">Review Pending</Button>
                    <Button variant="default" size="sm">Generate New</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>GPT Prompt Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Active Prompt Templates</h3>
                  <div className="space-y-3">
                    <div className="bg-primary/10 p-3 rounded-md">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Concept Card Creator</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        Create a concept card for {"{topic}"} targeted at {"{exam_type}"} students...
                      </p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-md">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Flashcard Generator</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        Create a set of flashcards about {"{topic}"} with {"{difficulty_level}"}...
                      </p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-md">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Question Builder</span>
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">Needs Review</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        Create a multiple-choice question about {"{topic}"} that tests {"{concept}"}...
                      </p>
                    </div>
                  </div>
                </div>
                <Button variant="default">Edit Prompt Templates</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recently Registered Students</span>
                <Button variant="outline" size="sm" onClick={() => navigate('/admin/students')}>
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Name</th>
                      <th className="text-left py-3 px-4 font-medium">Email</th>
                      <th className="text-left py-3 px-4 font-medium">Exam Type</th>
                      <th className="text-left py-3 px-4 font-medium">Registration Date</th>
                      <th className="text-left py-3 px-4 font-medium">Learning Style</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentStudents.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="py-3 px-4">{student.name}</td>
                        <td className="py-3 px-4">{student.email}</td>
                        <td className="py-3 px-4">{student.examType}</td>
                        <td className="py-3 px-4">{formatDate(student.registrationDate)}</td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {["Visual", "Auditory", "Reading", "Kinesthetic"][Math.floor(Math.random() * 4)]}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">View Profile</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Daily Active Users</h3>
                    <div className="h-32 bg-primary/10 rounded-md flex items-end justify-between px-4 pb-4">
                      {Array.from({length: 7}).map((_, i) => (
                        <div 
                          key={i} 
                          className="bg-primary w-6 rounded-t-sm" 
                          style={{height: `${Math.floor(Math.random() * 70) + 20}%`}}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-600">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">User Journey</h3>
                      <span className="text-xs text-primary">View Details</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 mt-2">
                      <div className="text-center p-2">
                        <div className="font-bold">{stats?.totalStudents || 0}</div>
                        <div className="text-xs text-gray-600">Total</div>
                      </div>
                      <div className="text-center p-2">
                        <div className="font-bold">{stats?.activeStudents || 0}</div>
                        <div className="text-xs text-gray-600">Active</div>
                      </div>
                      <div className="text-center p-2">
                        <div className="font-bold">{Math.floor((stats?.activeStudents || 0) * 0.8)}</div>
                        <div className="text-xs text-gray-600">Engaged</div>
                      </div>
                      <div className="text-center p-2">
                        <div className="font-bold">{Math.floor((stats?.activeStudents || 0) * 0.2)}</div>
                        <div className="text-xs text-gray-600">At Risk</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emotional Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Mood Distribution</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-green-100 p-3 rounded-md text-center">
                        <div className="text-lg font-bold text-green-700">42%</div>
                        <div className="text-xs text-green-700">Positive</div>
                      </div>
                      <div className="bg-amber-100 p-3 rounded-md text-center">
                        <div className="text-lg font-bold text-amber-700">45%</div>
                        <div className="text-xs text-amber-700">Neutral</div>
                      </div>
                      <div className="bg-red-100 p-3 rounded-md text-center">
                        <div className="text-lg font-bold text-red-700">13%</div>
                        <div className="text-xs text-red-700">Stressed</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Flagged Students</h3>
                    <div className="space-y-2">
                      <div className="bg-red-50 p-2 rounded-md flex items-center justify-between">
                        <div>
                          <span className="font-medium">Aryan Sharma</span>
                          <p className="text-xs text-gray-600">High stress for 5 days</p>
                        </div>
                        <Button variant="outline" size="sm" className="h-8">View</Button>
                      </div>
                      <div className="bg-red-50 p-2 rounded-md flex items-center justify-between">
                        <div>
                          <span className="font-medium">Priya Patel</span>
                          <p className="text-xs text-gray-600">Mood dropped by 40%</p>
                        </div>
                        <Button variant="outline" size="sm" className="h-8">View</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>System Logs</span>
                <Button variant="outline" size="sm">View All Logs</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Time</th>
                      <th className="text-left py-3 px-4 font-medium">Source</th>
                      <th className="text-left py-3 px-4 font-medium">Level</th>
                      <th className="text-left py-3 px-4 font-medium">Message</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLogs.map((log) => (
                      <tr key={log.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="py-3 px-4">{getTimeSince(log.timestamp)}</td>
                        <td className="py-3 px-4">{log.source}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 rounded text-xs ${
                            log.level === 'error' 
                              ? "bg-red-100 text-red-800" 
                              : log.level === 'warning'
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                          }`}>
                            {log.level.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-4">{log.message}</td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>API Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">API Latency (ms)</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="w-24 text-sm">/api/planner</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                          <div className="h-2 bg-green-500 rounded-full" style={{width: '15%'}}></div>
                        </div>
                        <span className="text-sm">156</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-24 text-sm">/api/doubts</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                          <div className="h-2 bg-amber-500 rounded-full" style={{width: '45%'}}></div>
                        </div>
                        <span className="text-sm">876</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-24 text-sm">/api/content</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                          <div className="h-2 bg-green-500 rounded-full" style={{width: '10%'}}></div>
                        </div>
                        <span className="text-sm">125</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-24 text-sm">/api/chat</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                          <div className="h-2 bg-amber-500 rounded-full" style={{width: '38%'}}></div>
                        </div>
                        <span className="text-sm">742</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h3 className="font-medium text-sm">Success Rate</h3>
                      <p className="text-2xl font-bold text-green-600">99.2%</p>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h3 className="font-medium text-sm">Avg Response</h3>
                      <p className="text-2xl font-bold">321ms</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>API Key Management</span>
                  <Button variant="outline" size="sm">Rotate Keys</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">OpenAI API Key</h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="password" 
                        className="flex-1 bg-muted border border-muted rounded p-2" 
                        value="••••••••••••••••••••••••••"
                        disabled
                      />
                      <Button variant="ghost" size="sm" className="ml-2">
                        <Eye size={16} />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h3 className="font-medium text-sm">Today's Usage</h3>
                      <p className="text-xl font-bold">$12.45</p>
                      <p className="text-xs text-gray-600">132,450 tokens</p>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h3 className="font-medium text-sm">Monthly Usage</h3>
                      <p className="text-xl font-bold">$254.67</p>
                      <p className="text-xs text-gray-600">42.6% of budget</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Notification System</span>
                <Button variant="outline" size="sm">Configure</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Active Notifications</h3>
                  <div className="space-y-2">
                    <div className="bg-primary/10 p-2 rounded-md flex justify-between">
                      <span className="text-sm">Study Reminder</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 rounded-full">Active</span>
                    </div>
                    <div className="bg-primary/10 p-2 rounded-md flex justify-between">
                      <span className="text-sm">Concept Review</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 rounded-full">Active</span>
                    </div>
                    <div className="bg-primary/10 p-2 rounded-md flex justify-between">
                      <span className="text-sm">Exam Alert</span>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 rounded-full">Paused</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Notification Stats</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Sent (24h):</span>
                      <span className="font-medium">1,245</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Open Rate:</span>
                      <span className="font-medium">76%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Action Rate:</span>
                      <span className="font-medium">42%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Upcoming Broadcasts</h3>
                  <div className="space-y-2">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">New Feature Alert</span>
                        <span className="text-xs text-gray-600">Today</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Scheduled for 3:00 PM</p>
                    </div>
                    <div className="bg-primary/10 p-2 rounded-md">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Weekly Summary</span>
                        <span className="text-xs text-gray-600">Tomorrow</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Scheduled for 9:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminDashboard;
