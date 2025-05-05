
import React, { useState, useEffect, useCallback } from 'react';
import { X, Volume2, Mic, MicOff, Settings, VolumeOff, Globe, Loader2, Lightbulb, BookText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { motion } from 'framer-motion';
import { getSmartSuggestion, SMART_SUGGESTIONS } from '@/components/dashboard/student/voice/voiceUtils';
import { MoodType } from '@/types/user/base';
import { useLocation } from 'react-router-dom';

interface FloatingVoiceAnnouncerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FloatingVoiceAnnouncer: React.FC<FloatingVoiceAnnouncerProps> = ({ isOpen, onClose }) => {
  const {
    isListening,
    isSpeaking,
    transcript,
    voiceSettings,
    startListening,
    stopListening,
    speakMessage,
    toggleVoiceEnabled,
    toggleMute,
    updateVoiceSettings,
    testVoice,
    isVoiceSupported
  } = useVoiceAnnouncer({ 
    isFirstTimeUser: false 
  });
  
  const location = useLocation();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      type: 'bot' as const,
      content: 'Hello! I\'m your PREPZR voice assistant. How can I help with your exam preparation today?'
    }
  ]);
  const [showSettings, setShowSettings] = useState(false);
  const [processingInput, setProcessingInput] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [smartSuggestionTimer, setSmartSuggestionTimer] = useState<NodeJS.Timeout | null>(null);
  const [userContext, setUserContext] = useState({
    examType: 'NEET',
    subject: 'General',
    mood: undefined
  });
  
  // Check if user has seen onboarding
  useEffect(() => {
    const onboardingSeen = localStorage.getItem('voiceAssistantOnboardingSeen');
    setHasSeenOnboarding(onboardingSeen === 'true');
    
    // Show onboarding for first-time users when opened
    if (isOpen && !onboardingSeen) {
      setShowOnboarding(true);
      // Mark as seen for future visits
      localStorage.setItem('voiceAssistantOnboardingSeen', 'true');
    }
  }, [isOpen]);
  
  // Auto-speak welcome message when opened
  useEffect(() => {
    if (isOpen && isVoiceSupported && voiceSettings.enabled && !voiceSettings.muted) {
      speakMessage('Hello! I\'m your prep-zer voice assistant. How can I help with your exam preparation today?');
    }
  }, [isOpen, isVoiceSupported, voiceSettings.enabled, voiceSettings.muted, speakMessage]);
  
  // Listen for transcript changes and process voice input
  useEffect(() => {
    if (transcript && !isSpeaking) {
      handleVoiceInput(transcript);
    }
  }, [transcript, isSpeaking]);
  
  // Determine context based on current route
  useEffect(() => {
    let context = {
      examType: 'NEET',
      subject: 'General' as const,
      activity: undefined as 'studying' | 'exam_prep' | 'revision' | 'break' | 'practice_test' | undefined,
      mood: undefined as MoodType | undefined
    };
    
    // Extract context from URL path
    if (location.pathname.includes('/dashboard/student/exams')) {
      context.activity = 'exam_prep';
    } else if (location.pathname.includes('/dashboard/student/concepts')) {
      context.activity = 'studying';
    } else if (location.pathname.includes('/dashboard/student/flashcards')) {
      context.activity = 'revision';
    } else if (location.pathname.includes('/dashboard/student/practice-test')) {
      context.activity = 'practice_test';
    }
    
    // Extract subject from URL if available
    if (location.pathname.includes('physics')) {
      context.subject = 'Physics';
    } else if (location.pathname.includes('chemistry')) {
      context.subject = 'Chemistry';
    } else if (location.pathname.includes('biology')) {
      context.subject = 'Biology';
    } else if (location.pathname.includes('mathematics')) {
      context.subject = 'Mathematics';
    }
    
    // Get user mood from localStorage if available
    try {
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        if (parsedData.mood) {
          context.mood = parsedData.mood as MoodType;
        }
      }
    } catch (err) {
      console.error("Error getting mood from localStorage:", err);
    }
    
    // Get exam type from localStorage if available
    try {
      const userProfile = localStorage.getItem("userProfile");
      if (userProfile) {
        const parsedProfile = JSON.parse(userProfile);
        if (parsedProfile.goals && parsedProfile.goals[0] && parsedProfile.goals[0].title) {
          const goalTitle = parsedProfile.goals[0].title;
          if (goalTitle.includes('NEET')) {
            context.examType = 'NEET';
          } else if (goalTitle.includes('JEE')) {
            context.examType = 'IIT-JEE';
          } else if (goalTitle.includes('UPSC')) {
            context.examType = 'UPSC';
          }
        }
      }
    } catch (err) {
      console.error("Error getting exam type from localStorage:", err);
    }
    
    setUserContext(context);
  }, [location.pathname]);
  
  // Set up periodic smart suggestions if the voice announcer is open
  useEffect(() => {
    if (isOpen && isVoiceSupported && voiceSettings.enabled && !voiceSettings.muted) {
      // Clear any existing timers
      if (smartSuggestionTimer) {
        clearInterval(smartSuggestionTimer);
      }
      
      // Set up a new timer that gives smart suggestions every 2-3 minutes
      const timer = setInterval(() => {
        // Only give suggestion if not already speaking or listening
        if (!isSpeaking && !isListening) {
          const suggestion = getSmartSuggestion(userContext);
          setMessages(prev => [...prev, { type: 'bot' as const, content: suggestion }]);
          speakMessage(suggestion);
        }
      }, 120000 + Math.random() * 60000); // Random interval between 2-3 minutes
      
      setSmartSuggestionTimer(timer);
      
      return () => {
        clearInterval(timer);
      };
    }
  }, [isOpen, isVoiceSupported, voiceSettings.enabled, voiceSettings.muted, isSpeaking, isListening, speakMessage, userContext]);
  
  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (smartSuggestionTimer) {
        clearInterval(smartSuggestionTimer);
      }
    };
  }, [smartSuggestionTimer]);
  
  const getSmartResponse = useCallback((input: string) => {
    const lowerInput = input.toLowerCase();
    
    // Check for subject-specific questions
    if (lowerInput.includes('physics') || lowerInput.includes('force') || lowerInput.includes('motion')) {
      return getSmartSuggestion({...userContext, subject: 'Physics'});
    }
    
    if (lowerInput.includes('chemistry') || lowerInput.includes('reaction') || lowerInput.includes('compound')) {
      return getSmartSuggestion({...userContext, subject: 'Chemistry'});
    }
    
    if (lowerInput.includes('biology') || lowerInput.includes('cell') || lowerInput.includes('organism')) {
      return getSmartSuggestion({...userContext, subject: 'Biology'});
    }
    
    if (lowerInput.includes('math') || lowerInput.includes('calculation') || lowerInput.includes('formula')) {
      return getSmartSuggestion({...userContext, subject: 'Mathematics'});
    }
    
    // Check for exam-specific questions
    if (lowerInput.includes('neet') || lowerInput.includes('medical')) {
      return getSmartSuggestion({...userContext, examType: 'NEET'});
    }
    
    if (lowerInput.includes('jee') || lowerInput.includes('engineering')) {
      return getSmartSuggestion({...userContext, examType: 'IIT-JEE'});
    }
    
    if (lowerInput.includes('upsc') || lowerInput.includes('civil service')) {
      return getSmartSuggestion({...userContext, examType: 'UPSC'});
    }
    
    // Check for memory and recall questions
    if (lowerInput.includes('memory') || lowerInput.includes('forget') || lowerInput.includes('recall') || 
        lowerInput.includes('remember') || lowerInput.includes('memorize')) {
      return SMART_SUGGESTIONS.recallTips[Math.floor(Math.random() * SMART_SUGGESTIONS.recallTips.length)];
    }
    
    // Check for time management questions
    if (lowerInput.includes('time') || lowerInput.includes('schedule') || lowerInput.includes('plan') ||
        lowerInput.includes('organize')) {
      return SMART_SUGGESTIONS.timeManagement[Math.floor(Math.random() * SMART_SUGGESTIONS.timeManagement.length)];
    }
    
    // Check for exam day questions
    if (lowerInput.includes('exam day') || lowerInput.includes('during exam') || lowerInput.includes('test day')) {
      return SMART_SUGGESTIONS.examDayTips[Math.floor(Math.random() * SMART_SUGGESTIONS.examDayTips.length)];
    }
    
    // Default to a general smart suggestion
    return getSmartSuggestion(userContext);
  }, [userContext]);
  
  const handleVoiceInput = (text: string) => {
    // Add user message
    setMessages(prev => [...prev, { type: 'user' as const, content: text }]);
    setInput('');
    setProcessingInput(true);
    
    // Special commands
    if (text.toLowerCase().includes('mute') || text.toLowerCase().includes('be quiet')) {
      toggleMute(true);
      setMessages(prev => [...prev, { 
        type: 'bot' as const, 
        content: 'Voice assistant muted. I\'ll still listen for commands.' 
      }]);
      setProcessingInput(false);
      return;
    }
    
    if (text.toLowerCase().includes('unmute') || text.toLowerCase().includes('speak again')) {
      toggleMute(false);
      setMessages(prev => [...prev, { 
        type: 'bot' as const, 
        content: 'Voice assistant unmuted. I\'ll speak responses again.' 
      }]);
      speakMessage('Voice assistant unmuted. I\'ll speak responses again.', true);
      setProcessingInput(false);
      return;
    }
    
    if (text.toLowerCase().includes('hindi') || text.toLowerCase().includes('हिंदी')) {
      updateVoiceSettings({ language: 'hi-IN' });
      const response = "अब मैं हिंदी में बात करूंगा।";
      setMessages(prev => [...prev, { type: 'bot' as const, content: response }]);
      speakMessage(response);
      setProcessingInput(false);
      return;
    }
    
    if (text.toLowerCase().includes('english') || text.toLowerCase().includes('अंग्रेज़ी')) {
      updateVoiceSettings({ language: 'en-US' });
      const response = "I'll speak English now.";
      setMessages(prev => [...prev, { type: 'bot' as const, content: response }]);
      speakMessage(response);
      setProcessingInput(false);
      return;
    }
    
    // Get a smart contextual response based on user input and current context
    const smartResponse = getSmartResponse(text);
    
    // Simulate processing time
    setTimeout(() => {
      setProcessingInput(false);
      setMessages(prev => [...prev, { type: 'bot' as const, content: smartResponse }]);
      if (!voiceSettings.muted) {
        speakMessage(smartResponse);
      }
    }, 800);
  };
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    handleVoiceInput(input);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const handleToggleListen = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  const handleGiveTip = () => {
    const suggestion = getSmartSuggestion(userContext);
    setMessages(prev => [...prev, { type: 'bot' as const, content: suggestion }]);
    speakMessage(suggestion);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed bottom-8 right-8 w-80 sm:w-96 bg-white rounded-xl shadow-2xl z-50 overflow-hidden border border-gray-200 animate-fade-in dark:bg-gray-900 dark:border-gray-700">
      {/* Voice Assistant Header */}
      <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-1.5 rounded-full">
            {isListening ? (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Mic className="w-5 h-5 text-red-200" />
              </motion.div>
            ) : processingInput ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              >
                <Loader2 className="w-5 h-5" />
              </motion.div>
            ) : voiceSettings.muted ? (
              <VolumeOff className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-sm">PREPZR Voice Assistant</h3>
            <p className="text-xs opacity-80">
              {isListening ? "Listening..." : 
               processingInput ? "Processing..." :
               isSpeaking ? "Speaking..." : 
               voiceSettings.muted ? "Muted" : "Ask me anything"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowSettings(!showSettings)}
            className="text-white hover:bg-white/20 h-8 w-8"
          >
            <Settings size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-white hover:bg-white/20 h-8 w-8"
          >
            <X size={16} />
          </Button>
        </div>
      </div>
      
      {/* Onboarding overlay for first-time users */}
      {showOnboarding && (
        <div className="absolute inset-0 bg-black/80 z-10 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-5 max-w-xs">
            <h4 className="font-medium text-lg mb-3">Welcome to Voice Assistant!</h4>
            <ul className="space-y-3 mb-4 text-sm">
              <li className="flex items-start gap-2">
                <Mic className="h-4 w-4 text-indigo-600 mt-1" />
                <span>Click the mic button to speak commands and questions</span>
              </li>
              <li className="flex items-start gap-2">
                <Volume2 className="h-4 w-4 text-indigo-600 mt-1" />
                <span>Toggle sound on/off with the speaker button</span>
              </li>
              <li className="flex items-start gap-2">
                <Globe className="h-4 w-4 text-indigo-600 mt-1" />
                <span>Switch between English and Hindi languages</span>
              </li>
              <li className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-indigo-600 mt-1" />
                <span>Get smart study tips based on your current activity</span>
              </li>
            </ul>
            <p className="text-xs text-gray-500 mb-4">Try asking: "Help me with my study plan" or "How can I improve my memory for Biology?"</p>
            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
              onClick={() => setShowOnboarding(false)}
            >
              Got it!
            </Button>
          </div>
        </div>
      )}
      
      {/* Settings Panel */}
      {showSettings && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium mb-3">Voice Assistant Settings</h4>
          
          <div className="space-y-4">
            {/* Enable/Disable */}
            <div className="flex items-center justify-between">
              <span className="text-sm">Enable Voice</span>
              <Switch 
                checked={voiceSettings.enabled} 
                onCheckedChange={toggleVoiceEnabled} 
              />
            </div>
            
            {/* Mute/Unmute */}
            <div className="flex items-center justify-between">
              <span className="text-sm">Mute Voice</span>
              <Switch 
                checked={voiceSettings.muted} 
                onCheckedChange={() => toggleMute()} 
              />
            </div>
            
            {/* Language Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Language</span>
              </div>
              <Select 
                value={voiceSettings.language} 
                onValueChange={(value) => updateVoiceSettings({ language: value as any })}
              >
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    <Globe size={14} />
                    <span>
                      {voiceSettings.language === 'hi-IN' ? 'Hindi' : 'English'}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="en-IN">English (Indian)</SelectItem>
                  <SelectItem value="hi-IN">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Volume */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Volume</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{Math.round(voiceSettings.volume * 100)}%</span>
              </div>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[voiceSettings.volume]}
                onValueChange={(values) => updateVoiceSettings({ volume: values[0] })}
              />
            </div>
            
            {/* Speed */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Speed</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{voiceSettings.rate.toFixed(1)}x</span>
              </div>
              <Slider
                min={0.5}
                max={2}
                step={0.1}
                value={[voiceSettings.rate]}
                onValueChange={(values) => updateVoiceSettings({ rate: values[0] })}
              />
            </div>
            
            {/* Test button */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={testVoice}
              className="w-full"
            >
              Test Voice
            </Button>
          </div>
        </div>
      )}
      
      {/* Voice Assistant Messages */}
      <div className="h-80 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-800/50">
        {messages.map((msg, index) => (
          <div 
            key={index}
            className={`mb-3 p-3 rounded-lg max-w-[80%] ${
              msg.type === 'user' 
                ? 'ml-auto bg-indigo-600 text-white' 
                : 'bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200'
            }`}
          >
            {msg.content}
          </div>
        ))}
        
        {/* Processing indicator */}
        {processingInput && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-white border border-gray-200 max-w-[80%] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Loader2 className="h-4 w-4 text-indigo-500 animate-spin" />
            </motion.div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Processing your request...</span>
          </div>
        )}
      </div>
      
      {/* Voice Assistant Input */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Button
            variant={isListening ? "default" : "outline"}
            size="icon"
            onClick={handleToggleListen}
            className={isListening ? "bg-red-500 hover:bg-red-600" : ""}
          >
            {isListening ? (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <MicOff size={18} />
              </motion.div>
            ) : (
              <Mic size={18} />
            )}
          </Button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Type your message or click the mic to speak... (${voiceSettings.language === 'hi-IN' ? 'Hindi' : 'English'})`}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            disabled={isListening}
          />
          <Button
            className="bg-indigo-600 hover:bg-indigo-700"
            size="sm"
            onClick={handleSendMessage}
            disabled={!input.trim() && !isListening}
          >
            Send
          </Button>
        </div>
        
        {/* Status indicators */}
        <div className="flex items-center justify-between mt-2">
          {/* Listening indicator */}
          {isListening && (
            <div className="text-center text-xs text-indigo-600 animate-pulse">
              Listening... Say something or click the mic to stop
            </div>
          )}
          
          {/* Mute indicator */}
          {voiceSettings.muted && (
            <div className="text-center text-xs text-gray-500 flex items-center gap-1">
              <VolumeOff size={12} />
              <span>Voice is muted</span>
            </div>
          )}
          
          {/* Language indicator */}
          <div className="text-xs text-gray-500 flex items-center gap-1 ml-auto">
            <Globe size={12} />
            <span>{voiceSettings.language === 'hi-IN' ? 'Hindi' : 'English'}</span>
          </div>
        </div>
        
        {/* Smart tip button and suggestion buttons */}
        <div className="mt-2 flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs flex items-center gap-1"
            onClick={handleGiveTip}
          >
            <Lightbulb className="h-3 w-3" />
            Get a smart study tip
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs flex items-center gap-1"
            onClick={() => setInput("How can I improve my memory?")}
          >
            <BookText className="h-3 w-3" />
            Memory techniques
          </Button>
          
          {voiceSettings.language === 'hi-IN' ? (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={() => setInput("अंग्रेज़ी में बोलो")}
            >
              Switch to English
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={() => setInput("Switch to Hindi")}
            >
              Switch to Hindi
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FloatingVoiceAnnouncer;
