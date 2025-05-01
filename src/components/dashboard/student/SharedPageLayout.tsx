
import React from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import DashboardLayout from '@/pages/dashboard/student/DashboardLayout';
import SharedNavigation from './SharedNavigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SharedPageLayoutProps {
  title: string;
  subtitle?: string;
  activeTab?: string;
  children: React.ReactNode;
  backButtonUrl?: string;
  showBackButton?: boolean;
}

export const SharedPageLayout: React.FC<SharedPageLayoutProps> = ({
  title,
  subtitle,
  activeTab = 'overview',
  children,
  backButtonUrl,
  showBackButton = false
}) => {
  const { userProfile, loading } = useUserProfile(UserRole.Student);
  const navigate = useNavigate();
  
  if (loading || !userProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Content to display within the dashboard layout
  const pageContent = (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        
        {showBackButton && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate(backButtonUrl || '/dashboard/student')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        )}
      </div>
      
      {/* Shared Navigation - only if needed */}
      <SharedNavigation />
      
      {/* Main Content */}
      {children}
    </div>
  );

  return (
    <DashboardLayout
      userProfile={userProfile}
      hideSidebar={false}
      hideTabsNav={false}
      activeTab={activeTab}
      kpis={[]}
      nudges={[]}
      markNudgeAsRead={() => {}}
      showWelcomeTour={false}
      onTabChange={() => {}}
      onViewStudyPlan={() => {}}
      onToggleSidebar={() => {}}
      onToggleTabsNav={() => {}}
      onSkipTour={() => {}}
      onCompleteTour={() => {}}
      showStudyPlan={false}
      onCloseStudyPlan={() => {}}
    >
      {pageContent}
    </DashboardLayout>
  );
};
