
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getDefaultVoiceConfig } from '@/utils/voiceConfig';
import { 
  homepageWelcomeMessages, 
  speakMessagesWithBreaks,
  VoiceMessage 
} from '@/utils/voiceMessages';

interface EnhancedHomepageAssistantProps {
  language?: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
}

const EnhancedHomepageAssistant: React.FC<EnhancedHomepageAssistantProps> = ({ 
  language = 'en-US',
  onSpeakingChange
}) => {
  const [hasPlayedWelcome, setHasPlayedWelcome] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const lastGreetingPathRef = useRef<string>('');
  
  const shouldPlayWelcome = location.pathname === '/';
  
  // Enhanced command processing
  const processVoiceCommand = (transcript: string) => {
    const command = transcript.toLowerCase();
    
    if (command.includes('free trial') || command.includes('trial')) {
      speak("Excellent choice! Starting your free 7-day trial now.");
      navigate('/signup?trial=true');
    }
    else if (command.includes('exam readiness') || command.includes('readiness test')) {
      speak("Let's analyze your current exam preparation level!");
      window.dispatchEvent(new Event('open-exam-analyzer'));
    }
    else if (command.includes('scholarship')) {
      speak("Great! Let's explore scholarship opportunities for you.");
      navigate('/scholarship');
    }
    else if (command.includes('features') || command.includes('what can prepzr do')) {
      speakFeatureOverview();
    }
    else if (command.includes('signup') || command.includes('register')) {
      speak("Perfect! Let's get you started with PREPZR.");
      navigate('/signup');
    }
    else {
      speak("I can help you start your free trial, test your exam readiness, or explore PREPZR's features. What interests you most?");
    }
  };

  const speak = (text: string) => {
    if (!('speechSynthesis' in window) || audioMuted) return;
    
    window.speechSynthesis.cancel();
    const voiceConfig = getDefaultVoiceConfig();
    
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = language;
    speech.rate = 0.95;
    speech.pitch = 1.1;
    speech.volume = 0.8;
    
    if (voiceConfig.voice) {
      speech.voice = voiceConfig.voice;
    }
    
    speech.onstart = () => {
      setIsSpeaking(true);
      if (onSpeakingChange) onSpeakingChange(true);
    };
    
    speech.onend = () => {
      setIsSpeaking(false);
      if (onSpeakingChange) onSpeakingChange(false);
    };
    
    window.speechSynthesis.speak(speech);
  };

  const speakFeatureOverview = async () => {
    const featureMessages: VoiceMessage[] = [
      {
        text: "PREPZR offers revolutionary features for exam preparation.",
        pauseAfter: 1500
      },
      {
        text: "Our AI creates personalized study plans that adapt to your mood and learning patterns.",
        pauseAfter: 2000
      },
      {
        text: "Interactive concept mastery helps you understand complex topics step by step.",
        pauseAfter: 2000
      },
      {
        text: "Smart flashcards use spaced repetition to improve your memory retention.",
        pauseAfter: 2000
      },
      {
        text: "Practice exams simulate real test conditions with detailed performance analysis.",
        pauseAfter: 1500
      },
      {
        text: "Would you like to experience these features with a free trial?",
        pauseAfter: 0
      }
    ];

    const voiceConfig = getDefaultVoiceConfig();
    await speakMessagesWithBreaks(
      featureMessages,
      { ...voiceConfig, language },
      () => {
        setIsSpeaking(true);
        if (onSpeakingChange) onSpeakingChange(true);
      },
      () => {
        setIsSpeaking(false);
        if (onSpeakingChange) onSpeakingChange(false);
      }
    );
  };

  const playWelcomeSequence = async () => {
    if (hasPlayedWelcome || audioMuted || location.pathname !== lastGreetingPathRef.current) return;
    
    const voiceConfig = getDefaultVoiceConfig();
    
    await speakMessagesWithBreaks(
      homepageWelcomeMessages,
      { ...voiceConfig, language },
      () => {
        setIsSpeaking(true);
        if (onSpeakingChange) onSpeakingChange(true);
      },
      () => {
        setIsSpeaking(false);
        if (onSpeakingChange) onSpeakingChange(false);
        setHasPlayedWelcome(true);
      }
    );
  };

  // Play welcome message for homepage visitors
  useEffect(() => {
    if (shouldPlayWelcome && !audioMuted && location.pathname !== lastGreetingPathRef.current) {
      lastGreetingPathRef.current = location.pathname;
      
      // Delay to ensure page is loaded
      setTimeout(() => {
        playWelcomeSequence();
      }, 2000);
    }
  }, [location.pathname, audioMuted, shouldPlayWelcome]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return null; // This component only handles voice logic
};

export default EnhancedHomepageAssistant;
