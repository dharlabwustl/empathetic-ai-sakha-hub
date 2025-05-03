
import React, { useState, useEffect, useRef } from 'react';
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
import { Mic, MicOff, MessageSquare, Volume2, VolumeX } from "lucide-react";
import { useVoiceAnnouncerContext } from './VoiceAnnouncer';
import ProfileVoiceTooltip from '../profile/ProfileVoiceTooltip';

interface VoiceQueryControlProps {
  className?: string;
  examGoal?: string;
}

const VoiceQueryControl: React.FC<VoiceQueryControlProps> = ({ 
  className,
  examGoal = "exam"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const { 
    speak, 
    processQuery, 
    testVoice, 
    isSpeaking, 
    settings,
    updateSettings,
    stopSpeaking 
  } = useVoiceAnnouncerContext();
  
  const mountedRef = useRef(false);
  
  // Only show pulsing animation for first-time users or when speaking
  useEffect(() => {
    // Check if this is first mount
    if (!mountedRef.current) {
      mountedRef.current = true;
      
      // Check if user is new (first session)
      const isNewUser = localStorage.getItem('new_user_signup') === 'true' || 
                       !localStorage.getItem('hasSeenVoiceTooltip');
      
      if (isNewUser) {
        // Start pulsing for new users to draw attention
        setIsPulsing(true);
        
        // Stop pulsing after 10 seconds
        const timer = setTimeout(() => {
          setIsPulsing(false);
          localStorage.setItem('hasSeenVoiceTooltip', 'true');
        }, 10000);
        
        return () => clearTimeout(timer);
      }
    }
  }, []);
  
  // Pulse when speaking
  useEffect(() => {
    setIsPulsing(isSpeaking);
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
        setQuery(`Tell me about ${examGoal || 'exam'} preparation`); // Simulate a recognized query
      }, 2000);
    } else {
      setIsListening(false);
    }
  };
  
  // Toggle mute function
  const toggleMute = () => {
    if (isSpeaking) {
      stopSpeaking();
    }
    updateSettings({ enabled: !settings.enabled });
  };
  
  // Get exam-appropriate suggestions
  const getSuggestions = () => {
    if (examGoal?.toLowerCase().includes('jee')) {
      return [
        "How to solve JEE Physics problems?",
        "What's the best way to learn Organic Chemistry?",
        "Tips for JEE Math preparation",
        "How many practice tests should I take?"
      ];
    } else if (examGoal?.toLowerCase().includes('neet')) {
      return [
        "How to memorize Biology diagrams?",
        "Tips for NEET Chemistry preparation",
        "How to improve my NCERT concepts?",
        "How to manage time during NEET exam?"
      ];
    } else {
      return [
        "What's my next task?",
        `How to prepare for ${examGoal || 'my exam'}?`,
        "Help me create a study plan",
        "Give me a motivational quote"
      ];
    }
  };
  
  return (
    <ProfileVoiceTooltip>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`relative ${className} ${isSpeaking ? 'bg-primary/10' : ''} ${
              isPulsing ? 'ring-2 ring-primary/50 ring-offset-2 ring-offset-background' : ''
            }`}
            aria-label="Voice Assistant"
          >
            {settings.enabled ? (
              <Volume2 
                className={`h-5 w-5 ${isSpeaking ? 'text-primary animate-pulse' : ''} ${
                  isPulsing && !isSpeaking ? 'text-primary animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]' : ''
                }`} 
              />
            ) : (
              <VolumeX className="h-5 w-5" />
            )}
            {settings.enabled && (
              <span className={`absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full ${
                isPulsing ? 'animate-ping' : ''
              }`}></span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Voice Assistant</h4>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleMute}
                  className={`h-8 w-8 p-0 ${!settings.enabled ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' : ''}`}
                >
                  {settings.enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={testVoice}
                  className="h-8 text-xs"
                  disabled={!settings.enabled}
                >
                  Test Voice
                </Button>
              </div>
            </div>
            
            <form onSubmit={handleSubmitQuery} className="flex gap-2">
              <Input
                placeholder={`Ask about ${examGoal || 'exam'} preparation...`}
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
                {getSuggestions().map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </ProfileVoiceTooltip>
  );
};

export default VoiceQueryControl;
