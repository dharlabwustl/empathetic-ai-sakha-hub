
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <Card className="p-4 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 border-blue-100 dark:border-blue-900/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            animate={isListening ? { scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: isListening ? Infinity : 0, duration: 1.5 }}
          >
            <Button
              variant={isListening ? "default" : "outline"}
              size="lg"
              onClick={onToggleListening}
              className={`relative ${isListening 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              {isListening && (
                <motion.div
                  className="absolute inset-0 rounded-md bg-red-400"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              )}
            </Button>
          </motion.div>
          
          <motion.div
            animate={isSpeaking ? { scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: isSpeaking ? Infinity : 0, duration: 1 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={onToggleMute}
              className={isMuted ? 'bg-gray-200 dark:bg-gray-700' : ''}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
          </motion.div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {isListening && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
              Listening...
            </motion.div>
          )}
          {isSpeaking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
              Speaking...
            </motion.div>
          )}
          {!isListening && !isSpeaking && (
            <span className="text-gray-500">Voice Assistant Ready</span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default VoiceControls;
