
import React from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import DashboardLayout from '@/pages/dashboard/student/DashboardLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

interface SharedPageLayoutProps {
  title: string;
  subtitle?: string;
  activeTab?: string;
  children: React.ReactNode;
  backButtonUrl?: string;
  showBackButton?: boolean;
  hideSidebar?: boolean;
  hideTabsNav?: boolean;
  showQuickAccess?: boolean; // Added support for this prop
}

export const SharedPageLayout: React.FC<SharedPageLayoutProps> = ({
  title,
  subtitle,
  activeTab = 'overview',
  children,
  backButtonUrl = '/dashboard/student',
  showBackButton = true, // Set to true by default
  hideSidebar = false,
  hideTabsNav = false,
  showQuickAccess = false // Default false
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

  // Content to display within the shared page layout
  const pageContent = (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          {showBackButton && (
            <BackButton
              to={backButtonUrl}
              label="Back to Dashboard"
              className="mb-4"
            />
          )}
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      </div>
      
      {/* Main Content */}
      {children}
    </div>
  );

  // Return the page content directly - don't wrap in DashboardLayout as this is done at the page level
  return pageContent;
};
