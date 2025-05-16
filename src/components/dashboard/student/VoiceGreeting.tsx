
import React, { useEffect, useState } from 'react';
import { Volume, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  // Load voices when component mounts
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
        console.log("Available voices loaded:", voices.length);
      }
    };
    
    // Load voices right away in case they're already available
    loadVoices();
    
    // Also set up event for when voices are loaded asynchronously
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);
  
  useEffect(() => {
    // Check if the greeting has been played already in this session
    const hasPlayed = sessionStorage.getItem('voiceGreetingPlayed') === 'true';
    
    // Only play for first time users who haven't heard the greeting yet
    if (isFirstTimeUser && !hasPlayed && !audioPlayed && !audioMuted && availableVoices.length > 0) {
      const playGreeting = async () => {
        try {
          // Use a timeout to ensure the component is fully mounted
          setTimeout(() => {
            setAudioPlaying(true);
            
            // Create text for speech with corrected pronunciation for PREPZR
            let welcomeText = '';
            if (language === 'en') {
              // Use phonetic spelling to achieve the correct pronunciation
              // "Prep" (pause) "zer" - /prep-zər/
              welcomeText = `Namaste, ${userName}! Welcome to Prep-zer. I am your personal AI voice assistant with an Indian accent. Your personalized learning journey begins now. Let me guide you through your dashboard. You can speak with me anytime by clicking the voice assistant button in the bottom right corner.`;
            } else if (language === 'hi') {
              welcomeText = `नमस्ते ${userName}! प्रेप्ज़र में आपका स्वागत है। मैं आपका व्यक्तिगत एआई सहायक हूं। आपकी पढ़ाई की यात्रा अब शुरू होती है। मैं आपको आपके डैशबोर्ड के बारे में बताऊंगा। आप कभी भी नीचे दाएं कोने में मौजूद वॉइस असिस्टेंट बटन पर क्लिक करके मुझसे बात कर सकते हैं।`;
            }
            
            // Create speech synthesis utterance
            const speech = new SpeechSynthesisUtterance(welcomeText);
            
            // Find a suitable Indian voice
            const preferredVoiceNames = [
              'Google हिन्दी', 'Microsoft Kalpana', 'Microsoft Kajal', 'Google English India'
            ];
            
            // Look for preferred voices first
            let selectedVoice = null;
            for (const name of preferredVoiceNames) {
              const voice = availableVoices.find(v => v.name.includes(name));
              if (voice) {
                selectedVoice = voice;
                break;
              }
            }
            
            // If no preferred voice found, try to find any English (India) voice
            if (!selectedVoice) {
              selectedVoice = availableVoices.find(v => 
                v.lang === 'en-IN' || 
                v.lang === 'hi-IN' || 
                v.lang.includes('en') || 
                v.lang.includes('hi')
              );
            }
            
            // If a voice was found, use it
            if (selectedVoice) {
              speech.voice = selectedVoice;
              console.log("Using voice:", selectedVoice.name);
            }
            
            speech.lang = language === 'en' ? 'en-IN' : 'hi-IN';
            speech.rate = 0.9; // Slightly slower for clarity
            speech.pitch = 1.1; // Slightly higher for female voice
            speech.volume = 0.8;
            
            // Add event listeners
            speech.onstart = () => setAudioPlaying(true);
            speech.onend = () => {
              setAudioPlaying(false);
              setAudioPlayed(true);
              sessionStorage.setItem('voiceGreetingPlayed', 'true');
            };
            speech.onerror = () => {
              console.error("Speech synthesis error");
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
      
      playGreeting();
    }
  }, [isFirstTimeUser, userName, language, audioPlayed, audioMuted, availableVoices]);
  
  const handleToggleMute = () => {
    setAudioMuted(!audioMuted);
    
    if (!audioMuted) {
      // If currently not muted and about to be muted, stop any speech
      window.speechSynthesis.cancel();
      setAudioPlaying(false);
      setAudioPlayed(true);
      sessionStorage.setItem('voiceGreetingPlayed', 'true');
    }
  };
  
  // Don't render anything if already played or not a first-time user
  if (!isFirstTimeUser || audioPlayed) return null;
  
  return (
    <motion.div 
      className={`fixed bottom-20 right-5 z-50 p-3 rounded-full shadow-md
        ${audioPlaying ? 'bg-primary text-white' : 'bg-white text-gray-600'} 
        cursor-pointer transition-all duration-300 hover:scale-105`}
      onClick={handleToggleMute}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      {audioMuted ? (
        <VolumeX className="h-6 w-6" />
      ) : audioPlaying ? (
        <Volume2 className="h-6 w-6 animate-pulse" />
      ) : (
        <Volume className="h-6 w-6" />
      )}
    </motion.div>
  );
};

export default VoiceGreeting;
