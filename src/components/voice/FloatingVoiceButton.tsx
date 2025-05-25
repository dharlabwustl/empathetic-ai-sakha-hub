
import React, { useState, useEffect } from 'react';
import { Volume2, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import UnifiedVoiceAssistant from './UnifiedVoiceAssistant';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

interface FloatingVoiceButtonProps {
  userName?: string;
  language?: string;
  handsFreeMode?: boolean;
}

const FloatingVoiceButton: React.FC<FloatingVoiceButtonProps> = ({
  userName = 'Student',
  language: voiceLang = 'en-US',
  handsFreeMode = true
}) => {
  const { language, t } = useLanguage();
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [hasPlayedGreeting, setHasPlayedGreeting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine context based on current route
  const getContext = () => {
    if (location.pathname === '/') return 'homepage';
    if (location.pathname.includes('/dashboard')) return 'dashboard';
    if (location.pathname.includes('/concepts') || 
        location.pathname.includes('/flashcards') || 
        location.pathname.includes('/practice-exam')) return 'learning';
    return 'homepage';
  };

  // Auto-play intelligent greeting on page load
  useEffect(() => {
    const context = getContext();
    const hasSeenGreeting = sessionStorage.getItem(`voice_greeting_${context}_${language}`);
    
    if (!hasSeenGreeting && !hasPlayedGreeting) {
      const timer = setTimeout(() => {
        playContextualGreeting(context);
        sessionStorage.setItem(`voice_greeting_${context}_${language}`, 'true');
        setHasPlayedGreeting(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, hasPlayedGreeting, language]);

  const playContextualGreeting = (context: string) => {
    if ('speechSynthesis' in window) {
      const messages = {
        homepage: language === 'hi' 
          ? `PREPZR में आपका स्वागत है! मैं सखा AI हूं, आपका बुद्धिमान अध्ययन साथी। PREPZR भारत का पहला भावनात्मक रूप से जागरूक परीक्षा तैयारी प्लेटफॉर्म है। हम व्यक्तिगत शिक्षा पथ, अनुकूली अध्ययन योजनाएं और उन्नत AI ट्यूटरिंग प्रदान करते हैं।`
          : `Welcome to PREPZR! I'm Sakha AI, your intelligent study companion. PREPZR is India's first emotionally aware exam preparation platform. We offer personalized learning paths, adaptive study plans, and advanced AI tutoring.`,
        dashboard: language === 'hi'
          ? `वापस स्वागत है ${userName}! मैं आपके डैशबोर्ड को नेविगेट करने और आपके अध्ययन सत्रों को अनुकूलित करने में मदद करने के लिए यहां हूं।`
          : `Welcome back ${userName}! I'm here to help you navigate your dashboard and optimize your study sessions.`,
        learning: language === 'hi'
          ? `नमस्ते ${userName}! मैं आपकी सीखने की यात्रा का समर्थन करने के लिए यहां हूं।`
          : `Hello ${userName}! I'm here to support your learning journey.`
      };

      const speech = new SpeechSynthesisUtterance(messages[context] || messages.homepage);
      speech.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      speech.rate = 0.9;
      speech.pitch = 1.1;
      speech.volume = 0.8;

      // Try to find a good voice
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        (!voice.name.toLowerCase().includes('male') && voice.lang.includes(language === 'hi' ? 'hi' : 'en'))
      );
      
      if (femaleVoice) {
        speech.voice = femaleVoice;
      }

      window.speechSynthesis.speak(speech);
    }
  };

  const handleNavigationCommand = (route: string) => {
    navigate(route);
  };

  // Don't show on auth pages
  if (location.pathname.includes('/login') || 
      location.pathname.includes('/signup') || 
      location.pathname.includes('/admin')) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
      >
        <Button
          onClick={() => setIsAssistantOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl border-0 relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
          
          <Volume2 className="h-6 w-6 relative z-10" />
          
          {/* Pulsing indicator for hands-free mode */}
          {handsFreeMode && (
            <motion.div
              className="absolute top-1 right-1 h-3 w-3 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          
          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/30"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </Button>
        
        {/* Tooltip */}
        <motion.div
          className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          {language === 'hi' ? 'सखा AI सहायक' : 'Sakha AI Assistant'}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
        </motion.div>
      </motion.div>

      {/* Unified Voice Assistant with hands-free mode */}
      <UnifiedVoiceAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        userName={userName}
        language={language === 'hi' ? 'hi-IN' : 'en-US'}
        context={getContext()}
        onNavigationCommand={handleNavigationCommand}
        handsFreeMode={handsFreeMode}
      />
    </>
  );
};

export default FloatingVoiceButton;
