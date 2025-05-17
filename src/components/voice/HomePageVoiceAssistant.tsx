
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'react-router-dom';
import { DEFAULT_VOICE_SETTINGS, speakMessage, getTimeBasedGreeting } from '@/components/dashboard/student/voice/voiceUtils';

interface HomePageVoiceAssistantProps {
  language?: string;
}

const HomePageVoiceAssistant: React.FC<HomePageVoiceAssistantProps> = ({ 
  language = 'hi-IN'  // Default to Hindi
}) => {
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  
  // If this is the homepage, use a 4-second delay to allow for page load
  // If this is another page, use a shorter delay
  const delayTime = location.pathname === '/' ? 4000 : 2000;
  
  useEffect(() => {
    // Only play the greeting if speech synthesis is supported
    if ('speechSynthesis' in window && !greetingPlayed) {
      const timer = setTimeout(() => {
        let message = '';
        const isFirstTimeUser = localStorage.getItem('new_user_signup') === 'true';
        
        // Hindi greetings
        if (language === 'hi-IN') {
          // Determine appropriate Hindi welcome message based on page and user status
          if (location.pathname === '/') {
            if (user) {
              message = `${getTimeBasedGreeting(language)} प्रेप ज़र पर वापस आने के लिए धन्यवाद। क्या आप अपनी नीट परीक्षा की तैयारी जारी रखना चाहेंगे?`;
            } else {
              message = `${getTimeBasedGreeting(language)} प्रेप ज़र में आपका स्वागत है, आपका AI-संचालित परीक्षा तैयारी प्लेटफॉर्म। मैं आपका वॉयस असिस्टेंट हूं और मैं आपको हमारी विशेषताओं के बारे में मार्गदर्शन कर सकता हूं। क्या आप नीट के लिए हमारे मुफ्त परीक्षा तैयारी टेस्ट का प्रयास करना चाहेंगे?`;
            }
          } else if (location.pathname.includes('/signup')) {
            message = `प्रेप ज़र के फ्री ट्रायल साइनअप में आपका स्वागत है। 7 दिनों के लिए हमारे AI-संचालित परीक्षा तैयारी टूल्स तक पहुंच प्राप्त करें। मैं आपको शुरू करने में मदद करने के लिए यहां हूं।`;
          }
        } else {
          // English or other language greetings
          if (location.pathname === '/') {
            if (user) {
              message = `${getTimeBasedGreeting(language)} Welcome back to Prep zer. Would you like to continue your NEET exam preparation journey?`;
            } else {
              message = `${getTimeBasedGreeting(language)} Welcome to Prep zer, your AI-powered exam preparation platform. I'm your voice assistant and I can guide you through our features. Would you like to try our free exam readiness test for NEET?`;
            }
          } else if (location.pathname.includes('/signup')) {
            message = `Welcome to Prep zer's free trial signup. Get access to our AI-powered exam preparation tools for 7 days. I'm here to help you get started.`;
          }
        }
        
        if (message) {
          // Use the enhanced speakMessage function
          speakMessage(message, { ...DEFAULT_VOICE_SETTINGS, language });
          setGreetingPlayed(true);
        }
      }, delayTime);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, user, greetingPlayed, delayTime, language]);

  // This is an invisible component - it only provides voice functionality
  return null;
};

export default HomePageVoiceAssistant;
