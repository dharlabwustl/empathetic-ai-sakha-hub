
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useVoiceAssistant } from '@/contexts/VoiceAssistantContext';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingVoiceButtonProps {
  className?: string;
}

const FloatingVoiceButton: React.FC<FloatingVoiceButtonProps> = ({ className = '' }) => {
  const { 
    isListening, 
    isSpeaking,
    startListening, 
    stopListening, 
    voiceSettings,
    toggleMute
  } = useVoiceAssistant();
  
  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  const handleMuteClick = () => {
    toggleMute();
  };
  
  if (!voiceSettings.enabled) return null;
  
  return (
    <div className={`fixed bottom-4 right-4 z-50 flex flex-col gap-2 ${className}`}>
      {/* Mute/Unmute button */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              className="rounded-full shadow-lg" 
              size="icon" 
              variant="outline"
              onClick={handleMuteClick}
            >
              {voiceSettings.muted ? <VolumeX /> : <Volume2 />}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main mic button */}
      <Button 
        className={`rounded-full h-14 w-14 shadow-lg flex items-center justify-center ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
        onClick={handleMicClick}
      >
        <AnimatePresence mode="wait">
          {isListening ? (
            <motion.div
              key="listening"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <MicOff className="h-6 w-6" />
            </motion.div>
          ) : isSpeaking ? (
            <motion.div
              key="speaking"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Volume2 className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="inactive"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Mic className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </div>
  );
};

export default FloatingVoiceButton;
