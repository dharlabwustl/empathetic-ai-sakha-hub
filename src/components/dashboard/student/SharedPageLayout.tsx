
import React, { ReactNode } from 'react';
import { Separator } from '@/components/ui/separator';

interface SharedPageLayoutProps {
  title: string;
  subtitle?: string;
  headerContent?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const SharedPageLayout = ({
  title,
  subtitle,
  headerContent,
  children,
  className = '',
}: SharedPageLayoutProps) => {
  return (
    <div className={`container mx-auto px-4 py-6 max-w-7xl ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        {headerContent && <div className="mt-4 md:mt-0">{headerContent}</div>}
      </div>
      
      <Separator className="mb-6" />
      
      {children}
    </div>
  );
};
