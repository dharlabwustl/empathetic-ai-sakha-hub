
import React from 'react';
import { QuickAccessButtons } from "./QuickAccessButtons";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

interface SharedPageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showQuickAccess?: boolean;
}

export const SharedPageLayout = ({ 
  title, 
  subtitle, 
  children,
  showQuickAccess = true 
}: SharedPageLayoutProps) => {
  return (
    <div className="space-y-6">
      {/* Quick Access Buttons - Only shown at top level */}
      {showQuickAccess && <QuickAccessButtons />}
      
      {/* Header Section */}
      <SectionHeader
        title={title}
        subtitle={subtitle}
      />

      {/* Main Content */}
      <Card className="p-6">
        {children}
      </Card>
    </div>
  );
};
