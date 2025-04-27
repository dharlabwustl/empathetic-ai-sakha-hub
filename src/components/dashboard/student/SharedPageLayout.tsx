
import React from 'react';

interface SharedPageLayoutProps {
  title: string;
  subtitle: string;
  showQuickAccess?: boolean;
  children: React.ReactNode;
  className?: string;
  withMarginTop?: boolean;
}

export const SharedPageLayout: React.FC<SharedPageLayoutProps> = ({
  title,
  subtitle,
  showQuickAccess = true,
  children,
  className = "",
  withMarginTop = false
}) => {
  return (
    <div className={`space-y-4 ${withMarginTop ? 'mt-6' : ''} ${className}`}>
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
