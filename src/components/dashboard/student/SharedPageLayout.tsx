
import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SharedPageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  backButtonUrl?: string;
  showBackButton?: boolean;
}

export const SharedPageLayout: React.FC<SharedPageLayoutProps> = ({ 
  title, 
  subtitle,
  children,
  backButtonUrl = "/dashboard/student",
  showBackButton = false
}) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(backButtonUrl);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1">
        {showBackButton && (
          <Button 
            variant="ghost" 
            className="w-fit -ml-2 mb-1 text-muted-foreground" 
            onClick={handleBack}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        )}
        
        <h1 className="text-3xl font-bold mb-1">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground">{subtitle}</p>
        )}
      </div>
      
      <div>
        {children}
      </div>
    </div>
  );
};
