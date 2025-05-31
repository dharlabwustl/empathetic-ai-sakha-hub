
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
    <Card className="bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 border-blue-100 dark:border-blue-900/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={isListening ? { scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Button
                onClick={onToggleListening}
                size="sm"
                variant={isListening ? "default" : "outline"}
                className={`relative ${isListening ? 'bg-red-500 hover:bg-red-600 text-white' : ''}`}
              >
                {isListening ? (
                  <>
                    <MicOff className="h-4 w-4 mr-2" />
                    Stop Listening
                    <motion.div
                      className="absolute inset-0 rounded-md border-2 border-red-400"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-2" />
                    Start Listening
                  </>
                )}
              </Button>
            </motion.div>

            <motion.div
              animate={isSpeaking ? { scale: [1, 1.05, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <Button
                onClick={onToggleMute}
                size="sm"
                variant="outline"
                className={`${isSpeaking ? 'border-green-400 bg-green-50' : ''}`}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="h-4 w-4 mr-2" />
                    Unmute
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4 mr-2" />
                    Mute
                  </>
                )}
              </Button>
            </motion.div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {isListening && (
              <motion.div
                className="flex items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                Listening...
              </motion.div>
            )}
            {isSpeaking && (
              <motion.div
                className="flex items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Speaking...
              </motion.div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceControls;
