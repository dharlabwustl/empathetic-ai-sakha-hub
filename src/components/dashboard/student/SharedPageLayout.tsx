
import React from 'react';
import BackButton from './BackButton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SharedPageLayoutProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  showBackButton?: boolean;
  backButtonUrl?: string;
  backButtonLabel?: string;
}

export const SharedPageLayout: React.FC<SharedPageLayoutProps> = ({
  title,
  subtitle,
  actions,
  children,
  showBackButton = false,
  backButtonUrl = '/dashboard/student',
  backButtonLabel
}) => {
  return (
    <TooltipProvider>
      <div className="space-y-6">
        {showBackButton && (
          <BackButton to={backButtonUrl} label={backButtonLabel} />
        )}
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          
          {actions && (
            <div className="flex flex-wrap gap-2">
              {actions}
            </div>
          )}
        </div>
        
        {children}
      </div>
    </TooltipProvider>
  );
};
