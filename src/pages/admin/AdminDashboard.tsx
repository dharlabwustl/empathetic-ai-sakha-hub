
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { adminService } from "@/services/adminService";
import { AdminDashboardStats, StudentData, SystemLog } from "@/types/admin";
import { Sparkles, RefreshCcw, Download, FileText } from "lucide-react";

import AdminLayout from "@/components/admin/AdminLayout";
import DashboardStats from "@/components/admin/dashboard/DashboardStats";
import DashboardTabs from "@/components/admin/dashboard/DashboardTabs";
import LoadingState from "@/components/admin/dashboard/LoadingState";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { adminUser, isAuthenticated, loading: authLoading } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [recentStudents, setRecentStudents] = useState<StudentData[]>([]);
  const [recentLogs, setRecentLogs] = useState<SystemLog[]>([]);
  const [activeTab, setActiveTab] = useState("overview");

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

  const handleRefresh = () => {
    fetchDashboardData();
    toast({
      title: "Refreshing Data",
      description: "Fetching the latest dashboard information"
    });
  };

  const handleShowDocs = () => {
    navigate("/admin/documentation");
  };

  const handleOptimizeSystem = () => {
    toast({
      title: "System Optimization",
      description: "System optimization process started. This may take a few minutes."
    });
    
    // Simulate optimization process
    setTimeout(() => {
      toast({
        title: "Optimization Complete",
        description: "System has been successfully optimized.",
        variant: "success"
      });
    }, 3000);
  };

  const handleExportData = () => {
    toast({
      title: "Exporting Data",
      description: "Dashboard data export initiated."
    });
    
    // Simulate file download
    setTimeout(() => {
      const element = document.createElement("a");
      const file = new Blob([JSON.stringify(stats, null, 2)], {type: "application/json"});
      element.href = URL.createObjectURL(file);
      element.download = "admin-dashboard-data.json";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      toast({
        title: "Export Complete",
        description: "Dashboard data has been exported successfully."
      });
    }, 1000);
  };

  if (authLoading || loading) {
    return (
      <AdminLayout>
        <LoadingState />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Welcome back, {adminUser?.name || 'Admin'}. Here's an overview of your system.
          </p>
        </div>
        
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button variant="outline" size="sm" onClick={handleRefresh} className="flex items-center gap-2">
            <RefreshCcw size={16} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          
          <Button variant="outline" size="sm" onClick={handleExportData} className="flex items-center gap-2">
            <Download size={16} />
            <span className="hidden sm:inline">Export</span>
          </Button>
          
          <Button variant="outline" size="sm" onClick={handleShowDocs} className="flex items-center gap-2">
            <FileText size={16} />
            <span className="hidden sm:inline">Documentation</span>
          </Button>
          
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center gap-2"
            onClick={handleOptimizeSystem}
          >
            <Sparkles size={16} />
            <span className="hidden sm:inline">Optimize System</span>
          </Button>
        </div>
      </div>
      
      {stats && <DashboardStats stats={stats} />}
      
      <DashboardTabs 
        stats={stats} 
        recentStudents={recentStudents}
        recentLogs={recentLogs}
      />
    </AdminLayout>
  );
};

export default AdminDashboard;
