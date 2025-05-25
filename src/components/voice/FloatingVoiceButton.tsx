
import React, { useState, useEffect } from 'react';
import { Volume2, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import UnifiedVoiceAssistant from './UnifiedVoiceAssistant';
import VoiceGreetingSystem from './VoiceGreetingSystem';
import { useLocation, useNavigate } from 'react-router-dom';

interface FloatingVoiceButtonProps {
  userName?: string;
  language?: string;
}

const FloatingVoiceButton: React.FC<FloatingVoiceButtonProps> = ({
  userName = 'Student',
  language = 'en-US'
}) => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [showGreetingSystem, setShowGreetingSystem] = useState(true);
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

  const handleNavigationCommand = (route: string) => {
    navigate(route);
  };

  // Don't show on auth pages or admin pages
  if (location.pathname.includes('/login') || 
      location.pathname.includes('/signup') || 
      location.pathname.includes('/admin')) {
    return null;
  }

  return (
    <>
      {/* Voice Greeting System - handles automatic greetings */}
      {showGreetingSystem && (
        <VoiceGreetingSystem
          userName={userName}
          language={language}
          onGreetingComplete={() => setShowGreetingSystem(false)}
        />
      )}

      {/* Floating Voice Button */}
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
          
          {/* Pulsing indicator */}
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
        
        {/* Tooltip */}
        <motion.div
          className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          Sakha AI Assistant
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
        </motion.div>
      </motion.div>

      {/* Unified Voice Assistant */}
      <UnifiedVoiceAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        userName={userName}
        language={language}
        context={getContext()}
        onNavigationCommand={handleNavigationCommand}
      />
    </>
  );
};

export default FloatingVoiceButton;
