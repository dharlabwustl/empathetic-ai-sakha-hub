
import React from 'react';
import { QuickAccess } from './QuickAccess';

interface SharedPageLayoutProps {
  title: string;
  subtitle: string;
  showQuickAccess?: boolean;
  children: React.ReactNode;
}

export const SharedPageLayout: React.FC<SharedPageLayoutProps> = ({
  title,
  subtitle,
  showQuickAccess = true,
  children
}) => {
  return (
    <div className="space-y-4">
      {/* Place QuickAccess at the top */}
      {showQuickAccess && <QuickAccess className="mb-2" />}
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
        {children}
      </div>
    </div>
  );
};
