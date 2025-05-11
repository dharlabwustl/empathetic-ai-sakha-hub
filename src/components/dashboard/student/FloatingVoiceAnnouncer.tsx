import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Speaker } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";
import MoodSelector from "@/components/dashboard/student/MoodSelector";
import { useToast } from "@/components/ui/use-toast";
import { MoodType } from '@/types/user/base';

interface FloatingVoiceAnnouncerProps {
  userName?: string;
  onMoodChange?: (mood: MoodType) => void;
}

const FloatingVoiceAnnouncer: React.FC<FloatingVoiceAnnouncerProps> = ({
  userName,
  onMoodChange
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  const [expanded, setExpanded] = useState(false);
  const { toast } = useToast();
  
  const {
    voiceSettings,
    updateVoiceSettings,
    toggleVoiceEnabled,
    toggleMute,
    speakMessage,
    isVoiceSupported,
    isSpeaking,
    isListening,
    startListening,
    stopListening,
    voiceInitialized
  } = useVoiceAnnouncer({ userName });

  useEffect(() => {
    if (currentMood) {
      const speech = getSpeechForMood(currentMood);
      speakMessage(speech);
    }
  }, [currentMood, speakMessage, userName]);
  
  // Mock helper function to get mood suggestions
  const getMoodSuggestions = (currentMood?: MoodType): string[] => {
    if (currentMood === MoodType.Tired) {
      return [
        "Would you like a shorter study session today?",
        "Let's focus on revision rather than new topics",
        "Consider taking more breaks today"
      ];
    } else if (currentMood === MoodType.Motivated) {
      return [
        "Great time to tackle difficult topics!",
        "Let's aim for a longer study session",
        "Try some challenge problems today"
      ];
    } else if (currentMood === MoodType.Confused) {
      // Replace CURIOUS with Confused in our type system
      return [
        "Let's start with basics today",
        "Would you like to review prerequisites first?",
        "Focus on understanding core concepts"
      ];
    }
    
    // Default suggestions
    return [
      "How can I help with your studies today?",
      "Would you like to focus on any particular subject?",
      "Remember to take regular breaks!"
    ];
  };
  
  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    onMoodChange?.(mood);
    
    toast({
      title: `Mood Logged: ${mood}`,
      description: "Your mood has been updated.",
    });
  };
  
  const handleTrySuggestion = (suggestion: string) => {
    speakMessage(suggestion);
    
    toast({
      title: "Suggestion:",
      description: suggestion,
    });
  };

  const getSpeechForMood = (mood: MoodType): string => {
    switch (mood) {
      case MoodType.Happy:
        return `I'm glad you're feeling happy, ${userName || 'there'}! This is a great time to tackle challenging topics.`;
      case MoodType.Tired:
        return `I notice you're feeling tired, ${userName || 'there'}. Let's focus on lighter review sessions and take more breaks today.`;
      case MoodType.Stressed:
        return `I understand you're feeling stressed, ${userName || 'there'}. Let's break your studies into smaller chunks today.`;
      case MoodType.Confused:
        return `It's okay to be confused sometimes, ${userName || 'there'}. Let's slow down and focus on fundamentals today.`;
      case MoodType.Motivated:
        return `That's great that you're feeling motivated today, ${userName || 'there'}! Let's make the most of it with focused study.`;
      case MoodType.Focused:
        return `I see you're in a focused state, ${userName || 'there'}. This is perfect for deep learning sessions!`;
      case MoodType.Neutral:
        return `You're feeling neutral today, ${userName || 'there'}. Let's find something interesting to build some momentum.`;
      default:
        return `I've registered your mood, ${userName || 'there'}. How can I help with your studies today?`;
    }
  };

  if (!isVoiceSupported) {
    return null;
  }
  
  return (
    <Card className="w-64 shadow-md hover:shadow-lg transition-all duration-300 border-blue-100 dark:border-blue-900/50">
      <CardHeader className="p-3 pb-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-t-lg">
        <CardTitle className="text-sm flex justify-between items-center">
          <span className="text-blue-700 dark:text-blue-300 font-medium">How are you feeling?</span>
          {expanded && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpanded(false)}
              className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
            >
              ×
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        {expanded ? (
          <div className="space-y-3">
            <MoodSelector 
              currentMood={currentMood} 
              onMoodChange={handleMoodChange} 
            />
            
            <div>
              <p className="text-xs text-muted-foreground mb-2">Try saying:</p>
              <div className="grid grid-cols-1 gap-2">
                {getMoodSuggestions(currentMood).map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className="h-auto py-1 px-2 text-xs justify-start font-normal text-left hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    onClick={() => handleTrySuggestion(suggestion)}
                  >
                    "{suggestion}"
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpanded(true)}
              className="w-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <Mic className="h-4 w-4 mr-2" />
              Log Mood
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FloatingVoiceAnnouncer;
