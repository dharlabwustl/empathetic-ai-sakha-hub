
import React, { useState, useEffect } from 'react';
import { Mic, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import UnifiedVoiceAssistant from './UnifiedVoiceAssistant';
import { useLocation } from 'react-router-dom';

interface InteractiveVoiceAssistantProps {
  userName?: string;
  language?: string;
  onNavigationCommand?: (route: string) => void;
  position?: 'bottom-right' | 'bottom-left';
}

const InteractiveVoiceAssistant: React.FC<InteractiveVoiceAssistantProps> = ({
  userName = 'Student',
  language = 'en-US',
  onNavigationCommand,
  position = 'bottom-right'
}) => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const location = useLocation();

  // Determine context based on current route
  const getContext = () => {
    if (location.pathname === '/') return 'homepage';
    if (location.pathname.includes('/dashboard')) return 'dashboard';
    if (location.pathname.includes('/concepts') || 
        location.pathname.includes('/flashcards') || 
        location.pathname.includes('/practice-exam')) return 'learning';
    return 'homepage';
  };

  const positionClasses = position === 'bottom-right' 
    ? 'bottom-4 sm:bottom-6 right-4 sm:right-6' 
    : 'bottom-4 sm:bottom-6 left-4 sm:left-6';

  // Don't show on auth pages
  if (location.pathname.includes('/login') || 
      location.pathname.includes('/signup') || 
      location.pathname.includes('/admin')) {
    return null;
  }

  return (
    <>
      <div className={`fixed ${positionClasses} z-40`}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="relative"
        >
          <Button
            onClick={() => setIsAssistantOpen(true)}
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl border-0 relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            
            <Mic className="h-5 w-5 sm:h-6 sm:w-6 relative z-10" />
            
            {/* Pulsing indicator */}
            <motion.div
              className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 h-2.5 w-2.5 sm:h-3 sm:w-3 bg-green-400 rounded-full"
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
          
          {/* Tooltip - only show on larger screens */}
          <div className="hidden sm:block absolute bottom-full right-0 mb-2 px-3 py-2 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Sakha AI Assistant
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
          </div>
        </motion.div>
      </div>

      {/* Unified Voice Assistant */}
      <UnifiedVoiceAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        userName={userName}
        language={language}
        context={getContext()}
        onNavigationCommand={onNavigationCommand}
      />
    </>
  );
};

export default InteractiveVoiceAssistant;
