
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Speaker, Bot } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";
import { toast } from '@/hooks/use-toast';

interface ConceptVoiceAssistantProps {
  conceptName: string;
  conceptContent?: string;
  currentTab?: string;
  userName?: string;
  isEnabled?: boolean;
}

const ConceptVoiceAssistant: React.FC<ConceptVoiceAssistantProps> = ({
  conceptName,
  conceptContent,
  currentTab = 'learn',
  userName,
  isEnabled = true
}) => {
  const [expanded, setExpanded] = useState(false);
  
  const {
    voiceSettings,
    toggleMute,
    speakMessage,
    isVoiceSupported,
    isSpeaking,
    isListening,
    startListening,
    stopListening,
    transcript
  } = useVoiceAnnouncer({ userName });
  
  // Process transcript when it changes
  useEffect(() => {
    if (transcript) {
      processVoiceCommand(transcript);
    }
  }, [transcript]);
  
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Concept explanation commands
    if (lowerCommand.includes('explain') || lowerCommand.includes('what is')) {
      speakMessage(`Let me explain ${conceptName}. This concept is fundamental in understanding the subject. ${conceptContent ? 'Here are the key points...' : 'You can find detailed explanation in the learn tab.'}`);
      return;
    }
    
    // Tab navigation commands
    if (lowerCommand.includes('learn tab') || lowerCommand.includes('go to learn')) {
      speakMessage("Switching to the learn tab where you can read the detailed explanation.");
      // You could trigger tab change here
      return;
    }
    
    if (lowerCommand.includes('interactive') || lowerCommand.includes('visualization')) {
      speakMessage("Opening interactive visualizations to help you understand the concept better.");
      return;
    }
    
    if (lowerCommand.includes('3d') || lowerCommand.includes('three d')) {
      speakMessage("Opening the 3D lab where you can explore the concept in three dimensions.");
      return;
    }
    
    if (lowerCommand.includes('tools') || lowerCommand.includes('practice')) {
      speakMessage("Opening learning tools where you can practice with flashcards and quizzes.");
      return;
    }
    
    if (lowerCommand.includes('notes')) {
      speakMessage("Opening your notes section where you can add personal annotations.");
      return;
    }
    
    // Study help commands
    if (lowerCommand.includes('quiz') || lowerCommand.includes('test')) {
      speakMessage("I can help you with a quick recall test. Would you like me to ask you questions about this concept?");
      return;
    }
    
    if (lowerCommand.includes('formula') || lowerCommand.includes('equation')) {
      speakMessage(`The key formulas for ${conceptName} are available in the learn tab. Would you like me to explain any specific formula?`);
      return;
    }
    
    if (lowerCommand.includes('difficult') || lowerCommand.includes('hard')) {
      speakMessage("I understand this concept might be challenging. Let me break it down into simpler parts. Which specific part would you like me to explain?");
      return;
    }
    
    // Bookmark commands
    if (lowerCommand.includes('bookmark') || lowerCommand.includes('save')) {
      speakMessage(`I'll help you bookmark ${conceptName} for future reference.`);
      return;
    }
    
    // Default response
    speakMessage(`I'm here to help you understand ${conceptName}. You can ask me to explain concepts, navigate between tabs, or help with practice questions. What would you like to know?`);
  };
  
  const quickSuggestions = [
    `Explain ${conceptName}`,
    "Show me the formula",
    "Give me a quiz",
    "Switch to interactive tab",
    "Open 3D visualization",
    "Help me understand this"
  ];
  
  if (!isVoiceSupported || !isEnabled) {
    return null;
  }
  
  return (
    <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 fixed bottom-4 right-4 z-50`}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm flex justify-between items-center">
          <span className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-blue-600" />
            Concept Assistant
          </span>
          {expanded && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpanded(false)}
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        {expanded ? (
          <div className="space-y-3">
            <div className="text-xs text-center text-gray-600">
              Ask me about {conceptName}
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <Button 
                variant={isListening ? "default" : "outline"}
                size="sm" 
                onClick={isListening ? stopListening : startListening}
                className={`${isListening ? 'bg-red-500 hover:bg-red-600' : ''}`}
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? 'Stop' : 'Listen'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleMute()}
                disabled={isSpeaking}
              >
                <Speaker className="h-4 w-4" />
              </Button>
            </div>
            
            {transcript && (
              <div className="bg-muted p-2 rounded-md text-xs">
                <p className="font-semibold">You said:</p>
                <p>{transcript}</p>
              </div>
            )}
            
            <div>
              <p className="text-xs text-muted-foreground mb-2">Try saying:</p>
              <div className="space-y-1">
                {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className="h-auto py-1 px-2 text-xs justify-start font-normal text-left w-full"
                    onClick={() => processVoiceCommand(suggestion)}
                  >
                    "{suggestion}"
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpanded(true)}
              className="w-full"
            >
              <Bot className="h-4 w-4 mr-2" />
              Ask AI
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConceptVoiceAssistant;
