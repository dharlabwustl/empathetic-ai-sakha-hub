
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  onViewAll?: () => void;
  showViewAll?: boolean;
}

/**
 * A reusable section header with an optional "View All" button
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  onViewAll,
  showViewAll = true
}) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      {showViewAll && (
        <Button 
          variant="ghost" 
          className="text-sm flex items-center gap-1 text-blue-600"
          onClick={onViewAll}
        >
          View All <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
