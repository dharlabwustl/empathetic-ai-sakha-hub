
import React from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import DashboardLayout from '@/pages/dashboard/student/DashboardLayout';
import SharedNavigation from './SharedNavigation';

interface SharedPageLayoutProps {
  title: string;
  subtitle?: string;
  activeTab?: string;
  children: React.ReactNode;
}

export const SharedPageLayout: React.FC<SharedPageLayoutProps> = ({
  title,
  subtitle,
  activeTab = 'overview',
  children
}) => {
  const { userProfile, loading } = useUserProfile(UserRole.Student);
  
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
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      
      {/* Shared Navigation */}
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
