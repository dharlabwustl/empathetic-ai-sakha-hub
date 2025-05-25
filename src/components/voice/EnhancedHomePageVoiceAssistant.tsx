
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface EnhancedHomePageVoiceAssistantProps {
  language?: string;
}

const EnhancedHomePageVoiceAssistant: React.FC<EnhancedHomePageVoiceAssistantProps> = ({ 
  language = 'en-US'
}) => {
  const { toast } = useToast();
  const [hasGreeted, setHasGreeted] = useState(false);

  useEffect(() => {
    // Auto greet visitor after 3 seconds
    const timer = setTimeout(() => {
      if (!hasGreeted) {
        speakWelcomeMessage();
        setHasGreeted(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasGreeted]);

  const speakWelcomeMessage = () => {
    if ('speechSynthesis' in window) {
      const message = "Welcome to PREP-zer! I'm Sakha AI, your intelligent exam preparation assistant. I'm here to help you crack any competitive exam with personalized study plans, smart insights, and continuous support. Feel free to explore our features or ask me anything about exam preparation!";
      
      const speech = new SpeechSynthesisUtterance();
      speech.text = message;
      speech.lang = language;
      speech.volume = 0.8;
      speech.rate = 0.9;
      speech.pitch = 1.1;
      
      // Get available voices and select a preferred one
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('zira') ||
        voice.name.toLowerCase().includes('samantha')
      );
      
      if (femaleVoice) {
        speech.voice = femaleVoice;
      }
      
      window.speechSynthesis.speak(speech);
    }
  };

  return null; // This component doesn't render anything visible
};

export default EnhancedHomePageVoiceAssistant;
