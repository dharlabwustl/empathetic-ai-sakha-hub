
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
import { Mic, MicOff, MessageSquare, Volume2, VolumeX, AlertTriangle, HelpCircle } from "lucide-react";
import { useVoiceAnnouncerContext } from './VoiceAnnouncer';
import ProfileVoiceTooltip from '../profile/ProfileVoiceTooltip';
import { getVoiceDiagnostics, fixVoiceSystem } from './voiceUtils';

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
  const [voiceStatus, setVoiceStatus] = useState<'checking' | 'working' | 'error'>('checking');
  
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
  const voiceCheckTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Check voice system status
  useEffect(() => {
    const checkVoiceSystem = async () => {
      try {
        setVoiceStatus('checking');
        const diagnostics = await getVoiceDiagnostics();
        
        if (diagnostics.available && diagnostics.supported) {
          setVoiceStatus('working');
        } else {
          console.warn("Voice system not working:", diagnostics);
          setVoiceStatus('error');
          
          // Try to fix automatically
          await fixVoiceSystem();
        }
      } catch (err) {
        console.error("Error checking voice system:", err);
        setVoiceStatus('error');
      }
    };
    
    // Check on mount
    checkVoiceSystem();
    
    // Set up periodic check
    voiceCheckTimerRef.current = setInterval(checkVoiceSystem, 30000); // Check every 30 seconds
    
    return () => {
      if (voiceCheckTimerRef.current) {
        clearInterval(voiceCheckTimerRef.current);
      }
    };
  }, []);
  
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
  
  // Fix voice system
  const handleFixVoice = async () => {
    setVoiceStatus('checking');
    const fixed = await fixVoiceSystem();
    
    if (fixed) {
      setVoiceStatus('working');
      // Test voice
      updateSettings({ volume: 1.0 });
      setTimeout(() => {
        speak("Voice system is now fixed and working", true);
      }, 500);
    } else {
      setVoiceStatus('error');
    }
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
            } ${voiceStatus === 'error' ? 'bg-destructive/10 text-destructive' : ''}`}
            aria-label="Voice Assistant"
          >
            {settings.enabled ? (
              <>
                {voiceStatus === 'error' ? (
                  <AlertTriangle className={`h-5 w-5 ${isPulsing ? 'animate-pulse' : ''}`} />
                ) : (
                  <Volume2 
                    className={`h-5 w-5 ${isSpeaking ? 'text-primary animate-pulse' : ''} ${
                      isPulsing && !isSpeaking ? 'text-primary animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]' : ''
                    }`} 
                  />
                )}
              </>
            ) : (
              <VolumeX className="h-5 w-5" />
            )}
            {settings.enabled && voiceStatus === 'working' && (
              <span className={`absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full ${
                isPulsing ? 'animate-ping' : ''
              }`}></span>
            )}
            {voiceStatus === 'error' && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
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
            
            {voiceStatus === 'error' && (
              <Alert variant="destructive" className="py-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-xs">Voice system not working</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 ml-auto text-xs"
                    onClick={handleFixVoice}
                  >
                    Fix Voice
                  </Button>
                </div>
              </Alert>
            )}
            
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
            
            {voiceStatus === 'error' && (
              <div className="text-xs border-t pt-2 text-muted-foreground">
                <div className="flex items-center gap-1 mb-1">
                  <HelpCircle className="h-3 w-3" />
                  <span className="font-medium">Troubleshooting</span>
                </div>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Check if your device volume is turned up</li>
                  <li>Try the "Fix Voice" button above</li>
                  <li>Try using Chrome browser</li>
                  <li>Check browser permissions for sound</li>
                </ul>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </ProfileVoiceTooltip>
  );
};

export default VoiceQueryControl;
