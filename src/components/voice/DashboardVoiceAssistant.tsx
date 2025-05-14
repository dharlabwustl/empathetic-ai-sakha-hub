
import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Mic, MicOff, Settings, X, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { MoodType } from '@/types/user/base';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardVoiceAssistantProps {
  userName?: string;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({
  userName = 'Student',
  currentMood,
  onMoodChange
}) => {
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  
  // Voice settings
  const [voiceLanguage, setVoiceLanguage] = useState('hi-IN'); // Default to Hindi
  const [voiceGender, setVoiceGender] = useState('female');
  const [voiceRate, setVoiceRate] = useState(0.92);
  const [voicePitch, setVoicePitch] = useState(1.1);
  const [voiceVolume, setVoiceVolume] = useState(1);
  
  // Initialize voice announcer
  const {
    voiceSettings,
    updateVoiceSettings,
    toggleVoiceEnabled,
    toggleMute,
    speakMessage,
    testVoice,
    isVoiceSupported,
    isSpeaking,
    isListening,
    startListening,
    stopListening,
    transcript,
    processVoiceCommand,
    supportedLanguages
  } = useVoiceAnnouncer({
    userName,
    initialSettings: {
      language: voiceLanguage,
      enabled: true,
      muted: false,
      volume: voiceVolume,
      rate: voiceRate,
      pitch: voicePitch
    },
    mood: currentMood
  });
  
  // Language options for the settings
  const languageOptions = [
    { value: 'hi-IN', label: 'Hindi' },
    { value: 'en-IN', label: 'Indian English' },
    { value: 'en-US', label: 'American English' },
    { value: 'en-GB', label: 'British English' }
  ];

  // Track mood changes for greetings
  const [lastMood, setLastMood] = useState<MoodType | undefined>(currentMood);
  
  // Check if this is the first visit
  useEffect(() => {
    const isNew = localStorage.getItem('new_user_signup') === 'true';
    setIsFirstVisit(isNew);
    
    // Load saved voice settings
    const savedLanguage = localStorage.getItem('voiceAssistantLanguage');
    if (savedLanguage) setVoiceLanguage(savedLanguage);
    
    const savedGender = localStorage.getItem('voiceAssistantGender');
    if (savedGender) setVoiceGender(savedGender);
    
    const savedRate = localStorage.getItem('voiceAssistantRate');
    if (savedRate) setVoiceRate(parseFloat(savedRate));
    
    const savedPitch = localStorage.getItem('voiceAssistantPitch');
    if (savedPitch) setVoicePitch(parseFloat(savedPitch));
    
    const savedVolume = localStorage.getItem('voiceAssistantVolume');
    if (savedVolume) setVoiceVolume(parseFloat(savedVolume));
    
    // Welcome first-time users
    if (isNew) {
      setTimeout(() => {
        speakMessage(`Welcome to your dashboard, ${userName}. I'm your PREPZR voice assistant. You can ask me for help navigating the platform or studying for your exams.`);
      }, 3000);
    }
  }, []);
  
  // Track mood changes to provide appropriate responses
  useEffect(() => {
    if (currentMood && currentMood !== lastMood && voiceSettings.enabled && !voiceSettings.muted) {
      const moodMessage = getMoodResponse(currentMood, userName);
      setTimeout(() => {
        speakMessage(moodMessage);
      }, 1000);
      setLastMood(currentMood);
    }
  }, [currentMood, lastMood, userName, voiceSettings.enabled, voiceSettings.muted]);
  
  // Generate appropriate responses for different moods
  const getMoodResponse = (mood: MoodType, name: string): string => {
    switch (mood) {
      case MoodType.HAPPY:
        return `I see you're happy today, ${name}! That's great energy for studying. Would you like to tackle some challenging topics?`;
      case MoodType.FOCUSED:
        return `You're in a focused state, ${name}. This is perfect for deep learning. Let me help you maintain this concentration.`;
      case MoodType.TIRED:
        return `I notice you're feeling tired, ${name}. How about we focus on lighter review or take short breaks between study sessions?`;
      case MoodType.STRESSED:
        return `I understand you're feeling stressed, ${name}. Let's take a few deep breaths together and break down your tasks into smaller parts.`;
      case MoodType.CURIOUS:
        return `Your curious mood is perfect for exploring new concepts, ${name}. Is there a particular topic you're interested in learning about?`;
      case MoodType.OVERWHELMED:
        return `Feeling overwhelmed is normal during exam prep, ${name}. Let's reorganize your study plan into smaller, manageable chunks.`;
      case MoodType.ANXIOUS:
        return `I see you're feeling anxious, ${name}. Let's start with a topic you're confident in to build momentum before tackling harder concepts.`;
      case MoodType.MOTIVATED:
        return `Great to see you motivated, ${name}! This is the perfect time to tackle those challenging topics or practice tests.`;
      case MoodType.CONFUSED:
        return `I notice you're feeling confused, ${name}. Let's take a step back and clarify the core concepts before moving forward.`;
      default:
        return `Hello ${name}, how can I assist with your studies today?`;
    }
  };
  
  // Handle voice command for navigation
  const handleVoiceCommand = (command: string) => {
    // Process the command through the useVoiceAnnouncer hook
    processVoiceCommand(command);
  };
  
  // Apply voice settings
  const applySettings = () => {
    // Save settings to localStorage
    localStorage.setItem('voiceAssistantLanguage', voiceLanguage);
    localStorage.setItem('voiceAssistantGender', voiceGender);
    localStorage.setItem('voiceAssistantRate', voiceRate.toString());
    localStorage.setItem('voiceAssistantPitch', voicePitch.toString());
    localStorage.setItem('voiceAssistantVolume', voiceVolume.toString());
    
    // Update voice settings in hook
    updateVoiceSettings({
      language: voiceLanguage,
      rate: voiceRate,
      pitch: voicePitch,
      volume: voiceVolume
    });
    
    // Test new settings
    testVoice();
    
    // Close settings dialog
    setSettingsOpen(false);
  };
  
  // Quick help topics
  const helpTopics = [
    { title: "Navigate Dashboard", command: "How do I navigate the dashboard?" },
    { title: "Create Study Plan", command: "How do I create a study plan?" },
    { title: "Practice Tests", command: "Tell me about practice tests" },
    { title: "Concept Cards", command: "How do I use concept cards?" },
    { title: "Change Mood", command: "I want to update my mood" }
  ];
  
  return (
    <>
      {/* Floating voice assistant button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
        {/* Voice assistant button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`${
            isOpen ? 'bg-purple-600 text-white' : 'bg-purple-500/90 text-white'
          } rounded-full p-3 shadow-lg flex items-center justify-center transition-all duration-200
          hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isListening ? (
            <Mic className="h-6 w-6" />
          ) : isSpeaking ? (
            <Volume2 className="h-6 w-6 animate-pulse" />
          ) : (
            <Volume2 className="h-6 w-6" />
          )}
        </motion.button>
        
        {/* Settings button - show when assistant is open */}
        <AnimatePresence>
          {isOpen && (
            <motion.button
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              className="bg-purple-500/80 text-white rounded-full p-3 shadow-lg hover:bg-purple-600"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
        
        {/* Help button - show when assistant is open */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
            >
              <Popover open={showHelpPopup} onOpenChange={setShowHelpPopup}>
                <PopoverTrigger asChild>
                  <Button 
                    className="rounded-full p-3 h-auto w-auto bg-purple-500/80 hover:bg-purple-600"
                    variant="ghost"
                  >
                    <Sliders className="h-5 w-5 text-white" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" side="top">
                  <div className="space-y-4">
                    <h3 className="font-medium">What can I help with?</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {helpTopics.map((topic) => (
                        <Button 
                          key={topic.title}
                          variant="outline" 
                          size="sm"
                          className="justify-start text-left"
                          onClick={() => {
                            handleVoiceCommand(topic.command);
                            setShowHelpPopup(false);
                          }}
                        >
                          {topic.title}
                        </Button>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Voice assistant dialog - appears when isOpen is true */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-purple-200 dark:border-purple-800 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Volume2 className="h-5 w-5 text-white" />
                <h3 className="text-white font-medium">PREPZR Assistant</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/10 rounded-full h-8 w-8 p-0">
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Content */}
            <div className="p-4 max-h-80 overflow-y-auto space-y-4">
              {/* Current transcript */}
              {transcript && (
                <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg">
                  <p className="text-sm font-medium">You said:</p>
                  <p className="text-sm italic">{transcript}</p>
                </div>
              )}
              
              {/* Suggestion chips */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleVoiceCommand("Help me navigate the dashboard")}>
                    Dashboard navigation
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleVoiceCommand("How do I create a study plan")}>
                    Create study plan
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleVoiceCommand("Show me my progress")}>
                    My progress
                  </Button>
                </div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg">
                <p className="text-sm">
                  Your voice assistant can help with navigation, explain features, provide study tips, and more. Try saying "Help me with..."
                </p>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
              <Button 
                variant={voiceSettings.muted ? "outline" : "default"}
                size="sm"
                onClick={() => toggleMute()}
                className={voiceSettings.muted ? "bg-gray-100 dark:bg-gray-800" : ""}
              >
                {voiceSettings.muted ? (
                  <><VolumeX className="mr-2 h-4 w-4" /> Unmute</>
                ) : (
                  <><Volume2 className="mr-2 h-4 w-4" /> Mute</>
                )}
              </Button>
              
              <Button 
                onClick={() => {
                  if (isListening) {
                    stopListening();
                  } else {
                    startListening();
                  }
                }}
                variant={isListening ? "destructive" : "default"}
                size="sm"
              >
                {isListening ? (
                  <><MicOff className="mr-2 h-4 w-4" /> Stop</>
                ) : (
                  <><Mic className="mr-2 h-4 w-4" /> Ask</>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Voice Assistant Settings</DialogTitle>
            <DialogDescription>
              Customize your voice assistant's language and speech characteristics.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-6">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select 
                value={voiceLanguage} 
                onValueChange={setVoiceLanguage}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Voice Gender</Label>
              <RadioGroup value={voiceGender} onValueChange={setVoiceGender} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female-settings" />
                  <Label htmlFor="female-settings">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male-settings" />
                  <Label htmlFor="male-settings">Male</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Speech Rate: {voiceRate.toFixed(2)}</Label>
              </div>
              <Slider 
                value={[voiceRate]} 
                onValueChange={(value) => setVoiceRate(value[0])} 
                min={0.5} 
                max={1.5} 
                step={0.05}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Pitch: {voicePitch.toFixed(2)}</Label>
              </div>
              <Slider 
                value={[voicePitch]} 
                onValueChange={(value) => setVoicePitch(value[0])} 
                min={0.8} 
                max={1.5} 
                step={0.05}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Volume: {Math.round(voiceVolume * 100)}%</Label>
              </div>
              <Slider 
                value={[voiceVolume]} 
                onValueChange={(value) => setVoiceVolume(value[0])} 
                min={0.1} 
                max={1} 
                step={0.1}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setSettingsOpen(false)}>Cancel</Button>
            <Button onClick={applySettings}>Apply Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardVoiceAssistant;
