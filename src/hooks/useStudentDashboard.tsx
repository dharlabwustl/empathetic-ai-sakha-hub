
// Mock implementation of useStudentDashboard hook
import { useState, useEffect } from "react";
import { UserProfileType, UserRole, MoodType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { adminService } from '@/services/adminService';

export const useStudentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);
  const [showStudyPlan, setShowStudyPlan] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [hideTabsNav, setHideTabsNav] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock user profile
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  
  // Other state
  const [kpis, setKpis] = useState<KpiData[]>([]);
  const [nudges, setNudges] = useState<NudgeData[]>([]);
  const [features, setFeatures] = useState<any[]>([]);
  const [lastActivity, setLastActivity] = useState<{ type: string; description: string } | null>(null);
  const [suggestedNextAction, setSuggestedNextAction] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [upcomingEvents, setUpcomingEvents] = useState<Array<{
    title: string;
    time: string;
    type: "exam" | "task" | "revision";
  }>>([]);
  
  // Mock initialization
  useEffect(() => {
    // Simulate loading
    setTimeout(async () => {
      // Set mock user profile
      setUserProfile({
        id: "1",
        name: "Amit Singh",
        email: "amit@example.com",
        role: UserRole.Student,
        loginCount: 2,
        avatar: '/lovable-uploads/1bd9164d-90e1-4088-b058-0fa5966be194.png',
        personalityType: "Analytical learner",
        examPreparation: "JEE Advanced 2025",
        studyPreferences: {
          pace: "Moderate",
          hoursPerDay: 4,
          preferredTimeStart: "18:00",
          preferredTimeEnd: "22:00"
        },
        studyStreak: 12,
        mood: MoodType.MOTIVATED
      });
      
      // Get stats from admin service for KPIs
      try {
        const stats = await adminService.getDashboardStats();
        
        // Set KPIs with data from admin service
        setKpis([
          { id: "1", title: "Streak Days", value: 12, icon: "🔥", change: 2, changeType: "positive" },
          { id: "2", title: "Concepts Mastered", value: stats.averageConcepts || 48, icon: "📚", change: 5, changeType: "positive" },
          { id: "3", title: "Study Plans", value: Math.round(stats.totalStudyPlans / 500), unit: "delivered", icon: "📝", change: 3, changeType: "positive" },
          { id: "4", title: "Feel Stress Reduced", value: stats.verifiedMoodImprovement || 72, unit: "%", icon: "💆", change: 4, changeType: "positive" }
        ]);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        // Fallback KPIs if admin service fails
        setKpis([
          { id: "1", title: "Streak Days", value: 12, icon: "🔥", change: 2, changeType: "positive" },
          { id: "2", title: "Concepts Mastered", value: 48, icon: "📚", change: 5, changeType: "positive" },
          { id: "3", title: "Study Plans", value: 24, unit: "delivered", icon: "📝", change: 3, changeType: "positive" },
          { id: "4", title: "Feel Stress Reduced", value: 72, unit: "%", icon: "💆", change: 4, changeType: "positive" }
        ]);
      }
      
      // Set mock nudges
      setNudges([
        { id: "1", title: "Complete Physics Quiz", description: "You have an incomplete quiz to finish", priority: "high", createdAt: new Date().toISOString() },
        { id: "2", title: "Review Flashcards", description: "10 flashcards due for review today", priority: "medium", createdAt: new Date().toISOString() }
      ]);
      
      // Set mock features
      setFeatures([
        { title: "Academic Advisor", description: "Get personalized guidance", path: "/dashboard/student/academic", isPremium: false },
        { title: "Today's Plan", description: "Your daily study schedule", path: "/dashboard/student/today", isPremium: false },
        { title: "Concept Cards", description: "Master key concepts", path: "/dashboard/student/concepts", isPremium: false },
        { title: "Practice Exams", description: "Test your knowledge", path: "/dashboard/student/practice-exam", isPremium: false }
      ]);
      
      // Set last activity
      setLastActivity({ type: "login", description: "yesterday" });
      
      // Set suggested next action
      setSuggestedNextAction("Complete the Physics quiz on Newton's Laws");
      
      // Set upcoming events with proper routing
      setUpcomingEvents([
        { title: 'Newton\'s Laws Practice Test', time: 'Today, 4:00 PM', type: 'exam' },
        { title: 'Thermodynamics Revision', time: 'Tomorrow, 9:00 AM', type: 'revision' },
        { title: 'Electricity Concept Card', time: 'Today, 2:00 PM', type: 'task' }
      ]);
      
      // Set loading to false
      setLoading(false);
    }, 1000);
  }, []);
  
  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);
  
  // Handlers
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  const handleSkipTour = () => {
    setShowWelcomeTour(false);
  };
  
  const handleCompleteTour = () => {
    setShowWelcomeTour(false);
  };
  
  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
  };
  
  const handleViewStudyPlan = () => {
    setShowStudyPlan(true);
  };
  
  const handleCloseStudyPlan = () => {
    setShowStudyPlan(false);
  };
  
  const toggleSidebar = () => {
    setHideSidebar(!hideSidebar);
  };
  
  const toggleTabsNav = () => {
    setHideTabsNav(!hideTabsNav);
  };
  
  const markNudgeAsRead = (id: string) => {
    setNudges(nudges.filter(nudge => nudge.id !== id));
  };
  
  return {
    loading,
    userProfile,
    activeTab,
    showWelcomeTour,
    showOnboarding,
    currentTime,
    showStudyPlan,
    hideTabsNav,
    hideSidebar,
    kpis,
    nudges,
    features,
    lastActivity,
    suggestedNextAction,
    upcomingEvents,
    markNudgeAsRead,
    handleTabChange,
    handleSkipTour,
    handleCompleteTour,
    handleCompleteOnboarding,
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav
  };
};
