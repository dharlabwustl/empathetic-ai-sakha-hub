
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Calendar, 
  LineChart, 
  User, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  userType: string;
  userName?: string;
}

const SidebarNav = ({ userType, userName = "User" }: SidebarNavProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const userTypeRoutes = {
    student: [
      { name: "Dashboard", path: "/dashboard/student", icon: <LayoutDashboard size={20} /> },
      { name: "24/7 Tutor", path: "/dashboard/student/tutor", icon: <MessageSquare size={20} /> },
      { name: "Study Planner", path: "/dashboard/student/planner", icon: <Calendar size={20} /> },
      { name: "Progress", path: "/dashboard/student/progress", icon: <LineChart size={20} /> }
    ],
    employee: [
      { name: "Dashboard", path: "/dashboard/employee", icon: <LayoutDashboard size={20} /> },
      { name: "Job Advisor", path: "/dashboard/employee/advisor", icon: <MessageSquare size={20} /> },
      { name: "Productivity", path: "/dashboard/employee/productivity", icon: <LineChart size={20} /> },
      { name: "Training", path: "/dashboard/employee/training", icon: <Calendar size={20} /> }
    ],
    doctor: [
      { name: "Dashboard", path: "/dashboard/doctor", icon: <LayoutDashboard size={20} /> },
      { name: "Research Hub", path: "/dashboard/doctor/research", icon: <MessageSquare size={20} /> },
      { name: "Thesis Planner", path: "/dashboard/doctor/thesis", icon: <Calendar size={20} /> },
      { name: "Publications", path: "/dashboard/doctor/publications", icon: <LineChart size={20} /> }
    ],
    founder: [
      { name: "Dashboard", path: "/dashboard/founder", icon: <LayoutDashboard size={20} /> },
      { name: "Startup Advisor", path: "/dashboard/founder/advisor", icon: <MessageSquare size={20} /> },
      { name: "MVP Builder", path: "/dashboard/founder/mvp", icon: <Calendar size={20} /> },
      { name: "Metrics", path: "/dashboard/founder/metrics", icon: <LineChart size={20} /> }
    ]
  };
  
  const routes = userTypeRoutes[userType as keyof typeof userTypeRoutes] || userTypeRoutes.student;
  
  const commonRoutes = [
    { name: "Profile", path: "/dashboard/profile", icon: <User size={20} /> },
    { name: "Settings", path: "/dashboard/settings", icon: <Settings size={20} /> }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <Button 
        variant="outline" 
        size="icon" 
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu size={20} />
      </Button>
      
      {/* Sidebar Overlay for Mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40 transition-all duration-300 flex flex-col",
          collapsed ? "w-20" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className={cn("flex items-center gap-2", collapsed && "justify-center")}>
            <img 
              src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
              alt="Sakha AI Logo" 
              className="w-10 h-10"
            />
            {!collapsed && <span className="font-display font-semibold gradient-text">Sakha AI</span>}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <div className={cn("px-4 mb-6", collapsed && "text-center")}>
            <div className="flex items-center justify-center mb-2">
              <div className="w-12 h-12 rounded-full bg-sakha-blue/20 flex items-center justify-center text-sakha-blue">
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>
            {!collapsed && (
              <div className="text-center">
                <p className="font-medium">{userName}</p>
                <p className="text-xs text-gray-500 capitalize">{userType}</p>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <nav className="space-y-1 px-2">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    location.pathname === route.path
                      ? "bg-sakha-blue text-white"
                      : "hover:bg-gray-100",
                    collapsed && "justify-center"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{route.icon}</span>
                  {!collapsed && <span>{route.name}</span>}
                </Link>
              ))}
            </nav>
            
            <div className="px-2 pt-4 border-t border-gray-200">
              <nav className="space-y-1">
                {commonRoutes.map((route) => (
                  <Link
                    key={route.path}
                    to={route.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                      location.pathname === route.path
                        ? "bg-sakha-blue text-white"
                        : "hover:bg-gray-100",
                      collapsed && "justify-center"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{route.icon}</span>
                    {!collapsed && <span>{route.name}</span>}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <Button 
            variant="ghost" 
            className={cn(
              "flex items-center gap-2 w-full hover:bg-red-50 hover:text-red-600",
              collapsed && "justify-center"
            )}
            asChild
          >
            <Link to="/login">
              <LogOut size={20} />
              {!collapsed && <span>Logout</span>}
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default SidebarNav;
