
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Subtitles } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { 
  speakMessage, 
  getGreeting,
  getReminderAnnouncement,
  getMotivationalMessage,
  DEFAULT_VOICE_SETTINGS
} from './voiceUtils';

interface VoiceAnnouncerProps {
  userName?: string;
  mood?: MoodType;
  isFirstTimeUser?: boolean;
  pendingTasks?: Array<{title: string, due?: string}>;
  examGoal?: string;
}

const VoiceAnnouncer: React.FC<VoiceAnnouncerProps> = ({ 
  userName,
  mood,
  isFirstTimeUser = false,
  pendingTasks = [],
  examGoal
}) => {
  const [muted, setMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [currentMessage, setCurrentMessage] = useState('');
  const [speaking, setSpeaking] = useState(false);

  // Load user preferences from localStorage on component mount
  useEffect(() => {
    const savedMuted = localStorage.getItem('voiceAssistantMuted');
    const savedSubtitles = localStorage.getItem('voiceAssistantSubtitles');
    
    if (savedMuted !== null) {
      setMuted(savedMuted === 'true');
    }
    
    if (savedSubtitles !== null) {
      setShowSubtitles(savedSubtitles === 'true');
    }
  }, []);

  // Set up voice announcement on first load
  useEffect(() => {
    // Initial greeting with a small delay for better UX
    const timer = setTimeout(() => {
      if (!muted) {
        const greeting = getGreeting(userName, mood?.toString(), isFirstTimeUser);
        speakMessage(greeting, { ...DEFAULT_VOICE_SETTINGS, muted, language: 'en-IN' });
        setCurrentMessage(greeting);
        setSpeaking(true);
      }
    }, 1000);

    // Set up listeners for speaking events
    const handleSpeakingStarted = (event: CustomEvent) => {
      setSpeaking(true);
      setCurrentMessage(event.detail.message);
    };

    const handleSpeakingEnded = () => {
      setSpeaking(false);
    };

    document.addEventListener('voice-speaking-started', handleSpeakingStarted as EventListener);
    document.addEventListener('voice-speaking-ended', handleSpeakingEnded);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('voice-speaking-started', handleSpeakingStarted as EventListener);
      document.removeEventListener('voice-speaking-ended', handleSpeakingEnded);
    };
  }, [userName, mood, isFirstTimeUser, muted]);

  const toggleMute = () => {
    if (!muted && speaking) {
      // Cancel current speech if unmuting
      window.speechSynthesis?.cancel();
    }
    setMuted(!muted);
    
    // Save mute preference
    localStorage.setItem('voiceAssistantMuted', (!muted).toString());
  };

  const toggleSubtitles = () => {
    setShowSubtitles(!showSubtitles);
    // Save subtitle preference
    localStorage.setItem('voiceAssistantSubtitles', (!showSubtitles).toString());
  };

  return (
    <div className="flex items-center gap-1 relative">
      <Button
        size="sm"
        variant="ghost"
        className="h-8 w-8 p-0"
        onClick={toggleMute}
        title={muted ? "Unmute voice assistant" : "Mute voice assistant"}
      >
        {muted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>
      
      <Button
        size="sm"
        variant="ghost"
        className={`h-8 w-8 p-0 ${showSubtitles ? 'text-primary' : ''}`}
        onClick={toggleSubtitles}
        title={showSubtitles ? "Hide subtitles" : "Show subtitles"}
      >
        <Subtitles className="h-4 w-4" />
      </Button>
      
      {speaking && showSubtitles && currentMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-border z-50 text-sm max-w-md">
          {currentMessage}
        </div>
      )}
    </div>
  );
};

export default VoiceAnnouncer;
