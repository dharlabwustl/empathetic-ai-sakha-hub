
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Volume2, VolumeX, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceControlsProps {
  isListening: boolean;
  isSpeaking: boolean;
  isMuted: boolean;
  onToggleListening: () => void;
  onToggleMute: () => void;
}

const VoiceControls: React.FC<VoiceControlsProps> = ({
  isListening,
  isSpeaking,
  isMuted,
  onToggleListening,
  onToggleMute
}) => {
  return (
    <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Button
              onClick={onToggleListening}
              variant={isListening ? "default" : "outline"}
              size="lg"
              className={`relative transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              {isListening && (
                <motion.div
                  className="absolute -inset-1 bg-red-400 rounded-lg opacity-75"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0.3, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </Button>
          </div>
          
          <Button
            onClick={onToggleMute}
            variant="outline"
            size="lg"
            className={`transition-all duration-300 ${
              isMuted ? 'text-red-500 border-red-300' : 'text-blue-600 border-blue-300'
            }`}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <AnimatePresence>
            {isSpeaking && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 text-blue-600 font-medium"
              >
                <Brain className="h-5 w-5 animate-pulse" />
                <span className="text-sm">AI Speaking...</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-1 text-xs text-gray-500">
            <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`} />
            <span>{isListening ? 'Listening' : 'Standby'}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VoiceControls;
