
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Mic, MicOff, Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { MoodType } from '@/types/user/base';
import useVoiceAnnouncer from '@/hooks/useVoiceAnnouncer';

interface DashboardVoiceAssistantProps {
  userName?: string;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({
  userName,
  currentMood,
  onMoodChange
}) => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const {
    speakMessage,
    isSpeaking,
    isListening,
    startListening,
    stopListening,
    transcript,
    voiceSettings,
    toggleMute,
    processVoiceCommand
  } = useVoiceAnnouncer({
    userName,
    mood: currentMood,
    initialSettings: { language: 'en-IN' }
  });
  
  // Show the button after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonVisible(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Process transcript when it changes
  useEffect(() => {
    if (transcript) {
      handleVoiceCommand(transcript);
    }
  }, [transcript]);
  
  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Handle mood changes
    if (lowerCommand.includes('i feel') || lowerCommand.includes('i am')) {
      if (lowerCommand.includes('happy') && onMoodChange) {
        onMoodChange(MoodType.HAPPY);
        speakMessage(`I've updated your mood to happy. That's great to hear!`);
        return;
      } else if (lowerCommand.includes('tired') && onMoodChange) {
        onMoodChange(MoodType.TIRED);
        speakMessage(`I've updated your mood to tired. Remember to take breaks as needed.`);
        return;
      } else if (lowerCommand.includes('stressed') && onMoodChange) {
        onMoodChange(MoodType.STRESSED);
        speakMessage(`I've updated your mood to stressed. Let's focus on manageable tasks today.`);
        return;
      } else if (lowerCommand.includes('motivated') && onMoodChange) {
        onMoodChange(MoodType.MOTIVATED);
        speakMessage(`I've updated your mood to motivated. Let's make the most of this energy!`);
        return;
      }
    }
    
    // Handle navigation commands
    if (lowerCommand.includes('go to') || lowerCommand.includes('navigate to') || lowerCommand.includes('open')) {
      if (lowerCommand.includes('dashboard')) {
        navigateTo('/dashboard/student');
        return;
      } else if (lowerCommand.includes('study plan')) {
        navigateTo('/dashboard/student/study-plan');
        return;
      } else if (lowerCommand.includes('concepts')) {
        navigateTo('/dashboard/student/concepts');
        return;
      } else if (lowerCommand.includes('flashcard')) {
        navigateTo('/dashboard/student/flashcards/landing');
        return;
      } else if (lowerCommand.includes('practice') || lowerCommand.includes('exam')) {
        navigateTo('/dashboard/student/practice');
        return;
      } else if (lowerCommand.includes('profile')) {
        navigateTo('/dashboard/student/profile');
        return;
      } else if (lowerCommand.includes('feel good') || lowerCommand.includes('wellness')) {
        navigateTo('/dashboard/student/feel-good-corner');
        return;
      } else if (lowerCommand.includes('advisor')) {
        navigateTo('/dashboard/student/academic-advisor');
        return;
      }
    }
    
    // For all other commands, let the useVoiceAnnouncer handle them
    processVoiceCommand(command);
  };
  
  const navigateTo = (path: string) => {
    speakMessage(`Navigating to ${path.split('/').pop()?.replace('-', ' ')}`);
    navigate(path);
  };
  
  const handleListen = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      toast({
        title: "Listening...",
        description: "Speak now and I'll try to help you."
      });
    }
  };
  
  const handleOpen = () => {
    setIsOpen(true);
  };
  
  return (
    <>
      {/* Floating Voice Assistant Button */}
      <AnimatePresence>
        {isButtonVisible && !isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button 
              onClick={handleOpen}
              className={`rounded-full shadow-lg ${isSpeaking ? 'bg-green-500 hover:bg-green-600 animate-pulse' : 'bg-purple-600 hover:bg-purple-700'}`}
              size="icon"
            >
              {isSpeaking ? (
                <Volume2 className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
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
            className="fixed bottom-20 right-6 z-50 w-[350px] shadow-2xl rounded-lg overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2 text-white">
                <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-green-400 animate-pulse' : 'bg-white'}`}></div>
                <span className="font-medium">Voice Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/20"
                  onClick={() => toggleMute()}
                >
                  {voiceSettings.muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-3 h-[120px] overflow-auto">
                <p className="text-sm mb-2">
                  <span className="font-medium">Hello, {userName || 'student'}!</span> 
                  {currentMood && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      You're feeling {currentMood.toLowerCase()} today
                    </span>
                  )}
                </p>
                
                {transcript ? (
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded text-sm">
                    <p className="font-medium">You said:</p>
                    <p>{transcript}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Ask me to navigate to different sections, update your mood, or help with your study plan.
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  className={isListening ? 'bg-red-500 hover:bg-red-600' : undefined}
                  onClick={handleListen}
                >
                  {isListening ? (
                    <>
                      <MicOff className="mr-2 h-4 w-4" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-4 w-4" />
                      Speak
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => {
                    speakMessage("I can help you navigate through your dashboard, update your mood, find study materials, or answer questions about your progress.");
                  }}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Help
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {[
                  { path: '/dashboard/student/concepts', label: 'Concepts' },
                  { path: '/dashboard/student/practice', label: 'Practice' },
                  { path: '/dashboard/student/study-plan', label: 'Study Plan' },
                  { path: '/dashboard/student/academic-advisor', label: 'Get Help' }
                ].map(item => (
                  <Button 
                    key={item.path}
                    variant="secondary"
                    size="sm"
                    onClick={() => navigateTo(item.path)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardVoiceAssistant;
