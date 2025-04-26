
import React from 'react';
import { QuickAccess } from "./QuickAccess";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

interface SharedPageLayoutProps {
  title?: string;
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
    <div className="space-y-6">
      {showQuickAccess && <QuickAccess />}
      
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h1 className="text-2xl font-bold">{title}</h1>}
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      
      <Card className="p-6">
        {children}
      </Card>
    </div>
  );
};
