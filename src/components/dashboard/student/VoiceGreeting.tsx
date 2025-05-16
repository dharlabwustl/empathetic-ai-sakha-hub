
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
            
            // Create text for speech with corrected pronunciation for PREPZR
            let welcomeText = '';
            if (language === 'en') {
              // Use phonetic spelling to achieve the correct pronunciation
              // "Prep" (pause) "zer" - /prep-zər/
              welcomeText = `Welcome to Prep-zer, ${userName}! Your personalized learning journey begins now. Explore your dashboard to see your study plans, practice tests, and personalized recommendations. If you need any assistance, click the chat button to interact with your AI tutor.`;
            } else if (language === 'hi') {
              welcomeText = `प्रेप्ज़र में आपका स्वागत है, ${userName}! आपकी व्यक्तिगत शिक्षा यात्रा अब शुरू होती है। अपने अध्ययन योजनाओं, अभ्यास परीक्षणों और व्यक्तिगत सिफारिशों को देखने के लिए अपने डैशबोर्ड का अन्वेषण करें। यदि आपको किसी भी सहायता की आवश्यकता है, तो अपने एआई ट्यूटर के साथ बातचीत करने के लिए चैट बटन पर क्लिक करें।`;
            }
            
            // Create speech synthesis utterance
            const speech = new SpeechSynthesisUtterance(welcomeText);
            speech.lang = language === 'en' ? 'en-IN' : 'hi-IN';
            speech.rate = 0.9; // Slightly slower for clarity
            speech.volume = 0.8;
            
            // Find an Indian voice if available
            const voices = window.speechSynthesis.getVoices();
            const preferredVoiceNames = [
              'Google हिन्दी', 'Microsoft Kalpana', 'Microsoft Kajal', 'Google English India'
            ];
            
            // Try to find a preferred voice
            let selectedVoice = null;
            for (const name of preferredVoiceNames) {
              const voice = voices.find(v => v.name.includes(name));
              if (voice) {
                selectedVoice = voice;
                break;
              }
            }
            
            // If no preferred voice, try to find any Indian voice
            if (!selectedVoice) {
              selectedVoice = voices.find(v => 
                v.lang === 'en-IN' || v.lang === 'hi-IN' || v.name.includes('India')
              );
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
  }, [isFirstTimeUser, userName, language, audioPlayed, audioMuted]);
  
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
    <div 
      className={`fixed bottom-20 right-5 z-50 p-3 rounded-full shadow-md
        ${audioPlaying ? 'bg-primary text-white' : 'bg-white text-gray-600'} 
        cursor-pointer transition-all duration-300 hover:scale-105`}
      onClick={handleToggleMute}
    >
      {audioMuted ? (
        <VolumeX className="h-6 w-6" />
      ) : audioPlaying ? (
        <Volume2 className="h-6 w-6 animate-pulse" />
      ) : (
        <Volume className="h-6 w-6" />
      )}
    </div>
  );
};

export default VoiceGreeting;
