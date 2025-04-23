
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Lightbulb, ArrowRight, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TodayTipProps {
  tips?: string[];
  className?: string;
}

const DEFAULT_TIPS = [
  "Spaced repetition is more effective than cramming. Review topics regularly!",
  "Take breaks every 45-50 minutes to maintain focus and productivity.",
  "Explaining concepts to others helps solidify your understanding.",
  "Stay hydrated! Your brain needs water to function optimally.",
  "Try the Pomodoro technique: 25 minutes of focused work, then a short break.",
  "Review your notes within 24 hours of creating them for better retention.",
  "Create mental associations or stories to remember complex concepts.",
  "Get enough sleep! Your brain consolidates memories during deep sleep.",
  "Exercise regularly to improve blood flow to the brain and enhance cognition.",
  "Set specific, achievable goals for each study session."
];

const TodayTip: React.FC<TodayTipProps> = ({
  tips = DEFAULT_TIPS,
  className = ""
}) => {
  const [currentTipIndex, setCurrentTipIndex] = useState<number>(() => {
    // Calculate a consistent tip for today based on the date
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    return dayOfYear % tips.length;
  });
  
  const [showTip, setShowTip] = useState<boolean>(true);
  const { toast } = useToast();
  
  const handleNextTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
  };
  
  const handleCloseTip = () => {
    setShowTip(false);
    toast({
      title: "Tip dismissed",
      description: "You can find more tips in the resources section."
    });
  };
  
  if (!showTip) {
    return null;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 shadow-sm">
        <CardContent className="py-3">
          <div className="flex items-start gap-3">
            <div className="bg-amber-100 dark:bg-amber-800/50 p-2 rounded-full">
              <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-sm font-medium mb-1 text-amber-800 dark:text-amber-300">Today's Tip</h3>
              <p className="text-sm text-amber-700 dark:text-amber-200">{tips[currentTipIndex]}</p>
              
              <div className="flex items-center justify-end mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNextTip}
                  className="text-xs text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-800/50"
                >
                  Next Tip <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full p-1 h-6 w-6 text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-800/50"
              onClick={handleCloseTip}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TodayTip;
