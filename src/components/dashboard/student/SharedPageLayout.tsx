
import React, { ReactNode } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SharedPageLayoutProps {
  title: string;
  subtitle?: string;
  headerContent?: ReactNode;
  children: ReactNode;
  className?: string;
  wrapContent?: boolean;
  showBackButton?: boolean;
  backButtonUrl?: string;
}

export const SharedPageLayout = ({
  title,
  subtitle,
  headerContent,
  children,
  className = '',
  wrapContent = true,
  showBackButton = false,
  backButtonUrl,
}: SharedPageLayoutProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backButtonUrl) {
      navigate(backButtonUrl);
    } else {
      navigate(-1);
    }
  };
  
  const content = (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2" 
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
          </div>
        </div>
        {headerContent && <div className="mt-4 md:mt-0">{headerContent}</div>}
      </div>
      
      <Separator className="mb-6" />
      
      {children}
    </>
  );
  
  // Check if the content should be wrapped in a container
  if (wrapContent) {
    return (
      <div className={`container mx-auto px-4 py-6 max-w-7xl ${className}`}>
        {content}
      </div>
    );
  }
  
  // Return unwrapped content for pages that already have their own container
  return content;
};
