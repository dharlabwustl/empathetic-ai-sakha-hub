
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import { formatTime, formatDate } from "./student/StudentDashboardUtils";
import SidebarNav from "@/components/dashboard/SidebarNav";
import ChatAssistant from "@/components/dashboard/ChatAssistant";
import OnboardingFlow from "@/components/dashboard/student/OnboardingFlow";
import DashboardLoading from "./student/DashboardLoading";
import DashboardHeader from "./student/DashboardHeader";
import DashboardContent from "@/components/dashboard/student/DashboardContent";
import StudyPlanDialog from "./student/StudyPlanDialog";
import SidebarNavigation from "./student/SidebarNavigation";
import { DashboardTabs } from "@/components/dashboard/student/DashboardTabs";

const StudentDashboard = () => {
  const {
    loading,
    activeTab,
    userProfile,
    kpis,
    nudges,
    markNudgeAsRead,
    showWelcomeTour,
    showOnboarding,
    currentTime,
    showStudyPlan,
    onboardingCompleted,
    features,
    handleTabChange,
    handleSkipTour,
    handleCompleteTour,
    handleCompleteOnboarding,
    handleViewStudyPlan,
    handleCloseStudyPlan
  } = useStudentDashboard();

  // Format current time and date
  const formattedTime = formatTime(currentTime);
  const formattedDate = formatDate(currentTime);

  if (loading || !userProfile) {
    return <DashboardLoading />;
  }

  if (showOnboarding) {
    return (
      <OnboardingFlow 
        userProfile={userProfile} 
        goalTitle={userProfile.goals?.[0]?.title || "Complete your studies"}
        onComplete={handleCompleteOnboarding}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
      <SidebarNav userType="student" userName={userProfile.name} />
      
      <main className="md:ml-64 p-6 pb-20 md:pb-6">
        {/* Top header section */}
        <DashboardHeader 
          userProfile={userProfile}
          formattedTime={formattedTime}
          formattedDate={formattedDate}
          onViewStudyPlan={handleViewStudyPlan}
        />
        
        {/* Horizontal Tab Navigation */}
        <DashboardTabs activeTab={activeTab} onTabChange={handleTabChange} />
        
        {/* Main dashboard content area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left navigation sidebar (desktop) */}
          <SidebarNavigation 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
          />
          
          {/* Main content area */}
          <DashboardContent
            activeTab={activeTab}
            onTabChange={handleTabChange}
            userProfile={userProfile}
            kpis={kpis}
            nudges={nudges}
            markNudgeAsRead={markNudgeAsRead}
            features={features}
            showWelcomeTour={showWelcomeTour || onboardingCompleted}
            handleSkipTour={handleSkipTour}
            handleCompleteTour={handleCompleteTour}
          />
        </div>
      </main>
      
      <ChatAssistant userType="student" />
      
      {/* Study Plan Dialog */}
      {showStudyPlan && (
        <StudyPlanDialog 
          userProfile={userProfile} 
          onClose={handleCloseStudyPlan} 
        />
      )}
    </div>
  );
};

export default StudentDashboard;
