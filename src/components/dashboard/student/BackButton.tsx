
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BackButtonProps {
  to: string;
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ to, label = "Back" }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center gap-1 mb-4 font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
      asChild
    >
      <Link to={to}>
        <ArrowLeft className="h-4 w-4" />
        {label}
      </Link>
    </Button>
  );
};

export default BackButton;
