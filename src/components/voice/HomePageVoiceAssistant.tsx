
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'react-router-dom';

interface HomePageVoiceAssistantProps {
  language?: string;
}

const HomePageVoiceAssistant: React.FC<HomePageVoiceAssistantProps> = ({ 
  language = 'en-IN' // Setting English (India) as default
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
        const isNewUserSignup = localStorage.getItem('new_user_signup') === 'true';
        
        // Determine appropriate welcome message based on page and user status
        if (location.pathname === '/') {
          if (user) {
            if (language === 'hi-IN') {
              message = `प्रेप-ज़र पर वापस आने के लिए स्वागत है। क्या आप अपनी NEET परीक्षा की तैयारी जारी रखना चाहेंगे?`;
            } else {
              message = `Welcome back to Prep-zer. Would you like to continue your NEET exam preparation journey?`;
            }
          } else {
            if (language === 'hi-IN') {
              message = `प्रेप-ज़र में आपका स्वागत है, आपका AI-संचालित परीक्षा तैयारी प्लेटफॉर्म। मैं आपका आवाज सहायक हूँ और मैं आपको हमारी सुविधाओं के बारे में मार्गदर्शन कर सकता हूँ। हमारी AI-आधारित अध्ययन योजना और अनुकूलित अवधारणा कार्ड आपको परीक्षा के लिए सबसे प्रभावी ढंग से तैयार करने में मदद करेंगे।`;
            } else {
              message = `Welcome to Prep-zer, your AI-powered exam preparation platform. I'm your voice assistant and I can guide you through our features. Our AI-based study plans and personalized concept cards will help you prepare for your exams in the most effective way possible. Would you like me to tell you more about our personalized study plans?`;
            }
          }
        } else if (location.pathname.includes('/signup')) {
          if (language === 'hi-IN') {
            message = `प्रेप-ज़र के साथ आपका यात्रा शुरू हो गई है! हमारे AI-संचालित परीक्षा तैयारी उपकरण आपको अपने लक्ष्यों को प्राप्त करने में मदद करेंगे। आपके अद्वितीय सीखने की शैली के आधार पर, हम आपके लिए एक व्यक्तिगत अध्ययन योजना बनाएंगे जो आपकी प्रगति के साथ अनुकूलित होगी।`;
          } else {
            message = `Your journey with Prep-zer has begun! Our AI-powered exam preparation tools will help you achieve your goals. Based on your unique learning style, we'll create a personalized study plan that adapts as you progress. Get ready for smart flashcards, interactive concept maps, and real-time progress tracking - the smartest way to prepare for your exams!`;
          }
        } else if (location.pathname.includes('/welcome-flow')) {
          if (language === 'hi-IN') {
            message = `प्रेप-ज़र के साथ आपकी तैयारी यात्रा शुरू हो रही है। अपने डैशबोर्ड पर, आप अपनी अध्ययन योजना, अवधारणा कार्ड और परीक्षण का विश्लेषण देख सकते हैं। हमारा AI ट्यूटर 24/7 आपकी मदद के लिए उपलब्ध है, और हमारे अनुकूलित फ्लैशकार्ड आपको महत्वपूर्ण अवधारणाओं को याद रखने में मदद करेंगे। आपकी परीक्षा तैयारी का यह नया तरीका आपको उच्च स्कोर प्राप्त करने में मदद करेगा।`;
          } else {
            message = `Your preparation journey with Prep-zer is beginning. On your dashboard, you'll see your study plan, concept cards, and test analytics. Our AI tutor is available 24/7 to assist you, and our adaptive flashcards will help you memorize key concepts. This new way of exam preparation will help you achieve higher scores and better understanding of complex topics.`;
          }
        } else if (location.pathname.includes('/welcome-back')) {
          if (language === 'hi-IN') {
            message = `प्रेप-ज़र पर वापस स्वागत है। आपका अध्ययन डैशबोर्ड और व्यक्तिगत अध्ययन योजना आपका इंतज़ार कर रहे हैं। आप जहां छोड़ा था, वहीं से शुरू करें और अपनी परीक्षा तैयारी को अगले स्तर पर ले जाएँ।`;
          } else {
            message = `Welcome back to Prep-zer. Your study dashboard and personalized study plan are waiting for you. Pick up where you left off and take your exam preparation to the next level with our AI-powered learning tools and adaptive study materials.`;
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
