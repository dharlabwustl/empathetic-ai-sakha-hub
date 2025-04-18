
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BackToDashboardButtonProps {
  label?: string;
  destination?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

const BackToDashboardButton: React.FC<BackToDashboardButtonProps> = ({
  label = 'Back to Dashboard',
  destination = '/dashboard/student',
  variant = 'outline',
  size = 'sm',
  className = '',
}) => {
  const navigate = useNavigate();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => navigate(destination)}
      className={`flex items-center gap-2 mb-4 ${className}`}
    >
      <ArrowLeft size={16} />
      {label}
    </Button>
  );
};

export default BackToDashboardButton;
