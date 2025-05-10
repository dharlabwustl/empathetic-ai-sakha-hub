
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { 
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
  Bell, 
  LogOut, 
  Smile, 
  Calculator,
  Settings,
  User,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface UnifiedSidebarProps {
  userType?: string;
  userName?: string;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const UnifiedSidebar: React.FC<UnifiedSidebarProps> = ({
  userType = "student",
  userName,
  activeTab = "overview",
  onTabChange,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  
  const handleTabChange = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
    
    switch (tab) {
      case 'syllabus':
        navigate('/dashboard/student/syllabus');
        break;
      case 'previous-year-analysis':
        navigate('/dashboard/student/previous-year-analysis');
        break;
      case 'formula-practice-lab':
        navigate('/dashboard/student/formula-practice-lab');
        break;
      case 'profile':
        navigate('/dashboard/student/profile');
        break;
      case 'settings':
        navigate('/dashboard/student/settings');
        break;
      case 'logout':
        navigate('/login');
        break;
      default:
        navigate(`/dashboard/student/${tab}`);
        break;
    }
  };

  const navItems = [
    { icon: <Home size={20} />, title: "Dashboard", tab: "overview", tooltip: "Dashboard overview with your daily progress" },
    { icon: <Calendar size={20} />, title: "Today's Plan", tab: "today", tooltip: "View your tasks and schedule for today" },
    { icon: <BookMarked size={20} />, title: "Academic Advisor", tab: "academic", tooltip: "Get personalized academic guidance" },
    { icon: <MessageSquare size={20} />, title: "24/7 AI Tutor", tab: "tutor", tooltip: "Access your AI tutor anytime" },
    { icon: <Brain size={20} />, title: "Flashcards", tab: "flashcards", tooltip: "Study with interactive flashcards" },
    { icon: <BookOpen size={20} />, title: "Practice Exams", tab: "exams", tooltip: "Test your knowledge with practice exams" },
    { icon: <Calculator size={20} />, title: "Formula Practice Lab", tab: "formula-practice-lab", tooltip: "Practice with formulas and calculations" },
    { icon: <LineChart size={20} />, title: "Progress", tab: "progress", tooltip: "Track your learning progress" },
    { icon: <Activity size={20} />, title: "Motivation", tab: "motivation", tooltip: "Stay motivated with achievement tracking" },
    { icon: <Heart size={20} />, title: "Mental Health", tab: "wellness", tooltip: "Tools for mental well-being" },
    { icon: <Smile size={20} />, title: "Feel Good Corner", tab: "feel-good-corner", tooltip: "Take a break and boost your mood" },
    { icon: <Folder size={20} />, title: "Materials", tab: "materials", tooltip: "Access your study materials" },
    { icon: <Video size={20} />, title: "Videos", tab: "videos", tooltip: "Watch educational videos" },
    { icon: <Users size={20} />, title: "Study Groups", tab: "forum", tooltip: "Connect with study groups" },
    { icon: <Bell size={20} />, title: "Notifications", tab: "notifications", tooltip: "View your notifications" },
  ];

  const userSettings = [
    { icon: <User size={20} />, title: "Profile", tab: "profile", tooltip: "View and edit your profile" },
    { icon: <Settings size={20} />, title: "Settings", tab: "settings", tooltip: "Manage your account settings" },
  ];

  return (
    <Sidebar side="left" variant="inset">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="p-4">
          <div className="text-lg font-semibold">PREPZR</div>
          <div className="text-xs text-muted-foreground">
            {userName ? `Welcome, ${userName}` : 'Student Dashboard'}
          </div>
        </div>
        <div className="flex justify-end px-2">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.tab}>
                <SidebarMenuButton 
                  isActive={activeTab === item.tab}
                  onClick={() => handleTabChange(item.tab)}
                  tooltip={item.tooltip}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>User Settings</SidebarGroupLabel>
          <SidebarMenu>
            {userSettings.map((item) => (
              <SidebarMenuItem key={item.tab}>
                <SidebarMenuButton 
                  isActive={activeTab === item.tab}
                  onClick={() => handleTabChange(item.tab)}
                  tooltip={item.tooltip}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-4">
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={() => handleTabChange('logout')}
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default UnifiedSidebar;
