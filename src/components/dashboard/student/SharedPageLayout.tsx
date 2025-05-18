
import React from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface SharedPageLayoutProps {
  title: string;
  subtitle?: string;
  activeTab?: string;
  children: React.ReactNode;
  backButtonUrl?: string;
  showBackButton?: boolean;
  hideSidebar?: boolean;
  hideTabsNav?: boolean;
  showQuickAccess?: boolean;
}

export const SharedPageLayout: React.FC<SharedPageLayoutProps> = ({
  title,
  subtitle,
  children,
  backButtonUrl = '/dashboard/student',
  showBackButton = true,
  hideSidebar = false
}) => {
  const { userProfile, loading } = useUserProfile(UserRole.Student);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  if (loading || !userProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Content to display within the shared page layout
  return (
    <div className="flex-1 p-4 sm:p-6 space-y-6">
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
            onClick={() => navigate(backButtonUrl)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        )}
      </div>
      
      {/* Main Content */}
      {children}
    </div>
  );
};
