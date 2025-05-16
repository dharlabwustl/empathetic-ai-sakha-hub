
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import FloatingVoiceAssistant from './FloatingVoiceAssistant';
import { MoodType } from '@/types/user/base';
import { useToast } from '@/hooks/use-toast';

interface DashboardVoiceAssistantProps {
  userName?: string;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({
  userName,
  currentMood,
  onMoodChange
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  
  const { 
    speakMessage, 
    isVoiceSupported,
    voiceSettings,
    toggleMute
  } = useVoiceAnnouncer({
    userName,
    mood: currentMood,
    isFirstTimeUser: isFirstLoad
  });

  useEffect(() => {
    // Check if this is the first time loading the page in this session
    const hasSeenVoiceGreeting = sessionStorage.getItem('hasSeenVoiceGreeting');
    if (!hasSeenVoiceGreeting && isVoiceSupported && voiceSettings.enabled && !voiceSettings.muted) {
      // Delay the welcome message to make sure the page is loaded
      const timer = setTimeout(() => {
        const isFirstTimeUser = localStorage.getItem('new_user_signup') === 'true';
        const greeting = isFirstTimeUser 
          ? `Welcome to PREPZR, ${userName || 'there'}! I'm your voice assistant. I can help you navigate the platform and provide study suggestions. Just click the microphone icon when you need me.`
          : `Welcome back, ${userName || 'there'}! I'm here to help with your studies today. Click the microphone if you need assistance.`;
        
        speakMessage(greeting);
        sessionStorage.setItem('hasSeenVoiceGreeting', 'true');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
    setIsFirstLoad(false);
  }, [isVoiceSupported, userName, speakMessage, voiceSettings.enabled, voiceSettings.muted]);

  const handleMoodCommand = (moodString: string) => {
    let newMood: MoodType | undefined;
    
    // Convert string to MoodType enum
    switch (moodString.toUpperCase()) {
      case 'HAPPY': newMood = MoodType.HAPPY; break;
      case 'MOTIVATED': newMood = MoodType.MOTIVATED; break;
      case 'FOCUSED': newMood = MoodType.FOCUSED; break;
      case 'TIRED': newMood = MoodType.TIRED; break;
      case 'STRESSED': newMood = MoodType.STRESSED; break;
      case 'ANXIOUS': newMood = MoodType.ANXIOUS; break;
      case 'OVERWHELMED': newMood = MoodType.OVERWHELMED; break;
      case 'CONFUSED': newMood = MoodType.CONFUSED; break;
      case 'CURIOUS': newMood = MoodType.CURIOUS; break;
      case 'CALM': newMood = MoodType.CALM; break;
      case 'NEUTRAL': newMood = MoodType.NEUTRAL; break;
      default: return; // Invalid mood
    }
    
    if (newMood && onMoodChange) {
      onMoodChange(newMood);
      toast({
        title: "Mood Updated",
        description: `Your mood has been updated to ${moodString}`,
      });
    }
  };

  const handleNavigationCommand = (route: string) => {
    if (route) {
      navigate(route);
      toast({
        title: "Navigating",
        description: `Taking you to ${route}`,
      });
    }
  };

  return (
    <FloatingVoiceAssistant
      userName={userName}
      currentMood={currentMood ? currentMood.toString() : undefined}
      onMoodCommand={handleMoodCommand}
      onNavigationCommand={handleNavigationCommand}
      pronouncePrepzr={true}
    />
  );
};

export default DashboardVoiceAssistant;
