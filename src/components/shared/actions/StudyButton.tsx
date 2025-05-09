
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight } from 'lucide-react';

interface StudyButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'outline';
}

/**
 * A reusable study button component with consistent styling
 */
export const StudyButton: React.FC<StudyButtonProps> = ({ 
  label = 'Study Now',
  onClick,
  className = '',
  variant = 'outline' 
}) => {
  return (
    <Button 
      variant={variant} 
      className={`w-full text-blue-600 border-blue-200 hover:border-blue-300 hover:bg-blue-50 group ${className}`}
      onClick={onClick}
    >
      <BookOpen className="mr-2 h-4 w-4" />
      {label}
      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
    </Button>
  );
};
