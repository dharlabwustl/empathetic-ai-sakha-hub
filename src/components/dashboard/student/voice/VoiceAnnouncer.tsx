
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, VolumeX, Volume } from "lucide-react";
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
  type VoiceSettings,
  initSpeechSynthesis
} from '@/components/dashboard/student/voice/voiceUtils';

interface VoiceAnnouncerProps {
  userName?: string;
  mood?: string;
  isFirstTimeUser?: boolean;
  pendingTasks?: Array<{title: string, due?: string}>;
  showTooltip?: boolean;
  examGoal?: string;
}

const VoiceAnnouncer = ({
  userName,
  mood,
  isFirstTimeUser = false,
  pendingTasks = [],
  showTooltip = true,
  examGoal
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
    toggleVoiceEnabled,
    toggleMute
  } = useVoiceAnnouncer({
    userName,
    mood,
    isFirstTimeUser,
    pendingTasks,
    examGoal
  });
  
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [subtitleText, setSubtitleText] = useState('');
  const [hasGreeted, setHasGreeted] = useState(false);
  const [hasAnnouncedReminders, setHasAnnouncedReminders] = useState(false);
  
  // Initialize speech synthesis on mount
  useEffect(() => {
    console.log("Initializing speech synthesis");
    initSpeechSynthesis();
  }, []);
  
  // Enhanced visual animation style
  const pulseAnimation = `${(isListening || isSpeaking) ? 'animate-pulse' : ''} ${voiceSettings.enabled ? 'bg-indigo-200/50 dark:bg-indigo-700/30' : ''}`;
  const iconColor = voiceSettings.enabled 
    ? (isListening ? "text-indigo-600 dark:text-indigo-400 animate-pulse" : "text-gray-700 dark:text-gray-300")
    : "text-gray-500 dark:text-gray-400";
  
  // Initial greeting when component mounts - only once and not repetitive
  useEffect(() => {
    if (!hasGreeted && voiceSettings.enabled && !voiceSettings.muted) {
      const timer = setTimeout(() => {
        console.log("Speaking initial greeting...");
        const greeting = getGreeting(userName, mood, isFirstTimeUser);
        speak(greeting, true);
        setHasGreeted(true);
      }, isFirstTimeUser ? 1500 : 1000);
      
      return () => clearTimeout(timer);
    }
  }, [speakGreeting, isFirstTimeUser, hasGreeted, userName, mood, speak, voiceSettings.enabled, voiceSettings.muted]);
  
  // Handle speech events for subtitles
  useEffect(() => {
    const handleSpeakingStarted = (e: CustomEvent) => {
      console.log("Speech started:", e.detail.message);
      setShowSubtitle(true);
      setSubtitleText(e.detail.message);
    };
    
    const handleSpeakingEnded = () => {
      console.log("Speech ended");
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
  
  // Announce reminders if available - only once
  useEffect(() => {
    if (hasGreeted && !hasAnnouncedReminders && pendingTasks.length > 0 && voiceSettings.enabled && !voiceSettings.muted) {
      const timer = setTimeout(() => {
        const reminderText = getReminderAnnouncement(pendingTasks, examGoal);
        if (reminderText) {
          console.log("Speaking reminder:", reminderText);
          speak(reminderText);
          setHasAnnouncedReminders(true);
        }
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, [hasGreeted, hasAnnouncedReminders, pendingTasks, speak, examGoal, voiceSettings.enabled, voiceSettings.muted]);
  
  // Event handlers
  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  const handleToggleMute = () => {
    toggleMute();
    
    // Provide feedback about mute state
    if (!voiceSettings.muted) {
      // User is unmuting - give audio feedback
      setShowSubtitle(true);
      setSubtitleText("Voice assistant muted");
      setTimeout(() => setShowSubtitle(false), 1500);
    } else {
      // User is unmuting - give audio feedback
      speak("Voice assistant activated. I'm here to help you.", true);
      setShowSubtitle(true);
      setSubtitleText("Voice assistant activated");
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleListening}
                className={`relative ${isListening || isSpeaking ? 'bg-indigo-100 dark:bg-indigo-900/30' : ''}`}
              >
                {/* Enhanced pulsing effect */}
                <div className={`absolute inset-0 rounded-full ${pulseAnimation}`} />
                
                {/* Voice indicator icon */}
                {voiceSettings.enabled ? (
                  isListening ? (
                    <Mic className={`h-[1.2rem] w-[1.2rem] ${iconColor}`} />
                  ) : (
                    <Volume2 className={`h-[1.2rem] w-[1.2rem] ${iconColor}`} />
                  )
                ) : (
                  <VolumeX className="h-[1.2rem] w-[1.2rem] text-gray-500 dark:text-gray-400" />
                )}
                
                {/* Activity indicator */}
                {(isListening || isSpeaking) && (
                  <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                  </span>
                )}
              </Button>
              
              {/* Mute toggle button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleMute}
                className="text-xs h-7 px-2 flex items-center gap-1"
                title={voiceSettings.muted ? "Unmute voice" : "Mute voice"}
              >
                {voiceSettings.muted ? (
                  <>
                    <Volume className="h-3 w-3" />
                    <span className="hidden sm:inline">Unmute</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="h-3 w-3" />
                    <span className="hidden sm:inline">Mute</span>
                  </>
                )}
              </Button>
            </div>
          </TooltipTrigger>
          {showTooltip && (
            <TooltipContent side="bottom" className="bg-white dark:bg-gray-800 p-2 shadow-lg border border-gray-200 dark:border-gray-700">
              <p className="text-sm">Your study assistant is here to help!</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Ask about your studies or toggle voice on/off</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      
      {/* Subtitle/Transcript display with improved styling */}
      {showSubtitle && subtitleText && (
        <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg max-w-md text-center z-50 animate-fade-in shadow-lg">
          {subtitleText}
        </div>
      )}
      
      {/* Transcript display when listening */}
      {isListening && transcript && (
        <div className="fixed bottom-28 left-1/2 transform -translate-x-1/2 bg-indigo-600/90 text-white px-4 py-2 rounded-lg max-w-md text-center z-50 shadow-lg border border-indigo-500/50">
          <div className="text-sm font-medium mb-1">I heard you say:</div>
          <div className="italic">"{transcript}"</div>
        </div>
      )}
    </>
  );
};

export default VoiceAnnouncer;
