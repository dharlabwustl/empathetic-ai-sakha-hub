
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'react-router-dom';

interface VoiceSettings {
  enabled: boolean;
  handsFree: boolean;
  voice: SpeechSynthesisVoice | null;
  volume: number;
  rate: number;
  pitch: number;
}

export const useUnifiedVoiceAssistant = (userName?: string) => {
  const { language, t } = useLanguage();
  const location = useLocation();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [settings, setSettings] = useState<VoiceSettings>({
    enabled: true,
    handsFree: true,
    voice: null,
    volume: 0.8,
    rate: 0.9,
    pitch: 1.1
  });
  
  const recognitionRef = useRef<any>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [hasPlayedGreeting, setHasPlayedGreeting] = useState(false);

  // Load available voices and select female voice
  useEffect(() => {
    const loadVoices = () => {
      if ('speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        
        // Find female voice based on language
        const femaleVoiceNames = [
          'Google हिन्दी Female', 'Microsoft Hindi Female', 'Neerja',
          'Google US English Female', 'Microsoft Zira', 'Samantha', 'Karen'
        ];
        
        let selectedVoice = null;
        
        if (language === 'hi') {
          selectedVoice = voices.find(voice => 
            voice.lang.includes('hi') && 
            (voice.name.toLowerCase().includes('female') || femaleVoiceNames.some(name => voice.name.includes(name)))
          );
        } else {
          selectedVoice = voices.find(voice => 
            voice.lang.includes('en') && 
            (voice.name.toLowerCase().includes('female') || femaleVoiceNames.some(name => voice.name.includes(name)))
          );
        }
        
        if (!selectedVoice) {
          selectedVoice = voices.find(voice => voice.lang.includes(language === 'hi' ? 'hi' : 'en')) || voices[0];
        }
        
        if (selectedVoice) {
          setSettings(prev => ({ ...prev, voice: selectedVoice }));
        }
      }
    };
    
    loadVoices();
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [language]);

  // Initialize speech recognition
  useEffect(() => {
    if (!settings.enabled) return;
    
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = settings.handsFree;
      recognition.interimResults = true;
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => {
        setIsListening(false);
        if (settings.handsFree && settings.enabled) {
          setTimeout(() => startListening(), 1000);
        }
      };
      
      recognition.onresult = (event: any) => {
        const last = event.results.length - 1;
        const result = event.results[last];
        if (result.isFinal) {
          const currentTranscript = result[0].transcript.trim();
          setTranscript(currentTranscript);
          processVoiceCommand(currentTranscript);
        }
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [settings.enabled, settings.handsFree, language]);

  // Auto-play greeting
  useEffect(() => {
    if (!hasPlayedGreeting && settings.enabled) {
      const timer = setTimeout(() => {
        playContextualGreeting();
        setHasPlayedGreeting(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, hasPlayedGreeting, settings.enabled, language]);

  const playContextualGreeting = () => {
    const context = getPageContext();
    let message = '';
    
    if (context === 'homepage') {
      message = language === 'hi' 
        ? `PREPZR में आपका स्वागत है! मैं साक्षा AI हूं, आपका बुद्धिमान अध्ययन साथी। PREPZR भारत का पहला भावनात्मक रूप से जागरूक परीक्षा तैयारी प्लेटफॉर्म है। हम व्यक्तिगत शिक्षा पथ, अनुकूली अध्ययन योजना और उन्नत AI ट्यूटरिंग प्रदान करते हैं।`
        : `Welcome to PREPZR! I'm Sakha AI, your intelligent study companion. PREPZR is India's first emotionally aware exam preparation platform. We offer personalized learning paths, adaptive study plans, and advanced AI tutoring.`;
    } else if (context === 'dashboard') {
      message = language === 'hi'
        ? `वापसी पर स्वागत ${userName || 'छात्र'}! मैं आपके डैशबोर्ड में नेविगेट करने और आपके अध्ययन सत्रों को अनुकूलित करने में मदद करने के लिए यहां हूं।`
        : `Welcome back ${userName || 'Student'}! I'm here to help you navigate your dashboard and optimize your study sessions.`;
    }
    
    speakText(message);
  };

  const getPageContext = () => {
    if (location.pathname === '/') return 'homepage';
    if (location.pathname.includes('/dashboard')) return 'dashboard';
    if (location.pathname.includes('/concepts')) return 'concepts';
    if (location.pathname.includes('/flashcards')) return 'flashcards';
    if (location.pathname.includes('/today')) return 'todaysPlan';
    if (location.pathname.includes('/academic')) return 'academicAdvisor';
    if (location.pathname.includes('/feel-good')) return 'feelGoodCorner';
    return 'general';
  };

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Language switching commands
    if (lowerCommand.includes('change language') || lowerCommand.includes('भाषा बदलें')) {
      if (lowerCommand.includes('hindi') || lowerCommand.includes('हिंदी')) {
        // Switch to Hindi through language context
        speakText(language === 'hi' ? 'हिंदी में बदल रहे हैं' : 'Switching to Hindi');
      } else if (lowerCommand.includes('english') || lowerCommand.includes('अंग्रेजी')) {
        // Switch to English through language context
        speakText(language === 'hi' ? 'अंग्रेजी में बदल रहे हैं' : 'Switching to English');
      }
      return;
    }
    
    // Context-aware responses
    const context = getPageContext();
    let response = '';
    
    if (lowerCommand.includes('help') || lowerCommand.includes('मदद')) {
      response = getHelpMessage(context);
    } else if (lowerCommand.includes('features') || lowerCommand.includes('विशेषताएं')) {
      response = getFeaturesMessage();
    } else if (lowerCommand.includes('study plan') || lowerCommand.includes('अध्ययन योजना')) {
      response = language === 'hi' 
        ? 'आपकी व्यक्तिगत अध्ययन योजना तैयार कर रहे हैं।'
        : 'Preparing your personalized study plan.';
    } else {
      response = language === 'hi'
        ? 'मैं आपकी मदद करने के लिए यहां हूं। कृपया अपना प्रश्न पूछें।'
        : "I'm here to help you. Please ask your question.";
    }
    
    speakText(response);
  };

  const getHelpMessage = (context: string) => {
    const messages = {
      homepage: language === 'hi' 
        ? 'PREPZR के बारे में जानने के लिए, मुफ्त परीक्षण शुरू करने या साइन अप करने के लिए मुझसे पूछें।'
        : 'Ask me about PREPZR features, start a free trial, or sign up for an account.',
      dashboard: language === 'hi'
        ? 'मैं आपकी अध्ययन योजना, अवधारणा कार्ड, अभ्यास परीक्षा और अधिक के साथ मदद कर सकता हूं।'
        : 'I can help with your study plan, concept cards, practice exams, and more.',
      concepts: language === 'hi'
        ? 'मैं अवधारणाओं को समझाने और कस्टम फ्लैशकार्ड बनाने में मदद कर सकता हूं।'
        : 'I can help explain concepts and create custom flashcards.',
      todaysPlan: language === 'hi'
        ? 'आज की योजना के बारे में पूछें या कार्यों को पूरा करने में मदद लें।'
        : 'Ask about today\'s plan or get help completing tasks.'
    };
    
    return messages[context] || messages.dashboard;
  };

  const getFeaturesMessage = () => {
    return language === 'hi'
      ? 'PREPZR की मुख्य विशेषताएं हैं: व्यक्तिगत अध्ययन योजना, अवधारणा कार्ड, इंटरैक्टिव फ्लैशकार्ड, अभ्यास परीक्षा, फॉर्मूला लैब, और शैक्षिक सलाहकार।'
      : 'PREPZR features include: personalized study plans, concept cards, interactive flashcards, practice exams, formula lab, and academic advisor.';
  };

  const speakText = (text: string) => {
    if (!settings.enabled || isSpeaking) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (settings.voice) {
      utterance.voice = settings.voice;
    }
    
    utterance.volume = settings.volume;
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (recognitionRef.current && settings.enabled) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const updateSettings = (newSettings: Partial<VoiceSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return {
    isListening,
    isSpeaking,
    transcript,
    settings,
    availableVoices,
    speakText,
    startListening,
    stopListening,
    updateSettings,
    playContextualGreeting
  };
};
