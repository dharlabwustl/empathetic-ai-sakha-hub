import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Settings, X, Volume2, VolumeX, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';

interface FloatingVoiceButtonProps {
  userName?: string;
  language?: string;
  onNavigationCommand?: (route: string) => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const FloatingVoiceButton: React.FC<FloatingVoiceButtonProps> = ({
  userName,
  language = 'en-US',
  onNavigationCommand,
  position = 'bottom-right'
}) => {
  const [showPanel, setShowPanel] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  const {
    voiceSettings,
    updateVoiceSettings,
    toggleVoiceEnabled,
    toggleMute,
    speakMessage,
    isVoiceSupported,
    isSpeaking,
    testVoice
  } = useVoiceAnnouncer({ userName });

  useEffect(() => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      console.error("Speech recognition not supported");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();

    if (recognitionRef.current) {
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language;

      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => setIsListening(false);

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        processVoiceCommand(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onstart = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
      }
    };
  }, [language]);

  const processVoiceCommand = (transcript: string) => {
    const command = transcript.toLowerCase();

    if (command.includes('go to') || command.includes('navigate to')) {
      let route = command.replace(/go to|navigate to/g, '').trim();
      route = route.replace(/\s+/g, '-'); // Replace spaces with dashes
      route = route.replace(/dashboard/g, '/dashboard'); // Ensure dashboard routes start with a slash
      route = `/${route}`; // Add leading slash

      if (onNavigationCommand) {
        onNavigationCommand(route);
      }
    } else {
      speakMessage(`I heard you say: ${transcript}. I can only process navigation commands at the moment.`);
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'top-right':
        return 'top-6 right-6';
      case 'top-left':
        return 'top-6 left-6';
      default:
        return 'bottom-6 right-6';
    }
  };

  const getPanelPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-20 left-6';
      case 'top-right':
        return 'top-20 right-6';
      case 'top-left':
        return 'top-20 left-6';
      default:
        return 'bottom-20 right-6';
    }
  };

  return (
    <>
      {/* Floating Voice Button */}
      <motion.div
        className={`fixed ${getPositionClasses()} z-50`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setShowPanel(!showPanel)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg hover:shadow-xl relative overflow-hidden group"
          disabled={!isVoiceSupported}
        >
          {/* Pulse animation background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className="relative z-10 flex flex-col items-center">
            <Brain className="h-5 w-5 text-white mb-0.5" />
            <motion.span 
              className="text-[8px] font-bold text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                backgroundSize: '200% auto'
              }}
            >
              AI
            </motion.span>
          </div>

          {/* Speaking indicator */}
          {isSpeaking && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-yellow-400"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{ 
                duration: 0.5,
                repeat: Infinity
              }}
            />
          )}
        </Button>
      </motion.div>

      {/* Voice Control Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed ${getPanelPositionClasses()} z-40 w-80`}
          >
            <Card className="shadow-xl border-2 border-purple-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    Voice Assistant
                    <motion.span 
                      className="text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text font-extrabold"
                      animate={{ 
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        backgroundSize: '200% auto'
                      }}
                    >
                      AI
                    </motion.span>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPanel(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Voice Enabled</p>
                    <p className="text-xs text-muted-foreground">
                      Toggle voice assistant on or off
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleVoiceEnabled}
                  >
                    {voiceSettings.enabled ? 'Disable' : 'Enable'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Mute Voice</p>
                    <p className="text-xs text-muted-foreground">
                      Mute or unmute the voice assistant
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleMute}
                  >
                    {voiceSettings.muted ? 'Unmute' : 'Mute'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Test Voice</p>
                    <p className="text-xs text-muted-foreground">
                      Test the current voice settings
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={testVoice}
                  >
                    Test
                  </Button>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Volume</p>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={voiceSettings.volume}
                    onChange={(e) => updateVoiceSettings({ volume: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Rate</p>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.05"
                    value={voiceSettings.rate}
                    onChange={(e) => updateVoiceSettings({ rate: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Pitch</p>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.05"
                    value={voiceSettings.pitch}
                    onChange={(e) => updateVoiceSettings({ pitch: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingVoiceButton;
