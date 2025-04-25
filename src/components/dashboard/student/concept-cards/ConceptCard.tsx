
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import CardBadges from "./components/CardBadges";
import CardProgress from "./components/CardProgress";
import CardFooter from "./components/CardFooter";
import { ConceptCardProps } from "@/types/user/base";

const ConceptCard: React.FC<ConceptCardProps> = ({
  id,
  title,
  description,
  subject,
  difficulty,
  completed,
  progress,
  isLocked = false,
  isPremium = false,
  topic,
  priority,
  timeAllocation,
  hasAudioNarration,
  hasNotes,
  isBookmarked,
  status,
  onToggleComplete,
  onView
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMarkComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleComplete && !isLocked) {
      onToggleComplete(id, !completed);
    }
  };
  
  const handleView = () => {
    if (onView && !isLocked) {
      onView(id);
    }
  };

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={!isLocked ? { y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' } : undefined}
        transition={{ duration: 0.2 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`relative ${completed ? 'border-l-4 border-green-500' : ''} ${isLocked ? 'opacity-80' : ''}`}
      >
        <Card className={`overflow-hidden h-full ${isLocked ? 'bg-gray-50 dark:bg-gray-800/50' : ''}`}>
          <div className="p-4">
            <CardBadges 
              subject={subject}
              topic={topic}
              difficulty={difficulty}
              priority={priority}
              isPremium={isPremium}
            />
          
            <h4 className="font-medium text-base mb-1">{title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">{description}</p>
            
            <CardProgress progress={progress} />
            
            <CardFooter 
              timeAllocation={timeAllocation}
              hasAudioNarration={hasAudioNarration}
              hasNotes={hasNotes}
              isBookmarked={isBookmarked}
              status={status}
            />
          </div>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
};

export default ConceptCard;
