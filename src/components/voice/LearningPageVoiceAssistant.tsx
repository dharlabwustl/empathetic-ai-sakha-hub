
import React, { useState, useEffect } from 'react';
import { MessageCircle, Volume2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import UnifiedVoiceAssistant from './UnifiedVoiceAssistant';
import { useLocation } from 'react-router-dom';

interface LearningPageVoiceAssistantProps {
  userName?: string;
  context?: string;
  pageType?: 'concepts' | 'flashcards' | 'practice-exam' | 'formula-lab' | 'academic-advisor' | 'today-plan';
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
        concepts: `Welcome to Concept Cards, ${userName}! I'm Sakha AI, here to help you master complex topics through interactive learning. You can ask me to explain any concept, create custom study notes, or guide you through the learning process.`,
        flashcards: `Hello ${userName}! Ready for smart revision with flashcards? I'm Sakha AI, and I can help you optimize your learning with spaced repetition, explain difficult topics, or create new flashcards based on your weak areas.`,
        'practice-exam': `Hi ${userName}! Time to test your knowledge with practice exams. I'm Sakha AI, and I can help you understand questions, explain detailed solutions, analyze your performance, and suggest improvement strategies.`,
        'formula-lab': `Welcome to the Formula Lab, ${userName}! I'm Sakha AI, here to help you explore interactive formulas, understand derivations step by step, and solve practice problems with detailed explanations.`,
        'academic-advisor': `Hello ${userName}! I'm Sakha AI, your personal academic advisor. I can help you plan your studies, track progress, analyze weak areas, and provide personalized recommendations for exam success.`,
        'today-plan': `Welcome to Today's Plan, ${userName}! I'm Sakha AI, here to guide you through your personalized daily study schedule. I can explain tasks, help prioritize activities, and provide study assistance throughout your session.`
      };

      const speech = new SpeechSynthesisUtterance(greetings[pageType] || greetings.concepts);
      speech.lang = 'en-US';
      speech.rate = 0.9;
      speech.pitch = 1.1;
      speech.volume = 0.8;

      // Try to find a good voice
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        (!voice.name.toLowerCase().includes('male') && voice.lang.includes('en'))
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
        context="learning"
      />
    </>
  );
};

export default LearningPageVoiceAssistant;
