
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

  return (
    <div className="flex-1 p-2 sm:p-4 md:p-6 space-y-3 sm:space-y-6">
      {/* Page Header with responsive layout */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
        <div className="space-y-1">
          <h1 className={`${isMobile ? 'text-lg' : 'text-xl sm:text-2xl'} font-bold`}>{title}</h1>
          {subtitle && <p className={`${isMobile ? 'text-xs' : 'text-sm sm:text-base'} text-muted-foreground`}>{subtitle}</p>}
        </div>
        
        {showBackButton && (
          <Button 
            variant="outline" 
            size={isMobile ? "sm" : "default"} 
            onClick={() => navigate(backButtonUrl)}
            className="flex items-center gap-1 sm:gap-2 self-start sm:self-auto"
          >
            <ArrowLeft className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
            <span className={isMobile ? "text-xs" : "text-sm"}>Back</span>
          </Button>
        )}
      </div>
      
      {/* Main Content with responsive padding */}
      <div className={isMobile ? "px-0" : ""}>
        {children}
      </div>
    </div>
  );
};
