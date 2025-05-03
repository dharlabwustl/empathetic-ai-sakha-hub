
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, MessageSquare, Volume2 } from "lucide-react";
import { useVoiceAnnouncerContext } from './VoiceAnnouncer';

interface VoiceQueryControlProps {
  className?: string;
}

const VoiceQueryControl: React.FC<VoiceQueryControlProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { speak, processQuery, testVoice, isSpeaking, settings } = useVoiceAnnouncerContext();
  
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
        setQuery("What features are available in PREPZR?"); // Simulate a recognized query
      }, 2000);
    } else {
      setIsListening(false);
    }
  };
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={`relative ${className} ${isSpeaking ? 'bg-primary/10' : ''}`}
          aria-label="Voice Assistant"
        >
          <Volume2 className={`h-5 w-5 ${isSpeaking ? 'text-primary animate-pulse' : ''}`} />
          {settings.enabled && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Voice Assistant</h4>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={testVoice}
              className="h-8 text-xs"
            >
              Test Voice
            </Button>
          </div>
          
          <form onSubmit={handleSubmitQuery} className="flex gap-2">
            <Input
              placeholder="Ask me anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button 
              type="button" 
              size="icon" 
              variant={isListening ? "destructive" : "outline"} 
              onClick={toggleListening}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button 
              type="submit" 
              size="icon"
              disabled={!query.trim()}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          </form>
          
          <div className="text-xs text-muted-foreground">
            <p>Try asking:</p>
            <ul className="list-disc pl-4 space-y-1 mt-1">
              <li>"What's my next task?"</li>
              <li>"How many tasks do I have today?"</li>
              <li>"Tell me about PREPZR"</li>
              <li>"What can you do?"</li>
            </ul>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default VoiceQueryControl;
