
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { getPreferredAccent } from '@/components/dashboard/student/voice/voiceUtils';

interface HomePageVoiceAssistantProps {
  language?: string;
}

const HomePageVoiceAssistant: React.FC<HomePageVoiceAssistantProps> = ({ 
  language = getPreferredAccent()
}) => {
  const { toast } = useToast();
  const [hasSpoken, setHasSpoken] = useState(false);
  
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('has_visited_home') === 'true';
    
    // Check if voice is muted
    const isVoiceMuted = localStorage.getItem('voice_assistant_muted') === 'true';
    const isVoiceDisabled = localStorage.getItem('voice_assistant_enabled') === 'false';
    
    if (!hasVisitedBefore && !isVoiceMuted && !isVoiceDisabled && !hasSpoken) {
      // First time visitor
      setTimeout(() => {
        speakWelcome();
        localStorage.setItem('has_visited_home', 'true');
        setHasSpoken(true);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const speakWelcome = () => {
    if (!('speechSynthesis' in window)) {
      return;
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    let welcomeText;
    
    // Different welcome text based on language
    if (language === 'hi-IN') {
      welcomeText = "नमस्ते और प्रेप-ज़र में आपका स्वागत है। हम आपकी परीक्षा की तैयारी में मदद करने के लिए यहां हैं।";
    } else if (language === 'en-IN') {
      welcomeText = "Namaste and welcome to PREP-zer. We're here to help you ace your exams with personalized guidance.";
    } else if (language === 'en-GB') {
      welcomeText = "Welcome to PREP-zer. We're here to help you ace your exams with personalised guidance and intelligent study plans.";
    } else {
      welcomeText = "Welcome to PREP-zer. We're here to help you ace your exams with personalized guidance and intelligent study plans.";
    }
    
    const utterance = new SpeechSynthesisUtterance(welcomeText);
    utterance.lang = language;
    
    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Try to find a language-matching voice
    const matchingVoices = voices.filter(voice => voice.lang.startsWith(language));
    
    if (matchingVoices.length > 0) {
      // Prefer female voices
      const femaleVoice = matchingVoices.find(voice => 
        !voice.name.toLowerCase().includes('male') || 
        voice.name.toLowerCase().includes('female')
      );
      utterance.voice = femaleVoice || matchingVoices[0];
    }
    
    // Event handlers
    utterance.onend = () => {
      // Prompt user about voice assistant
      toast({
        title: "Voice Assistant Available",
        description: "Click the voice button in the bottom right corner for voice help.",
        duration: 5000,
      });
    };
    
    // Speak
    window.speechSynthesis.speak(utterance);
  };
  
  return null; // This component only handles the voice functionality
};

export default HomePageVoiceAssistant;
