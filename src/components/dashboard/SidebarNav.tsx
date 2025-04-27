
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Home,
  Calendar,
  BookMarked,
  MessageSquare,
  Brain,
  BookOpen,
  LineChart, 
  Activity,
  Heart,
  Folder,
  Video,
  Users,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarAvatar } from "./SidebarAvatar";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarNavProps {
  userType: string;
  userName?: string;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const SidebarNav = ({ 
  userType, 
  userName = "User",
  activeTab,
  onTabChange
}: SidebarNavProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const navItems = [
    { icon: <Home size={20} />, title: "Dashboard", tab: "overview" },
    { icon: <Calendar size={20} />, title: "Today's Plan", tab: "today" },
    { icon: <BookMarked size={20} />, title: "Academic Advisor", tab: "academic" },
    { icon: <Brain size={20} />, title: "Concept Cards", tab: "concepts" },
    { icon: <BookOpen size={20} />, title: "Flashcards", tab: "flashcards" },
    { icon: <LineChart size={20} />, title: "Practice Exams", tab: "practice-exam" },
    { icon: <Bell size={20} />, title: "Notifications", tab: "notifications" }
  ];

  const handleTabChange = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
    setMobileOpen(false);
    navigate(`/dashboard/student/${tab}`);
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="icon" 
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>
      
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
      
      <div 
        className={cn(
          "fixed top-0 left-0 h-full bg-sidebar dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-800 border-r border-sidebar-border z-40 transition-all duration-300 flex flex-col",
          collapsed ? "w-20" : "w-64",
          isMobile ? (mobileOpen ? "translate-x-0" : "-translate-x-full") : "md:translate-x-0"
        )}
      >
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          <div className={cn("flex items-center gap-2", collapsed && "justify-center")}>
            <div className="avatar-eyes w-10 h-10 bg-gradient-to-br from-sky-400 to-violet-500 rounded-full relative overflow-hidden animate-glow">
              <img 
                src="/lovable-uploads/fdc1cebd-e35f-4f08-a45b-e839964fd590.png" 
                alt="Sakha AI Logo" 
                className="w-10 h-10"
              />
            </div>
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
        
        <div className="flex-1 overflow-y-auto py-4">
          <SidebarAvatar 
            userName={userName} 
            userType={userType} 
            collapsed={collapsed} 
          />
          
          {/* Main navigation items */}
          <div className="px-3 py-2">
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.tab}
                  onClick={() => handleTabChange(item.tab)}
                  className={`w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all ${
                    activeTab === item.tab
                      ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-sm"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapsed && <span>{item.title}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center justify-between mb-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon"
              className="text-muted-foreground hover:text-destructive"
              asChild
            >
              <Link to="/login">
                <LogOut size={18} />
              </Link>
            </Button>
          </div>
          {!collapsed && (
            <Button 
              variant="ghost" 
              className="w-full text-muted-foreground hover:text-destructive flex items-center gap-2"
              asChild
            >
              <Link to="/login">
                <LogOut size={18} />
                <span>Logout</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default SidebarNav;
