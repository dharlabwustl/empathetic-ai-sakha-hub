
import React, { useState, useEffect } from 'react';
import { MessageCircle, Volume2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import UnifiedVoiceAssistant from './UnifiedVoiceAssistant';
import { useLocation } from 'react-router-dom';

interface LearningPageVoiceAssistantProps {
  userName?: string;
  context?: 'concepts' | 'flashcards' | 'practice-exam' | 'formula-lab' | 'academic-advisor';
  pageType?: 'concepts' | 'flashcards' | 'practice-exam' | 'formula-lab' | 'academic-advisor';
}

const LearningPageVoiceAssistant: React.FC<LearningPageVoiceAssistantProps> = ({
  userName = 'Student',
  context = 'learning',
  pageType = 'concepts'
}) => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [hasPlayedGreeting, setHasPlayedGreeting] = useState(false);
  const location = useLocation();

  // Play context-aware greeting when page loads
  useEffect(() => {
    const hasSeenGreeting = sessionStorage.getItem(`learning_greeting_${pageType}`);
    
    if (!hasSeenGreeting && !hasPlayedGreeting) {
      const timer = setTimeout(() => {
        playLearningGreeting();
        sessionStorage.setItem(`learning_greeting_${pageType}`, 'true');
        setHasPlayedGreeting(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [pageType, hasPlayedGreeting]);

  const playLearningGreeting = () => {
    if ('speechSynthesis' in window) {
      const greetings = {
        concepts: `Welcome to the Concept Cards, ${userName}! I'm here to help you understand complex topics through interactive learning. Ask me to explain any concept or create custom flashcards.`,
        flashcards: `Hello ${userName}! Ready for some quick revision with flashcards? I can help you create new cards, explain difficult topics, or suggest optimal study techniques.`,
        'practice-exam': `Hi ${userName}! Time to test your knowledge with practice exams. I can help you understand questions, explain answers, or suggest areas for improvement based on your performance.`,
        'formula-lab': `Welcome to the Formula Lab, ${userName}! I'll help you explore interactive formulas, understand derivations, and solve practice problems step by step.`,
        'academic-advisor': `Hello ${userName}! I'm your AI academic advisor. I can help you plan your studies, track progress, and provide personalized recommendations for exam success.`
      };

      const speech = new SpeechSynthesisUtterance(greetings[pageType] || greetings.concepts);
      speech.lang = 'en-US';
      speech.rate = 0.9;
      speech.pitch = 1.1;
      speech.volume = 0.8;

      // Use consistent female voice
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.includes('Female') || 
        voice.name.includes('Zira') ||
        voice.name.includes('Samantha') ||
        (!voice.name.includes('Male') && voice.lang.includes('en'))
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
            Learning Assistant
          </div>
        </Button>
      </motion.div>

      {/* Learning-focused Voice Assistant */}
      <UnifiedVoiceAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        userName={userName}
        language="en-US"
        context={pageType}
      />
    </>
  );
};

export default LearningPageVoiceAssistant;
