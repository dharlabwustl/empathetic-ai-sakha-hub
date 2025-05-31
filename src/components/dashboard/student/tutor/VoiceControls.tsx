
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VoiceControlsProps {
  isListening: boolean;
  isSpeaking: boolean;
  isMuted: boolean;
  onToggleMic: () => void;
  onToggleSpeaker: () => void;
}

const VoiceControls: React.FC<VoiceControlsProps> = ({
  isListening,
  isSpeaking,
  isMuted,
  onToggleMic,
  onToggleSpeaker
}) => {
  return (
    <div className="flex items-center gap-3">
      {/* Microphone Control */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <Button
          variant={isListening ? "default" : "outline"}
          size="sm"
          onClick={onToggleMic}
          className={`relative ${
            isListening 
              ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700" 
              : "hover:bg-blue-50"
          }`}
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          
          {/* Pulsing indicator for active listening */}
          <AnimatePresence>
            {isListening && (
              <motion.div
                className="absolute inset-0 rounded-md border-2 border-red-400"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ 
                  scale: [1, 1.2, 1], 
                  opacity: [1, 0, 1] 
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
            )}
          </AnimatePresence>
        </Button>
        
        {/* Status indicator */}
        {isListening && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{ 
              duration: 1, 
              repeat: Infinity 
            }}
          />
        )}
      </motion.div>

      {/* Speaker Control */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <Button
          variant={isMuted ? "outline" : "default"}
          size="sm"
          onClick={onToggleSpeaker}
          className={`relative ${
            isSpeaking && !isMuted 
              ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" 
              : isMuted 
                ? "opacity-50 hover:opacity-70" 
                : "hover:bg-blue-50"
          }`}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          
          {/* Pulsing indicator for active speaking */}
          <AnimatePresence>
            {isSpeaking && !isMuted && (
              <motion.div
                className="absolute inset-0 rounded-md border-2 border-green-400"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ 
                  scale: [1, 1.2, 1], 
                  opacity: [1, 0, 1] 
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 1.2, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
            )}
          </AnimatePresence>
        </Button>
        
        {/* Status indicator */}
        {isSpeaking && !isMuted && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{ 
              duration: 0.8, 
              repeat: Infinity 
            }}
          />
        )}
      </motion.div>

      {/* Voice status text */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {isListening ? (
          <motion.span
            className="text-red-600 font-medium"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            Listening...
          </motion.span>
        ) : isSpeaking && !isMuted ? (
          <motion.span
            className="text-green-600 font-medium"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            Speaking...
          </motion.span>
        ) : (
          <span>Ready</span>
        )}
      </div>
    </div>
  );
};

export default VoiceControls;
