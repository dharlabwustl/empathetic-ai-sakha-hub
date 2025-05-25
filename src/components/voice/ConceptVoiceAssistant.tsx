
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Speaker, BookOpen, Brain, Lightbulb } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";
import { toast } from '@/hooks/use-toast';

interface ConceptVoiceAssistantProps {
  conceptData?: any;
  userName?: string;
  isEnabled?: boolean;
}

const ConceptVoiceAssistant: React.FC<ConceptVoiceAssistantProps> = ({
  conceptData,
  userName = "Student",
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
    
    if (lowerCommand.includes('explain') || lowerCommand.includes('what is')) {
      speakMessage(`Let me explain this concept. ${conceptData?.title || 'This concept'} is an important topic in ${conceptData?.subject || 'your studies'}. The key points to understand are the fundamental principles and real-world applications.`);
      return;
    }
    
    if (lowerCommand.includes('example') || lowerCommand.includes('give me an example')) {
      speakMessage(`Here's a practical example: This concept is commonly used in problem-solving scenarios. Try to think of real-world situations where you might apply this knowledge.`);
      return;
    }
    
    if (lowerCommand.includes('study tips') || lowerCommand.includes('how to study')) {
      speakMessage(`For effective studying, break this concept into smaller parts. Create mind maps, practice with examples, and try teaching it to someone else. Regular revision is key.`);
      return;
    }
    
    if (lowerCommand.includes('formula') || lowerCommand.includes('equation')) {
      speakMessage(`Let me help you with the formulas. Remember to understand the derivation, not just memorize. Practice substituting different values to see how variables affect the result.`);
      return;
    }
    
    if (lowerCommand.includes('difficulty') || lowerCommand.includes('hard') || lowerCommand.includes('confused')) {
      speakMessage(`Don't worry if this seems challenging. Break it down step by step. Focus on understanding the basic principles first, then build up to more complex applications.`);
      return;
    }
    
    // Default response
    speakMessage("I'm here to help you understand this concept better. You can ask me to explain, give examples, provide study tips, or help with formulas.");
  };
  
  const suggestions = [
    "Explain this concept",
    "Give me an example",
    "How should I study this?",
    "Help me with the formula",
    "This seems difficult"
  ];
  
  if (!isVoiceSupported || !isEnabled) {
    return null;
  }
  
  return (
    <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 border-blue-200 bg-blue-50`}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm flex justify-between items-center text-blue-800">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Concept Assistant</span>
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
                onClick={isListening ? stopListening : startListening}
                className={`${isListening ? 'bg-blue-500 hover:bg-blue-600' : 'border-blue-200'}`}
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? 'Stop' : 'Start'} Listening
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleMute()}
                disabled={isSpeaking}
                className="border-blue-200"
              >
                <Speaker className="h-4 w-4 mr-2" />
                {voiceSettings.muted ? 'Unmute' : 'Mute'}
              </Button>
            </div>
            
            {transcript && (
              <div className="bg-blue-100 p-2 rounded-md text-sm">
                <p className="font-semibold text-blue-800">You said:</p>
                <p className="text-blue-700">{transcript}</p>
              </div>
            )}
            
            <div>
              <p className="text-xs text-blue-600 mb-2 flex items-center gap-1">
                <Lightbulb className="h-3 w-3" />
                Try saying:
              </p>
              <div className="grid grid-cols-1 gap-1">
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className="h-auto py-1 px-2 text-xs justify-start font-normal text-left text-blue-700 hover:bg-blue-100"
                    onClick={() => {
                      speakMessage(suggestion);
                      processVoiceCommand(suggestion);
                    }}
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
              className="w-full text-blue-700 hover:bg-blue-100"
            >
              <Brain className="h-4 w-4 mr-2" />
              Ask About Concept
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConceptVoiceAssistant;
