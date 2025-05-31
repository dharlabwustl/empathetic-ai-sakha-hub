
import React from 'react';
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
    <div className="flex items-center gap-4">
      <motion.div
        animate={isListening ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
      >
        <Button
          variant={isListening ? "default" : "outline"}
          size="lg"
          onClick={onToggleListening}
          className={`relative ${
            isListening 
              ? "bg-red-500 hover:bg-red-600 text-white" 
              : "hover:bg-blue-50"
          }`}
        >
          {isListening ? <MicOff className="h-5 w-5 mr-2" /> : <Mic className="h-5 w-5 mr-2" />}
          {isListening ? "Stop Listening" : "Start Voice"}
          {isListening && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </Button>
      </motion.div>
      
      <motion.div
        animate={isSpeaking ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.8, repeat: isSpeaking ? Infinity : 0 }}
      >
        <Button
          variant={isMuted ? "outline" : "default"}
          size="lg"
          onClick={onToggleMute}
          className={`${
            isSpeaking && !isMuted 
              ? "bg-green-500 hover:bg-green-600 text-white" 
              : isMuted 
                ? "bg-gray-200 hover:bg-gray-300" 
                : "hover:bg-blue-50"
          }`}
        >
          {isMuted ? <VolumeX className="h-5 w-5 mr-2" /> : <Volume2 className="h-5 w-5 mr-2" />}
          {isMuted ? "Unmute" : "Speaker"}
          {isSpeaking && !isMuted && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default VoiceControls;
