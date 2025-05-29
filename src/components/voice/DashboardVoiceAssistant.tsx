
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSmartVoiceAssistant } from '@/hooks/useSmartVoiceAssistant';

interface DashboardVoiceAssistantProps {
  userName?: string;
  userProgress?: {
    overallProgress: number;
    studyStreak: number;
    completedLessons: number;
    examReadinessScore: number;
  };
  onSpeakingChange?: (isSpeaking: boolean) => void;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({ 
  userName,
  userProgress,
  onSpeakingChange 
}) => {
  const location = useLocation();
  const isDashboard = location.pathname.includes('/dashboard');
  const [isInvoked, setIsInvoked] = useState(false);
  
  const { isSpeaking, speak, processCommand } = useSmartVoiceAssistant({
    context: 'dashboard',
    userName,
    inactivityTimeout: 60000, // 60 seconds for dashboard
    enableInactivityPrompts: false // Silent unless invoked
  });
  
  // Notify parent component of speaking state changes
  useEffect(() => {
    if (onSpeakingChange) {
      onSpeakingChange(isSpeaking);
    }
  }, [isSpeaking, onSpeakingChange]);
  
  // Enhanced command processing for dashboard
  const processDashboardCommand = (command: string): boolean => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('progress') || lowerCommand.includes('how am i doing')) {
      if (userProgress) {
        speak(`You're doing great, ${userName}! Your overall progress is at ${userProgress.overallProgress}%, and you have a ${userProgress.studyStreak}-day study streak. Keep it up!`);
      } else {
        speak("You're making good progress in your studies. Keep maintaining consistency for better results!");
      }
      return true;
    }
    
    if (lowerCommand.includes('motivation') || lowerCommand.includes('encourage')) {
      const motivationalMessages = [
        `${userName}, every expert was once a beginner. Your consistent effort is building towards success!`,
        "Remember, each study session brings you closer to your goal. You're investing in your future!",
        "Your dedication today determines your success tomorrow. Keep pushing forward!",
        "Challenges are what make life interesting. Overcoming them is what makes life meaningful!"
      ];
      const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      speak(randomMessage);
      return true;
    }
    
    if (lowerCommand.includes('next topic') || lowerCommand.includes('what should i study')) {
      speak("Based on your progress, I recommend focusing on your weakest subjects first, then reinforcing your strong areas. Check your personalized study plan for specific recommendations.");
      return true;
    }
    
    if (lowerCommand.includes('streak') || lowerCommand.includes('consistency')) {
      if (userProgress?.studyStreak) {
        speak(`Amazing! You have a ${userProgress.studyStreak}-day study streak. Consistency is key to exam success!`);
      } else {
        speak("Building a study streak is crucial for success. Try to study a little bit every day to maintain momentum!");
      }
      return true;
    }
    
    return processCommand(command);
  };
  
  // Handle voice commands and invocation
  useEffect(() => {
    const handleVoiceCommand = (event: CustomEvent) => {
      const command = event.detail.command;
      if (command && isDashboard) {
        setIsInvoked(true);
        const handled = processDashboardCommand(command);
        if (!handled) {
          // Default response for unrecognized commands
          speak("I can help you with your study progress, motivation, or suggest what to study next. What would you like to know?");
        }
      }
    };
    
    const handleVoiceInvoke = () => {
      setIsInvoked(true);
      speak(`Hi ${userName}! I'm here to help with your studies. You can ask about your progress, get motivation, or ask what to study next.`);
    };
    
    window.addEventListener('voice-command', handleVoiceCommand as EventListener);
    window.addEventListener('invoke-dashboard-voice', handleVoiceInvoke);
    
    return () => {
      window.removeEventListener('voice-command', handleVoiceCommand as EventListener);
      window.removeEventListener('invoke-dashboard-voice', handleVoiceInvoke);
    };
  }, [isDashboard, userName, userProgress]);
  
  // Don't render anything if not on dashboard
  if (!isDashboard) {
    return null;
  }
  
  return null; // This component only handles voice logic
};

export default DashboardVoiceAssistant;
