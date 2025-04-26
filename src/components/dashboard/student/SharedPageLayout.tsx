
import React from 'react';
import { QuickAccessButtons } from "./QuickAccessButtons";
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
      {showQuickAccess && <QuickAccessButtons />}
      
      {(title || subtitle) && (
        <SectionHeader 
          title={title}
          subtitle={subtitle}
        />
      )}
      
      <Card className="p-6">
        {children}
      </Card>
    </div>
  );
};
