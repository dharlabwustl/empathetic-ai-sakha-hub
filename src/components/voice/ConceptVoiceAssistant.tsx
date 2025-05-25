
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, BookOpen, Lightbulb, HelpCircle, Volume2, VolumeX } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface ConceptVoiceAssistantProps {
  conceptName?: string;
  conceptSubject?: string;
  isEnabled?: boolean;
  userName?: string;
}

const ConceptVoiceAssistant: React.FC<ConceptVoiceAssistantProps> = ({
  conceptName = "Physics Concept",
  conceptSubject = "Physics",
  isEnabled = true,
  userName = "Student"
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
    
    if (lowerCommand.includes('explain') || lowerCommand.includes('what is this')) {
      speakMessage(`Let me explain ${conceptName} from ${conceptSubject}. This concept is fundamental to understanding the subject. I'll break it down into simple terms and provide examples to help you grasp the core ideas clearly.`);
      return;
    }
    
    if (lowerCommand.includes('example') || lowerCommand.includes('real world')) {
      speakMessage(`Great question! ${conceptName} has many real-world applications. For instance, you can see this concept in action in everyday situations. Let me give you some practical examples that will help you remember and understand this better.`);
      return;
    }
    
    if (lowerCommand.includes('tips') || lowerCommand.includes('study tips') || lowerCommand.includes('how to remember')) {
      speakMessage(`Here are some effective study tips for mastering ${conceptName}: Create visual diagrams, practice with examples, teach the concept to someone else, use mnemonics for key points, and relate it to concepts you already know. Regular revision and application will strengthen your understanding.`);
      return;
    }
    
    if (lowerCommand.includes('difficult') || lowerCommand.includes('hard to understand') || lowerCommand.includes('confusing')) {
      speakMessage(`I understand that ${conceptName} can be challenging. Let's break it down step by step. Start with the basic definition, then build up complexity gradually. Don't worry if it takes time - complex concepts require patience and practice to master.`);
      return;
    }
    
    if (lowerCommand.includes('formula') || lowerCommand.includes('equation')) {
      speakMessage(`The key formulas for ${conceptName} are essential for solving problems. I'll help you understand not just the formula itself, but also when to use it, how to derive it, and common mistakes to avoid. Let's go through them systematically.`);
      return;
    }
    
    if (lowerCommand.includes('practice') || lowerCommand.includes('problems') || lowerCommand.includes('questions')) {
      speakMessage(`Practice is crucial for mastering ${conceptName}. Start with basic problems to build confidence, then progress to more complex applications. I recommend solving 5-10 problems daily and focusing on understanding the approach rather than just getting the right answer.`);
      return;
    }
    
    if (lowerCommand.includes('test') || lowerCommand.includes('exam') || lowerCommand.includes('assessment')) {
      speakMessage(`For exam preparation on ${conceptName}, focus on understanding core principles, memorizing key formulas, practicing different problem types, and timing yourself. Review common mistakes and ensure you can explain the concept clearly in your own words.`);
      return;
    }
    
    // Default response
    speakMessage(`I'm here to help you master ${conceptName} from ${conceptSubject}. You can ask me for explanations, examples, study tips, formulas, practice guidance, or exam preparation strategies. What would you like to know?`);
  };
  
  const suggestions = [
    "Explain this concept",
    "Give me examples",
    "Study tips please",
    "Show me formulas",
    "Practice problems",
    "Exam preparation"
  ];
  
  if (!isVoiceSupported || !isEnabled) {
    return null;
  }
  
  return (
    <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 border-blue-200 bg-blue-50 dark:bg-blue-900/20`}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm flex justify-between items-center text-blue-800 dark:text-blue-200">
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
            <div className="text-xs text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-800/50 p-2 rounded">
              Learning: <strong>{conceptName}</strong>
            </div>
            
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
                {voiceSettings.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
            
            {transcript && (
              <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded-md text-sm">
                <p className="font-semibold text-blue-800 dark:text-blue-200">You said:</p>
                <p className="text-blue-700 dark:text-blue-300">{transcript}</p>
              </div>
            )}
            
            <div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-1">
                <Lightbulb className="h-3 w-3" />
                Try saying:
              </p>
              <div className="grid grid-cols-1 gap-1">
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className="h-auto py-1 px-2 text-xs justify-start font-normal text-left text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/50"
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
              className="w-full text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/50"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Concept Help
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConceptVoiceAssistant;
