
import React, { useEffect, useState } from 'react';
import { Volume, Volume2, VolumeX } from 'lucide-react';

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
  
  useEffect(() => {
    // Check if the greeting has been played already in this session
    const hasPlayed = sessionStorage.getItem('voiceGreetingPlayed') === 'true';
    
    // Only play for first time users who haven't heard the greeting yet
    if (isFirstTimeUser && !hasPlayed && !audioPlayed && !audioMuted) {
      const playGreeting = async () => {
        try {
          // Use a timeout to ensure the component is fully mounted
          setTimeout(() => {
            setAudioPlaying(true);
            
            // Create text for speech with better pronunciation for PREPZR
            let welcomeText = '';
            if (language === 'en') {
              // Use phonetic spelling with a pause between Prep and zer
              welcomeText = `Welcome to Prep zer, ${userName}! Your personalized learning journey begins now. Our premium platform offers AI-powered study plans, practice tests, and personalized recommendations tailored to your learning style. We allocate 5% of subscription revenue to support underprivileged students. If you need any assistance, click the chat button to interact with your AI tutor.`;
            } else if (language === 'hi') {
              welcomeText = `प्रेप ज़र में आपका स्वागत है, ${userName}! आपकी व्यक्तिगत शिक्षा यात्रा अब शुरू होती है। हमारा प्रीमियम प्लेटफ़ॉर्म AI-संचालित अध्ययन योजनाएँ, अभ्यास परीक्षण, और आपकी सीखने की शैली के अनुरूप व्यक्तिगत सिफारिशें प्रदान करता है। हम सदस्यता राजस्व का 5% वंचित छात्रों का समर्थन करने के लिए आवंटित करते हैं। यदि आपको किसी भी सहायता की आवश्यकता है, तो अपने एआई ट्यूटर के साथ बातचीत करने के लिए चैट बटन पर क्लिक करें।`;
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
  }, [isFirstTimeUser, userName, language, audioPlayed, audioMuted]);
  
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
  if (!isFirstTimeUser || audioPlayed) return null;
  
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
