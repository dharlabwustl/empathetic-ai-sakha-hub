
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'react-router-dom';

interface HomePageVoiceAssistantProps {
  language?: string;
}

const HomePageVoiceAssistant: React.FC<HomePageVoiceAssistantProps> = ({ 
  language = 'hi-IN' // Setting Hindi as default
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
        const isGoogleSignup = localStorage.getItem('google_signup') === 'true';
        
        // Determine appropriate welcome message based on page and user status
        if (location.pathname === '/') {
          if (user) {
            if (language === 'hi-IN') {
              message = `Prep-zer पर वापस आने के लिए स्वागत है। क्या आप अपनी NEET परीक्षा की तैयारी जारी रखना चाहेंगे?`;
            } else {
              message = `Welcome back to Prep-zer. Would you like to continue your NEET exam preparation journey?`;
            }
          } else {
            if (language === 'hi-IN') {
              message = `Prep-zer में आपका स्वागत है, आपका AI-संचालित परीक्षा तैयारी प्लेटफॉर्म। मैं आपका आवाज सहायक हूँ और मैं आपको हमारी सुविधाओं के बारे में मार्गदर्शन कर सकता हूँ। क्या आप NEET के लिए हमारा मुफ्त परीक्षा तैयारी परीक्षण आज़माना चाहेंगे?`;
            } else {
              message = `Welcome to Prep-zer, your AI-powered exam preparation platform. I'm your voice assistant and I can guide you through our features. Would you like to try our free exam readiness test for NEET?`;
            }
          }
        } else if (location.pathname.includes('/signup')) {
          if (language === 'hi-IN') {
            message = `Prep-zer के नि:शुल्क परीक्षण साइनअप में आपका स्वागत है। 7 दिनों के लिए हमारे AI-संचालित परीक्षा तैयारी उपकरणों तक पहुंच प्राप्त करें। मैं आपको शुरू करने में मदद करने के लिए यहां हूँ।`;
          } else {
            message = `Welcome to Prep-zer's free trial signup. Get access to our AI-powered exam preparation tools for 7 days. I'm here to help you get started.`;
          }
          
          // If this is a Google signup, store this information for later use in the onboarding flow
          if (isGoogleSignup) {
            localStorage.setItem('needs_study_plan_creation', 'true');
          }
        }
        
        if (message) {
          speakMessage(message);
          setGreetingPlayed(true);
        }
      }, delayTime);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, user, greetingPlayed, delayTime, language]);

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create utterance with proper PREPZR pronunciation (Prep-zer) with a pause between syllables
      const correctedText = text.replace(/PREPZR/gi, 'Prep-zer').replace(/prepzr/gi, 'Prep-zer').replace(/Prepzr/g, 'Prep-zer');
      const utterance = new SpeechSynthesisUtterance(correctedText);
      
      // Use voices API to find an appropriate voice based on language
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice = null;
      
      if (language === 'hi-IN') {
        // Try to find a Hindi female voice
        selectedVoice = voices.find(v => 
          v.lang === 'hi-IN' || v.lang.includes('hi') && 
          (v.name.toLowerCase().includes('female') || v.name.includes('Kalpana'))
        );
      } else if (language === 'en-IN') {
        // Try to find an Indian English voice
        selectedVoice = voices.find(v => 
          (v.lang === 'en-IN' || v.name.includes('Indian')) && 
          (v.name.toLowerCase().includes('female') || v.name.includes('Kalpana') || v.name.includes('Kajal'))
        );
      }
      
      // If no specific voice found, try to find any voice matching the language
      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang === language);
      }
      
      // If still no match, use default voice
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      // Set properties
      utterance.lang = language;
      utterance.rate = 0.9; // Slightly slower for better comprehension
      utterance.pitch = 1.1; // Slightly higher pitch for female voice
      utterance.volume = 0.8;
      
      // Speak the message
      window.speechSynthesis.speak(utterance);
      
      // Dispatch event to notify other components
      document.dispatchEvent(new CustomEvent('voice-speaking-started', {
        detail: { message: correctedText }
      }));
      
      utterance.onend = () => {
        document.dispatchEvent(new Event('voice-speaking-ended'));
      };
    }
  };

  // This is an invisible component - it only provides voice functionality
  return null;
};

export default HomePageVoiceAssistant;
