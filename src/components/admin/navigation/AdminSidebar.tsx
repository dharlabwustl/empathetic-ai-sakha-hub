
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  LayoutDashboard, Users, BookOpen, CreditCard, BarChart3, Database, 
  Shield, Activity, Settings, FileText, Brain, MessageSquare, 
  Video, Folder, Bell, LogOut, Home, Calendar, LineChart,
  TrendingUp, UserCheck, Zap, Cpu, Globe, Lock
} from 'lucide-react';
import { useAdminAuth } from '@/contexts/auth/AdminAuthContext';

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { adminLogout } = useAdminAuth();

  const navigationItems = [
    { 
      section: "Dashboard",
      items: [
        { icon: <LayoutDashboard size={20} />, title: "Overview", path: "/admin/dashboard", tab: "overview" },
        { icon: <BarChart3 size={20} />, title: "Analytics", path: "/admin/dashboard", tab: "analytics" },
        { icon: <TrendingUp size={20} />, title: "Reports", path: "/admin/dashboard", tab: "reports" }
      ]
    },
    { 
      section: "User Management",
      items: [
        { icon: <Users size={20} />, title: "All Users", path: "/admin/dashboard", tab: "users" },
        { icon: <UserCheck size={20} />, title: "Student Profiles", path: "/admin/dashboard", tab: "student-profiles" },
        { icon: <Calendar size={20} />, title: "User Activity", path: "/admin/dashboard", tab: "user-activity" }
      ]
    },
    { 
      section: "Content & Curriculum",
      items: [
        { icon: <BookOpen size={20} />, title: "Content Library", path: "/admin/dashboard", tab: "content" },
        { icon: <Brain size={20} />, title: "AI Models", path: "/admin/dashboard", tab: "ai-models" },
        { icon: <FileText size={20} />, title: "Exam Management", path: "/admin/dashboard", tab: "exams" },
        { icon: <Video size={20} />, title: "Video Content", path: "/admin/dashboard", tab: "videos" }
      ]
    },
    { 
      section: "Subscriptions & Plans",
      items: [
        { icon: <CreditCard size={20} />, title: "Subscription Plans", path: "/admin/dashboard", tab: "subscriptions" },
        { icon: <Zap size={20} />, title: "Feature Management", path: "/admin/dashboard", tab: "features" },
        { icon: <LineChart size={20} />, title: "Revenue Analytics", path: "/admin/dashboard", tab: "revenue" }
      ]
    },
    { 
      section: "System & Technical",
      items: [
        { icon: <Database size={20} />, title: "Database Management", path: "/admin/dashboard", tab: "database" },
        { icon: <Cpu size={20} />, title: "API Management", path: "/admin/dashboard", tab: "api" },
        { icon: <Shield size={20} />, title: "Security", path: "/admin/dashboard", tab: "security" },
        { icon: <Activity size={20} />, title: "System Logs", path: "/admin/dashboard", tab: "logs" }
      ]
    },
    { 
      section: "Configuration",
      items: [
        { icon: <Settings size={20} />, title: "System Settings", path: "/admin/dashboard", tab: "settings" },
        { icon: <Globe size={20} />, title: "Documentation", path: "/admin/documentation" },
        { icon: <Lock size={20} />, title: "Access Control", path: "/admin/dashboard", tab: "access-control" }
      ]
    }
  ];

  const handleNavigation = (path: string, tab?: string) => {
    if (tab) {
      navigate(`${path}?tab=${tab}`);
    } else {
      navigate(path);
    }
  };

  const handleLogout = async () => {
    await adminLogout();
    navigate('/admin/login');
  };

  const isActive = (path: string, tab?: string) => {
    if (tab) {
      const urlParams = new URLSearchParams(location.search);
      return location.pathname === path && urlParams.get('tab') === tab;
    }
    return location.pathname === path;
  };

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">PREPZR Admin</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Administrative Dashboard</p>
      </div>

      <div className="p-4 space-y-6">
        {navigationItems.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {section.section}
            </h3>
            <div className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <Button
                  key={itemIndex}
                  variant={isActive(item.path, item.tab) ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 h-10 ${
                    isActive(item.path, item.tab) 
                      ? "bg-blue-600 text-white hover:bg-blue-700" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => handleNavigation(item.path, item.tab)}
                >
                  {item.icon}
                  <span className="text-sm">{item.title}</span>
                </Button>
              ))}
            </div>
            {sectionIndex < navigationItems.length - 1 && (
              <Separator className="mt-4" />
            )}
          </div>
        ))}

        <Separator className="my-4" />
        
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-10 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span className="text-sm">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
