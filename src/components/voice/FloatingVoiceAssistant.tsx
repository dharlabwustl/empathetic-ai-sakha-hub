
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, X, Volume2, VolumeX, Settings, MessageSquare } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import useVoiceAnnouncer from '@/hooks/useVoiceAnnouncer';
import { MoodType } from '@/types/user/base';
import { toast } from '@/hooks/use-toast';

interface FloatingVoiceAssistantProps {
  userName?: string;
  currentMood?: MoodType;
  onMoodCommand?: (mood: string) => void;
  onNavigationCommand?: (route: string) => void;
}

const FloatingVoiceAssistant: React.FC<FloatingVoiceAssistantProps> = ({
  userName,
  currentMood,
  onMoodCommand,
  onNavigationCommand
}) => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  const {
    voiceSettings,
    updateVoiceSettings,
    toggleVoiceEnabled,
    toggleMute,
    speakMessage,
    isVoiceSupported,
    isSpeaking,
    isListening,
    startListening,
    stopListening,
    transcript,
    testVoice,
    processVoiceCommand
  } = useVoiceAnnouncer({ userName, mood: currentMood });

  // Handle initial setup
  useEffect(() => {
    if (!isVoiceSupported) {
      toast({
        title: "Voice Assistant Unavailable",
        description: "Your browser doesn't support voice features. Try using Chrome or Edge.",
        variant: "destructive"
      });
    }
  }, [isVoiceSupported]);

  // Process transcript when it changes
  useEffect(() => {
    if (transcript && open) {
      // Handle navigation commands
      if (transcript.toLowerCase().includes('go to') || transcript.toLowerCase().includes('open')) {
        const pages = [
          { keywords: ['dashboard', 'home'], route: '/dashboard/student' },
          { keywords: ['concepts', 'concept'], route: '/dashboard/student/concepts' },
          { keywords: ['practice', 'exam', 'test'], route: '/dashboard/student/practice' },
          { keywords: ['analytics', 'performance'], route: '/dashboard/student/analytics' },
          { keywords: ['formula', 'formulas', 'formula lab'], route: '/dashboard/student/formulas' }
        ];
        
        for (const page of pages) {
          if (page.keywords.some(keyword => transcript.toLowerCase().includes(keyword))) {
            if (onNavigationCommand) {
              speakMessage(`Navigating to ${page.keywords[0]}`);
              onNavigationCommand(page.route);
              break;
            }
          }
        }
      }
      
      // Handle mood logging commands
      if (transcript.toLowerCase().includes('feeling') || transcript.toLowerCase().includes('mood')) {
        const moods = [
          { keywords: ['happy', 'good', 'great'], mood: MoodType.HAPPY },
          { keywords: ['tired', 'exhausted', 'sleepy'], mood: MoodType.TIRED },
          { keywords: ['stressed', 'overwhelmed'], mood: MoodType.STRESSED },
          { keywords: ['motivated', 'determined'], mood: MoodType.MOTIVATED },
          { keywords: ['confused'], mood: MoodType.CONFUSED },
          { keywords: ['anxious', 'nervous', 'worried'], mood: MoodType.ANXIOUS },
        ];
        
        for (const mood of moods) {
          if (mood.keywords.some(keyword => transcript.toLowerCase().includes(keyword))) {
            if (onMoodCommand) {
              speakMessage(`I'll log that you're feeling ${mood.mood} today.`);
              onMoodCommand(mood.mood);
              break;
            }
          }
        }
      }
    }
  }, [transcript, open, onNavigationCommand, onMoodCommand, speakMessage]);

  const handleToggleMicrophone = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  const handleClose = () => {
    setOpen(false);
    setExpanded(false);
    setSettingsOpen(false);
    if (isListening) {
      stopListening();
    }
  };
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
    setSettingsOpen(false);
  };
  
  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };
  
  if (!isVoiceSupported) {
    return null;
  }
  
  return (
    <>
      {/* Main floating button */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed bottom-20 right-4 z-50"
          >
            <Button
              onClick={() => setOpen(true)}
              className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-0 shadow-lg"
            >
              <Mic className="h-5 w-5 text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice assistant panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 z-50"
          >
            <Card className={`border-2 shadow-lg overflow-hidden ${
              expanded ? 'w-72' : 'w-auto'
            }`}>
              <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {isSpeaking ? (
                    <div className="relative">
                      <Volume2 className="h-5 w-5 text-indigo-600" />
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                    </div>
                  ) : isListening ? (
                    <div className="relative">
                      <Mic className="h-5 w-5 text-indigo-600" />
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                    </div>
                  ) : (
                    <MessageSquare className="h-5 w-5 text-indigo-600" />
                  )}
                  <span className="font-medium">PREPZR Voice</span>
                </div>
                <div className="flex items-center space-x-1">
                  {expanded && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={toggleSettings}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={toggleExpanded}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  {!expanded && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={toggleExpanded}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={handleClose}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className={`p-3 ${expanded ? 'block' : 'hidden'}`}>
                {settingsOpen ? (
                  <div className="space-y-4">
                    <h4 className="font-medium mb-2">Voice Settings</h4>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="voice-enabled">Voice Enabled</Label>
                        <Switch 
                          id="voice-enabled" 
                          checked={voiceSettings.enabled}
                          onCheckedChange={(checked) => updateVoiceSettings({ enabled: checked })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="voice-muted">Mute Voice</Label>
                        <Switch 
                          id="voice-muted" 
                          checked={voiceSettings.muted}
                          onCheckedChange={(checked) => updateVoiceSettings({ muted: checked })}
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="voice-volume">Volume</Label>
                          <span className="text-xs">{Math.round(voiceSettings.volume * 100)}%</span>
                        </div>
                        <Slider
                          id="voice-volume"
                          min={0}
                          max={1}
                          step={0.1}
                          value={[voiceSettings.volume]}
                          onValueChange={(value) => updateVoiceSettings({ volume: value[0] })}
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="voice-speed">Speed</Label>
                          <span className="text-xs">{voiceSettings.rate}x</span>
                        </div>
                        <Slider
                          id="voice-speed"
                          min={0.5}
                          max={2}
                          step={0.1}
                          value={[voiceSettings.rate]}
                          onValueChange={(value) => updateVoiceSettings({ rate: value[0] })}
                        />
                      </div>
                      
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="w-full mt-2" 
                        onClick={() => testVoice()}
                      >
                        Test Voice
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Voice controls */}
                    <div className="flex justify-center">
                      <Button
                        variant={isListening ? "destructive" : "default"}
                        size="lg"
                        className={`rounded-full h-16 w-16 ${isListening ? 'animate-pulse' : ''}`}
                        onClick={handleToggleMicrophone}
                        disabled={isSpeaking}
                      >
                        {isListening ? (
                          <MicOff className="h-6 w-6" />
                        ) : (
                          <Mic className="h-6 w-6" />
                        )}
                      </Button>
                    </div>
                    
                    {/* Sound toggle button */}
                    <div className="flex justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleMute()}
                        className="gap-2"
                      >
                        {voiceSettings.muted ? (
                          <>
                            <VolumeX className="h-4 w-4" />
                            <span>Unmute</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="h-4 w-4" />
                            <span>Mute</span>
                          </>
                        )}
                      </Button>
                    </div>
                    
                    {/* Transcript */}
                    {transcript && (
                      <div className="mt-3 p-2 bg-muted rounded-md">
                        <p className="text-xs font-medium mb-1">You said:</p>
                        <p className="text-sm">{transcript}</p>
                      </div>
                    )}
                    
                    {/* Voice command suggestions */}
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-2">Try saying:</p>
                      <div className="grid grid-cols-1 gap-1">
                        <Button variant="ghost" size="sm" className="justify-start text-left text-xs h-auto py-1">
                          "Go to dashboard"
                        </Button>
                        <Button variant="ghost" size="sm" className="justify-start text-left text-xs h-auto py-1">
                          "I'm feeling tired today"
                        </Button>
                        <Button variant="ghost" size="sm" className="justify-start text-left text-xs h-auto py-1">
                          "Start a practice test"
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              
              {/* Minimized content */}
              {!expanded && (
                <CardContent className="p-3 flex justify-center">
                  <Button 
                    variant={isListening ? "destructive" : "default"}
                    size="sm" 
                    onClick={handleToggleMicrophone}
                    className={`px-4 ${isListening ? 'animate-pulse' : ''}`}
                  >
                    {isListening ? (
                      <>
                        <MicOff className="h-4 w-4 mr-2" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4 mr-2" />
                        <span>Speak</span>
                      </>
                    )}
                  </Button>
                </CardContent>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Add missing ChevronUp and ChevronDown components
const ChevronUp = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m18 15-6-6-6 6"/>
  </svg>
);

const ChevronDown = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

export default FloatingVoiceAssistant;
