
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
                welcomeText = `I've loaded your concept details. You can now explore related flashcards, add notes, practice with quick recall questions, and mark this for revision if needed. Use the read aloud feature for better understanding.`;
              } else {
                welcomeText = `मैंने आपके अवधारणा विवरण लोड कर दिए हैं। अब आप संबंधित फ्लैशकार्ड देख सकते हैं, नोट्स जोड़ सकते हैं, त्वरित याद प्रश्नों के साथ अभ्यास कर सकते हैं, और यदि आवश्यक हो तो इसे संशोधन के लिए चिह्नित कर सकते हैं। बेहतर समझ के लिए जोर से पढ़ने वाली सुविधा का उपयोग करें।`;
              }
            } else if (isWelcomePage) {
              if (language === 'en') {
                welcomeText = `Welcome to PREPZR, ${userName}! Your personalized exam preparation platform is ready. We've created a tailored study plan for your needs. Explore concept cards, practice tests, and AI tutoring. Our system adapts to your learning style and helps identify areas where you need improvement. The smart flashcards use spaced repetition for better memory retention. You've made an excellent choice for your exam preparation journey.`;
              } else {
                welcomeText = `प्रेप ज़र में आपका स्वागत है, ${userName}! आपका व्यक्तिगत परीक्षा तैयारी प्लेटफॉर्म तैयार है। हमने आपकी ज़रूरतों के अनुसार एक अनुकूलित अध्ययन योजना बनाई है। अवधारणा कार्ड, अभ्यास परीक्षण और एआई ट्यूशन का अन्वेषण करें। हमारी प्रणाली आपकी सीखने की शैली के अनुकूल है और उन क्षेत्रों की पहचान करने में मदद करती है जहां आपको सुधार की आवश्यकता है। स्मार्ट फ्लैशकार्ड बेहतर स्मृति प्रतिधारण के लिए अंतराल पुनरावृत्ति का उपयोग करते हैं। आपने अपनी परीक्षा की तैयारी के सफर के लिए एक उत्कृष्ट विकल्प चुना है।`;
              }
            } else {
              if (language === 'en') {
                // Use phonetic spelling with a pause between Prep and zer
                welcomeText = `Welcome to Prep zer, ${userName}! Your personalized learning journey begins now. Explore your dashboard to see your study plans, practice tests, and personalized recommendations. If you need any assistance, click the chat button to interact with your AI tutor.`;
              } else if (language === 'hi') {
                welcomeText = `प्रेप ज़र में आपका स्वागत है, ${userName}! आपकी व्यक्तिगत शिक्षा यात्रा अब शुरू होती है। अपने अध्ययन योजनाओं, अभ्यास परीक्षणों और व्यक्तिगत सिफारिशों को देखने के लिए अपने डैशबोर्ड का अन्वेषण करें। यदि आपको किसी भी सहायता की आवश्यकता है, तो अपने एआई ट्यूटर के साथ बातचीत करने के लिए चैट बटन पर क्लिक करें।`;
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
  
  // Helper function to determine the current page context
  const getCurrentPageContext = (path: string): string => {
    if (path.includes('/welcome-flow')) return 'welcome';
    if (path.includes('/concepts/')) return 'concept';
    if (path.includes('/dashboard')) return 'dashboard';
    if (path.includes('/signup')) return 'signup';
    if (path.includes('/login')) return 'login';
    return 'general';
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
  if (!isFirstTimeUser && !isConceptPage && !isWelcomePage) return null;
  if (audioPlayed) return null;
  
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
