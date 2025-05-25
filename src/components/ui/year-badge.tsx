
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface YearBadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const YearBadge: React.FC<YearBadgeProps> = ({ 
  variant = 'default', 
  size = 'md',
  animated = true,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const badgeContent = (
    <Badge 
      variant={variant}
      className={`${sizeClasses[size]} font-bold flex items-center gap-1.5 ${className}`}
    >
      <Calendar className={`${size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'}`} />
      <span>2025</span>
    </Badge>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
      >
        {badgeContent}
      </motion.div>
    );
  }

  return badgeContent;
};

export default YearBadge;
