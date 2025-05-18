
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
  language = 'en' // Default to English
}) => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const location = useLocation();
  
  // Check if this is a concept detail page
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
                welcomeText = `I've loaded your concept details. You can read through the material, take notes, and use the Read Aloud feature if you prefer listening. Would you like me to help explain any part of this concept? You can also flag it for revision later or try the practice questions to test your understanding.`;
              } else if (language === 'hi') {
                welcomeText = `मैंने आपके कॉन्सेप्ट विवरण लोड कर दिए हैं। आप सामग्री पढ़ सकते हैं, नोट्स ले सकते हैं, और यदि आप सुनना पसंद करते हैं तो आप जोर से पढ़ने की सुविधा का उपयोग कर सकते हैं। क्या आप चाहेंगे कि मैं इस अवधारणा के किसी भी हिस्से को समझाने में मदद करूं? आप इसे बाद में संशोधन के लिए चिह्नित कर सकते हैं या अपनी समझ का परीक्षण करने के लिए अभ्यास प्रश्नों का प्रयास कर सकते हैं।`;
              }
            } else if (isWelcomePage) {
              if (language === 'en') {
                // Welcome flow specific greeting - faster voice
                welcomeText = `Welcome to Prep-zer! I'm your voice assistant and I'll guide you through your personalized learning journey. Our AI-powered platform analyzes your learning style and creates custom study plans just for you. You'll have access to interactive concept cards, smart flashcards, and adaptive practice tests that adjust to your progress. Let's get started with building your path to success!`;
              } else if (language === 'hi') {
                welcomeText = `प्रेप-ज़र में आपका स्वागत है! मैं आपका वॉइस असिस्टेंट हूं और मैं आपकी व्यक्तिगत शिक्षा यात्रा में आपका मार्गदर्शन करूंगा। हमारा AI-संचालित प्लेटफॉर्म आपकी सीखने की शैली का विश्लेषण करता है और आपके लिए कस्टम अध्ययन योजनाएं बनाता है। आपको इंटरैक्टिव कॉन्सेप्ट कार्ड, स्मार्ट फ्लैशकार्ड और अनुकूली अभ्यास परीक्षणों तक पहुंच मिलेगी जो आपकी प्रगति के अनुसार समायोजित होते हैं। आइए आपकी सफलता का मार्ग बनाना शुरू करें!`;
              }
            } else if (isFirstTimeUser) {
              if (language === 'en') {
                // Use phonetic spelling with a pause between Prep and zer
                welcomeText = `Welcome to Prep zer, ${userName}! Your personalized learning journey begins now. Explore your dashboard to see your study plans, practice tests, and personalized recommendations. Our AI tutor is available 24/7 to help with any concepts you find difficult, and our smart flashcards adapt to your learning style to maximize retention.`;
              } else if (language === 'hi') {
                welcomeText = `प्रेप-ज़र में आपका स्वागत है, ${userName}! आपकी व्यक्तिगत शिक्षा यात्रा अब शुरू होती है। अपने अध्ययन योजनाओं, अभ्यास परीक्षणों और व्यक्तिगत सिफारिशों को देखने के लिए अपने डैशबोर्ड का अन्वेषण करें। हमारा AI ट्यूटर आपको किसी भी कठिन अवधारणा में मदद करने के लिए 24/7 उपलब्ध है, और हमारे स्मार्ट फ्लैशकार्ड आपकी सीखने की शैली के अनुसार अनुकूलित होते हैं ताकि प्रतिधारण को अधिकतम किया जा सके।`;
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
            speech.rate = isWelcomePage ? 1.1 : 1.0; // Slightly faster for welcome flow
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
          return `Welcome back to your dashboard, ${user}. Here you can see your study progress, exam readiness score, and today's learning tasks. Your readiness score has been updated based on your recent activity. Would you like me to guide you through any specific feature?`;
        case 'study-plan':
          return `Here's your study plan, ${user}. I've organized your topics based on your learning needs and current readiness score. Each task is prioritized to help you improve in areas where you need the most attention.`;
        case 'practice-exam':
          return `Ready for a practice exam? This will help strengthen your knowledge and identify areas for improvement. Your results will update your exam readiness score, which tracks your progress toward exam day.`;
        case 'analytics':
          return `These analytics show your progress over time. You can see how your exam readiness has improved across different subjects. Your concept mastery and flashcard recall accuracy are key metrics to watch.`;
        case 'home':
          return `Welcome to Prep-zer, ${user}! Our AI-powered platform personalizes your exam preparation. Would you like to check your current exam readiness score or start today's learning tasks?`;
        default:
          return '';
      }
    } else {
      switch(context) {
        case 'dashboard': 
          return `${user}, आपके डैशबोर्ड पर आपका स्वागत है। यहां आप अपनी पढ़ाई की प्रगति, परीक्षा तैयारी स्कोर और आज के सीखने के कार्यों को देख सकते हैं। आपका तैयारी स्कोर आपकी हाल की गतिविधि के आधार पर अपडेट किया गया है। क्या आप चाहेंगे कि मैं आपको किसी विशिष्ट सुविधा के बारे में बताऊं?`;
        case 'study-plan':
          return `${user}, यह आपकी अध्ययन योजना है। मैंने आपके सीखने की जरूरतों और वर्तमान तैयारी स्कोर के आधार पर आपके विषयों को व्यवस्थित किया है। प्रत्येक कार्य को प्राथमिकता दी गई है ताकि आपको उन क्षेत्रों में सुधार करने में मदद मिल सके जहां आपको सबसे अधिक ध्यान देने की आवश्यकता है।`;
        case 'practice-exam':
          return `अभ्यास परीक्षा के लिए तैयार हैं? यह आपके ज्ञान को मजबूत करने और सुधार के क्षेत्रों की पहचान करने में मदद करेगा। आपके परिणाम आपके परीक्षा तैयारी स्कोर को अपडेट करेंगे, जो परीक्षा दिवस की ओर आपकी प्रगति को ट्रैक करता है।`;
        case 'analytics':
          return `ये विश्लेषण आपकी समय के साथ प्रगति दिखाते हैं। आप देख सकते हैं कि विभिन्न विषयों में आपकी परीक्षा तैयारी कैसे सुधरी है। आपकी अवधारणा महारत और फ्लैशकार्ड स्मरण सटीकता देखने के लिए महत्वपूर्ण मेट्रिक्स हैं।`;
        case 'home':
          return `प्रेप-ज़र में आपका स्वागत है, ${user}! हमारा AI-संचालित प्लेटफॉर्म आपकी परीक्षा तैयारी को व्यक्तिगत बनाता है। क्या आप अपना वर्तमान परीक्षा तैयारी स्कोर देखना चाहेंगे या आज के सीखने के कार्य शुरू करना चाहेंगे?`;
        default:
          return '';
      }
    }
  };
  
  // Don't render anything if already played or not relevant
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
