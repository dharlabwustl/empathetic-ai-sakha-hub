
import React, { useState, useEffect } from 'react';
import { X, Volume2, Mic, MicOff, Settings, VolumeOff, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { VoiceSettings } from '@/components/dashboard/student/voice/voiceUtils';

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
  
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      type: 'bot' as const,
      content: 'Hello! I\'m your PREPZR voice assistant. How can I help with your exam preparation today?'
    }
  ]);
  const [showSettings, setShowSettings] = useState(false);
  
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
    
    // Special commands
    if (text.toLowerCase().includes('mute') || text.toLowerCase().includes('be quiet')) {
      toggleMute(true);
      setMessages(prev => [...prev, { 
        type: 'bot' as const, 
        content: 'Voice assistant muted. I\'ll still listen for commands.' 
      }]);
      return;
    }
    
    if (text.toLowerCase().includes('unmute') || text.toLowerCase().includes('speak again')) {
      toggleMute(false);
      setMessages(prev => [...prev, { 
        type: 'bot' as const, 
        content: 'Voice assistant unmuted. I\'ll speak responses again.' 
      }]);
      speakMessage('Voice assistant unmuted. I\'ll speak responses again.', true);
      return;
    }
    
    if (text.toLowerCase().includes('hindi') || text.toLowerCase().includes('हिंदी')) {
      updateVoiceSettings({ language: 'hi-IN' });
      const response = "अब मैं हिंदी में बात करूंगा।";
      setMessages(prev => [...prev, { type: 'bot' as const, content: response }]);
      speakMessage(response);
      return;
    }
    
    if (text.toLowerCase().includes('english') || text.toLowerCase().includes('अंग्रेज़ी')) {
      updateVoiceSettings({ language: 'en-US' });
      const response = "I'll speak English now.";
      setMessages(prev => [...prev, { type: 'bot' as const, content: response }]);
      speakMessage(response);
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
    
    const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
    
    // Simulate bot response
    setTimeout(() => {
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
              <Mic className="w-5 h-5" />
            ) : voiceSettings.muted ? (
              <VolumeOff className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-sm">PREPZR Voice Assistant</h3>
            <p className="text-xs opacity-80">
              {isListening ? "Listening..." : isSpeaking ? "Speaking..." : voiceSettings.muted ? "Muted" : "Ask me anything"}
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
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
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
        
        {/* Suggestion buttons */}
        <div className="mt-2 flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={() => setInput("Help me with my study plan")}
          >
            Help me with my study plan
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
