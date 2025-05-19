
import React, { useEffect, useState } from 'react';
import { Volume, Volume2, VolumeX } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName?: string;
  language?: 'en' | 'hi';
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({ 
  isFirstTimeUser, 
  userName = 'Student',
  language = 'en'
}) => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const location = useLocation();
  const { speakMessage } = useVoiceAnnouncer({
    userName,
    isFirstTimeUser
  });
  
  // Check if this is a concept detail page or welcome flow page
  const isConceptPage = location.pathname.includes('/concepts/') && !location.pathname.includes('/concepts/formula-lab');
  const isWelcomePage = location.pathname.includes('/welcome-flow') || location.pathname.includes('/welcome-back');
  const isDashboardPage = location.pathname.includes('/dashboard');
  
  // Get current page context
  const getCurrentPageContext = (pathname: string): string => {
    if (pathname.includes('/welcome-flow') || pathname.includes('/welcome-back')) {
      return 'welcome';
    } else if (pathname.includes('/concepts/')) {
      return 'concept';
    } else if (pathname.includes('/dashboard')) {
      return 'dashboard';
    } else if (pathname === '/') {
      return 'home';
    } else if (pathname.includes('/signup')) {
      return 'signup';
    }
    return 'other';
  };
  
  const currentPageContext = getCurrentPageContext(location.pathname);
  
  // Check if a greeting has been played in this session for this specific page context
  const sessionStorageKey = `voiceGreeting_${currentPageContext}_played`;
  
  useEffect(() => {
    // Check if the greeting has been played already for this context in this session
    const hasPlayedForContext = sessionStorage.getItem(sessionStorageKey) === 'true';
    
    // Only play for specific contexts and when not muted
    if (((isFirstTimeUser && !hasPlayedForContext && !audioPlayed && !audioMuted) || 
        (isConceptPage && !hasPlayedForContext && !audioPlayed && !audioMuted) ||
        (isWelcomePage && !hasPlayedForContext && !audioPlayed && !audioMuted) ||
        (isDashboardPage && isFirstTimeUser && !hasPlayedForContext && !audioPlayed && !audioMuted))) {
      
      const playGreeting = async () => {
        try {
          // Use a timeout to ensure the component is fully mounted
          setTimeout(() => {
            setAudioPlaying(true);
            
            // Get context-aware greeting message
            const welcomeText = getContextAwareGreeting(currentPageContext, userName, language);
            
            // Play the greeting with our centralized voice system
            speakMessage(welcomeText);
            
            // Setup event listeners to track when speech is done
            document.addEventListener('voice-speaking-ended', handleSpeechEnd);
          }, 1500);
        } catch (error) {
          console.error("Error playing greeting:", error);
          setAudioPlayed(true);
          sessionStorage.setItem(sessionStorageKey, 'true');
        }
      };
      
      playGreeting();
    }
    
    // Cleanup on unmount
    return () => {
      document.removeEventListener('voice-speaking-ended', handleSpeechEnd);
      if (audioPlaying && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isFirstTimeUser, userName, language, audioPlayed, audioMuted, location.pathname, isConceptPage, isWelcomePage, isDashboardPage, currentPageContext]);
  
  const handleSpeechEnd = () => {
    setAudioPlaying(false);
    setAudioPlayed(true);
    sessionStorage.setItem(sessionStorageKey, 'true');
    document.removeEventListener('voice-speaking-ended', handleSpeechEnd);
  };
  
  // Generate context-aware greeting based on current page, user engagement level
  const getContextAwareGreeting = (
    contextType: string, 
    name: string, 
    lang: string
  ): string => {
    // Determine time of day for more personalized greeting
    const hour = new Date().getHours();
    let timeGreeting = 'Hello';
    if (hour < 12) timeGreeting = 'Good morning';
    else if (hour < 17) timeGreeting = 'Good afternoon';
    else timeGreeting = 'Good evening';
    
    // The UN sustainability goals message to replace donation messaging
    const sustainabilityMessage = "PREP-zer supports UN Sustainability goals with inclusive and equitable quality education. We're committed to providing equal access to personalized learning for all students. ";
    
    if (lang === 'en') {
      if (contextType === 'welcome') {
        return `Welcome to Prep-zer, ${name}! I'm Sakha AI, your personalized learning assistant. Our emotionally-aware, hyper-personalized platform offers adaptive study plans, practice tests, and recommendations tailored to your unique learning style. ${sustainabilityMessage} I'm here to guide you through our key features - from concept cards to flashcards, formula lab, and academic advising. Just ask if you need any assistance with your exam preparation.`;
      } else if (contextType === 'concept') {
        return `Hello ${name}, I've loaded your concept details. You can read through the material, take notes, and use the Read Aloud feature if you prefer listening. Would you like me to help explain any part of this concept or direct you to related study materials?`;
      } else if (contextType === 'dashboard') {
        return `${timeGreeting} ${name}! Welcome to your emotionally intelligent dashboard. ${sustainabilityMessage} I'm your AI learning companion, and I adapt to your learning style, mood, and environment to optimize your study experience. I can help you navigate to your study plan, concept cards, flashcards, practice exams, or formula lab. What would you like to focus on today?`;
      } else if (contextType === 'signup') {
        return `Congratulations ${name} on joining PREP-zer! You've made an excellent choice for your exam preparation journey. ${sustainabilityMessage} As your adaptive learning assistant, I'll personalize your study experience based on your learning patterns, mood, and goals. I can help you explore our features, create study plans, access concept cards, or prepare practice tests. What would you like to explore first?`;
      } else if (contextType === 'home') {
        return `Welcome to PREP-zer, the world's first emotionally aware exam preparation platform. I'm Sakha AI, and I adapt to your learning style to create a hyper-personalized study experience. Our platform helps with confidence building, exam success, time saving, stress-free preparation, and happy learning. ${sustainabilityMessage} Would you like to learn more about our features or get started with a free trial?`;
      } else {
        return `${timeGreeting} ${name}! Welcome to PREP-zer, your emotionally-aware, hyper-personalized exam preparation platform. ${sustainabilityMessage} I'm here to assist with any questions about our features or how to get started.`;
      }
    } else if (lang === 'hi') {
      // Hindi greetings with sustainability message
      const hindiTimeGreeting = hour < 12 ? 'सुप्रभात' : (hour < 17 ? 'शुभ दोपहर' : 'शुभ संध्या');
      const hindiSustainabilityMsg = "प्रेप-ज़र समावेशी और गुणवत्तापूर्ण शिक्षा के साथ संयुक्त राष्ट्र सतत विकास लक्ष्यों का समर्थन करता है। हम सभी छात्रों के लिए व्यक्तिगत शिक्षा तक समान पहुंच प्रदान करने के लिए प्रतिबद्ध हैं।";
      
      if (contextType === 'welcome' || contextType === 'signup') {
        return `प्रेप-ज़र में आपका स्वागत है, ${name}! मैं साखा एआई हूँ, आपका व्यक्तिगत शिक्षण सहायक। हमारा AI-संचालित प्लेटफॉर्म अनुकूलनीय अध्ययन योजनाएं, अभ्यास परीक्षण और आपकी सीखने की शैली के अनुरूप व्यक्तिगत सिफारिशें प्रदान करता है। ${hindiSustainabilityMsg}`;
      } else if (contextType === 'concept') {
        return `नमस्ते ${name}, मैंने आपके कॉन्सेप्ट विवरण लोड कर दिए हैं। आप सामग्री पढ़ सकते हैं, नोट्स ले सकते हैं, और यदि आप सुनना पसंद करते हैं तो जोर से पढ़ने की सुविधा का उपयोग कर सकते हैं।`;
      } else if (contextType === 'dashboard') {
        return `${hindiTimeGreeting} ${name}! आपके भावनात्मक रूप से बुद्धिमान डैशबोर्ड में आपका स्वागत है। ${hindiSustainabilityMsg} मैं आपका AI सीखने वाला साथी हूँ, और मैं आपके मूड, सीखने की शैली और परिवेश के अनुसार अनुकूलित हो जाता हूँ।`;
      } else {
        return `${hindiTimeGreeting} ${name}! प्रेप-ज़र में आपका स्वागत है। ${hindiSustainabilityMsg}`;
      }
    }
    
    return `${timeGreeting} ${name}! Welcome to PREP-zer!`;
  };
  
  const handleToggleMute = () => {
    setAudioMuted(!audioMuted);
    
    if (!audioMuted) {
      // If currently not muted and about to be muted, stop any speech
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setAudioPlaying(false);
      setAudioPlayed(true);
      sessionStorage.setItem(sessionStorageKey, 'true');
    }
  };
  
  // Don't render anything if already played or not a first-time user on specific contexts
  if ((!isFirstTimeUser && !isConceptPage && !isWelcomePage && !isDashboardPage) || audioPlayed) return null;
  
  return (
    <div 
      className={`fixed bottom-20 right-5 z-50 p-3 rounded-full shadow-md
        ${audioPlaying ? 'bg-primary text-white' : 'bg-white text-gray-600'} 
        cursor-pointer transition-all duration-300 hover:scale-105 animate-bounce-slow`}
      onClick={handleToggleMute}
      title={audioMuted ? "Unmute voice assistant" : "Mute voice assistant"}
    >
      {audioMuted ? (
        <VolumeX className="h-6 w-6" />
      ) : audioPlaying ? (
        <Volume2 className="h-6 w-6 animate-pulse" />
      ) : (
        <Volume className="h-6 w-6" />
      )}
      
      <style>
        {`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}
      </style>
    </div>
  );
};

export default VoiceGreeting;
