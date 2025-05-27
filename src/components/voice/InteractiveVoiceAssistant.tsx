
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Volume2, VolumeX, Mic, MicOff, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import useVoiceAssistant from '@/hooks/useVoiceAssistant';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface InteractiveVoiceAssistantProps {
  userName?: string;
  language?: string;
  onNavigationCommand?: (route: string) => void;
  position?: 'bottom-right' | 'bottom-left';
  className?: string;
  assistantName?: string;
}

const InteractiveVoiceAssistant: React.FC<InteractiveVoiceAssistantProps> = ({
  userName = 'Student',
  language = 'en-US',
  onNavigationCommand,
  position = 'bottom-right',
  className = '',
  assistantName = 'PREPZR AI'
}) => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [conversationHistory, setConversationHistory] = useState<Array<{
    type: 'user' | 'assistant';
    message: string;
    timestamp: Date;
  }>>([]);

  const {
    settings,
    isListening,
    isSpeaking,
    transcript,
    speakText,
    startListening,
    stopListening,
    toggleMute,
    updateSettings
  } = useVoiceAssistant({
    userName,
    initialSettings: { language }
  });

  const positionClasses = position === 'bottom-right' 
    ? 'fixed bottom-6 right-6 z-40' 
    : 'fixed bottom-6 left-6 z-40';

  useEffect(() => {
    if (transcript) {
      processVoiceCommand(transcript);
    }
  }, [transcript]);

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('hello') || lowerCommand.includes('hi')) {
      const response = `Hello ${userName}! I'm ${assistantName}, your AI study companion. How can I help you today?`;
      speakText(response);
      addToConversation('user', command);
      addToConversation('assistant', response);
    } else if (lowerCommand.includes('dashboard')) {
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student');
      }
      speakText('Navigating to your dashboard');
    } else if (lowerCommand.includes('concepts')) {
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/concepts');
      }
      speakText('Opening concepts section');
    } else if (lowerCommand.includes('practice') || lowerCommand.includes('exam')) {
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/practice-exam');
      }
      speakText('Opening practice exams');
    } else if (lowerCommand.includes('flashcards')) {
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/flashcards');
      }
      speakText('Opening flashcards');
    }
  };

  const addToConversation = (type: 'user' | 'assistant', message: string) => {
    setConversationHistory(prev => [...prev, {
      type,
      message,
      timestamp: new Date()
    }]);
  };

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      const greeting = `Hello ${userName}! I'm ${assistantName}, ready to help with your studies.`;
      speakText(greeting);
      addToConversation('assistant', greeting);
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className={`${positionClasses} ${className}`}>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4"
          >
            <Card className="w-80 shadow-2xl border-2 border-purple-200 dark:border-purple-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-purple-700 dark:text-purple-300">
                    {assistantName}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSettings(true)}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsExpanded(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-32 overflow-y-auto space-y-2 bg-gray-50 dark:bg-gray-800 rounded p-2">
                    {conversationHistory.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center">
                        Start a conversation by saying "Hello"
                      </p>
                    ) : (
                      conversationHistory.map((item, index) => (
                        <div
                          key={index}
                          className={`text-xs p-2 rounded ${
                            item.type === 'user'
                              ? 'bg-blue-100 dark:bg-blue-900 ml-4'
                              : 'bg-purple-100 dark:bg-purple-900 mr-4'
                          }`}
                        >
                          <span className="font-semibold">
                            {item.type === 'user' ? 'You' : assistantName}:
                          </span>
                          <span className="ml-2">{item.message}</span>
                        </div>
                      ))
                    )}
                  </div>
                  
                  <div className="flex justify-center gap-2">
                    <Button
                      onClick={handleVoiceToggle}
                      variant={isListening ? "destructive" : "default"}
                      size="sm"
                      className="flex-1"
                    >
                      {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                      {isListening ? 'Stop' : 'Talk'}
                    </Button>
                    <Button
                      onClick={toggleMute}
                      variant="outline"
                      size="sm"
                    >
                      {settings.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  {isListening && (
                    <div className="text-center">
                      <div className="flex justify-center">
                        <div className="animate-pulse bg-red-500 rounded-full h-2 w-2 mr-1"></div>
                        <div className="animate-pulse bg-red-500 rounded-full h-2 w-2 mr-1" style={{animationDelay: '0.1s'}}></div>
                        <div className="animate-pulse bg-red-500 rounded-full h-2 w-2" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Listening...</p>
                    </div>
                  )}
                  
                  {isSpeaking && (
                    <div className="text-center">
                      <div className="flex justify-center">
                        <div className="animate-bounce bg-purple-500 rounded-full h-2 w-2 mr-1"></div>
                        <div className="animate-bounce bg-purple-500 rounded-full h-2 w-2 mr-1" style={{animationDelay: '0.1s'}}></div>
                        <div className="animate-bounce bg-purple-500 rounded-full h-2 w-2" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{assistantName} is speaking...</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Assistant Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={handleToggleExpanded}
          className={`rounded-full w-14 h-14 shadow-lg border-2 border-white dark:border-gray-800 ${
            isExpanded 
              ? 'bg-purple-600 hover:bg-purple-700' 
              : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
          }`}
          size="sm"
        >
          <Volume2 className="h-6 w-6 text-white" />
          {(isListening || isSpeaking) && (
            <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-400 animate-pulse"></span>
          )}
        </Button>
      </motion.div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{assistantName} Settings</DialogTitle>
            <DialogDescription>
              Configure your voice assistant preferences
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Voice Enabled</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateSettings({ enabled: !settings.enabled })}
              >
                {settings.enabled ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Audio Output</span>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleMute}
              >
                {settings.muted ? 'Muted' : 'Unmuted'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InteractiveVoiceAssistant;
