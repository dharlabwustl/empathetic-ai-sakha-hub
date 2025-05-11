
import React, { useState, useEffect } from 'react';
import { X, Volume2, Mic, MicOff, Settings, VolumeOff, Globe, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { MoodType } from '@/types/user/base';

interface FloatingVoiceAnnouncerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FloatingVoiceAnnouncer: React.FC<FloatingVoiceAnnouncerProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
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
      speakMessage('Hello! I\'m your PREPZR voice assistant. How can I help with your exam preparation today?');
    }
  }, [isOpen, isVoiceSupported, voiceSettings.enabled, voiceSettings.muted, speakMessage]);
  
  // Listen for transcript changes and process voice input
  useEffect(() => {
    if (transcript && !isSpeaking) {
      handleVoiceInput(transcript);
    }
  }, [transcript, isSpeaking]);
  
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
    
    // Mood tracking commands
    if (text.toLowerCase().includes('log mood') || text.toLowerCase().includes('update mood') || 
        text.toLowerCase().includes('change mood') || text.toLowerCase().includes('set mood')) {
      
      // Handle specific mood mentions
      let detectedMood: MoodType | null = null;
      
      if (text.toLowerCase().includes('happy')) detectedMood = MoodType.HAPPY;
      else if (text.toLowerCase().includes('sad')) detectedMood = MoodType.SAD;
      else if (text.toLowerCase().includes('focus')) detectedMood = MoodType.FOCUSED;
      else if (text.toLowerCase().includes('motivate')) detectedMood = MoodType.MOTIVATED;
      else if (text.toLowerCase().includes('tired')) detectedMood = MoodType.TIRED;
      else if (text.toLowerCase().includes('stress')) detectedMood = MoodType.STRESSED;
      else if (text.toLowerCase().includes('confus')) detectedMood = MoodType.CONFUSED;
      else if (text.toLowerCase().includes('anxious')) detectedMood = MoodType.ANXIOUS;
      else if (text.toLowerCase().includes('neutral')) detectedMood = MoodType.NEUTRAL;
      else if (text.toLowerCase().includes('okay') || text.toLowerCase().includes('ok')) detectedMood = MoodType.OKAY;
      else if (text.toLowerCase().includes('overwhelm')) detectedMood = MoodType.OVERWHELMED;
      
      if (detectedMood) {
        // Update mood in localStorage
        try {
          const userData = localStorage.getItem('userData');
          if (userData) {
            const userObj = JSON.parse(userData);
            userObj.mood = detectedMood;
            localStorage.setItem('userData', JSON.stringify(userObj));
            
            // Trigger custom event for other components to react to
            const moodChangeEvent = new CustomEvent('mood-changed', { 
              detail: { mood: detectedMood, timestamp: new Date().toISOString() } 
            });
            document.dispatchEvent(moodChangeEvent);
            
            // Show toast
            toast({
              title: "Mood Updated",
              description: `Your mood has been set to ${detectedMood.toLowerCase()}.`,
            });
            
            const response = `I've updated your mood to ${detectedMood.toLowerCase()}. Is there anything else I can help you with?`;
            setMessages(prev => [...prev, { type: 'bot' as const, content: response }]);
            if (!voiceSettings.muted) {
              speakMessage(response);
            }
          } else {
            const response = "I couldn't update your mood because you don't appear to be logged in. Please log in first.";
            setMessages(prev => [...prev, { type: 'bot' as const, content: response }]);
            if (!voiceSettings.muted) {
              speakMessage(response);
            }
          }
        } catch (e) {
          console.error("Failed to update mood", e);
          const response = "Sorry, I had trouble updating your mood. Please try again.";
          setMessages(prev => [...prev, { type: 'bot' as const, content: response }]);
          if (!voiceSettings.muted) {
            speakMessage(response);
          }
        }
      } else {
        const response = "What mood would you like to set? You can say happy, sad, focused, motivated, tired, stressed, confused, anxious, neutral, okay, or overwhelmed.";
        setMessages(prev => [...prev, { type: 'bot' as const, content: response }]);
        if (!voiceSettings.muted) {
          speakMessage(response);
        }
      }
      
      setProcessingInput(false);
      return;
    }
    
    // Study plan commands
    if (text.toLowerCase().includes('study plan') || text.toLowerCase().includes('my plan')) {
      const response = "I'll open your study plan. You can see your assignments, progress, and upcoming tasks there.";
      setMessages(prev => [...prev, { type: 'bot' as const, content: response }]);
      if (!voiceSettings.muted) {
        speakMessage(response);
      }
      
      // Redirect to study plan page after a short delay
      setTimeout(() => {
        window.location.href = '/dashboard/student/study-plan';
      }, 2000);
      
      setProcessingInput(false);
      return;
    }
    
    // Daily tasks commands
    if (text.toLowerCase().includes('daily tasks') || text.toLowerCase().includes('today\'s plan') || 
        text.toLowerCase().includes('todays tasks') || text.toLowerCase().includes('my tasks')) {
      const response = "I'll show you today's tasks and study plan.";
      setMessages(prev => [...prev, { type: 'bot' as const, content: response }]);
      if (!voiceSettings.muted) {
        speakMessage(response);
      }
      
      // Redirect to today's plan page after a short delay
      setTimeout(() => {
        window.location.href = '/dashboard/student/today';
      }, 2000);
      
      setProcessingInput(false);
      return;
    }
    
    // Dashboard navigation
    if (text.toLowerCase().includes('go to dashboard') || text.toLowerCase().includes('main dashboard')) {
      const response = "Taking you to the dashboard now.";
      setMessages(prev => [...prev, { type: 'bot' as const, content: response }]);
      if (!voiceSettings.muted) {
        speakMessage(response);
      }
      
      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = '/dashboard/student';
      }, 2000);
      
      setProcessingInput(false);
      return;
    }
    
    // Practice exam commands
    if (text.toLowerCase().includes('practice exam') || text.toLowerCase().includes('practice test') || 
        text.toLowerCase().includes('take exam') || text.toLowerCase().includes('mock test')) {
      const response = "I'll take you to the practice exam section where you can test your knowledge.";
      setMessages(prev => [...prev, { type: 'bot' as const, content: response }]);
      if (!voiceSettings.muted) {
        speakMessage(response);
      }
      
      // Redirect to practice exam page
      setTimeout(() => {
        window.location.href = '/dashboard/student/practice-exam';
      }, 2000);
      
      setProcessingInput(false);
      return;
    }
    
    // Process the query (in a real app, this would use AI)
    const botResponses = [
      "I can help you prepare for your exams. What subject would you like to focus on?",
      "Would you like to create a study schedule for your upcoming exam?",
      "I can set up a practice test for you. Would you like that?",
      "Let's review your weak areas. Based on your performance, you should focus on Physics concepts.",
      "I can help you with flashcards to improve your recall. Should we start a flashcard session?"
    ];
    
    // Add personalized responses based on time of day
    const hour = new Date().getHours();
    let timeBasedResponses = [];
    
    if (hour < 12) {
      timeBasedResponses = [
        "Good morning! Starting your day with some study is excellent. What would you like to focus on?",
        "Morning study sessions are very effective. Would you like to review your notes or take a practice test?"
      ];
    } else if (hour < 17) {
      timeBasedResponses = [
        "Good afternoon! This is a great time to tackle some challenging topics. What would you like to work on?",
        "Afternoon study sessions help reinforce morning learning. Would you like to continue with your study plan?"
      ];
    } else {
      timeBasedResponses = [
        "Good evening! Some focused evening revision can help memory retention. What topic would you like to review?",
        "Evening is great for summarizing the day's learning. Should we review what you've studied today?"
      ];
    }
    
    // Combine standard and personalized responses
    const allResponses = [...botResponses, ...timeBasedResponses];
    const randomResponse = allResponses[Math.floor(Math.random() * allResponses.length)];
    
    // Simulate bot response with processing time
    setTimeout(() => {
      setProcessingInput(false);
      setMessages(prev => [...prev, { type: 'bot' as const, content: randomResponse }]);
      if (!voiceSettings.muted) {
        speakMessage(randomResponse);
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
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed bottom-8 right-8 w-80 sm:w-96 bg-white rounded-xl shadow-2xl z-50 overflow-hidden border border-gray-200 animate-fade-in">
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
          <div className="bg-white rounded-lg p-5 max-w-xs">
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
            </ul>
            <p className="text-xs text-gray-500 mb-4">Try asking: "Help me with my study plan" or "Show me today's tasks" or "Set my mood to happy"</p>
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
        <div className="p-4 border-b border-gray-200">
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
                onValueChange={(value) => updateVoiceSettings({ language: value })}
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
                <span className="text-xs text-gray-500">{Math.round(voiceSettings.volume * 100)}%</span>
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
                <span className="text-xs text-gray-500">{voiceSettings.rate.toFixed(1)}x</span>
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
      <div className="h-80 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg, index) => (
          <div 
            key={index}
            className={`mb-3 p-3 rounded-lg max-w-[80%] ${
              msg.type === 'user' 
                ? 'ml-auto bg-indigo-600 text-white' 
                : 'bg-white border border-gray-200'
            }`}
          >
            {msg.content}
          </div>
        ))}
        
        {/* Processing indicator */}
        {processingInput && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-white border border-gray-200 max-w-[80%]">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Loader2 className="h-4 w-4 text-indigo-500 animate-spin" />
            </motion.div>
            <span className="text-sm text-gray-500">Processing your request...</span>
          </div>
        )}
      </div>
      
      {/* Voice Assistant Input */}
      <div className="p-3 border-t border-gray-200">
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
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
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
      </div>
    </div>
  );
};

export default FloatingVoiceAnnouncer;
