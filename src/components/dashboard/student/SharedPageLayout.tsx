
import React from 'react';
import { QuickAccess } from '@/components/dashboard/student/QuickAccess';

interface SharedPageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showQuickAccess?: boolean;
}

export const SharedPageLayout: React.FC<SharedPageLayoutProps> = ({ 
  title, 
  subtitle, 
  children,
  showQuickAccess = true
}) => {
  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      
      {showQuickAccess && <QuickAccess className="mb-6" />}
      
      {children}
    </div>
  );
};
