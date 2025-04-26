
import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import SidebarNavigation from './SidebarNavigation';
import MobileNavigation from './MobileNavigation';
import { Card } from '@/components/ui/card';
import { MoodType, UserProfileType } from '@/types/user/base';
import { useToast } from '@/hooks/use-toast';

interface DashboardLayoutProps {
  userProfile: UserProfileType;
  hideSidebar: boolean;
  hideTabsNav: boolean;
  activeTab: string;
  kpis: any[];
  nudges: any[];
  markNudgeAsRead: (id: string) => void;
  showWelcomeTour: boolean;
  onTabChange: (tab: string) => void;
  onViewStudyPlan: () => void;
  onToggleSidebar: () => void;
  onToggleTabsNav: () => void;
  onSkipTour: () => void;
  onCompleteTour: () => void;
  showStudyPlan: boolean;
  onCloseStudyPlan: () => void;
  lastActivity: any;
  suggestedNextAction: string | null;
  currentMood?: MoodType;
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  userProfile,
  hideSidebar,
  hideTabsNav,
  activeTab,
  kpis,
  nudges,
  markNudgeAsRead,
  showWelcomeTour,
  onTabChange,
  onViewStudyPlan,
  onToggleSidebar,
  onToggleTabsNav,
  onSkipTour,
  onCompleteTour,
  showStudyPlan,
  onCloseStudyPlan,
  lastActivity,
  suggestedNextAction,
  currentMood,
  children
}) => {
  const [localMood, setLocalMood] = useState<MoodType | undefined>(currentMood);
  const { toast } = useToast();

  // Format time greeting
  const now = new Date();
  const hour = now.getHours();
  let formattedTime = "";
  
  if (hour < 12) formattedTime = "Good Morning";
  else if (hour < 17) formattedTime = "Good Afternoon";
  else formattedTime = "Good Evening";
  
  // Format date
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = new Date().toLocaleDateString(undefined, options);

  const handleMoodChange = (mood: MoodType) => {
    setLocalMood(mood);
    
    // Save mood to localStorage
    const userData = localStorage.getItem("userData") ? 
      JSON.parse(localStorage.getItem("userData")!) : {};
    
    userData.mood = mood;
    userData.lastMoodTimestamp = new Date().toISOString();
    localStorage.setItem("userData", JSON.stringify(userData));
    
    // Show smart suggestion based on mood
    showSmartSuggestion(mood);
    
    toast({
      title: "Mood updated",
      description: `We'll adapt your learning experience based on your mood.`
    });
  };
  
  const showSmartSuggestion = (mood: MoodType) => {
    // Simple rule-based suggestions based on mood
    let suggestion = "";
    
    switch(mood) {
      case "happy":
        suggestion = "Great mood! How about tackling some challenging practice problems?";
        break;
      case "motivated":
        suggestion = "You're on fire! Let's work on your weekly goals.";
        break;
      case "focused":
        suggestion = "Excellent focus! Time to dive deep into a complex concept.";
        break;
      case "curious":
        suggestion = "Curious minds learn best! Discover a new topic today.";
        break;
      case "neutral":
        suggestion = "Ready for a balanced study session? Mix review and new concepts.";
        break;
      case "tired":
        suggestion = "Feeling tired? Try a quick 5-minute break or a lighter topic.";
        break;
      case "stressed":
        suggestion = "Stress can be managed! Try a breathing exercise in the Feel Good Corner.";
        break;
      case "sad":
        suggestion = "It's okay to feel down sometimes. Chat with study buddies or try something easy today.";
        break;
      case "okay":
        suggestion = "Steady state is good! Pick a topic you're comfortable with to build momentum.";
        break;
      case "overwhelmed":
        suggestion = "Take a step back and break your tasks into smaller, manageable chunks.";
        break;
      default:
        suggestion = "What would you like to focus on today?";
    }
    
    toast({
      title: "Smart Suggestion",
      description: suggestion
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar navigation - desktop only */}
      <SidebarNavigation 
        activeTab={activeTab} 
        onTabChange={onTabChange} 
        hidden={hideSidebar} 
      />
      
      {/* Main content */}
      <div className="flex-1 overflow-auto p-4 md:p-6">
        {/* Mobile navigation tabs */}
        <MobileNavigation 
          activeTab={activeTab} 
          onTabChange={onTabChange} 
        />
        
        {/* Header section */}
        <DashboardHeader 
          userProfile={userProfile}
          formattedTime={formattedTime}
          formattedDate={formattedDate}
          onViewStudyPlan={onViewStudyPlan}
          currentMood={localMood}
          onMoodChange={handleMoodChange}
        />
        
        {/* Main dashboard content */}
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
