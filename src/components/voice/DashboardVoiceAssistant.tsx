
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
    isFirstTimeUser: isFirstLoad,
    initialSettings: { language: 'en-IN' } // Setting Indian English as default
  });

  useEffect(() => {
    // Check if this is the first time loading the page in this session
    const hasSeenVoiceGreeting = sessionStorage.getItem('hasSeenVoiceGreeting');
    if (!hasSeenVoiceGreeting && isVoiceSupported && voiceSettings.enabled && !voiceSettings.muted) {
      // Delay the welcome message to make sure the page is loaded
      const timer = setTimeout(() => {
        const isFirstTimeUser = localStorage.getItem('new_user_signup') === 'true';
        const currentPath = window.location.pathname;
        
        let greeting = '';
        
        // Context-aware greetings based on current page
        if (currentPath.includes('/dashboard/student')) {
          greeting = isFirstTimeUser 
            ? `Namaste ${userName || 'there'}! Welcome to your Prep-zer student dashboard. Here you can track your study progress, access concept cards, and prepare for your NEET exams. I'm your voice assistant and I can help you navigate through different sections. Just click the microphone when you need assistance.`
            : `Welcome back to your dashboard, ${userName || 'there'}! Would you like to continue with your study plan or explore concept cards today? Just ask me if you need any help.`;
        } else if (currentPath.includes('/signup')) {
          greeting = `Welcome to the signup page. Please fill in your details to create your Prep-zer account. Don't forget to include your school or institute details for a more personalized experience.`;
        } else if (currentPath.includes('/login')) {
          greeting = `Welcome to the login page. Please enter your credentials to access your Prep-zer account.`;
        } else {
          greeting = isFirstTimeUser 
            ? `Welcome to Prep-zer, ${userName || 'there'}! I'm your voice assistant with an Indian accent. I can help you navigate the platform and provide study suggestions for your NEET preparation. Just click the microphone icon when you need me.`
            : `Welcome back, ${userName || 'there'}! I'm here to help with your NEET studies today. Click the microphone if you need assistance.`;
        }
        
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
      
      // Provide context-aware response based on mood
      const currentPath = window.location.pathname;
      
      if (currentPath.includes('/dashboard/student')) {
        if (newMood === MoodType.STRESSED || newMood === MoodType.ANXIOUS || newMood === MoodType.OVERWHELMED) {
          speakMessage("I notice you're feeling stressed. Would you like to try a quick mindfulness exercise or view some relaxation content in the Feel Good Corner?");
        } else if (newMood === MoodType.MOTIVATED || newMood === MoodType.FOCUSED) {
          speakMessage("Great to see you're feeling motivated! This is the perfect time to tackle some challenging concepts or practice questions.");
        } else if (newMood === MoodType.TIRED) {
          speakMessage("I understand you're feeling tired. Consider taking a short break or exploring easier topics today.");
        }
      }
    }
  };

  const handleNavigationCommand = (route: string) => {
    if (route) {
      // Context-aware navigation responses
      switch (route) {
        case '/dashboard/student':
          speakMessage("Taking you to your student dashboard where you can see your study overview.");
          break;
        case '/dashboard/student/concepts':
          speakMessage("Navigating to concept cards where you can study key NEET topics with visual aids and formulas.");
          break;
        case '/dashboard/student/flashcards':
          speakMessage("Opening your flashcards section for quick revision of important facts.");
          break;
        case '/dashboard/student/practice':
          speakMessage("Taking you to practice exams where you can test your knowledge with NEET-style questions.");
          break;
        default:
          speakMessage(`Navigating to ${route}`);
      }
      
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
      language="en-IN" // Set Indian English as default
    />
  );
};

export default DashboardVoiceAssistant;
