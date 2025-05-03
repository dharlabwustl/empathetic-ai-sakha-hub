
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent, 
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface AnimatedFeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onClick?: () => void;
  tooltipText?: string;
}

const AnimatedFeatureCard: React.FC<AnimatedFeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  color,
  onClick,
  tooltipText
}) => {
  const content = (
    <motion.div
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="h-full"
    >
      <Card 
        className="h-full cursor-pointer overflow-hidden transition-all"
        onClick={onClick}
      >
        <div className="p-6">
          <div className={`rounded-full w-12 h-12 flex items-center justify-center ${color} mb-4`}>
            <Icon size={24} className="text-white" />
          </div>
          <h3 className="text-lg font-medium mb-2">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </Card>
    </motion.div>
  );
  
  // If tooltip text is provided, wrap in Tooltip, otherwise return the content directly
  if (tooltipText) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return content;
};

export default AnimatedFeatureCard;
