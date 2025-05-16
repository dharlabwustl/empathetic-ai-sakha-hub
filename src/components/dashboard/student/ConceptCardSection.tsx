
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, ArrowRight } from 'lucide-react';
import BackButton from '@/components/dashboard/student/BackButton';
import { Badge } from '@/components/ui/badge';

interface ConceptCardSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onViewAll?: () => void;
  showViewAll?: boolean;
  className?: string;
  backTo?: string;
  count?: number;
  badgeText?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
}

const ConceptCardSection: React.FC<ConceptCardSectionProps> = ({
  title,
  description,
  children,
  onViewAll,
  showViewAll = true,
  className = '',
  backTo,
  count,
  badgeText,
  badgeVariant = "secondary"
}) => {
  return (
    <Card className={`border-0 shadow-md hover:shadow-lg transition-shadow ${className}`}>
      {backTo && (
        <div className="px-6 pt-4">
          <BackButton to={backTo} />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Book className="h-5 w-5 text-primary" />
            <CardTitle className="flex items-center gap-2">
              {title}
              {count !== undefined && (
                <span className="text-sm text-muted-foreground ml-1">({count})</span>
              )}
              {badgeText && (
                <Badge variant={badgeVariant} className="ml-2 text-xs">
                  {badgeText}
                </Badge>
              )}
            </CardTitle>
          </div>
          {showViewAll && onViewAll && (
            <Button 
              variant="ghost" 
              onClick={onViewAll} 
              className="text-primary hover:bg-primary/10 flex items-center gap-1"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {children}
      </CardContent>
    </Card>
  );
};

export default ConceptCardSection;
