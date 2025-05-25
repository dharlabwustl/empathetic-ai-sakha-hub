import React, { useState, useEffect } from 'react';
import { Volume2, Settings, Mic } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import UnifiedVoiceAssistant from './UnifiedVoiceAssistant';
import { useLocation, useNavigate } from 'react-router-dom';

interface FloatingVoiceButtonProps {
  userName?: string;
  language?: string;
  context?: 'homepage' | 'dashboard' | 'learning' | 'concepts' | 'flashcards' | 'practice-exam' | 'formula-lab' | 'academic-advisor' | 'todays-plan';
}

const FloatingVoiceButton: React.FC<FloatingVoiceButtonProps> = ({
  userName = 'Student',
  language = 'en-US',
  context = 'homepage'
}) => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [hasPlayedGreeting, setHasPlayedGreeting] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if user is first time or returning
  useEffect(() => {
    const userLoginCount = localStorage.getItem('user_login_count');
    const hasSeenTour = localStorage.getItem('sawWelcomeTour');
    const newUserSignup = localStorage.getItem('new_user_signup');
    
    setIsFirstTimeUser(
      newUserSignup === 'true' || 
      !hasSeenTour || 
      !userLoginCount || 
      parseInt(userLoginCount) <= 1
    );
  }, [location.pathname]);

  // Auto-play intelligent greeting
  useEffect(() => {
    const greetingKey = `voice_greeting_${context}_${Date.now()}`;
    const hasSeenGreeting = sessionStorage.getItem(greetingKey);
    
    if (!hasSeenGreeting && !hasPlayedGreeting) {
      const timer = setTimeout(() => {
        playContextualGreeting();
        sessionStorage.setItem(greetingKey, 'true');
        setHasPlayedGreeting(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, hasPlayedGreeting, context]);

  const playContextualGreeting = () => {
    if ('speechSynthesis' in window) {
      const messages = getContextualGreetingMessages();
      
      const speech = new SpeechSynthesisUtterance(messages.greeting);
      speech.lang = language;
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

      // Chain messages for comprehensive greeting
      speech.onend = () => {
        setTimeout(() => {
          const followUpSpeech = new SpeechSynthesisUtterance(messages.followUp);
          followUpSpeech.lang = language;
          followUpSpeech.rate = 0.9;
          followUpSpeech.pitch = 1.1;
          followUpSpeech.volume = 0.8;
          if (femaleVoice) followUpSpeech.voice = femaleVoice;
          
          window.speechSynthesis.speak(followUpSpeech);
        }, 1000);
      };

      window.speechSynthesis.speak(speech);
    }
  };

  const getContextualGreetingMessages = () => {
    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    
    if (context === 'homepage') {
      if (isFirstTimeUser) {
        return {
          greeting: `${timeGreeting} and welcome to PREPZR! I'm Sakha AI, your intelligent exam preparation companion. PREPZR is India's first emotionally aware learning platform that adapts to your unique style and mood.`,
          followUp: "I can help you sign up for a free trial, analyze your exam readiness, or explore our advanced features. Try saying 'Sign up', 'Free trial', or 'Tell me about PREPZR'. You can also click my icon for hands-free interaction!"
        };
      } else {
        return {
          greeting: `${timeGreeting}, ${userName}! Welcome back to PREPZR. I'm Sakha AI, ready to assist you with your exam preparation journey.`,
          followUp: "I can help you navigate our features, start your study session, or answer any questions. Click my icon to begin or just start speaking for hands-free interaction!"
        };
      }
    }
    
    if (context === 'dashboard') {
      if (isFirstTimeUser) {
        return {
          greeting: `Congratulations on joining PREPZR, ${userName}! I'm Sakha AI, and I'm excited to guide you through your personalized dashboard.`,
          followUp: "Let me help you explore your study plan, concept cards, flashcards, practice exams, formula lab, and academic advisor. I can explain each feature and help you get started. What would you like to explore first?"
        };
      } else {
        return {
          greeting: `${timeGreeting}, ${userName}! Ready to continue your exam preparation? I can see your dashboard is loaded with personalized content.`,
          followUp: "I can help you check your daily tasks, review pending items, navigate to any section, or provide study guidance. What would you like to focus on today?"
        };
      }
    }
    
    // Other contexts
    const contextMessages = {
      'todays-plan': {
        greeting: `${timeGreeting}, ${userName}! Let's review your personalized study plan for today.`,
        followUp: "I can help you understand your tasks, track progress, mark items complete, or suggest optimizations based on your current mood and energy level."
      },
      concepts: {
        greeting: `Welcome to Concept Cards, ${userName}! Ready to master complex topics through interactive learning?`,
        followUp: "I can explain difficult concepts, create custom flashcards, suggest related topics, or help with problem-solving techniques."
      },
      flashcards: {
        greeting: `${timeGreeting}, ${userName}! Time for some smart revision with flashcards.`,
        followUp: "I can help create new cards, explain concepts, track your progress, or suggest optimal revision patterns based on memory science."
      },
      'practice-exam': {
        greeting: `Ready to test your knowledge, ${userName}? Let's make your practice sessions more effective.`,
        followUp: "I can help start exams, explain answers, identify weak areas, suggest improvement strategies, or analyze your performance trends."
      },
      'formula-lab': {
        greeting: `Welcome to Formula Lab, ${userName}! Let's explore interactive formulas and mathematical concepts.`,
        followUp: "I can help with derivations, solve problems step by step, explain applications, or suggest practice problems."
      },
      'academic-advisor': {
        greeting: `${timeGreeting}, ${userName}! I'm your AI academic advisor, ready to help optimize your study strategy.`,
        followUp: "I can analyze your performance, suggest study plans, recommend resources, provide career guidance, or help with exam stress management."
      }
    };
    
    return contextMessages[context] || contextMessages['todays-plan'];
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
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
      >
        <Button
          onClick={() => setIsAssistantOpen(true)}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl border-0 relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
          
          <div className="relative z-10 flex flex-col items-center">
            <Volume2 className="h-6 w-6 mb-1" />
            <Mic className="h-3 w-3" />
          </div>
          
          {/* AI indicator */}
          <motion.div
            className="absolute top-1 right-1 h-3 w-3 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/30"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </Button>
        
        {/* Enhanced tooltip */}
        <motion.div
          className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-black/90 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          <div className="text-center">
            <div className="font-semibold">Sakha AI Assistant</div>
            <div className="text-xs text-gray-300">Click or speak for help</div>
          </div>
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
        </motion.div>
      </motion.div>

      {/* Unified Voice Assistant */}
      <UnifiedVoiceAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        userName={userName}
        language={language}
        context={context}
        onNavigationCommand={handleNavigationCommand}
      />
    </>
  );
};

export default FloatingVoiceButton;
