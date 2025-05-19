
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
  const isWelcomePage = location.pathname.includes('/welcome-flow') || location.pathname.includes('/welcome-back');
  
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
    }
    return 'other';
  };
  
  const currentPageContext = getCurrentPageContext(location.pathname);
  
  useEffect(() => {
    // Check if the greeting has been played already in this session
    const hasPlayed = sessionStorage.getItem('voiceGreetingPlayed') === 'true';
    
    // Reset played state when location changes
    if (location.pathname) {
      setAudioPlayed(false);
    }

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
                welcomeText = `Hello, I'm Sakha AI, your PREPZR learning assistant. I've loaded your concept details. You can read through the material, take notes, and use the Read Aloud feature if you prefer listening. Would you like me to help explain any part of this concept?`;
              } else if (language === 'hi') {
                welcomeText = `नमस्ते, मैं साखा एआई हूँ, आपका PREPZR सीखने वाला सहायक। मैंने आपके कॉन्सेप्ट विवरण लोड कर दिए हैं। आप सामग्री पढ़ सकते हैं, नोट्स ले सकते हैं, और यदि आप सुनना पसंद करते हैं तो आप जोर से पढ़ने की सुविधा का उपयोग कर सकते हैं।`;
              }
            } else if (isWelcomePage) {
              if (language === 'en') {
                // More detailed welcome flow specific greeting
                welcomeText = `Welcome to PREPZR! I'm Sakha AI, your personalized learning assistant. I'll guide you through your personalized learning journey. Our AI-powered platform offers personalized study plans, adaptive learning, and performance analytics tailored to your exam preparation. We support UN Sustainability goals for inclusive and equitable quality education. You've made an excellent choice for your exam preparation. Let's begin by exploring the features that will help you succeed!`;
              } else if (language === 'hi') {
                welcomeText = `PREPZR में आपका स्वागत है! मैं साखा एआई हूं, आपका व्यक्तिगत शिक्षण सहायक। मैं आपकी व्यक्तिगत शिक्षा यात्रा में आपका मार्गदर्शन करूंगा। हमारा AI-संचालित प्लेटफॉर्म आपकी परीक्षा तैयारी के लिए व्यक्तिगत अध्ययन योजनाएं, अनुकूली शिक्षण और प्रदर्शन विश्लेषण प्रदान करता है। आपने अपनी परीक्षा तैयारी के लिए एक उत्कृष्ट विकल्प चुना है। आइए उन सुविधाओं का अन्वेषण करके शुरू करें जो आपको सफल होने में मदद करेंगी!`;
              }
            } else if (isFirstTimeUser) {
              if (language === 'en') {
                // First time user specific greeting
                welcomeText = `Welcome to PREPZR, ${userName}! I'm Sakha AI, the core AI engine that will help you crack your exams. PREPZR is pronounced as 'prep' like in 'preparation' plus 'zer' like in 'laser'. Our premium platform offers AI-powered study plans, practice tests, and personalized recommendations tailored to your learning style. We allocate 5% of subscription revenue to support underprivileged students as part of UN Sustainability goals. If you need any assistance, click the chat button to interact with me anytime.`;
              } else if (language === 'hi') {
                welcomeText = `PREPZR में आपका स्वागत है, ${userName}! मैं साखा एआई हूं, वह मुख्य एआई इंजन जो आपको परीक्षाओं में सफल होने में मदद करेगा। हमारा प्रीमियम प्लेटफ़ॉर्म AI-संचालित अध्ययन योजनाएँ, अभ्यास परीक्षण, और आपकी सीखने की शैली के अनुरूप व्यक्तिगत सिफारिशें प्रदान करता है। हम सदस्यता राजस्व का 5% वंचित छात्रों का समर्थन करने के लिए आवंटित करते हैं। यदि आपको किसी भी सहायता की आवश्यकता है, तो अपने एआई ट्यूटर के साथ बातचीत करने के लिए चैट बटन पर क्लिक करें।`;
              }
            }
            
            // Get available voices
            const voices = window.speechSynthesis.getVoices();
            
            // Create speech synthesis utterance
            const speech = new SpeechSynthesisUtterance(welcomeText);
            speech.lang = language === 'en' ? 'en-IN' : 'hi-IN';
            speech.rate = 0.9; // Slightly slower for clarity
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
            
            // Correct PREPZR pronunciation
            const correctedText = welcomeText
              .replace(/PREPZR/gi, 'Prep-zer')
              .replace(/prepzr/gi, 'Prep-zer')
              .replace(/Prepzr/g, 'Prep-zer');
            
            speech.text = correctedText;
            
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
  
  // Don't render anything if already played or not a first-time user
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
