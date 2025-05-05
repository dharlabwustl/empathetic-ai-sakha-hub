import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import QuickAccessButtons from "@/components/dashboard/student/QuickAccessButtons";

interface SharedPageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backButtonUrl?: string;
  showQuickAccess?: boolean; // Add this prop
}

export const SharedPageLayout: React.FC<SharedPageLayoutProps> = ({
  children,
  title,
  subtitle,
  showBackButton = false,
  backButtonUrl = "/dashboard/student",
  showQuickAccess = false, // Add default value
}) => {
  return (
    <div className="container py-6">
      {showBackButton && (
        <Button variant="ghost" asChild className="mb-4">
          <Link to={backButtonUrl}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>

      {showQuickAccess && <QuickAccessButtons />}

      {children}
    </div>
  );
};
