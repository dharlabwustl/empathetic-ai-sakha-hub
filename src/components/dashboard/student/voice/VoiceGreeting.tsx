
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
  
  // Check if this is a specific page type
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
              sessionStorage.setItem('voiceGreetingPlayed', 'true');
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
    
    // Cleanup on unmount
    return () => {
      if (audioPlaying && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isFirstTimeUser, userName, language, audioPlayed, audioMuted, location]);
  
  const getCurrentPageContext = (pathname: string): string => {
    // Simplified context detection
    if (pathname.includes('/welcome-flow')) {
      return 'welcome';
    } else if (pathname.includes('/dashboard')) {
      return 'dashboard';
    }
    return 'general';
  };
  
  const getContextBasedGreeting = (context: string, name: string, lang: string): string => {
    if (lang === 'en') {
      switch (context) {
        case 'welcome':
          return `Welcome to PREPZR, ${name}! Our AI-powered platform is designed to help you excel in your NEET exams through personalized study plans, interactive learning materials, and comprehensive analytics.`;
        case 'dashboard':
          return `Welcome to your dashboard, ${name}. Here you can view your study progress, upcoming tasks, and personalized recommendations.`;
        default:
          return `Hello ${name}, welcome to PREPZR. How can I assist with your studies today?`;
      }
    } else {
      switch (context) {
        case 'welcome':
          return `प्रेप ज़र में आपका स्वागत है, ${name}! हमारा AI-संचालित प्लेटफॉर्म आपको NEET परीक्षाओं में उत्कृष्टता प्राप्त करने में मदद करने के लिए डिज़ाइन किया गया है।`;
        case 'dashboard':
          return `अपने डैशबोर्ड पर आपका स्वागत है, ${name}। यहां आप अपनी अध्ययन प्रगति, आगामी कार्य और व्यक्तिगत सिफारिशें देख सकते हैं।`;
        default:
          return `नमस्ते ${name}, प्रेप ज़र में आपका स्वागत है। मैं आज आपके अध्ययन में कैसे सहायता कर सकता हूं?`;
      }
    }
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
      sessionStorage.setItem('voiceGreetingPlayed', 'true');
    }
  };
  
  // Don't render anything if already played or not a first-time user
  if (!isFirstTimeUser && !isWelcomePage && !isConceptPage || audioPlayed) return null;
  
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
