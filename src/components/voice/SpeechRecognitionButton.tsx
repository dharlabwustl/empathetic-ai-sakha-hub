
import React, { useState, useCallback } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EnhancedSpeechRecognition from './EnhancedSpeechRecognition';

interface SpeechRecognitionButtonProps {
  position?: 'dashboard' | 'floating';
  onCommand?: (command: string) => void;
  className?: string;
}

const SpeechRecognitionButton: React.FC<SpeechRecognitionButtonProps> = ({
  position = 'dashboard',
  onCommand,
  className = ''
}) => {
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const handleSpeechStart = useCallback(() => {
    setIsListening(true);
    // Stop any ongoing speech synthesis when user starts speaking
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      console.log('🔇 Speech synthesis stopped - user is speaking');
    }
    // Notify other components that user is actively using voice
    window.dispatchEvent(new CustomEvent('user-voice-active'));
  }, []);

  const handleSpeechEnd = useCallback(() => {
    setIsListening(false);
    // Notify other components that user finished speaking
    window.dispatchEvent(new CustomEvent('user-voice-inactive'));
  }, []);

  const handleCommand = useCallback((command: string) => {
    console.log('Voice command received:', command);
    
    // Stop any ongoing speech
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    
    // Pass command to parent
    if (onCommand) {
      onCommand(command);
    }
    
    // Broadcast command to all listening components
    window.dispatchEvent(new CustomEvent('voice-command', { 
      detail: { command } 
    }));
  }, [onCommand]);

  const toggleVoiceAssistant = useCallback(() => {
    setVoiceEnabled(!voiceEnabled);
    
    if (voiceEnabled) {
      // Disable voice assistant
      window.dispatchEvent(new CustomEvent('disable-voice-assistant'));
    } else {
      // Enable voice assistant
      window.dispatchEvent(new CustomEvent('enable-voice-assistant'));
    }
  }, [voiceEnabled]);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Voice Assistant Toggle */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={toggleVoiceAssistant}
              variant={voiceEnabled ? "default" : "outline"}
              size="sm"
              className="relative"
            >
              {voiceEnabled ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
              {voiceEnabled && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full"></span>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{voiceEnabled ? 'Disable Voice Assistant' : 'Enable Voice Assistant'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Speech Recognition */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <EnhancedSpeechRecognition
                language="en-US"
                continuous={false}
                onCommand={handleCommand}
                onSpeechStart={handleSpeechStart}
                onSpeechEnd={handleSpeechEnd}
                className={isListening ? 'ring-2 ring-red-500' : ''}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {isListening 
                ? 'Listening... Click to stop or say "stop"' 
                : 'Click to give voice command'
              }
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SpeechRecognitionButton;
