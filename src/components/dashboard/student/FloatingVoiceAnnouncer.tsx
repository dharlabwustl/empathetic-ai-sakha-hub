
import React, { useState, useEffect } from 'react';
import { Mic, Volume2, VolumeX, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useVoiceAnnouncer from '@/hooks/useVoiceAnnouncer';
import { MoodType } from '@/types/user/base';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FloatingVoiceAnnouncerProps {
  userName?: string;
  onMoodChange?: (mood: MoodType) => void;
}

const FloatingVoiceAnnouncer: React.FC<FloatingVoiceAnnouncerProps> = ({
  userName,
  onMoodChange
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  
  const {
    voiceSettings,
    toggleVoiceEnabled,
    toggleMute,
    speakMessage,
    isVoiceSupported,
    isSpeaking,
    isListening,
    startListening,
    stopListening,
    testVoice,
    transcript
  } = useVoiceAnnouncer({ userName });
  
  useEffect(() => {
    if (transcript) {
      processVoiceCommand(transcript);
    }
  }, [transcript]);
  
  useEffect(() => {
    // Check if this is the first visit
    const isFirstVisit = localStorage.getItem('sawVoiceAssistant') !== 'true';
    if (isFirstVisit) {
      // Show the assistant after a short delay
      const timer = setTimeout(() => {
        setExpanded(true);
        speakMessage(`Hi ${userName || 'there'}! I'm your PREPZR voice assistant. You can ask me to help with your studies.`);
        localStorage.setItem('sawVoiceAssistant', 'true');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    console.log('Processing voice command:', lowerCommand);
    
    // Handle navigation commands
    if (lowerCommand.includes('go to dashboard') || lowerCommand.includes('show dashboard')) {
      speakMessage('Navigating to dashboard');
      window.location.href = '/dashboard/student';
      return;
    }
    
    if (lowerCommand.includes('go to concepts') || lowerCommand.includes('show concepts')) {
      speakMessage('Opening concepts');
      window.location.href = '/dashboard/student/concepts';
      return;
    }
    
    if (lowerCommand.includes('go to flashcards') || lowerCommand.includes('show flashcards')) {
      speakMessage('Opening flashcards');
      window.location.href = '/dashboard/student/flashcards';
      return;
    }
    
    // Handle mood-related commands
    if (lowerCommand.includes('feeling') || lowerCommand.includes('mood') || lowerCommand.includes('i am')) {
      handleMoodCommand(lowerCommand);
      return;
    }
    
    // Handle study plan commands
    if (lowerCommand.includes('study plan') || lowerCommand.includes('what should i study')) {
      speakMessage('Opening your study plan. Here are your recommended topics for today.');
      // Trigger study plan opening or navigation
      return;
    }
    
    // Handle other common queries
    if (lowerCommand.includes('help me')) {
      speakMessage('I can help you navigate the platform, check your study plan, or log your mood. Try saying "Go to flashcards", "What should I study today", or "I am feeling tired".');
      return;
    }
    
    // Default response for unrecognized commands
    speakMessage(`I heard you say ${command}. You can ask me to navigate to different sections, check your study plan, or update your mood.`);
  };
  
  const handleMoodCommand = (command: string) => {
    // Extract mood from command
    let detectedMood: MoodType | null = null;
    
    if (command.includes('happy') || command.includes('great') || command.includes('excellent')) {
      detectedMood = MoodType.HAPPY;
    } else if (command.includes('motivated') || command.includes('determined')) {
      detectedMood = MoodType.MOTIVATED;
    } else if (command.includes('focused') || command.includes('concentrating')) {
      detectedMood = MoodType.FOCUSED;
    } else if (command.includes('tired') || command.includes('sleepy') || command.includes('exhausted')) {
      detectedMood = MoodType.TIRED;
    } else if (command.includes('anxious') || command.includes('nervous') || command.includes('worried')) {
      detectedMood = MoodType.ANXIOUS;
    } else if (command.includes('stressed') || command.includes('overwhelmed')) {
      detectedMood = MoodType.STRESSED;
    } else if (command.includes('sad') || command.includes('unhappy') || command.includes('down')) {
      detectedMood = MoodType.SAD;
    } else if (command.includes('confused') || command.includes("don't understand")) {
      detectedMood = MoodType.CONFUSED;
    } else if (command.includes('neutral') || command.includes('okay') || command.includes('fine')) {
      detectedMood = MoodType.NEUTRAL;
    }
    
    if (detectedMood && onMoodChange) {
      speakMessage(`I'll log that you're feeling ${detectedMood.toString().toLowerCase()}. I'll adjust your study recommendations accordingly.`);
      onMoodChange(detectedMood);
      
      // Provide study recommendation based on mood
      setTimeout(() => {
        if (detectedMood === MoodType.TIRED) {
          speakMessage("Since you're feeling tired, I recommend focusing on review sessions rather than learning new content. Short study sessions with breaks may also help.");
        } else if (detectedMood === MoodType.MOTIVATED) {
          speakMessage("Great! Since you're feeling motivated, it's a perfect time to tackle challenging topics or practice difficult questions.");
        } else if (detectedMood === MoodType.ANXIOUS) {
          speakMessage("I understand you're feeling anxious. Try starting with topics you're comfortable with to build confidence before moving to more challenging material.");
        }
      }, 2000);
    } else {
      speakMessage("I'm not sure I understood your mood correctly. You can say things like 'I'm feeling tired' or 'I'm motivated today'.");
    }
  };
  
  const handleMicClick = () => {
    if (isFirstInteraction) {
      testVoice();
      setIsFirstInteraction(false);
      setTimeout(() => {
        startListening();
      }, 2000);
    } else {
      if (isListening) {
        stopListening();
      } else {
        startListening();
      }
    }
  };
  
  if (!isVoiceSupported) {
    return null;
  }
  
  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end">
      {/* Expanded Panel */}
      {expanded && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-2 w-64 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Voice Assistant</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpanded(false)} 
              className="h-7 w-7 p-0"
            >
              &times;
            </Button>
          </div>
          
          {/* Transcript */}
          {transcript && (
            <div className="bg-gray-100 dark:bg-gray-900 p-2 rounded-md mb-3 text-sm">
              <p className="font-medium">You said:</p>
              <p className="text-muted-foreground">{transcript}</p>
            </div>
          )}
          
          {/* Controls */}
          <div className="flex justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleMute()}
                  >
                    {voiceSettings.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {voiceSettings.muted ? 'Unmute Assistant' : 'Mute Assistant'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Button 
              variant={isListening ? "destructive" : "default"}
              size="sm"
              onClick={handleMicClick}
              className={cn(isListening && "animate-pulse")}
            >
              <Mic className="h-4 w-4 mr-2" />
              {isListening ? "Listening..." : "Speak"}
            </Button>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleVoiceEnabled()}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {voiceSettings.enabled ? 'Disable Assistant' : 'Enable Assistant'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          {/* Suggestions */}
          <div className="mt-3 text-xs text-muted-foreground">
            <p>Try saying:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>"Go to flashcards"</li>
              <li>"I'm feeling tired"</li>
              <li>"What should I study today?"</li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Toggle Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={expanded ? "default" : "secondary"}
              size="icon"
              className={cn(
                "h-12 w-12 rounded-full shadow-lg", 
                isSpeaking && "animate-pulse bg-purple-500 hover:bg-purple-600",
                isListening && "bg-red-500 hover:bg-red-600"
              )}
              onClick={() => setExpanded(!expanded)}
            >
              {isSpeaking ? (
                <Volume2 className="h-5 w-5" />
              ) : isListening ? (
                <Mic className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            {expanded ? "Minimize Voice Assistant" : "Open Voice Assistant"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default FloatingVoiceAnnouncer;
