
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export interface SharedPageLayoutProps {
  title: string;
  subtitle?: string;
  showQuickAccess?: boolean;
  children: ReactNode;
  showBackButton?: boolean;
  backButtonUrl?: string;
}

export const SharedPageLayout = ({ 
  title, 
  subtitle, 
  showQuickAccess = true, 
  children,
  showBackButton = false,
  backButtonUrl = ""
}: SharedPageLayoutProps) => {
  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-0.5">
          {showBackButton && backButtonUrl && (
            <Link to={backButtonUrl}>
              <Button variant="ghost" size="sm" className="mb-2 -ml-3">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
          )}
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      
      {/* Main content */}
      <div className="mt-2">
        {children}
      </div>
    </div>
  );
};
