
import React, { useEffect, useState } from 'react';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { MoodType } from '@/types/user/base';
import { useLocation } from 'react-router-dom';

interface DashboardVoiceAssistantProps {
  userName: string;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({
  userName,
  currentMood,
  onMoodChange
}) => {
  const location = useLocation();
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const [lastPath, setLastPath] = useState(location.pathname);
  
  const { 
    speakMessage, 
    isVoiceSupported, 
    voiceSettings,
    startListening,
    transcript,
    isListening,
    stopListening
  } = useVoiceAnnouncer({
    userName,
    initialSettings: { 
      language: 'en-IN', // Default to Indian English
      rate: 0.95, 
      pitch: 1.0,
      enabled: true 
    }
  });

  // Welcome message when dashboard first loads
  useEffect(() => {
    // Check if we should show welcome message
    const isFirstVisit = sessionStorage.getItem('dashboard_welcomed') !== 'true';
    
    if (isVoiceSupported && voiceSettings.enabled && !voiceSettings.muted && isFirstVisit && !hasWelcomed) {
      // Delay welcome message slightly to ensure UI has loaded
      const timer = setTimeout(() => {
        let welcomeMessage = '';
        
        if (location.pathname.includes('dashboard/student')) {
          welcomeMessage = `Welcome to your personalized PREPZR dashboard, ${userName}. Here you can track your study progress, access your personalized study plan, practice with concept cards, and analyze your performance. Use the sidebar navigation to explore different sections. If you need any help, just click the voice assistant button at the bottom of the screen.`;
        } else if (location.pathname.includes('admin')) {
          welcomeMessage = `Welcome to the PREPZR admin dashboard. Here you can manage users, content, and monitor system performance. The sidebar contains all the administrative tools you need.`;
        } else {
          welcomeMessage = `Welcome to PREPZR, ${userName}. I'm your voice assistant and I'll help you navigate through the platform.`;
        }
        
        speakMessage(welcomeMessage);
        setHasWelcomed(true);
        sessionStorage.setItem('dashboard_welcomed', 'true');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isVoiceSupported, voiceSettings.enabled, voiceSettings.muted, hasWelcomed, userName, location.pathname, speakMessage]);

  // Provide contextual guidance based on path changes
  useEffect(() => {
    if (location.pathname !== lastPath && isVoiceSupported && voiceSettings.enabled && !voiceSettings.muted) {
      setLastPath(location.pathname);
      
      // Only speak if the user has already been welcomed
      if (sessionStorage.getItem('dashboard_welcomed') === 'true') {
        const timer = setTimeout(() => {
          let pathMessage = '';
          
          // Provide context-specific messages based on the current path
          if (location.pathname.includes('/dashboard/student/analytics')) {
            pathMessage = `The analytics dashboard shows your performance metrics and study patterns. Here you can see your progress, identify weak areas, and get personalized recommendations.`;
          } else if (location.pathname.includes('/dashboard/student/concepts')) {
            pathMessage = `The concept cards section contains all the key topics for your exam. Each card has summaries, explanations, formulas, visuals, and practice questions to test your understanding.`;
          } else if (location.pathname.includes('/dashboard/student/plan')) {
            pathMessage = `This is your personalized study plan, designed based on your learning style, goals, and current progress. It adapts as you learn and identifies the optimal path to exam success.`;
          } else if (location.pathname.includes('/dashboard/student/practice')) {
            pathMessage = `In the practice section, you can take mock tests and solve targeted questions to prepare for your exam. Each attempt is analyzed to help improve your performance.`;
          } else if (location.pathname.includes('/dashboard/student/profile')) {
            pathMessage = `This is your profile page where you can update your personal information, preferences, and settings. You can also track your overall progress here.`;
          }
          
          if (pathMessage) {
            speakMessage(pathMessage);
          }
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [location.pathname, lastPath, isVoiceSupported, voiceSettings.enabled, voiceSettings.muted, speakMessage]);

  // Process voice commands
  useEffect(() => {
    if (transcript) {
      const lowerTranscript = transcript.toLowerCase();
      
      // Handle mood-related commands
      if (lowerTranscript.includes('feeling') || lowerTranscript.includes('mood')) {
        const moodMap: Record<string, MoodType> = {
          'happy': MoodType.HAPPY,
          'motivated': MoodType.MOTIVATED,
          'focused': MoodType.FOCUSED,
          'calm': MoodType.CALM,
          'tired': MoodType.TIRED,
          'confused': MoodType.CONFUSED,
          'anxious': MoodType.ANXIOUS,
          'stressed': MoodType.STRESSED,
        };
        
        let detectedMood: MoodType | null = null;
        
        Object.entries(moodMap).forEach(([keyword, mood]) => {
          if (lowerTranscript.includes(keyword)) {
            detectedMood = mood;
          }
        });
        
        if (detectedMood && onMoodChange) {
          speakMessage(`I've updated your mood to ${detectedMood.toLowerCase()}. I'll adjust recommendations based on this.`);
          onMoodChange(detectedMood);
        }
      }
      
      // Handle navigation commands
      else if (lowerTranscript.includes('go to') || lowerTranscript.includes('open') || lowerTranscript.includes('show')) {
        if (lowerTranscript.includes('dashboard') || lowerTranscript.includes('home')) {
          speakMessage("Opening dashboard");
          window.location.href = '/dashboard/student';
        } else if (lowerTranscript.includes('analytics') || lowerTranscript.includes('performance')) {
          speakMessage("Opening analytics");
          window.location.href = '/dashboard/student/analytics';
        } else if (lowerTranscript.includes('concepts') || lowerTranscript.includes('cards')) {
          speakMessage("Opening concept cards");
          window.location.href = '/dashboard/student/concepts';
        } else if (lowerTranscript.includes('plan') || lowerTranscript.includes('study plan')) {
          speakMessage("Opening your study plan");
          window.location.href = '/dashboard/student/plan';
        } else if (lowerTranscript.includes('practice') || lowerTranscript.includes('tests')) {
          speakMessage("Opening practice tests");
          window.location.href = '/dashboard/student/practice';
        } else if (lowerTranscript.includes('profile') || lowerTranscript.includes('settings')) {
          speakMessage("Opening your profile");
          window.location.href = '/dashboard/student/profile';
        }
      }
      
      // Help commands
      else if (lowerTranscript.includes('help') || lowerTranscript.includes('what can you do')) {
        speakMessage(`I can help you navigate through PREPZR, update your mood, and provide information about different features. 
          Try saying things like "Go to analytics", "I'm feeling motivated", or "Tell me about concept cards".`);
      }
      
      // Stop listening after processing command
      if (isListening) {
        stopListening();
      }
    }
  }, [transcript, isListening, stopListening, onMoodChange, speakMessage]);

  // This component doesn't render anything visible
  return null;
};

export default DashboardVoiceAssistant;
