
import React, { useEffect, useState } from 'react';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { MoodType } from '@/types/user/base';

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName: string;
  language?: string;
  mood?: MoodType;
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({ 
  isFirstTimeUser, 
  userName, 
  language = 'en-IN',
  mood 
}) => {
  const { speakMessage, voiceSettings, isVoiceSupported } = useVoiceAnnouncer({
    userName,
    initialSettings: { language },
    isFirstTimeUser,
    mood
  });
  const [greetingPlayed, setGreetingPlayed] = useState(false);

  useEffect(() => {
    // Only welcome the user if voice is supported, enabled, and not muted
    if (isVoiceSupported && voiceSettings.enabled && !voiceSettings.muted && !greetingPlayed) {
      // Delay the greeting to ensure page has loaded
      const timer = setTimeout(() => {
        // Different messages for first time vs returning users
        if (isFirstTimeUser) {
          const firstTimeGreeting = `
            Namaste, ${userName}! I'm your PREPZR AI voice assistant with an Indian accent. 
            Welcome to your personalized NEET exam preparation journey.
            
            Your dashboard is designed to track your progress and optimize your study plan.
            Let me show you around - you can explore different sections like Concept Cards for in-depth learning,
            Flashcards for quick review, and Practice Exams to test your knowledge.
            
            The analytics section will help you identify your strengths and areas needing improvement.
            If you need any assistance, just click on the voice assistant icon at the bottom right corner.
            
            Would you like me to guide you through a quick tour of the platform?
          `;
          speakMessage(firstTimeGreeting);
          setGreetingPlayed(true);
        } else {
          // For returning users, check time of day for appropriate greeting
          const hour = new Date().getHours();
          let timeGreeting = '';
          
          if (hour < 12) timeGreeting = 'Good morning';
          else if (hour < 18) timeGreeting = 'Good afternoon';
          else timeGreeting = 'Good evening';
          
          let moodResponse = '';
          if (mood) {
            switch(mood) {
              case MoodType.HAPPY:
                moodResponse = "I'm glad to see you're in a good mood today! It's a great time to tackle challenging concepts.";
                break;
              case MoodType.TIRED:
                moodResponse = "I notice you're feeling tired. Perhaps focus on review sessions today rather than new concepts.";
                break;
              case MoodType.STRESSED:
                moodResponse = "I see you're feeling stressed. Remember to take short breaks between study sessions.";
                break;
              case MoodType.MOTIVATED:
                moodResponse = "Your motivated mood is perfect for productive study sessions today!";
                break;
              default:
                // No specific mood response
                break;
            }
          }
          
          const returningGreeting = `
            ${timeGreeting}, ${userName}. Welcome back to PREPZR.
            ${moodResponse}
            Your study dashboard is ready with the latest updates. You've made progress since your last visit.
            I recommend checking your analytics section to see your performance trends.
            Click on any section to explore or ask me for assistance with your NEET preparation.
          `;
          speakMessage(returningGreeting);
          setGreetingPlayed(true);
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isFirstTimeUser, userName, speakMessage, isVoiceSupported, voiceSettings.enabled, voiceSettings.muted, greetingPlayed, mood]);

  // This is an invisible component - it only provides voice functionality
  return null;
};

export default VoiceGreeting;
