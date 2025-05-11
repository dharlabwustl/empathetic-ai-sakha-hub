
import React, { useEffect, useState } from 'react';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { useLocation } from 'react-router-dom';

interface VoiceAnnouncerProps {
  userName?: string;
  isFirstTimeUser?: boolean;
  currentMood?: MoodType;
  language?: string;
}

const VoiceAnnouncer: React.FC<VoiceAnnouncerProps> = ({
  userName = 'Student',
  isFirstTimeUser = false,
  currentMood,
  language = 'en'
}) => {
  const location = useLocation();
  const [lastPath, setLastPath] = useState('');
  const [activeCommand, setActiveCommand] = useState<string | null>(null);
  
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
    transcript
  } = useVoiceAnnouncer({
    userName,
    isFirstTimeUser,
    initialSettings: {
      language: language,
      enabled: true,
      muted: false,
      volume: 0.8,
      rate: 1.0,
      pitch: 1.0
    }
  });

  // Speak when path changes to provide context-aware navigation information
  useEffect(() => {
    if (location.pathname !== lastPath && voiceSettings.enabled && !voiceSettings.muted) {
      setLastPath(location.pathname);
      
      // Prepare page description based on current path
      let pageDescription = '';
      
      if (location.pathname.includes('/dashboard/student')) {
        if (location.pathname === '/dashboard/student') {
          pageDescription = `Welcome to your dashboard, ${userName}. Here you can see your study progress and upcoming tasks.`;
          
          // Add mood-specific message
          if (currentMood) {
            switch (currentMood) {
              case MoodType.HAPPY:
                pageDescription += " I'm glad you're feeling happy today! This is a great time to tackle challenging topics.";
                break;
              case MoodType.MOTIVATED:
                pageDescription += " Your motivated mood is perfect for making progress on your study goals today.";
                break;
              case MoodType.FOCUSED:
                pageDescription += " Since you're feeling focused, consider working on complex topics that require concentration.";
                break;
              case MoodType.TIRED:
                pageDescription += " I notice you're feeling tired. Consider starting with lighter review topics today.";
                break;
              case MoodType.STRESSED:
                pageDescription += " I see you're feeling stressed. Let's focus on manageable tasks and take regular breaks today.";
                break;
            }
          }
        } else if (location.pathname.includes('/today')) {
          pageDescription = "This is your today's study plan. Here you'll find tasks scheduled for today based on your overall study plan.";
        } else if (location.pathname.includes('/concepts')) {
          pageDescription = "You're in the concepts section. Here you can explore and learn key concepts for your exam.";
        } else if (location.pathname.includes('/formula-practice')) {
          pageDescription = "Welcome to the formula practice section. You can practice using different formulas and solve problems here.";
        } else if (location.pathname.includes('/practice-exam')) {
          pageDescription = "This is the practice exam section. You can take practice tests to evaluate your preparation.";
        } else if (location.pathname.includes('/profile')) {
          pageDescription = "You're viewing your profile. Here you can update your personal information and preferences.";
        }
      }
      
      if (pageDescription) {
        // Add a small delay to allow page transition to complete
        setTimeout(() => {
          speakMessage(pageDescription);
        }, 300);
      }
    }
  }, [location.pathname, voiceSettings.enabled, voiceSettings.muted, userName, currentMood, speakMessage]);

  // Process voice commands from transcript
  useEffect(() => {
    if (transcript && isListening) {
      const command = transcript.toLowerCase();
      setActiveCommand(command);
      
      // Simple command processing examples
      if (command.includes('go to dashboard') || command.includes('show dashboard')) {
        window.location.href = '/dashboard/student';
      } else if (command.includes('show today') || command.includes('today plan')) {
        window.location.href = '/dashboard/student/today';
      } else if (command.includes('show concepts') || command.includes('go to concepts')) {
        window.location.href = '/dashboard/student/concepts';
      } else if (command.includes('practice exam') || command.includes('take test')) {
        window.location.href = '/dashboard/student/practice-exam';
      } else if (command.includes('show profile') || command.includes('go to profile')) {
        window.location.href = '/dashboard/student/profile';
      } else if (command.includes('help me') || command.includes('what can i do')) {
        speakMessage("I can help you navigate the app. Try saying: go to dashboard, show today's plan, show concepts, or practice exam.");
      } else if (command.includes('how am i doing') || command.includes('my progress')) {
        speakMessage(`${userName}, you're making good progress on your study plan. Keep up the great work!`);
      }
    }
  }, [transcript, isListening, userName, speakMessage]);

  // Floating controls for voice assistant
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex flex-col gap-2">
        {/* Voice command indicator */}
        {activeCommand && (
          <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md text-sm mb-2">
            <strong>Command:</strong> {activeCommand}
          </div>
        )}
        
        {/* Voice controls */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className={`rounded-full ${isListening ? 'bg-red-100 border-red-300' : 'bg-white dark:bg-gray-800'}`}
            onClick={isListening ? stopListening : startListening}
            title={isListening ? "Stop listening" : "Start voice command"}
          >
            {isListening ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className={`rounded-full bg-white dark:bg-gray-800 ${voiceSettings.muted ? 'border-red-300' : ''}`}
            onClick={() => toggleMute()}
            title={voiceSettings.muted ? "Unmute voice" : "Mute voice"}
          >
            {voiceSettings.muted ? <VolumeX className="h-4 w-4 text-red-500" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VoiceAnnouncer;
