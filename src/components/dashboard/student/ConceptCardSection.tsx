
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book } from 'lucide-react';
import BackButton from '@/components/dashboard/student/BackButton';

interface ConceptCardSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onViewAll?: () => void;
  showViewAll?: boolean;
  className?: string;
  backTo?: string;
}

const ConceptCardSection: React.FC<ConceptCardSectionProps> = ({
  title,
  description,
  children,
  onViewAll,
  showViewAll = true,
  className = '',
  backTo
}) => {
  return (
    <Card className={`border-0 shadow-sm ${className}`}>
      {backTo && (
        <div className="px-6 pt-4">
          <BackButton to={backTo} />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Book className="h-5 w-5 text-primary" />
            <CardTitle>{title}</CardTitle>
          </div>
          {showViewAll && onViewAll && (
            <Button variant="link" onClick={onViewAll} className="text-primary">
              View All
            </Button>
          )}
        </div>
        {description && <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default ConceptCardSection;
