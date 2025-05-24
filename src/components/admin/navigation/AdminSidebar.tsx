
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  LayoutDashboard, Users, BookOpen, CreditCard, BarChart3, Database, 
  Shield, Activity, Settings, FileText, Brain, MessageSquare, 
  Video, Folder, Bell, LogOut, Home, Calendar, LineChart,
  TrendingUp, UserCheck, Zap, Cpu, Globe, Lock, Heart,
  Target, Award, HelpCircle, Smartphone, Puzzle, Upload
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
        { icon: <Users size={20} />, title: "Batch Management", path: "/admin/dashboard", tab: "batch-management" },
        { icon: <Heart size={20} />, title: "Mood Analytics", path: "/admin/dashboard", tab: "mood-analytics" }
      ]
    },
    { 
      section: "Content & Curriculum",
      items: [
        { icon: <BookOpen size={20} />, title: "Content Library", path: "/admin/dashboard", tab: "content" },
        { icon: <Upload size={20} />, title: "Enhanced CMS", path: "/admin/dashboard", tab: "enhanced-content" },
        { icon: <Brain size={20} />, title: "AI Models", path: "/admin/dashboard", tab: "ai-models" },
        { icon: <FileText size={20} />, title: "Exam Management", path: "/admin/dashboard", tab: "exams" },
        { icon: <Target size={20} />, title: "Study Plans", path: "/admin/dashboard", tab: "study-plan-management" }
      ]
    },
    { 
      section: "AI & Personalization",
      items: [
        { icon: <Brain size={20} />, title: "AI Features", path: "/admin/dashboard", tab: "ai-features" },
        { icon: <Puzzle size={20} />, title: "Personalization", path: "/admin/dashboard", tab: "personalization-control" },
        { icon: <Zap size={20} />, title: "Feature Management", path: "/admin/dashboard", tab: "features" }
      ]
    },
    { 
      section: "Communication & Engagement",
      items: [
        { icon: <MessageSquare size={20} />, title: "Communications", path: "/admin/dashboard", tab: "communication-management" },
        { icon: <Bell size={20} />, title: "Notifications", path: "/admin/dashboard", tab: "notifications" },
        { icon: <Award size={20} />, title: "Gamification", path: "/admin/dashboard", tab: "gamification-management" }
      ]
    },
    { 
      section: "Subscriptions & Revenue",
      items: [
        { icon: <CreditCard size={20} />, title: "Subscription Plans", path: "/admin/dashboard", tab: "subscriptions" },
        { icon: <LineChart size={20} />, title: "Revenue Analytics", path: "/admin/dashboard", tab: "revenue" }
      ]
    },
    { 
      section: "Support & Analytics",
      items: [
        { icon: <HelpCircle size={20} />, title: "Support System", path: "/admin/dashboard", tab: "support-management" },
        { icon: <BarChart3 size={20} />, title: "Advanced Analytics", path: "/admin/dashboard", tab: "advanced-analytics" },
        { icon: <TrendingUp size={20} />, title: "User Journey", path: "/admin/dashboard", tab: "user-journey" }
      ]
    },
    { 
      section: "System & Technical",
      items: [
        { icon: <Database size={20} />, title: "Database Management", path: "/admin/dashboard", tab: "database" },
        { icon: <Cpu size={20} />, title: "API Management", path: "/admin/dashboard", tab: "api" },
        { icon: <Shield size={20} />, title: "Security", path: "/admin/dashboard", tab: "security" },
        { icon: <Activity size={20} />, title: "System Logs", path: "/admin/dashboard", tab: "logs" },
        { icon: <Smartphone size={20} />, title: "Mobile Management", path: "/admin/dashboard", tab: "mobile-management" }
      ]
    },
    { 
      section: "Configuration",
      items: [
        { icon: <Settings size={20} />, title: "System Settings", path: "/admin/dashboard", tab: "settings" },
        { icon: <Globe size={20} />, title: "Integrations", path: "/admin/dashboard", tab: "integration-management" },
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
        <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive Dashboard</p>
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
