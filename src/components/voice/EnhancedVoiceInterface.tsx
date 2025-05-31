
import React from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEnhancedVoiceRecognition } from '@/hooks/useEnhancedVoiceRecognition';
import VoiceMuteButton from './VoiceMuteButton';

interface EnhancedVoiceInterfaceProps {
  onCommand?: (command: string) => void;
  className?: string;
  compact?: boolean;
}

const EnhancedVoiceInterface: React.FC<EnhancedVoiceInterfaceProps> = ({
  onCommand,
  className = '',
  compact = false
}) => {
  const {
    isListening,
    isSupported,
    transcript,
    toggleListening
  } = useEnhancedVoiceRecognition({
    continuous: false,
    onCommand
  });

  if (!isSupported) {
    return null;
  }

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Button
          variant={isListening ? "default" : "outline"}
          size="sm"
          onClick={toggleListening}
          className={isListening ? 'bg-red-500 hover:bg-red-600' : ''}
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
        <VoiceMuteButton size="sm" />
      </div>
    );
  }

  return (
    <Card className={`${className}`}>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Voice Commands</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Speak naturally to navigate and interact
              </p>
            </div>
            <div className="flex items-center gap-2">
              <VoiceMuteButton showLabel />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={isListening ? "default" : "outline"}
                onClick={toggleListening}
                className={`${isListening ? 'bg-red-500 hover:bg-red-600' : ''}`}
              >
                {isListening ? (
                  <>
                    <MicOff className="h-4 w-4 mr-2" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-2" />
                    Start Voice Commands
                  </>
                )}
              </Button>
            </motion.div>

            {isListening && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <Badge variant="secondary" className="bg-red-100 text-red-700">
                  <motion.div
                    className="w-2 h-2 bg-red-500 rounded-full mr-2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  Listening...
                </Badge>
              </motion.div>
            )}
          </div>

          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
            >
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                You said:
              </p>
              <p className="text-blue-700 dark:text-blue-300">"{transcript}"</p>
            </motion.div>
          )}

          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Try these commands:
            </p>
            <div className="flex flex-wrap gap-1">
              {[
                "study plan",
                "ai tutor", 
                "physics",
                "take exam",
                "dashboard",
                "help"
              ].map((command) => (
                <Badge 
                  key={command} 
                  variant="outline" 
                  className="text-xs cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  onClick={() => onCommand?.(command)}
                >
                  "{command}"
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedVoiceInterface;
