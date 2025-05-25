
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Speaker, BookOpen, Brain, Lightbulb } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface ConceptVoiceAssistantProps {
  conceptName?: string;
  subject?: string;
  userName?: string;
  isEnabled?: boolean;
}

const ConceptVoiceAssistant: React.FC<ConceptVoiceAssistantProps> = ({
  conceptName = "Current Concept",
  subject = "General",
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
  
  useEffect(() => {
    if (transcript) {
      processVoiceCommand(transcript);
    }
  }, [transcript]);
  
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('explain') || lowerCommand.includes('what is')) {
      speakMessage(`${conceptName} is a fundamental concept in ${subject}. Let me break it down for you with simple explanations and real-world examples. This concept is important because it forms the foundation for more advanced topics.`);
      return;
    }
    
    if (lowerCommand.includes('example') || lowerCommand.includes('show me')) {
      speakMessage(`Here's a practical example of ${conceptName}: Think of it like everyday situations you encounter. I'll provide step-by-step examples to help you understand how this concept applies in real scenarios.`);
      return;
    }
    
    if (lowerCommand.includes('study tip') || lowerCommand.includes('how to remember')) {
      speakMessage(`Great study tips for ${conceptName}: First, create visual associations. Second, practice with flashcards. Third, teach it to someone else. Use mnemonics and connect it to concepts you already know.`);
      return;
    }
    
    if (lowerCommand.includes('difficulty') || lowerCommand.includes('hard to understand')) {
      speakMessage(`Don't worry if ${conceptName} seems challenging! Break it into smaller parts, focus on one aspect at a time, and practice regularly. Remember, every expert was once a beginner.`);
      return;
    }
    
    if (lowerCommand.includes('formula') || lowerCommand.includes('equation')) {
      speakMessage(`The key formulas related to ${conceptName} are essential to memorize. I'll help you understand not just what they are, but why they work and when to use them in problem-solving.`);
      return;
    }
    
    if (lowerCommand.includes('quiz') || lowerCommand.includes('test me')) {
      speakMessage(`Ready for a quick quiz on ${conceptName}? I can ask you questions to test your understanding and provide immediate feedback to help reinforce your learning.`);
      return;
    }
    
    // Default response
    speakMessage(`I'm here to help you master ${conceptName} in ${subject}. Ask me to explain concepts, provide examples, give study tips, or quiz you on the material.`);
  };
  
  const suggestions = [
    "Explain this concept",
    "Give me an example",
    "Study tips please",
    "Test my understanding",
    "How to remember this?"
  ];
  
  if (!isVoiceSupported || !isEnabled) {
    return null;
  }
  
  return (
    <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 border-blue-200 bg-blue-50`}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm flex justify-between items-center text-blue-800">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
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
              <BookOpen className="h-4 w-4 mr-2" />
              Concept Helper
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConceptVoiceAssistant;
