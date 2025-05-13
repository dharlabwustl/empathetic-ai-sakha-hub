
import React, { useState, useEffect, useCallback } from 'react';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Volume2, VolumeX, Mic, MicOff, X, MinusCircle, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { MoodType } from '@/types/user/base';
import PrepzrLogo from '@/components/common/PrepzrLogo';

interface FloatingVoiceAnnouncerProps {
  isOpen?: boolean;
  onClose?: () => void;
  userName?: string;
  onMoodChange?: (mood: MoodType) => void;
}

const FloatingVoiceAnnouncer: React.FC<FloatingVoiceAnnouncerProps> = ({
  isOpen: propIsOpen = false,
  onClose,
  userName = 'Student',
  onMoodChange
}) => {
  const [isOpen, setIsOpen] = useState(propIsOpen);
  const [minimized, setMinimized] = useState(false);
  const [command, setCommand] = useState<string>('');
  const { toast } = useToast();
  
  const { 
    voiceSettings, 
    toggleMute, 
    isVoiceSupported, 
    isSpeaking, 
    isListening, 
    startListening, 
    stopListening, 
    transcript, 
    processVoiceCommand,
    speakMessage
  } = useVoiceAnnouncer({ userName });
  
  // Sync with props
  useEffect(() => {
    setIsOpen(propIsOpen);
  }, [propIsOpen]);
  
  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (onClose) onClose();
  }, [onClose]);
  
  const handleMuteToggle = useCallback(() => {
    toggleMute();
  }, [toggleMute]);
  
  const handleToggleMinimized = () => {
    setMinimized(!minimized);
  };
  
  const handleStartListening = useCallback(() => {
    startListening();
    setCommand('');
  }, [startListening]);
  
  const handleStopListening = useCallback(() => {
    stopListening();
  }, [stopListening]);
  
  // Process transcript when it changes
  useEffect(() => {
    if (transcript && isListening) {
      setCommand(transcript);
      processVoiceCommand(transcript);
      handleStopListening();
      
      // Check for mood indications
      detectMoodFromCommand(transcript);
    }
  }, [transcript, isListening, processVoiceCommand, handleStopListening]);
  
  // Detect mood from voice command
  const detectMoodFromCommand = (text: string) => {
    if (!onMoodChange) return;
    
    const lowerText = text.toLowerCase();
    
    const moodMap: Record<string, MoodType> = {
      "happy": MoodType.HAPPY,
      "motivated": MoodType.MOTIVATED,
      "focused": MoodType.FOCUSED,
      "tired": MoodType.TIRED,
      "exhausted": MoodType.TIRED,
      "stressed": MoodType.STRESSED,
      "anxious": MoodType.ANXIOUS,
      "okay": MoodType.OKAY,
      "alright": MoodType.OKAY,
      "so so": MoodType.OKAY,
      "overwhelmed": MoodType.OVERWHELMED,
      "swamped": MoodType.OVERWHELMED,
      "curious": MoodType.CURIOUS,
      "interested": MoodType.CURIOUS,
      "confused": MoodType.CONFUSED,
      "unsure": MoodType.CONFUSED
    };
    
    // Check if any mood keywords are present
    for (const [keyword, mood] of Object.entries(moodMap)) {
      if (lowerText.includes(`feeling ${keyword}`) || 
          lowerText.includes(`feel ${keyword}`) || 
          lowerText.includes(`i am ${keyword}`) ||
          lowerText.includes(`i'm ${keyword}`)) {
        
        onMoodChange(mood);
        
        toast({
          title: `Mood Updated: ${mood}`,
          description: `Your mood has been updated to ${mood.toLowerCase()}.`,
        });
        
        speakMessage(`I've noted that you're feeling ${keyword}. I'll adjust my recommendations accordingly.`);
        return;
      }
    }
  };
  
  const handleOpenButtonClick = () => {
    setIsOpen(true);
    setMinimized(false);
  };

  return (
    <>
      {/* Floating button when closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={handleOpenButtonClick}
              className="rounded-full h-14 w-14 bg-gradient-to-r from-blue-500 to-indigo-600 p-0 shadow-lg flex items-center justify-center"
            >
              {isVoiceSupported ? (
                <Volume2 className="h-6 w-6" />
              ) : (
                <MessageSquare className="h-6 w-6" />
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Voice Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Card className={`overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl ${
              minimized ? 'w-72' : 'w-80 sm:w-96'
            }`}>
              {/* Header */}
              <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <PrepzrLogo width={24} height={24} />
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      Voice Assistant
                    </h3>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={handleToggleMinimized}
                    >
                      <MinusCircle className="h-4 w-4" />
                      <span className="sr-only">
                        {minimized ? 'Expand' : 'Minimize'}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={handleClose}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              {minimized ? (
                <div className="p-3 flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {isListening ? 'Listening...' : 'Ready for voice commands'}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setMinimized(false)}
                  >
                    Expand
                  </Button>
                </div>
              ) : (
                <>
                  {/* Status area */}
                  <div className="p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {isSpeaking && (
                          <motion.div
                            animate={{ 
                              scale: [1, 1.1, 1],
                              opacity: [0.7, 1, 0.7]
                            }}
                            transition={{ 
                              repeat: Infinity, 
                              duration: 1.5 
                            }}
                          >
                            <Volume2 className="h-5 w-5 text-blue-500" />
                          </motion.div>
                        )}
                        {isListening && (
                          <motion.div
                            animate={{ 
                              scale: [1, 1.1, 1],
                              opacity: [0.7, 1, 0.7]
                            }}
                            transition={{ 
                              repeat: Infinity, 
                              duration: 1 
                            }}
                          >
                            <Mic className="h-5 w-5 text-red-500" />
                          </motion.div>
                        )}
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {isSpeaking ? 'Speaking...' : isListening ? 'Listening...' : 'Ready'}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleMuteToggle}
                        className="h-8 flex items-center space-x-1"
                      >
                        {voiceSettings.muted ? (
                          <>
                            <VolumeX className="h-4 w-4 text-gray-500" />
                            <span className="text-xs">Unmute</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="h-4 w-4 text-blue-500" />
                            <span className="text-xs">Mute</span>
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Say "{isVoiceSupported ? 'Hey Prep-zer' : 'Click Listen to speak'}" to start a command
                    </p>
                  </div>
                  
                  {/* Command transcript */}
                  <div className="px-4 py-3">
                    {command ? (
                      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Last command:</p>
                        <p className="text-sm text-gray-900 dark:text-gray-100">{command}</p>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Try asking:</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-gray-700 dark:text-gray-300">"What's on my study plan?"</div>
                          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-gray-700 dark:text-gray-300">"Show my progress"</div>
                          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-gray-700 dark:text-gray-300">"I'm feeling tired"</div>
                          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-gray-700 dark:text-gray-300">"Go to concepts page"</div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Control buttons */}
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <div className="flex justify-center">
                      <Button
                        onClick={isListening ? handleStopListening : handleStartListening}
                        className={`w-full flex items-center justify-center ${
                          isListening 
                            ? 'bg-red-500 hover:bg-red-600' 
                            : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                      >
                        {isListening ? (
                          <>
                            <MicOff className="mr-2 h-4 w-4" />
                            Stop Listening
                          </>
                        ) : (
                          <>
                            <Mic className="mr-2 h-4 w-4" />
                            Start Listening
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingVoiceAnnouncer;
