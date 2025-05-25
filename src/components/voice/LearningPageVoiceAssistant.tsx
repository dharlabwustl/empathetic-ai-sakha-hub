
import React, { useState, useEffect } from 'react';
import { MessageCircle, Volume2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import UnifiedVoiceAssistant from './UnifiedVoiceAssistant';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

interface LearningPageVoiceAssistantProps {
  userName?: string;
  context?: string;
  pageType?: 'concepts' | 'flashcards' | 'practice-exam' | 'formula-lab' | 'academic-advisor' | 'today-plan' | 'feel-good-corner';
}

const LearningPageVoiceAssistant: React.FC<LearningPageVoiceAssistantProps> = ({
  userName = 'Student',
  context = 'learning',
  pageType = 'concepts'
}) => {
  const { language, t } = useLanguage();
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [hasPlayedGreeting, setHasPlayedGreeting] = useState(false);
  const location = useLocation();

  // Play context-aware greeting when page loads
  useEffect(() => {
    const hasSeenGreeting = sessionStorage.getItem(`learning_greeting_${pageType}_${language}`);
    
    if (!hasSeenGreeting && !hasPlayedGreeting) {
      const timer = setTimeout(() => {
        playLearningGreeting();
        sessionStorage.setItem(`learning_greeting_${pageType}_${language}`, 'true');
        setHasPlayedGreeting(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [pageType, hasPlayedGreeting, language]);

  const playLearningGreeting = () => {
    if ('speechSynthesis' in window) {
      const greetings = {
        concepts: language === 'hi'
          ? `अवधारणा कार्ड में आपका स्वागत है, ${userName}! मैं यहां आपको इंटरैक्टिव शिक्षण के माध्यम से जटिल विषयों को समझने में मदद करने के लिए हूं।`
          : `Welcome to the Concept Cards, ${userName}! I'm here to help you understand complex topics through interactive learning.`,
        flashcards: language === 'hi'
          ? `नमस्ते ${userName}! फ्लैशकार्ड के साथ त्वरित संशोधन के लिए तैयार हैं?`
          : `Hello ${userName}! Ready for some quick revision with flashcards?`,
        'practice-exam': language === 'hi'
          ? `नमस्ते ${userName}! अभ्यास परीक्षाओं के साथ अपने ज्ञान का परीक्षण करने का समय।`
          : `Hi ${userName}! Time to test your knowledge with practice exams.`,
        'formula-lab': language === 'hi'
          ? `फॉर्मूला लैब में आपका स्वागत है, ${userName}! मैं आपको इंटरैक्टिव फॉर्मूला का अन्वेषण करने में मदद करूंगा।`
          : `Welcome to the Formula Lab, ${userName}! I'll help you explore interactive formulas.`,
        'academic-advisor': language === 'hi'
          ? `नमस्ते ${userName}! मैं आपका AI शैक्षणिक सलाहकार हूं।`
          : `Hello ${userName}! I'm your AI academic advisor.`,
        'today-plan': language === 'hi'
          ? `आज की योजना में आपका स्वागत है, ${userName}! मैं आपके दैनिक कार्यों का मार्गदर्शन करूंगा।`
          : `Welcome to Today's Plan, ${userName}! I'll guide you through your daily tasks.`,
        'feel-good-corner': language === 'hi'
          ? `फील गुड कॉर्नर में आपका स्वागत है, ${userName}! यहां आराम करें और तनाव मुक्त हों।`
          : `Welcome to the Feel Good Corner, ${userName}! Here you can relax and de-stress.`
      };

      const speech = new SpeechSynthesisUtterance(greetings[pageType] || greetings.concepts);
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

  return (
    <>
      {/* Floating assistant button for learning pages */}
      <motion.div
        className="fixed bottom-20 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Button
          onClick={() => setIsAssistantOpen(true)}
          className="h-12 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl border-0 relative overflow-hidden group"
        >
          <MessageCircle className="h-5 w-5 relative z-10" />
          
          {/* Study indicator */}
          <motion.div
            className="absolute top-0.5 right-0.5 h-2.5 w-2.5 bg-yellow-400 rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {language === 'hi' ? 'सीखने का सहायक' : 'Learning Assistant'}
          </div>
        </Button>
      </motion.div>

      {/* Learning-focused Voice Assistant */}
      <UnifiedVoiceAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        userName={userName}
        language={language === 'hi' ? 'hi-IN' : 'en-US'}
        context="learning"
        handsFreeMode={true}
      />
    </>
  );
};

export default LearningPageVoiceAssistant;
