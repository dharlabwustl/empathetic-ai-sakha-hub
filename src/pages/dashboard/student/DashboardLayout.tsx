import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/student/DashboardSidebar";
import { TabsNav } from "@/components/dashboard/student/TabsNav";
import { StudyPlanSidebar } from "@/components/dashboard/student/StudyPlanSidebar";
import { WelcomeTour } from "@/components/dashboard/student/WelcomeTour";
import { UserProfile } from "@/types/user/profile";
import { KPI } from "@/types/dashboard/kpi";
import { Nudge } from "@/types/dashboard/nudge";
import { MoodType } from "@/types/user/base";
// Add these imports
import { VoiceCommandHandler } from '@/components/dashboard/student/voice/VoiceCommandHandler';
import FloatingVoiceButton from '@/components/dashboard/student/voice/FloatingVoiceButton';
import { useVoiceAssistant } from '@/contexts/VoiceAssistantContext';

interface DashboardLayoutProps {
  userProfile: UserProfile | null;
  hideSidebar?: boolean;
  hideTabsNav?: boolean;
  activeTab: string;
  kpis?: KPI[];
  nudges?: Nudge[];
  markNudgeAsRead: (id: string) => void;
  showWelcomeTour?: boolean;
  onTabChange: (tab: string) => void;
  onViewStudyPlan: () => void;
  onToggleSidebar: () => void;
  onToggleTabsNav: () => void;
  onSkipTour: () => void;
  onCompleteTour: () => void;
  showStudyPlan: boolean;
  onCloseStudyPlan: () => void;
  lastActivity: Date | null;
  suggestedNextAction: string | null;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  children: React.ReactNode;
}

const DashboardLayout = ({
  userProfile,
  hideSidebar = false,
  hideTabsNav = false,
  activeTab,
  kpis = [],
  nudges = [],
  markNudgeAsRead,
  showWelcomeTour = false,
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
  onMoodChange,
  children
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tabsNavOpen, setTabsNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setSidebarOpen(!hideSidebar);
    setTabsNavOpen(!hideTabsNav);
  }, [hideSidebar, hideTabsNav]);
  
  // Use the VoiceAssistant context for integration
  const { updateMood } = useVoiceAssistant();
  
  const handleMoodChange = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
    }
    updateMood(mood);
  };

  return (
    <div className="h-screen overflow-hidden bg-muted/10">
      {/* Mobile navigation sheet */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-4 md:hidden"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <SheetHeader className="text-left">
            <SheetTitle>Dashboard Menu</SheetTitle>
            <SheetDescription>
              Navigate through your dashboard options.
            </SheetDescription>
          </SheetHeader>
          <DashboardSidebar
            userProfile={userProfile}
            activeTab={activeTab}
            onTabChange={onTabChange}
            onClose={() => setSidebarOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <div className="flex h-screen">
        {/* Sidebar */}
        <aside
          className={`hidden md:flex flex-col w-64 border-r border-r-muted bg-popover text-popover-foreground`}
        >
          <DashboardSidebar
            userProfile={userProfile}
            activeTab={activeTab}
            onTabChange={onTabChange}
          />
        </aside>

        {/* Main Content Area */}
        <main className={`flex-1 flex flex-col min-h-screen overflow-hidden transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
          {/* Tabs Navigation */}
          <div className="border-b border-b-muted">
            <TabsNav
              activeTab={activeTab}
              onTabChange={onTabChange}
              onToggleTabsNav={onToggleTabsNav}
            />
          </div>
          
          {/* Content area */}
          <div className="flex-grow overflow-y-auto pb-6">
            {/* Voice command handler component */}
            <VoiceCommandHandler
              onMoodChange={handleMoodChange}
              currentMood={currentMood}
            />
            
            {/* Nudges display */}
            {nudges && nudges.length > 0 && (
              <div className="container mx-auto px-4 py-6">
                <h2 className="text-2xl font-semibold mb-4">Action Items</h2>
                <ul className="space-y-4">
                  {nudges.map((nudge) => (
                    <li key={nudge.id} className="bg-white p-4 rounded-lg shadow-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">{nudge.title}</h3>
                          <p className="text-gray-600">{nudge.description}</p>
                        </div>
                        <Button size="sm" onClick={() => markNudgeAsRead(nudge.id)}>
                          Mark as Read
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Main content */}
            {children}
          </div>
        </main>
        
        {/* Study Plan Sidebar */}
        <Sheet open={showStudyPlan} onOpenChange={onCloseStudyPlan}>
          <SheetContent className="w-80">
            <SheetHeader>
              <SheetTitle>Your Study Plan</SheetTitle>
              <SheetDescription>
                Review and adjust your study schedule as needed.
              </SheetDescription>
            </SheetHeader>
            <StudyPlanSidebar onClose={onCloseStudyPlan} />
          </SheetContent>
        </Sheet>
        
        {/* Welcome Tour */}
        {showWelcomeTour && (
          <WelcomeTour
            onSkip={onSkipTour}
            onComplete={onCompleteTour}
          />
        )}
        
        {/* Floating Voice Button */}
        <FloatingVoiceButton />
      </div>
    </div>
  );
};

export default DashboardLayout;
