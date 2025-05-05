
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ConceptCardSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onViewAll?: () => void;
  showViewAll?: boolean;
  className?: string;
  backTo?: string;
  showBackButton?: boolean;
}

const ConceptCardSection: React.FC<ConceptCardSectionProps> = ({
  title,
  description,
  children,
  onViewAll,
  showViewAll = true,
  className = '',
  backTo = '/dashboard/student',
  showBackButton = true
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(backTo);
  };

  return (
    <Card className={`border-0 shadow-sm ${className}`}>
      {showBackButton && (
        <div className="px-6 pt-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBack} 
            className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
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
