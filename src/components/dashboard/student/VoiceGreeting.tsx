
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
  
  useEffect(() => {
    // Check if the greeting has been played already in this session
    const hasPlayed = sessionStorage.getItem('voiceGreetingPlayed') === 'true';
    const currentPath = location.pathname;
    
    // Only play for first time users who haven't heard the greeting yet
    if (isFirstTimeUser && !hasPlayed && !audioPlayed && !audioMuted) {
      const playGreeting = async () => {
        try {
          // Use a timeout to ensure the component is fully mounted
          setTimeout(() => {
            setAudioPlaying(true);
            
            // Context-aware greeting based on the current page
            let welcomeText = getContextAwareGreeting(currentPath, userName, language);
            
            // Create speech synthesis utterance
            const speech = createSpeechUtterance(welcomeText, language);
            
            // Add event listeners for speech events
            configureSpeechEvents(speech);
            
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
  }, [isFirstTimeUser, userName, language, audioPlayed, audioMuted, location.pathname]);
  
  // Generate context-aware greeting based on current page
  const getContextAwareGreeting = (path: string, name: string, lang: string): string => {
    // Only explain pronunciation once per user session
    const isPronunciationNeeded = sessionStorage.getItem('explainedPronunciation') !== 'true';
    
    // Mark that we've explained pronunciation
    if (isPronunciationNeeded) {
      sessionStorage.setItem('explainedPronunciation', 'true');
    }
    
    // Only add pronunciation explanation the first time
    const pronunciationExplanation = isPronunciationNeeded ? 
      ' Prep-zer is pronounced as "prep" like in preparation and "zer" like in laser. ' : '';
    
    if (lang === 'en') {
      if (path.includes('/dashboard/student/today')) {
        return `Hello ${name}! Welcome to your daily study plan.${pronunciationExplanation} Here you'll find tasks and concepts scheduled for today. Focus on completing these to stay on track with your exam preparation.`;
      } else if (path.includes('/dashboard/student/concepts')) {
        return `Welcome to the concepts section, ${name}!${pronunciationExplanation} Here you can explore and master the topics you need to learn. Each concept card contains detailed explanations, practice questions, and related resources.`;
      } else if (path.includes('/dashboard/student/flashcards')) {
        return `Welcome to flashcards, ${name}!${pronunciationExplanation} This section helps you memorize key information through spaced repetition. Regular practice with these cards will strengthen your recall during exams.`;
      } else if (path.includes('/dashboard/student/practice-exam')) {
        return `Welcome to practice exams, ${name}!${pronunciationExplanation} Taking these tests under timed conditions will help you prepare for the real exam environment and identify areas that need improvement.`;
      } else if (path.includes('/dashboard/student/analytics')) {
        return `Welcome to your analytics dashboard, ${name}!${pronunciationExplanation} Here you can track your progress and identify strengths and weaknesses in your exam preparation journey.`;
      } else {
        // Default dashboard greeting
        return `Welcome to your personalized dashboard, ${name}!${pronunciationExplanation} I'm your AI tutor and I'll help you prepare for your exams efficiently. You can track your progress, access your study materials, and get personalized recommendations here.`;
      }
    } else if (lang === 'hi') {
      // Hindi greetings (simplified for now)
      return `नमस्ते ${name}! प्रेप-ज़र में आपका स्वागत है। मैं आपका AI ट्यूटर हूँ और आपकी परीक्षा तैयारी में मदद करूँगा।`;
    }
    
    return `Welcome to Prep-zer, ${name}!`;
  };
  
  // Create a properly configured speech utterance
  const createSpeechUtterance = (text: string, lang: string) => {
    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Create speech synthesis utterance
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = lang === 'en' ? 'en-IN' : 'hi-IN';
    speech.rate = 0.95; // Slightly slower for clarity
    speech.volume = 0.85;
    speech.pitch = 1.05; // Slightly higher for a more pleasant tone
    
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
    }
    
    return speech;
  };
  
  // Configure speech event handlers
  const configureSpeechEvents = (speech: SpeechSynthesisUtterance) => {
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
