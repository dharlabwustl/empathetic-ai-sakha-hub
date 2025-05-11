
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import SurroundingInfluencesMeter from './SurroundingInfluencesMeter';

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Prepzr Learning Environment</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setInfluenceMeterCollapsed(!influenceMeterCollapsed)}
          className="text-blue-600 dark:text-blue-400"
        >
          {influenceMeterCollapsed ? (
            <>
              Show Surrounding Influences
              <ChevronDown className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Hide Surrounding Influences
              <ChevronUp className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      
      {!influenceMeterCollapsed && (
        <SurroundingInfluencesMeter />
      )}
    </div>
  );
};

export default SurroundingInfluencesSection;
