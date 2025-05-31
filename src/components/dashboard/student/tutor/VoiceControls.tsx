
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface VoiceControlsProps {
  isListening: boolean;
  isSpeaking: boolean;
  onToggleListening: () => void;
  onToggleMute: () => void;
  isMuted: boolean;
}

const VoiceControls: React.FC<VoiceControlsProps> = ({
  isListening,
  isSpeaking,
  onToggleListening,
  onToggleMute,
  isMuted
}) => {
  const { toast } = useToast();
  const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

  useEffect(() => {
    // Check microphone permission status
    navigator.permissions?.query({ name: 'microphone' as PermissionName })
      .then(permissionStatus => {
        setMicPermission(permissionStatus.state as any);
        permissionStatus.onchange = () => {
          setMicPermission(permissionStatus.state as any);
        };
      })
      .catch(() => setMicPermission('prompt'));
  }, []);

  const handleMicClick = async () => {
    if (micPermission === 'denied') {
      toast({
        title: "Microphone Access Denied",
        description: "Please enable microphone access in your browser settings to use voice features.",
        variant: "destructive"
      });
      return;
    }

    if (micPermission === 'prompt') {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicPermission('granted');
        onToggleListening();
      } catch (error) {
        setMicPermission('denied');
        toast({
          title: "Microphone Access Required",
          description: "Please allow microphone access to use voice features.",
          variant: "destructive"
        });
      }
    } else {
      onToggleListening();
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Microphone Control */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant={isListening ? "default" : "outline"}
          size="lg"
          onClick={handleMicClick}
          className={`relative overflow-hidden ${
            isListening 
              ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' 
              : 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
          }`}
        >
          {/* Pulsing animation for active listening */}
          {isListening && (
            <motion.div
              className="absolute inset-0 bg-red-400 rounded-lg opacity-30"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          
          <motion.div
            animate={{ 
              scale: isListening ? [1, 1.1, 1] : 1,
            }}
            transition={{ 
              duration: 0.8, 
              repeat: isListening ? Infinity : 0,
              ease: "easeInOut" 
            }}
          >
            {isListening ? (
              <Mic className="h-5 w-5 text-white" />
            ) : (
              <MicOff className="h-5 w-5" />
            )}
          </motion.div>
          
          <span className="ml-2 font-medium">
            {isListening ? 'Listening...' : 'Voice'}
          </span>
        </Button>
      </motion.div>

      {/* Speaker Control */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant={isMuted ? "outline" : "default"}
          size="lg"
          onClick={onToggleMute}
          className={`relative overflow-hidden ${
            isSpeaking && !isMuted
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
              : isMuted
              ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              : 'hover:bg-green-50 dark:hover:bg-green-900/20'
          }`}
        >
          {/* Speaking animation */}
          {isSpeaking && !isMuted && (
            <motion.div
              className="absolute inset-0 bg-green-400 rounded-lg opacity-30"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          
          <motion.div
            animate={{ 
              scale: isSpeaking && !isMuted ? [1, 1.1, 1] : 1,
            }}
            transition={{ 
              duration: 0.6, 
              repeat: isSpeaking && !isMuted ? Infinity : 0,
              ease: "easeInOut" 
            }}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 text-gray-500" />
            ) : (
              <Volume2 className={`h-5 w-5 ${isSpeaking ? 'text-white' : ''}`} />
            )}
          </motion.div>
          
          <span className="ml-2 font-medium">
            {isMuted ? 'Muted' : isSpeaking ? 'Speaking...' : 'Audio'}
          </span>
        </Button>
      </motion.div>

      {/* Voice Status Indicator */}
      {(isListening || isSpeaking) && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <motion.div
            className={`w-2 h-2 rounded-full ${
              isListening ? 'bg-red-500' : 'bg-green-500'
            }`}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {isListening ? 'Listening for your voice...' : 'AI is speaking...'}
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default VoiceControls;
