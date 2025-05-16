
import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  Volume2, 
  VolumeX, 
  Settings, 
  X, 
  Maximize2, 
  Minimize2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVoiceContext } from '@/contexts/VoiceContext';
import { MoodType } from '@/types/user/base';
import VoiceSettingsPanel from './VoiceSettingsPanel';

export interface FloatingVoiceAssistantProps {
  userName?: string;
  currentMood?: MoodType | string;
  onMoodCommand?: (mood: string) => void;
  onNavigationCommand?: (route: string) => void;
  pronouncePrepzr?: boolean;
}

const FloatingVoiceAssistant: React.FC<FloatingVoiceAssistantProps> = ({
  userName = 'User',
  currentMood,
  onMoodCommand,
  onNavigationCommand,
  pronouncePrepzr = false
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { 
    voiceSettings,
    isSpeaking,
    isListening,
    speakText,
    stopSpeaking,
    toggleMute,
    startListening,
    stopListening,
    recognizedText,
    isVoiceEnabled
  } = useVoiceContext();

  // Process the recognized text for commands
  useEffect(() => {
    if (recognizedText && !isListening) {
      const text = recognizedText.toLowerCase();
      
      // Navigation commands
      if (text.includes('go to') || text.includes('navigate to')) {
        if (text.includes('dashboard')) {
          onNavigationCommand?.('/dashboard/student');
        } else if (text.includes('concept') || text.includes('concepts')) {
          onNavigationCommand?.('/dashboard/student/concepts');
        } else if (text.includes('flashcard') || text.includes('flashcards')) {
          onNavigationCommand?.('/dashboard/student/flashcards');
        } else if (text.includes('practice exam') || text.includes('exams')) {
          onNavigationCommand?.('/dashboard/student/practice-exam');
        } else if (text.includes('profile')) {
          onNavigationCommand?.('/dashboard/student/profile');
        }
      }
      
      // Mood commands
      if (text.includes('mood') || text.includes('feeling')) {
        if (text.includes('happy')) {
          onMoodCommand?.('HAPPY');
        } else if (text.includes('motivated')) {
          onMoodCommand?.('MOTIVATED');
        } else if (text.includes('focused')) {
          onMoodCommand?.('FOCUSED');
        } else if (text.includes('anxious')) {
          onMoodCommand?.('ANXIOUS');
        } else if (text.includes('tired')) {
          onMoodCommand?.('TIRED');
        } else if (text.includes('stressed')) {
          onMoodCommand?.('STRESSED');
        }
      }
      
      // Help command
      if (text.includes('help') || text.includes('what can you do')) {
        const helpText = pronouncePrepzr ?
          "I'm your Prep-zer voice assistant. I can help you navigate the dashboard, set your mood, and provide information. Try saying 'go to concepts', 'I'm feeling motivated', or 'tell me about NEET preparation'." :
          "I'm your voice assistant. I can help you navigate the dashboard, set your mood, and provide information. Try saying 'go to concepts', 'I'm feeling motivated', or 'tell me about NEET preparation'.";
        
        speakText(helpText);
      }
    }
  }, [recognizedText, isListening]);

  const handleListenClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
    setShowSettings(false);
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2`}>
      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 mb-2 w-64">
          <VoiceSettingsPanel onClose={() => setShowSettings(false)} />
        </div>
      )}
      
      {/* Main Button */}
      <div 
        className={`flex items-center ${expanded ? 'bg-primary text-primary-foreground' : 'bg-white dark:bg-gray-800'} rounded-full shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300`}
      >
        {expanded && (
          <div className="flex items-center pl-4 pr-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8"
              onClick={() => setShowSettings(!showSettings)}
              title="Voice Settings"
            >
              <Settings size={18} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 mx-1"
              onClick={() => toggleMute()}
              title={voiceSettings.muted ? "Unmute" : "Mute"}
            >
              {voiceSettings.muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </Button>
            
            <div className="text-sm mx-2">
              {isListening ? "Listening..." : isSpeaking ? "Speaking..." : userName.split(' ')[0]}
            </div>
          </div>
        )}
        
        <Button
          size="icon"
          className={`h-12 w-12 rounded-full ${isListening ? 'animate-pulse bg-red-500 hover:bg-red-600' : isSpeaking ? 'animate-pulse' : ''}`}
          onClick={handleListenClick}
          disabled={!isVoiceEnabled}
        >
          <Mic size={20} />
        </Button>
        
        {expanded && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 mr-2 h-8 w-8 rounded-full"
            onClick={toggleExpand}
          >
            <Minimize2 size={16} />
          </Button>
        )}
        
        {!expanded && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-1 h-8 w-8 rounded-full hidden sm:flex"
            onClick={toggleExpand}
          >
            <Maximize2 size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FloatingVoiceAssistant;
