
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'react-router-dom';

interface HomePageVoiceAssistantProps {
  language?: string;
}

const HomePageVoiceAssistant: React.FC<HomePageVoiceAssistantProps> = ({ 
  language = 'en-IN' // Setting English as default, with India accent
}) => {
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  
  // Only play greeting on specific pages, not on concept pages or dashboard pages
  const shouldPlayGreeting = location.pathname === '/' || 
                            location.pathname.includes('/signup') ||
                            location.pathname.includes('/welcome-back') ||
                            location.pathname.includes('/welcome-flow');
  
  // If this is the homepage, use a 4-second delay to allow for page load
  // If this is another page, use a shorter delay
  const delayTime = location.pathname === '/' ? 4000 : 2000;
  
  useEffect(() => {
    // Only play the greeting if speech synthesis is supported and we're on the right page
    if ('speechSynthesis' in window && !greetingPlayed && shouldPlayGreeting) {
      const timer = setTimeout(() => {
        let message = '';
        const isGoogleSignup = localStorage.getItem('google_signup') === 'true';
        const isWelcomeFlow = location.pathname.includes('/welcome-flow');
        
        // Determine appropriate welcome message based on page and user status
        if (location.pathname === '/') {
          if (user) {
            if (language === 'hi-IN') {
              message = `प्रेप-ज़र पर वापस आने के लिए स्वागत है। क्या आप अपनी NEET परीक्षा की तैयारी जारी रखना चाहेंगे?`;
            } else {
              message = `Welcome back to PREPZR. Would you like to continue your NEET exam preparation journey?`;
            }
          } else {
            if (language === 'hi-IN') {
              message = `प्रेप-ज़र में आपका स्वागत है, आपका AI-संचालित परीक्षा तैयारी प्लेटफॉर्म। मैं आपका आवाज सहायक हूँ और मैं आपको हमारी सुविधाओं के बारे में मार्गदर्शन कर सकता हूँ। क्या आप NEET के लिए हमारा मुफ्त परीक्षा तैयारी परीक्षण आज़माना चाहेंगे?`;
            } else {
              message = `Welcome to PREPZR, your AI-powered exam preparation platform. I'm your voice assistant and I can guide you through our features. Would you like to try our free exam readiness test for NEET?`;
            }
          }
        } else if (location.pathname.includes('/signup')) {
          if (language === 'hi-IN') {
            message = `प्रेप-ज़र के नि:शुल्क परीक्षण साइनअप में आपका स्वागत है। 7 दिनों के लिए हमारे AI-संचालित परीक्षा तैयारी उपकरणों तक पहुंच प्राप्त करें। मैं आपको शुरू करने में मदद करने के लिए यहां हूँ।`;
          } else {
            message = `Welcome to PREPZR's free trial signup. Get access to our AI-powered exam preparation tools for 7 days. I'm here to help you get started. Our platform features personalized study plans, adaptive learning, and practice tests to maximize your exam performance.`;
          }
          
          // If this is a Google signup, store this information for later use in the onboarding flow
          if (isGoogleSignup) {
            localStorage.setItem('needs_study_plan_creation', 'true');
          }
        } else if (location.pathname.includes('/welcome-back')) {
          if (language === 'hi-IN') {
            message = `प्रेप-ज़र पर वापस स्वागत है। बस अपने ईमेल और पासवर्ड के साथ लॉगिन करें और हम आपके पढ़ाई के यात्रा को जारी रख सकते हैं।`;
          } else {
            message = `Welcome back to PREPZR. Simply log in with your email and password, and we can continue your study journey. Your personal AI tutor is ready to help you improve your exam readiness score.`;
          }
        } else if (isWelcomeFlow) {
          if (language === 'hi-IN') {
            message = `प्रेप-ज़र में आपका स्वागत है! हम आपको एक व्यक्तिगत अध्ययन योजना बनाने में मदद करेंगे जो आपकी सीखने की शैली और आपके लक्ष्यों के अनुकूल है। हमारा AI-संचालित प्लेटफॉर्म आपकी NEET परीक्षा की तैयारी के लिए व्यक्तिगत अध्ययन योजनाओं, अनुकूली लर्निंग और प्रदर्शन विश्लेषण प्रदान करता है। `;
          } else {
            message = `Welcome to PREPZR! We'll help you create a personalized study plan tailored to your learning style and goals. Our AI-powered platform offers personalized study plans, adaptive learning, and performance analytics for your NEET exam preparation. You've made an excellent choice for your exam success.`;
          }
        }
        
        if (message) {
          speakMessage(message);
          setGreetingPlayed(true);
        }
      }, delayTime);
      
      return () => clearTimeout(timer);
    }
    
    // Reset the played state when navigating to a different page
    return () => {
      if (location.pathname) {
        setGreetingPlayed(false);
      }
    };
  }, [location.pathname, user, greetingPlayed, delayTime, language, shouldPlayGreeting]);

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
      utterance.rate = 1.0; // Normal speed for better comprehension
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
