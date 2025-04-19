
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useMoodContext } from "@/contexts/MoodContext";
import { MoodType } from "@/types/user/base";
import MoodLogButton from "./MoodLogButton";
import { useToast } from "@/hooks/use-toast";

const MoodTracking: React.FC = () => {
  const { currentMood, addMoodEntry } = useMoodContext();
  const { toast } = useToast();
  
  const handleMoodChange = (mood: MoodType) => {
    addMoodEntry(mood);
    
    toast({
      title: "Mood updated",
      description: `Your mood has been set to ${getMoodDisplayName(mood)}`,
    });
  };
  
  return (
    <Card>
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
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm">
                {getMoodMessage(currentMood)}
              </p>
            </div>
            
            <div className="mt-4">
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs"
              >
                View Mood History
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

// Helper functions
const getMoodDisplayName = (mood?: MoodType): string => {
  const moodDisplayNames: Record<MoodType, string> = {
    motivated: "Motivated",
    curious: "Curious",
    neutral: "Neutral",
    tired: "Tired",
    stressed: "Stressed",
    focused: "Focused",
    happy: "Happy",
    okay: "Okay",
    overwhelmed: "Overwhelmed",
    sad: "Sad",
  };
  
  return mood ? moodDisplayNames[mood] : "Select Mood";
};

const getMoodMessage = (mood: MoodType): string => {
  const moodMessages: Record<MoodType, string> = {
    motivated: "Great! Your motivation can help you tackle challenging topics today.",
    curious: "Curiosity drives learning! Great time to explore new concepts.",
    neutral: "A balanced state is good for consistent study progress.",
    tired: "Remember to take breaks and focus on review rather than new concepts.",
    stressed: "Try some deep breathing exercises between study sessions.",
    focused: "Excellent! This is the perfect state for deep learning.",
    happy: "Your positive energy can help with creative problem solving!",
    okay: "A good baseline for steady progress in your studies.",
    overwhelmed: "Consider breaking down your tasks into smaller chunks.",
    sad: "Be kind to yourself today. Maybe start with something you enjoy.",
  };
  
  return moodMessages[mood];
};

export default MoodTracking;
