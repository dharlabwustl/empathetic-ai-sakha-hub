
import React, { useEffect, useState } from 'react';
import { Volume, Volume2, VolumeX } from 'lucide-react';
import { useLocation } from 'react-router-dom';

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
  
  // Check if this is a concept detail page or welcome flow page
  const isConceptPage = location.pathname.includes('/concepts/') && !location.pathname.includes('/concepts/formula-lab');
  const isWelcomePage = location.pathname.includes('/welcome-flow');
  
  useEffect(() => {
    // Check if the greeting has been played already in this session
    const hasPlayed = sessionStorage.getItem('voiceGreetingPlayed') === 'true';
    
    // Reset played state when location changes
    if (location.pathname) {
      setAudioPlayed(false);
    }

    // Get current page context
    const currentPageContext = getCurrentPageContext(location.pathname);
    
    // Only play for specific contexts and when not muted
    if (((isFirstTimeUser && !hasPlayed && !audioPlayed && !audioMuted) || 
        (isConceptPage && !audioPlayed && !audioMuted) ||
        (isWelcomePage && !audioPlayed && !audioMuted))) {
      const playGreeting = async () => {
        try {
          // Use a timeout to ensure the component is fully mounted
          setTimeout(() => {
            setAudioPlaying(true);
            
            // Create text for speech with better pronunciation for PREPZR
            let welcomeText = '';
            
            // Different greetings based on page context
            if (isConceptPage) {
              if (language === 'en') {
                welcomeText = `I've loaded your concept details. You can read through the material, take notes, and use the Read Aloud feature if you prefer listening. Would you like me to help explain any part of this concept?`;
              } else if (language === 'hi') {
                welcomeText = `मैंने आपके कॉन्सेप्ट विवरण लोड कर दिए हैं। आप सामग्री पढ़ सकते हैं, नोट्स ले सकते हैं, और यदि आप सुनना पसंद करते हैं तो आप जोर से पढ़ने की सुविधा का उपयोग कर सकते हैं।`;
              }
            } else if (isWelcomePage) {
              if (language === 'en') {
                // More detailed welcome flow specific greeting
                welcomeText = `Welcome to PREPZR! I'm your voice assistant and I'll guide you through your personalized learning journey. Our AI-powered platform offers personalized study plans, adaptive learning, and performance analytics tailored to your NEET exam preparation. You've made an excellent choice for your exam preparation. Let's begin by exploring the features that will help you succeed!`;
              } else if (language === 'hi') {
                welcomeText = `प्रेप ज़र में आपका स्वागत है! मैं आपका वॉइस असिस्टेंट हूं और मैं आपकी व्यक्तिगत शिक्षा यात्रा में आपका मार्गदर्शन करूंगा। हमारा AI-संचालित प्लेटफॉर्म आपकी NEET परीक्षा तैयारी के लिए व्यक्तिगत अध्ययन योजनाएं, अनुकूली शिक्षण और प्रदर्शन विश्लेषण प्रदान करता है। आपने अपनी परीक्षा तैयारी के लिए एक उत्कृष्ट विकल्प चुना है। आइए उन सुविधाओं का अन्वेषण करके शुरू करें जो आपको सफल होने में मदद करेंगी!`;
              }
            } else if (isFirstTimeUser) {
              if (language === 'en') {
                // More comprehensive and helpful first-time greeting
                welcomeText = `Welcome to PREPZR, ${userName}! You've made an excellent choice for your NEET exam preparation. Our AI-powered platform will create a personalized study plan based on your learning style and goals. You'll find interactive concept lessons, smart flashcards, and practice exams designed to maximize your performance. Use the dashboard to track your progress and receive personalized recommendations. If you need any assistance, I'm here to help!`;
              } else if (language === 'hi') {
                welcomeText = `प्रेप ज़र में आपका स्वागत है, ${userName}! आपने अपनी NEET परीक्षा की तैयारी के लिए एक उत्कृष्ट विकल्प चुना है। हमारा AI-संचालित प्लेटफॉर्म आपकी सीखने की शैली और लक्ष्यों के आधार पर एक व्यक्तिगत अध्ययन योजना बनाएगा। आपको इंटरएक्टिव कॉन्सेप्ट पाठ, स्मार्ट फ्लैशकार्ड और प्रैक्टिस एग्जाम मिलेंगे जो आपके प्रदर्शन को अधिकतम करने के लिए डिज़ाइन किए गए हैं। अपनी प्रगति को ट्रैक करने और व्यक्तिगत सिफारिशें प्राप्त करने के लिए डैशबोर्ड का उपयोग करें। यदि आपको किसी भी सहायता की आवश्यकता है, तो मैं मदद के लिए यहां हूं!`;
              }
            } else {
              if (language === 'en') {
                welcomeText = getContextBasedGreeting(currentPageContext, userName, 'en');
              } else {
                welcomeText = getContextBasedGreeting(currentPageContext, userName, 'hi');
              }
            }
            
            if (!welcomeText) return;
            
            // Get available voices
            const voices = window.speechSynthesis.getVoices();
            
            // Create speech synthesis utterance
            const speech = new SpeechSynthesisUtterance(welcomeText);
            speech.lang = language === 'en' ? 'en-IN' : 'hi-IN';
            speech.rate = isWelcomePage ? 1.0 : 0.95; // Slightly slower for clarity
            speech.volume = 0.8;
            
            // Find an Indian voice based on comprehensive list of possible voices
            const preferredVoiceNames = [
              'Google हिन्दी', 'Microsoft Kalpana', 'Microsoft Kajal', 'Google English India',
              'Kalpana', 'Kajal', 'Isha', 'Veena', 'Priya', 'Meena', 'Hindi India', 'en-IN',
              'hi-IN', 'Indian', 'India'
            ];
            
            // Try to find a preferred voice with better matching
            let selectedVoice = null;
            for (const name of preferredVoiceNames) {
              const voice = voices.find(v => 
                v.name?.toLowerCase().includes(name.toLowerCase()) || 
                v.lang?.toLowerCase().includes(name.toLowerCase())
              );
              if (voice) {
                console.log("Selected voice:", voice.name);
                selectedVoice = voice;
                break;
              }
            }
            
            // If still no voice selected, try to find any female voice
            if (!selectedVoice) {
              selectedVoice = voices.find(v => 
                v.name?.toLowerCase().includes('female') || 
                !v.name?.toLowerCase().includes('male')
              );
            }
            
            // If still nothing, use any available voice
            if (!selectedVoice && voices.length > 0) {
              selectedVoice = voices[0];
            }
            
            // Set the selected voice if found
            if (selectedVoice) {
              speech.voice = selectedVoice;
              console.log(`Using voice: ${selectedVoice.name}, lang: ${selectedVoice.lang}`);
            } else {
              console.log("No suitable voice found, using browser default");
            }
            
            // Add event listeners
            speech.onstart = () => setAudioPlaying(true);
            speech.onend = () => {
              setAudioPlaying(false);
              setAudioPlayed(true);
              if (isFirstTimeUser) {
                sessionStorage.setItem('voiceGreetingPlayed', 'true');
              }
            };
            speech.onerror = (e) => {
              console.error("Speech synthesis error", e);
              setAudioPlaying(false);
              setAudioPlayed(true);
            };
            
            // Play the speech
            window.speechSynthesis.speak(speech);
          }, 1500);
        } catch (error) {
          console.error("Error playing greeting:", error);
          setAudioPlayed(true);
        }
      };
      
      // Force voices to load first, then play greeting
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.onvoiceschanged = null; // Prevent multiple calls
          playGreeting();
        };
        
        // Trigger voice loading
        window.speechSynthesis.getVoices();
        
        // Fallback in case onvoiceschanged doesn't fire
        setTimeout(playGreeting, 1000);
      }
    }
    
    // Cleanup on unmount or location change
    return () => {
      if (audioPlaying && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isFirstTimeUser, userName, language, audioPlayed, audioMuted, location.pathname, isConceptPage, isWelcomePage]);
  
  const handleToggleMute = () => {
    setAudioMuted(!audioMuted);
    
    if (!audioMuted) {
      // If currently not muted and about to be muted, stop any speech
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setAudioPlaying(false);
      setAudioPlayed(true);
      sessionStorage.setItem('voiceGreetingPlayed', 'true');
    }
  };

  // Helper function to get context based greeting
  const getCurrentPageContext = (pathname: string): string => {
    if (pathname.includes('/welcome-flow')) return 'welcome';
    if (pathname.includes('/concepts/')) return 'concept';
    if (pathname.includes('/study-plan')) return 'study-plan';
    if (pathname.includes('/practice-exam')) return 'practice-exam';
    if (pathname.includes('/analytics')) return 'analytics';
    if (pathname.includes('/dashboard')) return 'dashboard';
    if (pathname === '/') return 'home';
    return 'general';
  };

  // Helper function to get context-based greeting
  const getContextBasedGreeting = (context: string, user: string, lang: 'en' | 'hi'): string => {
    if (lang === 'en') {
      switch(context) {
        case 'dashboard': 
          return `Welcome back to your dashboard, ${user}. Here you can see your study progress and today's plan.`;
        case 'study-plan':
          return `Here's your study plan, ${user}. I've organized your topics based on your learning needs.`;
        case 'practice-exam':
          return `Ready for a practice exam? This will help strengthen your knowledge and identify areas for improvement.`;
        case 'analytics':
          return `These analytics show your progress over time. Let's see which areas you're excelling in and where you might need more focus.`;
        case 'home':
          return `Welcome to PREPZR, ${user}! How can I assist you with your exam preparation today?`;
        default:
          return '';
      }
    } else {
      switch(context) {
        case 'dashboard': 
          return `${user}, आपके डैशबोर्ड पर आपका स्वागत है। यहां आप अपनी पढ़ाई की प्रगति और आज की योजना देख सकते हैं।`;
        case 'study-plan':
          return `${user}, यह आपकी अध्ययन योजना है। मैंने आपके सीखने की जरूरतों के आधार पर आपके विषयों को व्यवस्थित किया है।`;
        case 'practice-exam':
          return `अभ्यास परीक्षा के लिए तैयार हैं? यह आपके ज्ञान को मजबूत करने और सुधार के क्षेत्रों की पहचान करने में मदद करेगा।`;
        case 'analytics':
          return `ये विश्लेषण आपकी समय के साथ प्रगति दिखाते हैं। देखते हैं कि आप किन क्षेत्रों में उत्कृष्टता प्राप्त कर रहे हैं और कहां आपको अधिक ध्यान देने की आवश्यकता हो सकती है।`;
        case 'home':
          return `प्रेप ज़र में आपका स्वागत है, ${user}! आज मैं आपकी परीक्षा की तैयारी में कैसे सहायता कर सकता हूं?`;
        default:
          return '';
      }
    }
  };
  
  // Don't render anything if already played or not a first-time user and not on concept page/welcome page
  if ((!isFirstTimeUser && !isConceptPage && !isWelcomePage) || audioPlayed) return null;
  
  return (
    <div 
      className={`fixed bottom-20 right-5 z-50 p-3 rounded-full shadow-md
        ${audioPlaying ? 'bg-primary text-white' : 'bg-white text-gray-600'} 
        cursor-pointer transition-all duration-300 hover:scale-105 animate-bounce-slow`}
      onClick={handleToggleMute}
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
