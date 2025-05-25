
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX, BookOpen, Brain } from "lucide-react";

interface ConceptCardVoiceAssistantProps {
  conceptTitle?: string;
  userName?: string;
  isEnabled?: boolean;
}

const ConceptCardVoiceAssistant: React.FC<ConceptCardVoiceAssistantProps> = ({
  conceptTitle = "Current Concept",
  userName = "Student",
  isEnabled = true
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const speakMessage = (message: string) => {
    if (!isMuted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const speech = new SpeechSynthesisUtterance();
      speech.text = message;
      speech.lang = 'en-IN';
      speech.volume = 0.8;
      speech.rate = 0.9;
      speech.pitch = 1.1;
      
      window.speechSynthesis.speak(speech);
    }
  };

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('explain') || lowerCommand.includes('what is')) {
      speakMessage(`Let me explain ${conceptTitle}. This concept involves understanding the fundamental principles and applications. Would you like me to break it down step by step?`);
      return;
    }
    
    if (lowerCommand.includes('example') || lowerCommand.includes('give me an example')) {
      speakMessage(`Here's a practical example of ${conceptTitle}: Consider real-world applications where this concept is commonly used. This helps you understand the practical significance.`);
      return;
    }
    
    if (lowerCommand.includes('formula') || lowerCommand.includes('equation')) {
      speakMessage(`The key formulas for ${conceptTitle} are important to remember. I'll guide you through the mathematical relationships and how to apply them.`);
      return;
    }
    
    if (lowerCommand.includes('practice') || lowerCommand.includes('questions')) {
      speakMessage(`Let's practice ${conceptTitle}. I can suggest practice problems that will help reinforce your understanding. Would you like to start with basic or advanced questions?`);
      return;
    }
    
    speakMessage(`I'm here to help you understand ${conceptTitle}. You can ask me to explain concepts, give examples, discuss formulas, or suggest practice questions!`);
  };

  const suggestions = [
    "Explain this concept",
    "Give me an example", 
    "Show me the formula",
    "I want to practice"
  ];

  if (!isEnabled) return null;

  return (
    <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 border-purple-200 bg-purple-50`}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm flex justify-between items-center text-purple-800">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>Concept Guide</span>
          </div>
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
            <div className="flex items-center justify-center gap-2">
              <Button 
                variant={isListening ? "default" : "outline"}
                size="sm" 
                onClick={() => {
                  setIsListening(!isListening);
                  if (!isListening) {
                    speakMessage(`Hi ${userName}, I'm ready to help you understand ${conceptTitle}. What would you like to know?`);
                  }
                }}
                className={`${isListening ? 'bg-purple-500 hover:bg-purple-600' : 'border-purple-200'}`}
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? 'Stop' : 'Ask Me'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
                className="border-purple-200"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
            
            <div>
              <p className="text-xs text-purple-600 mb-2">Try saying:</p>
              <div className="grid grid-cols-1 gap-1">
                {suggestions.map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className="h-auto py-1 px-2 text-xs justify-start font-normal text-left text-purple-700 hover:bg-purple-100"
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
              className="w-full text-purple-700 hover:bg-purple-100"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Concept Help
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConceptCardVoiceAssistant;
