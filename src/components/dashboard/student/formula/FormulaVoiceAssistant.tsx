
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Speaker, Calculator } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface FormulaVoiceAssistantProps {
  currentFormula?: string;
  currentSubject?: string;
  userName?: string;
  onExplainFormula?: () => void;
  onShowExample?: () => void;
  onNextFormula?: () => void;
  onPrevFormula?: () => void;
  isEnabled?: boolean;
}

const FormulaVoiceAssistant: React.FC<FormulaVoiceAssistantProps> = ({
  currentFormula,
  currentSubject,
  userName,
  onExplainFormula,
  onShowExample,
  onNextFormula,
  onPrevFormula,
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
    
    // Formula explanation commands
    if (lowerCommand.includes('explain') || lowerCommand.includes('what does') || lowerCommand.includes('meaning')) {
      if (onExplainFormula) {
        onExplainFormula();
        speakMessage(`Let me explain this ${currentSubject} formula for you. Each variable has a specific meaning and purpose.`);
      }
      return;
    }
    
    // Example commands
    if (lowerCommand.includes('example') || lowerCommand.includes('show me') || lowerCommand.includes('practice')) {
      if (onShowExample) {
        onShowExample();
        speakMessage("Here's a worked example using this formula with real numbers.");
      }
      return;
    }
    
    // Navigation commands
    if (lowerCommand.includes('next') || lowerCommand.includes('another formula')) {
      if (onNextFormula) {
        onNextFormula();
        speakMessage("Moving to the next formula.");
      }
      return;
    }
    
    if (lowerCommand.includes('previous') || lowerCommand.includes('go back')) {
      if (onPrevFormula) {
        onPrevFormula();
        speakMessage("Going back to the previous formula.");
      }
      return;
    }
    
    // Subject-specific help
    if (lowerCommand.includes('physics') || lowerCommand.includes('chemistry') || lowerCommand.includes('math')) {
      speakMessage(`I can help you understand ${currentSubject} formulas. Each formula represents a relationship between different physical or mathematical quantities.`);
      return;
    }
    
    // Variable explanation
    if (lowerCommand.includes('variable') || lowerCommand.includes('symbol') || lowerCommand.includes('what is')) {
      speakMessage("Each symbol in the formula represents a specific quantity. Would you like me to explain what each variable means?");
      return;
    }
    
    // Derivation commands
    if (lowerCommand.includes('derive') || lowerCommand.includes('how do you get')) {
      speakMessage("Formula derivations show how we arrive at the equation from basic principles. This helps you understand the underlying physics or mathematics.");
      return;
    }
    
    // Unit commands
    if (lowerCommand.includes('unit') || lowerCommand.includes('measurement')) {
      speakMessage("Units are crucial in formulas. Make sure all variables are in compatible units before calculating.");
      return;
    }
    
    // Default response
    speakMessage(`I'm here to help you understand formulas in ${currentSubject}. Ask me to explain the formula, show examples, or help with variables and units.`);
  };
  
  const quickCommands = [
    "Explain this formula",
    "Show me an example",
    "What do the variables mean?",
    "Next formula",
    "Help with units"
  ];
  
  if (!isVoiceSupported || !isEnabled) {
    return null;
  }
  
  return (
    <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 fixed bottom-4 right-4 z-50`}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm flex justify-between items-center">
          <span className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-green-600" />
            Formula Assistant
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
              {currentSubject} Formula Practice
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
                {quickCommands.slice(0, 3).map((command, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className="h-auto py-1 px-2 text-xs justify-start font-normal text-left w-full"
                    onClick={() => processVoiceCommand(command)}
                  >
                    "{command}"
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
              <Calculator className="h-4 w-4 mr-2" />
              Formula Help
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FormulaVoiceAssistant;
