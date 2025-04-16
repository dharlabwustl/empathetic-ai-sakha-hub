
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { motion, AnimatePresence } from "framer-motion";
import SurroundingInfluencesMeter from '@/components/dashboard/student/SurroundingInfluencesMeter';

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed
}) => {
  return (
    <Collapsible className="mt-4 sm:mt-6 mb-0 sm:mb-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium text-gray-800">Surrounding Influences</h2>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm"
            className="flex items-center gap-1 text-gray-600"
            onClick={() => setInfluenceMeterCollapsed(!influenceMeterCollapsed)}
          >
            {influenceMeterCollapsed ? (
              <>
                <ChevronDown width={16} height={16} />
                <span>Expand</span>
              </>
            ) : (
              <>
                <ChevronUp width={16} height={16} />
                <span>Collapse</span>
              </>
            )}
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="overflow-hidden">
        <AnimatePresence>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SurroundingInfluencesMeter />
          </motion.div>
        </AnimatePresence>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SurroundingInfluencesSection;
