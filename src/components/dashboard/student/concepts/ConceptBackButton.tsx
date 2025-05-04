
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface ConceptBackButtonProps {
  label?: string;
  className?: string;
}

const ConceptBackButton: React.FC<ConceptBackButtonProps> = ({ 
  label = 'Back to Concepts', 
  className = '' 
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page in history
  };

  return (
    <Button 
      variant="ghost" 
      className={`flex items-center text-muted-foreground hover:text-foreground ${className}`}
      onClick={handleGoBack}
    >
      <ChevronLeft className="h-4 w-4 mr-1" />
      {label}
    </Button>
  );
};

export default ConceptBackButton;
