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
  AlertCircle
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

  const StatCard = ({ title, value, icon, trend = '' }) => (
    <Card>
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
          />
          <StatCard 
            title="Active Students" 
            value={stats.activeStudents} 
            icon={<Activity size={24} className="text-indigo-500" />}
            trend="+3.1%"
          />
          <StatCard 
            title="New Signups Today" 
            value={stats.newSignupsToday} 
            icon={<TrendingUp size={24} className="text-indigo-500" />}
            trend="+12.5%"
          />
          <StatCard 
            title="Total Engagement Hours" 
            value={stats.totalEngagementHours} 
            icon={<Clock size={24} className="text-indigo-500" />}
            trend="+8.7%"
          />
        </div>
      )}
      
      <Tabs defaultValue="students" className="space-y-6">
        <TabsList>
          <TabsTrigger value="students" className="flex items-center gap-2">
            <Users size={14} />
            <span>Recent Students</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <FileText size={14} />
            <span>Content Stats</span>
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <AlertCircle size={14} />
            <span>System Logs</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="students">
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
                      <th className="text-left py-3 px-4 font-medium">Onboarding</th>
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
                          <span className={`inline-block px-2 py-1 rounded text-xs ${
                            student.completedOnboarding 
                              ? "bg-green-100 text-green-800" 
                              : "bg-amber-100 text-amber-800"
                          }`}>
                            {student.completedOnboarding ? "Completed" : "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold">{stats?.totalConcepts || 0}</h3>
                    <p className="text-sm text-gray-500">Total Concept Cards</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold">{stats?.totalFlashcards || 0}</h3>
                    <p className="text-sm text-gray-500">Total Flashcards</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold">{stats?.totalQuestions || 0}</h3>
                    <p className="text-sm text-gray-500">Practice Questions</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold">{Math.floor((stats?.averageMoodScore || 0) * 10) / 10}/10</h3>
                    <p className="text-sm text-gray-500">Avg. Mood Score</p>
                  </CardContent>
                </Card>
              </div>
              <Button variant="outline" size="sm" className="mt-6" onClick={() => navigate('/admin/content')}>
                Manage Content
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent System Logs</span>
                <Button variant="outline" size="sm" onClick={() => navigate('/admin/logs')}>
                  View All Logs
                </Button>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminDashboard;
