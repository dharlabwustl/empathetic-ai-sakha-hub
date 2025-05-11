
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Speaker } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";
import { MoodType } from "@/types/user/base";
import { toast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from 'react-router-dom';
import { storeMoodInLocalStorage } from './mood-tracking/moodUtils';

interface FloatingVoiceAnnouncerProps {
  userName?: string;
  onMoodChange?: (mood: MoodType) => void;
}

const FloatingVoiceAnnouncer: React.FC<FloatingVoiceAnnouncerProps> = ({
  userName,
  onMoodChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [recentCommands, setRecentCommands] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  
  const {
    voiceSettings,
    toggleMute,
    speakMessage,
    isVoiceSupported,
    isSpeaking,
    isListening,
    startListening,
    stopListening,
    transcript,
    voiceInitialized
  } = useVoiceAnnouncer({ userName });
  
  // Process transcript when it changes
  useEffect(() => {
    if (transcript) {
      processCommand(transcript);
      
      // Add to recent commands
      setRecentCommands(prev => {
        const updated = [transcript, ...prev];
        return updated.slice(0, 5); // Keep only the 5 most recent commands
      });
    }
  }, [transcript]);
  
  const processCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Handle mood commands
    if (handleMoodCommand(lowerCommand)) return;
    
    // Handle navigation commands
    if (handleNavigationCommand(lowerCommand)) return;
    
    // Handle study plan commands
    if (handleStudyPlanCommand(lowerCommand)) return;
    
    // Handle help commands
    if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      speakMessage("I can help you navigate the app, log your mood, access your study plan, and answer questions about your studies. Try saying 'go to dashboard', 'I'm feeling tired', or 'show my study plan'.");
      return;
    }
    
    // If no command recognized
    speakMessage("I didn't understand that command. Try saying 'help' to learn what I can do.");
  };
  
  const handleMoodCommand = (command: string): boolean => {
    // Map of mood keywords to MoodType values
    const moodKeywords: Record<string, MoodType> = {
      'happy': MoodType.Happy,
      'glad': MoodType.Happy,
      'great': MoodType.Happy,
      'focused': MoodType.Focused,
      'concentrating': MoodType.Focused,
      'motivated': MoodType.Motivated,
      'determined': MoodType.Motivated,
      'tired': MoodType.Tired,
      'exhausted': MoodType.Tired,
      'sleepy': MoodType.Tired,
      'stressed': MoodType.Stressed,
      'pressure': MoodType.Stressed,
      'confused': MoodType.Confused,
      'unsure': MoodType.Confused,
      'don\'t understand': MoodType.Confused,
      'anxious': MoodType.Anxious,
      'nervous': MoodType.Anxious,
      'worried': MoodType.Anxious,
      'neutral': MoodType.Neutral,
      'okay': MoodType.Okay,
      'ok': MoodType.Okay,
      'fine': MoodType.Okay,
      'overwhelmed': MoodType.Overwhelmed,
      'too much': MoodType.Overwhelmed,
      'curious': MoodType.Curious,
      'interested': MoodType.Curious,
      'sad': MoodType.Sad,
      'unhappy': MoodType.Sad
    };
    
    // Check for mood logging commands
    if (command.includes('feeling') || 
        command.includes('mood') || 
        command.includes('i am') || 
        command.includes('i\'m')) {
      
      // Check for specific mood keywords
      for (const [keyword, moodType] of Object.entries(moodKeywords)) {
        if (command.includes(keyword)) {
          // Log the mood
          if (onMoodChange) {
            onMoodChange(moodType);
          } else {
            storeMoodInLocalStorage(moodType);
          }
          
          speakMessage(`I've logged that you're feeling ${keyword} today.`);
          
          toast({
            title: "Mood updated",
            description: `Your mood has been set to ${keyword}.`,
          });
          
          return true;
        }
      }
      
      // If asking about mood but not specifying
      speakMessage("How are you feeling today? You can say something like 'I'm feeling tired' or 'I'm motivated today'.");
      return true;
    }
    
    return false;
  };
  
  const handleNavigationCommand = (command: string): boolean => {
    const navigationKeywords: Record<string, string> = {
      'dashboard': '/dashboard/student',
      'home': '/dashboard/student',
      'concepts': '/dashboard/student/concepts',
      'flashcards': '/dashboard/student/flashcards',
      'practice exam': '/dashboard/student/practice-exam',
      'exams': '/dashboard/student/practice-exam',
      'feel good': '/dashboard/student/feel-good-corner',
      'tutor': '/dashboard/student/tutor',
      'profile': '/dashboard/student/profile',
      'today': '/dashboard/student/today',
      'today\'s plan': '/dashboard/student/today',
      'formula lab': '/dashboard/student/formula-practice-lab',
      'formula practice': '/dashboard/student/formula-practice',
      'academic advisor': '/dashboard/student/academic',
      'notifications': '/dashboard/student/notifications'
    };
    
    if (command.includes('go to') || command.includes('open') || command.includes('navigate to') || command.includes('show me')) {
      for (const [keyword, path] of Object.entries(navigationKeywords)) {
        if (command.includes(keyword)) {
          speakMessage(`Navigating to ${keyword}`);
          
          // Give the voice assistant time to speak before navigation
          setTimeout(() => {
            navigate(path);
          }, 500);
          
          return true;
        }
      }
    }
    
    return false;
  };
  
  const handleStudyPlanCommand = (command: string): boolean => {
    if (command.includes('study plan') || 
        command.includes('schedule') || 
        command.includes('what should i study')) {
      
      speakMessage("Opening your study plan. Here you can see your scheduled topics and tasks for today.");
      
      // Navigate to today's plan
      setTimeout(() => {
        navigate('/dashboard/student/today');
      }, 500);
      
      return true;
    }
    
    return false;
  };
  
  const toggleVoiceListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  if (!isVoiceSupported || !voiceInitialized) {
    return null;
  }
  
  return (
    <>
      <div className="fixed bottom-24 right-6 z-30">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className={`rounded-full shadow-lg ${
                  isListening ? 'bg-red-500 hover:bg-red-600 animate-pulse' : ''
                }`}
                onClick={toggleVoiceListening}
              >
                {isListening ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{isListening ? 'Stop listening' : 'Start voice assistant'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Voice Commands</DrawerTitle>
            <DrawerDescription>
              Speak a command or try one of these examples
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Navigation</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => speakMessage("Go to dashboard")}>
                  "Go to dashboard"
                </Button>
                <Button variant="outline" size="sm" onClick={() => speakMessage("Open concepts")}>
                  "Open concepts"
                </Button>
                <Button variant="outline" size="sm" onClick={() => speakMessage("Show me flashcards")}>
                  "Show me flashcards"
                </Button>
                <Button variant="outline" size="sm" onClick={() => speakMessage("Navigate to formula lab")}>
                  "Navigate to formula lab"
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Mood Logging</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => speakMessage("I'm feeling motivated")}>
                  "I'm feeling motivated"
                </Button>
                <Button variant="outline" size="sm" onClick={() => speakMessage("I'm tired")}>
                  "I'm tired"
                </Button>
                <Button variant="outline" size="sm" onClick={() => speakMessage("Log that I'm confused")}>
                  "Log that I'm confused"
                </Button>
                <Button variant="outline" size="sm" onClick={() => speakMessage("My mood is okay")}>
                  "My mood is okay"
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Study Plan</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => speakMessage("Show my study plan")}>
                  "Show my study plan"
                </Button>
                <Button variant="outline" size="sm" onClick={() => speakMessage("What should I study today?")}>
                  "What should I study today?"
                </Button>
              </div>
            </div>
            
            {recentCommands.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Recent Commands</h4>
                <ul className="text-sm text-muted-foreground">
                  {recentCommands.map((cmd, i) => (
                    <li key={i} className="py-1 border-b border-gray-100 dark:border-gray-800 last:border-0">
                      "{cmd}"
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <DrawerFooter>
            <div className="flex justify-center gap-4">
              <Button 
                variant={isListening ? "destructive" : "default"}
                onClick={toggleVoiceListening}
              >
                {isListening ? (
                  <>
                    <MicOff className="h-4 w-4 mr-2" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-2" />
                    Start Listening
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => toggleMute()}
              >
                <Speaker className="h-4 w-4 mr-2" />
                {voiceSettings.muted ? 'Unmute' : 'Mute'} Voice
              </Button>
            </div>
            <DrawerClose>
              <Button variant="outline" className="w-full">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FloatingVoiceAnnouncer;
