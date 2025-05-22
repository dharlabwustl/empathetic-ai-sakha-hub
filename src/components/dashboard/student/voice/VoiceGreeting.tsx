
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
  
  // Get current page context more accurately
  const getCurrentPageContext = (pathname: string): string => {
    if (pathname.includes('/welcome-flow') || pathname.includes('/welcome-back')) {
      return 'welcome';
    } else if (pathname.includes('/signup') || pathname.includes('/auth/signup')) {
      return 'signup';
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
  const isSignupPage = currentPageContext === 'signup';
  const isWelcomePage = currentPageContext === 'welcome';
  const isConceptPage = currentPageContext === 'concept';
  
  // Track if this is a first-time page visit during this session
  useEffect(() => {
    // Reset played state when location changes
    setAudioPlayed(false);
  }, [location.pathname]);
  
  useEffect(() => {
    // Check if greeting should play based on context
    const shouldPlayGreeting = 
      (isFirstTimeUser && !audioPlayed && !audioMuted) || 
      (isSignupPage && !audioPlayed && !audioMuted) ||
      (isWelcomePage && !audioPlayed && !audioMuted) ||
      (isConceptPage && !audioPlayed && !audioMuted);
    
    if (shouldPlayGreeting) {
      const playGreeting = async () => {
        try {
          // Use a timeout to ensure the component is fully mounted
          setTimeout(() => {
            setAudioPlaying(true);
            
            // Create text for speech with proper pronunciation for PREPZR
            let welcomeText = getContextAwareGreeting(currentPageContext, userName, language);
            
            // Dynamically select voice and play greeting
            playContextAwareGreeting(welcomeText, language);
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
  }, [isFirstTimeUser, userName, language, audioPlayed, audioMuted, location.pathname, currentPageContext]);
  
  // Generate context-aware greeting based on current page and user engagement
  const getContextAwareGreeting = (
    context: string, 
    name: string, 
    lang: string
  ): string => {
    // Determine time of day for more personalized greeting
    const hour = new Date().getHours();
    let timeGreeting = 'Hello';
    if (hour < 12) timeGreeting = 'Good morning';
    else if (hour < 17) timeGreeting = 'Good afternoon';
    else timeGreeting = 'Good evening';
    
    // UN sustainability goals message (shorter, more impactful)
    const sustainabilityMessage = "PREP-zer supports UN Sustainability Goal 4 for inclusive quality education. ";
    
    if (lang === 'en') {
      if (context === 'signup') {
        return `Congratulations ${name}! You've made an excellent choice joining PREP-zer for your exam preparation. ${sustainabilityMessage} I'm Sakha AI, your personalized learning assistant. I'll adapt to your learning style and emotional state to create a customized study experience. Let me guide you through setting up your profile so we can tailor your learning journey to your specific needs and goals.`;
      } else if (context === 'welcome') {
        return `Welcome to PREP-zer, ${name}! ${sustainabilityMessage} I'm Sakha AI, your adaptive learning companion. We've designed a personalized dashboard to maximize your study efficiency. I'll guide you through our key features that will help you track your progress, maintain focus, and build confidence for your exams. Feel free to ask me questions anytime - I'm here to ensure your success!`;
      } else if (context === 'concept') {
        return `${timeGreeting}, ${name}. I've loaded this concept for your review. Would you like me to explain any part in detail, create a summary, or help with practice questions? Feel free to use the Read Aloud feature if you prefer listening. ${sustainabilityMessage}`;
      } else if (context === 'dashboard') {
        return `${timeGreeting}, ${name}. Welcome to your personalized dashboard. I've analyzed your recent activity and updated your study recommendations. Today's focus areas are highlighted based on your learning patterns and exam timeline. ${sustainabilityMessage} Would you like me to explain any specific feature?`;
      } else {
        // Default home page greeting
        return `${timeGreeting}, ${name}! Welcome to PREP-zer, the world's first emotionally intelligent exam preparation platform. ${sustainabilityMessage} I'm Sakha AI, your adaptive learning assistant. I tailor your study experience based on your learning style, emotional state, and specific exam goals. How can I help you excel today?`;
      }
    } else if (lang === 'hi') {
      // Hindi greetings with similar contextual awareness
      const hindiTimeGreeting = hour < 12 ? 'सुप्रभात' : (hour < 17 ? 'शुभ दोपहर' : 'शुभ संध्या');
      
      if (context === 'signup') {
        return `बधाई हो ${name}! आपने अपनी परीक्षा की तैयारी के लिए PREP-ज़र चुनकर बहुत अच्छा निर्णय लिया है। हम संयुक्त राष्ट्र के सतत विकास लक्ष्य 4 का समर्थन करते हैं। मैं साखा AI हूँ, आपका व्यक्तिगत शिक्षण सहायक। मैं आपकी सीखने की शैली और भावनात्मक स्थिति के अनुसार अनुकूलित अध्ययन अनुभव बनाऊंगा।`;
      }
      
      // Add other Hindi context messages based on page...
      return `${hindiTimeGreeting} ${name}! PREP-ज़र में आपका स्वागत है। हम संयुक्त राष्ट्र के सतत विकास लक्ष्य 4 का समर्थन करते हैं। मैं साखा AI हूँ, आपका अनुकूली सीखने वाला साथी। मैं आपकी सहायता के लिए यहां हूँ।`;
    }
    
    // Fallback greeting
    return `${timeGreeting} ${name}! Welcome to PREP-zer. I'm your AI learning companion.`;
  };
  
  // Play greeting with optimized voice selection
  const playContextAwareGreeting = (message: string, lang: string) => {
    try {
      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      
      // Create speech synthesis utterance
      const speech = new SpeechSynthesisUtterance();
      
      // Correct PREPZR pronunciation by using proper syllable break
      speech.text = message.replace(/PREPZR/gi, 'PREP-zer').replace(/Prepzr/g, 'PREP-zer');
      speech.lang = lang === 'en' ? 'en-US' : 'hi-IN';
      speech.rate = 0.96; // Slightly slower for clarity
      speech.pitch = 1.05; // Slightly higher for a more confident tone
      speech.volume = 0.9;
      
      // Select more confident, fluent voices
      const preferredVoiceNames = lang === 'en' 
        ? ['Google US English Female', 'Microsoft Zira', 'Samantha', 'Karen', 'en-US', 'en-GB']
        : ['Google हिन्दी', 'Microsoft Kalpana', 'Microsoft Kajal', 'hi-IN'];
      
      // Try to find a preferred voice
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
      
      // If no voice found, use any available voice
      if (!selectedVoice && voices.length > 0) {
        selectedVoice = voices[0];
      }
      
      // Set the selected voice if found
      if (selectedVoice) {
        speech.voice = selectedVoice;
      }
      
      // Add event listeners
      speech.onstart = () => setAudioPlaying(true);
      speech.onend = () => {
        setAudioPlaying(false);
        setAudioPlayed(true);
        sessionStorage.setItem('voiceGreetingPlayed', 'true');
        
        // Dispatch event that speech ended - useful for UI components waiting for voice to finish
        document.dispatchEvent(new CustomEvent('voice-greeting-completed'));
      };
      speech.onerror = (e) => {
        console.error("Speech synthesis error", e);
        setAudioPlaying(false);
        setAudioPlayed(true);
      };
      
      // Store speech object globally to be able to cancel it when navigating away
      window.currentSpeech = speech;
      
      // Play the speech
      window.speechSynthesis.speak(speech);
      
    } catch (error) {
      console.error("Error playing greeting:", error);
      setAudioPlayed(true);
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
    }
  };
  
  // Don't render anything if already played or not relevant context
  if ((!isFirstTimeUser && !isSignupPage && !isWelcomePage && !isConceptPage) || audioPlayed) return null;
  
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
