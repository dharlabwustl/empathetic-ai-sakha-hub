
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MoodType } from "@/types/user/base";
import MoodLogButton from "./MoodLogButton";
import MoodSpecificContent from "./mood-tracking/MoodSpecificContent";
import { 
  getMoodDisplayName, 
  getMoodToastContent,
  applyMoodTheme,
  saveMoodToLocalStorage
} from "./mood-tracking/moodUtils";

interface MoodTrackingProps {
  className?: string;
}

const MoodTracking: React.FC<MoodTrackingProps> = ({ className = "" }) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check localStorage on component mount
  useEffect(() => {
    const savedMood = localStorage.getItem('currentMood') as MoodType | null;
    if (savedMood) {
      setCurrentMood(savedMood);
      applyMoodTheme(savedMood);
    }
  }, []);

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    saveMoodToLocalStorage(mood);
    applyMoodTheme(mood);
    
    // Show toast notification
    toast({
      title: `Mood updated`,
      description: `Your mood is now set to ${getMoodDisplayName(mood)}`,
    });
  };

  const handleViewFullReport = () => {
    navigate("/dashboard/student/mood");
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">How are you feeling today?</h3>
          <MoodLogButton 
            currentMood={currentMood}
            onMoodChange={handleMoodChange}
          />
        </div>

        {currentMood && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MoodSpecificContent currentMood={currentMood} />
            
            <div className="mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleViewFullReport}
                className="text-xs"
              >
                View Full Mood Report
              </Button>
              
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  {getMoodDisplayName(currentMood)}
                </Badge>
                <span>Updated just now</span>
              </div>
            </div>
          </motion.div>
        )}
        
        {!currentMood && (
          <div className="text-muted-foreground text-sm">
            Click the button above to log how you're feeling today
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodTracking;
