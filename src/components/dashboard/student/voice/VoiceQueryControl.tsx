
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, MessageSquare, Volume2, VolumeX, AlertTriangle } from "lucide-react";
import { useVoiceAnnouncerContext } from './VoiceAnnouncer';
import ProfileVoiceTooltip from '../profile/ProfileVoiceTooltip';
import { testVoiceSystem } from './voiceUtils';

interface VoiceQueryControlProps {
  className?: string;
  examGoal?: string;
}

const VoiceQueryControl: React.FC<VoiceQueryControlProps> = ({ className, examGoal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);
  const [voiceStatus, setVoiceStatus] = useState<'ok' | 'warning' | 'error'>('ok');
  
  const { 
    speak, 
    processQuery, 
    testVoice, 
    isSpeaking, 
    stopSpeaking, 
    settings, 
    updateSettings,
    fixVoiceSystem,
    voiceSystemReady
  } = useVoiceAnnouncerContext();
  
  // Animation effect to draw attention to the voice icon when it first appears
  useEffect(() => {
    // Start the pulsing animation
    setIsPulsing(true);
    
    // Stop the pulsing animation after 10 seconds
    const timer = setTimeout(() => {
      setIsPulsing(false);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Check voice system status
  useEffect(() => {
    // Test voice system on mount
    if (window.speechSynthesis) {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        setVoiceStatus('warning');
      } else {
        setVoiceStatus('ok');
      }
    } else {
      setVoiceStatus('error');
    }
    
    // Update based on voice system ready state
    if (!voiceSystemReady) {
      setVoiceStatus('warning');
    }
  }, [voiceSystemReady]);
  
  // Additional pulsing effect when speaking
  useEffect(() => {
    // Reset pulsing state when speaking changes
    if (isSpeaking) {
      setIsPulsing(true);
    }
  }, [isSpeaking]);
  
  // Handle voice input processing
  const handleSubmitQuery = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!query.trim()) return;
    
    // Process the query and get a response
    const response = processQuery(query);
    
    // Speak the response with force=true to ensure it's spoken
    speak(response, true);
    
    // Reset the input field
    setQuery('');
  };
  
  // Toggle voice listening (in a real implementation, this would use the Web Speech API)
  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      // In a real implementation, this would start voice recognition
      // For now, we'll just simulate it and set a timeout to turn it off
      setTimeout(() => {
        setIsListening(false);
        setQuery("How can I improve my exam preparation?"); // Simulate a recognized query
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  // Toggle mute/unmute voice
  const toggleVoice = () => {
    if (voiceStatus !== 'ok' && !settings.enabled) {
      // Try to fix voice system when enabling
      fixVoiceSystem();
      setTimeout(() => testVoice(), 500);
    }
    updateSettings({ enabled: !settings.enabled });
  };
  
  // Get exam-specific suggestions
  const getExamSpecificSuggestions = () => {
    if (!examGoal) return [
      "What's my next task?",
      "Help me create a study plan",
      "How to improve my recall?",
      "Suggest practice exam strategies"
    ];
    
    if (examGoal.includes("NEET")) {
      return [
        "Tips for NEET Biology preparation",
        "How to memorize NEET Chemistry formulas",
        "NEET Physics problem solving strategies",
        "Best way to revise for NEET"
      ];
    } else if (examGoal.includes("JEE")) {
      return [
        "JEE Maths practice advice",
        "How to solve JEE Physics numericals faster",
        "JEE Chemistry important topics",
        "Time management for JEE"
      ];
    } else {
      return [
        `Best way to prepare for ${examGoal}`,
        `Important topics for ${examGoal}`,
        `${examGoal} revision strategies`,
        `How to take notes for ${examGoal}`
      ];
    }
  };
  
  // Handle voice system check
  const handleCheckVoiceSystem = () => {
    const result = testVoiceSystem();
    if (result) {
      setVoiceStatus('ok');
    } else {
      fixVoiceSystem();
      setTimeout(() => {
        const secondTry = testVoiceSystem();
        setVoiceStatus(secondTry ? 'ok' : 'error');
      }, 1000);
    }
  };

  const examSuggestions = getExamSpecificSuggestions();
  
  return (
    <ProfileVoiceTooltip>
      <div className="flex items-center gap-1">
        {/* Voice toggle button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={toggleVoice}
              >
                {settings.enabled ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {settings.enabled ? "Mute Voice Assistant" : "Unmute Voice Assistant"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Voice query button */}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`relative ${className} ${isSpeaking ? 'bg-primary/10' : ''} ${
                isPulsing ? 'ring-2 ring-primary/50 ring-offset-2 ring-offset-background' : ''
              }`}
              aria-label="Voice Assistant"
              onClick={() => {
                if (voiceStatus !== 'ok') {
                  handleCheckVoiceSystem();
                }
              }}
            >
              {voiceStatus !== 'ok' ? (
                <AlertTriangle 
                  className={`h-5 w-5 ${voiceStatus === 'error' ? 'text-red-500' : 'text-amber-500'} ${
                    isPulsing ? 'animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]' : ''
                  }`} 
                />
              ) : (
                <Volume2 
                  className={`h-5 w-5 ${isSpeaking ? 'text-primary animate-pulse' : ''} ${
                    isPulsing && !isSpeaking ? 'text-primary animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]' : ''
                  }`} 
                />
              )}
              {settings.enabled && isSpeaking && (
                <span className={`absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-ping`}></span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">Voice Assistant</h4>
                <div className="flex gap-2">
                  {isSpeaking && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={stopSpeaking}
                      className="h-8 text-xs"
                    >
                      Stop Speaking
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      testVoice();
                      if (voiceStatus !== 'ok') {
                        handleCheckVoiceSystem();
                      }
                    }}
                    className="h-8 text-xs"
                  >
                    Test Voice
                  </Button>
                </div>
              </div>
              
              {voiceStatus !== 'ok' && (
                <div className={`text-xs p-2 rounded ${
                  voiceStatus === 'error' ? 'bg-red-50 text-red-800 border border-red-200' : 
                  'bg-amber-50 text-amber-800 border border-amber-200'
                }`}>
                  {voiceStatus === 'error' ? (
                    <p>Voice system error detected. Your browser may not support speech synthesis or audio is blocked.</p>
                  ) : (
                    <p>Voice system needs initialization. Click "Test Voice" button above.</p>
                  )}
                </div>
              )}
              
              <form onSubmit={handleSubmitQuery} className="flex gap-2">
                <Input
                  placeholder="Ask me anything..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1"
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        type="button" 
                        size="icon" 
                        variant={isListening ? "destructive" : "outline"} 
                        onClick={toggleListening}
                      >
                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      {isListening ? "Stop Voice Input" : "Start Voice Input"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        type="submit" 
                        size="icon"
                        disabled={!query.trim()}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Send Question</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </form>
              
              <div className="text-xs text-muted-foreground">
                <p>Try asking:</p>
                <ul className="list-disc pl-4 space-y-1 mt-1">
                  {examSuggestions.map((suggestion, index) => (
                    <li key={index} className="cursor-pointer hover:text-primary" onClick={() => setQuery(suggestion)}>
                      "{suggestion}"
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </ProfileVoiceTooltip>
  );
};

export default VoiceQueryControl;
