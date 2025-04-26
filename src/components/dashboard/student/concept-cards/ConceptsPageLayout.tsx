
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QuickAccess } from '@/components/dashboard/student/QuickAccess';

interface ConceptsPageLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  title?: string;
  subtitle?: string;
}

export const ConceptsPageLayout: React.FC<ConceptsPageLayoutProps> = ({
  children,
  showBackButton = false,
  title,
  subtitle
}) => {
  return (
    <div className="container py-6 space-y-6">
      <QuickAccess />
      
      <div className="flex items-center justify-between">
        {showBackButton && (
          <Link to="/dashboard/student/concepts">
            <Button variant="ghost" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Concepts
            </Button>
          </Link>
        )}
        
        {title && (
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
        )}
      </div>
      
      <Card className="p-6">
        {children}
      </Card>
    </div>
  );
};
