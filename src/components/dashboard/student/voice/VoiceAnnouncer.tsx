
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useVoiceAnnouncer } from "@/hooks/useVoiceAnnouncer";
import { 
  speakMessage, 
  getGreeting,
  getReminderAnnouncement,
  type VoiceSettings 
} from '@/components/dashboard/student/voice/voiceUtils';

interface VoiceAnnouncerProps {
  userName?: string;
  mood?: string;
  isFirstTimeUser?: boolean;
  pendingTasks?: Array<{title: string, due?: string}>;
  showTooltip?: boolean;
}

const VoiceAnnouncer = ({
  userName,
  mood,
  isFirstTimeUser = false,
  pendingTasks = [],
  showTooltip = true
}: VoiceAnnouncerProps) => {
  const {
    isListening,
    isSpeaking,
    transcript,
    voiceSettings,
    startListening,
    stopListening,
    speakGreeting,
    speakMessage: speak,
    toggleVoiceEnabled
  } = useVoiceAnnouncer({
    userName,
    mood,
    isFirstTimeUser,
    pendingTasks
  });
  
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [subtitleText, setSubtitleText] = useState('');
  const [hasGreeted, setHasGreeted] = useState(false);
  
  // Initial greeting when component mounts
  useEffect(() => {
    // Wait for a short delay before greeting to ensure dashboard is loaded
    const timer = setTimeout(() => {
      if (!hasGreeted && !isFirstTimeUser) {
        speakGreeting();
        setHasGreeted(true);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [speakGreeting, isFirstTimeUser, hasGreeted]);
  
  // Handle speech events for subtitles
  useEffect(() => {
    const handleSpeakingStarted = (e: CustomEvent) => {
      setShowSubtitle(true);
      setSubtitleText(e.detail.message);
    };
    
    const handleSpeakingEnded = () => {
      setShowSubtitle(false);
      setSubtitleText('');
    };
    
    document.addEventListener('voice-speaking-started', handleSpeakingStarted as EventListener);
    document.addEventListener('voice-speaking-ended', handleSpeakingEnded);
    
    return () => {
      document.removeEventListener('voice-speaking-started', handleSpeakingStarted as EventListener);
      document.removeEventListener('voice-speaking-ended', handleSpeakingEnded);
    };
  }, []);
  
  // Announce reminders if available
  useEffect(() => {
    if (hasGreeted && pendingTasks.length > 0) {
      const timer = setTimeout(() => {
        const reminderText = getReminderAnnouncement(pendingTasks);
        if (reminderText) {
          speak(reminderText);
        }
      }, 5000); // Wait 5 seconds after greeting
      
      return () => clearTimeout(timer);
    }
  }, [hasGreeted, pendingTasks, speak]);
  
  // Event handlers
  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  // First time user instruction
  useEffect(() => {
    if (isFirstTimeUser && hasGreeted) {
      const timer = setTimeout(() => {
        speak("Use the voice button above to ask me about your study plan or to begin a flashcard session.");
      }, 10000); // 10 seconds after greeting
      
      return () => clearTimeout(timer);
    }
  }, [isFirstTimeUser, hasGreeted, speak]);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleListening}
              className={`relative ${isListening || isSpeaking ? 'bg-indigo-100 dark:bg-indigo-900/30' : ''}`}
            >
              <div className={`absolute inset-0 rounded-full ${
                (isListening || isSpeaking) ? 'animate-pulse bg-indigo-200/50 dark:bg-indigo-700/30' : ''
              }`} />
              
              {voiceSettings.enabled ? (
                isListening ? (
                  <Mic className="h-[1.2rem] w-[1.2rem] text-indigo-600 dark:text-indigo-400 animate-pulse" />
                ) : (
                  <Volume2 className="h-[1.2rem] w-[1.2rem] text-gray-700 dark:text-gray-300" />
                )
              ) : (
                <VolumeX className="h-[1.2rem] w-[1.2rem] text-gray-500 dark:text-gray-400" />
              )}
              
              {(isListening || isSpeaking) && (
                <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                </span>
              )}
            </Button>
          </TooltipTrigger>
          {showTooltip && (
            <TooltipContent side="bottom">
              <p>Click to interact with PREPZR, your study assistant!</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      
      {/* Subtitle/Transcript display */}
      {showSubtitle && subtitleText && (
        <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg max-w-md text-center z-50 animate-fade-in">
          {subtitleText}
        </div>
      )}
      
      {/* Transcript display when listening */}
      {isListening && transcript && (
        <div className="fixed bottom-28 left-1/2 transform -translate-x-1/2 bg-indigo-600/90 text-white px-4 py-2 rounded-lg max-w-md text-center z-50">
          "{transcript}"
        </div>
      )}
    </>
  );
};

export default VoiceAnnouncer;
