
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Calculator, Lightbulb, BookOpen, Volume2, VolumeX } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface FormulaVoiceAssistantProps {
  formulaName?: string;
  formulaSubject?: string;
  isEnabled?: boolean;
  userName?: string;
}

const FormulaVoiceAssistant: React.FC<FormulaVoiceAssistantProps> = ({
  formulaName = "Physics Formula",
  formulaSubject = "Physics",
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
    
    if (lowerCommand.includes('explain') || lowerCommand.includes('what is this formula')) {
      speakMessage(`This is ${formulaName} from ${formulaSubject}. Let me break it down for you. Each variable has a specific meaning and unit. Understanding the derivation helps you remember the formula better.`);
      return;
    }
    
    if (lowerCommand.includes('derivation') || lowerCommand.includes('how is it derived')) {
      speakMessage(`The derivation of ${formulaName} starts from basic principles. I'll walk you through each step logically. This helps you understand why the formula works, not just how to use it.`);
      return;
    }
    
    if (lowerCommand.includes('units') || lowerCommand.includes('what are the units')) {
      speakMessage(`Let's check the units for ${formulaName}. Each variable has specific units that must match for the formula to work correctly. Always verify your units in calculations.`);
      return;
    }
    
    if (lowerCommand.includes('memory') || lowerCommand.includes('how to remember')) {
      speakMessage(`Here are memory techniques for ${formulaName}: Create a story connecting the variables, use acronyms, or relate it to real-world examples. Practice writing it from memory daily.`);
      return;
    }
    
    if (lowerCommand.includes('example') || lowerCommand.includes('solve a problem')) {
      speakMessage(`Let's work through an example with ${formulaName}. I'll guide you step by step: identify given values, substitute into the formula, check units, and solve systematically.`);
      return;
    }
    
    if (lowerCommand.includes('mistake') || lowerCommand.includes('common errors')) {
      speakMessage(`Common mistakes with ${formulaName} include: mixing up variables, incorrect unit conversions, wrong substitutions, and calculation errors. Always double-check your work.`);
      return;
    }
    
    if (lowerCommand.includes('application') || lowerCommand.includes('when to use')) {
      speakMessage(`${formulaName} is used when you need to calculate specific quantities in ${formulaSubject}. Look for key words in problems that indicate this formula applies.`);
      return;
    }
    
    // Default response
    speakMessage(`I can help you master ${formulaName}. Ask me about explanations, derivations, units, memory techniques, examples, or common mistakes.`);
  };
  
  const suggestions = [
    "Explain this formula",
    "Show me the derivation", 
    "What are the units?",
    "How to remember this?",
    "Solve an example",
    "Common mistakes?"
  ];
  
  if (!isVoiceSupported || !isEnabled) {
    return null;
  }
  
  return (
    <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 border-orange-200 bg-orange-50 dark:bg-orange-900/20`}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm flex justify-between items-center text-orange-800 dark:text-orange-200">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <span>Formula Assistant</span>
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
            <div className="text-xs text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-800/50 p-2 rounded">
              Learning: <strong>{formulaName}</strong>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <Button 
                variant={isListening ? "default" : "outline"}
                size="sm" 
                onClick={isListening ? stopListening : startListening}
                className={`${isListening ? 'bg-orange-500 hover:bg-orange-600' : 'border-orange-200'}`}
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? 'Stop' : 'Start'} Listening
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleMute()}
                disabled={isSpeaking}
                className="border-orange-200"
              >
                {voiceSettings.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
            
            {transcript && (
              <div className="bg-orange-100 dark:bg-orange-800/50 p-2 rounded-md text-sm">
                <p className="font-semibold text-orange-800 dark:text-orange-200">You said:</p>
                <p className="text-orange-700 dark:text-orange-300">{transcript}</p>
              </div>
            )}
            
            <div>
              <p className="text-xs text-orange-600 dark:text-orange-400 mb-2 flex items-center gap-1">
                <Lightbulb className="h-3 w-3" />
                Try saying:
              </p>
              <div className="grid grid-cols-1 gap-1">
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className="h-auto py-1 px-2 text-xs justify-start font-normal text-left text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-800/50"
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
              className="w-full text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-800/50"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Formula Help
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FormulaVoiceAssistant;
