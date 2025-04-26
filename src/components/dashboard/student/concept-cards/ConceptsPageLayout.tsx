
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ConceptsPageLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
}

export const ConceptsPageLayout: React.FC<ConceptsPageLayoutProps> = ({
  children,
  showBackButton = false
}) => {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        {showBackButton && (
          <Link to="/dashboard/student/concepts">
            <Button variant="ghost" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Concepts
            </Button>
          </Link>
        )}
      </div>
      
      <Card className="p-6">
        {children}
      </Card>
    </div>
  );
};
