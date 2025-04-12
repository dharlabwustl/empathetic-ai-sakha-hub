
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  Database,
  BarChart,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Brain,
  MessageSquare,
  CreditCard,
  AlertCircle,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { adminUser, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleNavClick = (path: string, name: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
    
    toast({
      title: `Navigating to ${name}`,
      description: `Opening ${name} section`,
      variant: "default"
    });
  };

  const navItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: <LayoutDashboard size={20} />
    },
    {
      name: 'User Management',
      path: '/admin/students',
      icon: <Users size={20} />
    },
    {
      name: 'AI Personalization',
      path: '/admin/ai',
      icon: <Brain size={20} />
    },
    {
      name: 'Content Management',
      path: '/admin/content',
      icon: <FileText size={20} />
    },
    {
      name: 'Engagement',
      path: '/admin/engagement',
      icon: <MessageSquare size={20} />
    },
    {
      name: 'Subscriptions',
      path: '/admin/subscriptions',
      icon: <CreditCard size={20} />
    },
    {
      name: 'System Monitoring',
      path: '/admin/system',
      icon: <Database size={20} />
    },
    {
      name: 'Analytics',
      path: '/admin/analytics',
      icon: <BarChart size={20} />
    },
    {
      name: 'Issue Resolution',
      path: '/admin/issues',
      icon: <AlertCircle size={20} />
    },
    {
      name: 'Notifications',
      path: '/admin/notifications',
      icon: <Bell size={20} />
    },
    {
      name: 'Documentation',
      path: '/admin/documentation',
      icon: <FileText size={20} />
    },
    {
      name: 'Settings',
      path: '/admin/settings',
      icon: <Settings size={20} />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50">
      {/* Mobile Menu Button */}
      <Button 
        variant="outline" 
        size="icon" 
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>
      
      {/* Sidebar Overlay for Mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
      
      {/* Admin Sidebar */}
      <div 
        className={cn(
          "fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40 transition-all duration-300 flex flex-col",
          collapsed ? "w-20" : "w-64",
          isMobile ? (mobileOpen ? "translate-x-0" : "-translate-x-full") : "md:translate-x-0"
        )}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className={cn("flex items-center gap-2", collapsed && "justify-center")}>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full relative overflow-hidden">
              <img 
                src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
                alt="Sakha AI Logo" 
                className="w-10 h-10"
              />
            </div>
            {!collapsed && <span className="font-display font-semibold text-lg">Admin Panel</span>}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileOpen(false)}
            >
              <X size={18} />
            </Button>
          )}
        </div>
        
        {/* Admin Profile */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-start gap-3")}>
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                {adminUser?.name?.charAt(0) || 'A'}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div>
                <p className="font-medium line-clamp-1">{adminUser?.name || 'Admin User'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{adminUser?.role || 'Administrator'}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-2">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors justify-start",
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
                  collapsed && "justify-center"
                )}
                onClick={() => handleNavClick(item.path, item.name)}
              >
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
              </Button>
            ))}
          </nav>
        </div>
        
        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon"
              className="text-gray-500 hover:text-red-500"
              onClick={handleLogout}
            >
              <LogOut size={18} />
            </Button>
          </div>
          {!collapsed && (
            <Button 
              variant="ghost" 
              className="w-full text-gray-500 hover:text-red-500 flex items-center gap-2 justify-start"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </Button>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <main className={cn(
        "transition-all duration-300",
        isMobile ? "p-4 pt-16" : "p-6",
        collapsed ? "md:ml-20" : "md:ml-64"
      )}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
