
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
import { Mic, MicOff, MessageSquare, Volume2, VolumeX } from "lucide-react";
import { useVoiceAnnouncerContext } from './VoiceAnnouncer';
import ProfileVoiceTooltip from '../profile/ProfileVoiceTooltip';

interface VoiceQueryControlProps {
  className?: string;
}

const VoiceQueryControl: React.FC<VoiceQueryControlProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);
  const { speak, processQuery, testVoice, isSpeaking, settings, stopSpeaking, examGoal } = useVoiceAnnouncerContext();
  
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
        setQuery(`What features help with ${examGoal || "exam"} preparation?`); // Simulate a recognized query
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  const handleToggleMute = () => {
    // Toggle enabled setting
    if (settings.enabled) {
      // Stop any ongoing speech
      stopSpeaking();
    }
    
    // Update the settings
    const newSettings = { ...settings, enabled: !settings.enabled };
    useVoiceAnnouncerContext().updateSettings(newSettings);
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
              <VolumeX className="h-5 w-5 text-muted-foreground" />
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
              <div className="flex space-x-2">
                <Button 
                  variant={settings.enabled ? "outline" : "destructive"} 
                  size="sm" 
                  onClick={handleToggleMute}
                  className="h-8 text-xs flex items-center gap-1"
                >
                  {settings.enabled ? (
                    <>
                      <Volume2 className="h-3 w-3" />
                      <span>Enabled</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="h-3 w-3" />
                      <span>Muted</span>
                    </>
                  )}
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
                placeholder={`Ask about ${examGoal || "exam"} prep...`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
                disabled={!settings.enabled}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      type="button" 
                      size="icon" 
                      variant={isListening ? "destructive" : "outline"} 
                      onClick={toggleListening}
                      disabled={!settings.enabled}
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
                      disabled={!settings.enabled || !query.trim()}
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
                {examGoal === "NEET" ? (
                  <>
                    <li>"What NEET topics should I focus on?"</li>
                    <li>"How to improve my Biology score?"</li>
                    <li>"Tips for NEET Chemistry MCQs"</li>
                    <li>"Best way to memorize NCERT content"</li>
                  </>
                ) : examGoal === "JEE" ? (
                  <>
                    <li>"How to tackle JEE Math problems?"</li>
                    <li>"Most important JEE Physics formulas"</li>
                    <li>"Tips for solving JEE numerical questions"</li>
                    <li>"How to manage JEE preparation time?"</li>
                  </>
                ) : examGoal === "UPSC" ? (
                  <>
                    <li>"How to prepare for UPSC prelims?"</li>
                    <li>"Tips for UPSC essay writing"</li>
                    <li>"How to cover UPSC current affairs?"</li>
                    <li>"Best strategy for UPSC optional subjects"</li>
                  </>
                ) : (
                  <>
                    <li>"What topics should I focus on today?"</li>
                    <li>"How many tasks do I have pending?"</li>
                    <li>"Tips for better exam preparation"</li>
                    <li>"How to improve my problem-solving speed?"</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </ProfileVoiceTooltip>
  );
};

export default VoiceQueryControl;
